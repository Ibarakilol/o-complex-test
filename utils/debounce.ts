export const debounce = (f: () => void, ms: number) => {
  let isCoolDown = false;

  return function <T, A extends []>(this: T, ...args: A) {
    if (isCoolDown) {
      return;
    }

    isCoolDown = true;

    setTimeout(() => {
      f.apply(this, args);
      isCoolDown = false;
    }, ms);
  };
};
