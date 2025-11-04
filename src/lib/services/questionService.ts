import { browser } from '$app/environment';

type ErrorMap = Record<string, string>;

export const getStoredAnswers = (): ErrorMap => {
	if (!browser) {
		return {};
	}
	const rawStore = localStorage.getItem('answers');
	return rawStore ? JSON.parse(rawStore) : {};
};

export const saveStoredAnswers = (store: ErrorMap) => {
	if (!browser) {
		return;
	}
	localStorage.setItem('answers', JSON.stringify(store));
};

export const resetQuestions = () => {
	if (!browser) {
		return;
	}
	localStorage.setItem('answers', JSON.stringify({}));
};
