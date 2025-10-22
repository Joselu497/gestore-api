import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { filtersMap } from '../maps/filters.map';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class QueryMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const path = req.params.path[0];
    const filterFn = filtersMap[path];

    const customWhere: FindOptionsWhere<any> = filterFn
      ? filterFn(req.query)
      : {};

    let relations: string[] = [];

    if (req.query.relations) {
      if (Array.isArray(req.query.relations)) {
        relations = req.query.relations as string[];
      } else {
        relations = [req.query.relations as string];
      }
    }

    req['where'] = customWhere;
    req['relations'] = relations;

    next();
  }
}
