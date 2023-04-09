<template>
	<view class="dot">
		<view class="realdot" :style="{width:size2,height:size2,backgroundColor:color}">

		</view>
	</view>
</template>

<script>
	export default {
		name: "dot",
		props: {
			size: {
				type: Number,
				default: () => 10
			},
			color: {
				type: String,
				default: () => "#00a7ff"
			},
		},
		computed: {
			size2() {
				return this.size * 2 + "rpx"
			}
		}
	}
</script>

<style lang="less">
	.dot {
		display: inline-block;
		height: 100%;
		margin-right: 10rpx;

		.realdot {
			border-radius: 50%;

		}
	}
</style>
