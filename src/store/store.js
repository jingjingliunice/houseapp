import {createStore,combineReducers} from 'redux'
// import {rootReducer } from './Reducers'

function text(state="默认值",action){
    switch(action.type){

        default:return state
    }

}
// 历史数据
/* function historylist(state=[],action){
    switch(action.type){
        case 'addhouselist':{
            var arr=[...state,action.obj];
            return arr;
        }
        default:return state
    }
} */
//历史记录数组
function historylist(state = [
    {area: "仁寿县",
current: 0,
id: 1,
imgs: "/imgs/1.jpg",
name: "美的云溪郡",
point: 117,
price: 9000,
road: "仁寿大道",
size: 0,
type: "4室2厅",
__proto__: Object},
{
    area: "温江区",
    current: 0,
    id: 2,
    imgs: "/imgs/2.jpg",
    name: "恒大未来城",
    point: 115,
    price: 12000,
    road: "光华新城",
    size: 0,
    type: "3室1厅"
}
], action){
    switch(action.type){
        //每次点击时, 增加一条数据到historylist中
        case 'addHouseList': {
            //1. 删掉相同的数据
            for(let i = 0; i < state.length; i++){
                //如果老数组中有id相同的数据,那我们就移除
                if(state[i].id === action.obj.id){
                    state.splice(i, 1)
                    break
                }
            }

             //2. 把新数据放到数组的最前列
            return [action.obj, ...state]
        }
        default: return state 
    }
}


export default createStore(combineReducers({
    text,
    historylist
}))
