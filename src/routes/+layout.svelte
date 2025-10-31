<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="dark" />

<div class="mx-auto flex h-screen max-w-7xl flex-col p-2 sm:px-6 lg:px-8">
	{@render children()}
</div>
