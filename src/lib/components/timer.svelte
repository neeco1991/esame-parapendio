<script lang="ts">
	let {
		durationInMinutes = 30,
		onComplete,
		allQuestionsDone
	} = $props<{
		durationInMinutes?: number;
		onComplete: () => void;
		allQuestionsDone: boolean;
	}>();

	let secondsRemaining = $state(durationInMinutes * 60);

	let minutes = $derived(Math.floor(secondsRemaining / 60));
	let seconds = $derived(secondsRemaining % 60);

	let displayMinutes = $derived(String(minutes).padStart(2, '0'));
	let displaySeconds = $derived(String(seconds).padStart(2, '0'));

	$effect.root(() => {
		const intervalId = setInterval(() => {
			secondsRemaining -= 1;

			if (secondsRemaining <= 0) {
				clearInterval(intervalId);
				onComplete();
			}
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	});
</script>

<div class="timer-display">
	{#if allQuestionsDone}
		<span>--</span>
	{:else if secondsRemaining > 0}
		<span>{displayMinutes}:{displaySeconds}</span>
	{:else}
		<span>Tempo scaduto!</span>
	{/if}
</div>

<style>
	.timer-display {
		font-size: 2rem;
		font-family: monospace;
		font-weight: bold;
		color: #333;
	}
</style>
