<script lang="ts">
	import Button from './ui/button/button.svelte';
	import InstallButton from './install-button.svelte';
	import Logo from './logo.svelte';
</script>

<div class="flex h-full flex-col justify-between">
	<div class="mt-4 flex w-full justify-center">
		<Logo className="w-24 h-24" />
	</div>

	<div class="flex flex-col space-y-4">
		<div class="grow">
			<div class="text-sm font-bold text-gray-400">Fase 0</div>
			<Button
				class="flex min-h-16 w-full flex-col text-xl"
				href="https://www.manualedivololibero.com/default.asp"
			>
				Studia!
				<div class="text-sm font-normal">Leggi il manuale</div>
			</Button>
		</div>
		<div class="grow">
			<div class="text-sm font-bold text-gray-400">Fase I</div>
			<Button class="flex min-h-16 w-full flex-col text-xl" href="/sections">
				Quiz per argomento
				<div class="text-sm font-normal">Quiz per ogni sezione</div>
			</Button>
		</div>
		<div class="grow">
			<div class="text-sm font-bold text-gray-400">Fase II</div>
			<Button class="flex min-h-16 w-full flex-col text-xl" href="/preparation">
				Preparazione esame
				<div class="text-sm font-normal">Focus sugli errori</div>
			</Button>
		</div>
		<div class="grow">
			<div class="text-sm font-bold text-gray-400">Fase III</div>
			<Button class="flex min-h-16 w-full flex-col text-xl" href="/exam">
				Simulazione esame
				<div class="text-sm font-normal">Simula l'esame</div>
			</Button>
		</div>
	</div>

	<div class="flex flex-col">
		<InstallButton />
		<Button class="min-h-16 text-xl" href="/settings">Impostazioni</Button>
	</div>
</div>
