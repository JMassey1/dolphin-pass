<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert, Button, Input, Label } from 'flowbite-svelte';
	import { Register, Section } from 'flowbite-svelte-blocks';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	export let form;
</script>

<div class="sm:mt-auto lg:mt-[150px]">
	{#if form?.type}
		<div class="mx-auto items-center sm:max-w-md">
			<Alert color="red" class="mx-auto flex flex-row" dismissable>
				<InfoCircleSolid slot="icon" class="h-4 w-4" />
				<span class="font-medium">Uh oh!</span>
				<span>{form.type.message}</span>
			</Alert>
		</div>

		<br />
	{/if}
	<Section name="login">
		<Register
			href="/"
			name="login"
			divClass="min-w-[650px] bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-800"
			aClass="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<svelte:fragment slot="top"></svelte:fragment>
			<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
				<form class="flex flex-col space-y-6" method="post" action="?/login" use:enhance>
					<h3 class="p-0 text-xl font-semibold text-gray-900 dark:text-white">Login</h3>
					<Label class="space-y-2">
						<span>Your username</span>
						<Input type="text" name="username" placeholder="username" required />
					</Label>
					<Label class="space-y-2">
						<span>Your password</span>
						<Input type="password" name="password" placeholder="•••••" required />
					</Label>
					<Button type="submit" class="w-full1 bg-dolphin-500">Sign in</Button>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Don’t have an account yet? <a
							href="/signup"
							class="text-primary-600 dark:text-primary-500 font-medium hover:underline">Sign up</a
						>
					</p>
				</form>
			</div>
		</Register>
	</Section>
</div>
