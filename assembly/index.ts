// The entry file of your WebAssembly module.

import { JSON } from "assemblyscript-json/assembly";
import './params'
import {get_ability_weight, max_brand_num, max_brand_num_drink} from "./params";
import {
    _Ability,
    Ability,
    Ability_Value,
    _SixteenAbilityCombo,
    _Ticket,
    Ticket,
    _TicketSet, SixteenAbilityCombo, TicketSet
} from "./Custom_Objects_2";
export { purify_single_gear} from "./process_single_gear"
export * from "./process_all_gear_at_once"


export function ValueToAbilityCombo(val:u64):Array<Ability>{
    return _SixteenAbilityCombo.toAbilityCombo(val);
}

export function AbilityComboToValue(abilities:Array<Ability_Value>):u64{
    return new _SixteenAbilityCombo(abilities.map((a:Ability_Value):Ability=>new _Ability(a))).value
}

export function ValueToTicketSet(val:u16):Array<Ticket>{
    return TicketSet.fromValue(val).toTickets();
}







export function add(a: i32, b: i32): i32 {//console.log("ADD "+ability_names.toString());

  return a+b;
}

 export function advance_seed(x32: u32 ): u32 {
  x32 ^= x32 << 13;
  x32 ^= x32 >> 17;
  x32 ^= x32 << 5;
  return x32;

}

export function get_ability( seed:u32, brand:u32, drink:u32 ): Array<u32> {
    seed = advance_seed(seed);
    let ret:u32 = get_branded_ability(seed, brand);
    if(drink != 0xFFFFFFFF) {
        if(seed % 0x64 <= 0x1D) {
            return [drink, seed];
        }
        seed = advance_seed(seed);
        ret = get_branded_ability_with_drink(seed % max_brand_num_drink(brand, drink), brand, drink);
    }
    return [ret, seed];
}


// CANONICAL LEANNY FUNCTIONS
function get_branded_ability( seed: u32, brand: u32): u32 {
  const ability_roll: i32 = seed % max_brand_num(brand);//TODO: leanny declares this as i32
  return weighted_ability(ability_roll, brand);
}

export function weighted_ability(ability_roll : i32, brand : u32) : u32 {//TODO: dont export
  let ability:u32 = -1;
  while(ability_roll >= 0) {
      ability++;
      ability_roll -= get_ability_weight(brand, ability);
  }
  return ability;
}


// FUNCTIONS ADDED BY ME
function get_branded_ability_with_drink( seed: u32, brand: u32, drink:u32): u32 {
    const ability_roll: i32 = seed % max_brand_num_drink(brand, drink);//TODO: leanny declares this as i32
    return weighted_ability_with_drink(ability_roll, brand, drink);
}

function weighted_ability_with_drink(ability_roll : i32, brand : u32, drink : u32) : u32 {
    let ability:u32 = -1;
    while(ability_roll >= 0) {
        ability++;
        ability_roll -=  (ability==drink)? 0 : get_ability_weight(brand, ability);
    }
    return ability;
}





