import React from 'react';
import style from "./index.css"
import Title from '../../../../components/title/index'
import ContentList from '../../../../components/contentList/index'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import {Input, Select, Form, AutoComplete, Button, Row, Col,Upload} from 'antd';
import UploadImg from '../../../../components/uploadImg/index'
import Countdown from '../../../../components/countdown/index'
import {getAccounded, getBankList} from '../../../../actions/foreignExchange'
import {bindActionCreators} from 'redux'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const qh = [{
    value: ["中国大陆", "+86"],
    key: 1
}, {
    value: ["中国香港", "+886"],
    key: 2
}, {
    value: ["中国台湾", "+853"],
    key: 3,

}];
const bank = [{
    value: '中国人民银行',
    key: 1
}, {
    value: '中国建设银行',
    key: 2
}, {
    value: '中国农业银行',
    key: 3,

}];
const sheng = [{
    value: '陕西',
    key: 1
}, {
    value: '广东',
    key: 2
}, {
    value: '广西',
    key: 3,

}];
const city = [{
    value: '西安',
    key: 1
}, {
    value: '深圳',
    key: 2
}, {
    value: '广州',
    key: 3,

}];


class DetailUserMsg extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            checkNick: this.props.user.status === "2" ? true : false,
            dynamics: {
                state:'waiting'
            }
        }
    }


    statecontent(e){
        if(e=="complete"){
            return <span style={{color:"#5262ff"}}>
                已通过审核，可出金
            </span>
        }else if(e=="unComplete"){
            return <span style={{color:"#f59294"}}>
                开户未完成，入金限额5000
            </span>
        }else if(e=="waiting"){
            return <span style={{color:"#fab001"}}>
                审核中，已提升入金额度
            </span>
        }else if(e=="imperfection"){
            return <span style={{color:"#656b6f"}}>
                资料不完善，如有疑问请联系客服：400-8530-050
            </span>
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.getAccounded({
                    data: this.state
                }, (errorText) => {
                    if (errorText) {
                    } else {
                        this.setState({checkNick:true})
                    }
                })
            }
        });
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    getBankList(data) {
        let dom = []
        for (let s in data) {
            dom.push(<Option value={s}>{data[s]}</Option>)
        }
        return dom
    }

    componentDidMount() {
        this.props.getBankList()
        this.props.form.setFieldsValue({
            email: this.props.user.email,
            idCard: this.props.user.id,
            userName: this.props.user.realName,
            address: this.props.user.address,
            setNumber: this.props.user.bankNo,
            selectBank: this.props.user.bankCode
        });
    }


    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        const {autoCompleteResult} = this.state;

        const errorsp = getFieldError('phone');

        const errorsss = getFieldError('selectsheng');
        const errorssc = getFieldError('selectCity');

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
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
            <Select disabled={this.state.checkNick} style={{width: 60}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className={style.partreg}>
                    <div className={style.state}>
                        {
                            this.state.checkNick?<div className={style.statec}>
                                <img src={require('./images/'+this.state.dynamics.state+'.png')} alt=""/>
                                {
                                    this.statecontent(this.state.dynamics.state)
                                }

                            </div>:''

                        }
                    </div>
                    <div className={style.personal}>
                        <Title content={"/联络人信息"} color={"#5262ff"}/>
                        <div className={style.perimport}>
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
                                <FormItem>
                                    {(getFieldError('email')) ? <div onChange={() => {
                                        }} className={style.errors}>请输入正确格式邮箱【选填】</div> :
                                        <div className={style.right}>请输入正确格式邮箱【选填】</div>}
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            required: this.state.checkNick,
                                            initialValue: '36363@ww.com',
                                            pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
                                        }],
                                    })(
                                        <Input className={style.input} disabled={this.state.checkNick}
                                               placeholder="邮箱" onChange={(e) => {
                                            this.setState({email: e.target.value})
                                        }}/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem
                                    hasFeedback
                                >{(getFieldError('idCard')) ? <div className={style.errors}>
                                        请填写15位一代身份证号或18位二代身份证号，同一个身份证号只能绑定一个海豚汇账号【必填】</div> :
                                    <div className={style.right}>
                                        请填写15位一代身份证号或18位二代身份证号，同一个身份证号只能绑定一个海豚汇账号【必填】</div>}
                                    {getFieldDecorator('idCard', {
                                        rules: [{
                                            required: true,
                                            whitespace: true,
                                            initialValue: '36363@ww.com',
                                            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                                        }],
                                    })(<Input
                                        className={style.input} disabled={this.state.checkNick} placeholder="身份证号"
                                        onChange={(e) => {
                                            this.setState({id: e.target.value})
                                        }}/>)}</FormItem>
                            </div>

                            <div className={style.percontent}>
                                <FormItem hasFeedback>
                                    {(getFieldError('userName')) ?
                                        <div className={style.errors}>姓名需与身份证姓名一致【必填】
                                        </div> :
                                        <div className={style.right}>姓名需与身份证姓名一致【必填】</div>}
                                    {getFieldDecorator('userName', {
                                        rules: [{
                                            required: true, pattern: /^([a-zA-Z\u4e00-\u9fa5\·]{1,10})$/
                                        }]
                                    })(
                                        <Input
                                            className={style.input} disabled={this.state.checkNick} placeholder="姓名"
                                            onChange={(e) => {
                                                this.setState({realName: e.target.value})
                                            }}/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem>
                                    {(getFieldError('address')) ? <div className={style.errors}>住址需与身份证住址一致【选填】</div> :
                                        <div className={style.right}>住址需与身份证住址一致【选填】</div>}
                                    {getFieldDecorator('address', {
                                        rules: [{
                                            required: this.state.checkNick,
                                            message: 'Please input your nickname',
                                        }],
                                    })(
                                        <Input
                                            className={style.input} disabled={this.state.checkNick} placeholder="住址"
                                            onChange={(e) => {
                                                this.setState({address: e.target.value})
                                            }}/>
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
                                    {
                                        this.state.checkNick?
                                            <Upload
                                                className="avatar-uploader"
                                                name="avatar"
                                                showUploadList={false}
                                                action="//jsonplaceholder.typicode.com/posts/"
                                                onChange={this.handleChange}
                                                disabled={this.state.checkNick}
                                                style={{width:'220',height:'150',position: 'relative',overflow:'hidden',}}
                                            >
                                                {
                                                    <div className={style.unimg}>
                                                        <img  src={'http://47.91.236.245:4030/' + this.props.user.frontImg} alt=""  />
                                                    </div>

                                                }
                                            </Upload>:<UploadImg dis={this.state.checkNick} file={this.props.user.frontImg && [{
                                                uid: -1,
                                                name: 'xxx.png',
                                                status: 'done',
                                                url: 'http://47.91.236.245:4030/' + this.props.user.frontImg
                                            }]} onChange={(url) => {
                                                this.setState({frontImg: url})
                                            }} tip="点击上传人像面"/>
                                    }

                                </div>
                                <div className={style.rupingbox}>
                                    {
                                        this.state.checkNick?
                                            <Upload
                                            className="avatar-uploader"
                                            name="avatar"
                                            showUploadList={false}
                                            action="//jsonplaceholder.typicode.com/posts/"
                                            onChange={this.handleChange}
                                            disabled={this.state.checkNick}
                                            style={{width:'220',height:'150',position: 'relative',overflow:'hidden'}}
                                        >
                                            {
                                                <div className={style.unimg}>
                                                    <img  src={'http://47.91.236.245:4030/' + this.props.user.reverseImg} alt=""  />
                                                </div>
                                            }
                                        </Upload>:<UploadImg dis={this.state.checkNick} file={this.props.user.reverseImg && [{
                                                    uid: -1,
                                                    name: 'xxx.png',
                                                    status: 'done',
                                                    url: 'http://47.91.236.245:4030/' + this.props.user.reverseImg
                                                }]} onChange={(url) => {
                                                this.setState({reverseImg: url})
                                            }} tip="点击上传国徽面"/>
                                    }


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
                                    {(getFieldError('setNumber')) ?
                                        <div className={style.errors}>结算卡号需与上传银行卡信息一致【必填】</div> :
                                        <div className={style.right}>结算卡号需与上传银行卡信息一致【必填】</div>}
                                    {getFieldDecorator('setNumber', {
                                        rules: [{required: true, whitespace: true}],
                                    })(
                                        <Input className={style.input} disabled={this.state.checkNick}
                                               placeholder="结算卡号" onChange={(e) => {
                                            this.setState({bankNo: e.target.value})
                                        }}/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={style.percontent}>
                                <FormItem

                                    hasFeedback
                                >
                                    {(getFieldError('selectBank')) ? <div className={style.errors}>文案待定</div> :
                                        <div className={style.right}>文案待定</div>}
                                    {getFieldDecorator('selectBank', {
                                        rules: [
                                            {required: true, message: 'Please select your country!'}
                                        ],
                                    })(
                                        <Select placeholder="请选择银行" size={'large'} disabled={this.state.checkNick}
                                                style={{width: '100%', height: 40, lineHeight: 40}}
                                                onChange={this.handleChange}>
                                            {this.getBankList(this.props.foreignExchange.outGoldBanks)}

                                        </Select>
                                    )}
                                </FormItem>

                            </div>
                            <div className={style.percontent}>
                                <div className={style.selphone}>
                                    <div className={style.selbank}>
                                        {(getFieldError('selectsheng')) || (getFieldError('selectCity')) || (getFieldError('setKaihuhang')) ?
                                            <div className={style.errors}>文案待定</div> :
                                            <div className={style.right}>文案待定</div>}
                                        <div className={style.kaihuhan}>
                                            <FormItem hasFeedback>

                                                {getFieldDecorator('selectsheng', {
                                                    rules: [
                                                        {required: true, message: 'Please select your country!'},
                                                    ],
                                                })(
                                                    <Select placeholder="请选择省份" size={'large'} disabled={this.state.checkNick}
                                                            style={{width: '100%', height: 40, lineHeight: 40}}
                                                            onChange={this.handleChange}>
                                                        {
                                                            sheng.map((v, i) => {
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
                                                        {required: true, message: 'Please select your country!'},
                                                    ],
                                                })(
                                                    <Select placeholder="请选择城市" size={'large'} disabled={this.state.checkNick}
                                                            style={{width: '100%', height: 40, lineHeight: 40}}
                                                            onChange={this.handleChange}>
                                                        {
                                                            city.map((v, i) => {
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
                                                        {required: true, message: 'Please select your country!'},
                                                    ],
                                                })(
                                                    <Input className={style.input} disabled={this.state.checkNick} size="large" placeholder="开户行"/>)}
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
                                    {
                                        this.state.checkNick?
                                            <Upload
                                                className="avatar-uploader"
                                                name="avatar"
                                                showUploadList={false}
                                                action="//jsonplaceholder.typicode.com/posts/"
                                                onChange={this.handleChange}
                                                disabled={this.state.checkNick}
                                                style={{width:'220',height:'150',position: 'relative',overflow:'hidden'}}
                                            >
                                                {
                                                    <div className={style.unimg}>
                                                        <img  src={'http://47.91.236.245:4030/' + this.props.user.bankFrontImg} alt=""  />
                                                    </div>
                                                }
                                            </Upload>:<UploadImg dis={this.state.checkNick} file={this.props.user.bankFrontImg && [{
                                                uid: -1,
                                                name: 'xxx.png',
                                                status: 'done',
                                                url: 'http://47.91.236.245:4030/' + this.props.user.bankFrontImg
                                            }]} onChange={(url) => {
                                                this.setState({bankFrontImg: url})
                                            }} tip="点击上传银行卡正面"/>
                                    }

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
                        <FormItem>
                            <Button type="primary" htmlType="submit" disabled={this.state.checkNick} style={{
                                width: 160,
                                height: 40,
                                marginTop: 40,
                                margin: '0 auto',
                                fontSize: 18,
                                display: 'block',
                            }}>确认</Button>
                        </FormItem>
                    </div>
                </div>
            </Form>
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

DetailUserMsg = connect(mapStateToProps, mapDispatchToProps)(DetailUserMsg);
const WrappedDetailUserMsg = Form.create()(DetailUserMsg)
export default WrappedDetailUserMsg;