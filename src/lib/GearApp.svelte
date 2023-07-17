<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import { purify_all_gear } from "../../build/release";
    import App from "../App.svelte";
    import DisplayAllGear from "./DisplayAllGear.svelte";
    import DisplayDesiredAbilities from "./DisplayDesiredAbilities.svelte";
    import FileInput from "./SingleUseInputs/JsonFileInput.svelte";
    import MultipleGearTable from "./MultipleGearResult/MultipleGearTable.svelte";
    import type { GearType } from "./types/types";
    import type { GearSeedDatabase } from "./types/typesLeanny";
    import type { MultipleGearResult, TicketCombo_N_Length, WasmGear, WasmMap } from "./wasmHelpers/helperFunctions";
    import {gearDbStore} from "./stores/stores"
    import InputHowFarToCheck from "./SingleUseInputs/InputHowFarToCheck.svelte";
    import InputTicketDepthLimit from "./SingleUseInputs/InputTicketDepthLimit.svelte";
    import InputCheckFullTicketDepth from "./SingleUseInputs/InputCheckFullTicketDepth.svelte";
    import GearFilters from "./SingleUseInputs/GearFilters.svelte";


    

    let userGearDatabase:GearSeedDatabase;

    

    let gearFilters={
        showHeadGear:true,
        showClothesGear:true,
        showShoesGear:true,
    }

    let howFarToCheck:number=20;
    let ticketDepthLimit:number = 3;
    let alwaysCheckFullTicketDepth:boolean=false;
    $:console.log(alwaysCheckFullTicketDepth);

    let globalDesiredAbilities:number[][] = [...Array(14).keys()].map(i =>[i,i,i]);

    let wasmGearHead: {[key:string]:WasmGear} = {};
    let wasmGearClothes: {[key:string]:WasmGear} = {};
    let wasmGearShoes: {[key:string]:WasmGear} = {};
    $:allWasmGear= {
        "Head":wasmGearHead,
        "Clothes":wasmGearClothes,
        "Shoes":wasmGearShoes,
    };
    
    

    let gearToPurifyTogether: WasmGear[]=[];
    let resultIndexToGearId:{[key:number]:[gearType:GearType,gearId:string]};
    $:{
        resultIndexToGearId = {}
        let resultIndex=0;
        function addGearToMap(type:GearType,[gearId,g]:[string,WasmGear]):boolean{
            if(g!=null)resultIndexToGearId[resultIndex++]= [type,gearId]
            return g!=null
        }
        gearToPurifyTogether = [
            ...(Object.entries(allWasmGear["Head"]).filter( addGearToMap.bind(this,"Head") )).map(g =>g[1]),
            ...(Object.entries(allWasmGear["Clothes"]).filter( addGearToMap.bind(this,"Clothes") )).map(g =>g[1]),
            ...(Object.entries(allWasmGear["Shoes"]).filter( addGearToMap.bind(this,"Shoes") )).map(g =>g[1]),
        ];
    }


    let multipleGearResult:MultipleGearResult;
    $:{
        multipleGearResult = purify_all_gear(gearToPurifyTogether,howFarToCheck,ticketDepthLimit,alwaysCheckFullTicketDepth);
        //FIXME: Add ticketDepthLimit number input (with warning that anything higher than 5 will be too slow)
        //FIXME: Add checkbox for alwaysCheckFullDepth

    }



</script>

<FileInput bind:gearSeedDatabase={userGearDatabase} /><br/>

{#if userGearDatabase}
    <GearFilters bind:gearFilters/>
    <div class="number-input"><InputHowFarToCheck bind:howFarToCheck/></div>
    <div class="number-input"><InputTicketDepthLimit bind:ticketDepthLimit/></div>
    <div class="number-input"><InputCheckFullTicketDepth bind:alwaysCheckFullTicketDepth/></div>

    <DisplayDesiredAbilities bind:desiredAbilities={globalDesiredAbilities}/>
    <DisplayAllGear bind:allWasmGear bind:userGearDatabase {howFarToCheck} {globalDesiredAbilities} {gearFilters}/>
    <MultipleGearTable {multipleGearResult} {resultIndexToGearId} {userGearDatabase}/>
{/if}

<style>
    .number-input{
        display: flex; 
        justify-content: flex-end
    }
</style>


