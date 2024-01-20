import { DIFFICULTY, SCREEN } from './gameStatus'

export const store = $state({
	screen: SCREEN.MENU,
	difficulty: DIFFICULTY.MEDIUM,
	comparativeScreen: SCREEN.MENU,
	get direction() {
		const direction = store.screen <= store.comparativeScreen ? -1 : 1
		store.comparativeScreen = store.screen
		return direction
	},
})
