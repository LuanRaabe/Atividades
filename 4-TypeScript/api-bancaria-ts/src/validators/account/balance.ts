class BalanceValidator {
    public balance: string;
    public errors: string;

    public constructor(balance: string) {
        this.errors = '';
        this.balance = this.validate(balance);
    }

    private validate(balance: string): string {
        if (balance.length === 0) {
            this.errors += 'balance:field required|';

            return '';
        }

        return balance.trim();
    }
}

export { BalanceValidator };
