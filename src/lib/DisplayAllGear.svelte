<script lang="ts">
    import DisplaySingleGear from "./DisplaySingleGear.svelte";
    import type { GearFilters, GearType } from "./types/types";
    import {
        GearDbSchema,
        type GearDb,
        type GearSeedDatabase,
        type HaveGearMap,
    } from "./types/typesLeanny";
    import type { GearParam } from "./types/typesParams";
    import type { WasmGear } from "./wasmHelpers/helperFunctions";

    export let userGearDatabase: GearSeedDatabase;
    export let globalDesiredAbilities: number[][];
    let gearDb: GearDb;
    $: gearDb = userGearDatabase.GearDB;

    export let allWasmGear:{
        "Head":{[key:string]:WasmGear},
     "Clothes":{[key:string]:WasmGear},
       "Shoes":{[key:string]:WasmGear},
    };
    export let howFarToCheck:number;
    export let gearFilters:GearFilters;


    $: filterGear= (gearType:GearType,[gearId, gear]:[string,HaveGearMap],gearIndex:number)=>{
        if(gear.RandomContext ==0)return false;// Gear With No Seed
        // if(!gearFilters[`show${gearType}Gear`])return false;
        return true;
    }

</script>


<table>
    <tr>
        <th>Select</th>
        <th>Gear</th>
        <th>Abilities</th>
        <th>Allow Chunks?</th>
        <th>Possible Gear Abilities</th>
    </tr>
    {#each Object.entries(gearDb.HaveGearHeadMap) .filter(filterGear.bind(this,"Head")).slice(0, 5) as [gearId, gear], headIndex}
        <DisplaySingleGear bind:globalWasmGear={allWasmGear["Head"][gearId]} {gearId} {gear} {globalDesiredAbilities} {howFarToCheck} {gearFilters} gearType="Head" />
    {/each}
    {#each Object.entries(gearDb.HaveGearClothesMap).filter(filterGear.bind(this,"Clothes")).slice(0, 5) as [gearId, gear], clothesIndex}
        <DisplaySingleGear bind:globalWasmGear={allWasmGear["Clothes"][gearId]} {gearId} {gear} {globalDesiredAbilities} {howFarToCheck} {gearFilters} gearType="Clothes" />
    {/each}
    {#each Object.entries(gearDb.HaveGearShoesMap).filter(filterGear.bind(this,"Shoes")).slice(0, 5) as [gearId, gear], shoesIndex}
        <DisplaySingleGear bind:globalWasmGear={allWasmGear["Shoes"][gearId]} {gearId} {gear} {globalDesiredAbilities} {howFarToCheck} {gearFilters} gearType="Shoes" />
    {/each}
</table>

<style>
    table,
    th {
        border-collapse: collapse;
        border: 2px solid black;
    }
</style>
