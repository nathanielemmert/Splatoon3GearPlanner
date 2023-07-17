<script lang="ts">
    import { gearInfo } from "../../assets/gearInfoParams";
    import SubAbilityImages from "../ImageTypes/SubAbilityImages.svelte";
    import TicketComboImages from "../ImageTypes/TicketComboImages.svelte";
    import type { GearType } from "../types/types";
    import {
        WasmMapToJSMap,
        type MultipleGearResult,
        BigIntToAbilityCombo,
        WasmToJsTicketCombo,
    } from "../wasmHelpers/helperFunctions";
    import GearImage from "../ImageTypes/GearImage.svelte";
    import SmallGearImage from "../ImageTypes/SmallGearImage.svelte";
    import MainAbilityImage from "../ImageTypes/MainAbilityImage.svelte";
    import type { GearSeedDatabase } from "../types/typesLeanny";

    export let userGearDatabase:GearSeedDatabase;
    export let ticketComboIndex: number;
    export let ticketCombo: number[];
    export let ticketComboResult: MultipleGearResult["values"][number];
    export let resultIndexToGearId: {
        [key: number]: [gearType: GearType, gearId: string];
    };

    let hideResultTable: boolean = true;
    function toggleResultTable(e: Event) {
        const target = e.target as HTMLButtonElement;
        hideResultTable = !hideResultTable;
    }
</script>

<tr>
    <td>
        {ticketComboIndex}</td>
    <td>
        <TicketComboImages abilityIds={ticketCombo} />
    </td>
    <td>
        <button on:click={toggleResultTable}>{hideResultTable?"Show":"Hide"}</button>
    </td>
</tr>
<tr />
<tr style={hideResultTable ? "display:none" : ""}>
    <td colspan="10">
        <div>
            <table>
                <thead>
                    <tr>
                        <th colspan="10"><h3>HOW TO PURIFY EACH PIECE OF GEAR</h3></th>
                    </tr>
                    <tr>
                        <th colspan="2" >Using the above tickets, these are your choices of abilties for each gear.</th>
                        <th style="max-width: 9rem;">Step 1: Roll this many abilities on your gear and scrub.</th>
                        <th>Step 2: Roll the next three slots on your gear, using these tickets for each slot.</th>
                    </tr>
                </thead>
                {#each ticketComboResult as gearResult, gearResultIndex}
                    {@const [gearType, gearId] =resultIndexToGearId[gearResultIndex]}
                    {@const gear_filename = gearInfo[gearType][gearId].__RowId}
                    {@const gearMainAbility = userGearDatabase.GearDB[`HaveGear${gearType}Map`][gearId].MainSkill}
                    {@const jsGearResult = WasmMapToJSMap(gearResult)}

                    {#each jsGearResult as gearPlan,gearPlanIndex}
                        <tr>
                            {#if gearPlanIndex===0}
                            <td rowspan={jsGearResult.size} style="text-align: right">
                                <div class="gear-image" >
                                    <SmallGearImage {gear_filename} />
                                    <MainAbilityImage abilityId={gearMainAbility.toString()}/>
                                </div> 
                            </td>
                            {/if}
                            <td align="left"><SubAbilityImages abilityIds={BigIntToAbilityCombo(gearPlan[0])}/></td>
                            <td>{gearPlan[1].soonest_index}</td>
                            <td><TicketComboImages abilityIds={WasmToJsTicketCombo( gearPlan[1].actual_ticket_combo )} /></td>
                        </tr>
                    {/each}
                {/each}
            </table>
        </div>
    </td>
</tr>

<style>
    .gear-image{
        /* display: inline-block;
        align-items: center;
        vertical-align: middle; */
        display: flex;
        align-items: center;
        justify-content: right;
    }
</style>
