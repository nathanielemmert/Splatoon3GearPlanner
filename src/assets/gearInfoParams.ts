import type { GearParam } from "../lib/types/typesParams";

import _gearInfoHead from "../assets/leanny-data/mush/400/GearInfoHead.json";
import _gearInfoClothes from "../assets/leanny-data/mush/400/GearInfoClothes.json";
import _gearInfoShoes from "../assets/leanny-data/mush/400/GearInfoShoes.json";


let gearInfoHead: {[gearId:string]:GearParam}={};
for (const gear of _gearInfoHead) {
    gearInfoHead[gear.Id.toString()] = gear;
}

let gearInfoClothes: {[gearId:string]:GearParam}={};
for (const gear of _gearInfoClothes) {
    gearInfoClothes[gear.Id.toString()] = gear;
}

let gearInfoShoes: {[gearId:string]:GearParam}={};
for (const gear of _gearInfoShoes) {
    gearInfoShoes[gear.Id.toString()] = gear;
}


export const gearInfo: {[gearType:string]:{[gearId:string]:GearParam}} = {
    "Head":gearInfoHead, 
    "Clothes":gearInfoClothes, 
    "Shoes":gearInfoShoes
}

