

export class ExternalMap<K,V>{
    // @ts-ignore Assemblyscript has a different class syntax
    public keys:Array<K>;
    // @ts-ignore Assemblyscript has a different class syntax
    public values:Array<V>;//TODO: replace keys and values from entries

    // public entries;  //TODO: implement entries. type will probably have to be custom since AS doesnt support tuple types.

    static fromInternalMap<K,V>(map:Map<K,V>):ExternalMap<K, V>{
        return {keys:map.keys(), values: map.values()};
    }
    // toInternalMap<K,V>():Map<K, V>{}//TODO: finish method
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//ExternalGear // FINISHED
export class ExternalGear{
    seed!:u32;
    brand!:u32;
    desired_abilities!: Array<Array<i32>>;
}



//InternalGear // FINISHED

export type GearSeed=u32;
export type GearBrand=u32;
export class InternalGear{
    seed!:u32;
    brand!:u32;
    desired_abilities!: Set<SixteenAbilityCombo_Value>;

    static fromExternalGear(gear:ExternalGear):InternalGear{
        const desired_abilities = new Set<SixteenAbilityCombo_Value>();
        for (let i = 0; i < gear.desired_abilities.length; i++) {
            // console.log("EXTERNAL GEAR DESIRED ABILITIES"+gear.desired_abilities[i].toString());

            const ability_combo:Array<Ability> = gear.desired_abilities[i].map((val:i32):Ability=>new _Ability(val));
            // console.log(new SixteenAbilityCombo(ability_combo).value.toString(16))

            desired_abilities.add(new _SixteenAbilityCombo(ability_combo).value)
        }

        return{seed:gear.seed, brand:gear.brand, desired_abilities:desired_abilities}

    }
}



//Ability // FINISHED
export type Ability_Value = u32;
export class Ability {
    value!:u32;
    static from(val:Ability_Value):Ability{
        return {value:val%14} as Ability;
    }
    toString():string{return this.value.toString()+","}

}

export class _Ability extends Ability{
    constructor(val:Ability_Value) {
        super();
        this.value = val%14;
    }
}



//AbilityCombo TODO: FINISH CLASS
export type _AbilityCombo = Array<_Ability>;
export type AbilityCombo = Array<Ability>;
export function AbilityComboToExternal(combo:_AbilityCombo, index: i32 =0, self: Array<_AbilityCombo> = []):AbilityCombo{
    return combo.map((ability:_Ability):Ability=>(ability as Ability));
}




//EightAbilityCombo // FINISHED
export type SixteenAbilityCombo_Value = u64;

export class SixteenAbilityCombo {
    // @ts-ignore
    value:u64;


    static toAbilityCombo(val:u64):Array<Ability>{//TODO: TEST THE ACCURACY OF THIS FUNCTION
        let ability_combo = new Array<Ability>();

        for(let i = 0;i<16;i++){
            const mask = (0b1111) << (i*4);
            const ability = (val&mask)>>(i*4);
            if(ability==0b1111)break;
            ability_combo.push(new _Ability(ability as u32));
        }

        return ability_combo
    }
    static size(val:u64):u32{//TODO: TEST THE ACCURACY OF THIS FUNCTION
        //console.log("SixteenAbilityCombo.size val: "+val.toString(16));
        let len:u32 = 0;

        for(let i = 0;i<16;i++){
            const mask:u64 = (0b1111) << (i*4);
            const ability :u64= (val&mask)>>(i*4);
            //console.log(i.toString()+" "+ability.toString(16))
            if(ability!=0b1111)len+=1;
        }
        //console.log("LEN "+len.toString())
        return len;

    }
    static fromValue(val:SixteenAbilityCombo_Value):SixteenAbilityCombo{
        return {value:val} as SixteenAbilityCombo;
    }
    toAbilityValueCombo():Array<Ability_Value>{
        let ability_combo:Array<Ability_Value> = [];
        for(let i = 0;i<16;i++){
            const mask = (0b1111) << (i*4);
            const ability = (this.value&mask)>>(i*4);


            if(ability==0b1111)break;
            // console.log("TO ABILITY VALUE COMBO "+ i.toString() + " "+ability.toString(16)+" "+this.value.toString(16))
            ability_combo.push(ability as Ability_Value);
        }
        return ability_combo;
    }
    //TODO:
    // addFirst(ability:Ability):SixteenAbilityCombo_External {} // static and non-static
    // removeFirst():SixteenAbilityCombo_External {} // static and non-static
    // getFirst(): Ability  // static and non-static
}

export class _SixteenAbilityCombo extends SixteenAbilityCombo{// TODO: FINISH CLASS
    constructor(ability_combo:Array<Ability>){
        super();
        if(ability_combo.length>16)console.error("WASM ERROR: EIGHTABILITYCOMBO HAS MORE THAN 8 ABILITIES:   "+ability_combo.toString());
        this.value=~(<u64>0x0)//TODO: make sure this is setting val to 0xffffffffffffffff
        for(let i = 0;i<ability_combo.length;i++){
            const ability = ability_combo[i];
            const mask = (0b1111&ability.value)<< (i*4);
            const F_mask = (0b1111)<< (i*4);
            this.value = (this.value & ~F_mask) | mask;
        }
    }




}

export type AbilityComboID = SixteenAbilityCombo_Value; //TODO: DELETE THIS REDUNDANT TYPE ALIAS



//Ticket // FINISHED
export type Ticket_Value = u32;
export class Ticket {
    value!:u32;
    static from(val:Ticket_Value):Ticket{
        return {value:(val==0xf)?0xf:val%14} as Ticket;
    }
    toString():string{return this.value.toString()}
}
export class _Ticket extends Ticket{
    constructor(val:Ticket_Value) {
        super();
        this.value = (val==0xf || val==0xffffffff)?0xf:val%14;
    }
}



//TicketCombo TODO: FINISH CLASS
export type _TicketCombo = Array<_Ticket>;
export type TicketCombo = Array<Ticket>;
export function TicketComboToExternal(combo:_TicketCombo, index: i32 =0, self: Array<_TicketCombo> = []):TicketCombo{
    return combo.map((ticket:_Ticket):Ticket=>(ticket as Ticket));
}



//TicketSet
export type TicketSet_Value = u16;
export class TicketSet {
    value!:u16;
    static fromValue(val:u16=0):TicketSet{
        return {value:val} as TicketSet;
    }
    static fromTickets(tickets:Array<Ticket>):TicketSet{
        let val:u16=0;
        for(let i = 0;i<tickets.length;i++){
            const ticket = tickets[i];
            const mask:u16 = 0x1<<(ticket.value as u16);
            val = val | mask;
        }
        return {value:val} as TicketSet;
    }
    static fromExternal(other:TicketSet):TicketSet{//TODO: THIS METHOD SHOULD BE DELETED. REMOVE EVERYWHERE IT IS USED.
        let ticket_set = new _TicketSet();
        ticket_set.value=other.value;
        return ticket_set;
    }

    toString():string{return this.value.toString(2)}
    add(ticket:Ticket):void{
        const mask:u16 = 0x1<<(ticket.value as u16);
        this.value = this.value | mask;
    }
    add_all(tickets:Array<Ticket>):void{
        for(let i = 0;i<tickets.length;i++){
            const ticket = tickets[i];
            this.add(ticket)
        }
    }
    remove(ticket:Ticket):void{
        this.value = this.value & ~(0x1<<ticket.value)
    }
    remove_all(tickets:Array<Ticket>):void{
        for(let i = 0;i<tickets.length;i++){
            const ticket = tickets[i];
            this.remove(ticket)
        }
    }
    contains(ticket:Ticket):boolean{
        const mask = 0x1<<ticket.value;
        return (this.value&mask)>0
    }
    toTickets():Array<Ticket>{
        const allowed_next_drinks:Array<Ticket_Value> = [0xFFFFFFFF,0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        let tickets = new Array<Ticket>();
        for (let i = 0; i < allowed_next_drinks.length; i++) {
            let ticket = new _Ticket(allowed_next_drinks[i]);
            if (this.contains(ticket)){
                tickets.push(ticket);
            }
        }
        // console.log("toTickets   val: "+this.value.toString(16)+"   tickets: "+tickets.toString())
        return tickets;
    }
    toBinaryString(): string {
        // return this.value.toString(2);
        return this.toTickets().join(",");
    }
    union_inPlace(other:TicketSet):void{
        this.value |=other.value;
    }
    union(other:TicketSet):TicketSet{
        return TicketSet.fromValue(this.value | other.value) ;
    }

    intersection_inPlace(other:TicketSet):void{
        this.value &=other.value;
    }
    intersection(other:TicketSet):TicketSet{
        return TicketSet.fromValue(this.value & other.value) ;
    }
    isEmpty():boolean{
        return this.value==0
    }

    containsNoneticket():boolean{
        return this.contains(new _Ticket(0xf));
    }

    isFull():boolean{
        return this.value!=0;
    }
}//TODO: implement toSet():Set<Ticket_Value>{}

export class _TicketSet extends TicketSet{

    constructor(tickets:Array<Ticket>=[]){
        super();
        let val:u16=0;
        for(let i = 0;i<tickets.length;i++){
            const ticket = tickets[i];
            const mask:u16 = 0x1<< (ticket.value as u16);
            val = val | mask;
        }

        // @ts-ignore TODO: IMMEDIATELY, CHECK IF THIS RETURN VALUE CAN USE INSTANCE METHODS LIKE ADD
        this.value=val;
    }
}



//TicketSetCombo TODO: FINISH CLASS
export type _TicketSetCombo = Array<_TicketSet>;
export type TicketSetCombo = Array<TicketSet>;
export type TicketSetCombo_ExternalStr = Array<string>;
export function TicketSetComboToExternal(combo:_TicketSetCombo, index: i32 =0, self: Array<_TicketSetCombo> = []):TicketSetCombo{
    return combo.map((ticketset:_TicketSet):TicketSet=>(ticketset as TicketSet));
}



//FourTicketSetCombo TODO: FINISH CLASS

export type FourTicketSetCombo_Value = u64;

export class FourTicketSetCombo {
    value!:u64;

    static fromValue(val:u64=0):FourTicketSetCombo {
        return {value:val};
    }
}

export class _FourTicketSetCombo extends FourTicketSetCombo{

    constructor(ticket_sets:Array<TicketSet>) {
        super();
        if(ticket_sets.length>4)console.error("WASM ERROR: FOURTICKETSETCOMBO HAS MORE THAN 4 TICKETSETS:   "+ticket_sets.toString());
        this.value=0x0;
        for(let i = 0;i<ticket_sets.length;i++){
            const ticket_set = ticket_sets[i];

            const mask = (0xffff & ticket_set.value) << (i*16);
            this.value = this.value | mask;
        }
    }


}


