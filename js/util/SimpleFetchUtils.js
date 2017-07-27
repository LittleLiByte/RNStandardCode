/**
 * 网络请求Fetch简单封装
 * Created by lizhj on 2017/7/26.
 */
import {Component} from 'react';

export default class SimpleFetchUtils extends Component {
    /**
     *  get请求
     * @param url 请求地址
     * @param headers 请求头 通过headers.append方法添加
     * @param successCallback 成功响应回调
     * @param errorCallback 失败响应回调
     * @returns {Promise.<void>}
     */
    static async sendGet(url, headers, successCallback, errorCallback) {
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers,
            });
            let data = await response.json();
            successCallback(data);
        } catch (e) {
            errorCallback(e);
        }
    }

    /**
     * post请求
     * @param url 请求地址
     * @param headers 请求头 通过headers.append方法添加
     * @param requestData 请求body
     * @param successCallback 成功响应回调
     * @param errorCallback 失败响应回调
     * @returns {Promise.<void>}
     */
    static async sendPost(url, headers, requestData, successCallback, errorCallback) {
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(requestData)
            });
            let data = await response.json();
            successCallback(data);
        } catch (e) {
            errorCallback(e);
        }
    }
}