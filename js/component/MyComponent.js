/**
 * Created by lizhj on 2017/7/26.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

export default class MyComponent extends Component {
    //PropType声明
    static propTypes = {
        sampleProp: PropTypes.bool,
        data: PropTypes.object,
    };

    //默认属性
    static defaultProps = {
        data: null,
        sampleProp: true
    };

    //如果需要定义static方法，放在这里
    static staticMethod() {
    }

    //constructor方法
    constructor(props) {
        super(props);
        this.state = {
            sampleState: this.props.sampleProp
        };
    }

    //生命周期方法（按需添加）
    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    shouldComponentUpdate() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    //准备公开给外部调用的方法
    publicMethod() {
    }

    //点击事件回调
    exampleOnPress = () => {
        console.log('exampleOnPress');
    };

    //子组件render方法
    renderSubComponent = () => <Text style={styles.exampleText}>This is the sample component</Text>;

    //本组件render方法
    render() {
        if (!this.state.sampleState) {
            return (
                <TouchableOpacity onPress={this.exampleOnPress}>
                    <View >
                        {this.renderSubComponent()}
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    exampleText: {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
});