import Base64 from './base64.js'
function get(url, data) {
    var promise = new Promise((resolve, reject) => {
		let baseUrl = uni.getStorageSync("baseUrl");
		console.log(baseUrl+url);
        var that = this;
        var postData = data;
        uni.request({
            url: baseUrl + url,
            data: postData,
            method: "GET",
            dataType: "JSONP",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=UTF-8",
                "token": uni.getStorageSync("token")
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    resolve(Base64.decode(res.data));
                } else {
                    resolve(Base64.decode(res.data));
                }
            },
            error: function(e) {
                reject("网络出错");
            }
        });
    });
    return promise;
};
function post(url, data) {
    var promise = new Promise((resolve, reject) => {
		let baseUrl = uni.getStorageSync("baseUrl");
		console.log(baseUrl+url);
        var that = this;
        var postData = data;
        uni.request({
            url: baseUrl + url,
            data: postData,
            method: "POST",
            dataType: "JSONP",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                "token": uni.getStorageSync("token")
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    resolve(Base64.decode(res.data));
                } else {
                    resolve(Base64.decode(res.data));
                }
            },
            error: function(e) {
                reject("网络出错");
            }
        });
    });
    return promise;
};

const httpRequest = (opts, data) => {
	let baseUrl = uni.getStorageSync("baseUrl");
    let httpDefaultOpts = {
        url: baseUrl+opts.url,
        data: data,
        method: opts.method,
		dataType: 'JSONP',
        header: opts.method == 'get' ? {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
    }
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
				resolve(Base64.decode(res[1].data));
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })
    return promise;
};

//带Token请求
const httpTokenRequest = (opts, data) => {
	let token = uni.getStorageSync('token');
	let baseUrl = uni.getStorageSync("baseUrl");
    //此token是登录成功后后台返回保存在storage中的
    let httpDefaultOpts = {
        url: baseUrl+opts.url,
        data: data,
        method: opts.method,
        header: opts.method == 'get' ? {
		'token': token,
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
    } : {
		'token': token,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
        dataType: 'json',
    }
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1])
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })
    return promise
};
 
export default {
	get,
	post,
	httpRequest,
	httpTokenRequest					
}
