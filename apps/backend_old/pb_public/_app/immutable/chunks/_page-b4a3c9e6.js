import{R as t}from"./pocketbase.es-7bb49561.js";async function e({fetch:o,params:r}){return{commutes:(await new t("http://127.0.0.1:8090").collection("dates").getList(1,50,{filter:'created >= "2022-01-01 00:00:00"',expand:"bike"})).items}}const c=Object.freeze(Object.defineProperty({__proto__:null,load:e},Symbol.toStringTag,{value:"Module"}));export{c as _,e as l};