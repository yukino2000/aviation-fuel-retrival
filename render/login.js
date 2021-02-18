
const remote=require("electron").remote;
const {dialog}=require("electron").remote;
const {ipcRenderer}=require("electron");
const mysql=require("mysql");


window.onload=function()
{
    let loginbtn=document.querySelector("#bigbox .inputbox input[value='登陆']");
    let close=document.querySelector(".fa.fa-close");
    let minimize=document.querySelector(".fa.fa-window-minimize");
    loginbtn.onclick=()=>
    {
        login_check();
    };
    document.querySelector("#bigbox .inputbox input[value='注册']").onclick=()=>
    {
        ipcRenderer.send("applyforregister",true);
    };

    document.onkeydown=(e)=>
    {
        if(e.keyCode==13)
        {
            login_check();
        }
    }
    close.onclick=()=>
    {
        remote.getCurrentWindow().close();
    }
    minimize.onclick=()=>
    {
        remote.getCurrentWindow().minimize();
    }
}

function check_delay()//登陆等待函数
{
    document.querySelector("#load_box").style.display="flex";
}
function clear_delay()//清空等待动图函数
{
    document.querySelector("#load_box").style.display="none";
}

function showlogintip(adjust)
{
    if(adjust==0)
    {
        dialog.showMessageBox({
            type:"error",
            buttons:["确定"],
            title:"登陆失败",
            message:"请检查账号密码是否输入错误或者网络问题",
        });
    }
}

function buildloginconnection()
{
    let con=mysql.createConnection({
        host:"82.156.23.53",
        user:"client",
        port:"3306",
        password:"client",
        database:"clientuser",
        dateStrings:true,
        connectTimeout:10000,
    });
    return con;
}
function login_check()
{
    check_delay();
    let user=document.querySelector("#bigbox .inputbox .inputtext input[type='text']").value;
    let password=document.querySelector("#bigbox .inputbox input[type='password']").value;
    let con=buildloginconnection();
    con.query("select * from ?? where ?? = ? and ?? = ?",["clientuser","username",user,"password",password],(error,results,field)=>
    {
        if(error)
        {
            showlogintip(0);
            console.log(error);
        }
        else
        {
            console.log(results);
            if(results.length>0)
                ipcRenderer.send("access_permissions",results);
            else
            {
               showlogintip(0);
            }
        }
        clear_delay();
        con.end();
    });
}
