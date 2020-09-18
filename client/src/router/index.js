// [IMPORT] //
import Vue from 'vue'
import Router from 'vue-router'

// [IMPORT] Personal //
import home from '../pages/index'
import NotFound from '../pages/404'

// [USE] //
Vue.use(Router)

// [EXPORT] //
export default new Router ({
	routes: [
		{
			path: '/',
			name: '/',
			component: home,
			meta: {
				auth: true,
				title: 'Hashtag Project'
			}
		},
		{
			path: '/**',
			name: '404',
			component: NotFound,
			meta: {
				auth: true,
				title: '404 Not Found..'
			},
		}
	]
})