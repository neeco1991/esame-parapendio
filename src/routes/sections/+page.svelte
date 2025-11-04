<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { numberOfQuestionsBySection, type Section } from '$lib/entities/sections';
	import { onMount } from 'svelte';
	import { sectionStore } from './state.svelte';
	import { isCompleted } from '$lib/services/sectionService';
	import Check from '@lucide/svelte/icons/check';

	const store = sectionStore();
	onMount(() => {
		store.reset();
	});
</script>

<svelte:head>
	<title>Sezioni | Esame Parapendio</title>
	<meta name="description" content="Quiz per argomento" />
</svelte:head>

<div class="flex h-full flex-col justify-end space-y-2">
	{#each Object.keys(numberOfQuestionsBySection) as section, i}
		<Button href={'/sections/' + (i + 1).toString()} class="min-h-16">
			<div class="relative flex w-full justify-between">
				<span>{i + 1}.</span>
				<span class="pointer-events-none absolute w-full text-center">{section}</span>
				<span>
					{#if isCompleted(section as Section)}
						<Check class="h-[1.2rem] w-[1.2rem] text-green-600" />
					{/if}
				</span>
			</div>
		</Button>
	{/each}
</div>
