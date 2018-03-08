import React from 'react';
import style from "./index.css"
import { Button, Table, Icon,Upload,Badge, Menu, Dropdown, Modal,Popconfirm} from 'antd'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import ContentList from '../../components/contentList'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'
import axios from  '../../common/axiosConf';

const ButtonGroup = Button.Group;



const data = [
    {
        key: 1,
        nickname: 'Sakura',
        phone: 23,
        createdAt: '初级审核',
        frontCard:"https://wx2.sinaimg.cn/mw1024/6b8c14f8gy1forofhihkwj218q0s0n50.jpg",
        backCard:"https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg"
        ,
        handCard:"https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg"
    }
];

class PartnerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            previewVisible: false,
            isBase:true,
            data:[]
        }
    }

    componentWillMount(){
        var that=this;
        //获取自处资料的信息
        axios.get('http://192.168.100.105:8000/verifyList', {params:{
            token:localStorage.getItem('token')
        }}).then(function (response) {
            console.log(response.data.result);
            for(var i in response.data.result){
                response.data.result[i].key=i;
                if(response.data.result[i].primaryCertified==1){
                    response.data.result[i].createdAt='初级审核'
                }else if(response.data.result[i].seniorCertified==1){
                    response.data.result[i].createdAt='高级审核'
                }
            }
            that.setState({
                data:response.data.result
            })
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    tong(e,i){
        var that=this;
        console.log(this.state.data[i])
        if(this.state.data["0"].primaryCertified==1){
            axios.post('http://192.168.100.105:8000/primaryVerify',
                {
                    tel:this.state.data[i].phone,
                    token:localStorage.getItem('token'),
                    primaryCertified:e
                })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                });
        }else if(this.state.data["0"].seniorCertified==1){
            axios.post('http://192.168.100.105:8000/seniorVerify',
                {
                    tel:this.state.data[i].phone,
                    token:localStorage.getItem('token'),
                    seniorCertified:e
                })
                .then(function (response) {
                    console.log(response);
                    that.setState({
                        data: that.state.data.filter((_, a) => a !== i)

                    })
                })
                .catch(function (error) {
                    console.log(error)
                });
        }

    }

    fore(a,b,c){
            // console.log(111,e[i])
        return(
            <div className={style.imgshow}>
                <p>身份证</p>
                <img src={a} alt=""/>
                <img src={b} alt=""/>
                <br/>
                <p>银行</p>
                <img src={c} alt=""/>
            </div>)

    }
    fore1(a){
        for(var i in a){
            // console.log(111,e[i])
             return(
                 <div className={style.imgshow}>
                     <p>护照</p>
                     <img src={a} alt=""/>
                 </div>)
        }
    }


    render() {
        const columns = [
            { title: '昵称', dataIndex: 'nickname', key: 'nickname' },

            { title: '账号', dataIndex: 'phone', key: 'phone' },

            { title: '审核等级', dataIndex: 'createdAt', key: 'createdAt' },
            { title: '审核操作', key: 'operation', render: (a,b,c) => <ButtonGroup >
                <Popconfirm title="是否确认通过审核？" onConfirm={this.tong.bind(this,3,c)}  okText="Yes" cancelText="No">
                    <Button>通过</Button>
                </Popconfirm>

                <Button onClick={this.tong.bind(this,2,c)}>不通过</Button>
            </ButtonGroup> },
        ];
        const {  previewImage,previewVisible  } = this.state;
        return (
            <div className={style.partnerEntry}>
                <Header/>
                <Crumb position={[{pos:'用户审核'}]}/>
                <div className={style.toolbar}>
                    <ToolBar/>
                </div>
                <div className={style.wlop}>
                    <Table className="components-table-demo-nested"
                        columns={columns}
                        expandedRowRender={
                            record => record.primaryCertified==1?this.fore(record.frontCard,record.backCard,record.handCard):this.fore1(record.backCard)
                        }
                        dataSource={this.state.data}
                    />
                </div>
                <Footer/>
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

PartnerEntry = connect(mapStateToProps, mapDispatchToProps)(PartnerEntry);
export default PartnerEntry;