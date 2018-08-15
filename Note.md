
## 遇到的问题: 
1. - [x] better-scroll 无限轮播无效... 找不到任何错误
	+ 已注释代码...
	+ 天哪...用这种代码实在太傻了, 有空我要自己写一个轮播


2. - [x] 使用 font-awesome
	+ 有空换成 https://github.com/cenkai88/vue-svg-icon
	+ 比较没压缩, 且要线上
3. 	- [x] components 结构:
		+ 全部做成router-link
		+ 全局只有两个: link 跟播放界面

		
4. em....search 页面应该怎么在 router 里显示呢
	- [x] 或者重新设计二级路由: 
		+ 首页 home
			- 推荐
			- 歌单
			- 排行榜
		+ 搜索 search
			- 单曲
			- 歌手
			- .....等等


5. - [x] 麻烦的移动端自适应
	+ 选项1: 使用 flexible
	+ 选项2: 添加事件resize, 实时确定根元素的 rem, 默认100, 全程 rem 控制大小
	- [x] 选项3: 直接使用 vh, vw => postcss + px 完全搞定

6. - [x] 由问题5引出的问题6...  postcss 如何引入?
	+ 在 .postcsssrc.js 里配置usePostCSS:true...(这步卡了我2小时!生气.jpg)
	+ 安装包, 还有把包放入,build 的 utils.js

7. - [x] 项目开始变复杂了, 页面切换有点烦, 实现的方式很多, 最佳实践应该怎么做呢?   明天花一个小时确定整个项目结构

8. - [x]  头疼...  搜索的逻辑
	+ 记录下   保存类型还有名称
	  - store 有一个对象, 包括了所有的搜索结果
		- 每次调用根据 type, keywords来搜索, 再通过对象名称来调用结果	 

9. - [x] audio 在display的情况下, 会报错, 无法获取 => {
	duration 只能在事件durationchange 触发后获取...困扰. jpg
	=>>>>换成 getElementByID
}

10. - [x] 搜索与歌单返回的数据格式不同...
		=> 自己在 store 里构建数据, 反正需要的就那几个...
		=> 然而...图片数据他没有!!!!

11. - [ ] 唉...上线出了问题
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

19. - [x] 自制的轮播细节太差了...

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

31. - [x] 感觉没必要有那么多的 loading 提示, 如切换歌曲

32. - [ ] 用户信息与我的信息高度重合, 可以放在一起, 增加一个computed: isMe? 然后退出登录 v-show. 

33. - [ ] 忽然觉得自动加载我喜欢的歌曲是个败笔...因为在 vuex 里占用了很多空间与逻辑

34. - [ ] slider 的函数可以再优化, 改变 index 的都放到一个函数里, 传参决定行为

35. - [ ] 同理, Playmode 也是