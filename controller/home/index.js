const Article = require('../../api/article');
const Express = require('../../api/express');

const friendlyTime = require('../../util/friendlyTime.js');
exports.index = async (req, res, next) => {
	const NewsCategories = await Article.ArticleCategoryById(1);
	const TechCategories = await Article.ArticleCategoryById(2);
	const HotsArticle = await Article.hots();
	const expressListResult = await Express.ExpressLists(10,1);
	let NewsLists;
	let TechLists;
	let CurNewsId;
	let CurTechId;
	let Hots;
	let Viewpager1, Viewpager2, Viewpager3;
	let TechSorts;
	let NewsSorts;
	let expressLists;
	if (NewsCategories.code == 200) {
		const Newscateid = NewsCategories.data[0].id;
		CurNewsId = Newscateid;
		NewsLists = await Article.ArticleLists(1, Newscateid);
		const NewsSortArticle = await Article.ArticleLists(1, 1, 2, 10, 1);
		for (let i = 0; i < NewsLists.data.data.length; i++) {
			const localdate = new Date(NewsLists.data.data[i].createTime);
			NewsLists.data.data[i].createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
		}
		if (NewsSortArticle.code == 200) {
			if (NewsSortArticle.data.data && NewsSortArticle.data.data.length > 0) {
				NewsSorts = (NewsSortArticle.data.data).slice(0, 10);
				for (let k = 0; k < NewsSorts.length; k++) {
					const localdate = new Date(NewsSorts[k].createTime);
					NewsSorts[k].createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
				}
			}
		}
	}
	if (TechCategories.code == 200) {
		const Techcateid = TechCategories.data[0].sons[0].id;
		CurTechId = Techcateid;
		TechLists = await Article.ArticleLists(2, Techcateid);
		const TechSortArticle = await Article.ArticleLists(2, 2, 2, 10,1);
		for (let j = 0; j < TechLists.data.data.length; j++) {
			const localdate = new Date(TechLists.data.data[j].createTime);
			TechLists.data.data[j].createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
		}
		if (TechSortArticle.code == 200) {
			if (TechSortArticle.data.data && TechSortArticle.data.data.length > 0) {
				TechSorts = (TechSortArticle.data.data).slice(0, 10);
				for (let k = 0; k < TechSorts.length; k++) {
					const localdate = new Date(TechSorts[k].createTime);
					TechSorts[k].createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
				}
			}
		}
	}
	if (HotsArticle.code == 200) {
		Hots = HotsArticle.data;
		for (let k = 0; k < Hots.length; k++) {
			const localdate = new Date(Hots[k].createTime);
			Hots[k].createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
		}
		if (Hots.length > 3) {
			Viewpager1 = Hots.slice(0, 4);
			Viewpager2 = Hots.slice(4);
			Viewpager3 = Hots.slice(5);
		}
	}
	if(expressListResult.code == 200){
		if(expressListResult.data && expressListResult.data.length > 0){
			expressLists = expressListResult.data;	
			
			expressLists.forEach((element) => {
				const realtime =  new Date(element.releaseTime);
				element.releaseTime = friendlyTime.getDateDiff(realtime.toLocaleString());
				
			});
		}	
	}
	//const pages = pagination.normal('/', 'i', 1, 20, NewsLists.data.count);
	res.render('home/index', {
		title: '比特蜜蜂-区块链中国社区',
		loadmap: req.loadmap.home,
		user: req.user,
		name: 'home',
		news: NewsLists.data.data ? (NewsLists.data.data).slice(0, 10) : null,
		techs: TechLists.data.data ? (TechLists.data.data).slice(0, 10) : null,
		newstabs: NewsCategories.data ? NewsCategories.data : null,
		techstabs: TechCategories.data[0] ? TechCategories.data[0].sons : null,
		CurNews: CurNewsId,
		CurTech: CurTechId,
		TechSorts: TechSorts,
		NewsSorts: NewsSorts,
		Viewpager1: Viewpager1 ? Viewpager1 : null,
		Viewpager2: Viewpager2 ? Viewpager2 : null,
		Viewpager3: Viewpager3 ? Viewpager3 : null,
		randomnum:req.randomnum,
		ExpressLists:expressLists?expressLists:undefined,
		certificateStatus: req.certificateStatus ? req.certificateStatus : 0
	});
}
/**
 * ajax 提交动态切换tab
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.checktabxhr = async (req, res, next) => {
	const tabtype = req.body.type;
	const id = req.body.id;
	const NewsCategories = await Article.ArticleCategoryById(1);
	const TechCategories = await Article.ArticleCategoryById(2);

	let NewsLists;
	let TechLists;
	let CurNewsId;
	let CurTechId;
	let TechSorts;
	let NewsSorts;
	if (NewsCategories.code == 200 && tabtype == 'news') {

		CurNewsId = id;
		NewsLists = await Article.ArticleLists(1, id);
		const NewsSortArticle = await Article.ArticleLists(1, 1, 2, 10,1);
		for (let i = 0; i < NewsLists.data.data.length; i++) {
			const localdate = new Date(NewsLists.data.data[i].createTime);
			NewsLists.data.data[i].createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
		}
		if (NewsSortArticle.code == 200) {
			if (NewsSortArticle.data.data && NewsSortArticle.data.data.length > 0) {
				NewsSorts = (NewsSortArticle.data.data).slice(0, 10);
				for (let k = 0; k < NewsSorts.length; k++) {
					const localdate = new Date(NewsSorts[k].createTime);
					NewsSorts[k].createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
				}
			}
		}
		res.render('home/block/news-tab', {
			news: NewsLists.data.data ? (NewsLists.data.data).slice(0, 10) : null,
			newstabs: NewsCategories.data ? NewsCategories.data : null,
			CurNews: CurNewsId,
			NewsSorts: NewsSorts
		});
	} else if (TechCategories.code == 200 && tabtype == 'tech') {

		CurTechId = id;
		TechLists = await Article.ArticleLists(2, id);
		const TechSortArticle = await Article.ArticleLists(2, 2, 2, 10, 1);
		for (let j = 0; j < TechLists.data.data.length; j++) {
			const localdate = new Date(TechLists.data.data[j].createTime);
			TechLists.data.data[j].createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
		}
		if (TechSortArticle.code == 200) {
			if (TechSortArticle.data.data && TechSortArticle.data.data.length > 0) {
				TechSorts = (TechSortArticle.data.data).slice(0, 10);
				for (let k = 0; k < TechSorts.length; k++) {
					const localdate = new Date(TechSorts[k].createTime);
					TechSorts[k].createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
				}
			}
		}
		res.render('home/block/tech-tab', {
			techs: TechLists.data.data ? (TechLists.data.data).slice(0, 10) : null,
			techstabs: TechCategories.data[0] ? TechCategories.data[0].sons : null,
			CurTech: CurTechId,
			TechSorts: TechSorts
		});
	}


}