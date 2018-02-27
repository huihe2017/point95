import React, {Component} from 'react'
import style from './pageTable.css'
import axios from 'axios'

class PageTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
        this.getData = this.getData.bind(this)
    }

    getData() {
        let _this = this
        axios.get('http://hth5.dolphinforex.com/lp/ticks_standard', {withCredentials: false})
            .then(function (response) {
                _this.setState({data: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getData()
        this.interval = setInterval(this.getData, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getDom(data) {
        let dom = []
        for (let s in data) {
            if (s === 'EURUSD' || s === 'GBPUSD' || s === 'GBPJPY' || s === 'USDJPY' || s === 'EURGBP' || s === 'EURJPY' || s === 'AUDUSD' || s === 'USDCHF' || s === 'USDCAD' || s === 'NZDUSD') {
                let all = parseFloat(Math.abs(data[s][2] - data[s][1]).toFixed(8)) + parseFloat(data[s][2]) + parseFloat(data[s][1])
                all = all.toFixed(5)
                dom.push(
                    <tr>
                        <td className={style.var}>{s}</td>
                        <td className={style.spread}>{Math.abs(data[s][2] - data[s][1]).toFixed(3)}</td>
                        <td className={style.total}>{all}</td>
                        <td className={style.ru}>{data[s][2]}</td>
                        <td className={style.chu}>{data[s][1]}</td>
                    </tr>
                )
            }
        }
        return dom
    }

    render() {
        return (
            <div className={style.wrap}>
                <div className={style.tit}>外汇即时报价</div>
                <table className={style.table}>
                    <tr>
                        <th className={style.var}>品种</th>
                        <th className={style.spread}>点差</th>
                        <th className={style.total}>市场深度(M)</th>
                        <th className={style.ru}>买入价</th>
                        <th className={style.chu}>卖出价</th>
                    </tr>
                    {
                        this.getDom(this.state.data)
                    }

                </table>
            </div>
        )
    }
}

export default PageTable