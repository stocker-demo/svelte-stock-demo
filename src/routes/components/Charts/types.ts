import type { ComposeOption } from "echarts/core";
import type {
	TitleComponentOption,
	TooltipComponentOption,
	GridComponentOption,
	LegendComponentOption,
} from "echarts/components";
import type { BarSeriesOption } from "echarts/charts";

export type RaceChartOption = ComposeOption<
	| TitleComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| LegendComponentOption
	| BarSeriesOption
>;

export type RaceChartData = {
    time:string;
    category:string[];
    value:number[];
}
