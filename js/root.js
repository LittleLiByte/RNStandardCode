/**
 * Created by lizhj on 2017/7/26.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import SimpleFetchUtils from './util/SimpleFetchUtils';
import MyComponent from './component/MyComponent';

export default class RootComponent extends Component {
    getTest = () => {
        //  请求头添加示例
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        SimpleFetchUtils.sendGet('http://gc.ditu.aliyun.com/geocoding?a=广州市', null).then((data, error) => {
            if (data)
                console.log(data);
            else
                console.log(error);
        });
    };

    postTest = () => {
        SimpleFetchUtils.sendPost('http://gc.ditu.aliyun.com/geocoding', null, {a: '广州市'},
            (data) => {
                console.log(data);
            },
            (error) => {
                console.log('error=' + error);
            },
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor="rgb(210,260,260)"
                    style={{padding: 10, marginTop: 10, borderRadius: 5,}}
                    onPress={this.getTest}
                >
                    <Text >get请求</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    underlayColor="rgb(210,260,260)"
                    style={{padding: 10, marginTop: 10, borderRadius: 5,}}
                    onPress={this.postTest}
                >
                    <Text >post请求</Text>
                </TouchableHighlight>
                <MyComponent />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});
