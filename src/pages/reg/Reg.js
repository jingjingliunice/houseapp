import React, { Component } from 'react'

import {Flex,List,InputItem,WhiteSpace,WingBlank, Button,Radio,Toast} from 'antd-mobile';
import './reg.scss'
import {regreq,valitecode} from '../../api/apis'
export default class Reg extends Component {
    state={
        user:'',
        olduser:'',
        pwd:'',
        capt:'',
        code:'',
        checked:false,
        extra:'获取验证码'
    }
    render() {
        let {user,pwd,capt,extra}=this.state
        return (
            <div className='regpage'>
           <WhiteSpace size='lg'></WhiteSpace>
            <Flex style={{height:'190px'}} justify="center">
                <div className='logodiv'>
                <img style={{width:180,height:100}} src={require('../../assets/imgs/000.png')}/>
                </div>
            </Flex>
           <WhiteSpace size='lg'></WhiteSpace>
            <WingBlank>
                <InputItem
                clear
                value={this.state.user}
                onChange={value => {
                this.setState({
                    user: value,
                });
                }}
                placeholder="请输入名称"
                />
                <InputItem
                clear
                type="password"
                value={this.state.pwd}
                onChange={value => {
                this.setState({
                    pwd: value,
                });
                }}
                placeholder="请输入密码"
                />
                <InputItem
                clear
                type="password"
                extra={extra}
                onExtraClick={this.getCapt.bind(this)}
                value={this.state.capt}
                onChange={value => {
                this.setState({
                    capt: value,
                })
                }}
                placeholder="获取验证码"
                />
                 <WhiteSpace size="lg" />
                 <div   onClick={() => {
                this.setState({
                    checked: !this.state.checked
                })
                 }
                }>
                 <Radio 
                 className="my-radio" 
                 checked={this.state.checked}
                onChange={()=>{
                }}>
                 我已同意使用
                 <a href='#/'>《用户使用协议》</a>及<a href='#/'>《隐私政策》</a>
                 </Radio>
                     
                 </div>
                 <WhiteSpace size="lg" />
                  <Button onClick={this.regFn.bind(this)} style={{background:'rgb(20,142,255)',color:'#fff'}}>注册</Button>
                  <WhiteSpace size="lg" />
                  <a href='#/login'>已有账号</a>
                  </WingBlank>
            </div>
        )
    }
    async regFn(){
        let {user,pwd}=this.state
        let res=await regreq({acc:user,pwd:pwd})
        if(res.code===0){
            window.location.href='#/login'
        }else{
            Toast.fail('注册失败!!!', 1);
        }
    }
    async getCapt(){
        let {user,olduser,pwd}=this.state
        if(user&&user===olduser){
            let i=5;
            setTimeout(() => {
                /* this.setState({
                    extra:i+"秒"
                })
                i--; */
                this.getcapts()
            }, 5000);
        }else{this.getcapts()};
    }
     getcapts=async ()=>{
        if(this.state.user){
            this.setState({
                olduser:this.state.user
            })
            let res=await valitecode()
            if(res){
                Toast.info(parseInt(res.data),5);
            }else{
                Toast.info('请等待!!!', 10);
            }

        }
    }
}
