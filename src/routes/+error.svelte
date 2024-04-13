<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from 'flowbite-svelte';
	import { Page404, Section } from 'flowbite-svelte-blocks';

	console.error($page.error?.message);

	const goHome = () => {
		goto('/');
	};
</script>

<Section class="mt-5">
	<Page404>
		<svelte:fragment slot="h1">404</svelte:fragment>
		<svelte:fragment slot="paragraph">
			<p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
				Something's missing.
			</p>
			<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
				Sorry, we can't find that page. You'll find lots to explore on the home page.
			</p>
			<Button size="lg" on:click={goHome} class="bg-dolphin-500">Back to Homepage</Button>
		</svelte:fragment>
	</Page404>
</Section>
