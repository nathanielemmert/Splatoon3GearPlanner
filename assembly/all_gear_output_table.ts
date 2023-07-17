import {
    _Ticket,
    ExternalMap, SixteenAbilityCombo,
    SixteenAbilityCombo_Value,
    TicketCombo,
    TicketSet,
    TicketSetCombo,
    _SixteenAbilityCombo, Ability, Ticket, _Ability
} from "./Custom_Objects_2";


export type TicketCombo_N_Length = SixteenAbilityCombo_Value; //TODO: result ticket combo should be arbitrary length, but right now it is just sixteen long. max length should be hardcoded to be 16
export function list_all_gear_abilities_for_each_ticket_combo(combos: TicketCombo[],mapped_gear_solutions : Array<ExternalMap<SixteenAbilityCombo_Value,Array<TicketSetCombo>>>[]): ExternalMap<TicketCombo_N_Length, ExternalMap<SixteenAbilityCombo_Value, GearPlan>[]>{
    //console.log("LENGTH OF ALL TICKET COMBOS: "+combos.length.toString())
    let return_value = new Map<TicketCombo_N_Length, ExternalMap<SixteenAbilityCombo_Value, GearPlan>[]>();
    for (let i = 0; i < combos.length; i++) {
        const combo = combos[i];
        //console.log("COMBO: "+combo.toString());
        return_value.set(new _SixteenAbilityCombo(combo.map((ticket:Ticket):Ability=>new _Ability(ticket.value))).value,list_all_gear_abilities_for_single_ticket_combo(combo, mapped_gear_solutions));//TODO: Terrible code, i shouldnt be casting a ticket to an ability.
    }
    return ExternalMap.fromInternalMap(return_value);
}

function list_all_gear_abilities_for_single_ticket_combo(combo:TicketCombo,mapped_gear_solutions : Array<ExternalMap<SixteenAbilityCombo_Value,Array<TicketSetCombo>>>[]): ExternalMap<SixteenAbilityCombo_Value, GearPlan>[]{
    let return_value:ExternalMap<SixteenAbilityCombo_Value, GearPlan>[] = [];
    for (let i = 0; i < mapped_gear_solutions.length; i++) {
        return_value.push(list_single_gear_abilities_for_single_ticket_combo_single_gear(combo, mapped_gear_solutions[i]));
    }
    return return_value;
}

function list_single_gear_abilities_for_single_ticket_combo_single_gear(combo:TicketCombo,mapped_gear_solution : Array<ExternalMap<SixteenAbilityCombo_Value,Array<TicketSetCombo>>>): ExternalMap<SixteenAbilityCombo_Value, GearPlan>{

    //instead of for each desired ability, I have to go through each ability combo entry in mapped result, and skip it if it is already in result

    let ticket_combo_results = new Map<SixteenAbilityCombo_Value, GearPlan>();

    for (let gear_index = 0; gear_index < mapped_gear_solution.length; gear_index++) {
        const gear_index_solution=mapped_gear_solution[gear_index];
        for (let ability_index = 0; ability_index < gear_index_solution.keys.length; ability_index++) {
            const ability_combo: SixteenAbilityCombo_Value = gear_index_solution.keys[ability_index];

            if(ticket_combo_results.has(ability_combo))continue;

            const ticket_set_combos = gear_index_solution.values[ability_index];
            // if any of these ticket set combos work, add ability combo to the solution with current index and intersection.
            let actual_ticket_combo: TicketCombo|null = intersectTicketComboWithBestTicketSetCombo(combo, ticket_set_combos);// = intersect ticket combo with all ticket set combos.

            if(actual_ticket_combo!=null){
                ticket_combo_results.set(ability_combo, {soonest_index:gear_index, actual_ticket_combo:actual_ticket_combo})
            }
        }
    }
    return ExternalMap.fromInternalMap(ticket_combo_results);
}





