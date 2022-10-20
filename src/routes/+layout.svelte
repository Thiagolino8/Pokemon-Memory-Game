<slot />

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	* {
		@apply box-border m-0 p-0;
	}

	body {
		@apply flex flex-row justify-center items-start h-screen;
	}
</style>
