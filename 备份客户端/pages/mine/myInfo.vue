<template>
	<view class="page">
		<view class="none">
			<u-picker @cancel="showPicker=false" @close="showPicker=false" @confirm="pickerConfirm"
				:closeOnClickOverlay="true" :show="showPicker" itemHeight="100" :columns="columns"></u-picker>
		</view>
		<view class="rowBox">
			<view class="row" @click="changePortrait">
				<view class="left">头像</view>
				<view class="right">
					<image :src="apiRoot(myInfo.headimg)" mode="aspectFill" @click.stop.prevent="previewImg([apiRoot(myInfo.headimg)],0)">
					</image>
					<image v-if="editMode" src="../../static/mix/enter.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="rowBox">
			<view class="row">
				<view class="left">昵称</view>
				<view class="right">
					<input type="text" :disabled="!editMode" v-model="myInfo.nickname">
				</view>
			</view>
		</view>
		<view class="rowBox">
			<view class="row">
				<view class="left">性别</view>
				<view class="right">
					<input type="text" disabled v-model="myInfo.sex" @click="pickerChoose('sex')">

					<image v-if="editMode" src="../../static/mix/enter.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="rowBox">
			<view class="row">
				<view class="left">联系方式</view>
				<view class="right">
					<input type="text" :disabled="!editMode" v-model="myInfo.phone">
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button type="success" @click="btnsFunc('save')" v-if="editMode" text="保存修改"></u-button>
			<u-button type="primary" @click="btnsFunc('modify')" v-else text="修改信息"></u-button>
		</view>



	</view>
</template>

<script>
	var vm = ''
	var userInfo = ''
	import mixins from '@/common/mixins.js'
	export default {
		mixins: [mixins],
		beforeCreate() {
			userInfo = _.cloneDeep(this.$store.state.userInfo)
		},
		data() {
			return {
				headimg: '',
				keyName: "",
				editMode: false,
				columns: [
					["男", "女", "保密"]
				],
				showPicker: false,
				myInfo: {
					...userInfo
				},
			}
		},

		methods: {
			async changePortrait() {
				if (!this.editMode) {
					return
				}
				uni.chooseImage({
					count: 1, //默认9
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: async (res) => {
						let result = JSON.parse(await this.uploadImg(res.tempFilePaths[0]));
						this.headimg = result[0].path.split(`\\`).join('/')
						this.$set(this.myInfo, 'headimg', result[0].path.split(`\\`).join(
							'/'))
					}
				})
			},
			btnsFunc(mode) {
				if (mode == "modify") {
					uni.showToast({
						title: '修改信息',
						duration: 1000,
						icon: 'none'
					});

					this.editMode = true
				} else if (mode == "save") {
					console.log(this.myInfo);
					uni.request({
						url: this.apiRoot`updateUserInfo`,
						method: 'POST',
						data: {
							...this.myInfo,
							headimg: this.headimg
						},
						success: (res) => {
							console.log("res: " + JSON.stringify(res));
							uni.showToast({
								title: '修改成功',
								duration: 1500,
							});
							this.$store.commit('changeState', {
								stateName: 'userInfo',
								val: this.myInfo
							})
						}
					})



					this.editMode = false
				}
			},
			pickerChoose(keyName) {
				if (!this.editMode) {
					return
				}
				this.keyName = keyName
				this.showPicker = true
			},
			pickerConfirm(e) {
				if (this.keyName == "sex") {
					this.$set(this.myInfo, "sex", e.value[0])
				}
				this.showDatePicker = false
				this.showPicker = false
			},

		}
	}
</script>

<style scoped lang="less">
	view {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	input {
		text-align: right;
	}


	.page {
		height: 100vh;
		// background-color: #F6F6F6;
		font-size: 14px;
		font-weight: 550;
		flex-direction: column;
		justify-content: flex-start;

		&::v-deep .u-button {
			// margin-top: 120rpx;
			width: 300px;
		}

		.btn {
			width: 100vw;
			position: fixed;
			bottom: 50px;
		}

		.rowBox {
			background-color: white;
		}

		.row {
			min-height: 120rpx;
			width: calc(100vw - 60rpx);
			justify-content: space-between;
			box-sizing: border-box;
			padding: 20rpx;
			margin: 0 30rpx;
			border-bottom: 1px solid #e0e0e0;

			.left {}

			.right {
				image {
					&:nth-child(1) {
						width: 120rpx;
						border-radius: 50%;
						height: 120rpx;
						border: 3px solid #4dade0;
					}

					&:nth-child(2) {
						width: 50rpx;
						height: 50rpx;
						margin-right: -30rpx;
						// border-radius: 50%;
						// border: 3px solid #4dade0;
					}
				}
			}
		}
	}
</style>