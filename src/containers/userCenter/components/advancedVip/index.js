import React from 'react';
import { Form,Radio,Input,DatePicker,Button,Icon,Select,Upload   } from 'antd';
import style from './index.css';
import UploadImg from '../../../../components/uploadImg'




class UserData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ischange:true,
            url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            url1:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            url2:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            dis:true
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
    click(){
        console.log(this.state)
    }
    render() {

        const { getFieldDecorator,getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择生日!' }],
        };
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const file=[ {uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: this.state.url}];
        const file1=[ {uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: this.state.url1}];
        const file2=[ {uid: -1,
            name: 'xxx.png',
            status: 'done',
            url:this.state.url2}];



        return (
            <div className={style.wlop}>
                <span style={this.state.dis?{color:'blue'}:{color:'#ccc'}} className={style.showstate}>{this.state.dis?'审核中':'未审核'}</span><br/>
                <div className={style.idbox}>
                    <span  className={style.id}>护照</span>
                    <div className={style.lupingbox}>
                        <UploadImg
                            file={file.length==1?file:[]}
                            onChange={(url) => {this.setState({url: url})}}
                            tip="点击上传护照面"
                            dis={this.state.dis}
                        />
                    </div>
                </div>


                <Button type="primary" htmlType="submit" onClick={this.click.bind(this)} disabled={this.state.dis}  size='large'>提交</Button>
            </div>
        )
    }
}

const WrapUserData = Form.create()(UserData);
export default WrapUserData;