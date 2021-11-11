export interface Product {
    id: number,
    sku: number,
    name: string,
    totalBuy: number,
    state: number,
    createdDate: Date,
    lastModified: Date,
    createdById: number,
    modifiedById: number,
    categoryId: number
}