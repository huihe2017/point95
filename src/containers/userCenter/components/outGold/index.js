import React from 'react';
import style from "./index.css"
import Title from '../../../../components/title/index'
import ContentList from '../../../../components/contentList/index'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import { Input,Button,Form } from 'antd'

const FormItem = Form.Item;
const data={
    isShowFind:false,
    withdrawInput:{
        firstEdit:true,
        state:'error',
        value:''
    },
    rmb: 0,
    exchangeRate: 6.597000,
    withdrawMsg:{
        card:'2634654653737347',
        name:'工商银行'
    },
    isShowHand:false,
    allWithdraw:2546,
    pwd:{
        firstEdit:true,
        state:'error',
        value:''
    }
}

class OutGold extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {

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

    render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <div className={style.accountWithdrawView}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <div className={style.tcontent}>
                    <div className={style.tctitle}>
                        <Title content="/出金金额" color="#3b3d40"/>
                    </div>
                    <div className={style.tccontent}>
                        <div className={style.input}>
                            <div className={style.icon}>
                                <span className={style.dollar}>$</span>
                            </div>
                            <FormItem>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                })(
                                    <Input style={{height:40,lineHeight:40}} placeholder='请输入出金金额，最低50美金'/>
                                )}

                            </FormItem>
                        </div>
                        <div className={style.withdraw}>
                            <Button type="primary" ghost  className={style.butt} >提交申请</Button>
                        </div>
                        <div className={style.ttip}>
                            <ul className={style.tltip}>
                                <li>
                                    合人民币：
                                    <span>
                                        {data.rmb}
                                    </span>
                                </li>

                                <li>
                                    当前汇率：美元兑人民币
                                    <span>
                                        &nbsp;{data.exchangeRate}
                                    </span>
                                </li>
                            </ul>
                            <ul className={style.ttbank}>
                                <li>
                                    出金账户
                                </li>
                                <li>
                                    {data.withdrawMsg.name}&nbsp;
                                </li>
                                <li>
                                    {data.withdrawMsg.card}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={style.bcontent}>
                    <div className={style.tctitle}>
                        <Title content="/支付密码" color="#3b3d40"/>
                    </div>
                    <div className={style.tccontent}>
                        <div className={style.input}>
                            <FormItem>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                })(
                                    <Input type={'password'} style={{height:40,lineHeight:40}} placeholder='请输入支付密码'/>
                                )}

                            </FormItem>
                        </div>
                        <div className={style.ttip}>
                            <ul className={style.tltip}>
                                <li>
                                    <a href="javascript:void (0)" onClick={()=>{data.toFind(false)}}>
                                        忘记密码？
                                    </a>
                                </li>
                                <li>
                                    注：支付密码与登陆密码一致，出金过程中遇到问题需要帮助，请联系客服电话400-8530-050

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={style.but}>
                    <FormItem>
                        <Button type="primary" htmlType="submit"  style={{width:160,height:40,marginTop:40,margin:'0 auto',fontSize:18,display:'block',color:'#fff'}}>确认出金</Button>
                    </FormItem>
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

OutGold = connect(mapStateToProps, mapDispatchToProps)(OutGold)

const WrappedOutGold = Form.create()(OutGold);

export default WrappedOutGold;