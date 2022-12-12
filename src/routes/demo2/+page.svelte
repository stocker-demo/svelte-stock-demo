<script lang="ts">
	import dayjs from "dayjs";
	import { onMount } from "svelte";
	import { interval, map, bufferCount, Subject, filter } from "rxjs";

	import { BkListArray, ListArray } from "$lib/eastmoney/list";
	import { Data } from "$lib/eastmoney/data";

	import Card from "../components/Box/Card.svelte";
	import Race from "../components/Charts/Race.svelte";
	import Info from "../components/Info/Info.svelte";

	import type { RaceChartData } from "../components/Charts/types";
	import type { CategoryInfoData } from "../components/Info/types";
	import Simple from "../components/Charts/Simple.svelte";

	let raceData: RaceChartData;
	let raceData2: RaceChartData;
	let infoData: CategoryInfoData[] = [];
	let categoryFlow: { category: string; series: number[] }[] = [];
	let updateTime = 10;
	let maxShow = 20;

	onMount(() => {
		const dataset = new Data();
		const dataFlow = new Subject<RaceChartData>();

		const intervalValue = interval(1000 * updateTime)
			.pipe(
				filter((_) => {
					const now = dayjs(new Date()).format("HH:mm:ss");

					return (
						(now >= "09:30:00" && now <= "11:30:00") ||
						(now >= "13:00:00" && now <= "15:00:00")
					);
				})
			)
			.subscribe(async () => {
				dataFlow.next(await ListArray());
			});

		dataFlow.subscribe((data) => {
			dataset.addData(data.category, data.value);
			dataset.addDataIndex(data.category, data.value);
		});

		dataFlow.subscribe((_) => {
			categoryFlow = dataset.datas();
		});

		const chart1 = dataFlow.subscribe((data) => {
			raceData = data;
		});

		const deltaDataFlow = dataFlow.pipe(
			map((data) => {
				const fiveDiff = dataset.data(5);
				return {
					time: data.time,
					category: fiveDiff.category,
					value: fiveDiff.series,
				};
			})
		);

		const chart2 = deltaDataFlow.subscribe((data) => (raceData2 = data));

		const deltaDataFlowN = (n: number) =>
			deltaDataFlow.pipe(bufferCount(n, 1));

		const inflow = (data: number[]) => {
			if (data.length < 2) return true;
			for (let i = 1; i < data.length; i++) {
				if (data[i] < data[i - 1]) return false;
			}
			return true;
		};
		const up = (data: number[]) => data.every((predicate) => predicate > 0);

		const serialize = (data: RaceChartData[]) => {
			const category = data[0].category;
			const series = data.map((item) => item.value);
			const seriesLine = category.map((_, index) => {
				return series.map((item) => item[index]);
			});
			return {
				category,
				series: seriesLine,
			};
		};

		const mapSeries: Map<string, CategoryInfoData[]> = new Map();

		const info = deltaDataFlowN(5).subscribe(async (data) => {
			const serializeData = serialize(data);
			const series = serializeData.series;
			series.map(async (item, index) => {
				if (inflow(item) && up(item)) {
					console.log("ListArray here");
					const datas = await ListArray();
					const category = serializeData.category[index];
					const list = mapSeries.get(category) ?? [];
					// list.push(`${data[data.length - 1].time}`);
					const cateIndex = datas.category.findIndex(
						(item) => item === category
					);
					const code = datas.codes[cateIndex];
					const stockList = await BkListArray(code);
					const stockData = {
						time: data[data.length - 1].time,
						info: {
							name: category,
							code: code,
						},
						items: stockList.map((it) => ({
							info: {
								name: it.f14,
								code: it.f12,
							},
							ratio: it.f3 / 100,
							price: it.f2,
						})),
					};
					list.push(stockData);
					infoData = [...infoData, stockData];

					mapSeries.set(category, list);
					console.log(
						`${data[data.length - 1].time} - `,
						category,
						`触发了 ${list.length} 次`
					);
					console.log(list);
					console.log(stockData);
				}
			});
		});

		return () => {
			console.log("销毁");
			intervalValue.unsubscribe();
			chart1.unsubscribe();
			chart2.unsubscribe();
			info.unsubscribe();
			dataFlow.unsubscribe();
		};
	});
</script>

<div class="flex">
	<div class=" flex-2 race">
		<Card>
			<Race data={raceData} time={updateTime} max={maxShow} />
		</Card>
	</div>
	<div class="flex-2 race">
		<Card>
			<Race data={raceData2} time={updateTime} max={maxShow} />
		</Card>
	</div>
	<div class="flex-2 info">
		<Card>
			<Info data={infoData} />
		</Card>
	</div>
</div>

<div >
	{#each categoryFlow as flow (flow.category)}
		<div class="category_flow">
			<Card>
				<div>{flow.category}</div>
				<Simple data={flow.series} />
			</Card>
		</div>
	{/each}
</div>

<style>
	div.race {
		display: inline-block;
		height: 1000px;
		width: 800px;
		margin: 20px;
	}
	.info {
		display: inline-block;
		height: 1000px;
		width: 300px;
		margin: 20px;
	}
	.category_flow {
		display: inline-block;
		height: 200px;
		width: 300px;
		margin: 20px;
	}
	.category_flow div {
		text-align: center;
	}
</style>
