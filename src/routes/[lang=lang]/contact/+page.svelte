<script lang="ts">
    import Input from '$lib/components/contact/Input.svelte';
    import Text from '$lib/components/contact/Text.svelte';
    import emailjs from '@emailjs/browser';
    /** @ts-expect-error A weird issue arises where SvelteKit cannot find the env variable, even if it's there and works */
    import { PUBLIC_EMAILJS_ACCOUNT_PUBLIC_KEY as API_KEY } from '$env/static/public';
    import { addToast } from '$lib/stores/toast';
    import LL from '$i18n/i18n-svelte';

    let name: string = '';
    let email: string = '';
    let message: string = '';

    const handleFormSubmission = async () => {
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
    <h1 class="text-3xl font-medium text-center">{$LL.contactPage.letsWorkTogether()}</h1>
    <p class="text-center text-sm xsm:text-base">{$LL.contactPage.completeTheForm()}</p>
    <form class="relative w-full flex flex-col justify-center items-center" on:submit|preventDefault={handleFormSubmission}>
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
