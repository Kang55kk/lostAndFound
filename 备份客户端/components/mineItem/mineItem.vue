<template>
	<view class="mineItem">
		<view class="left">
			<image :src="mineItem.iconPath" mode="aspectFit"></image>
			<text>{{mineItem.text}}</text>
		</view>
		<image src="@/static/mix/enter.png" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		name: "mineItem",
		props: {
			mineItem: {
				type: Object,
				default: {
					iconPath: "@/static/mine/myPublish.png",
					text: "我的发布"
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style scoped lang="less">
	view {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mineItem {
		width: 90%;
		background-color: white;
		height: 100rpx;
		border-radius: 15rpx;
		justify-content: space-between !important;
		padding: 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;

		image {
			height: 50rpx;
			width: 50rpx;

			&:nth-child(2) {
				height: 40rpx;
				width: 40rpx;
			}
		}

		.left {


			text {
				margin-left: 20rpx;
				font-weight: 550;
				display: block;
				font-size: 14px;
			}
		}

	}
</style>