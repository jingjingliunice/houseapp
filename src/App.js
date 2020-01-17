import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd-mobile';
import {HashRouter,Route,Switch} from 'react-router-dom'

import './assets/fonts/iconfont.css'
import './assets/styles/common.scss'
import Nav from './pages/nav/Nav'
import Login from './pages/login/Login'
import Reg from './pages/reg/Reg'
import Chat from './pages/nav/chat/Chat'
import History from './pages/nav/history/History'
import Main from './pages/nav/main/Main'
import Me from './pages/nav/me/Me'
import Citylist from './pages/city/Citylist'
import Hmap from './pages/map/Hmap'
import Search from './pages/search/Search'
import ForgetPwd from './pages/forgetpwd/ForgetPwd'

export default class App extends Component {
    render() {
        return (
            <div style={{overflowX:'hidden',height:'100%',overflowY:'scroll'}}>
            <HashRouter style={{height:'100%'}}>
                <Switch>
                    <Route exact path='/'  component={Nav}></Route>
                    <Route path='/login'  component={Login}></Route>
                    <Route path='/reg'  component={Reg}></Route>
                    <Route path='/chat'  component={Chat}></Route>
                    <Route path='/history'  component={History}></Route>
                    <Route path='/main'  component={Main}></Route>
                    <Route path='/me'  component={Me}></Route>
                    <Route path='/hmap'  component={Hmap}></Route>
                    <Route path='/search'  component={Search}></Route>
                    <Route path='/citylist'  component={Citylist}></Route>
                    <Route path='/forgetpwd'  component={ForgetPwd}></Route>
                </Switch>
            </HashRouter>
            </div>
        )
    }
}
