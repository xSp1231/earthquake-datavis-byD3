import { createStore } from 'vuex'
import * as d3 from "d3";
export default createStore({
    state: {
        count:0,
        dataObject:[
            { name: "德阳", value: 100 },
            { name: "绵阳", value: 120 },
            { name: "成都", value: 200 },
            { name: "乐山", value: 150 },
            { name: "雅安", value: 80 },
            { name: "九寨沟", value: 70 },
            { name: "南充", value: 110 },
            { name: "宜宾", value: 130 },
        ],
        WorldCloud:"四川",
        provinceName:"四川",
        total:0,
        injure:0,
        death:0,
        intro:"hello,world",
        provinceIntro:{ //设置默认数据
            "id":'11',
            "injure": 691995,
            "death": 343,
            "total": 692338,
            "intro": "位于中国西南地区，地处川西高原和四川盆地，地震活动较多，属于川西地震带",
            "piedata": [
                {
                    "value": 460,
                    "name": "芦山"
                },
                {
                    "value": 388,
                    "name": "珙县"
                },
                {
                    "value": 314,
                    "name": "长宁"
                },
                {
                    "value": 234,
                    "name": "威远"
                },
                {
                    "value": 204,
                    "name": "九寨沟"
                },
                {
                    "value": 193,
                    "name": "木里"
                },
                {
                    "value": 185,
                    "name": "青川"
                },
                {
                    "value": 181,
                    "name": "汶川"
                }
            ],
            "img":"pictures/default.jpg"
        },
    },
    mutations: {
        getDataByProvince(state, province) {//得到每个省份的相关信息 展示在左边 饼图 和统计列表里面
            state.WorldCloud=province
            state.provinceName=province
            console.log("得到的省份数据", state.provinceIntro.piedata)
            console.log("点击的省份", province)
            var t
             d3.csv("earthquake_data_province_intro.csv").then(data=>{
                 console.log("d3 读取的data is ",data)
                 t=data.filter(d => d.province===province)
                 console.log("t[0] is ",t[0])
                 console.log("介绍",t[0].intro);
                 console.log("总数",t[0].total);
                 state.provinceIntro=t[0];
                 state.intro=t[0].intro;
                 state.injure=t[0].injure;
                 state.death=t[0].death;
                 state.total=t[0].total;
                 console.log( state.provinceIntro===t[0] , "vuex里的");
                 console.log("vuex里面的intro",state.total);
                 t= JSON.parse(t[0].pie_json);
                 state.dataObject
                     = t.map(obj => {
                     return { name: obj.area, value: obj.value };
                 });

             })
            console.log("饼图数据发生变化", state.dataObject)
        },
        getProvinceData(province){
            state.provinceName=province;
            console.log(province);
        },
        changeProvince(state, payload)
        {
            state.WorldCloud = payload;
            console.log("dasdad",payload)
        }
    },
})
