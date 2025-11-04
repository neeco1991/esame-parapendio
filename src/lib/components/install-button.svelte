<script lang="ts">
	import { pwa } from '$lib/stores/pwa';
	import Button from './ui/button/button.svelte';
</script>

{#if $pwa.canInstall}
	<Button class="min-h-16 text-xl" onclick={$pwa.install}>Installa</Button>
{/if}
