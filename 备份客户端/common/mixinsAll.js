export default {
	data() {
		return {

		}
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo
		}

	},

	methods: {
		apiRoot(url) {
			return this.$store.state.apiRoot + `/${url}`
		},
		previewImg(urls, index) {
			uni.previewImage({
				urls: urls,
				current: index
			})
		},
		//校验登录状态
		checkLoginStatus() {
			if (!this.userInfo) {
				uni.showModal({
					title: "登录提示",
					content: '检测到你还没有登录,是否现在去登录?',
					success: (res) => {
						if (res.confirm) {
							uni.switchTab({
								url: '/pages/mine'
							})
						}
					}
				})
			}
		}
	}
}