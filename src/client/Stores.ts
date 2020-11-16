import { writable } from 'svelte/store'
import type { AlbumRequest } from './AlbumRequest'
import { TimePeriod } from './TimePeriod'

interface AppState {
	albumRequest: AlbumRequest,
	formSent: boolean
}

export const appState = writable<AppState>(
	{
		albumRequest: {
			user: undefined,
			minPlayCount: 10,
			period: TimePeriod.OVERALL
		},

		formSent: false
	}
)
