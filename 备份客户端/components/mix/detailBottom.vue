<template>
	<view class="detailBottom">
		<view class="left">
			<input type="text" placeholder="友善评论~">
		</view>
		<view class="right">
			<view class="item">
				<image mode="aspectFit" src="@/static/mix/contact.png"></image>
				<text>联系</text>
			</view>
			<view class="item" @click="collect">
				<image mode="aspectFit" src="@/static/mix/collected.png" v-if="collected"></image>
				<image mode="aspectFit" src="@/static/mix/collect.png" v-else></image>
				<text>收藏</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			lostItemInfo: Object
		},
		computed: {
			//是否已收藏
			collected() {
				return this.lostItemInfo?.collectingUsers?.includes(this.userInfo._id)
			},
			operate() {
				return this.collected ? 'cancel' : 'collect'
			}
		},
		methods: {
			collect() {
				if (!this.userInfo) {
					this.checkLoginStatus()
					return
				}

				const data = {
					loseId: this.lostItemInfo._id,
					operate: this.operate,
					userId: this.userInfo._id
				}
				uni.request({
					url: this.apiRoot`collect`,
					data,
					success: (res) => {
						this.$emit('getLoseDetail')
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	view {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	image {
		width: 100%;
		height: 50rpx;
	}

	.detailBottom {
		height: 100rpx;
		background-color: white;
		width: 100%;
		position: fixed;
		bottom: 0;
		margin-bottom: -5px;
		padding-bottom: 5px;
		border-top: 1px solid #f3f3f3;



		.left {
			width: 70%;
			height: 100%;

			input {
				background-color: #f2f2f2;
				height: 24px;
				width: 90%;
				border-radius: 24px;
				padding-left: 15px;
				box-sizing: border-box;
				color: #b4b1b1;
			}
		}

		.right {
			justify-content: space-evenly;
			width: 30%;

			.item {
				width: 40rpx;
				flex-direction: column;

				text {
					display: block;
					font-size: 20rpx;
					// transform: scale(0.8);
					white-space: nowrap;
				}
			}
		}
	}
</style>