const questions = [
    {
        question: "1. 您的出行目的是什么？",
        options: [
            { text: "旅游/探亲", score: 3 },
            { text: "商务/会议", score: 2 },
            { text: "留学/学术交流", score: 2 },
            { text: "工作/移民", score: 1 }
        ]
    },
    {
        question: "2. 您的护照签发国家是？",
        options: [
            { text: "中国", score: 1 },
            { text: "美国免签国家（如加拿大、英国等）", score: 3 },
            { text: "其他需要签证的国家", score: 2 }
        ]
    },
    {
        question: "3. 您是否有过美国签证记录？",
        options: [
            { text: "有，且曾多次入境美国", score: 3 },
            { text: "有，但只去过一次", score: 2 },
            { text: "没有，这是第一次申请", score: 1 }
        ]
    },
    {
        question: "4. 您的职业和收入情况如何？",
        options: [
            { text: "有稳定工作和高收入", score: 3 },
            { text: "有稳定工作但收入一般", score: 2 },
            { text: "自由职业或无固定工作", score: 1 },
            { text: "学生或无收入", score: 0 }
        ]
    },
    {
        question: "5. 您的家庭和经济 ties（如房产、存款、家庭成员等）是否牢固？",
        options: [
            { text: "有很强的家庭和经济 ties", score: 3 },
            { text: "有一定的家庭和经济 ties", score: 2 },
            { text: "家庭和经济 ties 较弱", score: 1 }
        ]
    },
    {
        question: "6. 您的旅行计划是否清晰且合理？",
        options: [
            { text: "有详细的行程计划和酒店预订", score: 3 },
            { text: "有大致计划但未完全确定", score: 2 },
            { text: "没有具体计划", score: 1 }
        ]
    },
    {
        question: "7. 您是否有过拒签记录？",
        options: [
            { text: "没有", score: 3 },
            { text: "有，但已经解决了相关问题", score: 2 },
            { text: "有，且未解决", score: 1 }
        ]
    },
    {
        question: "8. 您的年龄和婚姻状况如何？",
        options: [
            { text: "已婚且有子女", score: 3 },
            { text: "已婚但无子女", score: 2 },
            { text: "单身", score: 1 },
            { text: "其他", score: 1 }
        ]
    },
    {
        question: "9. 您的教育背景如何？",
        options: [
            { text: "本科及以上学历", score: 3 },
            { text: "大专或同等学历", score: 2 },
            { text: "高中及以下", score: 1 }
        ]
    },
    {
        question: "10. 您是否有过其他国家（如欧洲、日本等）的签证记录？",
        options: [
            { text: "有，且多次出入境", score: 3 },
            { text: "有，但只去过一次", score: 2 },
            { text: "没有", score: 1 }
        ]
    }
];

let currentQuestion = 0;
let totalScore = 0;

function loadQuestion() {
    const quiz = document.getElementById("quiz");
    quiz.innerHTML = `
        <h3>${questions[currentQuestion].question}</h3>
        ${questions[currentQuestion].options.map((option, index) => `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="question" id="option${index}" value="${option.score}">
                <label class="form-check-label" for="option${index}">${option.text}</label>
            </div>
        `).join("")}
    `;
}

function showResult() {
    const result = document.getElementById("result");
    let resultText = "";
    if (totalScore >= 25) {
        resultText = "<h4>结果：通过概率很高！</h4><p>您的条件非常符合美签要求，建议准备好相关材料，诚实回答签证官问题。</p>";
    } else if (totalScore >= 15) {
        resultText = "<h4>结果：通过概率中等。</h4><p>您的条件有一定优势，但可能需要补充材料或进一步证明您的 ties。</p>";
    } else {
        resultText = "<h4>结果：通过概率较低。</h4><p>建议您完善旅行计划、提供更多证明材料，或咨询专业签证顾问。</p>";
    }
    result.innerHTML = resultText;

    // 显示手机号输入框
    document.getElementById("phoneInput").style.display = "block";
    document.getElementById("submit").style.display = "none"; // 隐藏提交按钮
}

document.getElementById("submit").addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption) {
        totalScore += parseInt(selectedOption.value);
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    } else {
        alert("请选择一个答案！");
    }
});

document.getElementById("savePhone").addEventListener("click", () => {
    const phone = document.getElementById("phone").value;
    if (phone) {
        // 发送数据到服务器
        sendDataToServer(phone, totalScore);
    } else {
        alert("请输入手机号！");
    }
});

function sendDataToServer(phone, score) {
    const data = {
        phone: phone,
        score: score
    };

    // 替换为你的后端服务器地址
    fetch("https://your-backend-server.com/save-result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert("手机号和测评结果已保存！");
        } else {
            alert("保存失败，请重试！");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("网络错误，请重试！");
    });
}

// 初始化第一题
loadQuestion();