/**
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The time to wait before calling the function.
 * @returns {Function} A debounced version of the function.
 */
export const debounced = <T extends unknown[], R>(
  func: (...args: T) => R,
  delay: number,
): ((...args: T) => void) => {
  let timer: NodeJS.Timeout | null = null;

  return (...args: T): void => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
