import { Injectable } from '@nestjs/common';
import {
  createUser,
  CreateUserArgs,
  getUserByEmail,
  getUserById,
} from '#db/query_sql';
import { PostgresService } from '#src/db.module';
import { UserError } from './user.error';

@Injectable()
export class UserService {
  constructor(private postgresService: PostgresService) {}

  getById(id: string) {
    return getUserById(this.postgresService.sql, { id });
  }
  getByEmail(email: string) {
    return getUserByEmail(this.postgresService.sql, { email });
  }
  async create(args: CreateUserArgs) {
    const existingUser = await this.getByEmail(args.email);
    if (existingUser) {
      throw new UserError('EMAIL_ALREADY_USED', 'This email is already in use');
    }

    const user = await createUser(this.postgresService.sql, args);

    if (!user) {
      throw new Error(
        'This should not happen. A user must be returned, or the transaction should throw.',
      );
    }

    return user;
  }
}
