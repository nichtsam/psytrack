import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PostgresModule } from 'src/db.module';

@Module({
  imports: [PostgresModule],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
