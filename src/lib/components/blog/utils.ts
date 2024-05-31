export const mapTagToColor = (tag: string) => {
    switch (true) {
        case tag === "personal":
            return "bg-green-600";
        case tag === "guide":
            return "bg-yellow-600"
        case ["sveltekit", "express", "socket.io"].includes(tag):
            return "bg-blue-500";
        default:
            throw new Error("Unexpected tag received !");
    }
}
