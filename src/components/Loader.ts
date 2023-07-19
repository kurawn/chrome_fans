export const Loader = (): HTMLElement => {
  const loader = document
    .querySelector(".infinite-loading-container .g-icon")
    ?.cloneNode(true) as HTMLElement;
  return loader;
};
