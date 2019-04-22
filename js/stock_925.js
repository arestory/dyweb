if (!localStorage.stock_url) {
    localStorage.stock_url = 'http://localhost:9595'
}
var app = new Vue({

    el: "#app",
    percent: 1,

    data: {
        stocks: [],
        sort_up: false, 
        sort_text:'比率（升序）',
        sort: function () {

           if(app.sort_up){
            app.stocks = app.stocks.sort(function(a,b){

                return a['percent']-b['percent']
            }) 

            app.sort_text = '比率（升序）' 
            app.sort_up=false 
           }else{
            app.stocks.reverse() 
            app.sort_up=true  
            app.sort_text = '比率（降序）'

           }
        }



    }
})
 
function showData(data){

    console.log(data)
}

function query925stocks() {

 
    var url = localStorage.stock_url + '/query925stocks'
    $.ajax(url, {
            method: "GET",
            data: app.stocks_yes,
            contentType: "application/json;charset=utf-8",
            // dataType: 'jsonp',
            // jsonp: "jsonpCallback",
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Headers': 'x-requested-with,content-type',
            // },
            // jsonpCallback:"showData",
            success: function (data) {
                console.log(data);
                if (data.length == 0) {
                    alert('没有9.25的数据')
                } else {
                    var newData = []
                    for (index in data) {

                        var item = data[index]
                        if (item['percent'] >= 1) {

                            item['color'] = '#c00c00'
                        } else {
                            item['color'] = '#000000'

                        }
                        newData = newData.concat(item)

                    }
                    app.stocks = app.stocks.concat(newData).sort(function(a,b){

                        return a['percent']-b['percent']
                    }) 

                console.log(newData)
                }
            },
            error: function (e) {

            }

        }

    )




}


query925stocks()