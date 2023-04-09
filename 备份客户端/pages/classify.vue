<template>
	<view class="page">
		<search></search>
		<div class="wrapper">
			<div class="tab left">
				<tab :direction="'column'" :tabs="Object.keys(categoryAll)" ref="tab" @change="changeCurrent($event)">
				</tab>
			</div>
			<div class="right">
				<view class="item" @click="search(item)" v-for="item in categoryAll[Object.keys(categoryAll)[current]]"
					:key="item">
					<image :src="`/static/classfiy/certificate/${item}.png`" mode="aspectFit"></image>
					<text>{{item}}</text>
				</view>
			</div>
		</div>
	</view>
</template>

<script>
	import mixins from '@/common/mixins.js'
	export default {
		mixins: [mixins],
		data() {
			return {
				current: 0
			}
		},

		computed: {
			tabNum() {
				return this.$refs.tab?.current
			}
		},
		methods: {
			search(item) {
				const classify1 = Object.keys(this.categoryAll)[this.current]
				const classify2 = item
				const classify = classify1 + '_' + classify2
				
				uni.navigateTo({
					url: `search/searchResult?classify=${classify}`
				})
			},
			changeCurrent(index) {
				this.current = index
			},

			getTypeName(itemName) {
				let typeName = ''
				this.categoryAllType.forEach((items) => {
					for (let i = 0; i < items.length; i++) {
						if (items[i].levelClass2 === itemName) {
							typeName = items[i].typeName;
							return
						}
					}
				})
				return typeName;
			}
		}
	}
</script>

<style scoped lang="less">
	.page {
		background-color: white;
		height: 100vh;
		width: 100vw;

		&::v-deep .search {
			background-color: #4dade0;
			margin-top: -1px;
		}

		.wrapper {
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;

			.tab {
				width: 220rpx;
			}

			.right {
				width: calc(100vw - 220rpx);
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-wrap: wrap;

				.item {
					width: calc(100% / 3);
					flex-shrink: 0;
					height: 200rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					image {
						width: 50%;
						height: 50%;
						display: block;

					}

					text {
						display: block;
						width: 100%;
						text-align: center;
					}
				}
			}
		}


	}
</style>