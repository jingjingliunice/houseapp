import React, { Component } from 'react'
import { TabBar,SearchBar,Grid,WhiteSpace, WingBlank,Flex,Button,Carousel,List } from 'antd-mobile';
import './main.scss'
import {connect} from  'react-redux'

import '../../../assets/fonts/iconfont.css'
import {FIP,gethouselist,IP} from '../../../api/apis' 

const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>
       <img style={{width:'50px'}} src={require(`../../../assets/imgs/${className}.png`)}/>
    </div>
  );

//   菜单数据
const data1 = [
    // {icon:'../../../assets/imgs/house3.png',text:'新房'},
    {icon:`${FIP}/imgs/imgs/house3.png`,text:'新房'},
    {icon:`${FIP}/imgs/imgs/house2.png`,text:'二手房'},
    {icon:`${FIP}/imgs/imgs/repay1.png`,text:'租房'},
    {icon:`${FIP}/imgs/imgs/buildings.png`,text:'商铺写字楼'},
    {icon:`${FIP}/imgs/imgs/rent2.png`,text:'买房'},
    {icon:`${FIP}/imgs/imgs/sea2.png`,text:'海外房产'},
    {icon:`${FIP}/imgs/imgs/area4.png`,text:'小区房价'},
    {icon:`${FIP}/imgs/imgs/answer3.png`,text:'问答'}];
const data2=[
    {icon:`${FIP}/imgs/imgs/lend.png`,text:'我要贷款'},
    {icon:`${FIP}/imgs/imgs/acc3.png`,text:'房贷计算'},
    {icon:`${FIP}/imgs/imgs/star.png`,text:'知识'},
    {icon:`${FIP}/imgs/imgs/saoma.png`,text:'扫一扫'},
]
// 列表
const Item = List.Item;//列表子项
const Brief = Item.Brief;//辅助说明
class Main extends Component {
    state={
        // data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        data:[1,2,3],
        imgHeight: 176,
        value:'',
        houselist:[],
        loves:{
            current:1,
            size:10
        },
        city:'定位中'
        
    }
    componentDidMount(){
        let {loves}=this.state
        gethouselist(loves).then((res)=>{
            console.log(res);
           this.setState({
                houselist:res
            })
        })
        // 引入高德地图====获取用户当前城市
        //实例化城市查询类
        var citysearch = new window.AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        let _this=this;
        citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                   _this.setState({
                    city:cityinfo//当前定位
                   });
                    //地图显示当前城市
                    // map.setBounds(citybounds);
                }
            } else {
                // 默认显示的定位：result.info;
            }
        });
    }
    render() {
        let {firstlist,seclist,thlist,data,houselist}=this.state;
        return (
            <div className='main'>
                <div className="navhead" style={{background:'rgb(20,142,255)'}}>
                <div onClick={this.cityFn.bind(this,'#/citylist')} className='icon'>
                    <label>成都市▼</label></div>
                <SearchBar
                showCancelButton
                    value={this.state.value}
                    placeholder="搜索"
                    onFocus={this.cityFn.bind(this,'#/search')}
                    onChange={this.onChange}
                />
                <div onClick={this.cityFn.bind(this,'#/Hmap')} className='icon1'>
                    <img  style={{width:'20px'}} src={require('../../../assets/imgs/map0.png')}/></div>
                </div>

                <div>
                <Carousel
                slideHeight='100px'
                autoplay//自动播放
                infinite//无限循环播放
                // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}//图片切换前的回调
                // afterChange={index => console.log('slide to', index)}//图片切换完的回调
                >
                {this.state.data.map(val => (
                <a
                key={val}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                <img
                    src={`${IP}/imgs/${val}.jpg`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                    }}
                />
                </a>
                ))}
                </Carousel>
                </div>
                <div className='menu'>
                    <Grid itemStyle={{flex:'0,0,49%'}} data={data1} hasLine={false} />
                 </div>
                 <WhiteSpace size="md" />
                <div className='submenu'>
                    <h3 style={{fontSize:'16px',color:'rgb(20,142,255)',margin:'0',marginLeft:'15px',padding:'0'}}>房产全百科<span style={{fontSize:'12px',marginLeft:'10px',color:
                    '#666'}}>专业的买房攻略</span></h3>
                    <Grid data={data2} hasLine={false} />
                </div>
                <div className='loves'>
                    <List
                     renderHeader={() => ''} className="my-list">
                    <Item>猜你喜欢</Item>
                    {
                        houselist.map((v,i)=>
                        <Item
                         onClick={this.clickHouse.bind(this,v)}
                         activeStyle={{backgroundColor:'#f4f4f4!important'}}
                         key={i} extra={v.price+"/平"} error align="top" thumb={FIP+v.imgs} multipleLine>
                        {v.name}
                        <Brief style={{fontSize:'12px',color:'#666',lineHeight:'1.5em'}}>
                            <p><span>{v.area}</span><span>{v.load}</span></p>
                            <p><span>{v.type}</span><span>{v.point}</span></p>
                        </Brief>
                        </Item>
                        )
                    }
                </List>

                </div>
         </div>
        )
    }

    clickHouse(obj){
        this.props.dispatch({
            type:'addHouseList',
            obj
        })

    }
    cityFn(val){
        window.location.href=val
    }

}
export default connect()(Main)
