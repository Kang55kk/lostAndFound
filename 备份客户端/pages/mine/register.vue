<template>
	<view class="page">
		<view class="container">
			<image class="logo" src="@/static/mine/unlogin.png" />
			<view class="form-group">
				<input type="text" class="form-control" placeholder="请输入账号" v-model="username" />
			</view>
			<view class="form-group">
				<input type="password" class="form-control" placeholder="请输入密码" v-model="password" />
			</view>
			<view class="form-group">
				<input type="password" class="form-control" placeholder="请再次输入密码" v-model="confirmPassword" />
			</view>
			<view class="btn-container">
				<button class="register-btn" @click="handleRegister">注册</button>
			</view>
			<view class="logIn">已有账号，去登陆</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				confirmPassword: ''
			};
		},
		methods: {
			handleRegister() {
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
					data: {
						username: this.username,
						password: this.password,
					},
					success: (res) => {
						console.log(res);
						if (res.data.code == 200) {
							// 注册成功，这里可以将账号和密码提交到服务器或者本地存储中
							uni.showToast({
								title: '注册成功',
								icon: 'success'
							});
						} else {
							uni.showModal({
								showCancel: false,
								title:"错误提示",
								content:res.data.msg
							})
						}

					},
				})
			}
		}
	};
</script>

<!-- <script module="bgr" lang="renderjs">
	export default {
		created() {
			const script = document.createElement('script');
			script.src = '/common/store.js';
			document.head.appendChild(script);
		},
		mounted() {
			setTimeout(function() {
				let page = document.getElementsByTagName("uni-page")[0]
				page.style.backgroundColor = "red"
				console.log(page);
			}, 10);
		}
	}
</script> -->

<style lang="less" scoped>
	.page {
		height: calc(100vh - 44px);

		.logIn {
			font-size: 10px;
			margin-top: 10rpx;
			color: #0065cc;
		}
	}

	.container {
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-color: #f2f2f2;
	}

	.logo {
		width: 200px;
		height: 200px;
		// margin-top: 70rpx;
		box-sizing: border-box;
		padding: 30px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-control {
		width: 80vw;
		max-width: 300px;
		height: 40px;
		line-height: 40px;
		padding: 0px 10px;
		border: none;
		border-radius: 4px;
		background-color: #fff;
		font-size: 16px;
		box-shadow: rgba(136, 165, 191, 0.48) 0px 2px 4px 0px,
			rgba(255, 255, 255, 0.8) 0px 1px 0px 0px inset;
	}

	.btn-container {
		margin-top: 30px;
	}

	.register-btn {
		display: inline-block;
		width: 200px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: #007aff;
		color: #fff;
		border-radius: 25px;
		font-size: 18px;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px;
	}
</style>