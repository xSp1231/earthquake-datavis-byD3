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
        temp:[
            { name: "德", value: 10 },
            { name: "绵", value: 12 },
            { name: "成", value: 20 },
            { name: "乐", value: 15 },
            { name: "雅", value: 8 },
            { name: "九", value: 7 },
            { name: "南", value: 11 },
            { name: "宜", value: 13 },
        ],
        temp1:[
            { name: "德1", value: 10 },
            { name: "绵11", value: 12 },
            { name: "成11", value: 20 },
            { name: "乐11", value: 15 },
            { name: "雅11", value: 8 },
            { name: "九11", value: 7 },
            { name: "南11", value: 11 },
            { name: "宜11", value: 13 },
        ],
        WorldCloud:"四川",
        provinceName:"四川",
        provinceIntro:{ //设置默认数据
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
        getDataByProvince(state, province) { //得到每个省份的相关信息 展示在左边 饼图 和统计列表里面
            state.count++;
            state.provinceName=province
            console.log("得到的省份数据", state.provinceIntro.piedata)
            console.log("点击的省份", province)
            var t
             d3.csv("earthquake_data_province_intro.csv").then(data=>{
                 console.log("d3 读取的data is ",data)
                 t=data.filter(d => d.province===province)
                 console.log(t[0].intro);
                 console.log(t[0].deathnum);
                 console.log(t[0].injurenum);
                 console.log(t[0].total);
                 state.provinceIntro.intro=t[0].intro;
                 state.provinceIntro.injure=t[0].injure;
                 state.provinceIntro.death=t[0].death;
                 state.provinceIntro.total=t[0].total;
                 console.log( state.provinceIntro.injure=t[0].injure , "vuex里的");
                 console.log( state.provinceIntro.death=t[0].death);

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
