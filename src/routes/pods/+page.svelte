<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { Button } from 'flowbite-svelte';
	import { Section } from 'flowbite-svelte-blocks';

	function goToCreatePod() {
		goto('/pods/create');
	}

	export let data;
</script>

<Section>
	<button on:click={() => console.log(data)}>Print Data</button>

	{#each data.pods as pod}
		<Card.Root>
			<Card.Header>
				<Card.Title>{pod.name}</Card.Title>
				<Card.Description>{pod.description}</Card.Description>
			</Card.Header>
			<Card.Content></Card.Content>
		</Card.Root>
	{/each}
	{#if data.pods.length != 0}
		<br />
		<hr />
		<br />
	{/if}
	<Card.Root>
		<Card.Header>
			<Card.Title>Want a new pod?</Card.Title>
			<Card.Description>Create a new pod and invite your friends!</Card.Description>
		</Card.Header>
		<Card.Content>
			<Button on:click={goToCreatePod} size="lg" class="bg-dolphin-500">Create a Pod</Button>
		</Card.Content>
	</Card.Root>
</Section>
