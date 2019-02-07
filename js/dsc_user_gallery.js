var app = new Vue({


    el: "#app",  
    data: {
        isLoadMoreFinish:true,
        items: [],  
        img:"", 
        title:localStorage.userName,
        checkPhoto:function(img){ 
            app.img = img
            var inst = new mdui.Dialog('#user-dialog');
              
            inst.open(); 
        }

    }

}) 
var currentLastId = '0'

var items = []

function get_user_gallery(lastId) {
    this.currentLastId = lastId
    if(lastId!='0'){
        app.isLoadMoreFinish = false
    }

    token = localStorage.token 
    var url = localStorage.localhost+"/get_user_gallery"
    $.ajax(url, {

          method :"GET",
          dataType: 'jsonp',
          jsonp: "jsonpCallback",
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'x-requested-with,content-type',
          },
          data: {
              token:token,
              userId: localStorage.lastUserId, 
              lastId: lastId,
          },
          success:function(res){

            var data = res['data']
            if(data){ 
                items = data
                if(lastId=='0'){
                    if(items.length==0){
                        
                        alert('该用户没有动态')
                    }
                    app.items = items

                }else{

                    app.items = app.items.concat(items)

                    app.isLoadMoreFinish =true
                }
                
                currentLastId = app.items[app.items.length-1]['feeds_id']

            }
              console.log(res)
          },
          error:function(e){
              app.isLoadMoreFinish =true
          }
          


    }) 
} 

function back(){

    window.history.go(-1);

}
 
get_user_gallery(currentLastId)

 

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
            get_user_gallery(currentLastId)
        }

    }
})

