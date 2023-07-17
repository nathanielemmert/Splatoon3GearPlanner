async function instantiate(module, imports = {}) {
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
      "console.error"(text) {
        // ~lib/bindings/dom/console.error(~lib/string/String) => void
        text = __liftString(text >>> 0);
        console.error(text);
      },
      "console.log"(text) {
        // ~lib/bindings/dom/console.log(~lib/string/String) => void
        text = __liftString(text >>> 0);
        console.log(text);
      },
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    ValueToAbilityCombo(val) {
      // assembly/index/ValueToAbilityCombo(u64) => ~lib/array/Array<assembly/Custom_Objects_2/Ability>
      val = val || 0n;
      return __liftArray(pointer => __liftRecord27(__getU32(pointer)), 2, exports.ValueToAbilityCombo(val) >>> 0);
    },
    AbilityComboToValue(abilities) {
      // assembly/index/AbilityComboToValue(~lib/array/Array<u32>) => u64
      abilities = __lowerArray(__setU32, 30, 2, abilities) || __notnull();
      return BigInt.asUintN(64, exports.AbilityComboToValue(abilities));
    },
    ValueToTicketSet(val) {
      // assembly/index/ValueToTicketSet(u16) => ~lib/array/Array<assembly/Custom_Objects_2/Ticket>
      return __liftArray(pointer => __liftRecord25(__getU32(pointer)), 2, exports.ValueToTicketSet(val) >>> 0);
    },
    advance_seed(x32) {
      // assembly/index/advance_seed(u32) => u32
      return exports.advance_seed(x32) >>> 0;
    },
    get_ability(seed, brand, drink) {
      // assembly/index/get_ability(u32, u32, u32) => ~lib/array/Array<u32>
      return __liftArray(pointer => __getU32(pointer) >>> 0, 2, exports.get_ability(seed, brand, drink) >>> 0);
    },
    weighted_ability(ability_roll, brand) {
      // assembly/index/weighted_ability(i32, u32) => u32
      return exports.weighted_ability(ability_roll, brand) >>> 0;
    },
    purify_single_gear(gear, how_far_to_check) {
      // assembly/process_single_gear/purify_single_gear(assembly/Custom_Objects_2/ExternalGear, i32?) => ~lib/array/Array<assembly/Custom_Objects_2/ExternalMap<u64,~lib/array/Array<~lib/array/Array<assembly/Custom_Objects_2/TicketSet>>>>
      gear = __lowerRecord36(gear) || __notnull();
      exports.__setArgumentsLength(arguments.length);
      return __liftArray(pointer => __liftRecord40(__getU32(pointer)), 2, exports.purify_single_gear(gear, how_far_to_check) >>> 0);
    },
    purify_all_gear(gear_list, how_far_to_check, depth_limit, always_check_full_depth) {
      // assembly/process_all_gear_at_once/purify_all_gear(~lib/array/Array<assembly/Custom_Objects_2/ExternalGear>, u32?, u32?, bool?) => assembly/Custom_Objects_2/ExternalMap<u64,~lib/array/Array<assembly/Custom_Objects_2/ExternalMap<u64,assembly/all_gear_output_table/GearPlan>>>
      gear_list = __lowerArray((pointer, value) => { __setU32(pointer, __lowerRecord36(value) || __notnull()); }, 54, 2, gear_list) || __notnull();
      always_check_full_depth = always_check_full_depth ? 1 : 0;
      exports.__setArgumentsLength(arguments.length);
      return __liftRecord59(exports.purify_all_gear(gear_list, how_far_to_check, depth_limit, always_check_full_depth) >>> 0);
    },
  }, exports);
  function __liftRecord27(pointer) {
    // assembly/Custom_Objects_2/Ability
    // Hint: Opt-out from lifting as a record by providing an empty constructor
    if (!pointer) return null;
    return {
      value: __getU32(pointer + 0),
    };
  }
  function __liftRecord25(pointer) {
    // assembly/Custom_Objects_2/Ticket
    // Hint: Opt-out from lifting as a record by providing an empty constructor
    if (!pointer) return null;
    return {
      value: __getU32(pointer + 0),
    };
  }
  function __lowerRecord36(value) {
    // assembly/Custom_Objects_2/ExternalGear
    // Hint: Opt-out from lowering as a record by providing an empty constructor
    if (value == null) return 0;
    const pointer = exports.__pin(exports.__new(12, 36));
    __setU32(pointer + 0, value.seed);
    __setU32(pointer + 4, value.brand);
    __setU32(pointer + 8, __lowerArray((pointer, value) => { __setU32(pointer, __lowerArray(__setU32, 22, 2, value) || __notnull()); }, 37, 2, value.desired_abilities) || __notnull());
    exports.__unpin(pointer);
    return pointer;
  }
  function __liftRecord35(pointer) {
    // assembly/Custom_Objects_2/TicketSet
    // Hint: Opt-out from lifting as a record by providing an empty constructor
    if (!pointer) return null;
    return {
      value: __getU16(pointer + 0),
    };
  }
  function __liftRecord40(pointer) {
    // assembly/Custom_Objects_2/ExternalMap<u64,~lib/array/Array<~lib/array/Array<assembly/Custom_Objects_2/TicketSet>>>
    // Hint: Opt-out from lifting as a record by providing an empty constructor
    if (!pointer) return null;
    return {
      keys: __liftArray(pointer => BigInt.asUintN(64, __getU64(pointer)), 3, __getU32(pointer + 0)),
      values: __liftArray(pointer => __liftArray(pointer => __liftArray(pointer => __liftRecord35(__getU32(pointer)), 2, __getU32(pointer)), 2, __getU32(pointer)), 2, __getU32(pointer + 4)),
    };
  }
  function __liftRecord55(pointer) {
    // assembly/all_gear_output_table/GearPlan
    // Hint: Opt-out from lifting as a record by providing an empty constructor
    if (!pointer) return null;
    return {
      soonest_index: __getI32(pointer + 0),
      actual_ticket_combo: __liftArray(pointer => __liftRecord25(__getU32(pointer)), 2, __getU32(pointer + 4)),
    };
  }
  function __liftRecord56(pointer) {
    // assembly/Custom_Objects_2/ExternalMap<u64,assembly/all_gear_output_table/GearPlan>
    // Hint: Opt-out from lifting as a record by providing an empty constructor
    if (!pointer) return null;
    return {
      keys: __liftArray(pointer => BigInt.asUintN(64, __getU64(pointer)), 3, __getU32(pointer + 0)),
      values: __liftArray(pointer => __liftRecord55(__getU32(pointer)), 2, __getU32(pointer + 4)),
    };
  }
  function __liftRecord59(pointer) {
    // assembly/Custom_Objects_2/ExternalMap<u64,~lib/array/Array<assembly/Custom_Objects_2/ExternalMap<u64,assembly/all_gear_output_table/GearPlan>>>
    // Hint: Opt-out from lifting as a record by providing an empty constructor
    if (!pointer) return null;
    return {
      keys: __liftArray(pointer => BigInt.asUintN(64, __getU64(pointer)), 3, __getU32(pointer + 0)),
      values: __liftArray(pointer => __liftArray(pointer => __liftRecord56(__getU32(pointer)), 2, __getU32(pointer)), 2, __getU32(pointer + 4)),
    };
  }
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  function __liftArray(liftElement, align, pointer) {
    if (!pointer) return null;
    const
      dataStart = __getU32(pointer + 4),
      length = __dataview.getUint32(pointer + 12, true),
      values = new Array(length);
    for (let i = 0; i < length; ++i) values[i] = liftElement(dataStart + (i << align >>> 0));
    return values;
  }
  function __lowerArray(lowerElement, id, align, values) {
    if (values == null) return 0;
    const
      length = values.length,
      buffer = exports.__pin(exports.__new(length << align, 1)) >>> 0,
      header = exports.__pin(exports.__new(16, id)) >>> 0;
    __setU32(header + 0, buffer);
    __dataview.setUint32(header + 4, buffer, true);
    __dataview.setUint32(header + 8, length << align, true);
    __dataview.setUint32(header + 12, length, true);
    for (let i = 0; i < length; ++i) lowerElement(buffer + (i << align >>> 0), values[i]);
    exports.__unpin(buffer);
    exports.__unpin(header);
    return header;
  }
  function __notnull() {
    throw TypeError("value must not be null");
  }
  let __dataview = new DataView(memory.buffer);
  function __setU32(pointer, value) {
    try {
      __dataview.setUint32(pointer, value, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      __dataview.setUint32(pointer, value, true);
    }
  }
  function __getU16(pointer) {
    try {
      return __dataview.getUint16(pointer, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      return __dataview.getUint16(pointer, true);
    }
  }
  function __getI32(pointer) {
    try {
      return __dataview.getInt32(pointer, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      return __dataview.getInt32(pointer, true);
    }
  }
  function __getU32(pointer) {
    try {
      return __dataview.getUint32(pointer, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      return __dataview.getUint32(pointer, true);
    }
  }
  function __getU64(pointer) {
    try {
      return __dataview.getBigUint64(pointer, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      return __dataview.getBigUint64(pointer, true);
    }
  }
  return adaptedExports;
}
export const {
  memory,
  ValueToAbilityCombo,
  AbilityComboToValue,
  ValueToTicketSet,
  add,
  advance_seed,
  get_ability,
  weighted_ability,
  purify_single_gear,
  purify_all_gear
} = await (async url => instantiate(
  await (async () => {
    try { return await globalThis.WebAssembly.compileStreaming(globalThis.fetch(url)); }
    catch { return globalThis.WebAssembly.compile(await (await import("node:fs/promises")).readFile(url)); }
  })(), {
  }
))(new URL("release.wasm", import.meta.url));
