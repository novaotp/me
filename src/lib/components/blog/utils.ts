export const mapTagToColor = (tag: string) => {
    switch (true) {
        case ["personal", "personnel"].includes(tag):
            return "bg-green-200 text-green-800 dark:bg-green-600 dark:text-white";
        case tag === "guide":
            return "bg-yellow-200 text-yellow-800 dark:bg-yellow-500 dark:text-white"
        case ["sveltekit", "express", "socket.io"].includes(tag):
            return "bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-white";
        default:
            console.warn(`Unsupported tag received : ${tag}, default color used.`);
            return "bg-gray-200 text-gray-800 dark:bg-gray-500 dark:text-white";
    }
}
