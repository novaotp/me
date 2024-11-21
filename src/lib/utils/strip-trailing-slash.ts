/** Removes the trailing slash from the given path. */
export function stripTrailingSlash(path: string): string {
    return path.endsWith('/') ? path.slice(0, -1) : path;
}
