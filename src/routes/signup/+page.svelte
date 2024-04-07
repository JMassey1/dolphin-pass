<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input type="text" name="username" id="username" />
	<br />
	<br />
	<br />
	<br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<button>Continue</button>
	{#if form?.type}<p>{form.type}</p>{/if}
</form>
