<script>
	export default {
		onLaunch: function() {
			// console.log(this.$store.commit());
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	@import 'uview-ui/theme.scss';

	/*每个页面公共css */
	.uni-app--maxwidth {
		.uni-tabbar-bottom {
			.uni-tabbar {
				.uni-tabbar__item {
					&:nth-child(4) {
						.uni-tabbar__bd {

							// transform: scale(1.5);
						}
					}
				}
			}

		}
	}
</style>
