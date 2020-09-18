<template>
	<div id="app">
		<div class="container">
			<div class="row">
				<h1 class="m-1 text-dark">
					The Has<i style="color: #58c6c2">#</i>tag Project
				</h1>
			</div>
		</div>

		<!-- Display the router Stuff -->
		<router-view :key="routerViewKey" />
	</div>
</template>

<script>
	// [EXPORT] //
	export default {
		name: 'App',
	}
	</script>

	<style>
	#app {
		font-family: minion-pro Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
