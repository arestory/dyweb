// localStorage.stock_url = 'http://127.0.0.1:2000'
localStorage.stock_url = 'http://212.64.93.216:2525'
var app = new Vue({

    el: "#app",
    data: {
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
                    if (name == item['name'] || code == item['code']) {
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
                    'code': code
                })

            }

        },
        removeTodayStock: function (item) {

            var url = localStorage.stock_url + '/deleteTodayAddStock'
            $.ajax(url, {
                    method: "POST",
                    dataType: 'jsonp',
                    jsonp: "jsonpCallback",
                    contentType: "application/json;charset=utf-8",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'x-requested-with,content-type',
                    },
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
            var url = localStorage.stock_url + '/add_stock_list'
            $.ajax(url, {
                    method: "POST",
                    dataType: 'jsonp',
                    jsonp: "jsonpCallback",
                    contentType: "application/json;charset=utf-8",
                    data: app.stocks_yes,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'x-requested-with,content-type',
                    },
                    data: {
                        create_time: time,
                        list: JSON.stringify(app.stocks_yes)
                    },
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
    if (month < 10) {
        month = '0' + month
    }
    var day = myDate.getDate();
    if (day < 10) {
        day = '0' + day

    }
    var time_stamp = year + '-' + month + '-' + day;

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
            method: "POST",
            dataType: 'jsonp',
            jsonp: "jsonpCallback",
            contentType: "application/json;charset=utf-8",
            data: app.stocks_yes,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'x-requested-with,content-type',
            },
            data: {

                list: JSON.stringify(app.stocks_yes)
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