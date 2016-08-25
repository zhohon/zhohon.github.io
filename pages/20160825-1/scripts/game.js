/************固定JS************/

///**
// * 打印日志
// * @param debug 是否打印日志开关
// * @method log 打印日志方法
// *		@param   t 需要打印的字符串
// */
//var console = window.console = {
//	_console:console,
//	debug:true,
//	log:function(t){
//		if(this.debug){
//			//alert(this.debug);
//			try{
//				//this._console.log('测试');
//				this._console.log(t);
//			}catch(e){
//				alert(t);
//			}
//		}
//	}
//}








/************业务逻辑,初始化************/
//静态常量
var ot = 30000;							    //总时间(毫秒)
var addTime = 3000;                         //获得加时间道具对应添加的时间(毫秒)
var m = 10;								    //计时器相应时间(毫秒)
var kts = 400;							//怪物被打后多少毫秒显示奖品(毫秒)
var ats = 800;							//获取奖品后多少秒清空格子(毫秒)
var wts = 800;							//刷新怪物时间(毫秒)
var sts = 1000;							//怪物出现多少毫秒后消失(毫秒)
var tts = 1500;							//第一次打怪解说等待时间(毫秒)

var maxs = 5;							    //最大怪物数量
var GuaiWuFlag = 1;                       //随机获取怪物标记
var WuPinFlag = 2;                        //随机获取物品标记
var TypeGuaiWu = 1;
var TypeShiJian = 2;
var TypeJiNeng = 3;
var hasJiNeng = false;                   //是否有技能。
var fireWallTime = 0;
var isFirstStart = false;


//全局变量
var timer;
var t2 = ot;                              //页面表现的剩余时间(毫秒)(包括吃加时间道具的时间)
var t = 0;								   //用来处理所有动作的剩余时间(毫秒)
var s = Math.floor(t2/1000);				//剩余时间(秒)
var bgw = ((t2/ot)*100).toFixed(2);		//通过总时间和剩余时间计算进度条
var totalScore = 0;						//记录总分
var totalWu1 = 0;                         //获得金币数量
var totalWu2 = 0;                         //获得裁决数量
var totalWu3 = 0;                         //获得龙纹剑数量
var totalWu4 = 0;                         //获得屠龙数量
var totalWu5 = 0;                         //获得逍遥扇数量
var totalWu6 = 0;                         //获得祝福油数量
var totalPercent = '0%';
var totalLevel = '有待提高';



//页面Class名称
var nMbg = 'mbg';						//显示怪物背景层
var nMScore = 'mScore';             //显示掉落物品对应的分数层
var nMName = 'mName';					//显示怪物名称层
var nScore = 'score';					//显示分数区域
var nMain = 'main';						//外层区域,用来标记怪物刷新时间
var nBtnSkill = 'btnSkill';             //技能按钮区域
var nFireWall = 'fireWall';             //火墙动画区域

var nShareScore = 'shareScore';
var nShareWu1 = 'shareWu1';
var nShareWu2 = 'shareWu2';
var nShareWu3 = 'shareWu3';
var nShareWu4 = 'shareWu4';
var nShareWu5 = 'shareWu5';
var nShareWu6 = 'shareWu6';
var nSharePercent = 'sharePercent';
var nShareLevel = 'shareLevel';
var nShareWrap = 'shareWrap';
var nGameOverlay = 'gameOverlay';
var nAllWupin = 'allWupin';

//动作标记名称
var mHasPic = 'hasPic'					//标记此区域是否有怪
var mRid = 'rid';						//标记此区域显示的怪物编号
var mKill = 'kill';						//标记此怪物是否被打击
var mKillTime = 'killTime';				//标记打击怪物时的时间
var mAwardTime = 'awardTime';			//标记获取奖品时的时间
var mWaitTime = 'waitTime';				//标记怪物刷新时的时间
var mShowTime = 'showTime';				//标记怪物出现时的时间
var mSkillOn = 'on';                     //标记技能是否显示
var mMH = 'mH';                           //物品名称高亮
var mAniWupinShow = 'aniWupinShow'      //物品出来动画css
var mAniScoreShow = 'aniScoreShow'      //物品出来动画css



