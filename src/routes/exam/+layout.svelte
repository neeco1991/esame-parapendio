<script lang="ts">
	import Timer from '$lib/components/timer.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import type { Snippet } from 'svelte';
	import { examStore } from './state.svelte';

	let { children }: { children: Snippet } = $props();

	const exam = examStore();
</script>

<div class="relative flex items-center justify-between">
	<Button href="/">
		<ArrowLeft class="h-[1.2rem] w-[1.2rem]" />
	</Button>

	<div class="pointer-events-none absolute m-auto w-full text-center">
		{#if !exam.isEnded}
			{(exam.questionIndex + 1).toString()} / 30
		{/if}
	</div>

	<Timer
		durationInMinutes={30}
		onComplete={() => exam.setEnded(true)}
		allQuestionsDone={exam.questionIndex == 30}
	/>
</div>

{@render children()}
