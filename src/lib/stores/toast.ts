import { writable } from 'svelte/store';

interface Toast {
	id: string;
	type: 'success' | 'error' | 'info';
	message: string;
}

type ToastData = Omit<Toast, 'id'>;

export const toasts = writable<Toast[]>([]);

/** Adds a new toast to the top of the stack. */
export const addToast = (toast: ToastData) => {
	const id = crypto.randomUUID();

	toasts.update((all) => [{ id, ...toast }, ...all]);

	setTimeout(() => {
		dismissToast(id);
	}, 3000);
};

/** Removes a toast from the stack. */
export const dismissToast = (id: string) => {
	toasts.update((all) => all.filter((toast) => toast.id !== id));
};
