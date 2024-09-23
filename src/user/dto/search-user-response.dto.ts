import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class UserDTO {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

export class SearchUserResponseDTO {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDTO)
  users: UserDTO[];

  constructor(users: UserDTO[]) {
    this.users = users;
  }
}
