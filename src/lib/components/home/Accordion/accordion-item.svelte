<script lang="ts">
    import { Accordion as AccordionPrimitive } from 'bits-ui';
    import { cn } from '$lib/utils/cn';

    type $$Props = AccordionPrimitive.ItemProps;

    let className: $$Props['class'] = undefined;
    export let value: $$Props['value'];
    export { className as class };
</script>

<AccordionPrimitive.Item {value} class={cn('border-b dark:border-zinc-700', className)} {...$$restProps}>
    <slot />
</AccordionPrimitive.Item>
