<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		NavBrand,
		NavHamburger,
		Navbar
	} from 'flowbite-svelte';
	import moment from 'moment';
	import { Toaster, toast } from 'svelte-sonner';
	import '../app.pcss';
	import type { LayoutData } from './$types';

	import brandImage from '$lib/images/dolphin_logo.png';
	import avatarImage from '$lib/images/pfp.jpg';

	export let data: LayoutData;
</script>

<div class="">
	<Navbar class="start-0 w-full border-b px-8 py-2.5 sm:px-4" fluid={true} color="blue">
		<NavBrand href="/">
			<img src={brandImage} alt="Dolphin logo" class="me-3 h-6 sm:h-9" />
			<span class="self-center whitespace-nowrap text-xl font-bold dark:text-white"
				>DolphinPass</span
			>
		</NavBrand>
		<div class="flex space-x-4 md:order-2">
			{#if data?.isLoggedIn}
				<Avatar id="avatar-menu" src={avatarImage} alt="User avatar" class="cursor-pointer" />
				<NavHamburger />
				<Dropdown placement="bottom-start" triggeredBy="#avatar-menu" class="z-20 mr-4">
					<DropdownHeader>
						<span class="block text-sm">Welcome, {data.user?.username}!</span>
						<span class="block text-sm font-medium"
							>Last Logged In: {moment(data.user?.lastLoggedIn).format('MMM Do YY, h:mm a')}</span
						>
					</DropdownHeader>
					<DropdownItem>
						<form method="post" use:enhance action="/login?/logout">
							<button type="submit" class="w-full text-left">Logout</button>
						</form>
					</DropdownItem>
				</Dropdown>
			{/if}
		</div>
	</Navbar>
	<Toaster position="bottom-right" closeButton />
	<div class="overflow-auto px-16 pb-16">
		<slot />
	</div>
</div>
