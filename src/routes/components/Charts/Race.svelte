<script lang="ts">
	import { init, use, type EChartsType } from "echarts/core";
	import { GridComponent,TitleComponent } from "echarts/components";
	import { BarChart } from "echarts/charts";
	import { CanvasRenderer } from "echarts/renderers";
	import { onMount, afterUpdate } from "svelte";
	import type { RaceChartData } from "./types";

	export let data: RaceChartData;
	export let time: number = 3;
    export let max:number = 10;

	let chart: HTMLDivElement;
	let myChart: EChartsType;
	onMount(() => {
		use([TitleComponent,GridComponent, BarChart, CanvasRenderer]);
		myChart = init(chart);
		myChart.setOption({
			xAxis: {
				max: "dataMax",
			},
			yAxis: {
				type: "category",
				inverse: true,
				animationDuration: 300,
				animationDurationUpdate: 300,
				max: max,
			},
			series: [
				{
					realtimeSort: true,
					type: "bar",
					label: {
						show: true,
						position: "right",
						valueAnimation: true,
					},
				},
			],
			animationDuration: 0,
			animationEasing: "linear",
			animationEasingUpdate: "linear",
		});
		return () => {
			myChart.dispose();
		};
	});
	afterUpdate(() => {
        if(!data) return
		myChart &&
			myChart.setOption({
				yAxis: {
					data: data.category,
				},
				series: [
					{
						data: data.value,
						type: "bar",
					},
				],
				animationDurationUpdate: time * 1000,
			});
	});
</script>

<div bind:this={chart} />

<style>
	div {
		width: 100%;
		height: 100%;
	}
	.no_data {
		text-align: center;
		line-height: 600px;
	}
</style>
