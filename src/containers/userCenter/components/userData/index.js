import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select,message   } from 'antd';
import style from './index.css';
import axios from  '../../../../common/axiosConf';
import moment from 'moment';
import 'moment/locale/zh-cn';
import webLink from '../../../../common/webLink'
moment.locale('zh-cn');
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ischange:true,
            birthday: "",
            gender: "",
            nickname: ""
        }
    }

    componentWillMount(){
        var that=this;
        //获取自处资料的信息
        axios.get(`${webLink}/baseMsg`, {params:{
            token:localStorage.getItem('token')
        }}).then(function (response) {
            if (response.data.code === 0) {
                message.error(response.data.message);
            }
            that.setState({
                birthday: response.data.result[0].birthday||'1970.1.1',
                gender: response.data.result[0].gender,
                nickname: response.data.result[0].nickname,
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    dataChange(date){
        console.log(date)
    }

    //点击提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            var that=this;
            if (!err) {

                //修改基础资料的提交
                axios.post(`${webLink}/editBaseMsg`, {
                    nickname: values.nickname,
                    birthday: values.birthday._d,
                    gender: values.gender,
                    token:localStorage.getItem('token')
                }).then(function (response) {
                    if (response.data.code === 1) {
                        message.success('修改成功');

                        that.setState({
                            ischange:true,
                        })
                    }else if (response.data.code === 0) {
                        message.error(response.data.message);
                    }
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
    //点击修改
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
        const dateFormat = 'YYYY/MM/DD';

        const config = {
            initialValue: moment(this.state.birthday, dateFormat),
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
                            initialValue: this.state.nickname,
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input   placeholder="请输入你的姓名"  disabled={this.state.ischange}/>
                        )}
                    </FormItem>
                </div>

                <div className={style.float}>
                    <FormItem
                        {...formItemLayout}
                        label="性别"
                    >
                        {getFieldDecorator('gender', {
                            initialValue: this.state.gender,
                            setFieldsValue:1,
                            rules: [{ required: true, message: '请选择性别!' }],})(
                            <RadioGroup   disabled={this.state.ischange}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
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
                            <DatePicker onChange={this.dataChange.bind(this)}  disabled={this.state.ischange}/>
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