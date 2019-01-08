var app = new Vue({


    el: "#app",
    avatar: "",
    name: "",
    data: {
        isLoadMoreFinish:true,
        items: []

    }

}) 
var currentPage = 1;
function get_user_list(page, count) {
    this.currentPage = page
    if(page!=1){
        app.isLoadMoreFinish = false
    }
    var url = "http://212.64.93.216:9090/users"
    $.ajax(url, {
            method: "GET",
            dataType: 'jsonp',
            jsonp: "jsonpCallback",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'x-requested-with,content-type'
            },
            data: {
                page: page,
                count: count,
            },
            success: function (data) {
                var users = data.filter(function (item, index) {

                    return item['avatar'].length != 0
                })
                console.log(users)
                if (page > 1) {
                    app.isLoadMoreFinish =true
                    app.items = app.items.concat(users)
                } else {

                    app.items = users
                }
            }

        }

    )

} 

get_user_list(1, 100)

$(window).scroll(function () {

    var viewHeight = $(window).height(); //可见高度  

    var contentHeight = $("#app").get(0).scrollHeight; //内容高度  

    var scrollHeight = $(window).scrollTop(); //滚动高度  
    console.log("viewHeight:" + viewHeight + ",contentHeight:" + contentHeight + ",scrollHeight:" + scrollHeight);
    if (viewHeight - scrollHeight <= 954) {

        if(app.isLoadMoreFinish){
            get_user_list(currentPage+1, 100)

        }

    }
})


