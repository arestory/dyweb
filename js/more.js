
var area = localStorage.area
var type = localStorage.type

function getTitle(){
    var  title = ""
    if(area=='china'){
        if(type=='get_movies'){

            title="华语电影"
        }else{    
            title="华语电视剧"
        }

    }else if(area=='rihan'){
        if(type=='get_movies'){
            title="日韩电影"
        }else{
            title="日韩电视剧"
        }
    } else if(area=='oumei'){
        if(type=='get_movies'){
            title="欧美电影" 
 
        }else{
            title="美剧"
        }
    }else{
        if(type=='get_zhongyi'){ 
            title="更多综艺"
        }
    } 
    return title 
}
var app = new Vue({
    el:'#app', 
    item:"",  href:"",
    name:"",
    prePage:"index.html",
    nextPage:'',
    finish:false,
    hadPrePage:false,

    data:{  
        title:getTitle(),
        finish:false,
        
    loadMoreFinish:true,
        items:[],
        hadPrePage:false,
        prePage:"index.html",
        nextPage:'',showDetail:function(title,href){

            showDetail(title,href)
        },
        showPrePage:function(){
            get_data(type,area,app.prePage)

        },
        showNextPage:function(){
            get_data(type,area,app.nextPage)

        },
        back:function(){
            back()
        }

    } 
}) 

function back(){
    // window.location.href='index.html'; 
    window.history.go(-1);
}
function showDetail(name,href){

    window.location.href='detail.html';
    localStorage.index = href
    localStorage.title = name 
    localStorage.prepage = "search.html"
 

}
 

function log(data){
    console.log(data)
}
function get_data(type,area,page){
    if(page!='index.html'){

        app.loadMoreFinish = false
    }
    var url = "http://212.64.93.216:9595/"+type
    $.ajax(url,{
        method:"GET", 
        dataType:'jsonp',
        jsonp:"jsonpCallback",
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'x-requested-with,content-type'
        },
        data:{
            area:area,
            index:page,
        },
        success:function(data){
             log(data)
            var isLoadNextPage = false
            if(page!="index.html"){

                isLoadNextPage = true
                app.loadMoreFinish = true
            }
            var nextpage = data['nextpage']
            var list = data['list'] 
            if(isLoadNextPage){
                app.prePage = app.nextPage
                app.hadPrePage = true
                app.items.push.apply(app.items,list)
            }else{
                app.hadPrePage = false 
                 app.items = list  
            }
            app.nextPage=nextpage 
            app.finish=true

        },
        error:function(e){

            console.log(e)
 
        },
        

    
    })

} 

get_data(type,area,"index.html")

