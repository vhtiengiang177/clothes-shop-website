export interface Delivery {
    id: number,
    firstName: string,
    lastName?: string,
    phone: string,
    address: string,
    province: string,
    pistrict: string,
    wards: string,
    idCustomer: number,
    state: number
}