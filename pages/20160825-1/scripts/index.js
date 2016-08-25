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

$.cookie = function(name, value, options) {
    // name and value given, set cookie
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';

        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        // only name given, get cookie
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}


//图片预加载
var imgPath = "http://static.sdg-china.com/rxcq/pic/rxcqm_act/game20141117/";
var loadingPage = (function(){
    var sourceArr = [
        'index/aniLight1.png',
        'index/aniLight2.png',
        'index/B.jpg',
        'index/bg1.jpg',
        'index/bg2.jpg',
        'index/bgLight.png',
        'index/open_1.jpg',
        'index/open_2.jpg',
        'index/open_3.jpg',
        'index/open_3.jpg',
        'index/open_4.jpg',
        'index/open_5.jpg',
        'index/open_6.jpg',
        'index/open_7.jpg',
        'index/open_8.jpg',
        'index/open_9.jpg',
        'index/btnEnter1.png',
        'index/btnEnter2.png',
        'index/openLoading1.png',
        'index/openLoading2.png',
        'index/openLoading3.png',
        'index/openLoading4.png',
        'index/openLoading5.png',
        'index/openLoading6.png',
        'index/openLoading7.png',
        'index/openLoading8.png',
        'index/openLoadingLight.png',
        'game/aniFrost1.png',
        'game/aniFrost2.png',
        'game/aniFrost3.png',
        'game/aniFrost4.png',
        'game/aniFrost5.png',
        'game/aniFrost6.png',
        'game/aniFrost7.png',
        'game/aniFrost8.png',
        'game/aniFrost9.png',
        'game/aniFrost10.png',
        'game/aniFrost11.png',
        'game/aniFrost12.png',
        'game/aniFrost13.png',
        'game/aniFrost14.png',
        'game/aniFrost15.png',
        'game/aniFrost16.png',
        'game/aniFrost17.png',
        'game/aniFrost18.png',
        'game/aniFrost19.png',
        'game/aniFrost20.png',
        'game/bg.jpg',
        'game/bgAll.jpg',
        'game/bgShare.png',
        'game/bgTime.png',
        'game/bgTimeOn.png',
        'game/btnAgain.png',
        'game/btnShare.png',
        'game/btnSkill_off.png',
        'game/btnSkill_on.png',
        'game/DJ_BD.png',
        'game/DJ_SJ.png',
        'game/GWA_1.png',
        'game/GWA_2.png',
        'game/GWB_1.png',
        'game/GWB_2.png',
        'game/GWC_1.png',
        'game/GWC_2.png',
        'game/JB.png',
        'game/LWJ.png',
        'game/TL.png',
        'game/XYS.png',
        'game/ZFY.png'

    ];
    for (var i = 0; i < sourceArr.length; i++) {
        sourceArr[i] = (imgPath + sourceArr[i]);
    }
    var loadImage = function(path, callback){
        var img = new Image();
        img.onload = function(){
            img.onload = null;
            callback(path);
        }
        img.src = path;
    }
    var imgLoader = function(imgs, callback){
        var len = imgs.length, i = 0;
        while(imgs.length){
            loadImage(imgs.shift(), function(path){
                callback(path, ++i, len);
            });
        }
    }
    imgLoader(sourceArr, function(path, curNum, total){
        var percent = curNum/total;
//        document.getElementById('loadingSpan').innerHTML = Math.floor(percent*100)+"%";
        $("#loadingSpan").html(Math.floor(percent*100)+"%");
        $("#loadingBg").css("height",Math.floor(percent*100)+'%');

        if(percent == 1){
            setTimeout(showPage,500);
        }
    });
})();



function showPage(){
//    GameInit();
//    $('.gameBgMask').addClass('aniGameBgMask');


    $("#doorWrap").show();

    setTimeout(function(){$("#loading").remove();},400);

}




