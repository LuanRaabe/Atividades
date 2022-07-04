class AgencyCodeVerificationValidator {
    public agencyCodeVerification: string;
    public errors: string;

    public constructor(agencyCodeVerification: string) {
        this.errors = '';
        this.agencyCodeVerification = this.validate(agencyCodeVerification);
    }

    private validate(agencyCodeVerification: string): string {
        if (!agencyCodeVerification) {
            this.errors += 'agencyCodeVerification:field required|';

            return '';
        }

        if (agencyCodeVerification.length !== 2) {
            this.errors += 'agencyCodeVerification:field must have 2 digits|';

            return '';
        }

        return agencyCodeVerification.trim();
    }
}

export { AgencyCodeVerificationValidator };
