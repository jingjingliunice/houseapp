import React, { Component } from 'react'
import { List,WhiteSpace,Flex,Grid  } from 'antd-mobile';
import {connect} from 'react-redux'
import './me.scss'
import {FIP} from '../../../api/apis'

const Item = List.Item;
const Brief = Item.Brief;

 class Me extends Component {
    state={
        offer:[
            {img:'bage.png',text:'钱包'},
            {img:'offer.png',text:'优惠'},
            {img:'fens.png',text:'积分'}
        ],
        list1:[
        {icon:'/imgs/imgs/gfen.png',text:'我的积分'},
        {icon:'/imgs/imgs/dy.png',text:'我的订阅'},
        {icon:'/imgs/imgs/gpersons.png',text:'微聊联系人'},
        {icon:''},
        {icon:'/imgs/imgs/gacc.png',text:'房贷计算器'},
        {icon:'/imgs/imgs/gstar.png',text:'我的房子'},
        {icon:''},
        {icon:'/imgs/imgs/look.png',text:'我的看房记录'},
        {icon:'/imgs/imgs/gperson.png',text:'我的问答'},
        {icon:''},
        {icon:'/imgs/imgs/set.png',text:'设置'},
        {icon:'',text:'意见反馈'}]

    }
    getTitle=(val)=>{
        switch(val){
            case 'lend1':return "钱包";break;
            case 'hui':return "优惠";break;
            case 'payhouse':return "积分";break;
        }
    }
    render(){
        let {offer,list1}=this.state
        return (
            <div>
                <div className='head'>
                <WhiteSpace size="lg" />
                <List  className="my-list">
                    <Item style={{color:'#fff',backgroundColor:'rgb(20,142,255)'}} extra={'设置'} align="top" thumb={require('../../../assets/imgs/home.png')} multipleLine>
                    <span style={{color:'#fff'}} onClick={()=>{window.location.href='#/reg'}}>注册/登录</span><Brief style={{color:'#fff'}}>可以与经纪人发起聊天</Brief>
                    </Item>
                </List>
                <div className='offer'>
                    <Flex>
                    {
                        offer.map((v,i)=>
                        <Flex.Item key={i}>
                            <span>0</span>
                            <div className='offeritem'>
                                <img style={{width:'20px'}} src={require(`../../../assets/imgs/${v.img}`)}/>
                                <span style={{color:'#fff'}} >{v.text}</span>
                            </div>
                        </Flex.Item>)
                    }
                    </Flex>
                 </div>
                </div>
                <div>
                <WhiteSpace size="sm" />
                <List  className="my-list">
                   {
                       list1.map((v,i)=>{
                       if(v.icon!=''){
                      return <Item key={i}  arrow='horizontal'>
                                <img style={{width:'18px',marginRight:'5px'}} src={FIP+v.icon}/>
                                <span>{v.text}</span>
                            </Item>}
                        else return <div key={i} style={{backgroundColor: '#F4F4F4',height: 8}}></div>
                       })
                   }
                </List>
                </div>
            </div>
        )
    }
}
export default connect((state)=>{
    return {
        text:state.text
        //在页面使用this.props.test获取值
    }

})(Me)
