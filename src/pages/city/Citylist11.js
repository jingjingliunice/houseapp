import React, { Component } from 'react'
import { WingBlank, WhiteSpace,SearchBar,Tabs,Badge,Tag } from 'antd-mobile';
import BScroll from 'better-scroll'
import './citylistscroll.scss'
import cityjson from '../../json/citylist.json'

import { List } from 'antd-mobile';
const Item = List.Item;
export default class Citylist extends Component {
    componentDidMount(){
        this.leftBox = new BScroll('#citylist-left-box')
        console.log(this.leftBox);
    }
    render() {
        return (
            <div className="citypage2">
                <div className='letterbar'>
                    {
                        cityjson.map((v,i)=>
                        <div className='random-cls' 
                        onTouchMove={this.moveTitle.bind(this)}
                        onClick={this.clickRightTitle.bind(this,v.letter)} key={i}>{v.letter}</div>)  
                    }
                </div>
                <div id='citylist-left-box'>
                    <ul className='content'>
                    {
                        cityjson.map((v,i)=>
                        <div key={i} id={v.letter}>
                            <List renderHeader={v.letter} className="my-list">
                            {
                                v.list.map((city,j)=>//
                                    <Item 
                                     platform="android"
                                     key={j}>{city}</Item>
                            )
                            }
                            </List>
                        </div>
                        )
                    }
                    </ul>
                </div>
           
                
            </div>
        )
    }
    /* 阻止原生滚动：====重点：
    移动端使用better-Scroll滚动存在一个弊端：
    会粘连原生滚动：
    解决方法：切分为左右两部分：----两个绝对定位将两个盒子彻底脱离原本
    左边绝对定位到最左边，右边绝对定位到最右边
     */
    clickRightTitle(title){
        console.log(title);
        this.leftBox.scrollToElement('#' + title,600)
        console.log('#' + title);
    }

    moveTitle(e){
      
        //获取第一根手指的触屏事件对象
        // console.log(e.touches[0].clientX, e.touches[0].clientY)  //获取当前手指的触摸信息数组 如果想要获取当前手指的坐标，必须指定获取哪个手指的坐标
        let elt = document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY)
        console.log(elt);
        // console.log(elt.className) //可以根据当前的X和Y坐标，获取此坐标对应的DOM元素
        if(elt.className === 'random-cls'){
            //当前摸在了我想要的元素身上
            // console.log(elt.innerHTML)
            this.leftBox.scrollToElement('#' + elt.innerHTML,600)
        }else return
    }
   
   
}
