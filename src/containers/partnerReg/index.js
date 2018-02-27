import React from "react";
import style from "./index.css";
import Title from "../../components/title/index";
import { Input,Select,Form,AutoComplete,Button } from 'antd';
import UploadImg from '../../components/uploadImg'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'
import Countdown from '../../components/countdown'
import {getAccounded, getBankList} from '../../actions/foreignExchange'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// import Personmsg from "./personalMsg/index";
// import Bannkmsg from "./bankMsg/index";
// import Companymsg from "./companyMsg/index";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const qh=[{
    value:["中国大陆","+86"],
    key:1
}, {
    value:["中国香港","+886"],
    key:2
}, {
    value:["中国台湾","+853"],
    key:3,

}];
const bank=[{
    value:'中国人民银行',
    key:1
}, {
    value:'中国建设银行',
    key:2
}, {
    value:'中国农业银行',
    key:3,

}];
const sheng=[{
    value:'陕西',
    key:1
}, {
    value:'广东',
    key:2
}, {
    value:'广西',
    key:3,

}];
const city=[{
    value:'西安',
    key:1
}, {
    value:'深圳',
    key:2
}, {
    value:'广州',
    key:3,

}];
const file=[ {uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}]

function handleChange(value) {
    console.log(`selected ${value}`);
}

