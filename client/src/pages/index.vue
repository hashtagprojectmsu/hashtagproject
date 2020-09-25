<template>
	<div class="container">
		<div class="row mt-3">
			<div class="col">
				<!-- Get Hashtag from user -->
				<input
					type="text"
					placeholder="Type a hashtag here"
					class="form-control"
				>
			</div>
		</div>

		<!-- Chart Row -->
		<div class="row mt-3">
			<div class="col">
				<div class="d-flex flex-wrap">
					<div class="w-100"><h4 class="text-primary">All Tweets</h4></div>
					<Line-chart
						v-if="!loading"
						:labels="labels"
						:data="values"
						class="card card-body flex-card flex-wrap"
						style="height: 300px;"
					/>
				</div>
			</div>
		</div>

		<!-- Latest Tweet Row -->
		<div class="row mt-3">
			<div class="col">
				<div class="card card-body"><h3>Latest Tweet</h3></div>
			</div>
		</div>
	</div>
</template>

<script>
	// [IMPORT] Personal //
	import LineChart from '../components/chartjs/LineChart'
	import PageService from '../services/pageService'

	// [EXPORT] //
	export default {
		components: {
			LineChart,
		},

		data() {
			return {
				loading: true,
				returned: [],
				labels: [],
				values: [],
			}
		},

		created: async function() {
			// [RETURN DATA]
			this.returned = await PageService.s_home()
			
			// Map Data //
			this.labels = this.returned.map(d => d.time)
			this.values = this.returned.map(d => d.count)

			// Disable Loading
			this.loading = false

			console.log(this.returned)
			console.log(this.labels)
			console.log(this.values)
		},
	}
</script>