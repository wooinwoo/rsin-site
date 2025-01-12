export const getFullPath = (path: string) => {
  if (typeof window === "undefined") return path;
  return `${window.location.protocol}//${window.location.host}${path}`;
};
