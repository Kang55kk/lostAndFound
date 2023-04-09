<template>
	<view class="page">
		<view class="tabs">
			<tab :tabs="['寻主', '寻物']" @change="changeTab($event)"></tab>
		</view>
		<view class="itemsList" style="margin-bottom: 50px;" v-if="userInfo">
			<lostBrief v-for="(lose,index) in loseListShow" :key="index" :lose="lose" ref="lostBrief"></lostBrief>
		</view>
		<u-button @click="toLogIn" type="primary" shape="circle" text="登 录" v-if="!$store.getters.logged" style="width: 70%;margin-top: 40vh;"></u-button>
	</view>
</template>

<script>
	import lostBrief from '@/components/lostBrief/lostBrief.vue';
	import tab from '@/components/tab/tab.vue';
	export default {
		components: {
			tab,
			lostBrief,
		},

		data() {
			return {
				loseList: [],
				type: '寻主'
			}
		},
		computed: {
			loseListShow() {
				return this.loseList?.filter(o => o.type == this.type)
			}
		},
		onShow() {
			if (this.userInfo) {
				this.getMypublish()
			}
		},
		methods: {
			toLogIn(){
				uni.switchTab({
					url:'/pages/mine'
				})
			},
			changeTab(index) {
				this.type = (index ? '寻物' : '寻主')
			},
			getMypublish() {
				const data = {
					item: 'publish',
					userId: this.userInfo._id,
				}
				uni.request({
					url: this.apiRoot`myPublish`,
					data,
					success: (res) => {
						this.loseList = res.data
					}
				})
			}
		}


	}
</script>

<style scoped lang="less">
	.page {
		height: 100vh;
		background-color: #F6F6F6;
	}
</style>