class BranchVerificationValidator {
    public branchVerification: string;
    public errors: string;

    public constructor(branchVerification: string) {
        this.errors = '';
        this.branchVerification = this.validate(branchVerification);
    }

    private validate(branchVerification: string): string {
        if (branchVerification.length === 0) {
            this.errors += 'branchVerification:field required|';

            return '';
        }

        return branchVerification.trim();
    }
}

export { BranchVerificationValidator };
