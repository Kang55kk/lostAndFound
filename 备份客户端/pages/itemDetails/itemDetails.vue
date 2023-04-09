<template>
	<view class="page">
		<view class="container">
			<view class="plate1 plate">
				<div class="bigTitle ">
					{{lostItemInfo.type}}启事
				</div>
				<div class="desc">
					{{lostItemInfo.desc}}本人身份证在李家坊长盛电子附近到埔心路伟业购物广场路段丢失！捡到本人身份证的兄弟或靓女请拨打我的手机号码，23年刚补办的，很急！有酬谢！
				</div>
				<swiper v-if="lostItemInfo.imgList.length" :indicator-dots="true" :autoplay="false" :interval="3000"
					:duration="500">
					<swiper-item @click="previewImg(lostItemInfo.imgList,index)"
						v-for="(item,index) in lostItemInfo.imgList" :key="index">
						<image class="swiperImg" :src="item" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<div class="publishTime" v-text="publishTime"></div>
			</view>
			<view class="plate2 plate">
				<div class="bigTitle ">
					失物信息
				</div>
				<view class="row">
					<div class="title">物品名称 ：</div>
					<text>{{lostItemInfo.name}}</text>
				</view>
				<view class="row">
					<div class="title">失物类别 ：</div>
					<text>{{lostItemInfo.classify1}} / {{lostItemInfo.classify2}}</text>
				</view>
				<view class="row">
					<div class="title">{{lostItemInfo.type=="寻主"?'拾到':'遗失'}}时间 ：</div>
					<text>{{lostItemInfo.date}}</text>
				</view>
				<view class="row">
					<div class="title">{{lostItemInfo.type=="寻主"?'拾到':'遗失'}}地点 ：</div>
					<text>{{lostItemInfo.region}}</text>
				</view>
				<view class="row">
					<div class="title">联系方式：</div>
					<text>{{lostItemInfo.phone}}</text>
				</view>
			</view>
			<view class="plate3 plate">
				<comment></comment>
				<comment></comment>
				<comment></comment>
			</view>
		</view>

		<detailBottom :lostItemInfo="lostItemInfo" ref="detailBottom" @getLoseDetail="getLoseDetail"></detailBottom>

	</view>
</template>

<script>
	import detailBottom from "@/components/mix/detailBottom.vue"
	import mixins from '@/common/mixins.js'
	import moment from "moment";
	export default {
		mixins: [mixins],
		components: {
			detailBottom
		},

		data() {
			return {
				lostItemInfo: {
					"_id": "642d153729c3d62c4727dcef",
					"type": "寻主",
					"classify1": "卡片、证件类",
					"classify2": "身份证",
					"name": "猪猪",
					"date": "2023年3月5日",
					"region": "瑞幸咖啡座位上",
					"phone": 651446049,
					"desc": "一看就是花果山摘下来的水蜜桃,失主看到抓紧时间找我领",
					"imgList": [
						"http://192.168.1.10:3002/file/83c521d9-45ed-447f-bad5-e081eb0ea562.jpg"
					],
					"time": 1680676143340,
				},
				collected: false,

			}
		},

		onLoad(params) {
			this.loseId = params._id
			this.getLoseDetail()
		},
		computed: {
			publishTime() {
				const timestamp = this.lostItemInfo.time; // 时间戳，例如从数据库中获取到的值
				const date = moment(timestamp);
				const formattedDate = date.format('YYYY-MM-DD HH:mm');
				return formattedDate;
			},
			detailBottom() {
				return this.$refs.detailBottom
			}

		},
		methods: {
			getLoseDetail() {
				uni.request({
					url: this.apiRoot`loseDetail`,
					data: {
						_id: this.loseId
					},
					success: (res) => {
						let o = res.data[0]
						o.imgList = o.imgList.map(o => this.apiRoot(o))
						this.lostItemInfo = o
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.page {
		.plate {
			padding: 25px 15px;
			margin-bottom: 10px;
			background-color: white;
		}

		.container {
			background-color: #F6F6F6;
			padding-bottom: 50px;

			.bigTitle {
				font-weight: bolder;
				border-left: #4dade0 solid 10px;
				padding-left: 10px;
				margin-left: -15px;
				line-height: 25px;
				// font-size: 20px;
			}

			.plate1 {
				.desc {
					font-size: 13px;
					margin: 20rpx 0 40rpx 0;
					line-height: 23px;
					font-weight: bold;
					color: #646464;
					letter-spacing: 1px;
				}

				.swiperImg {
					border-radius: 6rpx;
				}

				.publishTime {
					width: 100%;
					text-align: right;
					color: #0000003b;
					font-size: 10px;
					font-weight: bold;
					padding: 30px 5px 10px 0;

				}
			}

			.plate2 {
				padding: 20px 0 35px 0;

				.bigTitle {
					margin-left: 0;
					margin-bottom: 5px;
				}

				.row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 0 15px;
					border-bottom: 2rpx solid #80808038;

					.title {
						display: inline-block;
						line-height: 55px;
						font-weight: bold;
						font-size: 14px;
						white-space: nowrap;
					}

					text {
						display: inline-block;
						font-size: 14px;
						color: #575757;
					}
				}
			}

			.plate3 {
				padding: 0 10rpx;
			}
		}
	}



	.page {
		height: calc(100vh - 44px);
		background-color: #F6F6F6;

		uni-swiper {
			height: 700rpx;
		}

		swiper {
			image {
				width: 100%;
				height: 100%;
			}
		}

		.entry {
			// background-color: white;
			font-size: 19px;
			margin: 1px 0 0px 0;
			padding: 20rpx 10rpx;
			width: 100%;
			// border-radius: 10px;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;


		}

		.comments {
			// margin-top: 20rpx;
			border-radius: 10px;
			overflow: hidden;
			background-color: #F6F6F6;
		}

		.details {
			// margin-top: -20rpx;
			border-radius: 10px;
			overflow: hidden;

			.row {
				background-color: white;
				padding: 20rpx 30rpx;
				margin-bottom: 1px;

				.title {
					display: inline-block;
					width: 170rpx;
					color: #b8b8b8;
					font-size: 14px;
					text-align: justify;
					text-align-last: justify;
					line-height: 60rpx;
					white-space: nowrap;
				}

				text {}
			}
		}
	}
</style>