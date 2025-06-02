export async function safe<T>(promise: Promise<T>) {
  try {
    const result = await promise;
    return [result, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
}
