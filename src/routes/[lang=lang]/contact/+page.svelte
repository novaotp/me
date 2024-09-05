<script lang="ts">
    import Input from '$lib/components/contact/Input.svelte';
    import Text from '$lib/components/contact/Text.svelte';
    import emailjs from '@emailjs/browser';
    import { PUBLIC_EMAILJS_ACCOUNT_PUBLIC_KEY as API_KEY } from '$env/static/public';
    import { addToast } from '$stores/toast.svelte';
    import LL from '$i18n/i18n-svelte';
    import IconExternalLink from '@tabler/icons-svelte/icons/external-link';
    import type { EventHandler } from 'svelte/elements';
    import { cn } from '$lib/utils/cn';

    let name = $state('');
    let email = $state('');
    let message = $state('');

    const handleFormSubmission: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
        event.preventDefault();

        if (name === '' || email === '' || message === '') {
            addToast({ type: 'info', message: $LL.contactPage.form.notifications.fillAll() });
            return;
        }

        const regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!email.match(regexp)) {
            addToast({ type: 'error', message: $LL.contactPage.form.notifications.invalidEmail() });
            return;
        }

        const data = { name, email, message };

        const { status } = await emailjs.send('service_d2nryqt', 'template_gt9dp3g', data, API_KEY);

        if (status === 200) {
            addToast({
                type: 'success',
                message: $LL.contactPage.form.notifications.emailSent()
            });

            name = '';
            email = '';
            message = '';

            return;
        }

        addToast({ type: 'error', message: $LL.contactPage.form.notifications.emailError() });
    };
</script>

<svelte:head>
    <title>{$LL.contactPage.meta.title()}</title>
    <meta name="description" content={$LL.contactPage.meta.description()} />
</svelte:head>

<div class="relative w-full max-w-[980px] h-full flex flex-col justify-evenly items-center px-10 gap-10">
    <h1 class="text-3xl font-medium text-center">{$LL.contactPage.title()}</h1>
    <div class="relative flex flex-col items-center gap-5">
        <p class="text-center text-sm xsm:text-base min-[512px]:flex gap-1">
            {$LL.contactPage.content.email()}
            <a
                href="mailto:contact@sajidur.dev?subject={$LL.contactPage.email.subject()}"
                class="relative flex gap-1 justify-center items-center"
            >
                <span class="font-semibold">contact@sajidur.dev</span>
                <IconExternalLink />
            </a>
        </p>
        <span
            class={cn(
                'relative w-full text-center',
                'before:absolute before:left-0 before:top-1/2 before:h-px before:w-[40%] before:bg-black dark:before:bg-white',
                'after:absolute after:right-0 after:top-1/2 after:h-px after:w-[40%] after:bg-black dark:after:bg-white'
            )}
        >
            {$LL.contactPage.content.or()}
        </span>
        <p class="text-center text-sm xsm:text-base">{$LL.contactPage.content.form()}</p>
    </div>
    <form class="relative w-full flex flex-col justify-center items-center" onsubmit={handleFormSubmission}>
        <div class="relative w-full flex flex-col gap-5 mb-5 sm:flex-row">
            <Input bind:value={name} placeholder={$LL.contactPage.form.fields.name.placeholder()} />
            <Input type="email" bind:value={email} placeholder={$LL.contactPage.form.fields.email.placeholder()} />
        </div>
        <Text bind:value={message} placeholder={$LL.contactPage.form.fields.message.placeholder()} />
        <button
            type="submit"
            class="relative px-6 py-3 mt-5 rounded flex items-center text-sm
                 bg-indigo-700 dark:bg-sky-300 text-white dark:text-zinc-800"
        >
            {$LL.contactPage.form.send()}
        </button>
    </form>
</div>
