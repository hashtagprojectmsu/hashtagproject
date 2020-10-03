<template>
	<div id="app">
		<!-- Navbar -->
		<div class="w-100 bg-white border-bottom border-primary">
			<Navbar class="w-100" />
		</div>

		<!-- Display the router Stuff -->
		<router-view />

		<!-- Footer -->
		<Footer />
	</div>
</template>

<script>
	// [IMPORT] Personal //
	import Navbar from './components/nav/Navbar'
	import Footer from './components/nav/Footer'

	// [EXPORT] //
	export default {
		name: 'App',
		components: {
			Navbar,
			Footer
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
