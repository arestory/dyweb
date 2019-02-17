
var app = new Vue({

    el: "#app", 
    percent:1,
    data:{
        stocks:[]


    }})

function query925stocks(){


    var url = 'http://127.0.0.1:2000/query925stocks'
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

                        item['color']='#ff4081'
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