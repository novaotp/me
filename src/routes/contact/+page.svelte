<script lang="ts">
	import Input from '$lib/contact/Input.svelte';
	import Text from '$lib/contact/Text.svelte';
	import emailjs from '@emailjs/browser';
	import { PUBLIC_EMAILJS_ACCOUNT_PUBLIC_KEY as API_KEY } from '$env/static/public';
	import { addToast } from '$stores/toast';

	let name: string = '';
	let email: string = '';
	let message: string = '';

	const handleFormSubmission = async (event: MouseEvent) => {
		event.preventDefault();

		if (name === '' || email === '' || message === '') {
			addToast({ type: 'info', message: 'Veuillez compléter tous les champs.' });
			return;
		}

		const data = { name, email, message };

		const { status } = await emailjs.send('service_d2nryqt', 'template_gt9dp3g', data, API_KEY);

		if (status === 200) {
			addToast({
				type: 'success',
				message: 'Email envoyé avec succès, je reviendrai vers vous dès que possible.'
			});

			name = '';
			email = '';
			message = '';

			return;
		}

		addToast({ type: 'error', message: "Une erreur s'est produite. Réessayez plus tard." });
	};
</script>

<svelte:head>
	<title>Contact - Sajidur Rahman</title>
</svelte:head>

<div
	class="relative w-full max-w-[800px] h-full max-h-[600px] flex flex-col justify-evenly items-center gap-10"
>
	<h1 class="text-3xl font-medium text-center">Commençons un projet ensemble</h1>
	<p class="text-center text-sm xsm:text-base">
		Complétez le formulaire ci-dessous pour me contacter.
	</p>
	<form class="relative w-full flex flex-col justify-center items-center">
		<div class="relative w-full flex flex-col gap-5 mb-5 sm:flex-row">
			<Input bind:value={name} placeholder="Entrez votre nom ici..." />
			<Input type="email" bind:value={email} placeholder="Entrez votre email ici..." />
		</div>
		<Text bind:value={message} placeholder="Entrez votre message ici..." />
		<button
			on:click={handleFormSubmission}
			type="submit"
			class="relative h-[50px] mt-5 px-10 rounded-full bg-indigo-700 text-white flex items-center text-sm"
		>
			Envoyer
		</button>
	</form>
</div>
