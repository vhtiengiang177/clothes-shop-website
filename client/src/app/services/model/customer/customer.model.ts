import { Account } from 'src/app/services/model/account/account.model';
export interface Customer {
    id?: number,
    firstName?: string,
    lastName?: string,
    verifyEmail?: number,
    point?: number,
    idTypeCustomer?: number,
    image?: string
    account?: Account
}