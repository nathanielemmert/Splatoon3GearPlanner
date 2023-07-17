import {brand_data_str, internal_brand_names_str} from "./splatoon3_data";

export const brand_data = JSON.parse(brand_data_str)
export const internal_brand_names: {[key:string]:string} = JSON.parse(internal_brand_names_str)