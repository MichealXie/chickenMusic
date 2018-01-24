# 我的网易云
## 功能
+ 真实歌单, 所有你想要的歌单都有
+ 随机 FM!!!
+ 每日推荐!!!
+ 搜索功能强大, 无论是歌曲还是用户信息, 歌手信息还是歌单合集都支持
+ 登录后为什么不试着点击一下爱心呢?
+ 歌单/音乐评论
+ 播放模式(单曲/ 列表/ 随机)
+ 看到有意思的用户你就不想看看他的歌单吗?
+ 支持登录
+ 快捷键切歌/ 调节音量( control + jkli )
+ 完全自适应, 任何设备都用相同的体验
+ 排行榜那么多热门歌曲不看看嘛?

## what's next?
1. 抽离组件, 包括但不限于: 顶部 header, 歌单列表 item

3. 歌手页 难度 2

5. 滑动上下曲  难度 1

7. 搜索界面拓展页面 难度 2



10. 偷懒的复杂: 记录下排行榜的逻辑: store 传递一个信息, type = 'hot/recommend', 点击改变对应的 type, list-details  里的songListDetail 根据 type 来选择返回数据(因为格式相同)
		====== 我的天, 还不如直接写个新的, 新样式....

## 项目难点: 
1. 5种搜索返回的5种数据格式, 适配麻烦
2. 私人 FM 相比歌单播放完全是一套新的逻辑与样式(如 歌单下一曲是更改 index, FM 是获取新的 url), 但又用使用同一个 <audio>标签, 那么处理两者的关系非常的话时间精力
3. 网络情况不好或后端不稳定, 请求失败时如何处理(我感觉是最麻烦&难的部分), 歌曲请求失败/ 歌单请求失败/ FM 请求失败/ 登录失败/ 相应的处理逻辑完全不同
4. 项目大约3~4000行代码, 光是 vuex 里就接近500行, 维护困难
## 项目总结
	第一次在没有视频, 没有人指导的情况下写代码, 意料之外非常的 high, 自己一点一点搭建一个项目的感觉太好了, 想做什么就做什么, 但这样也带来了很多问题:   

	1. app 路由结构没有事先设定好, 导致中途重写了一次
	2. 项目的文件结构也没预先设定好, 导致几乎全部的组件都存在 components 文件夹里, 现在觉得正确的结构应该是page + components + base 从大到小配置
	3. 由于之前一直用的 vue-cli, 从未深入过 webpack 配置, 出了问题总是要查好久的资料
	4. 使用了别人的库, 除了问题对我来说完全是黑盒, 许多库的文档写的很差劲, 我不知道如何修改, 心里除了难受, 还要找新的库来代替, 找来的库也不满意, 这样烦了我两天, 最后自己花了一个晚上解决了
	5. 字体图标用的 font-awesome 实在太丑了....应该换icon-font的
	6. 没有做到足够的代码复用, 抽取的 components 不够细致, 导致修改劳动量过大


### 我学到了什么:   
1. 熟练进行移动端布局, css 能力获得很大突破
2. 学会移动端自适应
3. 熟悉 webpack 配置
4. 对 vuex 的单向数据流有了更深入的了解
5. 熟练使用 vue 全家桶 + stylus 进行开发
6. 学会在后端返回数据结构不符合预期时, 自己修改数据结构
7. 每次写代码, 只写一部分内容, 比如只修复 bug, 只添加新页面, 只优化逻辑
8. 命名规范, 用户资料, 那就叫 profile, 不要一会 user-info 一会 my-info 的, 一开始就该定好! css 命名应该遵循一定的规则, 无论是 BEM 还是自己设计的规则, 不遵守代码复用/修改非常麻烦

## 遇到的问题: 
1. better-scroll 无限轮播无效... 找不到任何错误
	+ 已注释代码...
	+ 天哪...用这种代码实在太傻了, 有空我要自己写一个轮播


2. 使用 font-awesome
	+ 有空换成 https://github.com/cenkai88/vue-svg-icon
	+ 比较没压缩, 且要线上

3. Todo:  测试 action 传参 

4. em....search 页面应该怎么在 router 里显示呢
	- [x] 或者重新设计二级路由: 
		+ 首页 home
			- 推荐
			- 歌单
			- 排行榜
		+ 搜索 search
			- 单曲
			- 歌手
			- .....等等
	- [x] components 结构:
		+ 全部做成router-link
		+ 全局只有两个: link 跟播放界面

5. 麻烦的移动端自适应
	+ 选项1: 使用 flexible
	+ 选项2: 添加事件resize, 实时确定根元素的 rem, 默认100, 全程 rem 控制大小
	- [x] 选项3: 直接使用 vh, vw => postcss + px 完全搞定

