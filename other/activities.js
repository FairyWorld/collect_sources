let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));



//  助力抽奖通用
async function jhy(id) {
    let logindata = await get("zhuli", `login&comm_id=${id}`)
    if (logindata.loginStatus == 100 && logindata.key == "ok") {
        uid = logindata.config.uid
        for (i = 0; i < 3; i++) {
            await get("zhuli", `zhuli&uid=${uid}&comm_id=${id}`)
            await get("zhuli", `choujiang&isdown=1&comm_id=${id}`)
            await sleep(1000)
        }
    }
}
//云养猫 -05-11 搜索  20210501
async function cat() {
    aid = "2021wuyi/m"
    await get(aid, "login")
    await get(aid, "gofuli&resure=1")
    await get(aid, "share")
    await get(aid, "guangczzl")
    await get(aid, "guang&resure=1")
    await get(aid, "gozhongcao&resure=1")
    await get(aid, "xinshou&resure=1")
    let res = await $http.get(
        "https://huodong3.3839.com/n/hykb/2021wuyi/m/index.php"
    );
    str = res.data.match(/prize1_lingqu_(\d+)/g);
    for (id of str) {
        await get(aid, "playgame&gameid=" + id.split("_")[2])
    }
    //await sleep(60000) 取消延时吧 早晚跑两次好了 不然云函数多账号会超时
    for (id of str) {
        await get(aid, "lingqushiwan&gameid=" + id.split("_")[2])
    }
    let info = await get(aid, "login")
    if (info.key == "ok" && info.config) {
        msg = `\n【云养猫】：体重[${info.config.tizhong}]  毛球[${info.config.maoqiu}]`
        result += msg
        console.log(msg)
    }
}

//获取任务id
async function lottery(a,c,b){
let res = await $http.get(
       `https://huodong3.3839.com/n/hykb/${a}/m/?comm_id=${b}`
   );
   str=res.data.match(/daily_btn_(\d+)/g);
await lottery2(a,c,b,str)
}
//快爆粉丝福利80080
async function lottery2(a, d, b, c) {
    for (i of c) {
        i = i.split("_")[2]
        await get(`${a}/m`, `DailyAppJump&comm_id=${b}&isyuyue=0&id=${i}`)
        await get(`${a}/m`, `DailyAppLing&comm_id=${b}&isyuyue=0&id=${i}`)
        await get(`${a}/m`, `chouqu&comm_id=${b}&isyuyue=0&id=${i}`)
        await get(`${a}/m`, `BaoXiangLing&comm_id=${b}&isyuyue=0&id=${i}`)
    }
    let info = await get(`${a}/m`, `login&comm_id=${b}&isyuyue=0`)
    let msg = `\n${d}：${info.config.daoju} 抽奖次数：${info.config.played}`
    result += msg
}

async function ddd(id) {
    await get("yuyue2020/m", `invite&comm_id=${id}&isyuyue=0&isfx=1&testkey=4399NoneDeviceId`)
    await get("yuyue2020/m", `choujiang&comm_id=${id}&isyuyue=0&isdown=1&isdownonly=1&testkey=4399NoneDeviceId`)
    await get("yuyue2020/m", `mycode&comm_id=${id}&isyuyue=0&testkey=4399NoneDeviceId`)
}


async function task1() {
    console.log(`临时任务列表：
1：粉丝福利12344,80080,25525,630630,79979都可以去首页搜索对应数字绑定qq
2：游戏单第7期
3：2021助力活动`)
    await get("yyzl/m", "giftCode&comm_id=17&shareCode=0a3d5e2bc45b9&isyuyue=0&is_down=1")
    console.log("粉丝福利任务开始,记得去app中首页分别搜索80080 25525 630630 79979进行qq号绑定哦！！")
    await lottery("lottery", "[630630]王牌勋章", 5)
    await lottery("lottery", "[25525]补给箱", 4)
    await lottery("lottery", "[79979]宝石", 3)
    await lottery("lottery", "[12344]洞天百宝", 10)
    await cat()
    result += "新增云养猫活动20210501 12344,80080 25525 630630 79979记得搜索进行qq号绑定哦！！"
    console.log("四周年活动开始,请去活动里绑定qq哦,社区-四周年-活动1")
    //   await glist()
    for (id of [38,39]) {
        await jhy(id)
    }
    await ddd(101)
    await ddd(101)
}