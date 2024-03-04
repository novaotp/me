<script lang="ts">
	export let title: string;
</script>

<div
	class="relative w-full flex-grow p-5 flex flex-col justify-center items-start gap-3 border-2 border-black rounded-lg"
>
	<h3 class="text-xl font-medium">
		{title}
	</h3>
	<p class="text-justify">
		<slot />
	</p>
</div>
