import bcrypt from 'bcrypt';
import { promisify } from 'util';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Account } from '../../entity/account';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';

// Set up some async helpers to mitigate callback hell
const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

@Service()
export class AccountController {
  @InjectRepository(Account)
  private accountRepository: Repository<Account>;

  public async create({ userName, password, email }) {
    const newAccountParams = new Account();
    newAccountParams.userName = userName;
    newAccountParams.email = email;
    newAccountParams.hashedPassword = await AccountController.hashPassword({
      password,
    });
    // send user email that they have successfully signed up
    return await this.accountRepository.save(newAccountParams);
  }

  public async getAll(): Promise<Account[]> {
    return await this.accountRepository.find();
  }

  private static async hashPassword({ password }): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    return hash(password, salt);
  }
  public static async comparePasswordHash({
    hashedPassword,
    clearTextPassword,
  }): Promise<boolean> {
    return compare(clearTextPassword, hashedPassword);
  }
  public async createJwt({ userName, password }) {
    const payload = {
      userName,
      permissions: [],
    };

    const user = await this.accountRepository.findOneOrFail({ userName });
    const passwordIsCorrect = await AccountController.comparePasswordHash({
      clearTextPassword: password,
      hashedPassword: user.hashedPassword,
    });
    // TODO: (bdietz) - throw an error if the password is not correct

    return sign(payload, process.env.PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: '1d',
    });
  }
  public static validateJwt({ jwt }): boolean {
    try {
      // verify returns the token or throws
      verify(jwt, process.env.PUBLIC_KEY, {
        algorithms: ['RS256'],
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  // public async resetPassword() {}
}
