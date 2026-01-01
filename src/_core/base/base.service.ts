import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  FindOptionsOrder,
} from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(
    limit?: number,
    page?: number,
    paginate?: boolean,
    where?: FindOptionsWhere<T>,
    relations?: string[],
    order?: FindOptionsOrder<T>,
  ): Promise<[T[], number] | T[]> {
    if (paginate) {
      const take = limit || 10;
      const skip = ((page || 1) - 1) * take;

      return this.repository.findAndCount({
        take,
        skip,
        where,
        relations,
        order,
      });
    }

    return this.repository.find({ where, relations, order });
  }

  async findOne(id: number, relations?: string[]): Promise<T | null> {
    return this.repository.findOne({
      where: { id },
      relations,
    } as unknown as FindOptionsWhere<T>);
  }

  async create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    const existingEntity = await this.repository.findOne({
      where: { id },
    } as unknown as FindOptionsWhere<T>);

    if (!existingEntity) {
      throw new Error(`Entity with id ${id} not found`);
    }

    Object.assign(existingEntity, data);

    return await this.repository.save(existingEntity);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  getAllRelations(): string[] {
    const metadata = this.repository.metadata;
    return metadata.relations.map((relation) => relation.propertyName);
  }
}
