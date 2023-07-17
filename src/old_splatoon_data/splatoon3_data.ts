/* This file must compile to BOTH AssemblyScript AND TypeScript */


//TODO: THIS FOLLOWING LINE IS SUPPOSEDLY VALID ASSEMBLYSCRIPT:

// class A {
//     [key: i32]: f64;
// }

//TODO: IF THIS IS THE CASE, ALL OF THIS JSON NONSENSE CAN BE REMOVED.

//TODO: https://github.com/JairusSW/as-json/
//https://github.com/AssemblyScript/assemblyscript/issues/299


export const ability_names = [
    "Ink Saver (Main)",
    "Ink Saver (Sub)",
    "Ink Recovery Up",
    "Run Speed Up",
    "Swim Speed Up",
    "Special Charge Up",
    "Special Saver",
    "Special Power Up",
    "Quick Respawn",
    "Quick Super Jump",
    "Sub Power Up",
    "Ink Resistance Up",
    "Sub Resistance Up",
    "Intensify Action"
];

// let internal_ability_names_original = [
export const internal_ability_names = [
    "MainInk_Save",
    "SubInk_Save",
    "InkRecovery_Up",
    "HumanMove_Up",
    "SquidMove_Up",
    "SpecialIncrease_Up",
    "RespawnSpecialGauge_Save",
    "SpecialSpec_Up",
    "RespawnTime_Save",
    "JumpTime_Save",
    "SubSpec_Up",
    "OpInkEffect_Reduction",
    "SubEffect_Reduction",
    "Action_Up"
];
// internal_ability_names_original[0xffffffff] = "None";
// export const internal_ability_names = [...internal_ability_names_original];
// console.log(internal_ability_names.indexOf("None"));
//https://github.com/AssemblyScript/assemblyscript/issues/292

export const internal_brand_names_str = `{
    "SquidForce": "B00",
    "Zink": "B01",
    "Krak-On": "B02",
    "Rockenberg": "B03",
    "Zekko": "B04",
    "Forge": "B05",
    "Firefin": "B06",
    "Skalop": "B07",
    "Splash Mob": "B08",
    "Inkline": "B09",
    "Tentatek": "B10",
    "Takoroka": "B11",
    "Annaki": "B15",
    "Enperry": "B16",
    "Toni Kensa": "B17",
    "Barazushi": "B19",
    "Emberz": "B20",
    "Grizzco": "B97",
    "Cuttlegear": "B98",
    "amiibo": "B99"
}`;

export const brand_data_str = `{
  "SkillEasilyToGetParam": [
    1,
    2,
    10
  ],
  "Traits": {
    "B00": {
      "UnusualGearSkill": "MainInk_Save",
      "UsualGearSkill": "OpInkEffect_Reduction"
    },
    "B01": {
      "UnusualGearSkill": "RespawnTime_Save",
      "UsualGearSkill": "JumpTime_Save"
    },
    "B02": {
      "UnusualGearSkill": "SubEffect_Reduction",
      "UsualGearSkill": "SquidMove_Up"
    },
    "B03": {
      "UnusualGearSkill": "SquidMove_Up",
      "UsualGearSkill": "HumanMove_Up"
    },
    "B04": {
      "UnusualGearSkill": "SpecialIncrease_Up",
      "UsualGearSkill": "RespawnSpecialGauge_Save"
    },
    "B05": {
      "UnusualGearSkill": "SubInk_Save",
      "UsualGearSkill": "SpecialSpec_Up"
    },
    "B06": {
      "UnusualGearSkill": "InkRecovery_Up",
      "UsualGearSkill": "SubInk_Save"
    },
    "B07": {
      "UnusualGearSkill": "RespawnSpecialGauge_Save",
      "UsualGearSkill": "RespawnTime_Save"
    },
    "B08": {
      "UnusualGearSkill": "HumanMove_Up",
      "UsualGearSkill": "MainInk_Save"
    },
    "B09": {
      "UnusualGearSkill": "Action_Up",
      "UsualGearSkill": "SubEffect_Reduction"
    },
    "B10": {
      "UnusualGearSkill": "JumpTime_Save",
      "UsualGearSkill": "InkRecovery_Up"
    },
    "B11": {
      "UnusualGearSkill": "SpecialSpec_Up",
      "UsualGearSkill": "SpecialIncrease_Up"
    },
    "B15": {
      "UnusualGearSkill": "RespawnSpecialGauge_Save",
      "UsualGearSkill": "SubInk_Save"
    },
    "B16": {
      "UnusualGearSkill": "OpInkEffect_Reduction",
      "UsualGearSkill": "SubSpec_Up"
    },
    "B17": {
      "UnusualGearSkill": "SubSpec_Up",
      "UsualGearSkill": "MainInk_Save"
    },
    "B18": {
      "UnusualGearSkill": "InkRecovery_Up",
      "UsualGearSkill": "RespawnSpecialGauge_Save"
    },
    "B19": {
      "UnusualGearSkill": "SubSpec_Up",
      "UsualGearSkill": "Action_Up"
    },
    "B20": {
      "UnusualGearSkill": "SpecialIncrease_Up",
      "UsualGearSkill": "Action_Up"
    },
    "B97": {
      "UnusualGearSkill": "None",
      "UsualGearSkill": "None"
    },
    "B98": {
      "UnusualGearSkill": "None",
      "UsualGearSkill": "None"
    },
    "B99": {
      "UnusualGearSkill": "None",
      "UsualGearSkill": "None"
    }
  }
}`;


