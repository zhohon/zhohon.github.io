/************固定JS************/

/**
 * 打印日志
 * @param debug 是否打印日志开关
 * @method log 打印日志方法
 *		@param   t 需要打印的字符串
 */
var console = window.console = {
	_console:console,
	debug:true,
	log:function(t){
		if(this.debug){
			//alert(this.debug);
			try{
				//this._console.log('测试');
				this._console.log(t);
			}catch(e){
				alert(t);
			}
		}
	}
}








/************业务逻辑,初始化************/
//静态常量
var ot = 30000;							//总时间(毫秒)
var m = 10;								//计时器相应时间(毫秒)
var kts = 500;							//怪物被打后多少毫秒显示奖品(毫秒)
var ats = 500;							//获取奖品后多少秒清空格子(毫秒)
var wts = 500;							//刷新怪物时间(毫秒)
var sts = 800;							//怪物出现多少毫秒后消失(毫秒)
var maxs = 5;							//最大怪物数量

//全局变量
var timer;
var t = ot;								//剩余时间(毫秒)
var s = Math.floor(t/1000);				//剩余时间(秒)
var bgw = ((t/ot)*100).toFixed(2);		//通过总时间和剩余时间计算进度条
var totalScore = 0;						//记录总分


//页面Class名称
var nMbg = 'mbg';						//显示怪物背景层
var nMName = 'mName';					//显示怪物名称层
var nScore = 'score';					//显示分数区域
var nMain = 'main';						//外层区域,用来标记怪物刷新时间

//动作标记名称
var mHasPic = 'hasPic'					//标记此区域是否有怪
var mRid = 'rid';						//标记此区域显示的怪物编号
var mKill = 'kill';						//标记此怪物是否被打击
var mKillTime = 'killTime';				//标记打击怪物时的时间
var mAwardTime = 'awardTime';			//标记获取奖品时的时间
var mWaitTime = 'waitTime';				//标记怪物刷新时的时间
var mShowTime = 'showTime';				//标记怪物出现时的时间



$(function(){
	//console.log('test');
	//alert($(window).height());
	//alert($(window).width());
for(var i=0;i<100;i++){
	GameInit();
}

})

/************业务逻辑,模块化************/
var GameInit = function(){
  //  clearInterval(loadTimer);
  //  $('#doorWrap').hide();
   // $('#gameWrap').show();
    //创建时间计时器
    //timer = setInterval(Init,m);

    Random.probability();



    touch.on('section','touchstart',function(ev){
        var _mainDom;
        var thisTag = $(this).attr('tagName').toLowerCase();
        //console.log('thisTag='+thisTag);
        if(thisTag == 'section'){
            _mainDom = $(this);
        }else{
            _mainDom = $(this).parent();
        }

        //console.log(timer);
        //当时间结束.点击无效。
        if(t>0){
            KillMonster.kill(_mainDom);
        }
    });
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

	t = t - m;
	s = Math.floor(t/1000);
	bgw = ((t/ot)*100).toFixed(2);
	if(t<=0){
		KillMonster.finnish();
	}
};

//顶部时间条
var LimitTime = {
	bgDom:'.timer',
	numDom:'.timerNum',
	test:function(){
		//alert(111);
	},
	setNum:function(){
		$(this.numDom).html(s+'秒');
	},
	setBg:function(){
		$(this.bgDom).width(bgw+'%');
	}

};

//分数统计
var CountScore = {
	setScore:function(_score){
		totalScore = totalScore + _score;
		$('.'+nScore).html(totalScore);
	}
}

