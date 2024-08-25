/**
 * Transforms a string to it's slug equivalent.
 * @param value The string to slugify.
 * @returns The slug version of the given string.
 */
export function slugify(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9À-ž-]+/g, '');
};
