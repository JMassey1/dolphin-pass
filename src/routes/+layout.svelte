<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Avatar,
		Button,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar
	} from 'flowbite-svelte';
	import '../app.pcss';

	let username: string = 'Jordan Massey';
	let email: string = 'jmmhqw@umsystem.edu';
</script>

<div class="">
	<Navbar class="start-0 w-full border-b px-8 py-2.5 sm:px-4" fluid={true} color="blue">
		<NavBrand href="/">
			<img src="dolphin_logo.png" alt="Dolphin logo" class="me-3 h-6 sm:h-9" />
			<span class="self-center whitespace-nowrap text-xl font-bold dark:text-white"
				>DolphinPass</span
			>
		</NavBrand>
		<NavUl>
			<NavLi href="/login">Login</NavLi>
			<NavLi href="/signup">Sign Up</NavLi>
		</NavUl>
		<div class="flex space-x-4 md:order-2">
			<Button size="sm" class="bg-dolphin-500">Get Started</Button>
			<Avatar id="avatar-menu" src="pfp.jpg" alt="User avatar" class="cursor-pointer" />
			<!-- TODO: Switch Avatar to call to action button to register if not logged in -->
			<NavHamburger />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu" class="z-20 w-44">
			<DropdownHeader>
				<span class="block text-sm">{username}</span>
				<span class="block truncate text-sm font-medium">{email}</span>
			</DropdownHeader>
			<DropdownItem href="/login">Login</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="/register">Register</DropdownItem>
			<DropdownDivider />
			<DropdownItem>
				<form method="post" use:enhance>
					<button type="submit" class="w-full text-left">Logout</button>
				</form>
			</DropdownItem>
		</Dropdown>
		<!-- <NavUl>
			<NavLi class="cursor-pointer">Login</NavLi>
			<Dropdown placement="bottom" triggeredBy="#avatar-menu" class="w-44 z-20">
				<DropdownItem href="/login">Login</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/register">Register</DropdownItem>
			</Dropdown>
		</NavUl>
		<NavHamburger /> -->
	</Navbar>
	<div class="overflow-scroll px-16 pb-16">
		<slot />
	</div>
</div>
