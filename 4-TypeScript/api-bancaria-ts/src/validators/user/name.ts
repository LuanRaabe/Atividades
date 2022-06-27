class NameValidator {
    public errors: string;
    public name: string;

    public constructor(name: string) {
        this.errors = '';
        this.name = this.validate(name);
    }

    private validate(name: string): string {
        if (!name) {
            this.errors += 'name:field required|';

            return '';
        }

        if (name.trim().length < 4) {
            this.errors += 'name:use a name with more then 4 characters|';

            return '';
        }

        if (!name.trim()) {
            this.errors += 'name:cannot be only space characters|';

            return '';
        }

        return name.trim();
    }
}

export { NameValidator };
