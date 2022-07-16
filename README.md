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

                  2022-7-16更新分割线
-----------------------------------------------------------
时隔多年终于稍微了理解git，其实也就是在工作中用到被迫学习哈哈

无论是git init还是git clone下来的都是仓库，既然是仓库，就会有不同分支，分支这个概念相当于是一个指针，并不是说一个分支上有很多对象这样

也就是说初始化下来的分支指向的都是当前最新的数据快照，从前的更新过的历史若是没有分支指向的话，就目前的学习到的知识而言是没法获取的。。

每次更新文件内部的内容，如果未放到暂存区的，需要git add一下文件把文件放到暂存区；

在暂存区的文件则做好了可以放到仓库的准备，通过git commit -a -m命令可以把暂存区中的放到本地仓库目前所在的分支当中，也就是当前分支向后移一个数据快照；

（git commit -a正确来说会把之前监视过的文件跳过暂存阶段直接提交）

git remote show 仓库名 可以查看远程仓库的情况;

git remote -v 可以查看目前已有的仓库

git remote add 别名 远程地址 可以添加远程仓库到本地，和git clone下来的初始仓库是一样的，只不过现在相当于多了一个

git remote rename 别名 别名   将远程仓库的别名改成另一个别名

git remote rm 别名   删除对应的远程仓库

git status 可以查看当前分支下数据快照的情况，例如是否暂存，分支名等

git log 可以查看分支之前的commit历史等等，甚至可以查看当前分支下别的分支情况，还有地图预览模式--graph --all

git fetch 仓库名 可以更新远程仓库到本地仓库数据

git push 仓库名 本地分支:远程仓库分支   该命令可以将本地分支更新到远程仓库上的指定分支，如果远程仓库上没有指定的分支就自动新建一个

git push 仓库名 --delete 远程分支名 可以删除远程仓库里的指定分支

git branch 可以查看本地目前拥有的分支

git branch 分支名 可以在当前分支上新建分支只想目前的分支指向的数据快照

git checkout 分支名 可以切换到分支名

git merge 分支名  将指定的分支合并到目前所在的分支上，并扩展延申数据快照

