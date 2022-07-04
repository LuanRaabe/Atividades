import bcrypt from 'bcrypt';
import { config } from '../config';

class Crypto {
    private saltRounds = config.SALTROUDS;

    public async cryptograf(password: string): Promise<string> {
        const salt = (await bcrypt.genSalt(this.saltRounds)).toString();
        return bcrypt.hashSync(password, salt);
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compareSync(password, hash);
    }
}

export { Crypto };