/*export const internal_brand_names_str = `{
    "SquidForce": "B00",
    "Zink": "B01",
    "Krak-On": "B02",
    "Rockenberg": "B03",
    "Zekko": "B04",
    "Forge": "B05",
    "Firefin": "B06",
    "Skalop": "B07",
    "Splash Mob": "B08",
    "Inkline": "B09",
    "Tentatek": "B10",
    "Takoroka": "B11",
    "Annaki": "B15",
    "Enperry": "B16",
    "Toni Kensa": "B17",
    "Barazushi": "B19",
    "Emberz": "B20",
    "Grizzco": "B97",
    "Cuttlegear": "B98",
    "amiibo": "B99",
    "None": "None"
}`;*/

/*export const brand_data_str = `{
  "SkillEasilyToGetParam": [
    1,
    2,
    10
  ],
  "Traits": {
    "B00": {
      "UnusualGearSkill": "MainInk_Save",
      "UsualGearSkill": "OpInkEffect_Reduction"
    },
    "B01": {
      "UnusualGearSkill": "RespawnTime_Save",
      "UsualGearSkill": "JumpTime_Save"
    },
    "B02": {
      "UnusualGearSkill": "SubEffect_Reduction",
      "UsualGearSkill": "SquidMove_Up"
    },
    "B03": {
      "UnusualGearSkill": "SquidMove_Up",
      "UsualGearSkill": "HumanMove_Up"
    },
    "B04": {
      "UnusualGearSkill": "SpecialIncrease_Up",
      "UsualGearSkill": "RespawnSpecialGauge_Save"
    },
    "B05": {
      "UnusualGearSkill": "SubInk_Save",
      "UsualGearSkill": "SpecialSpec_Up"
    },
    "B06": {
      "UnusualGearSkill": "InkRecovery_Up",
      "UsualGearSkill": "SubInk_Save"
    },
    "B07": {
      "UnusualGearSkill": "RespawnSpecialGauge_Save",
      "UsualGearSkill": "RespawnTime_Save"
    },
    "B08": {
      "UnusualGearSkill": "HumanMove_Up",
      "UsualGearSkill": "MainInk_Save"
    },
    "B09": {
      "UnusualGearSkill": "Action_Up",
      "UsualGearSkill": "SubEffect_Reduction"
    },
    "B10": {
      "UnusualGearSkill": "JumpTime_Save",
      "UsualGearSkill": "InkRecovery_Up"
    },
    "B11": {
      "UnusualGearSkill": "SpecialSpec_Up",
      "UsualGearSkill": "SpecialIncrease_Up"
    },
    "B15": {
      "UnusualGearSkill": "RespawnSpecialGauge_Save",
      "UsualGearSkill": "SubInk_Save"
    },
    "B16": {
      "UnusualGearSkill": "OpInkEffect_Reduction",
      "UsualGearSkill": "SubSpec_Up"
    },
    "B17": {
      "UnusualGearSkill": "SubSpec_Up",
      "UsualGearSkill": "MainInk_Save"
    },
    "B18": {
      "UnusualGearSkill": "InkRecovery_Up",
      "UsualGearSkill": "RespawnSpecialGauge_Save"
    },
    "B19": {
      "UnusualGearSkill": "SubSpec_Up",
      "UsualGearSkill": "Action_Up"
    },
    "B20": {
      "UnusualGearSkill": "SpecialIncrease_Up",
      "UsualGearSkill": "Action_Up"
    },
    "B97": {
      "UnusualGearSkill": "None",
      "UsualGearSkill": "None"
    },
    "B98": {
      "UnusualGearSkill": "None",
      "UsualGearSkill": "None"
    },
    "B99": {
      "UnusualGearSkill": "None",
      "UsualGearSkill": "None"
    },
    "None": {
      "UnusualGearSkill": "None",
      "UsualGearSkill": "None"
    }
  }
}`;*/







