let data = []; // 存放 JSON 数据

// 字段映射表（更清晰、避免写中文字段）
const fieldMap = {
    era: "时代",
    campLevel: "大帐等级",
    stamina: "自然体力使用率",
    meritMultiplier: "军功倍率",
};

// 初始化数据加载
function initData() {
    // sg_data测试版
    fetch('sgdbzSG.json')
        .then(response => response.json())
        .then(loadedData => {
            data = loadedData;
            console.log("数据加载完成：", data);
        })
        .catch(error => {
            console.error("数据加载失败：", error);
            alert("数据加载失败，请检查 sg_data.json 是否存在！");
        });
}

// 查询函数
function filterData() {
    if (!data || data.length === 0) {
        alert("数据尚未加载，请稍后再试！");
        return;
    }

    // 获取用户选择的筛选项
    const era = document.getElementById("era").value;
    const campLevel = document.getElementById("campLevel").value;
    const stamina = document.getElementById("naturalStamina").value;
    const multiplier = document.getElementById("militaryMeritMultiplier").value;

    // 过滤逻辑（转换为数字后比较，防止 '1.0' !== 1.0）
    const filtered = data.filter(item => {
        return (era === "" || item[fieldMap.era] === era) &&
            (campLevel === "" || item[fieldMap.campLevel] === campLevel) &&
            (stamina === "" || parseFloat(item[fieldMap.stamina]) === parseFloat(stamina)) &&
            (multiplier === "" || parseFloat(item[fieldMap.meritMultiplier]) === parseFloat(multiplier));
    });


    displayResults(filtered);
}

// 渲染结果表格
function displayResults(results) {
    const tbody = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    // 数据去重
    const uniqueResults = [];
    results.forEach(record => {
        if (!uniqueResults.some(existingRecord => existingRecord["最终结果"] === record["最终结果"])) {
            uniqueResults.push(record);
        }
    });

    if (uniqueResults.length === 0) {
        tbody.innerHTML = "<tr><td colspan='8'>未找到匹配数据</td></tr>";
        return;
    }

    uniqueResults.forEach(record => {
        const row = tbody.insertRow();
        // row.insertCell(0).textContent = record["最终结果"];
        row.insertCell(0).textContent = record["最终战功"];
        row.insertCell(1).textContent = record["1亿战功"];
        row.insertCell(2).textContent = record["2.05亿战功"];
        row.insertCell(3).textContent = record["2.27亿战功"];
        row.insertCell(4).textContent = record["3.15亿战功"];
        row.insertCell(5).textContent = record["4.47亿战功"];
        row.insertCell(6).textContent = record["4.91亿战功"];
    });
}
