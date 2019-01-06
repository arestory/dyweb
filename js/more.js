
var area = localStorage.area
var type = localStorage.type
var app = new Vue({
    el:'#app', 
    item:"",  href:"",
    name:"",
    prePage:"index.html",
    nextPage:'',
    loadMoreFinish:false,
    finish:false,
    hadPrePage:false,
    data:{  
        finish:false,
        loadMoreFinish:false,
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
            window.location.href='index.html'; 
        }

    } 
}) 
function showDetail(name,href){

    window.location.href='detail.html';
    localStorage.index = href
    localStorage.title = name 
    localStorage.prepage = "search.html"
 

}
 

function log(data){
    console.log(data)
}
function get_data(type,areaP,page){

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
            area:areaP,
            index:page,
        },
        success:function(data){
             log(data)
            var isLoadNextPage = false
            if(page!="index.html"){

                isLoadNextPage = true
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

