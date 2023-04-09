<template>
	<view class="page">
		<view class="portrait">
			<view class="portrait-content">
				<view class="img">
					<image src="@/static/mix/portrait.jpg" mode="aspectFit"></image>
				</view>
				<view class="name">Kangkang</view>
			</view>
		</view>
		<view class="mineItems">
			<mineItem @click.native="toPage(index)" :mineItem="mineItem" v-for="(mineItem,index) in mineItems">
			</mineItem>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mineItems: [{
					iconPath: "/static/mine/myPublish.png",
					text: "我的发布"
				}, {
					iconPath: "/static/mine/collection.png",
					text: "我的收藏"
				}, {
					iconPath: "/static/mine/myInfo.png",
					text: "我的信息"
				}, {
					iconPath: "/static/mine/logOut.png",
					text: "退出登录"
				}, ]

			}
		},
		methods: {
			toPage(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: "/pages/mine/myPublish"
						})
						break;
					case 1:
						uni.switchTab({
							url: "/pages/favorites"
						})
						break;
					case 2:
						uni.navigateTo({
							url: "/pages/mine/myInfo"
						})
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.page {
		// margin-top: -22px;
		background-color: #F6F6F6;
		height: 100vh;

		view {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.portrait {
			// display: flex;
			// justify-content: center;
			// align-items: center;
			color: white;

			background-color: #4dade0;
			height: 460rpx;

			.portrait-content {
				width: 25%;
				flex-direction: column;

				.img {
					border-radius: 50%;

					image {
						box-sizing: border-box;
						width: 80px;
						height: 80px;
						border-radius: 50%;
						display: block;
						box-shadow: 0px 0px 2px 4px #00000069;
					}
				}

				.name {
					margin-top: 20rpx;
				}
			}
		}

		mine-item {
			width: 90%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.mineItems {
			width: 100%;
			margin-top: -30rpx;
			flex-direction: column;
		}
	}
</style>
