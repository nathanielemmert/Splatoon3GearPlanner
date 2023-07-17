import {advance_seed, get_ability} from "./index";
import {
    _Ability,
    Ability_Value,
    _SixteenAbilityCombo,
    SixteenAbilityCombo_Value,
    ExternalGear,
    ExternalMap,
    GearSeed,
    InternalGear,
    _Ticket,
    Ticket_Value,
    _TicketSet,
    TicketSetCombo, TicketSet, Ability, SixteenAbilityCombo
} from "./Custom_Objects_2"




export function purify_single_gear(gear:ExternalGear, how_far_to_check:i32 = 20):Array<  ExternalMap<SixteenAbilityCombo_Value, Array<TicketSetCombo>>  >{ //TODO: actually returns Map<AbilityComboID, Map<u32,Array<TicketSetCombo >>>          //TODO: implement how_far_to_check
    const start_seed: u32 = gear.seed;
    const brand: u32 = gear.brand;
    const desired_abilities:Set<SixteenAbilityCombo_Value> = InternalGear.fromExternalGear(gear).desired_abilities;


    let indexed_result = new Array<  ExternalMap<SixteenAbilityCombo_Value, Array<TicketSetCombo>>  >();//size how_far_to_check

    let seed = start_seed;
    for(let start_index = 0; start_index<how_far_to_check;start_index++){
        const next_gear_index:InternalGear = {seed:seed, brand:brand, desired_abilities:desired_abilities};
        let internal_map = purify_single_gear_index(next_gear_index);
        indexed_result.push(ExternalMap.fromInternalMap(internal_map));
        seed = advance_seed(seed);
    }

    return indexed_result;
}

function setToString(set:Set<SixteenAbilityCombo_Value>):string{
    return set.values().map((v:SixteenAbilityCombo_Value) : string =>v.toString(16)).join(", ")
}


var next_ability:Ability_Value;
function purify_single_gear_index(gear:InternalGear):Map<SixteenAbilityCombo_Value, Array<TicketSetCombo>>{// :Map<AbilityComboID, Array<TicketSetCombo>> //TODO: could be Map<EightAbilityCombo_Value, Set<FourTicketSetCombo_Value>> if i cared enough
    const gear_seed: u32 = gear.seed;
    const gear_brand: u32 = gear.brand;
    const desired_abilities:Set<SixteenAbilityCombo_Value> = gear.desired_abilities;



    // if all desired abilities are empty: return {():[()]}
    if(desired_abilities.values().every( (combo:SixteenAbilityCombo_Value)=>_SixteenAbilityCombo.size(combo)==0 )){
        const empty_ability_combo:SixteenAbilityCombo_Value = new _SixteenAbilityCombo([]).value;
        const empty_ticket_set_combo:TicketSetCombo = [];

        let return_value = new Map<SixteenAbilityCombo_Value, Array<TicketSetCombo>>();
        return_value.set(empty_ability_combo, [empty_ticket_set_combo]);
        return return_value;
    }
    let possible_next_abilities: Map<Ability_Value, Map<GearSeed, TicketSet >> = check_single_gear_possible_next_abilities(gear);
    let possible_purified_abilities = new Map<SixteenAbilityCombo_Value, Array<TicketSetCombo>>();

    //for each possible ability, for each possible next seed
    for(let i = 0; i<possible_next_abilities.size;i++){//TODO: this can probably be changed to a chained array map / reduce
        // const next_ability = possible_next_abilities.keys()[i]; //TODO: THIS SHOULD NOT HAVE TO BE A GLOBAL VARIABLE, FUCK ASSEMBLYSCRIPT FOR NOT IMPLEMENTING CLOSURES
        next_ability = possible_next_abilities.keys()[i];
        const possible_next_seeds = possible_next_abilities.values()[i];
        for(let j = 0;j<possible_next_seeds.size;j++){
            const next_seed:GearSeed = possible_next_seeds.keys()[j];

            const next_desired_abilities:Set<SixteenAbilityCombo_Value> = new Set<SixteenAbilityCombo_Value>();
            for (let k = 0; k < desired_abilities.size; k++) {
                let desired_ability_combo:Array<Ability> = SixteenAbilityCombo.toAbilityCombo(desired_abilities.values()[k]);
                if(desired_ability_combo.length>0 && next_ability == desired_ability_combo[0].value){
                    next_desired_abilities.add((new _SixteenAbilityCombo(desired_ability_combo.slice(1))).value)//TODO: get first
                }
            }

            let next_purified_abilities:Map<SixteenAbilityCombo_Value, Array<TicketSetCombo>> = purify_single_gear_index({seed: next_seed, brand: gear_brand, desired_abilities:next_desired_abilities});

            for(let k = 0; k<next_purified_abilities.size;k++){
                const key:SixteenAbilityCombo_Value = next_purified_abilities.keys()[k];
                //////// TODO: this block of code is prepending an ability to an AbilityComboID. If i created a function to do that, it would be more compact /////////////////////////////////////////////////////////////
                const next_key_ability_combo = [(new _Ability(next_ability)) as Ability].concat(SixteenAbilityCombo.toAbilityCombo(key));//Todo: Ability.from(value) static method
                const next_key:SixteenAbilityCombo_Value = (new _SixteenAbilityCombo(next_key_ability_combo)).value;// = (next_ability, *key)
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                const ticket_set_combos:Array<TicketSetCombo> = next_purified_abilities.get(key);
                for(let m = 0; m<ticket_set_combos.length;m++){
                    let ticket_set_combo = ticket_set_combos[m];
                    if(!possible_purified_abilities.has(next_key))possible_purified_abilities.set(next_key, [])
                    const next_ticket_set_combo:TicketSetCombo = [possible_next_abilities.get(next_ability).get(next_seed)].concat(ticket_set_combo);// = (possible_next_abilities[(next_ability, next_seed)], *ticket_set_combo)
                    possible_purified_abilities.get(next_key).push(next_ticket_set_combo)
                }
            }
        }
    }

    return possible_purified_abilities;
}




