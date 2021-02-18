const {app,BrowserWindow,Tray,Menu} = require("electron");
let path=require("path");
const { IncomingMessage } = require("http");
const { BrowserView } = require("electron");
const {ipcMain}=require("electron");
const mysql=require("mysql");
const os=require("os");

let win=null;
let tray=null;
let tray_menu=null;
let userdir=path.join(os.homedir(),"avation");

app.on("ready",function()
{
    login_browser();
});
ipcMain.on("access_permissions",(event,param)=>           //用于接受来自登陆渲染进程的信息
{
    if(param)
    {
        win.hide();
        let exwin=win;
        main_browser(param);
        exwin.close();
        tray_establish();
    }
});

ipcMain.on("applyforregister",(event,param)=>         //用于打开注册窗口
{
    if(param)
    {
        register_browser();
    }
});

ipcMain.on("registersuccessfully",(event,param)=>//注册成功后进入客户端，关闭登陆界面
{
    win.hide();
    let exwin=win;
    main_browser(param);
    exwin.close();
    tray_establish();
});
function tray_establish()
{
    tray=new Tray(path.join(__dirname,"data/icon.png"));
    tray.on("click",()=>
    {
        win.show();
    });
    tray_menu=Menu.buildFromTemplate([{
        click()
        {
            win.minimize();
        },
        label:"最小化",
        type:"normal"
    },{
        click()
        {
            win.maximize();
        },
        label:"最大化",
        type:"normal"
    },{
        click()
        {
            tray.destroy();
            tray=null;
            win.close();
        },
        label:"退出应用",
        type:"normal"
    }])
    tray.setContextMenu(tray_menu);
}
function login_browser()
{
    win=new BrowserWindow({
        webPreferences:{nodeIntegration:true},
        useContentSize:true,
        height:340,
        width:496,
        frame:false,
        resizable:false,
        icon:path.join(__dirname,"data/icon.png"),
        center:true,
        hasShadow:true,
        title:"航油规范检索",
    });
    win.loadFile("page/login.html");
    //win.webContents.openDevTools({mode:"detach",activate:false});
    win.once("ready-to-show",()=>
    {
        win.show();
    });
}
function main_browser(client)
{
    win=new BrowserWindow(
    {
        webPreferences:
        {
            nodeIntegration:true,
        },
        width:1000,
        height:800,
        frame:false,
        minHeight:650,
        minWidth:650,
        icon:path.join(__dirname,"data/icon.png"),
        title:"航油规范检索",
        plugin:true,
        show:false
    });
    win.loadFile("page/main.html");
    //win.webContents.openDevTools({mode:"detach",activate:false});//打开开发者工具

    win.webContents.on("did-finish-load",()=>
    {
        win.webContents.send("getclientname",client);//将登陆的用户信息发送个渲染进程
    });
    win.on("close",function(e)
    {
        if(tray==null)
        {
            win=null;
            const fs=require("fs");
            fs.rmdirSync(userdir,{recursive:true});//清除临时数据
            app.quit();
        }
        else
        {
            e.preventDefault();
            win.hide();
        }
    });
    win.once("ready-to-show",()=>
    {
        win.show();
    });
    
}

function register_browser()//创建注册窗口
{
    let register=new BrowserWindow(
    {
        webPreferences:
        {
            nodeIntegration:true,
        },
        width:497,
        height:297,
        frame:false,
        resizable:false,
        icon:path.join(__dirname,"data/icon.png"),
        title:"航油规范检索注册页面",
        center:true
    });
    register.loadFile("page/register.html");
    //register.webContents.openDevTools({mode:"detach",activate:false});
    register.on("close",()=>
    {
        register=null;
    })
    register.once("ready-to-show",()=>
    {
        register.show();
    });
}