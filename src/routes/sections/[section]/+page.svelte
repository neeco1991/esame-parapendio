<script lang="ts">
	import { getQuestions, type Question } from '$lib/entities/questions';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { sectionStore } from '../state.svelte';
	import QuestionBox from '$lib/components/question-box.svelte';
	import { Button } from '$lib/components/ui/button';
	import { complete } from '$lib/services/sectionService';
	import { numberOfQuestionsBySection } from '$lib/entities/sections';

	let sectionQuestions: Question[] = $state([]);
	let { data }: PageProps = $props();
	let completed = $state(false);

	const store = sectionStore();

	onMount(() => {
		sectionQuestions = getQuestions().filter((q) => q.id.startsWith(data.section));
		store.reset();
		store.setNumberOfQuestions(sectionQuestions.length);
	});

	const sectionName = Object.keys(numberOfQuestionsBySection)[parseInt(data.section) - 1];
</script>

<svelte:head>
	<title>{sectionName} | Esame Parapendio</title>
	<meta name="description" content="Quiz per la sezione {sectionName}" />
</svelte:head>

{#if !completed}
	<QuestionBox
		onComplete={() => {
			store.incrementQuestionIndex();
			if (store.questionIndex == store.numberOfQuestions) {
				completed = true;
				complete(sectionQuestions[0].section);
			}
		}}
		question={sectionQuestions[store.questionIndex]}
	/>
{:else}
	<div class="flex h-full flex-col items-center justify-center space-y-16 text-3xl">
		<div class="text-center">Sezione completata</div>
		<Button href="/sections">Torna alle sezioni</Button>
	</div>
{/if}
