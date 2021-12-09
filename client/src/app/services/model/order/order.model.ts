
export interface Order {
    idOrder: number,
    dateOrder: Date,
    datePayment: Date,
    dateShip: Date,
    totalQuantity: number,
    totalProductPrice: number,
    totalAmount: number,
    feeDelivery: number
    idAddress: number,
    idCustomer: number,
    state: number,
    idPromotion?: number,
    idStaff?: number,
    idShipper?: number,
    shipper?: string,
    staff?: string,
    customer?: string
}