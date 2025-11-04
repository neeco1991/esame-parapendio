<script lang="ts">
	import Timer from '$lib/components/timer.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import type { Snippet } from 'svelte';
	import { sectionStore } from './state.svelte';

	let { children }: { children: Snippet } = $props();

	const store = sectionStore();
</script>

<div class="relative flex items-center justify-between">
	<Button href="/">
		<ArrowLeft class="h-[1.2rem] w-[1.2rem] " />
	</Button>

	{#if store.numberOfQuestions > 0 && store.numberOfQuestions !== store.questionIndex}
		<div class="pointer-events-none absolute m-auto w-full text-center">
			{(store.questionIndex + 1).toString()} / {store.numberOfQuestions}
		</div>
	{/if}
</div>

{@render children()}
