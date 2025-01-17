export const tryCatch = function (
  executor: Function,
): [any | null, any | null] {
  try {
    return [executor(), null];
  } catch (error) {
    return [null, error];
  }
};

export const tryCatchAsync = async function (
  executor: Function,
): Promise<[any | null, any | null]> {
  try {
    return [await executor(), null];
  } catch (error) {
    return [null, error];
  }
};
