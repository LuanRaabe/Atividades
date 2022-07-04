class AgencyCodeValidator {
    public agency_number: string;
    public errors: string;

    public constructor(agency_number: string) {
        this.errors = '';
        this.agency_number = this.validate(agency_number);
    }

    private validate(agency_number: string): string {
        if (!agency_number) {
            this.errors += 'agency_number:field required|';

            return '';
        }

        if (agency_number.length !== 4) {
            this.errors += 'agency_number:field must have 4 digitis|';

            return '';
        }

        return agency_number.trim();
    }
}

export { AgencyCodeValidator };
