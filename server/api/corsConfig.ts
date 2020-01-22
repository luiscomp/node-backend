import { Request, Response, NextFunction } from 'express'

export function corsConfig(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json; charset=UTF-8');
    res.header('Accept', 'application/json; charset=UTF-8');
}