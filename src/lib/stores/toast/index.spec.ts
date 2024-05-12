import { get } from "svelte/store";
import { addToast, toasts, type ToastData, DISMISS_AFTER } from ".";

beforeEach(() => {
    toasts.set([]);
});

describe("Checks that toasts are added correctly", () => {
    it("Adds a new toast to the stack", () => {
        const toast: ToastData = { type: "success", message: "Added toast successfully" };
        addToast(toast);

        expect(get(toasts).at(0)).toMatchObject(toast);
    });

    // `x` refers to the `DISMISS AFTER` variable
    it("Dismisses a toast automatically after x seconds", async () => {
        const toast: ToastData = { type: "success", message: "Added toast successfully" };
        addToast(toast);

        setTimeout(() => {
            expect(get(toasts)).toHaveLength(0);
        }, DISMISS_AFTER);
    });
});