/************业务逻辑,初始化************/
var loadTimer = null;
var loadM = 100;
var loadT = 0;
var loadFlagPlay = 1;
var loadFlagBack = 2;
var loadFlagStop = 0;
var isFirst = true;

var openLoadTime = 0;
var openDoorTime = 0;
var openDoorFinnishTime = 0;
var doorRockTime = 0;
var musicFlag = true;


$(function(){
//	console.log('test');
    //手机屏蔽拖动效果
    document.body.addEventListener('touchmove', function(e) {e.preventDefault();});

    var _audio = document.getElementById('audioAuto');

//    if($.cookie('isFirst') == null){
//        isFirst = true;
//    }else{
//        $('#sectionTest').remove();
//        isFirst = false;
//    }
//    $.cookie('isFirst','true',{expires:1000});

//    alert(isFirst);
    //音乐开关
    touch.on('#audioControl','touchstart',function(ev){
        if(musicFlag){
            _audio.pause();
//            $(this).html('开启音乐');
            $(this).addClass('off');
            musicFlag = false;
        }else{
            _audio.play();
//            $(this).html('关闭音乐');
            $(this).removeClass('off');
            musicFlag = true;
        }
    });

    $('.doorLight1')[0].addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
        OpenDoor.init(loadFlagPlay);
    }, false);

    $('.bgMask')[0].addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
        if($(this).hasClass('aniBgMask')){
            $(this).addClass('aniGameBgMask');
            $(this).removeClass('aniBgMask');
            clearInterval(loadTimer);
            $('#doorWrap').hide();
            $('#gameWrap').show();
        }else{
//            $(this).removeClass('aniGameBgMask');
            GameInit();     //黑屏结束后,跳转到游戏界面
            $('.bgMask').remove();
        }
//        $('.gameBgMask').addClass('aniGameBgMask');

    }, false);


    loadTimer = setInterval(LoadInit,loadM);

	$('#btnEnter').bind({
		'touchstart': function(ev) {
			var _isEnd = OpenLoad.isEnd('#step1');
			if(_isEnd){
				return;
			}
//			console.log('touchstart');
            OpenLoad.init(loadFlagPlay);
            DoorRock.init(loadFlagPlay);
            $(this).addClass('btnEnterOn');


			ev.preventDefault();
		},
		'touchend': function() {
//			console.log("step1.isStepOver="+OpenLoad.isStepOver);
			var _isEnd = OpenLoad.isEnd('#step1');
			if(_isEnd){
				return;
			}
            $(this).removeClass('btnEnterOn');
//			if(!OpenLoad.isStepOver){
//				console.log('touchend');
                OpenLoad.init(loadFlagBack);
//			}

		}
	});

//	touch.on('.step','swipeleft',function(ev){
//		var s = $(this).parents('.step');
//		console.log('aaa='+s.attr('id'));
//		var isCan = s.hasClass('end');
//
//		var _i = $('.step').index(s)*1;
//		var _num = (_i+1) * 100;
//		console.log('aaa='+_i);
//		//console.log('aaa='+$(this).css('left'););
//		if(isCan){
//			GoStep.go("-"+_num+"%");
//		}
//
//	});


})

/************业务逻辑,模块化************/

//var GoStep = {
//	goDom:'div.container',
//	pageDura:0.6,	// 翻页速度
//	go:function(x){
//		var container = $(this.goDom);
//		TweenMax.to(container, this.pageDura, {left: x});
//	}
//}
var LoadInit = function(){
    OpenLoad.setAnimate();
    OpenDoor.setAnimate();
    DoorRock.setAnimate();


    loadT += loadM;
}



