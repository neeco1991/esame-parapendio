<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { pickQuestion, submitAnswer, type Question } from '$lib/entities/questions';

	let currentQuestion: Question | undefined;
	let selectedAnswerIndex: number | null = null;
	let isAnswered = false;
	let isCorrect = false;
	let hasWaited = false;

	function loadNextQuestion() {
		isAnswered = false;
		isCorrect = false;
		hasWaited = false;
		selectedAnswerIndex = null;
		currentQuestion = pickQuestion();
	}

	function handleAnswer(index: 0 | 1 | 2) {
		if (isAnswered || !currentQuestion) return;

		isAnswered = true;
		selectedAnswerIndex = index;
		const result = submitAnswer(currentQuestion, index);
		isCorrect = result;

		if (result) {
			setTimeout(loadNextQuestion, 1000);
		}
	}

	function handleProceed() {
		console.log(isAnswered, !isCorrect);
		if (!hasWaited) {
			hasWaited = true;
			return;
		}
		if (isAnswered && !isCorrect) {
			loadNextQuestion();
		}
	}

	function getButtonClass(index: number): string {
		if (!isAnswered) {
			return '';
		}

		if (index === currentQuestion?.correct_answer_index) {
			console.log('correct: ' + index);
			return 'text-green-500 hover:text-green-600 ';
		}

		if (index === selectedAnswerIndex) {
			console.log('wrong: ' + index);
			return 'text-red-500 hover:text-red-600 ';
		}

		return 'opacity-50';
	}

	onMount(() => {
		loadNextQuestion();
	});
</script>

<div
	class="h-full text-center"
	onclick={handleProceed}
	onkeydown={(e) => e.key === 'Enter' && handleProceed()}
	role="button"
	tabindex="0"
>
	{#if currentQuestion}
		<div class="flex h-full flex-col justify-between">
			<div>
				<div class="flex justify-center text-sm text-muted-foreground">
					{currentQuestion.section}
				</div>
				<div class="mb-2 flex justify-center text-sm text-muted-foreground">
					<span>{currentQuestion.id}</span>
				</div>

				<h2 class="mb-4 text-2xl leading-tight font-semibold">
					{currentQuestion.text}
				</h2>
			</div>

			<div>
				<div class="flex flex-col space-y-2">
					{#each currentQuestion.answers as answerText, index (currentQuestion.id + index)}
						<Button
							variant="outline"
							class={cn(
								'h-auto min-h-10 justify-start text-left text-xl whitespace-normal',
								getButtonClass(index)
							)}
							disabled={isAnswered}
							onclick={() => handleAnswer(index as 0 | 1 | 2)}
						>
							{answerText}
						</Button>
					{/each}
				</div>

				<div class="mt-4 h-8">
					{#if isAnswered && !isCorrect}
						<p class="animate-pulse text-center text-xl text-muted-foreground">
							Risposta sbagliata. Clicca un'altra volta per continuare.
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
