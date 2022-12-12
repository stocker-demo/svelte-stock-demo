<script lang="ts">
    import Card from '../components/Box/Card.svelte'
    import Simple from "../components/Charts/Simple.svelte";
    import RaceChart from "../components/Charts/Race.svelte";
	import type { RaceChartData } from "../components/Charts/types";
	import { onMount } from "svelte";
    let data = [1,2,3,4,5,6]

    let raceData:RaceChartData

    const updateTime = 3

    onMount(()=>{
        console.log("onmount demo")
         if(!raceData){
            raceData= {
                category: ["a","b","c","d","e","f","g","h","i","酿酒行业"],
                value: [1,2,3,4,5,6,7,8,9,10],
                time: "12:00"
            }
         }
        const {value} = raceData ?? []
        const fetch = ()=>{
            console.log("do it")
            value.map((v,i)=>{
                value[i] = v * (Math.random() + 0.5 )
            })
            raceData.value = value
            raceData = raceData
        }
        setTimeout(fetch,0)
        const timehandle = setInterval(fetch,updateTime * 1000)

        return ()=>{
            console.log("销毁")
            clearInterval(timehandle);
        }
    })
</script>

<div class="charts mx-atuo">
    <Card>
        <div class="bar">
            <RaceChart data={raceData} time={updateTime} max={20}/>
        </div>
    </Card>
</div>

<div class="charts inline mx-atuo">
    <Card>
        <div class="bar">
            <RaceChart data={raceData} time={updateTime} max={20}/>
        </div>
    </Card>
</div>

<style>
    .bar {
        height:600px;
    }
    .charts {
         width: 600px;
         display: inline-block;
    }
</style>