import { Account } from '../models';
import { v4 } from 'uuid';

class GenerateAccountData {
    private zeroFill(num: number): string {
        return num.toString().length === 1 ? `0${num}` : `${num}`;
    }

    private ramdomNumberBetween(min: number, max: number): string {
        return this.zeroFill(Math.floor(Math.random() * (max - min + 1) + min));
    }

    public async execute(id: string): Promise<Account> {
        console.log('generating account...');
        return {
            id: v4(),
            agency_number: this.ramdomNumberBetween(1000, 9999),
            agency_verification_code: this.ramdomNumberBetween(1, 99),
            account_verification_code: this.ramdomNumberBetween(1, 99),
            account_number: `${this.ramdomNumberBetween(
                1000,
                9999,
            )}-${this.ramdomNumberBetween(
                1000,
                9999,
            )}-${this.ramdomNumberBetween(
                1000,
                9999,
            )}-${this.ramdomNumberBetween(1000, 9999)}`,
            balance: '0',
            user_id: id,
        } as Account;
    }
}

export { GenerateAccountData };
