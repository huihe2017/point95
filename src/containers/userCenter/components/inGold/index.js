import React from 'react';
import style from "./index.css"
import Title from '../../../../components/title'
import {hashHistory} from 'react-router';
import {connect} from 'react-redux'
import { Form,Input,Button } from 'antd'

const data={
    depositCount: 0,
    inputState: {
        value:"",
        firstEdit: true,
        state: 'error'
    },
    rmb: 0,
    exchangeRate: 6.597000,
    choceBank:'',
    cla:'error',
    bankState:true,
    banks: [
        {
            name: '中国银行',
            code: '0',
            logo: './images/0.png'
        },
        {
            name: '中国银行',
            code: '1',
            logo: './images/1.png'
        },
        {
            name: '中国银行',
            code: '2',
            logo: './images/2.png'
        },
        {
            name: '中国银行',
            code: '3',
            logo: './images/3.png'
        },
        {
            name: '中国银行',
            code: '4',
            logo: './images/4.png'
        },
        {
            name: '中国银行',
            code: '5',
            logo: './images/5.png'
        },
        {
            name: '中国银行',
            code: '6',
            logo: './images/6.png'
        },
        {
            name: '中国银行',
            code: '7',
            logo: './images/7.png'
        },
        {
            name: '中国银行',
            code: '8',
            logo: './images/8.png'
        },
        {
            name: '中国银行',
            code: '9',
            logo: './images/9.png'
        },
        {
            name: '中国银行',
            code: '10',
            logo: './images/10.png'
        },
        {
            name: '中国银行',
            code: '11',
            logo: './images/11.png'
        },
        {
            name: '中国银行',
            code: '12',
            logo: './images/12.png'
        },
        {
            name: '中国银行',
            code: '13',
            logo: './images/13.png'
        },
        {
            name: '中国银行',
            code: '14',
            logo: './images/14.png'
        },
        {
            name: '中国银行',
            code: '15',
            logo: './images/15.png'
        },
        {
            name: '中国银行',
            code: '16',
            logo: './images/16.png'
        }

    ]}
const FormItem = Form.Item;

class InGold extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            choceBank:'',
            cla:'error',
            bankState:true,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err&&this.state.choceBank!='') {
                console.log('Received values of form: ', values);
            }
        });
    }



    getCode(e){
        this.setState({
            choceBank: e,
            bankState:false,
            cla:'default'
        },()=>{
            console.log(this.state.choceBank)
        })
    }

    mapItem(v,i){
        if(this.state.choceBank!==""){
            return (<li className={i==this.state.choceBank?style.active:""}
                onClick={this.getCode.bind(this,i)}
             title={v.name}>
                <img src={require(`${v.logo}`)}/>
            </li>)
        }else{
            return (<li onClick={this.getCode.bind(this,i)}
             title={v.name}>
                <img src={require(`${v.logo}`)}/>
            </li>)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={style.wrap}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                <div className={style.accountDepositView}>
                    <div className={style.accheader}>
                        <div className={style.title}>
                            <Title content={"/入金金额"} color={"#3b3d40"}/>
                            <span className={style.tttip}>
                            尚未开户，当钱可入金额：美元$ <span>
                            {5000-data.depositCount}
                        </span>
                        </span>
                        </div>
                        <div className={style.inputc}>
                            <div className={style.icon}>
                                <span className={style.dollar}>$</span>
                            </div>
                            <div className={style.putjin}>
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: '请输入金额!' }],
                                    })(
                                        <Input style={{height:40,lineHeight:40,width:260}}/>
                                    )}

                                </FormItem>
                            </div>

                        </div>
                        <div className={style.tip}>
                    <span className={style.ttip}>
                        合人民币：<span>{data.rmb}</span>
                    </span>
                            <span className={style.btip}>
                        当前汇率：美元兑人民币
                                <span>{data.exchangeRate}</span>
                    </span>
                        </div>
                    </div>
                    <div className={style.acccontent}>
                        <div className={style.btitle+" "+style[this.state.cla]}>
                            选择银行网银支付
                        </div>
                        <ul className={style.banklist}>
                            {
                                data.banks.map((v,i)=>{
                                    return this.mapItem(v,i)
                                })
                            }
                        </ul>
                        <span className={style.tipcontent}>
                        注：支持以上银行储蓄卡或信用卡，如有疑问请联系客服电话：400-9317-188
                    </span>
                        <div className={style.but}>
                            <FormItem>
                                <Button type="primary" htmlType="submit"  style={{width:160,height:40,marginTop:40,margin:'0 auto',fontSize:18,display:'block',color:'#fff'}}>确认入金</Button>
                            </FormItem>
                        </div>
                    </div>
                </div>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

InGold = connect(mapStateToProps, mapDispatchToProps)(InGold)

const WrappedInGold = Form.create()(InGold);

export default WrappedInGold;