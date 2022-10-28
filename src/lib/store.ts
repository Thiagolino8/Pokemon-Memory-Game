import { DIFFICULTY, SCREEN } from './gameStatus'
import { derived, get, writable, type Writable } from 'svelte/store'

export const screen = writable<SCREEN>(SCREEN.MENU)

export const difficulty = writable<DIFFICULTY>(DIFFICULTY.MEDIUM)

let comparativeScreen: SCREEN = get(screen)

export const direction = derived<Writable<SCREEN>, 1 | -1>(screen, ($screen) => {
	const direction = $screen <= comparativeScreen ? -1 : 1
	comparativeScreen = $screen
	return direction
})
