import {
    AccountNumberValidator,
    AccountVerificationValidator,
    BalanceValidator,
    BranchValidator,
    BranchVerificationValidator,
} from '.';
import { Account } from '../../models';
class AccountDataValidator {
    public account: Partial<Account>;
    public errors: string;

    private accountnumbervalidator = AccountNumberValidator;
    private accountverificationvalidator = AccountVerificationValidator;
    private balancevalidator = BalanceValidator;
    private branchvalidator = BranchValidator;
    private branchverificationvalidator = BranchVerificationValidator;

    public constructor(account: Account) {
        this.errors = '';
        this.account = this.validate(account);
    }

    private validate(account: Account): Partial<Account> {
        const validAccountNumber = new this.accountnumbervalidator(
            account.accountNumber,
        );
        const validAccountVerificationNumber =
            new this.accountverificationvalidator(
                account.accountVerificationNumber,
            );
        const validBalance = new this.balancevalidator(account.balance);
        const validBranch = new this.branchvalidator(account.branch);
        const validBranchVerification = new this.branchverificationvalidator(
            account.branchVerificationNumber,
        );

        this.errors = this.errors.concat(
            `${validAccountNumber.errors}${validAccountVerificationNumber.errors}${validBalance.errors}${validBranch.errors}${validBranchVerification.errors}`,
        );

        const accountData: Partial<Account> = {
            accountNumber: validAccountNumber.accountNumber,
            accountVerificationNumber:
                validAccountVerificationNumber.accountVerification,
            balance: validBalance.balance,
            branch: validBranch.branch,
            branchVerificationNumber:
                validBranchVerification.branchVerification,
        };

        return accountData;
    }
}

export { AccountDataValidator };
