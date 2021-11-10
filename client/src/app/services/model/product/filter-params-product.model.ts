export interface FilterParamsProduct {
    pageindex?: number,
    pagesize?: number,
    sort?: string,
    content?: string,
    idcategories?: number[],
    minprice?: number,
    maxprice?: number
}