import React, { Component } from 'react'
import {Flex,List,InputItem,WhiteSpace,WingBlank, Button,Toast} from 'antd-mobile';
import {Link} from 'react-router-dom'
import './Login.scss'

import {loginreq} from '../../api/apis'


export default class Login extends Component {
    state={
        user:'',
        pwd:'',
        olduser:'',
        oldpwd:''
    }
    render() {
        let {user,pwd}=this.state
        return (
            <div className={'login'}>
               
                 <Flex style={{height:'190px'}} justify="center">
                     <div className='logodiv'>
                    <img style={{width:180,height:100}} src={require('../../assets/imgs/000.png')}/>
                    </div>
                </Flex>
                <WhiteSpace size="xs" />
                <WhiteSpace size="xs" />
                <WingBlank>
                            <InputItem
                                placeholder="请输入用户名"
                                clear
                                value={user}
                                onChange={(val)=>{this.setState({user:val})}}
                            >
                            <div style={{ backgroundImage: `url(${require('../../assets/imgs/icon_user.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                            </InputItem>
                            <InputItem
                                type="password"
                                placeholder="请输入密码"
                                clear
                                value={pwd}
                                onChange={(val)=>{this.setState({pwd:val})}}
                            >
                                <div style={{ backgroundImage: `url(${require('../../assets/imgs/icon_pwd.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                            </InputItem>
                            <WhiteSpace size="lg" />
                            <Button 
                            onClick={this.handlelogin}
                            activeStyle={{background:'rgba(20,142,255,.6)'}} style={{background:'rgb(20,142,255)',color:'#fff'}}>登录</Button>
                        
                        <WhiteSpace size="lg" />
                    <Flex justify="between">
                        <Link style={{color:'rgb(20,142,255)'}} to='reg'>手机快速注册</Link>
                        <Link style={{color:'rgb(20,142,255)'}} to='forgetpwd'>忘记密码?</Link>
                    </Flex>
                    </WingBlank>
            </div>
        )
    }
    handlelogin=async ()=>{
        let {user,pwd,olduser,oldpwd}=this.state;
        /* 每次发请求前需要判断新值和旧值是否相同，相同就阻止发送请求 */
        if(oldpwd===pwd&&user===oldpwd)  return//【防抖节流】----性能优化
        this.setState({
            olduser:user,
            oldpwd:pwd
        })
        let params={acc:user,pwd:pwd}
        let req=await loginreq(params);//ES7的异步处理
        if(req.code===0){
            console.log("登录成功")
            window.location.href='#/'
        }else{
            console.log("登录失败")
            Toast.fail('登录失败!!!', 1);
        }
    }
}
