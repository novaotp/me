export const slugify = (value: string) => {
    return value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, '');
}