function numTicketsUsedInTicketSetCombo(combo:TicketSet[]):f64{//TODO: Currently only works with ticketsetcombo of 3 or less. probably ok
    for (let i = 0; i < 3 - combo.length; i++) {
        combo = combo.concat([ TicketSet.fromTickets([new _Ticket(0xf)]) ])
    }

    const a=combo[0], b=combo[1], c=combo[2];

    const na=a.contains(new _Ticket(0xf))?1:0,
          nb=b.contains(new _Ticket(0xf))?1:0,
          nc=c.contains(new _Ticket(0xf))?1:0;

    const total_n=na+nb+nc;


    const ab = a.intersection(b);
    const bc = b.intersection(c);
    const abc= ab.intersection(bc);

    if (total_n==3)return 0;
    if (total_n==2)return 1;
    if (total_n==1){
        if (nc==1 && !ab.isEmpty())return 1.5;
        if (na==1 && !bc.isEmpty())return 1.75;
        return 2;
    }
    if (total_n==0) {
        if (!abc.isEmpty()) return 2.123;
        if (!bc.isEmpty()) return 2.75;
        if (!ab.isEmpty()) return 2.5;
        return 3;
    }
    console.log("PROBLEM"+a.toString()+b.toString()+c.toString())
    return -1;
}


function bestTicketSetCombo(combo1:TicketSetCombo|null, combo2:TicketSetCombo): TicketSetCombo {
    if(combo1==null)return combo2;
    if (numTicketsUsedInTicketSetCombo(combo1) < numTicketsUsedInTicketSetCombo(combo2)) return combo2;
    return combo1;
}

function intersectTicketComboWithBestTicketSetCombo(ticket_combo:TicketCombo,ticket_set_combos:TicketSetCombo[]): TicketCombo|null {
    let best_ticket_set_combo: TicketSetCombo | null = null;

    for (let i = 0; i < ticket_set_combos.length; i++) {
        const ticket_set_combo=ticket_set_combos[i];

        //find the ticketsetcombo that contains ticket_combo, and uses the least tickets
        //if ticket combo purifies ticketsetcombo, add it to the result
        if (ticketComboPurifiesTicketSetCombo(ticket_combo, ticket_set_combo)) {
            best_ticket_set_combo = bestTicketSetCombo(best_ticket_set_combo, ticket_set_combo);
        }
    }

    if (best_ticket_set_combo != null) return intersectTicketComboWithTicketSetCombo(ticket_combo, best_ticket_set_combo);
    return null;
}


function intersectTicketComboWithTicketSetCombo(ticket_combo:TicketCombo, ticket_set_combo:TicketSet[]):TicketCombo{
    ticket_combo = ticket_combo.slice();
    ticket_set_combo=ticket_set_combo.slice();


    ticket_combo=ticket_combo.filter((ticket)=>!(ticket.value==0xf))//TODO: this line shouldnt be needed

    const final_ticket_combo:TicketCombo  = [];
    while(ticket_set_combo.length>0 && ticket_combo.length>0){
        if( ticket_set_combo[0].contains(new _Ticket(0xf))){
            final_ticket_combo.push(new _Ticket(0xf))
            ticket_set_combo.shift()
        }
        else if(ticket_set_combo[0].contains(ticket_combo[0])){
            final_ticket_combo.push(ticket_combo.shift())//pop from both
            ticket_set_combo.shift()
        }
        else{
            ticket_combo.shift()
        }
    }

    while(ticket_set_combo.length>0 && ticket_set_combo[0].contains(new _Ticket(0xf))){
        final_ticket_combo.push(new _Ticket(0xf))
        ticket_set_combo.shift()
    }

    return final_ticket_combo;
}

function ticketComboPurifiesTicketSetCombo(ticket_combo:TicketCombo, ticket_set_combo:TicketSet[]): boolean{
    ticket_set_combo=ticket_set_combo.filter((set)=>!set.contains(new _Ticket(0xf)))
    ticket_combo=ticket_combo.filter((ticket)=>ticket.value!=0xf)//TODO: this line shouldnt be needed

    while(ticket_set_combo.length>0 && ticket_combo.length>0){
        if(ticket_set_combo[0].contains(ticket_combo[0])){
            ticket_set_combo = ticket_set_combo.slice(1)
        }
        ticket_combo=ticket_combo.slice(1)
    }
    return ticket_set_combo.length==0;
}




export class GearPlan{ soonest_index!: i32; actual_ticket_combo!: TicketCombo;}


