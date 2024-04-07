<script lang="ts">
	import '../app.pcss';
	import { Navbar, NavBrand, Button, NavHamburger, Dropdown, DropdownItem, DropdownDivider, Avatar, DropdownHeader } from 'flowbite-svelte';

	let username: string = "Jordan Massey";
	let email: string = "jmmhqw@umsystem.edu";
</script>

<div class="relative px-8">
	<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top -0 start-0 border-b" fluid={true} color="blue">
		<NavBrand href="/">
			<img src="dolphin_logo.png" alt="Dolphin logo" class="me-3 h-6 sm:h-9" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">DolphinPass</span>
		</NavBrand>
		<div class="flex items-center md:order-2">
			<Button size="sm">Get Started</Button>
			<Avatar id="avatar-menu" src="pfp.jpg" alt="User avatar" class="cursor-pointer" />
			<!-- TODO: Switch Avatar to call to action button to register if not logged in -->
			<NavHamburger />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu" class="w-44 z-20">
			<DropdownHeader>
				<span class="block text-sm">{username}</span>
				<span class="block truncate text-sm font-medium">{email}</span>
			</DropdownHeader>
			<DropdownItem href="/login">Login</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="/register">Register</DropdownItem>
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
	<div class="overflow-scroll pb-16 px-16">
		<slot />
	</div>
</div>

