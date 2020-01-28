import { Request, Response, NextFunction } from 'express'

export function corsConfig(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.setHeader('Accept', 'application/json; charset=UTF-8');
    next();
}