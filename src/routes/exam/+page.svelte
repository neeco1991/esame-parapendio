<script lang="ts">
	import QuestionBox from '$lib/components/question-box.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { getQuestions, type Question } from '$lib/entities/questions';
	import { numberOfQuestionsBySection, pointsBySection } from '$lib/entities/sections';
	import { getRandomElement, shuffleArray } from '$lib/utils';
	import { onMount } from 'svelte';
	import { examStore } from './state.svelte';

	let examQuestions: Question[] = $state([]);
	let points = $state(0);

	const exam = examStore();

	onMount(() => {
		exam.reset();
		for (const [section, numberOfQuestions] of Object.entries(numberOfQuestionsBySection)) {
			let remainingQuestionsToAdd = numberOfQuestions;
			const sectionQuestions = getQuestions().filter((q) => q.section === section);
			while (remainingQuestionsToAdd > 0) {
				let question: Question | undefined = undefined;
				while (!question) {
					question = getRandomElement(sectionQuestions);
					if (examQuestions.some((q) => q.id === (question as Question).id)) {
						question = undefined;
					}
				}

				examQuestions.push(question);
				remainingQuestionsToAdd--;
			}
		}

		shuffleArray(examQuestions);
	});

	const renderResult = () => {
		if (points < 80) {
			return 'Bocciato!';
		} else if (points < 85) {
			return 'Esame orale!';
		} else {
			return 'Promosso!';
		}
	};
</script>

<svelte:head>
	<title>Simulazione esame | Esame Parapendio</title>
	<meta name="description" content="Simula l'esame di parapendio e/o deltaplano" />
</svelte:head>

{#if !exam.isEnded}
	<QuestionBox
		onComplete={(correct: boolean) => {
			if (correct) {
				points += pointsBySection[examQuestions[exam.questionIndex].section];
			}
			exam.incrementQuestionIndex();
			if (exam.questionIndex == examQuestions.length) {
				exam.setEnded(true);
			}
		}}
		question={examQuestions[exam.questionIndex]}
	/>
{:else}
	<div class="flex h-full flex-col items-center justify-center space-y-16 text-3xl">
		<div class="text-center">
			Hai ottenuto {points} punti. {renderResult()}
		</div>
		<Button href="/">Torna alla home</Button>
	</div>
{/if}
