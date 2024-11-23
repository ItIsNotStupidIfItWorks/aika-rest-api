import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export default class signoutDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  refreshToken: string;
}
