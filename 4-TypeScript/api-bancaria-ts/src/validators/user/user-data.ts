import {
    DateValidator,
    EmailValidator,
    NameValidator,
    CpfValidator,
    PasswordValidator,
} from '.';
import { User } from '../../models';

class UserDataValidator {
    public user: Partial<User>;
    public errors: string;

    private emailValidator = EmailValidator;
    private nameValidator = NameValidator;
    private dateValidator = DateValidator;
    private cpfValidator = CpfValidator;
    private passwordValidator = PasswordValidator;

    public constructor(user: User) {
        this.errors = '';
        this.user = this.validate(user);
    }

    private validate(user: User): Partial<User> {
        const validEmail = new this.emailValidator(user.email);
        const validName = new this.nameValidator(user.name);
        const validBirthdate = new this.dateValidator(user.birthdate);
        const validCPF = new this.cpfValidator(user.cpf);
        const validPassword = new this.passwordValidator(user.password);

        this.errors = this.errors.concat(
            `${validEmail.errors}${validName.errors}${validBirthdate.errors}${validCPF.errors}${validPassword.errors}`,
        );

        const userData: Partial<User> = {
            birthdate: validBirthdate.date,
            email: validEmail.email,
            name: validName.name,
            cpf: validCPF.cpf,
            password: validPassword.password,
        };

        return userData;
    }
}

export { UserDataValidator };
