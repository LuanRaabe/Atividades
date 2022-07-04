class PasswordValidator {
    public errors: string;
    public password: string;

    public constructor(password: string) {
        this.errors = '';
        this.password = this.validate(password);
    }

    private validate(password: string): string {
        if (!password) {
            this.errors += 'password:field required|';

            return '';
        }

        if (password.trim().length < 8) {
            this.errors +=
                'password:use a password with minimum of 8 characters|';

            return '';
        }

        if (password.trim().length > 20) {
            this.errors +=
                'password:use a password with maximum of 20 characters|';

            return '';
        }

        if (!password.trim()) {
            this.errors += 'password:cannot be only space characters|';

            return '';
        }

        return password.trim();
    }
}

export { PasswordValidator };
