/**
 * Dismisses a toast after x milliseconds.
 * 
 * **INTERNAL, ONLY EXPORTED FOR TESTING.**
 */
export const DISMISS_AFTER = 3000;

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
}

let toasts = $state<Toast[]>([]);

export const getToasts = () => toasts;

export const toast = {
    /**
     * Adds a new `success` toast to the top of the stack.
     * @alias {@link addToast} with type `success`.
     */
    success: (message: string) => addToast({ type: 'success', message }),
    /**
     * Adds a new `info` toast to the top of the stack.
     * @alias {@link addToast} with type `info`.
     */
    info: (message: string) => addToast({ type: 'info', message }),
    /**
     * Adds a new `error` toast to the top of the stack.
     * @alias {@link addToast} with type `error`.
     */
    error: (message: string) => addToast({ type: 'error', message })
}

/** Adds a new toast to the top of the stack. */
export const addToast = (data: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();

    toasts.push({ id, ...data });

    setTimeout(() => {
        dismissToast(id);
    }, DISMISS_AFTER);
};

/** Removes a toast from the stack. */
export const dismissToast = (id: string) => {
    toasts = toasts.filter(toast => toast.id !== id);
};
