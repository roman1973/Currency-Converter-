export const scrollToTop = (topPosition: number, delay: number): void => {
  let position = window.pageYOffset;
  const path = window.location.pathname;

  if (position > topPosition) {
    const interval = setInterval(() => {
      if (path !== window.location.pathname) {
        clearInterval(interval);
      } else {
        window.scrollTo(0, position < topPosition ? 0 : position);
        position -= topPosition;

        if (position < 0) clearInterval(interval);
      }
    }, delay);
  }
};

export const keyHelper = (index: number): number => index;
