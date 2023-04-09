<template>
	<view class="page">
		<!-- <view class="row">
			<view class="titleTop">
				<dot></dot>发布一个寻物/寻主启示
			</view>
		</view> -->
		<view class="none">
			<u-picker ref="uPicker" @cancel="showPicker=false" @close="showPicker=false" @confirm="pickerConfirm"
				itemHeight="100" @change="changeHandler" :closeOnClickOverlay="true" :show="showPicker"
				:columns="columns" :defaultIndex="[0,0]"></u-picker>
			<u-datetime-picker itemHeight="100" :value="(new Date().getTime())" ref="datetimePicker"
				@cancel="showDatePicker=false" @close="showDatePicker=false" :closeOnClickOverlay="true"
				@confirm="pickerConfirm" :show="showDatePicker" mode="datetime">
			</u-datetime-picker>
		</view>

		<view class="row">
			<view class="title left"><text class="must">*</text>物品名称</view>
			<view class="value right">
				<input v-model="lostItemInfo.name" type="text" placeholder="请填写物品名称"
					placeholder-style="text-align:right;font-size:13px;">
				<!-- <image src="../static/mix/enter.png" mode="aspectFit"></image> -->
			</view>
		</view>
		<view class="row">
			<view class="title left"><text class="must">*</text>寻物/寻主</view>
			<view class="value right" @click="pickerChoose('type')">
				<input v-model="lostItemInfo.type" type="text" placeholder="请选择类别"
					placeholder-style="text-align:right;font-size:13px;" disabled>
				<image src="../static/mix/enter.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="row">
			<view class="title left"><text class="must">*</text>物品类别</view>
			<view class="value right" @click="pickerChoose('category')">
				<input type="text" v-model="lostItemInfo.category" placeholder="请选择物品类别"
					placeholder-style="text-align:right;font-size:13px;" disabled>
				<image src="../static/mix/enter.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="row">
			<view class="title left"><text class="must">*</text>丢失/拾取时间</view>
			<view class="value right" @click="pickerChoose('time')">
				<input v-model="lostItemInfo.time" type="text" placeholder="请选择时间"
					placeholder-style="text-align:right;font-size:13px;" disabled>
				<image src="../static/mix/enter.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="row">
			<view class="title left"><text class="must">*</text>丢失/拾取地点</view>
			<view class="value right">
				<input v-model="lostItemInfo.addr" type="text" placeholder="请填写地点"
					placeholder-style="text-align:right;font-size:13px;">
				<!-- <image src="../static/mix/enter.png" mode="aspectFit"></image> -->
			</view>
		</view>
		<view class="row">
			<view class="title left"><text class="must">*</text>联系方式</view>
			<view class="value right">
				<input v-model="lostItemInfo.contact" type="text" placeholder="请填写你的联系方式"
					placeholder-style="text-align:right;font-size:13px;">
				<!-- <image src="../static/mix/enter.png" mode="aspectFit"></image> -->
			</view>
		</view>
		<view class="row textarea">
			<view class="title left"><text class="must">*</text>物品描述</view>
			<view class="value right">
			</view>
			<textarea v-model="lostItemInfo.description" value="" placeholder="请填写物品描述"
				placeholder-style="font-size:14px" />
		</view>
		<view class="row textarea">
			<view class="title left">请选择最多6张照片</view>
			<view class="value right">
			</view>
			<u-upload :multiple="true" size-type="compressed" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1"
				:maxCount="6">
			</u-upload>
		</view>
		<view class="btn">
			<u-button type="primary" @click="publish" shape="circle" color="#4dade0" :plain="true" text="发布"></u-button>
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
				keyName: "",
				columns: [],
				fileList1: [],
				showDatePicker: false,
				showPicker: false,
				lostItemInfo: {
					id: "666",
					type: "寻主",
					category: "生活用品 / 水杯",
					name: "水杯",
					time: "2023年3月5日",
					addr: "瑞幸咖啡座位上",
					description: "本人水杯在李家坊长盛电子附近到埔心路伟业购物广场路段丢失！捡到本人身份证的兄弟或靓女请拨打我的手机号码，23年刚补办的，很急！有酬谢！",
					contact: "651446049",
					imageUrls: [],
				},

			}
		},
		computed: {
			requestData() {
				const {
					id,
					type,
					category,
					name,
					addr,
					contact,
					time,
					description,
					imageUrls,
				} = this.lostItemInfo
				let imgList = this.fileList1.map(o => o?.url?.replace('\\', '/'))
				let classify1 = category.split(" / ")[0]
				let classify2 = category.split(" / ")[1] || ""
				return {
					// id,
					type,
					classify1,
					classify2,
					name,
					date: time,
					region: addr,
					phone: contact,
					desc: description,
					imgList,
					time: new Date().getTime(),
					userInfo: this.userInfo
				}
			}
		},
		methods: {
			pickerChoose(keyName) {
				this.keyName = keyName
				if (keyName == "type") {
					this.columns = [
						["寻主", "寻物"]
					]
					this.showPicker = true
				}
				if (keyName == "category") {
					this.columns = this.cloneDeep([this.category, ['身份证', '校园卡', '学生证', '水卡', '公交卡', '银行卡', "其他证件"]])
					this.showPicker = true
				}
				if (keyName == "time") {
					this.showDatePicker = true
				}

			},
			pickerConfirm(e) {
				if (this.keyName == "time") {
					let date = new Date(e.value)
					let value = moment(e.value).format("YYYY年MM月DD日") + " " + date.getHours().toString().padStart(2, "0") +
						":" + date.getMinutes().toString().padStart(2, "0")
					moment(e.value).format("LT")

					this.lostItemInfo.time = value
				} else if (this.keyName == "category") {
					this.lostItemInfo[this.keyName] = e.value[0] + " / " + e.value[1]
				} else {
					this.lostItemInfo[this.keyName] = e.value[0]
				}
				this.showDatePicker = false
				this.showPicker = false
			},
			publish() {
				uni.showModal({
					title: '发布提示',
					content: '确认发布此信息吗?',
					success: res => {
						if (res.confirm) {
							uni.request({
								method: 'POST',
								url: this.apiRoot`publish`,
								data: {
									...this.requestData
								},

							}).then(res => {
								if (res.statusCode == 200) {
									uni.switchTab({
										url: `/pages/home`
									})
									setTimeout(() => {
										uni.showToast({
											title: "发布成功!",
											duration: 1500,
											mask: true
										});
									}, 0)
								} else {
									uni.showModal({
										title: "错误提示",
										content: `发布失败!\n`,
										// + res.data.msg,
										showCancel: false
									});
								}

							})

						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},

			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)

				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url, index) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.apiRoot`uploadImg`,
						filePath: url,
						name: 'file',
						success: (res) => {
							setTimeout(() => {
								index = this.fileList1.length - 1
								this.$set(this.fileList1[index], "url", JSON.parse(res.data)[0]
									.path)
							}, 0);
							resolve(res.data.data)
						}
					});
				})
			},
			changeHandler(e) {
				if (this.keyName !== "category") return
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
		},


		onReady() {
			// 微信小程序需要用此写法
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
	}
