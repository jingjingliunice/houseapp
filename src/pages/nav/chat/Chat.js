import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace,Button } from 'antd-mobile';
import './chat.scss'
/*
head:
                    title="This is title"
                    thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    extra={<span>右边</span>} 
 */

export default class Chat extends Component {
    render() {
        return (
            <div className='chat'>
            <div className='person'>
            <WingBlank size="sm">
                <WhiteSpace size="lg" />
                <Card>
               
                <Card.Body>
                    <div>
                        <img src={require(`../../../assets/imgs/hmbb.png`)}/>
                        <WhiteSpace size="lg" />
                        <h3>业务顾问:<span className='user'>兰雨生</span></h3>
                        <h3>专业服务诚信做人诚心做事</h3>
                        <WhiteSpace size="lg" />
                        <Button style={{background:'rgb(20,142,255)',color:'#fff'}}>我要聊天</Button>
                    </div>
                </Card.Body>
                </Card>
                <WhiteSpace size="lg" />
            </WingBlank>
            </div>
            </div>
        )
    }
}
