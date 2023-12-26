interface BaseService<T, R> {
  execute(t: T): Promise<R>;
}

export { BaseService };
