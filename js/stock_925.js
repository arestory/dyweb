
if(!localStorage.stock_url){
    localStorage.stock_url = 'http://212.64.93.216:2525'
}
var app = new Vue({

    el: "#app", 
    percent:1,
    data:{
        stocks:[]


    }})

function query925stocks(){


    var url = localStorage.stock_url+'/query925stocks'
    $.ajax(url, {
        method: "GET",
        dataType: 'jsonp',
        jsonp: "jsonpCallback",
        contentType: "application/json;charset=utf-8",
        data:app.stocks_yes,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'x-requested-with,content-type', 
        },
        success: function (data) {
            if(data.length==0){
                alert('没有数据')
            }else{
                var newData = []
                for(index in data){

                    var item = data[index]
                    if(item['percent']>=1){

                        item['color']='#c00c00'
                    }else{
                        item['color']='#000000'

                    }
                    newData=newData.concat(item)
                     
                }
                app.stocks = app.stocks.concat(newData)
            }
            console.log(newData)
        },
        error:function(e){
            
        }

    }

)




}


query925stocks()