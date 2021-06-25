import { isNumber } from "./validator";

// get total page counts from the data
export const getPageCount = (perPage) => {
    return isNumber(perPage) 
        && perPage  <= 10 ? perPage : 10;
}
// get number of pages for pagination
export const getPages = (len, count) => Math.ceil(len / (count));