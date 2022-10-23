import { DIFFICULTY } from './gameStatus';
import { writable } from 'svelte/store'

export const screen = writable({
	menu: true,
	game: false,
	victory: false,
})

export const difficulty = writable(DIFFICULTY.MEDIUM)