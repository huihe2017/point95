import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select   } from 'antd';
import style from './index.css';
import axios from  '../../../../common/axiosConf'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ischange:true
        }
    }

    componentWillMount(){
        axios.get('http://192.168.100.105:8000/baseMsg', {params:{
            token:localStorage.getItem('token')
        }}).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log( values.birthday._d);
                axios.post('http://192.168.100.105:8000/editBaseMsg', {
                    nickname: values.nickname,
                    birthday: values.birthday._d,
                    gender: values.gender,
                    token:localStorage.getItem('token')
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        });
    }
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    changesta(e) {
        this.setState({
            ischange:false
        })

    }
    render() {
        const { getFieldDecorator,getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 10 },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择生日!' }],
        };
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        return (
            <div className={style.wlop}>
                <Form onSubmit={this.handleSubmit}>
                    <div className={style.exc}>
                        <Button type="primary" onClick={this.changesta.bind(this)}>
                            修改
                        </Button>
                    </div>

                <div className={style.float}>
                    <FormItem
                        label="昵称"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input placeholder="请输入你的姓名"  disabled={this.state.ischange}/>
                        )}
                    </FormItem>
                </div>

                <div className={style.float}>
                    <FormItem
                        {...formItemLayout}
                        label="性别"
                    >
                        {getFieldDecorator('gender', {
                            rules: [{ required: true, message: '请选择性别!' }],})(
                            <RadioGroup  disabled={this.state.ischange}>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </div>
                <div className={style.float}>
                    <FormItem
                        {...formItemLayout}
                        label="生日"
                    >
                        {getFieldDecorator('birthday', config)(
                            <DatePicker disabled={this.state.ischange}/>
                        )}
                    </FormItem>
                </div>
                    <FormItem
                        wrapperCol={{ span: 10, offset: 2 }}
                    >
                        <Button type="primary" htmlType="submit"  style={this.state.ischange?{display:'none'}:{display:'block'}} size='large'>提交</Button>
                    </FormItem>
                </Form>
            </div>

        );
    }
}

const WrapUserData = Form.create()(UserData);
export default WrapUserData;

/*
*record => <p>{record.url}</p>
* */