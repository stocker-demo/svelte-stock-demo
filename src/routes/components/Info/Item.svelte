<script lang="ts">
	import type { CategoryInfoData } from "./types";
	export let data: CategoryInfoData;

	const code = (code:string)=>{
		return code.startsWith("6")?"sh"+code:"sz"+code
	}
</script>

<div class="info">
	<div>
		<span class="name"> <a target="_blank" rel="noreferrer" href={`https://data.eastmoney.com/bkzj/${data.info.code}.html`}>
			{data.info.name}
		</a></span>
		<span class="time">{data.time}</span>
	</div>
	<ul>
		{#each data.items as item}
			<li>
				<a
                    target="_blank" rel="noreferrer"
					href={`http://quote.eastmoney.com/concept/${code(item.info.code)}.html`}
					>{item.info.name} 当前价格:{item.price}({(item.ratio *100).toFixed(2)}%)</a
				>
			</li>
		{/each}
	</ul>
</div>

<style>
	div.info {
		width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
		padding: 5px;
        margin-bottom: 10px;
	}
	.info div {
		display: flex;
		justify-content: space-between;
		vertical-align: middle;
		border-bottom: 1px solid #ccc;
        text-align: center;
	}
	.name {
		font-size: 20px;
		font-weight: bold;
	}
	.time {
		font-size: 16px;
		line-height: 30px;
		color: #ccc;
	}
</style>
