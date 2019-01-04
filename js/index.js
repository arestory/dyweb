function showDetail(name,href){

    window.location.href='detail.html';
    localStorage.index = href
    localStorage.title = name 
 

}
var appChina = new Vue({
    href:"",
    name:"",
    el:'#app-china',
    data:{
        message:"haha",
        movies:[{
            name:"正在加载数据",
            href:""

        }],showDetail:function(title,href){

           showDetail(title,href)
        },showMoreMovie:function(){
            showMore('china',"get_movies")
        },showMoreTv:function(){ 
            showMore('china',"get_tvs")
        },
        tvs:[{
            name:"正在加载数据",
            href:""

        }],
    }


})
function showMore(area,type){

    localStorage.area = area
    localStorage.type = type
    window.location.href='more.html';

}
var appRihan = new Vue({
    
    href:"",
    name:"",
    el:'#app-rihan',
    data:{
        message:"haha",
        movies:[{
            name:"正在加载数据",
            href:""

        }],
        tvs:[{
            name:"正在加载数据",
            href:""

        }],showDetail:function(title,href){

            showDetail(title,href)
        },showMoreMovie:function(){
            showMore('china',"get_movies")
        },showMoreTv:function(){
           
            showMore('china',"get_tvs")
        },
    }


})
var appOumei = new Vue({ 
    href:"",
    name:"",
    el:'#app-oumei',
    data:{
        message:"haha",
        movies:[{
            name:"正在加载数据",
            href:""

        } ],
        tvs:[{
            name:"正在加载数据",
            href:""

        }],showDetail:function(title,href){

            showDetail(title,href)
        },showMoreMovie:function(){
            showMore('china',"get_movies")
        },showMoreTv:function(){
           
            showMore('china',"get_tvs")
        },
    }


})
var appZongyi = new Vue({
    url:"",
    el:'#app-zongyi',
    data:{
        message:"haha",
        movies:[{
            name:"正在加载数据",
            href:""

        } ],showDetail:function(title,href){

            showDetail(title,href)
        },showMore:function(){

            showMore("china","get_zhongyi")
        }
    }


})

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
            if(areaP=='china'){
                if(type=='get_movies'){
                    appChina.movies= list.slice(0,15);

                }else{
                    appChina.tvs= list.slice(0,15); 
                }

            }else if(areaP=='rihan'){

                if(type=='get_movies'){
                    appRihan.movies= list.slice(0,15);

                }else{
                    appRihan.tvs= list.slice(0,15); 
                }
            } else if(areaP=='oumei'){

                if(type=='get_movies'){
                    appOumei.movies= list.slice(0,15);

                }else{
                    appOumei.tvs= list.slice(0,15); 
                }
            }else{
                if(type=='get_zhongyi'){

                    appZongyi.movies=list 

                }
            } 
            
            

        },
        error:function(e){

            console.log(e)
        },
        

    
    })

}
 
get_data("get_movies","china","index.html")
get_data("get_tvs","china","index.html")
get_data("get_movies","rihan","index.html")
get_data("get_tvs","rihan","index.html")
get_data("get_movies","oumei","index.html")
get_data("get_tvs","oumei","index.html") 
get_data("get_zhongyi","","index.html")