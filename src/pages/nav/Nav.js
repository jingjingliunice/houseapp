import React, { Component } from 'react'
import { TabBar,SearchBar,WhiteSpace, WingBlank,Flex,Button,Carousel } from 'antd-mobile';
import './nav.scss'

import Chat from './chat/Chat'
import History from './history/History'
import Main from './main/Main'
import Me from './me/Me'
import {gethouselist} from '../../api/apis'

export default class Nav extends Component {
    state = {
        selectedTab: 'main',
        // 搜索框
        cancel:false,
        // 轮播图
       
        // 底部导航数据
        iconlist:[{
          title:'首页',
          key:'main',
          icon_main:'main',
          sicon:'main2',
        },
        {
          title:'聊天',
          key:'chat',
          icon_main:'ssmsg',
          sicon:'smsg',
        },
        {
          title:'足迹',
          key:'history',
          icon_main:'record',
          sicon:'record1',
        },
        {
          title:'我',
          key:'me',
          icon_main:'me',
          sicon:'me1',
        }]
        
      };
      componentDidMount(){
        let res=gethouselist()
        console.log(res);
      }
    render() {
      let {iconlist}=this.state
        return (
          <div className='nav'>
            <WhiteSpace size="lg" />
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <TabBar
              unselectedTintColor="#949494"
              tintColor="#33A3F4"
              barTintColor="white"
              tabBarPosition='bottom'
              hidden={this.state.hidden}
            >
              {
                iconlist.map((v,i)=>
                  <TabBar.Item
                    title={v.title}
                    key={v.key}
                    icon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${require('../../assets/imgs/'+v.icon_main+'.png')}) center center /  21px 21px no-repeat` }}
                    />
                    }
                    selectedIcon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${require('../../assets/imgs/'+v.sicon+'.png')}) center center /  21px 21px no-repeat` }}
                    />
                    }
                    selected={this.state.selectedTab === v.key}
                    onPress={() => {
                      this.setState({
                        selectedTab: v.key,
                      });
                    }}
                  >
                    {this.renderContent()}
                  </TabBar.Item>
                )
              }
            
            </TabBar>
          </div>
        </div>
        )
    }
    renderContent(){//页面切换渲染函数
      switch(this.state.selectedTab){
        case 'main':return <Main/>;break;
        case 'history':return <History/>;break;
        case 'chat':return <Chat/>;break;
        case 'me':return <Me/>;break;
      }

    }
    onChange=()=>{//搜索框

    }
    
}
