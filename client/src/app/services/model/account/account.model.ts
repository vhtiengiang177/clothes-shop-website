export interface Account{
    id: number,
    email: string,
    password: string,
    verificationCode?: number,
    state?: number
}