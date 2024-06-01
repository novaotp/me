export const mapTagToColor = (tag: string) => {
    switch (true) {
        case ["personal", "personnel"].includes(tag):
            return "bg-green-600";
        case tag === "guide":
            return "bg-yellow-600"
        case ["sveltekit", "express", "socket.io"].includes(tag):
            return "bg-blue-500";
        default:
            console.warn(`Unsupported tag received : ${tag}, default color used.`);
            return "bg-gray-500";
    }
}
