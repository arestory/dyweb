var app = new Vue({


    el: "#app",
    avatar: "",
    name: "",
    userid:"",
    data: {
        isLoadMoreFinish:true,
        items: [],  
        checkUser:function(userid){
           localStorage.userId = userid
           window.location.href="usergallery.html"
        }

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

                    return item['avatar'].length != 0 && item['gender'] =='F'
                })
                console.log(users)
                if (page > 1) {
                    app.isLoadMoreFinish =true
                    app.items = app.items.concat(users)
                } else {

                    app.items = users
                }
            },
            error:function(e){
                app.isLoadMoreFinish =true
            }

        }

    )

} 

get_user_list(1, 100)

$(window).scroll(function () {

    var viewHeight = 900; //可见高度 
    var windowWidth = $(window).width();
    var count = windowWidth / 200;//行数
    // console.log(app.items.length + 'hhh'  + windowWidth +'width' + count +"count");
    var contentHeight = (app.items.length % count == 0 ? app.items.length / count : app.items.length / count + 1) * 200
    
    // var contentHeight = $("#app").get(0).contentHeight; //内容高度  
    // var contentHeight = $("#app").

    var scrollHeight = $(window).scrollTop(); //滚动高度  
    // console.log("viewHeight:" + viewHeight + ",contentHeight:" + contentHeight + ",scrollHeight:" + scrollHeight);
    if (contentHeight-900-200  - scrollHeight <= 10) {
        // console.log('diaoyong')
        if(app.isLoadMoreFinish){
            get_user_list(currentPage+1, 100)
        }

    }
})

