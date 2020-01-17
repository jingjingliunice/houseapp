import React, { Component } from 'react'
import { SearchBar, Button, WhiteSpace, WingBlank,Tag } from 'antd-mobile';
import './search.scss'

export default class Search extends Component {
    state={
        value:''
    }
    render() {

        return (
            <div>
                <SearchBar
                value={this.state.value}
                placeholder="楼盘/地名/房产百科等"
                onSubmit={value => console.log(value, 'onSubmit')}
                onClear={value => console.log(value, 'onClear')}
                onFocus={() => console.log('onFocus')}
                onBlur={() => console.log('onBlur')}
                onCancel={() => console.log('onCancel')}
                showCancelButton
                onChange={this.onChange}
              />
            <div className='btns'>
                    <span>最近热搜</span>
                    <span>刷新</span>
            </div>
            <div className="tag-container">
                 <Tag data-seed="logId">现房</Tag>
                 <Tag data-seed="logId">二手房</Tag>
            </div>
                
            </div>
        )
    }
    onChange= (value) => {
        this.setState({ value });
      };
   
}
