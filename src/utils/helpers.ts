export function noop(): void {}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function groupBy<T, K extends string | number | symbol>(items: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ||= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export function compact<T>(arr: (T | null | undefined | false)[]): T[] {
  return arr.filter(Boolean) as T[];
}

export function formatQueryParams(params: Record<string, string | number | boolean | undefined>): string {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined) return;
    usp.append(k, String(v));
  });
  return usp.toString();
}



