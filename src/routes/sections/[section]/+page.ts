import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	if (params.section && parseInt(params.section) > 0 && parseInt(params.section) < 10) {
		return { section: params.section };
	}

	error(404, 'Not found');
};
