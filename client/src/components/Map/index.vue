<template>
	<div class="vue-world-map">
		<Map v-if="map == 'world'" />
		<US v-if="map === 'US'" />
	</div>
</template>

<script>
	// [IMPORT] //
	import chroma from 'chroma-js'

	// [IMPORT] Personal //
	import Map from './Map'
	import US from './countries/US'
	import { getDynamicMapCss, getBaseCss, getCombinedCssString, } from './dynamic-map-css'

	// [EXPORT] //
	export default {
		components: {
			Map,
			US,
		},

		props: {
			map: {
			type: String,
			default: 'world'
			},
			lowColor: {
				type: String,
				default: '#fde2e2',
			},
			highColor: {
				type: String,
				default: '#d83737',
			},
			countryData: {
				type: Object,
				required: true,
			},
			defaultCountryFillColor: {
				type: String,
				default: '#dadada',
			},
			countryStrokeColor: {
				type: String,
				default: 'black',
			},
		},

		data() {
			return {
				node: document.createElement('style'),
				chromaScale: chroma.scale([this.$props.lowColor, this.$props.highColor]),
			}
		},

		mounted() {
			document.body.appendChild(this.$data.node)
			this.renderMapCSS()
		},

		methods: {
			renderMapCSS() {
				const baseCss = getBaseCss(this.$props)
				const dynamicMapCss = getDynamicMapCss(this.$props.countryData, this.chromaScale)
				this.$data.node.innerHTML = getCombinedCssString(baseCss, dynamicMapCss)
			},
		},

		watch: {
			countryData() {
				this.renderMapCSS()
			},
		},
	}
</script>

<style>
	.vue-world-map { height: 100%; }

	#map-svg { height: 100%; }
</style>