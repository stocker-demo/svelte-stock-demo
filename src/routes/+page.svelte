<script lang="ts">
    import { Alert } from 'flowbite-svelte';
    import SimpleChart from './components/Charts/Simple.svelte';
    import EventComp from './Event.svelte';
    import Folder from './components/Folder/index.svelte';
    const hello  = `Hello, world!`
</script>


<Folder />

<div class="p-8">
	<Alert>
		<span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
	</Alert>
</div>
<div class="chart">
    <SimpleChart />
</div>


<style>
    .chart {
        width: 500px;
        height: 300px;
        background-color: red;
    }
</style>


