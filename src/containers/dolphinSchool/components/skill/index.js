import React from 'react';
import style from "./index.css"
import Title from '../../../../components/title'
import ContentList from '../../../../components/contentList'
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'
import { Pagination } from 'antd';
import SkillOne from './componets/skillOne'
import SkillTwo from './componets/skillTwo'
import SkillThree from './componets/skillThree'
import SkillFour from './componets/skillFour'
import SkillFive from './componets/skillFive'
import SkillSix from './componets/skillSix'
import SkillSeven from './componets/skillSeven'
import SkillEight from './componets/skillEight'
import SkillNine from './componets/skillNine'
import SkillTen from './componets/skillTen'
import SkillEleven from './componets/skillEleven'
import SkillTwelve from './componets/skillTwelve'
import SkillThirteen from './componets/skillThirteen'
import SkillFourteen from './componets/skillFourteen'


class Skill extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            page:1
        }
    }

    onChange(i){
        this.setState({
            page:i
        })

    }
    pageNum(){
        switch (this.state.page)
        {
            case 1:
                return <SkillOne/>;
                break;
            case 2:
                return <SkillTwo/>;
                break;
            case 3:
                return <SkillThree/>;
                break;
            case 4:
                return <SkillFour/>;
                break;
            case 5:
                return <SkillFive/>;
                break;
            case 6:
                return <SkillSix/>;
                break;
            case 7:
                return <SkillSeven/>;
                break;
            case 8:
                return <SkillEight/>;
                break;
            case 9:
                return <SkillNine/>;
                break;
            case 10:
                return <SkillTen/>;
                break;
            case 11:
                return <SkillEleven/>;
                break;
            case 12:
                return  <SkillTwelve/>;
                break;
            case 13:
                return <SkillThirteen/>;
                break;
            case 14:
                return <SkillFourteen/>;
                break;
        }
    }

    render() {
        return(
            <div className={style.aboutus}>
                <div className={style.wlop}>
                    {
                        this.pageNum()
                    }
                    <div className={style.page}>
                        <Pagination defaultCurrent={this.state.page} total={14} onChange={this.onChange.bind(this)} defaultPageSize={1}/>
                    </div>
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
    return {}
}

Skill = connect(mapStateToProps, mapDispatchToProps)(Skill)
export default Skill;