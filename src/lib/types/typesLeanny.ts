/* Generated using https://app.quicktype.io/?l=ts */
import * as z from "zod";


export const MapSchema = z.object({
    "Context1": z.number(),
    "Context2": z.number(),
    "Context3": z.number(),
    "Context4": z.number(),
});
export type Map = z.infer<typeof MapSchema>;

export const CloudRandomSetSchema = z.object({
    "Map": z.record(z.string(), MapSchema),
});
export type CloudRandomSet = z.infer<typeof CloudRandomSetSchema>;

export const UserDataSchema = z.object({
    "CloudRandomSet": CloudRandomSetSchema,
    "UserKey": z.string(),
    "H": z.number(),
});
export type UserData = z.infer<typeof UserDataSchema>;

export const BynameAdjectiveMapSchema = z.object({
});
export type BynameAdjectiveMap = z.infer<typeof BynameAdjectiveMapSchema>;

export const VersusSchema = z.object({
    "WinCountByRule": BynameAdjectiveMapSchema,
    "WinCountBySpecial": BynameAdjectiveMapSchema,
    "WinCountByTclAtk": z.number(),
    "WinCountByTclDef": z.number(),
});
export type Versus = z.infer<typeof VersusSchema>;

export const CoopSchema = z.object({
    "BossKillNumMap": BynameAdjectiveMapSchema,
    "RareEnemyKillNumMap": BynameAdjectiveMapSchema,
});
export type Coop = z.infer<typeof CoopSchema>;



export const ProfileSchema = z.object({
    "BadgeList": z.array(z.any()),
    "GoodsMap": BynameAdjectiveMapSchema,
    "BynameAdjectiveMap": BynameAdjectiveMapSchema,
    "BynameSubjectMap": BynameAdjectiveMapSchema,
    "NamePlateBgMap": z.array(z.any()),
    "SkillChipMap": BynameAdjectiveMapSchema,
    "Versus": VersusSchema,
    "Coop": CoopSchema,
});
export type Profile = z.infer<typeof ProfileSchema>;

export const HaveGearMapSchema = z.object({
    "ExDrinksArray": z.array(z.number()),
    "ExSkillArray": z.array(z.number()),
    "MainSkill": z.number(),
    "RandomContext": z.number(),
    "Favorite": z.union([z.boolean(), z.null()]).optional(),
});
export type HaveGearMap = z.infer<typeof HaveGearMapSchema>;

export const GearDbSchema = z.object({
    "HaveGearHeadMap": z.record(z.string(), HaveGearMapSchema),
    "HaveGearShoesMap": z.record(z.string(), HaveGearMapSchema),
    "HaveGearClothesMap": z.record(z.string(), HaveGearMapSchema),
});
export type GearDb = z.infer<typeof GearDbSchema>;

export const GearSeedDatabaseSchema = z.object({
    "GearDB": GearDbSchema,
    "UserData": UserDataSchema,
    "Profile": ProfileSchema,
    "LastUpdated": z.number(),
});
export type GearSeedDatabase = z.infer<typeof GearSeedDatabaseSchema>;


// /* Generated using https://app.quicktype.io/?l=ts */
// import "ajv"
// import type { JTDSchemaType } from "ajv/dist/jtd";

// export interface GearSeedDatabase {
//     GearDB:      GearDB;
//     UserData?:    UserData; // not actually optional, but i dont use this part in my website
//     Profile?:     Profile;  // not actually optional, but i dont use this part in my website
//     LastUpdated: number;   
// }

  

// export interface GearDB {
//     HaveGearHeadMap:    { [key: string]: HaveGearMap };
//     HaveGearShoesMap:   { [key: string]: HaveGearMap };
//     HaveGearClothesMap: { [key: string]: HaveGearMap };
// }


// export interface HaveGearMap {
//     ExDrinksArray: number[];
//     ExSkillArray:  number[];
//     MainSkill:     number;
//     RandomContext: number;
//     Favorite?:     boolean;
// }














// export interface Profile {
//     BadgeList:          any[];
//     GoodsMap:           IdkFormat;
//     BynameAdjectiveMap: IdkFormat;
//     BynameSubjectMap:   IdkFormat;
//     NamePlateBgMap:     any[];
//     SkillChipMap:       IdkFormat;
//     Versus:             Versus;
//     Coop:               Coop;
// }

// export interface IdkFormat {
// }

// export interface Coop {
//     BossKillNumMap:      IdkFormat;
//     RareEnemyKillNumMap: IdkFormat;
// }

// export interface Versus {
//     WinCountByRule:    IdkFormat;
//     WinCountBySpecial: IdkFormat;
//     WinCountByTclAtk:  number;
//     WinCountByTclDef:  number;
// }

// export interface UserData {
//     CloudRandomSet: CloudRandomSet;
//     UserKey:        string;
//     H:              number;
// }

// export interface CloudRandomSet {
//     Map: { [key: string]: Map };
// }

// export interface Map {
//     Context1: number;
//     Context2: number;
//     Context3: number;
//     Context4: number;
// }
