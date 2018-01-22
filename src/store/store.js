import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createLogger from 'vuex/dist/logger'

axios.defaults.timeout = 20000
axios.defaults.baseURL = 'http://localhost:1810'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		isLogin: false,
		loginCode: 0,
		isLoading: false,
		topLists:[],
		playlist: {},
		privateContent: [],
		recommendMV: [],
		recommendDJ: [],
		songLists: [],
		newSongRank: {},
		hotSongRank: {},
		originalSongRank: {},
		rapidSongRank: {},
		songListDetail: {},
		type: '',
		searchResult:{},
		isSearching: false,
		albumSongs: [],
		albumInfo:{},
		isPlay: false,
		currentSong: '',
		currentSongIndex: 0,
		playingList: [],
		isPlayerShow: false,
		// 储存在 local 里的登录信息
		myInfo:{},
		myPlaylist: {},
		userProfile:{},
		userPlaylist: {},
		comments: {},
		// 0 单曲  1 顺序  2随机
		playMode: 2,
		lovedSongsId: 0,
		lovedSongs: [],
	},
	getters: {
		partlyPrivate(state){
			if (state.privateContent) return state.privateContent.slice(1,3)
		},
		partlyDJ(state){
			return state.recommendDJ.slice(0,6)
		},
		newTop3(state){
			if (state.newSongRank.tracks){
				return state.newSongRank.tracks.slice(0, 3)
			}
		},
		hotTop3(state) {
			if (state.hotSongRank.tracks){
				return state.hotSongRank.tracks.slice(0, 3)
			}
		},
		originalTop3(state) {
			if (state.originalSongRank.tracks){
				return state.originalSongRank.tracks.slice(0, 3)
			}
		},
		rapidTop3(state) {
			if (state.rapidSongRank.tracks){
				return state.rapidSongRank.tracks.slice(0, 3)
			}
		},
		myId(state){
			if (state.myInfo.account) return state.myInfo.account.id
		}
	},
	mutations: {
		setIsLoading(state, payload){
			console.log('loading')
			console.log(payload)
			state.isLoading = payload
		},
		setIsLogin(state, payload){
			state.isLogin = payload
		},
		setLoginCode(state, payload){
			state.loginCode = payload
		},
		setSongListDetail(state, payload){
			state.songListDetail = payload
		},
		setSearch(state, payload){
			state.searchResult[payload.name] = payload.data.data.result[payload.name]
		},
		clearAlbumSongs(state) {
			state.albumSongs = []
		},
		setAlbumSongs(state,payload){
			state.albumSongs = payload
		},
		clearAlbumInfo(state) {
			state.albumInfo = {}
		},
		setAlbumInfo(state, payload){
			state.albumInfo = payload
		},
		setCurrentSong(state, payload){
			state.currentSong = payload
		},
		setCurrentSongIndex(state, payload){
			state.currentSongIndex = payload
		},
		showPlayer(state){
			state.isPlayerShow = true
		},
		hidePlayer(state) {
			state.isPlayerShow = false
		},
		setPlayingList(state, payload){
			state.playingList = payload
		},
		togglePlay(state){
			state.isPlay = !state.isPlay
		},
		setIsPlay(state, payload){
			state.isPlay = payload
		},
		changeSongIndex(state){
			switch (state.playMode){
				case 0:
					break
				case 1:
					state.currentSongIndex += 1
					break
				case 2:
					state.currentSongIndex = Math.round(Math.random() * state.playingList.length)
					break
			}
		},
		changePlayMode(state){
			if (state.playMode === 0) state.playMode = 1
			else if (state.playMode === 1) state.playMode = 2
			else if (state.playMode === 2) state.playMode = 0
		},
		songIndexReduceOne(state) {
			state.currentSongIndex -= 1
		},
		setSearchSongs(state, payload){
			state.playingList = []
			for(let item of payload){
				state.playingList.push({
					name: item.name,
					id: item.id,
					al: {
						picUrl: item.album.artist.img1v1Url
					},
					ar: item.artists
				})
			}
		},
		setMyInfo(state, payload){
			state.myInfo = payload
		},
		setMyPlaylist(state, payload){
			state.myPlaylist = payload
		},
		setlovedSongsId(state, payload){
			state.lovedSongsId = payload
		},
		setlovedSongs(state, payload){
			let ret = []
			for (let e of payload) {
				ret.push(e.id)
			}
			state.lovedSongs = ret
		},
		setComments(state, payload){
			state.comments = payload
		},
		setUserProfile(state, payload){
			state.userProfile = payload
		},
		setUserPlaylist(state, payload){
			state.userPlaylist = payload
		}
	},
	actions:{
		getTopLists(context){
			axios.get('/top/playlist?limit=6')
				.then((data) => {
					context.state.topLists = data.data.playlists
				})
		},
		getPrivateContent(context){
			axios.get('/personalized/privatecontent')
				.then((data) => {
					context.state.privateContent = data.data.result
				})
		},
		getRecommendMV(context){
			axios.get('/personalized/mv')
				.then((data) => {
					context.state.recommendMV = data.data.result
				})
		},
		getRecommendDJ(context){
			axios.get('/personalized/djprogram')
				.then((data) => {
					context.state.recommendDJ = data.data.result
				})
		},
		getLatestLists(context){
			context.state.songLists = []
			axios.get('/top/playlist?limit=20&order=new')
				.then((data) => {
					context.state.songLists = data.data.playlists
				})
		},
		getPopularLists(context){
			context.state.songLists = []
			axios.get('/top/playlist?limit=20&order=hot')
				.then((data) => {
					context.state.songLists = data.data.playlists
				})
		},
		getRecommendLists(context){
			context.state.songLists = []
			axios.get('/top/playlist/highquality')
				.then((data) => {
					context.state.songLists = data.data.playlists
				})
		},
		getRank(context){
			// 新歌榜
			axios.get('/top/list?idx=0')
				.then((data) => {
					context.state.newSongRank = data.data.playlist
				})
			// 热歌榜
			axios.get('/top/list?idx=1')
				.then((data) => {
					context.state.hotSongRank = data.data.playlist
				})
			// 原创榜
			axios.get('/top/list?idx=2')
				.then((data) => {
					context.state.originalSongRank = data.data.playlist
				})
			// 彪升榜
			axios.get('/top/list?idx=3')
				.then((data) => {
					context.state.rapidSongRank = data.data.playlist
				})
		},
		async getSongListDetail(context,payload){
			context.commit('setIsLoading', true)
			let data = await axios.get(`/playlist/detail?id=${payload}`)
			context.commit('setSongListDetail', data.data.playlist)
			context.commit('setIsLoading', false)			
		},
		async getSongSearch(context,payload){
			if (context.state.isSearching) return 
			context.state.isSearching = true
			let data = await axios.get(`/search?keywords=${payload.keywords}&type=${payload.type}`)
			context.state.isSearching = false
			payload.data = data
			context.commit('setSearch', payload)
		},
		async getAlbum(context, payload) {
			context.commit('clearAlbumSongs')
			context.commit('clearAlbumInfo')
			let data = await axios.get(`/album?id=${payload}`)
			context.commit('setAlbumSongs', data.data.songs)
			context.commit('setAlbumInfo', data.data.album)			
		},
		async getSongUrl(context, payload){
			let data = await axios.get(`/music/url?id=${payload}`)
			context.commit('setCurrentSong', data.data.data[0].url)
		},
		// 以下是个人资料
		async login(context, payload){
			context.commit('setIsLoading', true)
			let data = await axios.get(`/login/cellphone?phone=${payload.account}&password=${payload.password}`)
			context.commit('setLoginCode', data.data.code)
			context.commit('setIsLoading', false)
			// 登录成功
			if (context.state.loginCode === 200){
				// 设置我的信息
				context.commit('setMyInfo', data.data)
				let info = JSON.stringify(payload)
				localStorage.myInfo = info
				context.commit('setIsLogin', true)
				// 获取我的歌曲列表
				await context.dispatch('getMyPlaylist')
				// 获取喜欢的歌曲
				await context.dispatch('getlovedSongs', context.state.lovedSongsId)
			}
		},
		async getlovedSongs(context, payload){
			let data = await axios.get(`/playlist/detail?id=${payload}`)
			console.log(data.data.privileges)
			context.commit('setlovedSongs', data.data.privileges)
		},
		async getMyPlaylist(context){
			context.commit('setIsLoading', true)
			let data = await axios.get(`/user/playlist?uid=${context.getters.myId}`)
			context.commit('setMyPlaylist', data.data.playlist)
			context.commit('setlovedSongsId', data.data.playlist[0].id)
			context.commit('setIsLoading', false)
		},
		async getComments(context, payload){
			context.commit('setIsLoading', true)
			let data = await axios.get(`/comment/${payload.type}?id=${payload.id}&limit=${payload.limit}`)
			context.commit('setComments', data.data)
			setTimeout( () => {
				context.commit('setIsLoading', false)
			}, 0)
		},
		async getUserProfile(context, id){
			context.commit('setIsLoading', true)
			let profile = await axios.get(`/user/detail?uid=${id}`)
			context.commit('setUserProfile', profile.data)
			let playlist = await axios.get(`/user/playlist?uid=${id}`)
			context.commit('setUserPlaylist', playlist.data.playlist)
			context.commit('setIsLoading', false)
		},
	},
	// plugins: [createLogger()]
})