<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { submitAnswer, type Question } from '$lib/entities/questions';

	let { onComplete, question }: { onComplete: Function; question: Question } = $props();

	let selectedAnswerIndex: number | null = null;
	let isAnswered = $state(false);
	let isCorrect = $state(false);
	let hasWaited = $state(false);

	$effect(() => {
		if (question) {
			isAnswered = false;
			isCorrect = false;
			hasWaited = false;
			selectedAnswerIndex = null;
		}
	});

	function handleAnswer(index: 0 | 1 | 2) {
		if (isAnswered || !question) return;

		isAnswered = true;
		selectedAnswerIndex = index;
		const result = submitAnswer(question, index);
		isCorrect = result;

		if (result) {
			setTimeout(() => onComplete(true), 1000);
		}
	}

	function handleProceed() {
		if (!hasWaited) {
			hasWaited = true;
			return;
		}
		if (isAnswered && !isCorrect) {
			onComplete(false);
		}
	}

	function getButtonClass(index: number): string {
		if (!isAnswered) {
			return '';
		}

		if (index === question?.correct_answer_index) {
			return 'text-green-500 hover:text-green-600 ';
		}

		if (index === selectedAnswerIndex) {
			return 'text-red-500 hover:text-red-600 ';
		}

		return 'opacity-50';
	}
</script>

<div
	class="h-full text-center"
	onclick={handleProceed}
	onkeydown={(e) => e.key === 'Enter' && handleProceed()}
	role="button"
	tabindex="0"
>
	{#if question}
		<div class="flex h-full flex-col justify-between">
			<div>
				<div class="flex justify-center text-sm text-muted-foreground">
					{question.section}
				</div>
				<div class="mb-2 flex justify-center text-sm text-muted-foreground">
					<span>{question.id}</span>
				</div>

				<h2 class="mb-4 text-2xl leading-tight font-semibold">
					{question.text}
				</h2>
			</div>

			<div>
				<div class="flex flex-col space-y-2">
					{#each question.answers as answerText, index (question.id + index)}
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
							Risposta sbagliata
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
