class AgencyCodeVerificationValidator {
    public agencyCodeVerification: string;
    public errors: string;

    public constructor(agencyCodeVerification: string) {
        this.errors = '';
        this.agencyCodeVerification = this.validate(agencyCodeVerification);
    }

    private validate(agencyCodeVerification: string): string {
        if (agencyCodeVerification.length === 0) {
            this.errors += 'agencyCodeVerification:field required|';

            return '';
        }

        return agencyCodeVerification.trim();
    }
}

export { AgencyCodeVerificationValidator };
