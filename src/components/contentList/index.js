import React from 'react';
import style from './index.css'

class AboutUs extends React.Component{
    render(){
        return(
            <div className={style.contentlist}>
                {
                    this.props.data.map((v)=>{
                        return(
                            <div className={style.content}>
                                <div className={style.title}>
                                    <span>{v.title}</span>
                                </div>
                                <ul className={style.list}>
                                    {
                                        v.content.map((t)=>{
                                            return (
                                                <li className={style.item}>
            {this.red(t)}
                                                    </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    red(t){
        if(this.props.redw){
            let newstr = t.replace(/利息/ig,"<i style='color: red;'>$&</i>");
            newstr = React.createElement(newstr)
            return <p>{newstr}</p>
        }else {

            return <p>{t}</p>
        }
    }
}

export default AboutUs