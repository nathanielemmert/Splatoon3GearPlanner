import { purify_all_gear as _purify_all_gear, type __Record36, ValueToAbilityCombo } from "../../../build/release"
import { brand_data } from "../../old_splatoon_data/splatoon3_data_2";

export type WasmMap<A,B> = {keys:A[], values:B[]};

export type TicketSet = {value:number};//u16
export type TicketCombo_N_Length=bigint;
export type SixteenAbilityCombo_Value=bigint;
export type GearPlan = { soonest_index: number; actual_ticket_combo: {value:number}[];}
export type MultipleGearResult=WasmMap<TicketCombo_N_Length, WasmMap<SixteenAbilityCombo_Value, GearPlan>[]>;
export type SingleGearResult =  Array< WasmMap< SixteenAbilityCombo_Value, Array<TicketSet[]> >>//ReturnType<typeof purify_single_gear>;




 export type WasmGear ={
    /** @type `u32` */
    seed: number;
    /** @type `u32` */
    brand: number;
    /** @type `Array<Array<i32>>` */
    desired_abilities: number[][];
  };



export function WasmMapToJSMap<A,B>(external_map:WasmMap<A,B>){
    return new Map(external_map.keys.map((key:A, index:number)=>([key,external_map.values[index]]as const)))
}

export function BigIntToTicketCombo(ticketCombo:bigint){
    return ValueToAbilityCombo(ticketCombo).map((i) => i.value)
}

export function BigIntToAbilityCombo(abilityCombo:bigint){
    return ValueToAbilityCombo(abilityCombo).map((i) => i.value)
}

export function WasmToJsAbilityCombo(abilityCombo:{value:number}[]){
    return abilityCombo.map((i) => i.value)
}

export function WasmToJsTicketCombo(ticketCombo:{value:number}[]){
    return ticketCombo.map((i) => i.value)
}


// function purify_all_gear(gear_list:WasmGear[]):WasmMap<bigint,Array<WasmMap<bigint,GearPlan>>>{
//     const result = _purify_all_gear(gear_list);
//     return result;
//     // ExternalMap<TicketCombo_N_Length, ExternalMap<SixteenAbilityCombo_Value, GearPlan>[]>
// }

const brand_traits = brand_data["Traits"];
export function getBrandNumber(internal_brand_name: string) {
    return Object.keys(brand_traits).findIndex(
        (value: string) => value === internal_brand_name
    );
}

