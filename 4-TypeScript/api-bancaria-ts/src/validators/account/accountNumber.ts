class AccountNumberValidator {
    public accountNumber: string;
    public errors: string;

    public constructor(accountNumber: string) {
        this.errors = '';
        this.accountNumber = this.validate(accountNumber);
    }

    private validate(accountNumber: string): string {
        if (accountNumber.length === 0) {
            this.errors += 'accountNumber:field required|';

            return '';
        }

        return accountNumber.trim();
    }
}

export { AccountNumberValidator };
