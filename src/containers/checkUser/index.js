import React from 'react';
import style from "./index.css"
import { Button, Table, Icon,Upload,Badge, Menu, Dropdown, Modal} from 'antd'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import ContentList from '../../components/contentList'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ToolBar from '../../components/toolBar'
import Crumb from '../../components/crumbs'


const ButtonGroup = Button.Group;

const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },

    { title: '用户编号', dataIndex: 'upgradeNum', key: 'upgradeNum' },

    { title: '审核等级', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '审核操作', key: 'operation', render: () => <ButtonGroup>
        <Button>通过</Button>
        <Button>不通过</Button>
    </ButtonGroup> },
];

const data = [
    {
        key: 1,
        name: 'Sakura',
        upgradeNum: 23,
        createdAt: '初级审核',
        idurl:["https://wx2.sinaimg.cn/mw1024/6b8c14f8gy1forofhihkwj218q0s0n50.jpg","https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg"
        ],
        bankurl:["https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg"]
    },{
        key: 2,
        name: 'Libw',
        upgradeNum:233,
        createdAt: '高级审核',
        huurl:["https://wx2.sinaimg.cn/mw1024/6b8c14f8gy1forofhihkwj218q0s0n50.jpg"]
    },{
        key: 3,
        name: 'Lbw',
        upgradeNum: 2333,
        createdAt: '初级审核',
        idurl:["https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg","https://wx2.sinaimg.cn/mw1024/6b8c14f8gy1forofhihkwj218q0s0n50.jpg"
        ],
        bankurl:["https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg"]
    }
];
const fileList= [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}]



class PartnerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            previewVisible: false,
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: data,
            }],
            isBase:true
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => this.setState({ fileList })


    fore(a,b){
        for(var i in a){
            // console.log(111,e[i])
             return(
                 <div className={style.imgshow}>

                     <p>身份证</p>
                     <img src={a[0]} alt=""/>
                     <img src={a[1]} alt=""/>
                     <br/>
                     <p>银行</p>
                     <img src={b} alt=""/>
                 </div>)
        }
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
        const expandedRowRender = () => {
            const columns = [
                    { title: '类别', dataIndex: 'date', key: 'date' },
                { title: '图片', dataIndex: 'upgradeNum', render: () => <div className="clearfix">
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview.bind(this)}
                    >
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img  alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview.bind(this)}
                    >
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img  alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>  }
            ];

            const data = [{
                key: 1,
                date: '身份证',
                upgradeNum: ["https://wx2.sinaimg.cn/mw1024/6b8c14f8gy1forofhihkwj218q0s0n50.jpg","https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg"
                ],
            },{
                key: 2,
                date: '银行',
                upgradeNum: 'Upgraded: 56',
            }];
            const idcard=["https://wx2.sinaimg.cn/mw1024/6b8c14f8gy1forofhihkwj218q0s0n50.jpg","https://wx3.sinaimg.cn/mw1024/6b8c14f8gy1fop2xf8jysj21b00w4afj.jpg"
            ]

            return (
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            );
        };
        const {  previewImage,previewVisible,fileList  } = this.state;
        return (
            <div className={style.partnerEntry}>
                <Header/>
                <Crumb position={[{pos:'用户审核'}]}/>
                <div className={style.toolbar}>
                    <ToolBar/>
                </div>
                <div className={style.wlop}>
                    <Table
                        className="components-table-demo-nested"
                        columns={columns}
                        expandedRowRender={record => record.createdAt=='初级审核'?this.fore(record.idurl,record.bankurl):this.fore1(record.huurl)}
                        dataSource={data}
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