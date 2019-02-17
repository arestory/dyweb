
var app = new Vue({

    el: "#app", 
    data:{
        stocks_yes:[],
        add_stock:function(){

            var code = document.getElementById('codeInput').value;
            var name = document.getElementById('nameInput').value; 
            var volInput = document.getElementById('volInput').value; 
            if(code.length==0|name.length==0|volInput.length==0){
                alert('不能为空')
            }else{
                for( var i=0;i<app.stocks_yes.length;i++){

                    var item = app.stocks_yes[i]
                    if(name==item['name']||code==item['code']){
                        alert('已存在股票：'+name)
                        return
                    } 
                }
                document.getElementById('codeInput').value=""
                document.getElementById('nameInput').value=""
                document.getElementById('volInput').value=""

                app.stocks_yes= app.stocks_yes.concat({'name':name,'vol_on_up':volInput,'code':code})

            }

        },
        remove:function(item){


            var index = indexOf(app.stocks_yes,item)
            app.stocks_yes.splice(index,1)

             
        },
        commit_stock_list:function(){
            var url = 'http://127.0.0.1:2000/add_stock_list'
            $.ajax(url, {
                method: "POST",
                dataType: 'jsonp',
                jsonp: "jsonpCallback",
                contentType: "application/json;charset=utf-8",
                data:app.stocks_yes,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'x-requested-with,content-type', 
                },
                data: {

                    list:JSON.stringify(app.stocks_yes)
                },
                success: function (data) {
                    
                },
                error:function(e){
                    
                }
    
            }
    
        )
            
        }

    }

    
})

function indexOf(list,item){

    for( var i=0;i<list.length;i++){

        if(list[i]==item){

            return i;
        } 
    }

    return -1;

}

function add_stock(){



}


function query_add_stock(){



}