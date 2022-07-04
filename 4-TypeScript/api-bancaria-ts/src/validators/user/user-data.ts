import { DateValidator, EmailValidator, NameValidator, CpfValidator } from '.';
import { User } from '../../models';

class UserDataValidator {
    public user: Partial<User>;
    public errors: string;

    private emailValidator = EmailValidator;
    private nameValidator = NameValidator;
    private dateValidator = DateValidator;
    private cpfValidator = CpfValidator;

    public constructor(user: User) {
        this.errors = '';
        this.user = this.validate(user);
    }

    private validate(user: User): Partial<User> {
        const validEmail = new this.emailValidator(user.email);
        const validName = new this.nameValidator(user.name);
        const validBirthdate = new this.dateValidator(user.birthdate);
        const validCPF = new this.cpfValidator(user.cpf);

        this.errors = this.errors.concat(
            `${validEmail.errors}${validName.errors}${validBirthdate.errors}${validCPF.errors}`,
        );

        const userData: Partial<User> = {
            birthdate: validBirthdate.date,
            email: validEmail.email,
            name: validName.name,
            cpf: validCPF.cpf,
        };

        return userData;
    }
}

export { UserDataValidator };
