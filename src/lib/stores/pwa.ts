import { writable } from 'svelte/store';

export const pwa = writable<{ canInstall: boolean; install: () => void }>({
	canInstall: false,
	install: () => {}
});

if (typeof window !== 'undefined') {
	window.addEventListener('beforeinstallprompt', (e) => {
		console.log('beforeinstallprompt event fired');
		e.preventDefault();
		const deferredPrompt = e;
		pwa.set({
			canInstall: true,
			install: () => {
				deferredPrompt.prompt();
			}
		});
	});

	window.addEventListener('appinstalled', () => {
		console.log('appinstalled event fired');
		pwa.set({
			canInstall: false,
			install: () => {}
		});
	});
}
