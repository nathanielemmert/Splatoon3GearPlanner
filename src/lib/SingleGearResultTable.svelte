<script lang="ts">
    import type { HaveGearMap } from "./types/typesLeanny";
    import type { GearParam } from "./types/typesParams";
    import {purify_single_gear,ValueToAbilityCombo,} from "../../build/release";
    import {brand_data} from "../old_splatoon_data/splatoon3_data_2";
    import SubAbilityImages from "./ImageTypes/SubAbilityImages.svelte";
    import { BigIntToAbilityCombo, getBrandNumber, type SingleGearResult, type WasmGear, type WasmMap } from "./wasmHelpers/helperFunctions";

    // export let gear: HaveGearMap;
    // export let params_gearInfo: GearParam;
    // export let desiredAbilities: number[][];
    export let localWasmGear:WasmGear;
    export let howFarToCheck:number;

    $:console.log(howFarToCheck);
    


    const brand_traits = brand_data["Traits"];
    

    
    function find_soonest_index_for_each_desired_ability(result: SingleGearResult) {
        let returnmap: { [key: string]: { soonest_index: number,num_tickets_used:number } } = {};

        //ValueToAbilityCombo
        for (let gear_index = 0; gear_index < result.length; gear_index++) {
            for (const desired_ability of result[gear_index].keys) {
                // result[gear_index].values is the TicketSetCombo[], can be used to find combos which use NO TICKETS
                if (!(desired_ability.toString() in returnmap)) {
                    returnmap[desired_ability.toString()] = {
                        soonest_index: gear_index,
                        num_tickets_used:0
                    };
                }
            }
        }
        return returnmap;
    }

    function filter_out_all_tickets(result: SingleGearResult) {
        //TODO: IMPLEMENT THIS function TO DISPLAY GEAR PURIFIABLE WITH NO TICKETS:

        //I will have to loop through the singleGearResult 
        // and manually filter out all entries that require using any tickets. 

        // let returnmap: { [key: string]: { soonest_index: number,num_tickets_used:number } } = {};

        // //ValueToAbilityCombo
        // for (let gear_index = 0; gear_index < result.length; gear_index++) {
        //     for (const desired_ability of result[gear_index].keys) {
        //         // result[gear_index].values is the TicketSetCombo[], can be used to find combos which use NO TICKETS
        //         if (!(desired_ability.toString() in returnmap)) {
        //             returnmap[desired_ability.toString()] = {
        //                 soonest_index: gear_index,
        //                 num_tickets_used:0
        //             };
        //         }
        //     }
        // }
        // return returnmap;
    }


    let single_gear_result:SingleGearResult;
    $: {
        single_gear_result= purify_single_gear(localWasmGear,howFarToCheck);

        //TODO: IMPLEMENT THIS CODE TO DISPLAY GEAR PURIFIABLE WITH NO TICKETS
        
        //if(gearFilters.dontAllowTickets){
            //empty1 = check to see if single_gear_result is empty here
            //single_gear_result = filter_out_all_tickets(single_gear_result)
            //empty2 = check to see if single_gear_result is empty again

            //if empty1=false and empty2=true, hide this gear and make sure it isnt checked.
        //}
    }


    $: summarized_gear_result = 
    Object.entries(find_soonest_index_for_each_desired_ability(single_gear_result))
    .map( ([abilityComboString,{soonest_index,num_tickets_used}])=>[
       BigIntToAbilityCombo(BigInt(abilityComboString)),
        {soonest_index,num_tickets_used}
    ] as const)
    .sort( (entry1,entry2)=>entry1[1].soonest_index-entry2[1].soonest_index);
    //.sort( (entry1,entry2)=>entry1[0][0]-entry2[0][0]); // internal ability order
</script>
<div>
    <table>
        <tr>
            <th>
                Abilities
            </th>
            <th>
                Soonest Index
            </th>
            <th>
                # of Tickets used at that Index
            </th>
        </tr>
        {#each summarized_gear_result as [abilityIds,{soonest_index,num_tickets_used}] }
            <tr>
                <td>
                    <SubAbilityImages {abilityIds} />
                </td>
                <td>
                    {soonest_index}
                </td>
                <td>
                    {num_tickets_used}
                </td>
            </tr>
        {/each}
    </table>
</div>

