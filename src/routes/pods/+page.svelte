<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	export let data;
</script>

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

<!-- <Table striped={true}>
	<TableHead>
		<TableHeadCell>Product name</TableHeadCell>
		<TableHeadCell>Color</TableHeadCell>
		<TableHeadCell>Category</TableHeadCell>
		<TableHeadCell>Price</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Edit</span>
		</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		<TableBodyRow>
			<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
			<TableBodyCell>Sliver</TableBodyCell>
			<TableBodyCell>Laptop</TableBodyCell>
			<TableBodyCell>$2999</TableBodyCell>
			<TableBodyCell>
				<a href="/tables" class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
					>Edit</a
				>
			</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow>
			<TableBodyCell>Microsoft Surface Pro</TableBodyCell>
			<TableBodyCell>White</TableBodyCell>
			<TableBodyCell>Laptop PC</TableBodyCell>
			<TableBodyCell>$1999</TableBodyCell>
			<TableBodyCell>
				<a href="/tables" class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
					>Edit</a
				>
			</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow>
			<TableBodyCell>Magic Mouse 2</TableBodyCell>
			<TableBodyCell>Black</TableBodyCell>
			<TableBodyCell>Accessories</TableBodyCell>
			<TableBodyCell>$99</TableBodyCell>
			<TableBodyCell>
				<a href="/tables" class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
					>Edit</a
				>
			</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow>
			<TableBodyCell>Google Pixel Phone</TableBodyCell>
			<TableBodyCell>Gray</TableBodyCell>
			<TableBodyCell>Phone</TableBodyCell>
			<TableBodyCell>$799</TableBodyCell>
			<TableBodyCell>
				<a href="/tables" class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
					>Edit</a
				>
			</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow>
			<TableBodyCell>Apple Watch 5</TableBodyCell>
			<TableBodyCell>Red</TableBodyCell>
			<TableBodyCell>Wearables</TableBodyCell>
			<TableBodyCell>$999</TableBodyCell>
			<TableBodyCell>
				<a href="/tables" class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
					>Edit</a
				>
			</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table> -->
