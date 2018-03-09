import React from 'react';
import style from "./index.css"
import { Button, Table, Icon,Upload,Badge, Menu, Dropdown, Modal,Popconfirm} from 'antd'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import ContentList from '../../../../components/contentList'
import ToolBar from '../../../../components/toolBar'
import Crumb from '../../../../components/crumbs'
import axios from  '../../../../common/axiosConf';
import {showLogin} from '../../../../actions/auth'
import {bindActionCreators} from 'redux'

const ButtonGroup = Button.Group;



const data = [
    {
        key: 0,
        time: '2017/12/15 15:00',
        description: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',

    },{
        key: 1,
        nickname: 'Sakura',
        time: '2017/12/15 15:00',
        description: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',

    },{
        key: 2,
        time: '2017/12/15 16:00',
        description: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',

    },{
        key: 3,
        time: '2017/12/15 12:00',
        description: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内',

    },
];

class NewsLink extends React.Component {
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
        // axios.get('http://192.168.100.105:8000/verifyList', {params:{
        //     token:localStorage.getItem('token')
        // }}).then(function (response) {
        //     console.log(response.data.result);
        //     for(var i in response.data.result){
        //         response.data.result[i].key=i;
        //         if(response.data.result[i].primaryCertified==1){
        //             response.data.result[i].createdAt='初级审核'
        //         }else if(response.data.result[i].seniorCertified==1){
        //             response.data.result[i].createdAt='高级审核'
        //         }
        //     }
        //     that.setState({
        //         data:response.data.result
        //     })
        // }).catch(function (error) {
        //     console.log(error);
        // })
    }

    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    // tong(e,i){
    //     var that=this;
    //     console.log(this.state.data[i])
    //     if(this.state.data["0"].primaryCertified==1){
    //         axios.post('http://192.168.100.105:8000/primaryVerify',
    //             {
    //                 tel:this.state.data[i].phone,
    //                 token:localStorage.getItem('token'),
    //                 primaryCertified:e
    //             })
    //             .then(function (response) {
    //                 console.log(response)
    //
    //             })
    //             .catch(function (error) {
    //                 console.log(error)
    //             });
    //     }else if(this.state.data["0"].seniorCertified==1){
    //         axios.post('http://192.168.100.105:8000/seniorVerify',
    //             {
    //                 tel:this.state.data[i].phone,
    //                 token:localStorage.getItem('token'),
    //                 seniorCertified:e
    //             })
    //             .then(function (response) {
    //                 console.log(response);
    //                 that.setState({
    //                     data: that.state.data.filter((_, a) => a !== i)
    //                 })
    //             })
    //             .catch(function (error) {
    //                 console.log(error)
    //             });
    //     }
    //
    // }

    render() {
        if (!localStorage.getItem('token')) {
            this.props.showLogin({}, (errorText) => {
                if (errorText) {
                } else {
                    hashHistory.push('/')
                }
            })
            return null
        }
        const columns = [
            { title: '时间', dataIndex: 'time', key: 'time',width:130 },

            { title: '内容', key: 'description',render:(data)=>{
                console.log(data.description)

                return <div className={style.pcontent}>{data.description}</div>
            } },
            // { title: '审核操作', key: 'operation', render: (a,b,c) => <ButtonGroup >
            //     <Popconfirm title="是否确认通过审核？" onConfirm={this.tong.bind(this,3,c)}  okText="Yes" cancelText="No">
            //         <Button>通过</Button>
            //     </Popconfirm>
            // </ButtonGroup> },
        ];
        const {  previewImage,previewVisible  } = this.state;
        return (
            <div className={style.partnerEntry}>
                <div className={style.wlop}>
                    <Table className="components-table-demo-nested"
                           columns={columns}
                           expandedRowRender={
                               record => <p className={style.ppcon}>{record.description}</p>
                           }
                           dataSource={data}
                    />
                </div>

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
    return {
        showLogin: bindActionCreators(showLogin, dispatch),
    }
}

NewsLink = connect(mapStateToProps, mapDispatchToProps)(NewsLink);
export default NewsLink;