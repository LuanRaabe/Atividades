class BranchValidator {
    public branch: string;
    public errors: string;

    public constructor(branch: string) {
        this.errors = '';
        this.branch = this.validate(branch);
    }

    private validate(branch: string): string {
        if (branch.length === 0) {
            this.errors += 'branch:field required|';

            return '';
        }

        return branch.trim();
    }
}

export { BranchValidator };
