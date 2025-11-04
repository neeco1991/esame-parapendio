<script>
	import ThemeButton from '$lib/components/theme/theme-button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { resetQuestions } from '$lib/services/questionService';
	import { resetSections } from '$lib/services/sectionService';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { getSettings, resetSettings, setSettings } from '$lib/services/settingsService';

	let open = $state(false);
	let paraglidingActive = $state(getSettings().paragliding === 'true');
	let deltaActive = $state(getSettings().delta === 'true');

	$effect(() => {
		setSettings('paragliding', paraglidingActive);
		setSettings('delta', deltaActive);
	});
</script>

<div class="flex flex-col items-start space-y-4">
	<div class="flex items-center justify-center space-x-4 font-semibold">
		<div>Tema:</div>
		<ThemeButton />
	</div>

	<div class="flex items-center justify-center space-x-4 font-semibold">
		<div>Domande parapendio:</div>
		<Switch bind:checked={paraglidingActive} />
	</div>

	<div class="flex items-center justify-center space-x-4 font-semibold">
		<div>Domande deltaplano:</div>
		<Switch bind:checked={deltaActive} />
	</div>

	<div class="flex flex-col font-semibold">
		<AlertDialog.Root bind:open>
			<AlertDialog.Trigger
				class="4 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary p-4 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-xs transition-all outline-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
				>Elimina tutti i dati</AlertDialog.Trigger
			>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Sei sicuro?</AlertDialog.Title>
					<AlertDialog.Description>
						Stai reimpostando l'applicazione. Tutti i dati andranno persi.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancella</AlertDialog.Cancel>
					<AlertDialog.Action
						onclick={() => {
							resetQuestions();
							resetSections();
							resetSettings();
							paraglidingActive = getSettings().paragliding === 'true';
							deltaActive = getSettings().delta === 'true';
							open = false;
						}}>Continua</AlertDialog.Action
					>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	</div>
</div>
