export function measure<T>(label: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  // eslint-disable-next-line no-console
  console.debug(`[perf] ${label}: ${(end - start).toFixed(2)}ms`);
  return result as T;
}

export async function measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  // eslint-disable-next-line no-console
  console.debug(`[perf] ${label}: ${(end - start).toFixed(2)}ms`);
  return result as T;
}

