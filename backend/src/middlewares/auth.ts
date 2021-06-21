import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function auth(req: Request, res: Response, next: NextFunction,): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token não localizado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;

    req.user = {
      codigo: sub,
    }

    console.log(req.user);

    return next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
}
