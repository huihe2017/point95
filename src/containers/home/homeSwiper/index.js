import React from 'react';
import style from "./index.css"
import { Carousel } from 'antd';


class HomeSwiper extends React.Component {
    render() {
        function SampleNextArrow() {
            return (
                <div
                    style={{ display: 'block', background: 'red'}}
                    //onClick={}
                >11</div>
            );
        }

        function SamplePrevArrow() {
            return (
                <div
                    style={{display: 'block', background: 'green'}}
                    // onClick={}
                >22</div>
            );
        }

        return (
            <div className={style.warp}>
                <Carousel autoplay >
                    <div className={style.listitem}>
                        <div className={style.listitemcon}>
                            <img src={require('./images/biaodian2.png')} alt=""/>
                            <p>
                                在金融科技方面拥有超过10年以上的经验。在担任现职之前，Lin曾担任汇和国际金融集团首席技术官，负责证券和外汇经纪业务的运营和技术建设。Lin曾是摩根大通公司的高级副总裁，负责管理一个亚洲应用程序开发团队，涵盖跨多种资产类别的亚洲电子交易业务。Lin在电子交易系统建设方面经验丰富，尤其在延时和可扩展性方面有所提升。Lin在香港大学获得计算机科学硕士学位和理学学士学位。
                            </p>
                            <p>
                                More than 10 years of experience in finance technology. Prior to his current role, Mr. Lin served as Chief Technology Officer of Huili International Financial Group and was responsible for the operation and technical development of securities and foreign exchange brokerage businesses. Lin was senior vice president at JPMorgan Chase, where he was responsible for managing an Asian application development team covering Asian electronic trading across multiple asset classes. Lin is experienced in the construction of electronic trading systems, especially in terms of latency and scalability. Lin holds a master's degree in computer science and a bachelor's degree in science from the University of Hong Kong.。
                            </p>
                        </div>
                        <img src={require('./images/swiper11.png')} alt=""/>
                    </div >
                    <div className={style.listitem}>
                        <div className={style.listitemcon}>
                            <img src={require('./images/biaodian2.png')} alt=""/>
                            <p>
                                在金融科技方面拥有超过10年以上的经验。在担任现职之前，Lin曾担任汇和国际金融集团首席技术官，负责证券和外汇经纪业务的运营和技术建设。Lin曾是摩根大通公司的高级副总裁，负责管理一个亚洲应用程序开发团队，涵盖跨多种资产类别的亚洲电子交易业务。Lin在电子交易系统建设方面经验丰富，尤其在延时和可扩展性方面有所提升。Lin在香港大学获得计算机科学硕士学位和理学学士学位。
                            </p>
                            <p>
                                More than 10 years of experience in finance technology. Prior to his current role, Mr. Lin served as Chief Technology Officer of Huili International Financial Group and was responsible for the operation and technical development of securities and foreign exchange brokerage businesses. Lin was senior vice president at JPMorgan Chase, where he was responsible for managing an Asian application development team covering Asian electronic trading across multiple asset classes. Lin is experienced in the construction of electronic trading systems, especially in terms of latency and scalability. Lin holds a master's degree in computer science and a bachelor's degree in science from the University of Hong Kong.。
                            </p>
                        </div>
                        <img src={require('./images/swiper11.png')} alt=""/>
                    </div >
                    <div className={style.listitem}>
                        <div className={style.listitemcon}>
                            <img src={require('./images/biaodian2.png')} alt=""/>
                            <p>
                                在金融科技方面拥有超过10年以上的经验。在担任现职之前，Lin曾担任汇和国际金融集团首席技术官，负责证券和外汇经纪业务的运营和技术建设。Lin曾是摩根大通公司的高级副总裁，负责管理一个亚洲应用程序开发团队，涵盖跨多种资产类别的亚洲电子交易业务。Lin在电子交易系统建设方面经验丰富，尤其在延时和可扩展性方面有所提升。Lin在香港大学获得计算机科学硕士学位和理学学士学位。
                            </p>
                            <p>
                                More than 10 years of experience in finance technology. Prior to his current role, Mr. Lin served as Chief Technology Officer of Huili International Financial Group and was responsible for the operation and technical development of securities and foreign exchange brokerage businesses. Lin was senior vice president at JPMorgan Chase, where he was responsible for managing an Asian application development team covering Asian electronic trading across multiple asset classes. Lin is experienced in the construction of electronic trading systems, especially in terms of latency and scalability. Lin holds a master's degree in computer science and a bachelor's degree in science from the University of Hong Kong.。
                            </p>
                        </div>
                        <img src={require('./images/swiper11.png')} alt=""/>
                    </div >
                </Carousel>
            </div>
        )
    }
}

export default HomeSwiper;