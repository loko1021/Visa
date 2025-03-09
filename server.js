const express = require("express");
const cors = require("cors");
const app = express();

// 启用 CORS
app.use(cors());

// 解析 JSON 请求体
app.use(express.json());

// 保存测评结果的端点
app.post("/save-result", (req, res) => {
    const { phone, score } = req.body;

    // 这里可以将数据保存到数据库
    console.log("收到数据：", { phone, score });

    // 返回成功响应
    res.json({ success: true });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});