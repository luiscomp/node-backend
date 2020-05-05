import { Request, Response, NextFunction } from 'express'
import PoolFactory from './PoolFactory'

export function connectionMySQL (req: Request, res: Response, next: NextFunction): void {
    req.connection = new PoolFactory().getPool();
    next();
}