const express = require("express");
const cors = require("cors");
const app = express();
const { Lose, User } = require("./db");
//文件操作
const multer = require("multer");
//不重复字符串
const { v4 } = require("uuid");
const axios = require("axios");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//允许跨域
app.use(cors());
//允许别人看你电脑文件
app.use(express.static(__dirname));
//openid获取
app.use(express.static('./homepage'))
//暴露端口
app.listen(3001, () => {
  console.log("服务开启了！");
});


app.get("/ceshi", async (req, res) => {
  try {
    let xxx = { a: 123 };
    res.send(xxx);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/login", async (req, res) => {
  const { code } = req.query;
  try {
    const {
      data: { openid },
    } = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=wx49f012dd3a5e9018&secret=12e5ea2bd5f732d2836af7ab0897de5d&js_code=${code}&grant_type=authorization_code`
    );
    console.log(openid);
    res.send(openid);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//获取首页别人发布的捡到了什么的信息

app.get("/getLose", async (req, res) => {
  const { type } = req.query;
  // type用来区分寻物还是寻主
  const result = await Lose.find({ type });
  res.send(result);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 想把文件存到哪（req,文件名字，callback）
    cb(null, "./file");
    // 文件存到当前目录file文件夹
  },
  filename: function xx(req, file, cb2) {
    // console.log();
    // let fileInfo = JSON.parse(req.body?.fileInfo)
    // if (fileInfo.name) {
    //   file.originalname = fileInfo.name
    // }
    // let type = file.originalname.replace(/.+\./, ".");
    let type = file.originalname.slice(file.originalname.lastIndexOf("."), file.originalname.length)
    cb2(null, v4() + type);
  },
});
//上传图片，你捡到的东西
const upload = multer({ storage });
app.post("/uploadImg", upload.array("file", 6), (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(req.files);
});


//获取首页数据
app.get("/getLose", async (req, res) => {
  const { type } = req
  const result = await Lose.find({ type })
  res.send(result)
})

//上传你捡到的物品的文字信息
app.post("/publish", async (req, res) => {
  try {
    const {
      type,
      classify1,
      classify2,
      name,
      date,
      region,
      phone,
      desc,
      imgList,
      time,
      userInfo
    } = req.body;
    await Lose.create({
      type,//寻物寻主?
      classify1,//一级分类  卡片.证件类
      classify2,//二级分类  身份证
      name,//失物名称
      date,//拾取时间
      region,//拾取地点
      phone,//练习方式
      desc,//描述
      imgList,//上传图片数组
      time,//发布时间
      userInfo,
      collectingUsers: []
    });
    res.send({ code: 200, msg: "发布成功" });
  } catch (error) {
    res.statusCode = 400;
    // res.send({ code: 400, msg: `发布失败:${error}` });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      code: 400,
      msg: `${error}`
    }));
  }
});


//注册账号
app.post('/register', async (req, res) => {
  const { username, password, headimg, nickname } = req.body
  const result = await User.findOne({ username })
  if (result) {
    res.setHeader("content-type", "application/json")
    res.status(409).json({ code: 409, msg: "已存在该账号！" })
  } else {
    await User.create({ username, password, headimg, nickname })
    res.status(200).json({ code: 200, msg: "用户创建成功" })
  }
})

//登录
app.post("/toLogin", async (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.statusCode = 400
  try {
    const { username, password } = req.body
    const result = await User.findOne({ username })
    if (!result) {
      res.send({ msg: "用户不存在！" })
      return
    }
    if (password != result.password) {
      res.send({ msg: "用户名或密码错误！" })
      return
    }
    res.statusCode = 200
    a = JSON.parse(JSON.stringify(result))
    delete a.password
    delete a.__v
    res.send({ code: 200, msg: "登录成功", userInfo: a })
  } catch (error) {
    res.send({ code: 400, msg: '登录失败' })
  }

})

//搜索框输入时候提示,搜索结果
app.get('/hint', async (req, res) => {
  try {
    const { keyWord } = req.query
    const _keyWord = new RegExp(keyWord, 'i')
    const result = await Lose.find({
      name: _keyWord
    })
    res.send(result)
  } catch (error) {
  }
})


app.get('/classifySearch', async (req, res) => {
  try {
    const { classify1, classify2 } = req.query;
    const result = await Lose.find({ classify1, classify2 });
    res.send(result);
  } catch (error) {
    // 处理错误
  }
});

//根据对应_id查找失物详情信息
app.get('/loseDetail', async (req, res) => {
  try {
    const { _id } = req.query
    let result = await Lose.find({ _id })
    res.send(result)
  } catch (error) {
    res.send(error)
  }
})

//获取我的发布或者我的收藏
app.get('/myPublish', async (req, res) => {
  try {
    const { userId, item } = req.query;
    if (!['publish', 'collect'].includes(item)) {
      throw new Error('Invalid "item" parameter');
    }
    let query;
    if (item === 'publish') {
      query = { 'userInfo._id': userId };
    } else if (item === 'collect') {
      query = { collectingUsers: { $in: [userId] } };
    }

    const result = await Lose.find(query);
    console.log(result);
    if (!result.length) {
      throw new Error(`No ${item}ed items found for user with ID "${userId}"`);
    }
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//点击收藏,把用户id存到物品信息中,或者取消收藏
app.get('/collect', async (req, res) => {
  try {
    const { loseId, userId, operate } = req.query
    const lose = await Lose.findOne({ _id: loseId })
    const collectingUsersNow = lose?.collectingUsers ?? []
    await Lose.findByIdAndUpdate(loseId, {
      $set: { collectingUsers: operate === 'collect' ? [...collectingUsersNow, userId] : collectingUsersNow.filter((e) => e !== userId) },
    });
    res.status(200).json({ msg: '成功', code: 200 })
  } catch (error) {
    res.status(400).json({ msg: '失败', code: 200 })
  }
})



//更新用户信息
app.post('/updateUserInfo', async (req, res) => {
  const { _id, username, sex, headimg, nickname, phone } = req.body
  try {
    await User.updateOne({ _id }, { $set: { username, sex, headimg, nickname, phone } })
    res.json({ success: true, message: '更新用户信息成功' })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: '更新用户信息失败' })
  }
})

//npm i nodemon -g 全局安装nodemon 可以使服务器更改代码保存后不用手动node index.js重启服务器，他会自动重启
