// A mock function to mimic making an async request for data
// eslint-disable-next-line import/prefer-default-export
export function fetchCount(amount = 1) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise<{ data: number }>((resolve) => setTimeout(() => resolve({ data: amount }), 500));
}
