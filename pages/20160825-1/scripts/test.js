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

$(function(){
	console.log('test');
	var hold = 3500;	// ms
	$('#btnEnter').bind({
		'touchstart': function(ev) {
			var _isEnd = openLoad.isEnd('#step1');
			if(_isEnd){
				return;
			}
			console.log('touchstart');
            openLoad.init(true);

			ev.preventDefault();
		},
		'touchend': function() {
			console.log("step1.isStepOver="+openLoad.isStepOver);
			var _isEnd = openLoad.isEnd('#step1');
			if(_isEnd){
				return;
			}
			if(!openLoad.isStepOver){
				console.log('touchend');
                openLoad.init(false);
			}

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


//进度条动画
var openLoad = {
	index:1,
	maxLength:8,
	imgWrap:'.openLoad img',
    imgURL:'images/index/openLoading',
    imgExt:'.png',
	m:400,
	step1Timer:null,
	isStepOver:false,
    init:function(isAsc){
        clearInterval(this.step1Timer);
        this.step1Timer = setInterval(function(){openLoad.setAnimate(isAsc);},this.m);
    },
	isEnd:function(obj){
		if($(obj).hasClass('end')){
			console.log('this end');
			return true
		}
		return false;
	},



	setAnimate:function(isAsc){
		if(isAsc){
			this.index++;
		}else{
			this.index--;
		}

		console.log('i='+this.index);
		if(this.index==this.maxLength){
			this.setFinnish();
			clearInterval(this.step1Timer);
		}

		if(this.index<1){
			this.index = 1;
			clearInterval(this.step1Timer);
			return;
		}
		$(this.imgWrap).attr('src',this.imgURL+this.index+this.imgExt);

	},

	setFinnish:function(){
		$('#step1').addClass('end');
		//console.log('isFinnish');
		this.isStepOver = true;
		//$('#step1 .arrow').show();
        //console.log(openDoor.index);
        openDoor.init();
		/*
		$('.isFinnish').addClass('fadein');

		$('.isFinnish').bind("webkitAnimationEnd",function(){
			$('.isFinnish').css({"opacity":'1',"top":"0"});
		});
		*/
	}
};



//开门动画
var openDoor = {
    index:1,
    maxLength:9,
    imgWrap:'.bgAni img',
    imgHoldURL:'images/index/bg',
    imgURL:'images/index/open_',
    imgExt:'.jpg',
    m:100,
    openDoorTimer:null,
    isStepOver:false,
    init:function(){
        clearInterval(this.openDoorTimer);
        this.openDoorTimer = setInterval(function(){openDoor.setAnimate();},this.m);
    },

    setAnimate:function(){
//        console.log('i='+this.index);
//        console.log('this.maxLength='+this.maxLength);
        if(this.index>=this.maxLength){
            this.setFinnish();
            clearInterval(this.openDoorTimer);
        }


        $(this.imgWrap).attr('src',this.imgURL+this.index+this.imgExt);
        this.index++;
    },

    setFinnish:function(){
        location.href="game.html";
        /*
        $('#step1').addClass('end');
        console.log('isFinnish');
        this.isStepOver = true;
        $('#step1 .arrow').show();
        */
    }
};





