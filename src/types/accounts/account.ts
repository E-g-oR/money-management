
export type TCreateAccount = {
    name: string, 
    value: number,
    description?: string
}

export type TNewAccount = TCreateAccount & {
    user_id: string,
}

export type TAccount = TNewAccount & {
    id: string,
}