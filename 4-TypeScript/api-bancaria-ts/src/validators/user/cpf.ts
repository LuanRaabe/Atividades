class CpfValidator {
    public cpf: string;
    public errors: string;
    private regex = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm;

    public constructor(cpf: string) {
        this.errors = '';
        this.cpf = this.validate(cpf);
    }

    private validate(cpf: string): string {
        if (cpf.length === 0) {
            this.errors += 'cpf:field required|';

            return '';
        }

        if (!this.regex.test(cpf)) {
            this.errors += 'cpf:invalid cpf|';

            return '';
        }

        return cpf.trim();
    }
}

export { CpfValidator };
