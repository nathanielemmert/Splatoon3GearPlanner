<script lang="ts">
    import { gearInfo } from "../assets/gearInfoParams";
    import { VERSION } from "../main";
    import GearImage from "./ImageTypes/GearImage.svelte";
    import MainAbilityImage from "./ImageTypes/MainAbilityImage.svelte";
    import SubAbilityImages from "./ImageTypes/SubAbilityImages.svelte";
    import SingleGearResultTable from "./SingleGearResultTable.svelte";
    import type { GearFilters, GearType } from "./types/types";
    import type { HaveGearMap } from "./types/typesLeanny";
    import {getBrandNumber,type WasmGear,} from "./wasmHelpers/helperFunctions";

    export let howFarToCheck:number;
    export let gearId: string;
    export let gear: HaveGearMap;
    export let gearType: "Head" | "Clothes" | "Shoes";
    export let globalDesiredAbilities: number[][];
    export let globalWasmGear: WasmGear;
    export let gearFilters:GearFilters;
    let localWasmGear: WasmGear;
    $:localWasmGear = {
                      seed: gear.RandomContext,
                      brand: getBrandNumber(params_gearInfo.Brand),
                      desired_abilities: globalDesiredAbilities,
                  }

    let hideResultTable: boolean = true;
    function toggleResultTable(e: Event) {
        const target = e.target as HTMLButtonElement;
        hideResultTable = !hideResultTable;
    }

    $: params_gearInfo = gearInfo[gearType][gearId];
    $: gear_filename = params_gearInfo.__RowId;

    function toggleGearIntoGearPlan(e: Event) {
        const target = e.target as HTMLInputElement;
        globalWasmGear =
            (target.checked === true)
                ? localWasmGear
                : undefined;
    }

    $: {
            //TODO: if this piece of gear doesnt meet the filters:
            // 1. make this gear invisible. 
            // 2. make sure that the gear is toggled out of the gearPlan, even if it is still invisibly checked

            //Hint: to implement "show only gear without tickets" option:
            // I will have to loop through the singleGearResult (not the summarized one)
            // and manually filter out all entries that use tickets. 
            // Once it is filtered like this, it can be displayed as normal.
            //
            //Although, the wasm code really needs to be modified to allow chunks.



           
        // if(gear.RandomContext ==0)return false;// Gear With No Seed
        // if(!gearFilters[`show${gearType}Gear`])return false;
    }
    

</script>

<tr>
    <td class="gear-checkbox">
        <input type="checkbox" on:change={toggleGearIntoGearPlan} />
    </td>
    <td class="gear-image">
        <GearImage {gear_filename} />
    </td>
    <td class="ability-images">
        <div class="container">
            <MainAbilityImage abilityId={gear.MainSkill.toString()} />
            <SubAbilityImages abilityIds={gear.ExSkillArray} />
        </div>
    </td>
    <td>
        <input type="checkbox" />
    </td>
    <td>
        <button id="toggle" on:click={toggleResultTable}>
            {hideResultTable ? "Show" : "Hide"}
        </button>
    </td>
</tr>

<tr style={hideResultTable ? "display:none" : ""}>
    <td colspan="10">
        <SingleGearResultTable {localWasmGear} bind:howFarToCheck />
    </td>
</tr>

<style>
    td {
        border: 2px solid black;
    }
</style>
