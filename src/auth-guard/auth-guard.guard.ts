import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorizationHeader =
      req['headers']['authorization'] || req['headers']['Authorization'];

    console.log(authorizationHeader);
    if (!authorizationHeader) return false;

    const accessToken = authorizationHeader.split(' ')[1];

    const user = jwt.verify(accessToken, process.env.JWT_SECRET_PKEY);
    console.log(user);
    if (!user.userID) return false;

    req.body.userID = user.userID;

    delete req.body.accessToken;

    return true;
  }
}
