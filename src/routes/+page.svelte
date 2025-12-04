<script lang="ts">
	import Home from '$lib/components/home.svelte';
	import QuestionBox from '$lib/components/question-box.svelte';
	import ThemeButton from '$lib/components/theme/theme-button.svelte';
</script>

<svelte:head>
	<title>Homepage | Esame Parapendio</title>
	<meta
		name="description"
		content="L'app per la preparazione all'esame di parapendio e/o deltaplano"
	/>
</svelte:head>

<!-- <div class="flex w-full justify-end">
	<ThemeButton />
</div>
<div class="mt-2 h-full">
	<QuestionBox />
</div> -->

<Home />
