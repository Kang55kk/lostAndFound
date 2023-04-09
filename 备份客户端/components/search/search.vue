<template>
	<view class="search" @click="toSearch">
		<view class="search-input">
			<view class="search-content">
				<image src="@/static/mix/search.png"></image>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		methods: {
			toSearch() {
				uni.navigateTo({
					url: `/pages/search/search`
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.search {
		display: flex;
		justify-content: center;
		align-items: center;

		view {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		height: 100rpx;
		background-color: white;

		.search-input {
			width: 90%;
			height: 70rpx;
			border-radius: 70rpx;
			background-color: #ececec;
		}

		.search-content {
			image {
				width: 40rpx;
				height: 40rpx;
				margin: 3px;
				display: block;
			}
		}

	}
</style>