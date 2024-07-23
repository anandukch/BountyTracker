import { Repository, FindOptionsWhere, DeepPartial } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

abstract class BaseRepository<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  find = async (filter?: FindOptionsWhere<T>, relations?: Array<string>): Promise<T[]> => {
    return this.repository.find({
      where: filter,
      relations: relations,
    });
  };

  findOneBy = async (filter: FindOptionsWhere<T>, relations?: Array<string>): Promise<T> => {
    return this.repository.findOne({
      where: filter,
      relations: relations,
    });
  };

  create = async (data: DeepPartial<T>): Promise<T> => {
    return this.repository.create(data);
  };

  update = async (id: number | string, data: QueryDeepPartialEntity<T>) => {
    return this.repository.update(id, data);
  };

  save = async (data: T): Promise<T> => {
    return this.repository.save(data);
  };

  delete = async (filter: FindOptionsWhere<T> | number | string): Promise<void> => {
    await this.repository.delete(filter);
  };

  softDelete = async (data: T): Promise<void> => {
    await this.repository.softRemove(data);
  };
}

export default BaseRepository;