function check_single_gear_possible_next_abilities(gear:InternalGear): Map<  Ability_Value, Map<GearSeed, TicketSet >  >{
    const gear_seed: u32 = gear.seed;
    const gear_brand: u32 = gear.brand;
    const desired_abilities: Set<SixteenAbilityCombo_Value> = gear.desired_abilities;

    /*const debug_print=false;
    if(debug_print)console.log("check_single_gear_possible_next_abilities   seed: "+gear_seed.toString(16));
    if(debug_print)console.log("check_single_gear_possible_next_abilities   desired_abilities.size: "+desired_abilities.size.toString());*/



    let possible_next_abilities = new Map<Ability_Value,Map<GearSeed,TicketSet>>();
    let needed_next_abilities = new Set<Ability_Value>();
    for (let i = 0; i < desired_abilities.size; i++) {
        let ability_combo:Array<Ability> = SixteenAbilityCombo.toAbilityCombo(desired_abilities.values()[i]);
        if(ability_combo.length>0)needed_next_abilities.add(ability_combo[0].value);
    }
    /*if(debug_print)console.log("check_single_gear_possible_next_abilities   needed_next_abilities: "+needed_next_abilities.values().toString());*/
    let allowed_next_drinks:Array<Ticket_Value> = [0xFFFFFFFF,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];//TODO: this should be passed in as a variable, and change based on the players ticket inventory

    for(let i = 0; i<allowed_next_drinks.length;i++){
        const next_drink:Ticket_Value = allowed_next_drinks[i];
        const gear_result = get_ability(gear_seed, gear_brand, next_drink);
        const next_ability:Ability_Value = gear_result[0];
        const next_seed:GearSeed = gear_result[1];
        /*if(debug_print)console.log("    check_single_gear_possible_next_abilities   drink: "+next_drink.toString(16)+", next_ability: "+next_ability.toString()+", next_seed: "+next_seed.toString());*/
        if(needed_next_abilities.has(next_ability)){
            if(!possible_next_abilities.has(next_ability)) possible_next_abilities.set(next_ability, new Map());
            let possible_next_seeds = possible_next_abilities.get(next_ability);
            //console.log("check_single_gear_possible_next_abilities next_ability: "+next_ability.toString())
            if(!possible_next_seeds.has(next_seed)) possible_next_seeds.set(next_seed, new _TicketSet());
            possible_next_seeds.get(next_seed).add(new _Ticket(next_drink))
        }
    }
    /*if(debug_print)console.log("check_single_gear_possible_next_abilities RETURN   possible_next_abilities keys: "+possible_next_abilities.keys().toString());
    if(debug_print)console.log("check_single_gear_possible_next_abilities RETURN   possible_next_abilities size: "+possible_next_abilities.size.toString());*/
    return possible_next_abilities;
}


// ---- PROCESS SINGLE GEAR ----