</script>

<style lang="less" scoped>
	view {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	input {
		text-align: right;
	}

	.btn {
		width: 150rpx;
		position: fixed;
		right: 50rpx;
		bottom: 50rpx;
	}


	.page {
		height: 100vh;
		background-color: #F6F6F6;
		flex-direction: column;
		justify-content: flex-start;

		// &::v-deep .u-picker {
		// 	height: 50vh;
		// 	.u-picker__view{
		// 		height: 100% !important;
		// 		.u-line-1{
		// 			// height: 40px !important;
		// 			// background-color: red;
		// 		}
		// 	}
		// }

		.row {
			justify-content: space-between;
			width: 100%;
			background-color: white;
			margin-bottom: 2px;
			padding: 20rpx;
			height: 100rpx;
			box-sizing: border-box;
			font-size: 15px;
			letter-spacing: 1px;
			.must{
				color: red;
			}

			.titleTop {
				width: 100%;
				letter-spacing: 0px;
				font-weight: 500;
				font-size: 17px;
				color: #4d4d4d;
				justify-content: center;
			}

			.dot {
				margin-right: 10px;
			}

			.right {
				image {
					height: 40rpx;
					width: 40rpx;
				}
			}
		}

		.textarea {
			flex-direction: column;
			box-sizing: border-box;
			height: 300rpx;

			.left {
				width: 100%;
				justify-content: flex-start;
				margin-bottom: 20rpx;

				.title {
					width: 100%;
				}
			}

			textarea {
				width: 100%;
				height: 100%;
			}

			&::v-deep .u-upload {
				align-items: flex-start;
				width: 100%;

				.u-upload__button,
				.u-upload__wrap__preview__image {
					width: 160rpx !important;
					height: 160rpx !important;
				}
			}

		}
	}
</style>