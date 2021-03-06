export default {
	isLogin: false,
	loginCode: 0,
	isLoading: false,
	isError: false,
	topLists: [],
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
	searchResult: {},
	isSearching: false,
	albumSongs: [],
	albumInfo: {},
	// 控制播放按钮/ 唱片转动
	isPlay: false,
	currentSong: '',
	currentSongIndex: 0,
	playingList: [],
	isPlayerShow: false,
	// 储存在 local 里的登录信息
	myInfo: {},
	myPlaylist: {},
	userProfile: {},
	userPlaylist: {},
	comments: {},
	currentCommentsId: null,
	// 0 单曲  1 顺序  2随机
	playMode: 1,
	lovedListId: 0,
	lovedSongs: [],
	currentListId: null,
	FM: null,
	// 1: 歌单模式, 2: FM 模式
	playType: 1,
	dailyRecommend: []
}