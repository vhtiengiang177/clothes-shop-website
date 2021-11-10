export interface FilterParamsProduct {
    pagenumber?: number,
    pagesize?: number,
    sort?: string,
    content?: string,
    idcategories?: number[],
    minprice?: number,
    maxprice?: number
}