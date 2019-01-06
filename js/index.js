// document.addEventListener('touchmove',null,{passive:false}); 

function showDetail(name,href){

    window.location.href='detail.html';
    localStorage.index = href
    localStorage.title = name 
    localStorage.prepage = "index.html"


}

var appTabChina = new Vue({
    href:"",
    name:"",
    el:'#tab_china',
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

var appTabRihan = new Vue({
    href:"",
    name:"",
    el:'#tab_rihan',
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

var appTabOumei = new Vue({
    href:"",
    name:"",
    el:'#tab_oumei',
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

var appTabZongyi = new Vue({
    href:"",
    name:"",
    el:'#tab_zongyi',
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
            //  log(data)
            var isLoadNextPage = false
            if(page!="index.html"){

                isLoadNextPage = true
            }
            var nextpage = data['nextpage']
            var list = data['list']
            if(areaP=='china'){
                if(type=='get_movies'){

                    appTabChina.movies = list.slice(0,10);
                }else{

                    appTabChina.tvs=   list.slice(0,10); 
                }

            }else if(areaP=='rihan'){

                if(type=='get_movies'){

                    appTabRihan.movies= list.slice(0,10);

                }else{

                    appTabRihan.tvs= list.slice(0,10);

                }
            } else if(areaP=='oumei'){

                if(type=='get_movies'){


                    appTabOumei.movies= list.slice(0,10);

                }else{
                    appTabOumei.tvs= list.slice(0,10);


                }
            }else{
                if(type=='get_zhongyi'){


                    appTabZongyi.movies = list

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


var search = new Vue({

    el:"#search",
    data:{

        search:function(){

            log("click")

        },
        onEnterPress:function(){
            log(event.keyCode)

        },
        cancel:function(){

            log("cancel")
        },
        beginsearch:function(){
            var keyword= $('#searchContent').val()
            var hadError = false
            if(keyword.length==0){ 
               hadError = true
               $('#error').text = "内容不能为空"
            }
            if(keyword&&keyword.length>=2){
                hadError = false
            }else{ 
                hadError = true

                $('#error').text('关键字长度不能小于2'); 

            }
            if(hadError){
                $('#textfield').addClass('mdui-textfield-invalid');
            }else{
                $('#textfield').removeClass('mdui-textfield-invalid');


                localStorage.keyword=keyword
                window.location.href="search.html"

            }
        }
    }
})
function onEnterPress(){

    log(event.keyCode)
    if (event.keyCode == 13){

      alert('haha')
    }}

function searchDy(){
  
     
}
  