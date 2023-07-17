import { writable } from "svelte/store";
import type { GearSeedDatabase } from "../types/typesLeanny";

let userGearDatabase:GearSeedDatabase;
let gearDbStore = writable(userGearDatabase);


export {gearDbStore}