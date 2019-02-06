var app = new Vue({


    el: "#app", 
    data: {
        isLogin:false, 
        
    name:localStorage.loginUserName,
    pwd:localStorage.loginUserPwd,
        loginClick:function(){
          
            var name = document.getElementById('nameInput').value;
            var pwd = document.getElementById('pwdInput').value;
            login(name,pwd)
        }

    }

}) 



function jumpGallery(){

    if(localStorage.token.length>0){

        window.location.href="dsc_gallery.html"
    }
}
jumpGallery();

var result;
 
function login(name,pwd){
    console.log('name = '+name +",pwd = "+pwd)
    if(name.length==0||pwd.length==0){
        
        alert('用户名密码不能为空')
        return;
    }

    changeLoginStatus(false)
    var url = 'http://127.0.0.1:5555/login';
    $.ajax(url,{
        method:"GET",  
        data:{
            'name':name,
            'password':pwd
        },
        dataType:'jsonp',
        jsonp:"jsonpCallback",
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'x-requested-with,content-type'
        },
        success:function(data){
            console.log(data)
            app.isLogin=false
            result=data;
            
            changeLoginStatus(true);
            if(data['code']==0){
                alert('登陆成功');
                localStorage.loginUser = data['data']
                localStorage.loginUserName = name
                localStorage.loginUserPwd = pwd
                localStorage.token = data['data']['token']
                
                jumpGallery();
            }else{
                alert(data['msg']);
            }
             

        }})

}

function changeLoginStatus(finish){

    app.isLogin=!finish
    if(!finish){
        $('#loginBtn').text("正在登录中")
        $('#loginBtn').attr('disabled','true')
        $('#pwdInput').attr('disabled','true')
        $('#nameInput').attr('disabled','true')

    }else{
        $('#loginBtn').text("登陆")
        $('#loginBtn').removeAttr('disabled')
        $('#pwdInput').removeAttr('disabled')
        $('#nameInput').removeAttr('disabled')
    }

}