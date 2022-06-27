class AccountVerificationValidator {
    public accountVerification: string;
    public errors: string;

    public constructor(accountVerification: string) {
        this.errors = '';
        this.accountVerification = this.validate(accountVerification);
    }

    private validate(accountVerification: string): string {
        if (accountVerification.length === 0) {
            this.errors += 'accountVerification:field required|';

            return '';
        }

        return accountVerification.trim();
    }
}

export { AccountVerificationValidator };
