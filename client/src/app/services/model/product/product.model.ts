export interface Product {
    id?: number,
    sku?: number,
    name: string,
    description?: string,
    totalBuy?: number,
    unitPrice?: number,
    state?: number,
    createdDate?: Date,
    lastModified?: Date,
    createdById?: number,
    modifiedById?: number,
    idCategory?: number,
    category?: string,
    imageUrl?: string
}