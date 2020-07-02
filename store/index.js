import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	schoolCode:"",
	baseUrl:"",
	imgUrl:"",
	baseInfoId:"",
	account:"",
	state: {
		/**
		 * 是否需要强制登录
		 */
		hasLogin: false,
		userName: ""
	},
	mutations: {
		login(state, userName) {
			state.userName = userName;
			state.hasLogin = true;
		},
		logout(state) {
			uni.removeStorageSync("loginTimeOut");
			uni.removeStorageSync('userInfo');
			uni.removeStorageSync('baseInfo');
			uni.removeStorageSync('studentInfo');
			uni.removeStorageSync('messageReceiver');
			uni.removeStorageSync('courseNotice');
			uni.removeStorageSync('examResult');
			uni.removeStorageSync('teachPlan');
			uni.removeStorageSync('planCourse');
			uni.removeStorageSync('planCourse');
			uni.removeStorageSync('token');
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store
