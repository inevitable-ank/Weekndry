export async function safeFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response | null> {
  try {
    const res = await fetch(input, init);
    if (!res.ok) return null;
    return res;
  } catch {
    return null;
  }
}


