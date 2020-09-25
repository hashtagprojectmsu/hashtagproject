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
				<div class="d-flex flex-wrap p-3 bg-white border rounded ">
					<!-- All Hashtags -->
					<div class="w-100 m-1 card card-body flex-card flex-wrap">
						<h4 class="">#hack, #hacked, #malwar</h4>
						<Line-chart
							v-if="!loading"
							:labels="labels"
							:data="values"
							class="w-100"
							style="height: 350px;"
						/>
					</div>

					<!-- #Hack -->
					<div class="m-1 card card-body flex-card flex-wrap" style="max-width: 350px;">
						<h4 class="">#hack</h4>
						<Line-chart
							v-if="!loading"
							:labels="labels"
							:data="values"
							class="w-100"
							style="height: 350px;"
						/>
					</div>
					
					<!-- #hacked -->
					<div class="m-1 card card-body flex-card flex-wrap" style="max-width: 350px;">
						<h4 class="">#hacked</h4>
						<Line-chart
							v-if="!loading"
							:labels="labels"
							:data="values"
							class="w-100"
							style="height: 350px;"
						/>
					</div>

					<!-- #malware -->
					<div class="m-1 card card-body flex-card flex-wrap" style="max-width: 350px;">
						<h4 class="">#malware</h4>
						<Line-chart
							v-if="!loading"
							:labels="labels"
							:data="values"
							class="w-100"
							style="height: 350px;"
						/>
					</div>
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

			// Disable Loading //
			this.loading = false

			// [LOG] //
			console.log(this.returned)
		},
	}
</script>