type WithAsyncFn<T = unknown> = () => T | Promise<T>;

export async function withAsync<TData>(callback: WithAsyncFn<TData>) {
  try {
    const response = await callback();
    return {
      response,
      error: null,
    };
  } catch (error) {
    return {
      error,
      response: null,
    };
  }
}
