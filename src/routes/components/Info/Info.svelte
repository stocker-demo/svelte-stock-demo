<script lang="ts">
	import type { CategoryInfoData } from "./types";
	import Item from "./Item.svelte";
	import { afterUpdate, beforeUpdate } from "svelte";

	export let data: CategoryInfoData[] =[];

    let scroll:HTMLDivElement;
    let autoscroll = false;

    afterUpdate(()=>{
        if (autoscroll) scroll.scrollTo(0, scroll.scrollHeight);
    })

    beforeUpdate(() => {
		autoscroll = scroll && (scroll.offsetHeight + scroll.scrollTop) > (scroll.scrollHeight - 20);
	});
</script>

<div bind:this={scroll}>
	{#each data as item}
		<Item data={item} />
	{/each}
</div>


<style>
    div{
        padding: 5px;
        overflow: scroll;
        height: 100%;
    }
</style>