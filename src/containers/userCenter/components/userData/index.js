import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select   } from 'antd';
import style from './index.css';

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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                        label="姓名"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 10 }}
                    >
                        {getFieldDecorator('note', {
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
                        hasFeedback
                    >
                        {getFieldDecorator('select', {
                            rules: [
                                { required: true, message: '请选择性别!' },
                            ],
                        })(
                            <Select placeholder="请选择你的性别"  disabled={this.state.ischange}>
                                <Option value="man">男</Option>
                                <Option value="woman">女</Option>
                            </Select>
                        )}
                    </FormItem>
                </div>
                <div className={style.float}>
                    <FormItem
                        {...formItemLayout}
                        label="生日"
                    >
                        {getFieldDecorator('date-picker', config)(
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