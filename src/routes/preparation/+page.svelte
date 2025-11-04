<script lang="ts">
	import QuestionBox from '$lib/components/question-box.svelte';
	import {
		getMissedQuestions,
		MISSED_ANSWER_PROBABILITY,
		getQuestions,
		type Question
	} from '$lib/entities/questions';
	import { getRandomElement } from '$lib/utils';
	import { onMount } from 'svelte';

	const pickQuestion = (): Question => {
		if (Math.random() < MISSED_ANSWER_PROBABILITY) {
			const missedQuestions = getMissedQuestions();
			if (missedQuestions.length > 0) {
				return getRandomElement(missedQuestions);
			}
		}

		return getRandomElement(getQuestions());
	};

	let question = $state(pickQuestion());

	onMount(() => {});
</script>

<svelte:head>
	<title>Preparazione esame | Esame Parapendio</title>
	<meta name="description" content="Focus sugli errori" />
</svelte:head>

<QuestionBox
	onComplete={() => {
		question = pickQuestion();
	}}
	{question}
/>
