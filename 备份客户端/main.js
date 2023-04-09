import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from 'uview-ui'
import c from '@/common/commonApi.js'
import mixinsAll from '@/common/mixinsAll.js'
import _, {
	forIn
} from 'lodash';
import search from '@/components/search/search.vue';
import lostBrief from '@/components/lostBrief/lostBrief.vue';
import tab from '@/components/tab/tab.vue';
import mineItem from '@/components/mineItem/mineItem.vue';
import comment from '@/components/comment/comment.vue';
import dot from '@/components/mix/dot.vue';
import store from '@/common/store.js'
import Vuex from 'vuex'



Vue.config.productionTip = false
App.mpType = 'app'
// 如此配置即可
Vue.use(uView)
Vue.mixin(mixinsAll)
uni.$u.config.unit = 'rpx'
Vue.use(Vuex)
Vue.component("search", search)
Vue.component("lostBrief", lostBrief)
Vue.component("lostBrief", lostBrief)
Vue.component("mineItem", mineItem)
Vue.component("comment", comment)
Vue.component("dot", dot)

Vue.prototype.$store = store
for (let api in c) {
	Vue.prototype[api] = c[api]
}


try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif