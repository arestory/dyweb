// localStorage.stock_url = 'http://127.0.0.1:2000'
localStorage.stock_url = 'http://localhost:9595'
var app = new Vue({

    el: "#app",
    data: {
        date_hint:'',
        stocks_yes: [],
        stocks_today_add: [],
        isLoadTodayFinish: false,
        add_stock: function () {
            var time = document.getElementById('dateInput').value
            if (time.length < 10) {
                time = getTimeStamp();
                document.getElementById('dateInput').value =time 
            }
            var code = document.getElementById('codeInput').value;
            var name = document.getElementById('nameInput').value;
            var volInput = document.getElementById('volInput').value;
            if (code.length == 0 | name.length == 0 | volInput.length == 0) {
                alert('不能为空')
            } else {
                for (var i = 0; i < app.stocks_yes.length; i++) {

                    var item = app.stocks_yes[i]
                    if (name == item['name'] || code == item['id']) {
                        alert('已存在股票：' + name)
                        return
                    }
                }
                document.getElementById('codeInput').value = ""
                document.getElementById('nameInput').value = ""
                document.getElementById('volInput').value = ""

                app.stocks_yes = app.stocks_yes.concat({
                    'name': name,
                    'vol_on_up': volInput,
                    'id': code,
                    'createTime':time
                })

            }

        },
        removeTodayStock: function (item) {

            console.log(item);
            var url = localStorage.stock_url + '/deleteTodayAddStock'
            $.ajax(url, {
                    method: "GET",
                    // dataType: 'jsonp',
                    // jsonp: "jsonpCallback",
                    // headers: {
                    //     'Access-Control-Allow-Origin': '*',
                    //     'Access-Control-Allow-Headers': 'x-requested-with,content-type',
                    // },

                    contentType: "application/json;charset=utf-8",
                    data: {

                        id: item['id']
                    },
                    success: function (data) {

                        alert('删除成功')

                        var index = indexOf(app.stocks_today_add, item)
                        app.stocks_today_add.splice(index, 1)

                    },
                    error: function (e) {
                        alert('提交失败')
                    }

                }

            )

        },
        remove: function (item) {


            var index = indexOf(app.stocks_yes, item)
            app.stocks_yes.splice(index, 1)


        },
        commit_stock_list: function () {
            var time = document.getElementById('dateInput').value
            if (time.length < 10) {
                time = getTimeStamp();
                document.getElementById('dateInput').value =time
            }
            var jsonData = {

                createTime: time,
                list:app.stocks_yes
            };
            jsonData = JSON.stringify(jsonData)
            console.log(time);
            var url = localStorage.stock_url + '/add_stock_list'
            $.ajax(url, {
                    method: "POST",
                    contentType: "application/json;charset=utf-8", 
                    // dataType: 'jsonp',
                    // jsonp: "jsonpCallback",
                    // headers: {
                    //     'Access-Control-Allow-Origin': '*',
                    //     'Access-Control-Allow-Headers': 'x-requested-with,content-type',
                    // },
                    dataType: "json",
                    data:jsonData,
                    success: function (data) {

                        alert('提交成功')
                        refesh()
                    },
                    error: function (e) {
                        alert('提交失败')
                    }

                }

            )

        }

    }


})




function getTimeStamp() {

    var myDate = new Date();
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1; //获取当前月份(1-12)
    var day = myDate.getDate(); 
    var hour = myDate.getHours();//获取小时
    //如果当前小时为15点前，将日期设置为前一天，因为可能是在今天录入昨天的数据
    if(hour<15){
        day = day-1;
    }
    //纠正日期
    if(day==0){
        var tmp_month = month-1
        if(tmp_month ==2 ){
            
            day = 28
        }else if(tmp_month==0||tmp_month==1||tmp_month==3||tmp_month==5||tmp_month==7||tmp_month==8||tmp_month==10||tmp_month==12){
            day = 31
        } 
        else{
            day =30
        }
        if(tmp_month==0){
            month = 12
            year = year-1
        }else{
            month = tmp_month
        }
    }
    if (month < 10) {
        month = '0' + month
    }
    
    console.log('hour = '+hour);
    if (day < 10) {
        day = '0' + day 
    }
    var time_stamp = year + '-' + month + '-' + day;
    
    if(hour<6){
        app.date_hint = "夜深了，已将日期调整至昨天’"+time_stamp+"'"
    }else if(hour<9){
        app.date_hint = "还没开盘，已将日期调整至昨天’"+time_stamp+"'"

    }else if(hour<=15){
        app.date_hint = "未收盘，日期调整至昨天’"+time_stamp+"'"
    }else if(hour>=22){
        app.date_hint = "夜深了，请注意休息，输入如’"+time_stamp+"'"
    }
    else{
        app.date_hint = "日期，输入如’"+time_stamp+"'"
    }
    return time_stamp;
}
var time_stamp = getTimeStamp()
document.getElementById('dateInput').value = time_stamp


function refesh() {
    app.stocks_yes = []
    app.stocks_today_add = []
    app.isLoadTodayFinish = false
    query_today_add_stock()

}


function indexOf(list, item) {

    for (var i = 0; i < list.length; i++) {

        if (list[i] == item) {

            return i;
        }
    }

    return -1;

}

function add_stock() {


}


query_today_add_stock()

function query_today_add_stock() {

    var url = localStorage.stock_url + '/queryTodayStocks'
    $.ajax(url, {
            method: "GET",
            contentType: "application/json;charset=utf-8",
            data: app.stocks_yes,
            // dataType: 'jsonp',
            // jsonp: "jsonpCallback",
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Headers': 'x-requested-with,content-type',
            // },
            data: {
                date:getTimeStamp()
            },
            success: function (data) {

                if (data.length > 0) {

                    app.stocks_today_add = app.stocks_today_add.concat(data)
                }
                app.isLoadTodayFinish = true

            },
            error: function (e) {
                app.isLoadTodayFinish = true

            }

        }

    )

}