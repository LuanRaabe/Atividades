import { Account } from '.';

interface GetExtract {
    account: Account;
    cpf: string;
}

interface MakeDeposit {
    id: string;
    account: Account;
    cpf: string;
    value: string;
    type: string;
    date: string;
}

interface MakeTransfer {
    id: string;
    originAccount: Account;
    originAccountCPF: string;
    destinyAccount: Account;
    destinyAccountCPF: string;
    value: string;
    type: string;
    date: string;
}

interface MakeDraft {
    id: string;
    account: Account;
    cpf: string;
    value: string;
    type: string;
    date: string;
}

export { GetExtract, MakeDeposit, MakeTransfer, MakeDraft };
