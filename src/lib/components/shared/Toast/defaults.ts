import SuccessIcon from '@tabler/icons-svelte/icons/check';
import ErrorIcon from '@tabler/icons-svelte/icons/exclamation-mark';
import InfoIcon from '@tabler/icons-svelte/icons/info-circle';
import type { Toast } from "$stores/toast.svelte"

export const ICONS_MAP: Record<Toast["type"], typeof SuccessIcon> = {
    'success': SuccessIcon,
    'info': InfoIcon,
    'error': ErrorIcon
}

export const BG_COLOR_MAP: Record<Toast["type"], string> = {
    'success': 'bg-green-600',
    'info': 'bg-red-500',
    'error': 'bg-blue-500'
}
