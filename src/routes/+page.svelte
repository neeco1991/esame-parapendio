<script lang="ts">
	import { browser } from '$app/environment';
	import Home from '$lib/components/home.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';

	let unlocked = getUnlocked();
	let guess = '';

	const HARDCODED_PASSWORD = 'asdfivlpwd'; //

	function checkPassword() {
		if (guess === HARDCODED_PASSWORD) {
			localStorage.setItem('unlocked', 'true');
			unlocked = true;
		} else {
			alert('Wrong password!');
			guess = '';
		}
	}

	function getUnlocked() {
		if (!browser) {
			return false;
		}

		return localStorage.getItem('unlocked') === 'true';
	}

	onMount(() => {
		console.log(unlocked);
	});
</script>

{#if unlocked}
	<Home />
{:else}
	<main class="gate">
		<h2>Inserisci password</h2>
		<form on:submit|preventDefault={checkPassword}>
			<input type="password" bind:value={guess} placeholder="Password" />
			<Button type="submit">Entra</Button>
		</form>
	</main>
{/if}