class PartnerReg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            checkNick: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator,getFieldError } = this.props.form;
        console.log(getFieldDecorator)
        const { autoCompleteResult } = this.state;





        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <div className={style.wlop}>
                <Form onSubmit={this.handleSubmit}>
                    <Header/>
                    <Crumb position={[{href:'#/partnerEntry',pos:'合伙人入口'},{pos:'合伙人注册'}]}/>
                    <div className={style.toolbar}>
                        <ToolBar/>
                    </div>
                    <div className={style.partreg}>
                        <div className={style.avatar}>
                            <input type="file"/>
                        </div>
                        <div className={style.personal}>
                            <Title content={"/联络人信息【必填】"} color={"#5262ff"}/>
                            <div className={style.perimport}>
                                <div className={style.perselphone}>
                                    <div className={style.selphone}>
                                        <div className={style.qh}>
                                            <Select defaultValue="+86" size={'large'} style={{ width: 100,height:40,lineHeight:40,marginTop:40 }} onChange={handleChange} dropdownStyle={{width:'520'}}>
                                                {
                                                    qh.map((v,i)=>{
                                                        console.log(v.value[1]);
                                                        return (<Option value={v.value[1]}>{v.value[1]}</Option>)

                                                    })
                                                }
                                            </Select>
                                        </div>
                                        <div className={style.phone}>
                                            <FormItem>
                                                {(getFieldError('phone')) ? <div className={style.errorsp} >文案待定</div> :<div className={style.rightp}>文案待定</div>}                                         {getFieldDecorator('phone', {
                                                rules: [{ required: true, message: 'Please input your phone number!',pattern:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/ }],
                                            })(
                                                <Input className={style.inputp} placeholder="手机号"/>
                                            )}
                                            </FormItem>

                                        </div>
                                    </div>
                                </div>
                                <div className={style.percontent} hidden={this.state.checkNick ? 'hidden' : ''}>
                                    <FormItem>
                                        {(getFieldError('yanzhegnma')) ?
                                            <div className={style.errors}>结算卡号需与上传银行卡信息一致【必填】</div> :
                                            <div className={style.right}>结算卡号需与上传银行卡信息一致【必填】</div>}
                                        {getFieldDecorator('yanzhegnma', {
                                            rules: [{
                                                required: true, pattern: /^[0-9]*$/
                                            }]
                                        })(
                                            <Countdown
                                                beforeClick={() => {
                                                    return true
                                                }}
                                                phone={this.props.user.userName}
                                                business='VERIFICATION'
                                                failCallback={() => {
                                                }}
                                                type="big"
                                                onChange={(e) => {
                                                    this.setState({code: e.target.value})
                                                }}
                                            />
                                        )}


                                    </FormItem>
                                </div>
                                <div className={style.percontent}>
                                    <FormItem hasFeedback>
                                        {(getFieldError('email')) ? <div className={style.errors} >联络人姓名需与身份证姓名一致</div> :<div className={style.right}>联络人姓名需与身份证姓名一致</div>}
                                        {getFieldDecorator('email', {
                                            rules: [ {
                                                required: true,pattern:/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/}]
                                        })(
                                            <Input className={style.input} placeholder="邮箱"/>
                                        )}
                                    </FormItem>
                                </div>
                                <div className={style.percontent}>
                                    <FormItem
                                        //{...formItemLayout}
                                        hasFeedback
                                    >
                                        {(getFieldError('userName')) ? <div className={style.errors} >文案待定</div> :<div className={style.right}>文案待定</div>}
                                        {getFieldDecorator('userName', {rules: [ {required: true, message: '请输入账户名!', whitespace: true,pattern:  /^([a-zA-Z\u4e00-\u9fa5\·]{1,10})$/ }],
                                        })(
                                            <div>
                                                <Input className={style.input} placeholder="账户名"/></div>)}
                                    </FormItem>
                                </div>
                                <div className={style.percontent}>
                                    <FormItem
                                        //{...formItemLayout}
                                        hasFeedback
                                    >
                                        {(getFieldError('nickname')) ? <div className={style.errors} >联络人姓名需与身份证姓名一致</div> :<div className={style.right}>联络人姓名需与身份证姓名一致</div>}
                                        {getFieldDecorator('nickname', {
                                            rules: [{ required: true, message: '请输入联络人信息', whitespace: true,pattern:  /^([a-zA-Z\u4e00-\u9fa5\·]{1,10})$/ }],})(<Input className={style.input} placeholder="联络人"/>)}
                                    </FormItem>
                                </div>

                                <div className={style.percontent}>
                                    <FormItem
                                        //{...formItemLayout}
                                        hasFeedback
                                    >
                                        {(getFieldError('idCard')) ? <div className={style.errors} >请填写15位一代身份证号或18位二代身份证号，同一个身份证号只能绑定一个海豚汇账号</div> :<div className={style.right}>请填写15位一代身份证号或18位二代身份证号，同一个身份证号只能绑定一个海豚汇账号</div>}
                                        {getFieldDecorator('idCard', {rules: [ {required: true, whitespace: true,pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ }],})(<Input className={style.input} placeholder="身份证号"/>)}</FormItem>
                                </div>
                            </div>
                            <div className={style.upfile}>
                            <span className={style.pertip}>
                                上传身份证照片
                            </span>
                                <div className={style.imgfile}>
                                    <div className={style.lupingbox}>
                                        <UploadImg tip="点击上传人像面" file=''/>
                                    </div>
                                    <div className={style.rupingbox}>
                                        <UploadImg tip="点击上传国徽面" file={file}/>
                                    </div>
                                </div>
                                <div className={style.uprequire}>
                                    <p>
                                        1.文件为数码照片，请勿进行美化和修改，以免申请失败 <br/>
                                        2.上传文件格式支持png，jpg和bmp <br/>
                                        3.文件大小不超过3MB，文件尺寸最小为200px*150px
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={style.bankmsg}>
                            <Title content={"/银行信息【必填】"} color={"#5262ff"}/>
                            <div className={style.perimport}>
                                <div className={style.percontent}>
                                    <FormItem
                                        //{...formItemLayout}
                                        hasFeedback
                                    >
                                        {(getFieldError('setAccount')) ? <div className={style.errors} >文案待定</div> :<div className={style.right}>文案待定</div>}
                                        {getFieldDecorator('setAccount', {rules: [ {required: true, whitespace: true , pattern:  /^([a-zA-Z\u4e00-\u9fa5\·]{1,10})$/}],
                                        })(<div>
                                            <Input className={style.input} placeholder="结算户名"/></div>)}
                                    </FormItem>

                                </div>
                                <div className={style.percontent}>
                                    <FormItem
                                        //{...formItemLayout}
                                        hasFeedback
                                    >
                                        {(getFieldError('setNumber')) ? <div className={style.errors} >文案待定</div> :<div className={style.right}>文案待定</div>}
                                        {getFieldDecorator('setNumber', {rules: [ {required: true, whitespace: true,pattern:  /^([0-9]{16,19})$/ }],})(<Input className={style.input} placeholder="结算卡号"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.percontent}>
                                    <FormItem

                                        hasFeedback
                                    >
                                        {(getFieldError('selectBank')) ? <div className={style.errors} >文案待定</div> :<div className={style.right}>文案待定</div>}
                                        {getFieldDecorator('selectBank', {
                                            rules: [
                                                { required: true, message: 'Please select your country!' }
                                            ],
                                        })(

                                                <Select placeholder="请选择银行" size={'large'} style={{width:'100%',height:40,lineHeight:40 }} onChange={handleChange}>
                                                {bank.map((v,i)=>{
                                                        console.log(v.value);
                                                        return (<Option value={v.value}>{v.value}</Option>)
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>

                                </div>
                                <div className={style.percontent}>
                                    <div className={style.selphone}>
                                        <div className={style.selbank}>
                                            {(getFieldError('selectsheng'))||(getFieldError('selectCity'))||(getFieldError('setKaihuhang')) ? <div className={style.errors} >文案待定</div> :<div className={style.right}>文案待定</div>}
                                            <div className={style.kaihuhan}>
                                                <FormItem hasFeedback>

                                                    {getFieldDecorator('selectsheng', {
                                                        rules: [
                                                            { required: true, message: 'Please select your country!' },
                                                        ],
                                                    })(
                                                        <Select placeholder="请选择省份" size={'large'} style={{width:'100%',height:40,lineHeight:40 }} onChange={handleChange}>
                                                            {
                                                                sheng.map((v,i)=>{
                                                                    console.log(v.value);
                                                                    return (<Option value={v.value}>{v.value}</Option>)
                                                                })
                                                            }
                                                        </Select>)}

                                                </FormItem>
                                            </div>
                                            <div className={style.kaihuhang}>
                                                <FormItem hasFeedback>
                                                    {getFieldDecorator('selectCity', {
                                                        rules: [
                                                            { required: true, message: 'Please select your country!' },
                                                        ],
                                                    })(
                                                        <Select placeholder="请选择城市" size={'large'} style={{width:'100%',height:40,lineHeight:40 }} onChange={handleChange}>
                                                            {
                                                                city.map((v,i)=>{
                                                                    console.log(v.value);
                                                                    return (<Option value={v.value}>{v.value}</Option>)

                                                                })
                                                            }
                                                        </Select>)}

                                                </FormItem>
                                            </div>
                                            <div className={style.kaihuhang}>
                                                <FormItem hasFeedback>
                                                    {getFieldDecorator('setKaihuhang', {
                                                        rules: [
                                                            { required: true, message: 'Please select your country!' },
                                                        ],
                                                    })(
                                                        <Input className={style.input} size="large" placeholder="开户行"/>)}
                                                </FormItem>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.upfile}>
                            <span className={style.pertip}>
                                上传银行卡照片
                            </span>
                                <div className={style.imgfile}>
                                    <div className={style.lupingbox}>
                                        <UploadImg tip="点击上传银行卡正面" file=''/>
                                    </div>

                                </div>
                                <div className={style.uprequire}>
                                    <p>
                                        1.文件为数码照片，请勿进行美化和修改，以免申请失败 <br/>
                                        2.上传文件格式支持png，jpg和bmp <br/>
                                        3.文件大小不超过3MB，文件尺寸最小为200px*150px
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={style.companymsg}>
                            <Title content={"/公司信息【选填】"} color={"#5262ff"}/>
                            <div className={style.perimport}>
                                <div className={style.percontent}>
                                    <FormItem >
                                        <div className={style.right}>联络人姓名需与身份证姓名一致</div>
                                        {getFieldDecorator('Companyname', {
                                            rules: [{
                                                required: this.state.checkNick,
                                                message: 'Please input your nickname',
                                            }],
                                        })(

                                                <Input className={style.input} placeholder="邮箱"/>
                                        )}
                                    </FormItem>

                                </div>
                                <div className={style.percontent}>
                                    <FormItem >
                                        <div className={style.right}>联络人姓名需与身份证姓名一致</div>
                                        {getFieldDecorator('Companyname', {
                                            rules: [{
                                                required: this.state.checkNick,
                                                message: 'Please input your nickname',
                                            }],
                                        })(<Input  className={style.input} placeholder="公司地址"/>)}
                                    </FormItem>
                                </div>
                                <div className={style.percontent}>
                                    <FormItem >
                                        <div className={style.right}>联络人姓名需与身份证姓名一致</div>
                                        {getFieldDecorator('Companyname', {
                                            rules: [{
                                                required: this.state.checkNick,
                                                message: 'Please input your nickname',
                                            }],
                                        })(<Input className={style.input} placeholder="统一公司引用代码"/>)}
                                    </FormItem>

                                </div>
                                <div className={style.percontent}>
                                    <FormItem >
                                        <div className={style.right}>联络人姓名需与身份证姓名一致</div>
                                        {getFieldDecorator('Companyname', {
                                            rules: [{
                                                required: this.state.checkNick,
                                                message: 'Please input your nickname',
                                            }],
                                        })(<Input className={style.input} placeholder="组织机构代码"/>
                                        )}
                                    </FormItem>

                                </div>
                                <div className={style.percontent}>
                                    <FormItem >
                                        <div className={style.right}>联络人姓名需与身份证姓名一致</div>
                                        {getFieldDecorator('Companyname', {
                                            rules: [{
                                                required: this.state.checkNick,
                                                message: 'Please input your nickname',
                                            }],
                                        })(
                                            <Input className={style.input} placeholder="法人"/>
                                        )}
                                    </FormItem>

                                </div>

                            </div>
                            <div className={style.upfile}>
                            <span className={style.pertip}>
                                上传身份证照片
                            </span>
                                <div className={style.imgfile}>
                                    <div className={style.lupingbox}>
                                        <UploadImg tip="点击上传人像面" file={file}/>
                                    </div>
                                </div>
                                <div className={style.uprequire}>
                                    <p>
                                        1.文件为数码照片，请勿进行美化和修改，以免申请失败 <br/>
                                        2.上传文件格式支持png，jpg和bmp <br/>
                                        3.文件大小不超过3MB，文件尺寸最小为200px*150px
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={style.prfooter}>
                                <span className={style.protocol}>
                        提交申请即表示您已阅读并同意 <a href="javascript:void (0);">《海豚汇服务协议》</a>
                    </span>
                            <Button type="primary" ghost htmlType="submit" className={style.but} style={{ display:'block',width: 200, height: 60, margin: '0 auto', marginTop: 120,fontSize: 20}}>提交申请</Button>
                        </div>
                    </div>
                    <Footer/>
                </Form>
            </div>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user,
        foreignExchange: state.foreignExchange
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAccounded: bindActionCreators(getAccounded, dispatch),
        getBankList: bindActionCreators(getBankList, dispatch)
    }
}

PartnerReg = connect(mapStateToProps, mapDispatchToProps)(PartnerReg);
const WrappedPartnerReg = Form.create()(PartnerReg)

export default WrappedPartnerReg;