import { Account } from './../account/account.model';
import { Staff } from "./staff.model";


export interface StaffForm {
    staff: Staff,
    account: Account
}