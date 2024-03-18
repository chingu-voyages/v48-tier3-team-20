// put all shared utility functions here

export const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};