6. 由问题5引出的问题6...  postcss 如何引入?
	+ 在 .postcsssrc.js 里配置usePostCSS:true...(这步卡了我2小时!生气.jpg)
	+ 安装包, 还有把包放入,build 的 utils.js

7. 项目开始变复杂了, 页面切换有点烦, 实现的方式很多, 最佳实践应该怎么做呢?
	- [x] 明天花一个小时确定整个项目结构

8. 头疼...  搜索的逻辑
	+ 记录下   保存类型还有名称
	  - store 有一个对象, 包括了所有的搜索结果
		- 每次调用根据 type, keywords来搜索, 再通过对象名称来调用结果	 

9. audio 在display的情况下, 会报错, 无法获取 => {
	duration 只能在事件durationchange 触发后获取...困扰. jpg
}

10. 搜索与歌单返回的数据格式不同...
		=>  自己在 store 里构建数据, 反正需要的就那几个...
		=> 然而...图片数据他没有!!!!

11. 唉...上线出了问题
		+ router 的 history-mode 好像会导致空白
		+ 还有文件的加载, 改成相对路径也会出问题(index.js 里的assetsPublicPath), run dev 后变为空白
## 可改进:
1. - [x] 我通过vuex 的 mutation payload 传递歌曲参数, 但好像更正常的做法是把 id 放在 url 最后  
	+ 修改完成

2. - [x] rank 界面可重构: 样式完全一样, 把4个东西东西放入一个对象,  v-for 搞定 => 重复劳动不想做

3. - [x] promise 可改为 async  
	+ 从现在开始使用

4. - [x] 分离 loading 组件

5. - [x] 默认加载中图片可改为灰色网易云

6. - [x] 判断数据是否存在来减少网络请求... 
  + keep-alive 解决

7. - [x] 歌单详情点击后退是回到首页, 能否改成真"后退"?

8. - [x] 修复轮播(黑盒我真的无语了)

9. - [x] search怎么做? 是一开始发送所有请求还是...按一个发一个请求?
	+ 一个一个发, 数据储存在一个对象中, 需要哪个属性就发送哪个请求, 再显示对应的 ul

10. - [x] search 的热门搜索是根据排行榜来的, 假如没打开过排行榜, 就没有数据显示

11. - [x] 首页获取的50个 playlist 可以用在 toplist
	+ 直接只获取6个

12. - [x] 高分辨率下背景repeat/ 部分字体大小

13. - [x] em...解耦音频与播放界面, 耦合在一起 bug 巨多...

14. - [x] 歌单界面问题巨多
		+ 每次进入歌单界面, 都需要获取歌单, 当 url 的 id 不改变时能不能复用? => 不能
		+  loading 应该根据 vuex 的状态来显示  ---done

15. - [x] 修复进度条

16. - [x] 无歌曲时player 界面显示

17. - [x] 搜索单曲的点击播放

18. - [x] 点击新歌曲时马上暂停

19. - [ ] 自制的轮播细节太差了...

20. - [ ] 播放模式的实现过于简陋, 可修改为从getters获取 playlist, if(playMode === 2) return playingList.sort(....), 其实想想这样做更简单...  => 等加入正在播放列表再弄(感觉随时多一个几百首歌的 compoenents 很浪费性能)

21. - [x] vuex 我的信息 命名实在太狗屎了... => 其实嗨嗨

22. - [x] 感觉 vuex 里可以设置一个"正在看的信息"(评论, user, 歌单信息等), 在不同的页面使用 watch 来监听改变, 这样用户体验 upupup!!!    
				+ 实现方式: 当前歌单/评论 ID, id 相同就不发请求

23. - [x] isLoading 应该与各个组件强耦合!!!  组件内部不需要 isloading

24. - [ ] 随机播放下的上一曲....

25. - [x] 点击播放的逻辑可以优化

26. - [x] 哈哈哈哈, rank 原来有 limit 选项, 明天加上 => 并没有, 但精简了代码

27. - [x] css 优化
	+ min-content 解决 title/name/singer
	+ player 的背景改为图片...这样才能有动画而且可以在外层加默认样式
	+ 简单动画...

28. - [x] isLoading 实在太乱了.... 已统一管理

29. - [x] songListDetail 可优化setIsPlay  => 并不能

30. - [x] lovedSong 可以放在本地储存...同步修改就好了 => 没必要, 两端一起修改逻辑复杂度又上升了

31. - [ ] 感觉没必要有那么多的 loading 提示, 比如切换歌曲就没必要