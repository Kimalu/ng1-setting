//全局函数
class Tokens {
    _randomCode() {
        var code = "";
        var codeLength = 8;// 验证码的长度
        var chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd',
            'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
            'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];// 所有候选组成验证码的字符，当然也可以用中文的
        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * 36);
            code += chars[charIndex];
        }
        return code;
    }

    /**
     * token串计算
     *
     * @param url
     * @param method
     * @param cookies
     */
    getAuthHeader(url, method) {
        var mac_key = this.getcookie("mac_key");
        var access_token = this.getcookie("access_token");
        if (!access_token || !mac_key || !window.CryptoJS) {
            return null;
        }
        var differ_time = parseInt(this.getcookie('differ_time'));

        var strAuth = 'MAC id="' + access_token + '",nonce="';
        var nonce = (new Date().getTime() + ((differ_time && differ_time != 'NaN' ? differ_time : 0))) + ':' + this._randomCode();
        strAuth += nonce + '",mac="';

        var b = url.indexOf("//") + 2;
        var e = url.indexOf('/', b);
        var host = url.substring(b, e);
        var path = url.substring(e);
        var request_content = nonce + '\n' + method.toUpperCase() + '\n' + path + '\n' + host
            + '\n';
        var hash = CryptoJS.HmacSHA256(request_content, mac_key);
        var mac = hash.toString(CryptoJS.enc.Base64);
        strAuth += mac + '"';
        return strAuth;
    }

    /**
     * token串计算
     *
     * @param url
     * @param method
     * @param my_cookies
     */
    getAuthBody(url, method, host) {
        var mac_key = this.getQueryString('mac_key');
        var access_token = this.getQueryString('access_token');
        if (!access_token || !mac_key || !window.CryptoJS) {
            return;
        }

        var strAuth = {};
        var differ_time = parseInt(this.getcookie('differ_time'));
        strAuth.nonce = (new Date().getTime() + ((differ_time && differ_time != 'NaN' ? differ_time : 0))) + ':' + this._randomCode();
        strAuth.http_method = method;
        strAuth.host = host;
        strAuth.request_uri = "/auth.html?tokens/" + access_token;

        var request_content = strAuth.nonce + '\n' + method + '\n'
            + strAuth.request_uri + '\n' + host + '\n';
        var hash = CryptoJS.HmacSHA256(request_content, mac_key);
        strAuth.mac = hash.toString(CryptoJS.enc.Base64);
        return strAuth;
    }

    /**
     * token串计算
     *
     * @param url
     * @param method
     * @param my_cookies
     */
    getAuthBodyNewNonce(url, method, host) {
        var mac_key = this.getQueryString('mac_key');
        var access_token = this.getQueryString('access_token');

        if (!access_token || !mac_key || !window.CryptoJS) {
            return;
        }

        var strAuth = {};
        var differ_time = parseInt(this.getcookie('differ_time'));
        strAuth.nonce = (new Date().getTime() + ((differ_time && differ_time != 'NaN' ? differ_time : 0))) + ':' + this._randomCode();
        strAuth.http_method = method;
        strAuth.host = host;
        strAuth.request_uri = "/auth.html?tokens/" + access_token;

        var request_content = strAuth.nonce + '\n' + method + '\n'
            + strAuth.request_uri + '\n' + host + '\n';
        var hash = CryptoJS.HmacSHA256(request_content, mac_key);
        strAuth.mac = hash.toString(CryptoJS.enc.Base64);

        return strAuth;
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }

    /**
     * 获取指定名称的cookie的值
     * @param objname
     */
    getcookie(objname) {
        var arrstr = document.cookie.split("; ");
        for (var i = 0; i < arrstr.length; i++) {
            var temp = arrstr[i].split("=");
            if (temp[0] == objname) return unescape(temp[1]);
        }
    }
}

export default Tokens;
