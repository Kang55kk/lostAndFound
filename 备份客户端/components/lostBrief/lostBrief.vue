<!-- 失物简略信息 -->
<template>
	<view class="lostBrief" @click="lookDetail" v-if="info">
		<view class="itemsPho left">
			<image :src="info.imgList[0]?apiRoot(info.imgList[0]):`/static/classfiy/certificate/${info.classify2}.png`"
				:style="info.imgList[0]?'':`padding:15px;padding-bottom:30px;`" mode="aspectFill"></image>
		</view>
		<view class="info right">
			<view class="title">{{info.name}}</view>
			<view class="elseInfo">
				<view class="addr">地点 ：{{info.region}}</view>
				<view class="time">时间 ：{{info.date}}</view>
				<view class="ath">发布人 ：{{info.userInfo?info.userInfo.nickname:'-'}}</view>
			</view>
		</view>
		<view class="releaseTime">{{timeFormat(info.time)}}</view>
	</view>
</template>

<script>
	import moment from "moment";
	export default {
		name: "lostBrief",
		props: {
			tabs: {
				type: Array,
				default: () => {
					return ['寻主', "寻物"]
				}
			},
			lose: Object
		},

		computed: {
			info() {
				return this.lose
			}
		},
		methods: {
			lookDetail() {
				uni.navigateTo({
					url: `/pages/itemDetails/itemDetails?_id=${this.lose._id}`
				})
			},
			timeFormat(timestamp) {
				const date = moment(timestamp); // 使用时间戳创建moment对象
				const formattedDate = date.format("YYYY-MM-DD HH:mm")
				return formattedDate
			}



		}
	}
</script>

<style scoped lang="less">
	view {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.lostBrief {
		width: 100%;
		padding: 25rpx;
		margin-bottom: 4rpx;
		background-color: white;
		position: relative;
		box-sizing: border-box;

		.left {
			box-sizing: border-box;

			image {
				width: 230rpx;
				height: 230rpx;
				border-radius: 20rpx;
				margin-right: 20rpx;
				box-sizing: border-box;
			}
		}

		.right {
			flex-direction: column;
			align-items: flex-start;
			height: 230rpx;
			white-space: nowrap;
			font-size: 13px;

			.title {
				font-size: 18px;
				font-weight: 550;
				margin-bottom: 20rpx;
				max-width: 350rpx;
				overflow-x: auto;

				&::-webkit-scrollbar {
					display: none;
				}

			}

			.elseInfo {
				&>view {
					margin-bottom: 10rpx;
				}

				max-width:450rpx;
				overflow-x:auto;
				flex-direction: column;
				align-items: flex-start;

				&::-webkit-scrollbar {
					display: none;
				}

				// .ath {
				// 	color: #b1b1b1;
				// }
			}

		}

		.releaseTime {
			color: #b1b1b1;
			position: absolute;
			right: 5px;
			font-size: 13px;
			bottom: 5px;
		}
	}
</style>