$(function(){

    $(LimitTime.bgDom)[0].addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
        $(this).removeClass(LimitTime.bgOn);
    }, false);




})

/************业务逻辑,模块化************/
var GameInit = function(){


    touch.on('section','touchstart',function(ev){
        var _mainDom;
        var thisTag = $(this).attr('tagName').toLowerCase();
//        console.log('thisTag='+thisTag);
        if(thisTag == 'section'){
            _mainDom = $(this);
        }else{
            _mainDom = $(this).parent();
        }

//        console.log(t2);
        //当时间结束.点击无效。
        if(t2>0){
            KillMonster.kill(_mainDom);
        }
    });

//    touch.on('.btnSkill','touchstart',function(ev){
//        var _mainDom = $(this);
////        console.log(_mainDom.html());
////        console.log(_mainDom.hasClass(mSkillOn));
//        if(_mainDom.hasClass(mSkillOn)){
//
//            fireWallTime = t;
//            KillMonster.skill();
//        }
//    });


    touch.on('.btnAgain','touchstart',function(ev){
        Share.again();
    });
    touch.on('.btnShare','touchstart',function(ev){
        if(isWeixin()){
            alert('点击右上角分享至微信朋友圈。');
        } else {
            alert('请先用微信打开此页面后再分享到朋友圈。');
        }
    });


        if(isFirst){
            GameTest();
        }else{
            GameStart();
        }

//    GameStart();
}
//第一次尝试游戏
var GameTest = function(){
    timer = setInterval(TestInit,m);
}

var TestInit = function(){
    t2 = 10;
    t = t+m;
//    console.log(123123);
//    t = t + m;
//    t2 = t2 - m;
//    s = Math.floor(t2/1000);
//    bgw = ((t2/ot)*100).toFixed(2);

    LimitTime.setNum();
    LimitTime.setBg();

    KillMonster.test();
}


//游戏初始化
var GameStart = function(){
    $('#sectionTest').remove();
    $('#testMsg').remove();
    $('.gameBgMask').hide();
    clearInterval(timer);

    totalScore = 0;						//记录总分
    totalWu1 = 0;                         //获得金币数量
    totalWu2 = 0;                         //获得裁决数量
    totalWu3 = 0;                         //获得龙纹剑数量
    totalWu4 = 0;                         //获得屠龙数量
    totalWu5 = 0;                         //获得逍遥扇数量
    totalWu6 = 0;                         //获得祝福油数量
    totalPercent = '0%';
    totalLevel = '有待提高';

    t2 = ot;                              //页面表现的剩余时间(毫秒)(包括吃加时间道具的时间)
    t = 0;								   //用来处理所有动作的剩余时间(毫秒)
    s = Math.floor(t2/1000);				//剩余时间(秒)
    bgw = ((t2/ot)*100).toFixed(2);		//通过总时间和剩余时间计算进度条

//    console.log('t2='+t2);

    var _mainDom = $('.'+nMain);
    var _wt = _mainDom.removeAttr(mWaitTime);
    var _hasMDom = $(KillMonster.hasMDom);
    var _killDom = $(KillMonster.killDom);
    _hasMDom.removeAttr(mShowTime);
    _hasMDom.removeAttr(mAwardTime);
    _hasMDom.removeAttr(mKillTime);
    _hasMDom.removeClass(mHasPic);
    _killDom.removeClass(mKill);

    $('.'+nScore).html(0);

    //创建时间计时器
    timer = setInterval(Init,m);



}

