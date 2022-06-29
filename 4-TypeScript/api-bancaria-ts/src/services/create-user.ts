import { APIResponse, User } from '../models';
import { ExceptionTreatment } from '../utils';
import { UserDataValidator } from '../validators';
import { UsersTable } from '../clients/dao/postgres/user';
import { v4 } from 'uuid';

class CreateUserService {
    private userDataValidator = UserDataValidator;
    private usersTable = UsersTable;

    public async execute(user: User): Promise<any> {
        try {
            console.log('create user', user);
            const validUserData = new this.userDataValidator(user);

            console.log('validUserData', validUserData);
            if (validUserData.errors) {
                throw new Error(`400: ${validUserData.errors}`);
            }

            const existUser = await new this.usersTable().get(user);
            console.log('existUser', existUser);
            if (existUser) {
                return {
                    data: existUser[0],
                    messages: [],
                };
            }

            validUserData.user.id = v4();

            console.log('validUserData', validUserData.user);
            const insertedUser = await new this.usersTable().insert(
                validUserData.user as User,
            );

            console.log('insertedUser', insertedUser);

            if (insertedUser) {
                return {
                    data: validUserData.user,
                    messages: [],
                };
            }

            return {
                data: {},
                messages: ['an error occurred while creating user'],
            } as APIResponse;
        } catch (error) {
            throw new ExceptionTreatment(
                error as Error,
                500,
                'an error occurred while inserting user on database',
            );
        }
    }
}

export { CreateUserService };
