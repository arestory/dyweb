var app = new Vue({


    el: "#app",
    avatar: "",
    name: "",
    userid:"",
    user:{},
    data: {
        isLoadMoreFinish:true,
        items: [],  
        user:{},
        checkUser:function(user){ 

        //    window.location.href="usergallery.html"
              app.user = user;
              localStorage.userName = user['name']
              console.log(app.user)
              var inst = new mdui.Dialog('#user-dialog');
              
              inst.open(); 

        },
        seeMore:function(userId){
           
            localStorage.lastUserId = userId
            window.location.href='dsc_user_gallery.html'
        },
        interest:function(userId){
            $.ajax('http://212.64.93.216:7575/interest',{

                method: "GET",
                dataType: 'jsonp',
                jsonp: "jsonpCallback",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'x-requested-with,content-type', 
                    
                },
                data: { 
                    userId:userId,
                    token:localStorage.token,
                },
                success: function (data) { 
                        mdui.snackbar({
                            message: data['data'],
                            position: 'bottom'
                          });
                       
                },



            })

        }

    }

}) 

// 搜索
var searchStatus = false;

function search(){ 
    var year = document.getElementById('yearInput').value;
    var hometown = document.getElementById('htInput').value; 
    // if(year.length>0&&hometown.length>0){ 
        
    // }

    searchStatus = true
        start=1;

        app.items =[] 
        search_user_list(year,hometown,1,100);

}

function search_user_list(year,hometown,startIndex, count){

    this.start = startIndex
    if(startIndex!=1){
        app.isLoadMoreFinish = false
    }
    var url = "http://212.64.93.216:7575/get_user_list_with_area_and_birth"
    $.ajax(url, {
            method: "GET",
            dataType: 'jsonp',
            jsonp: "jsonpCallback",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'x-requested-with,content-type', 
                
            },
            data: {
                start: startIndex,
                count: count,
                area:hometown,
                birth:year,
            },
            success: function (data) {
                var users = data.filter(function (item, index) {

                    return item['avatar'].length != 0
                })
                console.log(users)
                if (startIndex > 1) {
                    app.isLoadMoreFinish =true
                    app.items = app.items.concat(users)
                } else { 
                    app.items = users
                }
                app.user = app.items[0];
            },
            error:function(e){
                app.isLoadMoreFinish =true
            }

        }

    )

    
}


var start = 1;
function get_user_list(startIndex, count) {
    this.start = startIndex
    if(startIndex!=1){
        app.isLoadMoreFinish = false
    }
    var url = "http://212.64.93.216:7575/get_user_list"
    $.ajax(url, {
            method: "GET",
            dataType: 'jsonp',
            jsonp: "jsonpCallback",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'x-requested-with,content-type', 
                
            },
            data: {
                start: startIndex,
                count: count,
            },
            success: function (data) {
                var users = data.filter(function (item, index) {

                    return item['avatar'].length != 0
                })
                console.log(users)
                if (startIndex > 1) {
                    app.isLoadMoreFinish =true
                    app.items = app.items.concat(users)
                } else { 
                    app.items = users
                }
                app.user = app.items[0];
            },
            error:function(e){
                app.isLoadMoreFinish =true
            }

        }

    )

} 

function get_90s_user_list(startIndex, count) {
    this.start = startIndex
    if(startIndex!=1){
        app.isLoadMoreFinish = false
    }
    var url = "http://212.64.93.216:7575/get_user_list_between_birthday"
    $.ajax(url, {
            method: "GET",
            dataType: 'jsonp',
            jsonp: "jsonpCallback",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'x-requested-with,content-type',
                'app-version':'3.5.0',
                'meet-token':'3b393bf5dd0ad5d0e7550a244a57d88f'
                
            },
            data: {
                start: startIndex,
                count: count,
                year:1990
            },
            success: function (data) {
                var users = data.filter(function (item, index) {

                    return item['avatar'].length != 0
                })
                console.log(users)
                if (startIndex > 1) {
                    app.isLoadMoreFinish =true
                    app.items = app.items.concat(users)
                } else { 
                    app.items = users
                }
                app.user = app.items[0];
            },
            error:function(e){
                app.isLoadMoreFinish =true
            }

        }

    )

} 

get_user_list(1, 100)

var onlyCheck90s = false;
$("#cb90").change(function() { 
    onlyCheck90s = document.getElementById("cb90").checked 
    start=1;

    app.items =[]
    if(onlyCheck90s){
        get_90s_user_list(1,100)
    }else{
        get_user_list(1, 100) 
    }

    });
 

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
            if(searchStatus){

                var year = document.getElementById('yearInput').value;
                var hometown = document.getElementById('htInput').value; 

                search_user_list(year,hometown,start+100,100)
            }else{
                if(onlyCheck90s){
                    get_90s_user_list(start+100,100)
                }else{
                    get_user_list(start+100, 100) 
                } 
            }
           
        }

    }
})

