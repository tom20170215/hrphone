/**
 * 游戏预约
 * @param {int} gameId 游戏ID
 * @param {bool} debug 是否是测试环境
 */
function GameOrder(gameId, debug) {
    this.gameId = gameId;
    const API_URL = debug ? 'http://hwsdkapitest.tanyu.mobi/index.php' : 'http://hwsdkapi.tanyu.mobi/index.php';

    /**
     * 发送验证码
     *
     * @param {int} type 预约方式，1-手机，2-邮箱
     * @param {string} identification 账号
     * @param {callback} success 成功回调
     * @param {callback} error 失败回调
     */
    this.sendVcode = (type, identification, success, error) => {
        /*
        请求后服务器返回格式如下：
        {errcode: code}
        code:
            0-成功
            -1-不存在的游戏id
            -2-账号格式不正确
            -3-账号已经预约过此游戏
        */
        if (![1, 2].includes(type)) {
            return false;
        }

        let url = API_URL + '?action=order&operation=sendVcode',
            data = {
                game_id: gameId,
                identification: identification,
                type: type
            };
        sendRequest(url, 'post', data, success, error);
    }
    /**
     * 获取预约人数
     *
     * @param {callback} success 成功回调
     * @param {callback} error 失败回调
     */
    this.getOrderPerson = (success, error) => {
        /*
        请求后服务器返回格式如下：
        {errcode: code, person:{1:101,2:202,total:303}}
        code:
            0-成功
            -1-不存在的游戏id
        person:
            total代表预约总人数
            其他字段以gameOrder中的extra分类
        */
        let url = API_URL + '?action=order&operation=getOrderPerson&game_id=' + this.gameId;
        sendRequest(url, 'get', {}, success, error);
    }

    /**
     * 预约
     *
     * @param {string} identification 账号
     * @param {string} vcode 验证码
     * @param {int} type 类型
     * @param {int} system 操作系统，1-ios，2-android
     * @param {int} extra 额外数据
     * @param {callback} success 成功回调
     * @param {callback} error 失败回调
     */
    this.gameOrder = (identification, vcode, type, system, extra, success, error) => {
        /*
        请求后服务器返回格式如下：
        {errcode: code}
        code:
            0-成功
            -1-不存在的游戏id
            -2-账号格式不正确
            -3-账号已经预约过此游戏
            -4-验证码错误
        */
        let url = API_URL + '?action=order&operation=gameOrder',
            data = {
                game_id: this.gameId,
                identification,
                type,
                vcode,
                system,
                extra,
            };
        sendRequest(url, 'post', data, success, error);
    }

    let sendRequest = function sendRequest(url, method, data, success, error) {
        let xhr = new XMLHttpRequest(),
            sendData = getQueryString(data);
        if (method === 'GET') {
            let delimiter = url.indexOf('?') >= 0 ? '&' : '?';
            url += delimiter + sendData;
        }
        xhr.open(method, url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                if (res.errcode === 0) {
                    success(res);
                } else {
                    error(res);
                }
            }
        }
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(sendData);
    }

    let getQueryString = function getQueryString(data) {
        let queryString = '';
        for (const key in data) {
            queryString += key + '=' + encodeURI(data[key]) + '&';
        }

        return queryString.substr(0, queryString.length - 1);
    }
}

export default GameOrder;