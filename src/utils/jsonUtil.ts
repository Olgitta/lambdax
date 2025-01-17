export function toJson<T>(payload: string | null | undefined): T {
  if (payload === null || payload === undefined) {
    throw new Error(`Failed to parse JSON payload: payload is null`);
  }

  try {
    const parsed = JSON.parse(payload);
    return parsed as T;
  } catch (error) {
    throw new Error(`Failed to parse JSON payload: ${error}`);
  }
}