//计时器总线程
var Init = function(){
	//alert(1);
	//console.log('1111');



	LimitTime.setNum();
	LimitTime.setBg();

	KillMonster.show();
	KillMonster.die();
	KillMonster.init();
    FireWall.setAnimate();

	t = t + m;
    t2 = t2 - m;
	s = Math.floor(t2/1000);
	bgw = ((t2/ot)*100).toFixed(2);
	if(t2<=0){
		KillMonster.finnish();
	}
};

//顶部时间条
var LimitTime = {
	bgDom:'.timer',
	numDom:'.timerNum',
    bgOn:'aniTimerOn',
	test:function(){
		//alert(111);
	},
	setNum:function(){
		$(this.numDom).html(s+'秒');
	},
	setBg:function(){
		$(this.bgDom).width(bgw+'%');
	},
    setAddTime:function(){
        $(this.bgDom).addClass(this.bgOn);
    }

};

//分数统计
var CountScore = {
	setScore:function(_score){
		totalScore = totalScore + _score;
		$('.'+nScore).html(totalScore);
	},
    setWupin:function(obj){
        var id = obj[0]*1+1;

        switch(id)
        {
            case 1:
                totalWu1+=1;
                break;
            case 2:
                totalWu2+=1;
                break;
            case 3:
                totalWu3+=1;
                break;
            case 4:
                totalWu4+=1;
                break;
            case 5:
                totalWu5+=1;
                break;
            case 6:
                totalWu6+=1;
                break;
            default:
                totalWu1+=1;
                break;

        }
    },
    setLevel:function(){
        var _taget = gameData.LEVEL;
        for(var i=0;i<_taget.length;i++){
            var _t = _taget[i];

            if(totalScore>= _t[3] && totalScore<=_t[4]){
                totalPercent = _t[2];
                totalLevel = _t[1];
                break;
            }

        }
    }
}

