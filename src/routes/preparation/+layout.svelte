<script lang="ts">
	import Timer from '$lib/components/timer.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex items-center justify-between">
	<Button href="/">
		<ArrowLeft class="h-[1.2rem] w-[1.2rem] " />
	</Button>
</div>

{@render children()}
