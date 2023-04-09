import Vue from 'vue'
import Vuex, {
	Store
} from 'vuex'

Vue.use(Vuex)
//状态管理
export default new Store({
	state: {
		apiRoot: uni.getStorageSync('apiRoot') || "http://192.168.1.10:3002",
		userInfo: '',
	},
	mutations: {
		changeState(state, {
			stateName,
			val
		}) {
			console.log(stateName, val);
			state[stateName] = val
		}
	},
	getters: {
		logged: (state) => state.userInfo ? true : false,
	},
	actions: {}
})