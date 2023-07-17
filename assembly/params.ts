import {JSON} from "assemblyscript-json/assembly";
import {ability_names, internal_ability_names, internal_brand_names_str, brand_data_str} from '../src/old_splatoon_data/splatoon3_data'


function ConvertJsonMap<T>(oldMap:Map<string,JSON.Value>):Map<string,string>{
    let newMap = new Map<string,T>();

    for(let i = 0;i<oldMap.size;i++){
        // @ts-ignore
        if( isDefined(oldMap.values()[i].valueOf())){
            // @ts-ignore
            newMap.set( oldMap.keys()[i], oldMap.values()[i].valueOf())
        }
    }
    // @ts-ignore
    return newMap

}
export const json_brand_names:Map<string, string> = ConvertJsonMap<string>((<JSON.Obj>JSON.parse(internal_brand_names_str)).valueOf());



const json_brand_data = <JSON.Obj>JSON.parse(brand_data_str);
export const SkillEasilyToGetParam:i32[] = ((<JSON.Arr>json_brand_data.getArr("SkillEasilyToGetParam")).valueOf()).map((v:JSON.Value)=><i32>(<JSON.Integer>v).valueOf());
const Traits = <JSON.Obj>json_brand_data.getObj("Traits");


// MAX_BRAND_NUM
function get_max_brand_num(brand:u32) : u32 {
    let n = 0;
    for (let a = 0;a<internal_ability_names.length;a++) {
        let ability_name:string = internal_ability_names[a];

        let brandTraits = (Traits.valueOf().values()[brand] as JSON.Obj);
        let unusual_ability:string = (brandTraits.getString("UnusualGearSkill") as JSON.Str).valueOf();
        let   usual_ability:string = (brandTraits.getString("UsualGearSkill")   as JSON.Str).valueOf();

        if (ability_name == unusual_ability) n += SkillEasilyToGetParam[0];
        else if (ability_name == usual_ability) n += SkillEasilyToGetParam[2];
        else n += SkillEasilyToGetParam[1];
    }
    return n;
}
const const_max_brand_num = new Uint32Array(Traits.valueOf().size);
for (let b = 0; b < const_max_brand_num.length; b++) {
    const_max_brand_num[b] = get_max_brand_num(b);
}
export function max_brand_num(brand:u32):u32{
    return const_max_brand_num[brand];
}


// MAX_BRAND_NUM_DRINK
function get_max_brand_num_drink(brand:u32, drink:u32) : u32 {
    let n = 0;
    for (let a = 0;a<internal_ability_names.length;a++) {
        let ability_name:string = internal_ability_names[a];

        let brandTraits = (Traits.valueOf().values()[brand] as JSON.Obj);
        let unusual_ability:string = (brandTraits.getString("UnusualGearSkill") as JSON.Str).valueOf();
        let   usual_ability:string = (brandTraits.getString("UsualGearSkill")   as JSON.Str).valueOf();

        if(a == drink) n += 0;
        else if (ability_name == unusual_ability) n += SkillEasilyToGetParam[0];
        else if (ability_name == usual_ability) n += SkillEasilyToGetParam[2];
        else n += SkillEasilyToGetParam[1];
    }
    return n;
}
const const_max_brand_num_drink  = new Uint32Array(internal_ability_names.length * Traits.valueOf().size);
for (let i = 0; i < const_max_brand_num_drink.length; i++) {
    const b : u32 = i / internal_ability_names.length;
    const d : u32 = i % internal_ability_names.length;

    const_max_brand_num_drink[i] = get_max_brand_num_drink(b, d);
}
export function max_brand_num_drink(brand:u32, drink:u32):u32{
    return const_max_brand_num_drink[brand*internal_ability_names.length+drink];
}



// GET_ABILITY_WEIGHT
function ability_weight(brand : u32, ability : u32): u32 {
    let ability_name:string = internal_ability_names[ability];

    let brandTraits = (Traits.valueOf().values()[brand] as JSON.Obj);
    let unusual_ability:string = (brandTraits.getString("UnusualGearSkill") as JSON.Str).valueOf();
    let   usual_ability:string = (brandTraits.getString("UsualGearSkill")   as JSON.Str).valueOf();

    if (ability_name == unusual_ability) return SkillEasilyToGetParam[0];
    else if (ability_name == usual_ability) return SkillEasilyToGetParam[2];
    else return SkillEasilyToGetParam[1];
}

const const_get_ability_weight  = new Uint32Array(internal_ability_names.length * Traits.valueOf().size);
for (let i = 0; i < const_get_ability_weight.length; i++) {
    const b : u32 = i / internal_ability_names.length;
    const a : u32 = i % internal_ability_names.length;

    const_get_ability_weight[i] = ability_weight(b, a);
}
export function get_ability_weight(brand:u32, ability:u32):u32{
    return const_get_ability_weight[brand*internal_ability_names.length+ability]
}




//TODO: create and export precomputed max_brand_num and get_ability_weight from SkillEasilyToGetParam and Traits
// I will have to manually check for "None" in any json object. Right now i dont have "None" listed as a brand or an ability,
// so i have to manually set it to a numerical value in max_brand_num and get_ability_weight