//怪物事件
var KillMonster = {
	hasMDom:"."+mHasPic,
	killDom:"."+mKill,
	//怪物事件初始化
	init:function(){
		var _mainDom = $('.'+nMain);
		var _wt = _mainDom.attr(mWaitTime);

		//初始化没有等待时间，直接刷新怪物
		//或者已经到了下次刷怪时间，开始刷怪
		if(!_wt || _wt-t > wts){
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
		var _rid = Random.r(maxs)-1;
		var _guaiwu = gameData.GUAIWU[_rid];
//        console.log('_rid='+_rid);

		//设置
		_selDom.attr(mRid,_rid);
		this.setMonsterBg(_selDom,_guaiwu[1]);
        this.setMonsterName(_selDom,_guaiwu[0]);
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
			if(_st-t > sts){
				this.clearKill(_hmd,_rid);
			}

		}
	},
	//打击怪物事件
	kill:function(_mainDom){
		//如果点击区域没有怪,则不做任何事情
		if(!_mainDom.hasClass(mHasPic) || _mainDom.hasClass(mKill)){
			return;
		}

		var _rid = _mainDom.attr(mRid);
		var _guaiwu = gameData.GUAIWU[_rid];
		//console.log('_guaiwu[2]='+_guaiwu[2]);
		this.setMonsterBg(_mainDom,_guaiwu[2]);
		//_mainDom.find('.'+nMbg).css({"background-image":"url("+_guaiwu[2]+")"});
		_mainDom.attr(mKillTime,t);
		_mainDom.removeAttr(mShowTime);
		

		//如果此怪已打过,就不统计分数
		//if(!_mainDom.hasClass(mKill)){
			CountScore.setScore(_guaiwu[3]);
		//}


		//标记此怪已打过
		_mainDom.addClass(mKill);

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
			if(_kt-t > kts){
				this.getAward(_kd,_rid);
			}

			//判断奖品显示了多少毫秒后
			//清空此区域所有状态
			if(_at-t > ats){
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
//		this.setMonsterBg(_kd,_guaiwu[2]);
		//_kd.find('.'+nMbg).css({"background-image":"url("+_guaiwu[2]+")"});
		_kd.removeAttr(mKillTime);
		_kd.attr(mAwardTime,t);
	},
	//清除怪物事件
	clearKill:function(_kd,_rid){
		var _guaiwu = gameData.GUAIWU[_rid];

		//_kd.find('.'+nMbg).css({"background-image":"url("+_guaiwu[2]+")"});
		this.setMonsterBg(_kd,'');
		_kd.removeClass(mKill);
		_kd.removeClass(mHasPic);
		_kd.removeAttr(mAwardTime);
		_kd.removeAttr(mKillTime);
		_kd.removeAttr(mShowTime);
		_kd.removeAttr(mRid);
	},
	//时间结束事件
	finnish:function(){
		clearInterval(timer);
		alert('你的总分为'+totalScore+'分！！！');
	},
	//统一设置怪物背景
	setMonsterBg:function(_mdom,url){
		if(url === ''){
			_mdom.find('.'+nMbg).css('background-image','');
		}else{
			_mdom.find('.'+nMbg).css("background-image","url("+url+")");
		}
	},
    setMonsterName:function(_mdom,txt){
        _mdom.find('.'+nMName).html(txt);
    }

}

var Random = {
    ar:100,
    //获取随机函数
    r:function(_s){
        return Math.ceil(Math.random()*_s);
    },
    probability:function(){
        var type = 2;
        var _data;
        var _randomObj;
        if(type == 1){
            _data = gameData.GUAIWU;
        }else{
            _data = gameData.WUPING;
        }

        var _ranNum = this.r(this.ar);
        //console.log('随机数='+_ranNum);

        var rate=0;
        for(var i=0;i<_data.length;i++){
            var _tmp = _data[i];
            var _rateM = rate + _tmp[3];
            if(_ranNum>rate&&_ranNum<=_rateM){
                _randomObj = _tmp;
                break;
            }

            rate = _rateM;
        }

        console.log('怪物='+_randomObj);

    }

}




/************业务逻辑,数据层************/
var gameData = {
    GUAIWU : [
		["红野猪","images/game/GWA_1.png", 10,40, "images/game/GWA_2.png", 1],
		["黑野猪","images/game/GWB_1.png", 20,30, "images/game/GWB_2.png", 1],
		["白野猪","images/game/GWC_1.png", 30,20, "images/game/GWC_2.png", 1],
		["加时间","images/game/DJ_SJ.png", 0,5, "",  2],
		["技能","images/game/DJ_HQ.png", 0,5, "",  3]
	],
    WUPING:[
        ["金币","images/game/JB.png",30,80],
        ["裁决","images/game/CJ.png",300,4],
        ["龙纹剑","images/game/LWJ.png",300,4],
        ["屠龙","images/game/TL.png",300,4],
        ["逍遥扇","images/game/XYS.png",300,4],
        ["祝福油","images/game/ZFY.png",300,4]

    ]

};