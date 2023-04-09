<template>
	<view class="page">
		<view class="loggedIn" v-if="logged">
			<view class="portrait">
				<view class="portrait-content">
					<view class="img">
						<image :src="apiRoot(userInfo.headimg)" @click.stop.prevent="previewImg([apiRoot(userInfo.headimg)],0)"
							mode="aspectFill"></image>
					</view>
					<view class="name">{{userInfo.nickname}}</view>
				</view>
			</view>
			<view class="mineItems">
				<mineItem @click.native="toPage(index)" :mineItem="mineItem" v-for="(mineItem,index) in mineItems">
				</mineItem>
			</view>
		</view>
		<view class="notLoggedIn" v-if="!logged">
			<view class="login">
				<view class="avatar">
					<image src="@/static/mine/unlogin.png" mode="aspectFit" class="avatar-img"></image>
				</view>
				<form class="form">
					<view class="form-group">
						<input type="text" class="form-control" placeholder="请输入账号" v-model="username"
							@confirm="mode=='logIn'?login_signUp():''"></input>
					</view>
					<view class="form-group">
						<input type="password" class="form-control" placeholder="请输入密码" v-model="password"
							@confirm="mode=='logIn'?login_signUp():''"></input>
					</view>
					<view class="form-group">
						<input type="password" class="form-control" placeholder="请再次输入密码" v-if="mode =='signUp'"
							v-model="confirmPassword" />
					</view>
					<!-- <button type="primary" class="btn btn-primary" @click="login">登&nbsp;&nbsp;录</button> -->
					<button type="primary" class="btn btn-primary"
						@click="login_signUp">{{mode=='logIn'?`登&nbsp;&nbsp;录`:`注&nbsp;&nbsp;册`}}</button>
				</form>
				<view class="link">
					<view class="link-item" @click="signOrLog(`signUp`)" v-if="mode =='logIn'">注册账号
					</view>
					<!-- <view class="link-item" @click="goToForgotPassword">忘记密码？</view> -->
				</view>
				<view class="link">
					<view class="link-item" @click="signOrLog(`logIn`)" v-if="mode =='signUp'">返回登录
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode: "logIn",
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
				}, ],
				username: uni.getStorageSync('username') || '',
				password: uni.getStorageSync('password') || '',
				confirmPassword: ''

			}
		},
		computed: {
			logged() {
				return this.$store.getters.logged
			},
		},
		methods: {
			//返回登录/去注册
			signOrLog(mode) {
				this.mode = mode
				return
				this.username = ''
				this.password = ''
				this.confirmPassword = ''
			},

			login_signUp() {
				const {
					username,
					password
				} = this
				if (username.trim() === "") {
					uni.showModal({
						showCancel: false,
						title: "错误提示",
						content: '用户名不能为空！'
					})
					return
				}
				if (password.trim() === "") {
					uni.showModal({
						showCancel: false,
						title: "错误提示",
						content: '密码不能为空！'
					})
					return
				}


				if (this.mode == 'logIn') {
					uni.request({
						url: this.apiRoot`toLogin`,
						method: 'POST',
						data: {
							username,
							password
						},
						success: (res) => {
							if (res.data.code == 200) {
								uni.setStorageSync("username", username)
								uni.setStorageSync("password", password) //记住密码

								this.$store.commit('changeState', {
									stateName: 'userInfo',
									val: res.data.userInfo
								})
								// uni.switchTab({
								// 	url: `/pages/home`,
								// })
								setTimeout(() => {
									uni.showToast({
										title: '登录成功',
										icon: 'success',
										mask: true
									});
								}, 0);
							} else {
								uni.showModal({
									showCancel: false,
									title: "错误提示",
									content: res.data.msg
								})
							}
						}
					})

				} else {
					this.handleRegister()
				}


			},

			//注册
			handleRegister() {


				// console.log(this.generateRandomNickName());
				// console.log(this.apiRoot`static/random_portrait/0.png`);
				const randomNumber = Math.floor(Math.random() * 21);
				let data = {
					username: this.username,
					password: this.password,
					sex: '保密',
					phone: "",
					nickname: this.generateRandomNickName(),
					headimg: `static/random_portrait/${randomNumber}.png`,
				}
				// console.log(this.generateRandomNickName());
				// 验证账号格式
				const accountRegex = /^[a-zA-Z0-9]{6,20}$/;
				if (!accountRegex.test(this.username)) {
					uni.showToast({
						title: '帐号由6到20位数字或字母组成！',
						icon: 'none',
						duration: 2500
					});
					return;
				}

				// 验证密码长度和空格
				if (this.password.length < 7 || /\s/.test(this.password)) {
					uni.showToast({
						title: '密码长度必须大于6且不能含有空格',
						icon: 'none'
					});
					return;
				}

				// 验证两次密码是否一致
				if (this.password !== this.confirmPassword) {
					uni.showToast({
						title: '两次输入的密码不一致',
						icon: 'none'
					});
					return;
				}
				uni.request({
					method: 'POST',
					url: this.apiRoot`register`,
					data,
					success: (res) => {
						console.log(res);
						if (res.data.code == 200) {
							// 注册成功，这里可以将账号和密码提交到服务器或者本地存储中
							uni.showToast({
								title: '注册成功',
								icon: 'success'
							});
							this.mode = 'logIn'
						} else {
							uni.showModal({
								showCancel: false,
								title: "错误提示",
								content: res.data.msg
							})
						}

					},
				})
			},
			goToForgotPassword() {
				// 跳转到忘记密码页面
				/* uni.navigateTo({
				  url: '/pages/forgot-password/index'
				}) */
			},
			goToRegister() {
				// 跳转到注册账号页面
				/* uni.navigateTo({
				  url: '/pages/register/index'
				}) */
			},


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
					case 3:
						uni.showModal({
							title: "确认提示",
							content: "是否确认退出登录？",
							success: (res) => {
								if (res.confirm) {
									this.$store.commit('changeState', {
										stateName: 'userInfo',
										val: ''
									})
									
								}
							}
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

		.loggedIn {
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
						background-color: white;

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

		.notLoggedIn {
			background-color: #fbfbfb;
			height: 100vh;
			overflow: hidden;

			* {
				box-sizing: border-box;
			}

			.login {
				max-width: 100vw;
				margin: 0 auto;
				text-align: center;
				padding: 0 100rpx;
			}

			.avatar {
				margin-top: 150rpx;
				margin-bottom: 30px;

				.avatar-img {
					width: 300rpx;
					height: 300rpx;
					// border-radius: 50%;
				}
			}

			.form {
				margin-bottom: 30px;

				.form-group {
					margin-bottom: 20px;

					.form-control {
						text-align: left;
						width: 100%;
						height: 40px;
						padding: 10px;
						padding-left: 25px;
						border-radius: 20px;
						border: none;
						outline: none;
						box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

					}


					.form-control::placeholder {
						color: #ccc;
						font-size: 14px;
					}
				}

				.btn-primary {
					// display: block;
					// width: 100%;
					height: 40px;
					line-height: 40px;
					// background-color: #007aff;
					// color: #fff;
					// border: none;
					border-radius: 20px;
					// outline: none;
					// cursor: pointer;
					// transition: all .2s ease-in-out;

					// &:hover {
					// 	background-color: #0065cc;
					// }
				}
			}

			.link {
				display: flex;
				// justify-content: space-between;
				justify-content: center;
				align-items: center;
				margin: 15rpx 30rpx;


				.link-item {
					color: #007aff;
					text-decoration: none;
					font-size: 14px;
					transition: all .2s ease-in-out;

					&:hover {
						color: #0065cc;
					}
				}
			}
		}
	}
</style>