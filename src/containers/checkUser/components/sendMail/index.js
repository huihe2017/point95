import React from "react";
import { Table, Button } from 'antd';
import { IntlProvider,addLocaleData,FormattedMessage,injectIntl, intlShape } from 'react-intl';
import style from './index.css'
import axios from "../../../../common/axiosConf";
import webLink from "../../../../common/webLink";


const columns = [{
    title: <FormattedMessage id='userCheck2' defaultMessage='账号'/>,
    dataIndex: 'email',
}, {
    title: <FormattedMessage id='createTime' defaultMessage='注册时间'/>,
    dataIndex: 'createAt',
}, {
    title: <FormattedMessage id='userCheck3' defaultMessage='审核等级'/>,
    dataIndex: 'grade',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        time: 32,
        grade: `London, Park Lane no. ${i}`,
    });
}

class SendEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column

        };
    }

    componentWillMount(){
        let that=this
        axios.get(`${webLink}/userList`, {
            params:{
                token:localStorage.getItem('token')
            }})
            .then(function (response) {
                console.log(response.data.result)
                response.data.result.map((v,i)=>{
                    var mouth=new Date(response.data.result[i].createAt).getMonth()+1
                    response.data.result[i].createAt=new Date( response.data.result[i].createAt).getFullYear()+'/'+mouth+'/'+new Date(response.data.result[i].createAt).getDate()
                    console.log(new Date(response.data.result[i].createAt).getFullYear()+'/'+new Date(response.data.result[i].createAt).getMonth()+'/'+new Date(response.data.result[i].createAt).getDate());
                    if(response.data.result[i].primaryCertified==3&&response.data.result[i].seniorCertified==3){
                        response.data.result[i].grade=<FormattedMessage id='advancedCheck' defaultMessage='高级审核'/>
                    }else if(response.data.result[i].primaryCertified==3&&response.data.result[i].seniorCertified!==3){
                        response.data.result[i].grade=<FormattedMessage id='basicCheck' defaultMessage='初级审核'/>
                    }else if(response.data.result[i].primaryCertified!==3&&response.data.result[i].seniorCertified!==3){
                        response.data.result[i].grade=<FormattedMessage id='unreviewed' defaultMessage='未审核'/>
                    }
                })

                console.log('gai',response.data.result);
                that.setState({
                    userList:response.data.result
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    start = (e) => {
        console.log(this.state.selectedRowKeys)
        console.log(this.state.userList[4]);
        let arr=[]
        this.state.selectedRowKeys.map((v,i)=>{
            arr.push(this.state.userList[v].email)
        })
        console.log('hahah',arr.join(";"));
        this.setState({
            address:arr.join(";")
        })


        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],

            });
        }, 2000);
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const { intl: { formatMessage } } = this.props
        const userCheck1 = formatMessage({id:'userCheck1'});
        const selected = formatMessage({id:'selected'});
        const items = formatMessage({id:'items'});

        return (
            <div>
                <div>
                    <a
                        className={style.btn}
                        onClick={this.start}
                        disabled={!hasSelected}
                        href={"Mailto:"+this.state.address}
                    >
                        <FormattedMessage id='send' defaultMessage='发送'/>
                    </a>
                    <span style={{ marginLeft: 8 }}>
            {hasSelected ? `${selected} ${selectedRowKeys.length} ${items}` : ''}
          </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.userList} />
            </div>
        );
    }
}

export default injectIntl(SendEmail)

