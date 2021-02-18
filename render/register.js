const mysql=require("mysql");
const {ipcRenderer}=require("electron");
const {remote}=require("electron");

window.onload=function()
{
    document.querySelector("#body .register_confirm").onclick=function()
    {
        check_delay();
        if(checkuserinput())
            submitregistration();
        else
            clear_delay();
    };
    document.onkeydown=(e)=>
    {
        if(e.key=="Enter")
        {
            check_delay();
            if(checkuserinput())
                submitregistration();
            else
                clear_delay();
        }
    }
    document.querySelector(".fa.fa-close").onclick=function()
    {
        remote.getCurrentWindow().close();
    }
    document.querySelector(".fa.fa-window-minimize").onclick=function()
    {
        remote.getCurrentWindow().minimize();
    }
}

function check_delay()//注册等待函数
{
    document.querySelector("#load_box").style.display="flex";
}
function clear_delay()//清空等待动图函数
{
    document.querySelector("#load_box").style.display="none";
}
function checkuserinput()//检查用户输入是否合法
{
    let input=document.querySelectorAll("#body .input_box input");
    let tip=document.querySelector("#body .register_tip");
    let checkreg=new RegExp("^[0-9,a-z,A-Z]{1,}$");
    if(input[0].value.search(checkreg)==-1||input[1].value.search(checkreg)==-1)
    {
        tip.textContent="用户名和密码必须为非空的英文和数字组成";
        tip.className="register_tip red_tip";
        return false;
    }
    tip.textContent="格式符合规范，请等待。。。";
    tip.className="register_tip";
    return true;
}
function buildregisterconnection()//建立mysql数据库连接
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

function submitregistration()//提交用户申请，如果已存在该用户则返回错误信息，否则成功申请
{
    let con=buildregisterconnection();
    console.log("开始提交了");
    let input=document.querySelectorAll("#body .input_box input");
    let convalues=["clientuser","username",input[0].value];
    con.query("select * from ?? where ?? = ?",convalues,(err,results,field)=>
    {
        let tip=document.querySelector("#body .register_tip");
        if(err)
        {
            tip.textContent="网络可能出了一些状况";
            tip.className="register_tip red_tip";
            con.end();
            console.log(err);
        }
        else
        {
            if(results.length>0)
            {
                tip.textContent="该用户名已存在";
                tip.className="register_tip red_tip";
                con.end();
            }
            else
            {
                convalues=["clientuser","username","password",input[0].value,input[1].value];
                con.query("insert into ??(??,??) values(?,?)",convalues,(inserterr,insertresult)=>
                {
                    if(inserterr)
                    {
                        tip.textContent="网络可能出了一些状况";
                        tip.className="register_tip red_tip";
                        con.end();
                        console.log(inserterr);
                    }
                    else if(insertresult.affectedRows>0)
                    {
                        tip.textContent="注册成功，准备登录..";
                        tip.className="register_tip";
                        let useroption=[{username:input[0].value,password:input[1].value}];
                        ipcRenderer.send("registersuccessfully",useroption);
                        con.end();
                        let currentwin=remote.getCurrentWindow();
                        currentwin.close();
                    }
                });
            }
        }
        clear_delay();
    });
}