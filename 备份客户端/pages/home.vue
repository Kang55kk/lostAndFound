<template>
	<view class="page">
		<div class="hideBtn" @click="showChangeIpInput =!showChangeIpInput"></div>
		<u-search :showAction="true" v-if="showChangeIpInput" @custom="changeIp" placeholder="隐藏服务器地址链接修改"
			actionText="确定" :animation="true"></u-search>
		<!-- <button @click="logState">state</button> -->
		<view class="state" v-if="showChangeIpInput">{{state}}</view>
		<search></search>
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500">
			<swiper-item @click="previewImg(imgUrls,index)" v-for="(item,index) in imgUrls" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="tabs">
			<tab :tabs="['寻主', '寻物']" @change="tabChange($event)"></tab>
		</view>
		<view class="itemsList" style="margin-bottom: 50px;">
			<lostBrief v-for="(lose,index) in loseList" :key="index" :lose="lose" ref="lostBrief"></lostBrief>
		</view>
		<view class="publish" @click="toPublish">
			<image src="@/static/tabBar/publish.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	import mixins from '@/common/mixins.js'
	import moment from "moment";

	export default {
		mixins: [mixins],
		data() {
			return {
				tabs: ['寻主', '寻物'],
				imgUrls: ["/static/banner/banner1.jpg", "/static/banner/banner2.jpg", "/static/banner/banner3.jpg"],
				loseList: [],
				type: "寻主",
				showChangeIpInput: false
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中",
			})
			this.getLose()
		},
		onShow() {
			uni.$off("getLose")
			this.getLose(this.type)
		},
		computed: {
			lostBrief() {
				return this.$refs?.lostBrief
			},
			state() {
				return JSON.stringify(this.$store.state)
			}
		},
		methods: {
			changeIp(value) {
				console.log(value);
				this.$store.commit('changeState', {
					stateName: 'apiRoot',
					val: value
				})
				uni.setStorageSync('apiRoot', value)
				this.showChangeIpInput = false
			},
			toPublish() {
				// uni.$once("getLose", () => {
				// 	this.getLose()
				// })
				this.checkLoginStatus()
				if (!this.userInfo) return
				uni.navigateTo({
					url: "./publish"
				})
			},
			tabChange(index) {
				index ? this.type = "寻物" : this.type = "寻主"
				this.getLose(this.type)
			},
			getLose(type = "寻主") {
				uni.request({
					url: this.apiRoot`getLose`,
					data: {
						type
					},
					success: (res) => {
						this.loseList = res.data.sort((a, b) => {
							return b.time - a.time
						})
					},
					complete: () => {
						this.$nextTick(function() {
							uni.hideLoading()
						})
					}
				})
			}
		},

	}
</script>

<style scoped lang="less">
	.page {
		height: calc(100vh - 44px);
		background-color: #F6F6F6;

		.state {
			// width: 100vw;
			overflow: auto;
		}

		.hideBtn {
			// background-color: red;
			width: 30px;
			height: 30px;
			position: fixed;
			top: 0;
			left: 0;
			// float: left;
			z-index: 999;
		}

		.publish {
			background-color: white;
			border-radius: 50%;
			width: 100rpx;
			position: fixed;
			right: 70rpx;

			bottom: 150rpx;
			/* #ifdef APP-PLUS */
			bottom: 100rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */

			bottom: 100rpx;
			/* #endif */

			image {
				width: 100%;
				height: 100rpx;
			}
		}

		.swiper {
			height: 470rpx;

			image {
				width: 100%;
			}
		}

		.tabs {
			// background-color: white;
			width: 100%;
		}

		tab {
			width: 100%;

		}

		.itemsList {
			// margin-bottom: 50px;
			// background-color: red;
			padding-bottom: 50px;
		}

	}
</style>