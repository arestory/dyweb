

var href = localStorage.index
var title = localStorage.title
var prepage = localStorage.prepage
var tabBar = new Vue({
    el:'#bar',
    coverImg:"",
    desc:[],
    item:"",
    downloadList:[],
    data:{
        message:"haha",
        href:href,
        title:title,
        coverImg:"",
        desc:[],
        prepage:prepage,
        downloadList:[],
        finish:false,

        back:function(){
            back()
        }
        
    } 
}) 
var app = new Vue({
    el:'#app',
    coverImg:"",
    desc:[],
    item:"",
    downloadList:[],
    data:{
        message:"haha",
        href:href,
        title:title,
        coverImg:"",
        desc:[],
        downloadList:[],
        finish:false,

        back:function(){
            back()
        }
        
    } 
}) 

function back(){
    window.location.href=prepage; 

}

function getDetail(href){
    var url = "http://212.64.93.216:9595/movie/detail"

    $.ajax(url,{
        method:"GET", 
        dataType:'jsonp',
        jsonp:"jsonpCallback",
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'x-requested-with,content-type'
        },
        data:{
            url:href,
        },
        success:function(data){

            console.log(data)
            app.coverImg = data['coverImg']
            app.desc=data['desc']
            app.downloadList = data['downloadList']
            app.finish = true 
        }})
}

getDetail(href)