//怪物事件
var KillMonster = {
	hasMDom:"."+mHasPic,
	killDom:"."+mKill,
    //新手引导
    test:function(){
        var _killDom = $(this.killDom);
        for(var i=0;i<_killDom.length;i++){
            var _kd = _killDom.eq(i);
            var _kt = _kd.attr(mKillTime);
            var _at = _kd.attr(mAwardTime);
            var _rid = _kd.attr(mRid);

            //判断打击怪物经过了多少毫秒后
            //显示奖品
            if(t-_kt > tts && _kt !== null){
                var _guaiwu = gameData.GUAIWU[_rid];

                //设置奖品图片
                var _wupin = Random.probability(WuPinFlag);

                this.setMonsterBg(_kd,_wupin[2],false);
                this.setMonsterName(_kd,'',true);


                _kd.removeAttr(mKillTime);
                _kd.attr(mAwardTime,t);
                $('#testMsg').html('<span class="h">准备开始!</span>');
                isFirstStart = true;
            }

            //新手教程倒计时
            if(isFirstStart){
                var _tmpA = t-_at;
                if(_tmpA > tts){
                    $('#testMsg').html('<span class="h">准备开始!</span>');
                }else if(_tmpA >1200){
                    $('#testMsg').html('<span class="h">1</span>');
                }else if(_tmpA> 800){
                    $('#testMsg').html('<span class="h">2</span>');
                }else if(_tmpA> 400){
                    $('#testMsg').html('<span class="h">3</span>');
                }

            }

            //判断奖品显示了多少毫秒后
            //清空此区域所有状态
            if(t-_at > tts && _at != null){
                GameStart();
            }

        }
        //console.log('this.killDom='+this.killDom);
        //console.log('s='+s);
    },
	//怪物事件初始化
	init:function(){
		var _mainDom = $('.'+nMain);
		var _wt = _mainDom.attr(mWaitTime);

		//初始化没有等待时间，直接刷新怪物
		//或者已经到了下次刷怪时间，开始刷怪
		if(!_wt || t-_wt > wts){
			_mainDom.attr(mWaitTime,t);
			this.randomMonster();
			//console.log('没有啊！');
		}

	},

	//获取随机怪物
	randomMonster:function(){

		var _sDom = $('section').not('.'+mHasPic);
		var _s = _sDom.length;
		var _selNum = Random.r(_s)-1;
		var _selDom = _sDom.eq(_selNum);

//		var _rid = Random.r(maxs)-1;
//		var _guaiwu = gameData.GUAIWU[_rid];

        //通过每个怪物的概率，随机出现怪物
        var _guaiwu = Random.probability(GuaiWuFlag);
        //如果有技能，并且又随机到技能，默认给红猪
        if(hasJiNeng && _guaiwu[6] == TypeJiNeng){
//            console.log('终于进来了。');
            _guaiwu = gameData.GUAIWU[0];
        }
        var _rid = _guaiwu[0];

//        console.log('_rid='+_rid);

		//设置
		_selDom.attr(mRid,_rid);
		this.setMonsterBg(_selDom,_guaiwu[2],false);

        if(_guaiwu[6] == TypeGuaiWu){
            this.setMonsterName(_selDom,_guaiwu[1],false);
        }else{
            this.setMonsterName(_selDom,_guaiwu[1],true);
        }

		_selDom.addClass(mHasPic);
		_selDom.attr(mShowTime,t);

		//console.log('_selNum='+_selNum);
		//console.log('id='+_selDom.attr('id'));

		//_sDom.eq(_selNum).find()
		//console.log('_selNum='+_selNum);
		
	},
	//怪物出现未打击事件
	show:function(){
		var _hasMDom = $(this.hasMDom);
		for(var i=0;i<_hasMDom.length;i++){
			var _hmd = _hasMDom.eq(i);
			//console.log(i);
			var _st = _hmd.attr(mShowTime);
			var _rid = _hmd.attr(mRid);

			//console.log(_st);
			//判断怪物出现，经过多少秒后，未打击就消失
			if(t-_st > sts && _st != null ){
//                console.log('t='+t);
//                console.log('_st='+_st);
//                console.log('莫名的入口');
				this.clearKill(_hmd,_rid);
			}

		}
	},
	//打击怪物事件
	kill:function(_mainDom){
        $('#testMsg').html('怪物死后会掉落物品<br/>掉落物品无需点击自动拾取!');
        $('.mHand').remove();
		//如果点击区域没有怪,则不做任何事情
		if(!_mainDom.hasClass(mHasPic) || _mainDom.hasClass(mKill)){
//            console.log('进来了');
			return;
		}



		var _rid = _mainDom.attr(mRid);
		var _guaiwu = gameData.GUAIWU[_rid];
//		console.log('_guaiwu[6]='+_guaiwu[6]);
        //判断打击怪物类别,如果是怪物，则显示奖品
        //加时间和技能，则另外处理
        if(_guaiwu[6] == TypeShiJian){
            this.addTime(_mainDom,_rid);
        }else if(_guaiwu[6] == TypeJiNeng) {
            this.getSkill(_mainDom,_rid);
        }else{
//            document.getElementById('audioHuo').load('http://static.sdg-china.com/rxcq/pic/rxcqm_act/game20141117/music/mp3_huo.mp3');
//            document.getElementById('audioHuo').play();
            this.setMonsterBg(_mainDom,_guaiwu[5],false);
            _mainDom.attr(mKillTime,t);
            _mainDom.removeAttr(mShowTime);
            //标记此怪已打过
            _mainDom.addClass(mKill);
//            console.log('打怪物！');
        }

		//_mainDom.find('.'+nMbg).css({"background-image":"url("+_guaiwu[5]+")"});

		

        //分数统一在获取物品后增加
//			CountScore.setScore(_guaiwu[3]);




		//console.log('rid='+_rid);

	},
	//怪物死亡事件
	die:function(){
		var _killDom = $(this.killDom);
		for(var i=0;i<_killDom.length;i++){
			var _kd = _killDom.eq(i);
			var _kt = _kd.attr(mKillTime);
			var _at = _kd.attr(mAwardTime);
			var _rid = _kd.attr(mRid);

			//判断打击怪物经过了多少毫秒后
			//显示奖品
			if(t-_kt > kts && _kt !== null){
				this.getAward(_kd,_rid);
			}

			//判断奖品显示了多少毫秒后
			//清空此区域所有状态
			if(t-_at > ats && _at != null){
//                console.log('_at='+_at);
//                console.log('主动清除');
				this.clearKill(_kd,_rid);
			}
			//_kd
//			console.log(a);
		}
		//console.log('this.killDom='+this.killDom);
		//console.log('s='+s);
	},
	//获取奖品事件
	getAward:function(_kd,_rid){
		var _guaiwu = gameData.GUAIWU[_rid];

        //设置奖品图片
        var _wupin = Random.probability(WuPinFlag);
//        var _rid = _wupin[0];
		this.setMonsterBg(_kd,_wupin[2],true);
        this.setMonsterScore(_kd,_wupin[3]);
        this.setMonsterName(_kd,'',true);
        CountScore.setWupin(_wupin);

		_kd.removeAttr(mKillTime);
		_kd.attr(mAwardTime,t);

        var _subTotal = _guaiwu[3] + _wupin[3];
        CountScore.setScore(_subTotal);
	},
	//清除怪物事件
	clearKill:function(_kd,_rid){
		var _guaiwu = gameData.GUAIWU[_rid];

		//_kd.find('.'+nMbg).css({"background-image":"url("+_guaiwu[2]+")"});
		this.setMonsterBg(_kd,'',false);
//        console.log('难道会莫名的进来');
		_kd.removeClass(mKill);
		_kd.removeClass(mHasPic);
		_kd.removeAttr(mAwardTime);
		_kd.removeAttr(mKillTime);
		_kd.removeAttr(mShowTime);
		_kd.removeAttr(mRid);
	},
    //加时间
    addTime:function(_kd,_rid){
        t2 = t2 + addTime;
        //如果加的时间大于总时间,则以总时间为准
        if(t2>ot){
            t2 = ot;
        }
        LimitTime.setAddTime();

        this.clearKill(_kd,_rid);
    },
    //获得技能
    getSkill:function(_kd,_rid){
//        hasJiNeng = true;
//        $('.'+nBtnSkill).find('div').addClass(mSkillOn);
        fireWallTime = t;
        this.skill();
        this.clearKill(_kd,_rid);
        CountScore.setScore(gameData.GUAIWU[4][3]);
    },
    //放技能
    skill:function(){
//        console.log('放技能');


//        var _hasMDom = $(this.hasMDom);
//        for(var i=0;i<_hasMDom.length;i++){
//            var _hmd = _hasMDom.eq(i);
//            this.kill(_hmd);
//        }
//        document.getElementById('audioBing').load('http://static.sdg-china.com/rxcq/pic/rxcqm_act/game20141117/music/mp3_bing.mp3');
//        document.getElementById('audioBing').play();
        FireWall.init(loadFlagPlay);

//        hasJiNeng = false;
//        $('.'+nBtnSkill).find('div').removeClass(mSkillOn);

    },
	//时间结束事件
	finnish:function(){
        $('.'+nAllWupin).hide();
        $('.'+nFireWall).hide();
//        $('.'+nBtnSkill).find('div').removeClass(mSkillOn);
		clearInterval(timer);
        CountScore.setLevel();

        Share.openShare();

//		alert('你的总分为'+totalScore+'分！！！');
	},
	//统一设置怪物背景
	setMonsterBg:function(_mdom,url,hasAni){
        var _mbgDom = _mdom.find('.'+nMbg);
        var _mMScoreDom = _mdom.find('.'+nMScore);

		if(url === ''){
            _mbgDom.css('background-image','');
		}else{
            _mbgDom.css("background-image","url("+url+")");
		}


        if(hasAni){
            _mMScoreDom.addClass(mAniScoreShow);
            _mbgDom.addClass(mAniWupinShow);
        }else{
            _mMScoreDom.removeClass(mAniScoreShow);
            _mbgDom.removeClass(mAniWupinShow);
        }

	},
    setMonsterScore:function(_mdom,s){
        var _mMScoreDom = _mdom.find('.'+nMScore);
        _mMScoreDom.html(s);

    },
    setMonsterName:function(_mdom,txt,isWupin){
        if(isWupin){
            _mdom.find('.'+nMName).addClass(mMH);
            _mdom.find('.'+nMName).html(txt);
        }else{
            _mdom.find('.'+nMName).removeClass(mMH);
            _mdom.find('.'+nMName).html('');
        }
    }

}

