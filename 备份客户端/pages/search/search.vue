<template>
	<view class="search-container">
		<view class="search-box">
			<image class="search-icon" src="/static/mix/search.png"></image>
			<input class="search-input" type="text" v-model="keyword" placeholder="请输入关键词" @input="debouncedOnInput"
				:auto-focus="true" @confirm="onSearch" />
			<view v-if="showClear" class="clear-icon" @click="onClear">
				<image src="/static/mix/clear.png"></image>
			</view>
		</view>
		<view v-if="showSuggest&&keyword.length" class="suggest-list">
			<view v-for="(item, index) in suggestList.slice(0,10)" :key="index" class="suggest-item"
				@click="onSelectSuggest(item,index)">
				{{ item }}
			</view>
		</view>
		<view v-if="showHistory" class="history-list">
			<view class="row"><text>历史搜索</text> <text @click="onClearAllHistory">清除所有记录</text></view>
			<view class="historyItemContainer">
				<view v-for="(item, index) in historyList" :key="index" class="history-item"
					@click="onSelectSuggest(item,index)">
					<text class="history-text">{{ item }}</text>
					<view class="clear" @click.stop.prevent="onClearHistory(index)">×</view>
				</view>
			</view>
			<!-- <view class="history-title">历史搜索</view> -->

			<!-- <view class="clear-all" >清除所有记录</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '', // 搜索关键词
				suggestList: [], // 搜索建议列表
				historyList: [], // 历史搜索记录
				debouncedOnInput: _.debounce(this.onInput, 300),
				suggestDataList: [],

			};
		},
		computed: {
			showClear() { // 是否显示清除按钮
				return this.keyword && this.keyword.length > 0;
			},
			showSuggest() { // 是否显示搜索建议列表
				return this.suggestList && this.suggestList.length > 0;
			},
			showHistory() { // 是否显示历史搜索记录
				return this.historyList && this.historyList.length > 0;
			}
		},
		methods: {

			onInput(e) { // 输入框输入时触发
				uni.request({
					url: this.apiRoot`hint`,
					data: {
						keyWord: this.keyword
					},
					success: (res) => {
						this.suggestDataList = res.data
						this.suggestList = res.data.map(o => o.name)
					}
				})
				this.keyword = e.target.value;
				if (this.keyword.length > 0) {
					// 发送请求获取搜索建议
					// this.suggestList = ['搜索建议1', '搜索建议2', '搜索建议3'];
				} else {
					this.suggestList = [];
				}
			},
			onSearch(item) { // 点击搜索或者回车时触发
				// 执行搜索操作，添加到本地存储
				this.addToHistory(this.keyword);
				this.suggestList = [];

				uni.navigateTo({
					url: '/pages/search/searchResult?keyword=' + this.keyword
				});
			},
			onClear() { // 点击清除按钮时触发
				this.keyword = '';
				this.suggestList = [];
			},
			onSelectSuggest(item) { // 选择搜索建议时触发

				this.keyword = item;
				this.onSearch(item);

			},
			addToHistory(keyword) { // 添加到历史搜索记录
				if (this.historyList.indexOf(keyword) < 0) {
					const newList = [keyword, ...this.historyList];
					if (newList.length > 10) {
						newList.pop();
					}
					this.historyList = newList;
					uni.setStorage({
						key: 'search_history',
						data: newList
					});
				}
			},
			loadHistory() { // 加载历史搜索记录
				const historyList = uni.getStorageSync('search_history') || [];
				this.historyList = historyList.slice(0, 10);
			},
			onClearHistory(index) { // 点击清除单条历史记录时触发
				this.historyList.splice(index, 1);
				uni.setStorage({
					key: 'search_history',
					data: this.historyList
				});
			},
			onClearAllHistory() { // 点击清除所有历史记录时触发
				this.historyList = [];
				uni.removeStorage({
					key: 'search_history'
				});
			}
		},
		mounted() {
			this.loadHistory();
		}
	};
</script>
<style lang="less">
	.search-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20px;
		height: calc(100vh - 44px);
		background-color: #f7f7f7;
	}

	.search-box {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 90%;
		height: 50px;
		border-radius: 25px;
		background-color: #f0f0f0;
	}

	.search-icon {
		display: block;
		width: 20px;
		height: 20px;
		margin-left: 10px;


	}

	.search-input {
		flex: 1;
		height: 100%;
		padding: 0 10px;
		font-size: 16px;
		color: #333;
		background-color: transparent;
		border: none;
		outline: none;
	}

	.clear-icon {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		cursor: pointer;

		&::v-deep uni-image {
			height: 20px;
		}
	}

	.suggest-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 99;
	}

	.suggest-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 40px;
		font-size: 16px;
		color: #333;
		cursor: pointer;
	}

	.history-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		margin-top: 20px;
		// background-color: #fff;

		.row {
			font-size: 14px;
			display: flex;
			justify-content: space-between;
			width: 100%;
			align-items: center;
			background-color: #f7f7f7;

			text {
				display: inline-block;

				&:nth-child(2) {
					color: blue;
				}
			}
		}
	}



	.historyItemContainer {
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;

		.history-item {
			position: relative;
			display: flex;
			margin-right: 10px;
			background-color: white;
			border-radius: 50px;
			align-items: center;
			padding: 5px 20px;
			margin-bottom: 10px;



			.history-text {
				font-size: 15px;
				display: inline-block;
				margin-right: 20px;
			}

			.clear {
				font-size: 25px;
				line-height: 25px;
				display: inline-block;
				vertical-align: middle;
				box-sizing: border-box;
				margin-bottom: 2px;
			}
		}
	}




	.clear-all {
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		color: #333;
		text-align: center;
		cursor: pointer;
	}
</style>