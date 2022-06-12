export interface OrderDetail {
    idOrder?: number,
    idProduct?: number, 
    idSize?: number,
    idColor?: number,
    unitPrice?: number,
    quantity?:number,
    product?: string,
    delivery?: string,
    color?: string,
    size?: string,
    pricePromotion?: number
}