var Share = {
    openShare:function(){
        $('#'+nShareScore).html(totalScore);
        $('#'+nShareWu1).html(gameData.WUPING[0][1]+'X'+totalWu1);
        $('#'+nShareWu2).html(gameData.WUPING[1][1]+'X'+totalWu2);
        $('#'+nShareWu3).html(gameData.WUPING[2][1]+'X'+totalWu3);
        $('#'+nShareWu4).html(gameData.WUPING[3][1]+'X'+totalWu4);
        $('#'+nShareWu5).html(gameData.WUPING[4][1]+'X'+totalWu5);
        $('#'+nShareWu6).html(gameData.WUPING[5][1]+'X'+totalWu6);
        $('#'+nSharePercent).html(totalPercent);
        $('#'+nShareLevel).html(totalLevel);


        $('.'+nShareWrap).show();
        $('.'+nGameOverlay).show();
    },
    again:function(){

        GameStart();
        $('.'+nShareWrap).hide();
        $('.'+nGameOverlay).hide();
    }
}


//火墙动画
var FireWall = {
    index:1,
    maxLength:20,
    imgWrap:'.fireWall img',
    imgURL:imgPath+'game/aniFrost',
    imgExt:'.png',
    m:30,
    flag:loadFlagStop,
    flagEnd:false,
    init:function(type){
        this.index = 1;
        $(this.imgWrap).attr('src',this.imgURL+this.index+this.imgExt);
        $('.'+nFireWall).show();
        this.flag = type;
        $('.'+nAllWupin).show();
//        clearInterval(this.openDoorTimer);
//        this.openDoorTimer = setInterval(function(){openDoor.setAnimate();},this.m);
    },

    setAnimate:function(){
//        console.log('t='+(t-fireWallTime));
        if(this.flag == loadFlagPlay && fireWallTime!=0 && t-fireWallTime > (this.maxLength)*this.m){
//            console.log(t);
//            console.log(fireWallTime);
//            console.log((this.maxLength)*this.m);
//            console.log('进来了');
            this.setFinnish();
            return
        }

        if(t - fireWallTime < this.m || this.flag == loadFlagStop){
            return;
        }else{
//            console.log('goon');
            fireWallTime = t;
        }
//        console.log('i='+this.index);
//        console.log('this.maxLength='+this.maxLength);
        if(this.flag == loadFlagPlay){
            this.index++;
        }
        if(this.index>=this.maxLength){
            this.setFinnish();
//            clearInterval(this.openDoorTimer);
        }


        $(this.imgWrap).attr('src',this.imgURL+this.index+this.imgExt);
    },

    setFinnish:function(){
        this.flag = loadFlagStop;
        $('.'+nAllWupin).hide();
        $('.'+nFireWall).hide();
//        GameInit();
//        location.href="game.html";
    }
};

