export default {
	data() {
		return {
			category: ["卡片、证件类", "生活用品", "数码产品", "美妆护肤类", "衣服物品类", "饰品", "文娱", "其它"],
			columnData: [
				['身份证', '校园卡', '学生证', '水卡', '公交卡', '银行卡', "其他证件"],
				['水杯', '雨伞', '书包', '钥匙', '其他生活用品'],
				['手机', '电脑', '平板', '充电器', '耳机', 'U盘', '其他数码产品'],
				['化妆品', '护肤品', '口红', '香水', '其他美妆护肤类'],
				['衣服', '鞋子', '帽子', '围巾', '手套', '其他衣服物品'],
				['项链', '手链', '耳环', '戒指', '发夹', '其他饰品'],
				['书籍', '文具', '运动器材', '游戏设备', '乐器', '其他文娱用品'],
				['其它']
			],
			categoryAll: {
				"卡片、证件类": ["身份证", "校园卡", "学生证", "水卡", "公交卡", "银行卡", "其他证件"],
				"生活用品": ["水杯", "雨伞", "书包", "钥匙", "其他生活用品"],
				"数码产品": ["手机", "电脑", "平板", "充电器", "耳机", "U盘", "其他数码产品"],
				"美妆护肤类": ["化妆品", "护肤品", "口红", "香水", "其他美妆护肤类"],
				"衣服物品类": ["衣服", "鞋子", "帽子", "围巾", "手套", "其他衣服物品"],
				"饰品": ["项链", "手链", "耳环", "戒指", "发夹", "其他饰品"],
				"文娱": ["书籍", "文具", "运动器材", "游戏设备", "乐器", "其他文娱用品"],
				"其它": ["其它"]
			},
			categoryAllType: [
				[{
						"levelClass2": "身份证",
						"typeName": "idCard"
					},
					{
						"levelClass2": "校园卡",
						"typeName": "campusCard"
					},
					{
						"levelClass2": "学生证",
						"typeName": "studentCard"
					},
					{
						"levelClass2": "水卡",
						"typeName": "waterCard"
					},
					{
						"levelClass2": "公交卡",
						"typeName": "busCard"
					},
					{
						"levelClass2": "银行卡",
						"typeName": "bankCard"
					},
					{
						"levelClass2": "其他证件",
						"typeName": "otherCertificates"
					}
				],
				[{
						"levelClass2": "水杯",
						"typeName": "waterCup"
					},
					{
						"levelClass2": "雨伞",
						"typeName": "umbrella"
					},
					{
						"levelClass2": "书包",
						"typeName": "schoolbag"
					},
					{
						"levelClass2": "钥匙",
						"typeName": "key"
					},
					{
						"levelClass2": "其他生活用品",
						"typeName": "otherDailyNecessities"
					}
				],
				[{
						"levelClass2": "手机",
						"typeName": "mobilePhone"
					},
					{
						"levelClass2": "电脑",
						"typeName": "computer"
					},
					{
						"levelClass2": "平板",
						"typeName": "tablet"
					},
					{
						"levelClass2": "充电器",
						"typeName": "charger"
					},
					{
						"levelClass2": "耳机",
						"typeName": "earphones"
					},
					{
						"levelClass2": "U盘",
						"typeName": "usbFlashDrive"
					},
					{
						"levelClass2": "其他数码产品",
						"typeName": "otherDigitalProducts"
					}
				],
				[{
						"levelClass2": "化妆品",
						"typeName": "cosmetics"
					},
					{
						"levelClass2": "护肤品",
						"typeName": "skincare"
					},
					{
						"levelClass2": "口红",
						"typeName": "lipstick"
					},
					{
						"levelClass2": "香水",
						"typeName": "perfume"
					},
					{
						"levelClass2": "其他美妆护肤类",
						"typeName": "otherBeautyAndSkincareProducts"
					}
				],
				[{
						"levelClass2": "衣服",
						"typeName": "clothes"
					},
					{
						"levelClass2": "鞋子",
						"typeName": "shoes"
					},
					{
						"levelClass2": "帽子",
						"typeName": "hat"
					},
					{
						"levelClass2": "围巾",
						"typeName": "scarf"
					},
					{
						"levelClass2": "手套",
						"typeName": "gloves"
					},
					{
						"levelClass2": "其他衣服物品",
						"typeName": "otherClothingItems"
					}
				],
				[{
						"levelClass2": "项链",
						"typeName": "necklace"
					},
					{
						"levelClass2": "手链",
						"typeName": "bracelet"
					},
					{
						"levelClass2": "耳环",
						"typeName": "earrings"
					},
					{
						"levelClass2": "戒指",
						"typeName": "ring"
					},
					{
						"levelClass2": "发夹",
						"typeName": "hairpin"
					},
					{
						"levelClass2": "其他饰品",
						"typeName": "otherJewelry"
					}
				],
				[{
						"levelClass2": "书籍",
						"typeName": "books"
					},
					{
						"levelClass2": "文具",
						"typeName": "stationery"
					},
					{
						"levelClass2": "运动器材",
						"typeName": "sportsEquipment"
					},
					{
						"levelClass2": "游戏设备",
						"typeName": "gameDevice"
					},
					{
						"levelClass2": "乐器",
						"typeName": "musicalInstrument"
					},
					{
						"levelClass2": "其他文娱用品",
						"typeName": "otherEntertainmentProducts"
					}
				],
				[{
					"levelClass2": "其它",
					"typeName": "other"
				}]
			]
		}
	},
	methods: {
		uploadImg(url) {
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: this.apiRoot`uploadImg`,
					filePath: url,
					name: 'file',
					success: (res) => {
						resolve(res.data)
					}
				});


			})
		},
	}
}