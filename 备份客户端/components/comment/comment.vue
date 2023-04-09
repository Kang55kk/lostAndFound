<template>
	<view class="comment">
		<view class="portrait">
			<image :src="psnInfo.portrait" mode="aspectFill"></image>
		</view>
		<view class="info">
			<view class="row1">
				<view class="left">
					<h1 class="name">{{psnInfo.nickname}}</h1>
					<text class="time">{{psnInfo.time}}</text>
				</view>
				<view class="right">
					<view class="num">666</view>
					<u-icon name="heart-fill" :color="heartColor"></u-icon>
					
				</view>
			</view>
			<view class="row2">
				{{psnInfo.comment}}
			</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment";
	export default {
		name: "comment",
		props: {
			psnInfo: { //personal information
				type: Object,
				default: () => {
					return {
						portrait: "/static/mix/portrait.jpg",
						nickname: "席成",
						id: "",
						comment: "巴山楚水凄凉地，responsibility~",
						time: moment(new Date()).format('YYYY年MM月DD日'),
						like: 0,

					}
				}
			}
		},
		data() {
			return {
				heartColor:'red',
				// psnInfo: {
				// 	portrait: "/static/mix/portrait.jpg",
				// 	nickname: "席成",
				// 	id: "",
				// 	comment: "巴山楚水凄凉地，responsibility~",
				// 	time: moment().format('YYYY-MM-DD')
				// }
			};
		}
	}
</script>

<style lang="less" scoped>
	view {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.comment {
		padding:30rpx 20rpx;
		padding-bottom: 50rpx;
		margin-bottom: 2px;
		box-sizing: border-box;
		width: 100%;
		background-color: white;
		justify-content: flex-start;
		align-items: flex-start;

		.portrait {
			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			margin-right: 20rpx;
		}

		.info {
			width: 100%;
			flex-direction: column;

			.row2 {
				margin-top: 30rpx;
				width: 100%;
				justify-content: flex-start;
				font-weight: 200;
			}

			.row1 {
				width: 100%;
				justify-content: space-between;

				.left {
					.name {
						margin-right: 15rpx;
						font-size: 18px;
					}

					.time {
						font-size: 10px;
						color: #b8b8b8;
					}
				}

				.right {
					.num {
						color: #666;
						font-size: 10px;
						margin-right: 10rpx;
						margin-bottom: 2px;
						letter-spacing: 1rpx;
					}
				}

			}
		}


	}
</style>
