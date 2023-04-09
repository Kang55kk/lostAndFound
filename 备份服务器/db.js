const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose
  .connect("mongodb://127.0.0.1:27017/loseMg")
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("数据库连接失败:", err);
  });

//丢失物品表-建表
const LoseSchema = new mongoose.Schema({
  type: {//寻物/寻主
    type: String,
  },
  classify1: {
    type: String,
  },
  classify2: {
    type: String,
  },
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  region: {
    type: String,
  },
  phone: {
    type: String,
  },
  desc: {
    type: String,
  },
  imgList: {
    type: Array,
  },
  time: {
    type: Number,
  },
  userInfo: {
    type: Object,
  },
  collectingUsers: Array
});

// 用户账号信息
const UserSchema = new mongoose.Schema({
  // openid: {
  //   type: String,
  // },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  nickname: String,
  phone: String,
  sex: String,
  headimg: String,
});

const Lose = mongoose.model("Lose", LoseSchema);
const User = mongoose.model("User", UserSchema);


//导出 数据库表 实例
module.exports = {
  Lose,
  UserSchema, User
};
