<template>
	<view class="page">
		<view class="tabs">
		</view>
		<view class="itemsList" v-if="loseList.length">
			<lostBrief v-for="(lose,index) in loseList" :key="index" :lose="lose" ref="lostBrief"></lostBrief>
		</view>
		<view v-else class="empty">
			<image src="../../static/mix/empty.jpg" mode="aspectFit"></image>
			<h1>空空如也~</h1>
		</view>
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
		onLoad(params) {
			if (params.keyword) {
				uni.request({
					url: this.apiRoot`hint`,
					data: {
						keyWord: params.keyword
					},
					success: (res) => {
						this.loseList = res.data
					}
				})
			} else if (params.classify) {
				let arr = params.classify.split('_')
				const data = {
					classify1: arr[0],
					classify2: arr[1],
				}

				uni.request({
					url: this.apiRoot`classifySearch`,
					data,
					success: (res) => {
						this.loseList = res.data
					}
				})
			}
		},
		data() {
			return {
				loseList: "",
			}
		},
	}
</script>

<style scoped lang="less">
	.page {
		height: calc(100vh - 44px);
		background-color: #F6F6F6;
		background-color: white;

		.empty {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding-bottom: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			letter-spacing: 3px;

			image {
				display: block;
			}

			h1 {
				font-family: "Comic Sans MS", cursive;
			}
		}
	}
</style>