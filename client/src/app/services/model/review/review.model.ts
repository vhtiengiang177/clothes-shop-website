export interface Review {
    idProduct: number,
    idUser?: number,
    idOrder: number,
    comment: string,
    rating: number,
    date?: Date,
    image?:string,
    lastName?: string,
    firstName?: string
}