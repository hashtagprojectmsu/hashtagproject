<template>
	<div class="container">
		<div class="row">
			<!-- Get Hashtag from user -->
			<input type="text" name="" placeholder="Type a hashtag here" class="form-control my-3">
		</div>

		<div class="row">
			<div class="col-4">
				<h5>#hack</h5>
				<Line-chart
					:chartData="fakeData"
					class="card card-body"
					style="height: 300px;"
				/>
			</div>

			<div class="col-4">
				<h5>#databreach</h5>
				<Line-chart
					:chartData="fakeData"
					class="card card-body"
					style="height: 300px;"
				/>
			</div>

			<div class="col-4">
				#malware
				<Line-chart
					:chartData="fakeData"
					class="card card-body"
					style="height: 300px;"
				/>
			</div>

			<div class="col-4">
				#malware
				<Line-chart
					:chartData="fakeData"
					class="card card-body"
					style="height: 300px;"
				/>
			</div>
		
			<div class="col-4">
				#phishing
				<Line-chart
					:chartData="fakeData"
					class="card card-body"
					style="height: 300px;"
				/>
			</div>
		</div>
	</div>
</template>

<script>
 // [IMPORT] Personal //
  import LineChart from '../components/chartjs/LineChart'
// [EXPORT] //
  export default {
	components: {
		LineChart,
	},

	data() {
		return {
			fakeData: [
				{ label: 'data', value: 23 },
				{ label: 'data', value: 12 },
				{ label: 'data', value: 76 },
				{ label: 'data', value: 90 },
				{ label: 'data', value: 80 },
				{ label: 'data', value: 58 }
			]
		}
	},
  }
</script>