//进度条动画
var OpenLoad = {
	index:1,
	maxLength:8,
	imgWrap:'.openLoad img',
    imgURL:imgPath+'index/openLoading',
    imgExt:'.png',
    flag:loadFlagStop,
    flagEnd:false,
	m:50,
//	step1Timer:null,
//	isStepOver:false,
    init:function(type){
        this.flag = type;
//        this.setAnimate(isAsc);
//        clearInterval(this.step1Timer);
//        this.step1Timer = setInterval(function(){openLoad.setAnimate(isAsc);},this.m);
    },
	isEnd:function(obj){
		if(this.flagEnd){
//			console.log('this end');
			return true
		}
		return false;
	},



	setAnimate:function(){
//        console.log(openLoadTime);
        if(loadT - openLoadTime < this.m || this.flag == loadFlagStop){
            return;
        }else{
//            console.log('goon');
            openLoadTime = loadT;
        }
		if(this.flag == loadFlagPlay){
			this.index++;
		}else if(this.flag == loadFlagBack) {
            this.index--;
		}

//		console.log('i='+this.index);
		if(this.index==this.maxLength){
			this.setFinnish();
            this.flag = loadFlagStop;
//			clearInterval(this.step1Timer);
		}

		if(this.index<1){
			this.index = 1;
            this.flag = loadFlagStop;
            DoorRock.init(loadFlagStop);
//			clearInterval(this.step1Timer);
			return;
		}
		$(this.imgWrap).attr('src',this.imgURL+this.index+this.imgExt);

	},

	setFinnish:function(){
        this.flagEnd = true;
        DoorRock.init(loadFlagStop);
        $('.doorLight1').addClass('aniDoorLight1');
        $('.doorLight2').addClass('aniDoorLight2');
        $('.openLoadLight').addClass('aniLoadLight');
	}
};



//开门动画
var OpenDoor = {
    index:1,
    maxLength:9,
    imgWrap:'.bgAni img',
    imgURL:imgPath+'index/open_',
    imgExt:'.jpg',
    m:100,
    waitM:300,
    flag:loadFlagStop,
    flagEnd:false,
    init:function(type){
//        document.getElementById('audioOpen').play();
        this.flag = type;
//        clearInterval(this.openDoorTimer);
//        this.openDoorTimer = setInterval(function(){openDoor.setAnimate();},this.m);
    },

    setAnimate:function(){

//        if(this.flag == loadFlagStop && openDoorFinnishTime > 0){
//            this.goto();
//        }

        if(loadT - openDoorTime < this.m || this.flag == loadFlagStop){
            return;
        }else{
//            console.log('goon');
            openDoorTime = loadT;
        }
//        console.log('i='+this.index);
//        console.log('this.maxLength='+this.maxLength);
        if(this.flag == loadFlagPlay){
            this.index++;
        }
        if(this.index>=this.maxLength){
            openDoorFinnishTime = loadT;
            this.setFinnish();
//            clearInterval(this.openDoorTimer);
        }


        $(this.imgWrap).attr('src',this.imgURL+this.index+this.imgExt);
    },

    setFinnish:function(){
        this.flag = loadFlagStop;
        $('.bgMask').addClass('aniBgMask');
        $('.bgMask').css('opacity',1);
        $('.bgMask').css('z-index',150);
//        location.href="game.html";
    }
};

//门抖动
var DoorRock = {
    index:1,
    maxLength:2,
    imgWrap:'.bgAni img',
    imgHoldURL:imgPath+'index/bg',
    imgExt:'.jpg',
    m:100,
    flag:loadFlagStop,
    flagEnd:false,
    init:function(type){
        this.flag = type;
    },
    setAnimate:function(){
        if(loadT - doorRockTime < this.m || this.flag == loadFlagStop){
            return;
        }else{
//            console.log('goon');
            doorRockTime = loadT;
        }

        if(this.flag == loadFlagPlay){
            this.index++;
        }
//        console.log('i='+this.index);

        if(this.index >this.maxLength){
            this.index = 1;
        }
        $(this.imgWrap).attr('src',this.imgHoldURL+this.index+this.imgExt);
    },
    setFinnish:function(){
        this.flag = loadFlagStop;
    }


}







