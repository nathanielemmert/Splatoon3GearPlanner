import {
    ExternalGear,
    ExternalMap, SixteenAbilityCombo_Value,
    _Ticket, Ticket,
    Ticket_Value,
    _TicketCombo, TicketCombo, TicketComboToExternal,
    _TicketSet, TicketSet,
    _TicketSetCombo, TicketSetCombo
} from "./Custom_Objects_2";
import {purify_single_gear} from "./process_single_gear";
import {GearPlan, list_all_gear_abilities_for_each_ticket_combo, TicketCombo_N_Length} from "./all_gear_output_table";


function mapped_gear_solution_to_ticketsetcombo_array(mapped_gear_solution:Array<ExternalMap<SixteenAbilityCombo_Value,Array<TicketSetCombo>>>, remove_sets_with_NoneTicket:bool=false):Array<TicketSetCombo>{

    let all_ticket_set_combos:Array<TicketSetCombo> = [];//TODO: This array should really be a set, once converting ticketsetcombo to and from u64 is implemented.
    for (let i = 0; i < mapped_gear_solution.length; i++) {
        for (let j = 0; j < mapped_gear_solution[i].values.length; j++) {
            for (let k = 0; k < mapped_gear_solution[i].values[j].length; k++) {
                let combo:TicketSetCombo = mapped_gear_solution[i].values[j][k];
                if(remove_sets_with_NoneTicket){
                    combo = combo.filter((s:TicketSet):bool=>!s.contains(new _Ticket(0xf)))//TODO: IMPORTANT: THIS LINE REMOVES ALL TICKET SETS WITH "No Ticket" as a ticket choice.
                }
                all_ticket_set_combos.push(combo);
            }
        }
    }
    return all_ticket_set_combos;

}

function simplify_ticketsetcombos(combos:Array<TicketSetCombo>):Array<TicketSetCombo>{
    return combos
}


export function purify_all_gear(gear_list:Array<ExternalGear>,how_far_to_check:u32=20,depth_limit:u32=5,always_check_full_depth:bool=false): ExternalMap<TicketCombo_N_Length, ExternalMap<SixteenAbilityCombo_Value, GearPlan>[]>{


    let gear_ticket_set_combos : Array<TicketSetCombo[]> = [];
    let mapped_gear_solutions : Array<ExternalMap<SixteenAbilityCombo_Value,Array<TicketSetCombo>>>[]=[];

    for (let g = 0; g < gear_list.length; g++) {
        const external_gear = gear_list[g];
        const  mapped_gear_solution : Array<ExternalMap<SixteenAbilityCombo_Value,Array<TicketSetCombo>>> =  purify_single_gear(external_gear,how_far_to_check);
        const gear_solution = mapped_gear_solution_to_ticketsetcombo_array(mapped_gear_solution,true);
        const simplified_gear_solution = simplify_ticketsetcombos(gear_solution);
        gear_ticket_set_combos.push(simplified_gear_solution);

        mapped_gear_solutions.push(mapped_gear_solution);
    }

    // let final_ticket_combos=(always_check_full_depth)?purify_all_gear_DFS(gear_ticket_set_combos,depth_limit):purify_all_gear_BFS(gear_ticket_set_combos,depth_limit);
    let final_ticket_combos=purify_all_gear_BFS(gear_ticket_set_combos,depth_limit,always_check_full_depth);


    const final_result = list_all_gear_abilities_for_each_ticket_combo(final_ticket_combos, mapped_gear_solutions);

    return final_result;
    // TODO: should return a list of ticket combos, along with all indexes which they would work.
    // After simplification is implemented, the input combo might be only one long, but the output ticket combo should be a fixed three long, and include a ticket of None.
}







function purify_all_gear_BFS(gear_list:Array< Array<TicketSetCombo> >, depth_limit:i32,always_check_full_depth:bool=false):Array<TicketCombo>{
    let result:Array<TicketCombo> = [];
    for (let limit = 0; limit <= depth_limit; limit++) {
        let next_result = purify_all_gear_DFS(gear_list,limit,always_check_full_depth);
        if(next_result.length>0){
            result = result.concat(next_result);
            if(always_check_full_depth==false)break;
        }
    }
    return result;
}

function ticket_set_combo_is_empty(combo:TicketSetCombo):boolean{
    return combo.length==0;
}

