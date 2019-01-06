var keyword = localStorage.keyword

var app = new Vue({

    el:"#app",
    data:{
        empty:false,
        finish:false,
        name:"",
        href:"",
        keyword:keyword,
        items:[{
            name:"正在加载数据",
            href:"",
        },],showDetail:function(title,href){

            localStorage.index = href
            localStorage.title = title 
            console.log(title)
            window.location.href='detail.html';
            localStorage.prepage = "search.html"
        },
        back:function(){
            back()
        }
    }

})

function back(){
    window.location.href='index.html'; 


}


function get_data(keyword){

    var url = "http://212.64.93.216:9595/search/movie/"+keyword
    $.ajax(url,{
        method:"GET", 
        dataType:'jsonp',
        jsonp:"jsonpCallback",
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'x-requested-with,content-type'
        }, 
        success:function(data){
            
            console.log(data)
            var list = data['list'] 

            app.items = list   
            app.finish=true
            if(list.length==0){
                app.empty = true
            } 

        },
        error:function(e){

            console.log(e)
            app.empty = true 
            app.finish=true
        },
        

    
    })

} 

get_data(keyword)