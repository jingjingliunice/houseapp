import React, { Component } from 'react'
import { WingBlank, WhiteSpace,SearchBar,Tabs,Badge,Tag,List } from 'antd-mobile';
import './citylist.scss'
import BScroll from 'better-scroll'
import cityjson from '../../json/citylist.json'
import statejson from '../../json/state.json'
const tabs = [
    { title: <Badge text={''}>国内城市</Badge> },
    { title: <Badge text={''}>海外城市</Badge> },
  ];
const Item = List.Item;
export default class Citylist extends Component {
    state={
        value:'',
        historycity:["北京","成都","西安","重庆","上海"],
        hotcityname:["兰州","成都","白银","西安","厦门"],
        hotstate:["马来西亚","阿联酋","菲律宾","日本","新加坡"],
        hotcities:[
        {city:'迪拜',img:'http://img4.imgtn.bdimg.com/it/u=1404038807,1284900917&fm=26&gp=0.jpg'},
        {city:'纽约',img:'http://img4.imgtn.bdimg.com/it/u=1404038807,1284900917&fm=26&gp=0.jpg'},
        {city:'东京',img:'http://img4.imgtn.bdimg.com/it/u=1404038807,1284900917&fm=26&gp=0.jpg'},
        {city:'巴黎',img:'http://img4.imgtn.bdimg.com/it/u=1404038807,1284900917&fm=26&gp=0.jpg'}],
    }
    render() {
        let {hotcities,historycity,hotcityname,hotstate}=this.state;
       
        return (
            <div className="citypage">
            <div className='letterbar'>
            
                                <div className='random-cls,top' 
                                onTouchMove={this.moveTitle.bind(this)}
                                style={{color:'#666'}}
                                onClick={this.clickRightTitle.bind(this,'top')}>♥</div> 
                            {
                                cityjson.map((v,i)=>
                                <div className='random-cls' 
                                onTouchMove={this.moveTitle.bind(this)}
                                onClick={this.clickRightTitle.bind(this,v.letter)} key={i}>{v.letter}</div>)  
                            }
                        </div>
            <div id='citylist-left-box'>
                <ul className='content'>
                
               
              <SearchBar
                id='top'
                value={this.state.value}
                placeholder="请输入关键字"
                onSubmit={value => console.log(value, 'onSubmit')}
                onClear={value => console.log(value, 'onClear')}
                onFocus={() => console.log('onFocus')}
                onBlur={() => console.log('onBlur')}
                onCancel={() => console.log('onCancel')}
                onChange={this.onChange}
              />
               <Tabs tabs={tabs}
                initialPage={0}
                onChange={(tab, index) => { console.log('onChange', index, tab); }}
                onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div style={{ minHeight: '500px', backgroundColor: '#eee' }}>
                     <div style={{height: '40px',padding:'0 15px',lineHeight:'40px',backgroundColor: '#fff' }}>成都<span style={{marginLeft:'20px',color:'#ccc'}}>GPS定位</span></div>
                     <div  style={{padding:'5px 15px'}}>
                        <div>历史</div>
                        <div className="tag-container">
                        {
                            historycity.map((v,i)=>
                            <Tag key={i} style={{width:'30%'}} data-seed="logId">{v}</Tag>)
                        }
                        </div> 
                        <div>热门</div>
                        <div className="tag-container">
                        {
                            hotcityname.map((v,i)=>
                            <Tag key={i} style={{width:'30%'}} data-seed="logId">{v}</Tag>)
                        }
                        </div> 
                     </div>
                     <div>
                        {   cityjson.map((v,i)=>
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
                     </div>
                </div>
                <div style={{ minHeight: '500px', backgroundColor: '#eee' }}>
                     <div  style={{padding:'5px 15px'}}>
                        <div>热门国家</div>
                        <div className="tag-container">
                        {
                            hotstate.map((v,i)=>
                            <Tag key={i} style={{width:'30%'}} data-seed="logId">{v}</Tag>)
                        }
                        </div> 
                        <div>热门城市</div>
                        <div className="tag-container">
                            {
                                hotcities.map((v,i)=>
                                <Tag key={i} style={{width:'100px',height:'50px'}} data-seed="logId">
                                <img style={{width:'100px',height:'50px'}} src={v.img}/>
                                <span className='hotcityname'>{v.city}</span>
                            </Tag>)
                            }
                        </div> 
                     </div>
                     <div>
                             {   statejson.map((v,i)=>
                                <div key={i} id={v.letter}>
                                    <List renderHeader={v.letter} className="my-list">
                                    {
                                        v.list.map((city,j)=>//
                                            <Item 
                                            platform="android"
                                            key={j}>{city}</Item>)
                                    }
                                    </List>
                                </div>)
                            }
                        </div>
                </div>
                </Tabs>
                </ul>
            </div>     
            </div>
        )
    }
    onChange= (value) => {
        this.setState({ value });
      };
    componentDidMount(){
        this.leftBox = new BScroll('#citylist-left-box',{click:true})
    }
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
