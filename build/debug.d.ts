/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/ValueToAbilityCombo
 * @param val `u64`
 * @returns `~lib/array/Array<assembly/Custom_Objects_2/Ability>`
 */
export declare function ValueToAbilityCombo(val: bigint): Array<__Record27<never>>;
/**
 * assembly/index/AbilityComboToValue
 * @param abilities `~lib/array/Array<u32>`
 * @returns `u64`
 */
export declare function AbilityComboToValue(abilities: Array<number>): bigint;
/**
 * assembly/index/ValueToTicketSet
 * @param val `u16`
 * @returns `~lib/array/Array<assembly/Custom_Objects_2/Ticket>`
 */
export declare function ValueToTicketSet(val: number): Array<__Record25<never>>;
/**
 * assembly/index/add
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function add(a: number, b: number): number;
/**
 * assembly/index/advance_seed
 * @param x32 `u32`
 * @returns `u32`
 */
export declare function advance_seed(x32: number): number;
/**
 * assembly/index/get_ability
 * @param seed `u32`
 * @param brand `u32`
 * @param drink `u32`
 * @returns `~lib/array/Array<u32>`
 */
export declare function get_ability(seed: number, brand: number, drink: number): Array<number>;
/**
 * assembly/index/weighted_ability
 * @param ability_roll `i32`
 * @param brand `u32`
 * @returns `u32`
 */
export declare function weighted_ability(ability_roll: number, brand: number): number;
/**
 * assembly/process_single_gear/purify_single_gear
 * @param gear `assembly/Custom_Objects_2/ExternalGear`
 * @param how_far_to_check `i32`
 * @returns `~lib/array/Array<assembly/Custom_Objects_2/ExternalMap<u64,~lib/array/Array<~lib/array/Array<assembly/Custom_Objects_2/TicketSet>>>>`
 */
export declare function purify_single_gear(gear: __Record36<undefined>, how_far_to_check?: number): Array<__Record40<never>>;
/**
 * assembly/process_all_gear_at_once/purify_all_gear
 * @param gear_list `~lib/array/Array<assembly/Custom_Objects_2/ExternalGear>`
 * @param how_far_to_check `u32`
 * @param depth_limit `u32`
 * @param always_check_full_depth `bool`
 * @returns `assembly/Custom_Objects_2/ExternalMap<u64,~lib/array/Array<assembly/Custom_Objects_2/ExternalMap<u64,assembly/all_gear_output_table/GearPlan>>>`
 */
export declare function purify_all_gear(gear_list: Array<__Record36<undefined>>, how_far_to_check?: number, depth_limit?: number, always_check_full_depth?: boolean): __Record59<never>;
/** assembly/Custom_Objects_2/Ability */
declare interface __Record27<TOmittable> {
  /** @type `u32` */
  value: number | TOmittable;
}
/** assembly/Custom_Objects_2/Ticket */
declare interface __Record25<TOmittable> {
  /** @type `u32` */
  value: number | TOmittable;
}
/** assembly/Custom_Objects_2/ExternalGear */
declare interface __Record36<TOmittable> {
  /** @type `u32` */
  seed: number | TOmittable;
  /** @type `u32` */
  brand: number | TOmittable;
  /** @type `~lib/array/Array<~lib/array/Array<i32>>` */
  desired_abilities: Array<Array<number>>;
}
/** assembly/Custom_Objects_2/TicketSet */
declare interface __Record35<TOmittable> {
  /** @type `u16` */
  value: number | TOmittable;
}
/** assembly/Custom_Objects_2/ExternalMap<u64,~lib/array/Array<~lib/array/Array<assembly/Custom_Objects_2/TicketSet>>> */
declare interface __Record40<TOmittable> {
  /** @type `~lib/array/Array<u64>` */
  keys: Array<bigint>;
  /** @type `~lib/array/Array<~lib/array/Array<~lib/array/Array<assembly/Custom_Objects_2/TicketSet>>>` */
  values: Array<Array<Array<__Record35<never>>>>;
}
/** assembly/all_gear_output_table/GearPlan */
declare interface __Record55<TOmittable> {
  /** @type `i32` */
  soonest_index: number | TOmittable;
  /** @type `~lib/array/Array<assembly/Custom_Objects_2/Ticket>` */
  actual_ticket_combo: Array<__Record25<never>>;
}
/** assembly/Custom_Objects_2/ExternalMap<u64,assembly/all_gear_output_table/GearPlan> */
declare interface __Record56<TOmittable> {
  /** @type `~lib/array/Array<u64>` */
  keys: Array<bigint>;
  /** @type `~lib/array/Array<assembly/all_gear_output_table/GearPlan>` */
  values: Array<__Record55<never>>;
}
/** assembly/Custom_Objects_2/ExternalMap<u64,~lib/array/Array<assembly/Custom_Objects_2/ExternalMap<u64,assembly/all_gear_output_table/GearPlan>>> */
declare interface __Record59<TOmittable> {
  /** @type `~lib/array/Array<u64>` */
  keys: Array<bigint>;
  /** @type `~lib/array/Array<~lib/array/Array<assembly/Custom_Objects_2/ExternalMap<u64,assembly/all_gear_output_table/GearPlan>>>` */
  values: Array<Array<__Record56<never>>>;
}