var Random = {
    ar:100,
    //获取随机函数
    r:function(_s){
        return Math.ceil(Math.random()*_s);
    },
    probability:function(type){
        var _data;
        var _randomObj;
        if(type == GuaiWuFlag) {
            _data = gameData.GUAIWU;
        }else if(type == WuPinFlag){
            _data = gameData.WUPING;
        }else{
            return false;
        }

        var _ranNum = this.r(this.ar);
        //console.log('随机数='+_ranNum);

        var rate=0;
        for(var i=0;i<_data.length;i++){
            var _tmp = _data[i];
            var _rateM = rate + _tmp[4];
            if(_ranNum>rate&&_ranNum<=_rateM){
                _randomObj = _tmp;
                break;
            }

            rate = _rateM;
        }
//        console.log('怪物='+_randomObj[1]);
        return _randomObj;


    }

}


/************业务逻辑,微信分享************/
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}



//动态设置config
//标题最多 20个字
//分享个人最多  70个字
//分享朋友圈最多 30个字
function setSConfig(){
    var _img = 'http://static.sdg-china.com/rxcq/pic/rxcqm_act/game20141117/index/icon.jpg';
    var _shareGRTxt = '我烧一次猪就得'+totalScore+'分，超越'+totalPercent+'的人，有本事来挑战我!';
    var _sharePYQTxt = '我烧一次猪就得'+totalScore+'分，超越'+totalPercent+'的人';

    var _sconfig = {
        'title':'传奇烧猪游戏',
        'link':window.location.href,
        'desc_GR':_shareGRTxt,    //个人
        'desc_PYQ':_sharePYQTxt,   //朋友圈
        'pic':_img
    };

    return _sconfig;
}

