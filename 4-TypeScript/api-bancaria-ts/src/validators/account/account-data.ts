import {
    AccountNumberValidator,
    AccountVerificationValidator,
    AgencyCodeValidator,
    AgencyCodeVerificationValidator,
} from '.';
import { Account } from '../../models';
class AccountDataValidator {
    public account: Partial<Account>;
    public errors: string;

    private accountnumbervalidator = AccountNumberValidator;
    private accountverificationvalidator = AccountVerificationValidator;
    private agencyCodevalidator = AgencyCodeValidator;
    private agencyCodeverificationvalidator = AgencyCodeVerificationValidator;

    public constructor(account: Account) {
        this.errors = '';
        this.account = this.validate(account);
    }

    private validate(account: Account): Partial<Account> {
        const validAccountNumber = new this.accountnumbervalidator(
            account.account_number,
        );
        const validAccountVerificationNumber =
            new this.accountverificationvalidator(
                account.account_verification_code,
            );
        const validAgencyCode = new this.agencyCodevalidator(
            account.agency_number,
        );
        const validAgencyCodeVerification =
            new this.agencyCodeverificationvalidator(
                account.agency_verification_code,
            );

        this.errors = this.errors.concat(
            `${validAccountNumber.errors}${validAccountVerificationNumber.errors}${validAgencyCode.errors}${validAgencyCodeVerification.errors}`,
        );

        const accountData: Partial<Account> = {
            account_number: validAccountNumber.account_number,
            account_verification_code:
                validAccountVerificationNumber.accountVerification,
            agency_number: validAgencyCode.agency_number,
            agency_verification_code:
                validAgencyCodeVerification.agencyCodeVerification,
        };

        return accountData;
    }
}

export { AccountDataValidator };
