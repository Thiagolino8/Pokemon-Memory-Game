import { derived, get, writable } from 'svelte/store'
import { DIFFICULTY, SCREEN } from './gameStatus'

export const screen = writable<SCREEN>(SCREEN.MENU)

export const difficulty = writable<DIFFICULTY>(DIFFICULTY.MEDIUM)

let comparativeScreen: SCREEN = get(screen)

export const direction = derived<typeof screen, 1 | -1>(screen, ($screen) => {
	const direction = $screen <= comparativeScreen ? -1 : 1
	comparativeScreen = $screen
	return direction
})
