import Base64 from './base64.js'
import dokey from './encode/dokey.js';
import md5 from './encode/md5.js';
import Vue from 'vue';

const http = new Request();
let debugLevel = uni.getStorageSync("debugLevel");
let baseUrl = uni.getStorageSync("baseUrl");

function getToken(){
	var secretdate = dokey.secretdate();
	var secreted = md5(secretdate + dokey.getkey());
	return secretdate+'&'+secreted;
};

function get(url, data) {
	let tokenStr = getToken();
	data.token = tokenStr;
    var promise = new Promise((resolve, reject) => {
		if(debugLevel>0){
			console.log(baseUrl+url);
		}
		if(debugLevel>1){
			console.log(data);
		}
        var postData = data;
        uni.request({
            url: baseUrl + url,
            data: postData,
            method: "GET",
            dataType: "JSONP",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=UTF-8",
            },
            success: function(res) {
				if(debugLevel>2){
					console.log(Base64.decode(res.data));
				}
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
	let tokenStr = getToken();
	data.token = tokenStr;
    var promise = new Promise((resolve, reject) => {
		if(debugLevel>0){
			console.log(baseUrl+url);
		}
		if(debugLevel>1){
			console.log(data);
		}
        var postData = data;
        uni.request({
            url: baseUrl + url,
            data: postData,
            method: "POST",
            dataType: "JSONP",
            header: {
                "content-type": "application/x-www-form-urlencoded",
            },
            success: function(res) {
				if(debugLevel>2){
					console.log(Base64.decode(res.data));
				}
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
	let tokenStr = getToken();
	if(debugLevel>0){
		console.log(baseUrl+opts.url);
	}
	if(debugLevel>1){
		console.log(data);
	}
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
        uni.request(httpDefaultOpts).then((res) => {
			resolve(Base64.decode(res[1].data));
        }).catch((response) => {
			reject(response)
        })
    })
    return promise;
};

//带Token请求
const httpTokenRequest = (opts, data) => {
	let tokenStr = getToken();
	if(debugLevel>0){
		console.log(baseUrl+opts.url);
	}
	if(debugLevel>1){
		console.log(data);
	}
	data.token = tokenStr;
    let httpDefaultOpts = {
        url: baseUrl+opts.url,
        data: data,
        method: opts.method,
        header: opts.method == 'get' ? {
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
    } : {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
        dataType: 'JSONP',
    }
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then((res) => {
            resolve(Base64.decode(res[1].data));
        }).catch((response) => {
            reject(response)
        })
    })
    return promise
};
 
export default {
	get,
	post,
	httpRequest,
	httpTokenRequest					
}
