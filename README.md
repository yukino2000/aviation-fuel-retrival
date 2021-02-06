# aviation-fuel-retrival
my first project created in my university about aviation fuel retrival 

关于git工具使用的几个基本要素：
1、.gitignore是用git来做版本控制工具时的监控文件是否变化的配置文件
也就是说哪些文件是需要监控的，哪些文件不是需要监控的，是通过配置该文件来实现的。
具体如何配置该文件则查看文档。

命令行上传项目
1、创建好.gitignore文件后，在命令行环境下cd到你要上传的项目路径。
2、运行git init
3、然后配置该路径下的用户名和邮箱，git config user.name 名字 和 git config user.email 邮箱
4、运行git remote add origin https://github.com/yukino2000/你的存储库.git
5、运行 git add .
6、运行 git commit -m "你想要给这次提交标上什么标题？"
7、运行 git push origin master

目前还不知道为什么不能直接git push origin main,暂时这样记录.
