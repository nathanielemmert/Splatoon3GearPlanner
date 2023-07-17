<script lang="ts">
    import { ValueToAbilityCombo } from "../../../build/release";
    import TicketComboImages from "../ImageTypes/TicketComboImages.svelte";
    import type { GearType } from "../types/types";
    import type { GearSeedDatabase } from "../types/typesLeanny";
    import {WasmMapToJSMap,type MultipleGearResult, BigIntToTicketCombo,} from "../wasmHelpers/helperFunctions";
    import TicketComboPlan from "./TicketComboPlan.svelte";

    export let multipleGearResult: MultipleGearResult;
    export let resultIndexToGearId:{[key:number]:[gearType:GearType,gearId:string]};
    export let userGearDatabase:GearSeedDatabase;

    $: test = WasmMapToJSMap(multipleGearResult);
    $: console.log(multipleGearResult.keys.map((i) => "0x" + i.toString(16)));
</script>
{#if test.size===0}
No Results Found
{:else}

<div>
<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Tickets</th>
            <th>Show Details</th>
        </tr>
    </thead>
    {#each test as [ticketCombo, ticketComboResult],ticketComboIndex}
        <TicketComboPlan {resultIndexToGearId} {ticketComboIndex} {ticketComboResult} ticketCombo={BigIntToTicketCombo(ticketCombo)} {userGearDatabase}/>
    {/each}
</table>
</div>

{/if}