function all_gear_is_already_purified(gear_list:Array< Array<TicketSetCombo> >):bool{
    return gear_list.every((gear:TicketSetCombo[]):bool =>{
        return gear.some((combo:TicketSetCombo):bool=> ticket_set_combo_is_empty(combo) )
    })
}

function find_needed_tickets(gear_list:Array< Array<TicketSetCombo> >):TicketSet{
    let needed_tickets: TicketSet = new _TicketSet();

    for (let g = 0; g < gear_list.length; g++) {
        for (let c = 0; c < gear_list[g].length; c++) {
            const gear = gear_list[g];
            const combo = gear[c];
            if(ticket_set_combo_is_empty(combo))continue

            const next_ticket_set = combo[0];
            needed_tickets.union_inPlace(next_ticket_set);
            if(needed_tickets.value == 0x0011111111111111 || needed_tickets.value == 0x1011111111111111)return needed_tickets //TODO: if needed_tickets is full, return early
        }
    }
    return needed_tickets;
}
let global_ticket:Ticket = new _Ticket(0xf);
function apply_ticket_to_all_gear(ticket:Ticket, gear_list:Array< Array<TicketSetCombo> >):Array< Array<TicketSetCombo> >{
    global_ticket=ticket;
    return gear_list.map((combo_list:Array<TicketSetCombo>):Array<TicketSetCombo>=>apply_ticket_to_all_ticketsetcombos(global_ticket, combo_list));
}

function apply_ticket_to_all_ticketsetcombos(ticket:Ticket, combo_list:Array<TicketSetCombo>):Array<TicketSetCombo>{
    return combo_list.map((combo:TicketSetCombo):TicketSetCombo=>apply_ticket_to_single_ticketsetcombo(global_ticket, combo));
}

function apply_ticket_to_single_ticketsetcombo(ticket:Ticket, combo:TicketSetCombo):TicketSetCombo{
    //return (combo.length>0 && combo[0].contains(global_ticket)) ? combo.slice(1) : combo ;
    if(combo.length>0 && combo[0].contains(global_ticket)){
        if(combo.length<=global_remaining_depth_limit)global_ticket_was_used=true;
        return combo.slice(1);
    }
    else{
        return combo
    }
    
}

let global_ticket_prepend:Ticket = new _Ticket(0xf);
function prepend_ticket_to_all_combos(ticket:Ticket, combos: Array<TicketCombo>):void{//TODO: this might be a good idea to do through copy instead. combos.map combo => [ticket].concat(combo)
    global_ticket_prepend = ticket;
    combos.forEach((combo:TicketCombo):void =>{ combo.unshift(global_ticket_prepend) })
}

let global_ticket_was_used = false;
let global_remaining_depth_limit=10;

function purify_all_gear_DFS(gear_list:Array< Array<TicketSetCombo> >, depth_limit:i32,always_check_full_depth:bool=false):Array<TicketCombo>{
    if(depth_limit<0)return [];


    if(always_check_full_depth==false && all_gear_is_already_purified(gear_list)
    || always_check_full_depth&&depth_limit==0 && all_gear_is_already_purified(gear_list) ){
        const empty_ticket_combo:Ticket[] = [];
        //console.warn("purify_all_gear_DFS ALL GEAR PURIFIED"+[empty_ticket_combo].length.toString());
        return [empty_ticket_combo];
    }

    let next_tickets:Array<Ticket> = find_needed_tickets(gear_list).toTickets();

    let ticket_combos_that_purify_all_gear:Array<TicketCombo> = [];

    for (let t = 0; t < next_tickets.length; t++) {
        const next_ticket = next_tickets[t];
        global_ticket_was_used = false;
        global_remaining_depth_limit=depth_limit;
        const next_gear_list:Array<Array<TicketSetCombo>> = apply_ticket_to_all_gear(next_ticket, gear_list);
        if(!global_ticket_was_used)continue;
        let result:Array<TicketCombo> = purify_all_gear_DFS(next_gear_list, depth_limit-1,always_check_full_depth,);
        if(result.length>0){
            prepend_ticket_to_all_combos(next_ticket, result);//TODO: this should probably be an in-place operation
            ticket_combos_that_purify_all_gear = ticket_combos_that_purify_all_gear.concat(result)// TODO: SHOULD DEFINITELY BE IN PLACE
        }
    }
    if(ticket_combos_that_purify_all_gear.length>0)return ticket_combos_that_purify_all_gear;
    return [];
}

