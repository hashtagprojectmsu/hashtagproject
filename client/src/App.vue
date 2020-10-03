<template>
	<div id="app">
		<!-- Navbar -->
		<div class="w-100 bg-white border-bottom border-primary">
			<div class="container">
				<div class="row">
					<navbar class="w-100" />
				</div>
			</div>
		</div>

		<!-- Display the router Stuff -->
		<router-view />
	</div>
</template>

<script>
	// [IMPORT] Personal //
	import navbar from './components/nav/navbar'

	// [EXPORT] //
	export default {
		name: 'App',
		components: {
			navbar
		}
	}
</script>

<style>
	#app {
		font-family: minion-pro Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
