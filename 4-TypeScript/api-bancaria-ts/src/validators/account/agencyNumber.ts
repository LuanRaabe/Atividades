class AgencyCodeValidator {
    public agency_number: string;
    public errors: string;

    public constructor(agency_number: string) {
        this.errors = '';
        this.agency_number = this.validate(agency_number);
    }

    private validate(agency_number: string): string {
        if (agency_number.length === 0) {
            this.errors += 'agency_number:field required|';

            return '';
        }

        return agency_number.trim();
    }
}

export { AgencyCodeValidator };
