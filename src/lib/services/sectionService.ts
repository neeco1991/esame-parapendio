import { browser } from '$app/environment';
import type { Section } from '$lib/entities/sections';

type CompletedSections = Record<Section, string>;

export const isCompleted = (section: Section): boolean => {
	if (!browser) {
		return false;
	}
	const rawStore = localStorage.getItem('sections');
	const store: CompletedSections = rawStore ? JSON.parse(rawStore) : {};
	return store[section] === 'true';
};

export const complete = (section: Section) => {
	if (!browser) {
		return;
	}
	const rawStore = localStorage.getItem('sections');
	const store: CompletedSections = rawStore ? JSON.parse(rawStore) : {};
	store[section] = 'true';
	localStorage.setItem('sections', JSON.stringify(store));
};

export const resetSections = () => {
	if (!browser) {
		return;
	}
	localStorage.setItem('sections', JSON.stringify({}));
};
