
export interface Order {
    idOrder: number,
    dateOrder: Date,
    datePayment: Date,
    dateShip: Date,
    totalQuantity: number,
    totalProductPrice: number,
    totalAmount: number,
    feeDelivery: number
    IdAddress: number,
    IdCustomer: number,
    state: number,
    IdPromotion?: number,
    IdStaff?: number,
    IdShipper?: number
    customer?: string
}