<script lang="ts">
	import { init, use, type EChartsType } from "echarts/core";
	import { GridComponent } from "echarts/components";
	import { LineChart } from "echarts/charts";
	import { CanvasRenderer } from "echarts/renderers";
	import { UniversalTransition } from "echarts/features";
	import { onMount,afterUpdate,beforeUpdate } from "svelte";

    export let data:number[] = [820, 932, 901, 934, 1290, 1330, 1320]

	let chart: HTMLDivElement;
    let myChart:EChartsType;
	onMount(() => {
        console.log("onmount")
		use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
		myChart = init(chart);
		myChart.setOption({
			xAxis: {
                show:false,
				type: "category",
			},
			yAxis: {
                show: false,
				type: "value",
			},
			series: [
				{
					data: data,
					type: "line",
				},
			],
		});
        return ()=>{
            console.log("销毁")
            myChart.dispose();
        }
	});
    afterUpdate(()=>{
        myChart && myChart.setOption({
            series: [
                {
                    data: data,
                    type: "line",
                },
            ],
        })
    })
</script>

<div bind:this={chart} />

<style>
  div {
    width:100%;
    height:100%;
  }
</style>