var onBridgeReady = function() {
    var appId = '';
    // 发送给好友;
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        var sconfig = setSConfig();


//        alert(sconfig.desc_GR);
//        alert(sconfig.desc_PYQ);
        WeixinJSBridge.invoke('sendAppMessage', {
            'img_url': sconfig.pic,
            'img_width': '150',
            'img_height': '150',
            'link': sconfig.link,
            'desc': sconfig.desc_GR,
            'title': sconfig.title
        }, function(res) {});
    });
    // 分享到朋友圈;
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        var sconfig = setSConfig();
        WeixinJSBridge.invoke('shareTimeline', {
            'img_url': sconfig.pic,
            'img_width': '150',
            'img_height': '150',
            'link': sconfig.link,
            'desc': sconfig.desc_PYQ,
            'title': sconfig.desc_PYQ
        }, function(res) {});
    });
};

if (document.addEventListener) {
    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
} else if (document.attachEvent) {
    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
}

/************业务逻辑,数据层************/
var gameData = {
    GUAIWU : [
        [0,"红野猪",imgPath+"game/GWA_1.png", 10,40, imgPath+"game/GWA_2.png", 1],
        [1,"黑野猪",imgPath+"game/GWB_1.png", 20,30, imgPath+"game/GWB_2.png", 1],
        [2,"白野猪",imgPath+"game/GWC_1.png", 30,20, imgPath+"game/GWC_2.png", 1],
        [3,"加时间",imgPath+"game/DJ_SJ.png", 0,5, "",  2],
        [4,"技能",imgPath+"game/DJ_BD.png", 300,5, "",  3]
    ],
    WUPING:[
        [0,"金币",imgPath+"game/JB.png",30,80],
        [1,"裁决",imgPath+"game/CJ.png",300,4],
        [2,"龙纹剑",imgPath+"game/LWJ.png",300,4],
        [3,"屠龙",imgPath+"game/TL.png",300,4],
        [4,"逍遥扇",imgPath+"game/XYS.png",300,4],
        [5,"祝福油",imgPath+"game/ZFY.png",300,4]

    ],
    LEVEL:[
        [0,"有待提高",'1%',0,500],
        [1,"初学乍练",'10%',501,1000],
        [2,"小有所成",'50%',1001,3000],
        [3,"炉火纯青",'90%',3001,6000],
        [4,"唯我独尊",'99%',6000,999999]
    ]

};