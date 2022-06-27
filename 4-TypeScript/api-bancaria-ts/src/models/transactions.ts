import { Account } from '.';

interface GetExtract {
    account: Account;
}

interface MakeDeposit {
    id: string;
    account: Account;
    value: string;
    type: string;
    date: string;
}

interface MakeTransfer {
    id: string;
    originAccount: Account;
    destinyAccount: Account;
    value: string;
    type: string;
    date: string;
}

interface MakeDraft {
    id: string;
    account: Account;
    value: string;
    type: string;
    date: string;
}

export { GetExtract, MakeDeposit, MakeTransfer, MakeDraft };
