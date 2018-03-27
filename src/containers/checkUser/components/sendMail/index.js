import React from "react";
import { Table, Button } from 'antd';

import style from './index.css'
import axios from "../../../../common/axiosConf";


const columns = [{
    title: '账号',
    dataIndex: 'email',
}, {
    title: '注册时间',
    dataIndex: 'createAt',
}, {
    title: '审核等级',
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
            loading: false,
        };
    }

    componentWillMount(){
        let that=this
        axios.get('http://192.168.100.105:8000/userList', {
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
                        response.data.result[i].grade='高级审核'
                    }else if(response.data.result[i].primaryCertified==3&&response.data.result[i].seniorCertified!==3){
                        response.data.result[i].grade='初级审核'
                    }else if(response.data.result[i].primaryCertified!==3&&response.data.result[i].seniorCertified!==3){
                        response.data.result[i].grade='未审核'
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

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
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
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={this.start}
                        disabled={!hasSelected}
                    >
                        Send
                    </Button>
                    <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.userList} />
            </div>
        );
    }
}

export default SendEmail

