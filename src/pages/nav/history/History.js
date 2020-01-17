import React, { Component } from 'react'
import {connect} from 'react-redux'
import { TabBar,SearchBar,Grid,WhiteSpace, WingBlank,Flex,Button,Carousel,List } from 'antd-mobile';
import {FIP,gethouselist,IP} from '../../../api/apis'
import './history.scss'
// 列表
const Item = List.Item;//列表子项
const Brief = Item.Brief;//辅助说明
class History extends Component {
    render() {
       
        return (
            <div className="loves">
                 <List
                     renderHeader={() => ''} className="my-list">
                     <Item>您的足迹</Item>
                    {
                        this.props.historylist.map((v,i)=>
                        <Item
                        // onClick={this.clickhouse.bind(this,v)}
                         activeStyle={{backgroundColor:'#f00!important',border:'1px solid #fff'}}
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
        )
    }
};

//如果需要使用redux内的数据, 就必须写数据过滤函数, 否则一个数据都不会给
export default connect((state) => {
    //把历史列表注入到历史中
    return {
        historylist: state.historylist,
    }
})(History)
