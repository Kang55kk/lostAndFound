var cloneDeep = function(obj) {
	return JSON.parse(JSON.stringify(obj))
}

function generateRandomNickName() {
	//生成随机用户名
	let letters = 'abcdefghijklmnopqrstuvwxyz';
	let numbers = '0123456789';
	let name = '';
	let length = Math.floor(Math.random() * 5 + 8); // 随机生成长度在8到12之间的整数
	for (let i = 0; i < length; i++) {
		if (Math.random() < 0.5) {
			name += letters.charAt(Math.floor(Math.random() * letters.length));
		} else {
			name += numbers.charAt(Math.floor(Math.random() * numbers.length));
		}
	}
	return name;
}




export default {
	cloneDeep,
	generateRandomNickName
}