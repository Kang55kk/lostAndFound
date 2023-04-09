<!-- tab标签组件 -->
<template>
	<view class="tab">
		<view class="row" v-if="direction=='row'">
			<view class="tabItem " @click="change(index)" v-for="(tabItem,index) in tabs" :key="tabItem+index"
				:style="{width:tabItemWidth,backgroundColor:tabItemIackgroundColor(index)}">
				<text :style="{borderColor: textBorderColor(index)}">{{ tabItem }}</text>
			</view>
		</view>
		<view class="column" v-if="direction=='column'">
			<view class="tabItem" @click="change(index)" v-for="(tabItem,index) in tabs" :key="tabItem+index"
				:style="{width:tabItemWidth,backgroundColor:tabItemIackgroundColor(index)}">
				<text :style="{borderColor: textBorderColor(index)}">{{ tabItem }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tab",
		props: {
			tabs: {
				type: Array,
				default: () => {
					return [1, 2, 3, 4, 5, 6]
				}
			},
			direction: {
				type: String,
				default: () => "row"
			}

		},
		data() {
			return {
				current: 0
			};
		},
		computed: {
			tabItemWidth() {
				if (this.direction == 'column') {
					return (100 ) + '%'
				}
				if (this.tabs.length <= 7) {
					return (100 / this.tabs.length) + '%'
				} else {
					return 0
				}
			},
		},
		methods: {
			change(index) {
				this.current = index
				this.$emit("change", index)
			},
			tabItemIackgroundColor(index) {
				if (this.current == index) {
					return "white"
				} else {
					return "transparent"
				}

			},
			textBorderColor(index) {
				if (this.current == index) {
					return "#4dade0"
				} else {
					return "transparent"
				}
			}


		}
	}
</script>

<style scoped lang="less">
	.tab {
		width: 100%;
		overflow-x: auto;
		display: flex;

		.row {
			width: 100%;
			display: flex;
		}

		.tabItem {
			padding: 20rpx;
			padding-bottom: 0rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			white-space: nowrap;
			transition: all .1s;

			text {
				text-align: center;
				display: block;
				width: 80%;
				padding-bottom: 10rpx;
				border-bottom: 10rpx solid #4dade0;
				transition: all .1s;

			}

		}

		.column {
			width: 100%;
			background-color: #f3f3f3;
			height: 100vh;
			.tabItem {
				padding: 0rpx;
				padding: 20rpx 0;
				text {
					border: none;
					border-left: 10rpx solid #4dade0;
					padding:10rpx 0rpx;
					width: 100%;
					box-sizing: border-box;
					font-size: 13px;
					font-weight: 550;
				}
			}
		}


	}
</style>
