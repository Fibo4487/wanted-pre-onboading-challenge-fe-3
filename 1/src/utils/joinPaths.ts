const joinPaths = (paths: string[]): string =>
  paths.join("/").replace(/\/\/+/g, "/");

export default joinPaths;
