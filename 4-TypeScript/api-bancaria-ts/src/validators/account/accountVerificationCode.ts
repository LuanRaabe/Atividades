class AccountVerificationCodeValidator {
    public accountVerificationCode: string;
    public errors: string;

    public constructor(accountVerificationCode: string) {
        this.errors = '';
        this.accountVerificationCode = this.validate(accountVerificationCode);
    }

    private validate(accountVerificationCode: string): string {
        if (!accountVerificationCode) {
            this.errors += 'accountVerificationCode:field required|';

            return '';
        }

        if (accountVerificationCode.length !== 2) {
            this.errors += 'accountVerificationCode:field must have 2 digits|';

            return '';
        }

        return accountVerificationCode.trim();
    }
}

export { AccountVerificationCodeValidator };
