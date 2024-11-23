import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export default class refreshDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  refreshToken: string;
}
