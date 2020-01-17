import axios from 'axios'
import qs from 'qs'
import { log } from 'util';


// export const IP='http://192.168.99.1:80';//学校地址PHP基础
// export const IP='http://192.168.101.114:8888';//家里地址
// export const FIP='http://192.168.101.114:3000'
export const IP='http://192.168.43.211:8888';//学校地址
export const FIP='http://192.168.43.211:3000'

const req=axios.create({
    baseURL:IP,
    timeout:10000,
    headers:{//请求头设置-请求参数的格式，和编码格式
        'Content-Type':'application/json;charset=utf-8;'
      },
})

// promise从根源上并没有解决回调地狱问题:所以官方在ES7中用async和await彻底解决异步嵌套问题
//vue和react默认内置qs和axios
//php必须使用qs转换post请求参数
export function loginreq(obj){
    return req.post('/login',obj).then((res)=>res.data)
}
export function regreq(obj){
    return req.post('/reg',obj).then((res)=>res.data)
}
export function valitecode(){
    return req.post('/valitecode').then((res)=>res.data)
}
export function gethouselist(data){
    return req.post('/gethouselist',data).then((res)=>{
        return res.data.data.records})
}