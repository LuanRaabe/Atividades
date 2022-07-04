import { Fees } from '../models';

class FeesValues {
    private fees = {
        deposit: 0.01,
        draft: 4,
        transfer: 1,
    };

    public deposit(number: number): Fees {
        return {
            value: number * (1 - this.fees.deposit),
            fee: number * this.fees.deposit,
        };
    }

    public draft(number: number): Fees {
        return { value: number + this.fees.draft, fee: this.fees.draft };
    }

    public transfer(number: number): Fees {
        return { value: number + this.fees.transfer, fee: this.fees.transfer };
    }
}

export { FeesValues };
