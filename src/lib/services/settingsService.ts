import { browser } from '$app/environment';

type SettingsKeys = 'paragliding' | 'delta';

type Settings = Record<SettingsKeys, string>;

const defaultSettings: Settings = {
	paragliding: 'true',
	delta: 'false'
};

export const getSettings = (): Settings => {
	if (!browser) {
		return defaultSettings;
	}
	const rawStore = localStorage.getItem('settings');
	return rawStore ? JSON.parse(rawStore) : defaultSettings;
};

export const setSettings = (key: SettingsKeys, value: boolean) => {
	if (!browser) {
		return;
	}
	const settings = getSettings();
	settings[key] = value.toString();
	localStorage.setItem('settings', JSON.stringify(settings));
};

export const resetSettings = () => {
	if (!browser) {
		return;
	}
	localStorage.setItem('settings', JSON.stringify(defaultSettings));
};
