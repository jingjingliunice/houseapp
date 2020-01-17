import React, { Component } from 'react'
var map;
export default class Hmap extends Component {
    state={
        city:''
    }
    componentDidMount(){
      
        // window.init = function(){
             map = new window.AMap.Map("mymap", {
                resizeEnable: true,
                center: [116.397428, 39.90923],
                zoom: 13
            });
           /*  var auto = new window.AMap.Autocomplete({
                input: "tipinput"
            }); */
            var options = {
                'showButton': true,//是否显示定位按钮
                'buttonPosition': 'LB',//定位按钮的位置
                /* LT LB RT RB */
                'buttonOffset': new window.AMap.Pixel(10, 20),//定位按钮距离对应角落的距离
                'showMarker': true,//是否显示定位点
                'markerOptions':{//自定义定位点样式，同Marker的Options
                  'offset': new window.AMap.Pixel(-18, -36),
                  'content':'<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
                },
                'showCircle': true,//是否显示定位精度圈
                'circleOptions': {//定位精度圈的样式
                    'strokeColor': '#0093FF',
                    'noSelect': true,
                    'strokeOpacity': 0.5,
                    'strokeWeight': 1,
                    'fillColor': '#02B0FF',
                    'fillOpacity': 0.25
                }
            }
            window.AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch','AMap.Geolocation'],function(){
                var autoOptions = {
                  // 城市，默认全国 
                  city: "成都",
                  // 使用联想输入的input的id
                  input: "input"
                }
                var autocomplete= new window.AMap.Autocomplete(autoOptions)
              
                var placeSearch = new window.AMap.PlaceSearch({
                  city:'成都',
                  map:map
                })
                window.AMap.event.addListener(autocomplete, 'select', function(e){
                  //TODO 针对选中的poi实现自己的功能
                  placeSearch.search(e.poi.name)
                })
                var geolocation = new window.AMap.Geolocation(options);
                map.addControl(geolocation);
                geolocation.getCurrentPosition()
               })
        // }
        // window.init();
        
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
                    map.setBounds(citybounds);
                }
            } else {
                // 默认显示的定位：result.info;
            }
        });
        
    }

    render() {
        return (
            <div style={{width:'100%',height:'100%'}}>
                <div id="mymap" style={{width:'100%',height:'100%'}}>
                    <div className="info" style={{position:'fixed',top:'0px',left:'5px',zIndex:100}}>
                        <div className="input-item">
                        <div className="input-item-prepend">
                            <span className="input-item-text" style={{width:'8rem'}}>请输入关键字</span>
                        </div>
                        <input id='tipinput' type="text"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

 searchFn(){
        
    //搜索功能
    window.AMap.service(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        var placeSearch = new window.AMap.PlaceSearch({
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码  ---分页效果
            city: "010", // 兴趣点城市  ---城市代码
            citylimit: true,  //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search('双流机场');
    });

    //关键字--规划路线
    //基本地图加载
    // var map = new AMap.Map("container", {
    //     resizeEnable: true,
    //     center: [116.397428, 39.90923],//地图中心点
    //     zoom: 13 //地图显示的缩放级别
    // });
    //构造路线导航类
    /* var driving = new AMap.Driving({
        map: map,
        panel: "panel"
    }); */
    // 根据起终点名称规划驾车导航路线
   /*  driving.search([
        {keyword: '成都',city:'全国'},
        {keyword: '兰州',city:'全国'}
    ], function(status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === 'complete') {
            log.success('绘制驾车路线完成')
        } else {
            log.error('获取驾车数据失败：' + result)
        }
    }); */
    }
}
