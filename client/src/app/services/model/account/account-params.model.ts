import { Customer } from "../customer/customer.model";
import { Staff } from "../staff/staff.model";
import { Account } from "./account.model";

export interface AccountParams{
    account: Account,
    customer?: Customer,
    staff?: Staff
}