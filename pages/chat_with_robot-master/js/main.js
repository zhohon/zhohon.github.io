function get_jsonp(text) {
    $.get("https://robotser.herokuapp.com/robot", {
         "info" : text,
         "dtype" : "json",
         "key" : "5886c0226172025122705c2d5a3f1278",
         "userid":111
     }, show);
    // var jsonp = document.createElement('script');
    // jsonp.src = 'http://op.juhe.cn/robot/index?callback=show'+'&info='+text+'&key=5886c0226172025122705c2d5a3f1278&userid=111';
    // document.body.appendChild(jsonp);
    // $.getScript('http://op.juhe.cn/robot/index?callback=show'+'&info='+text+'&key=5886c0226172025122705c2d5a3f1278&userid=111',function(data){
    // 	console.log(data);
    // })
}
$('#info').keyup(function(e) {
    var key = e.which;
    if ($('#info').val() == '') {
        $('#send').css({
            background: 'white'
        });
    } else {
        $('#send').css({
            background: '#b2e281'
        });
    }
    if (key == 13) {
        $('#send').trigger("click");
        $('#send').css({
            background: 'white'
        });
    }
});
var pre_time;
$('#send').click(function() {
    var d = new Date();
    if (!pre_time || (pre_time && diff_time(d))) {
        var p = "<div><span>" + d.getHours() + ':' + (d.getMinutes().toString().length == 1?'0'+d.getMinutes():d.getMinutes()) + '</span></div>';
        pre_time = d;
        $('#chat').append(p);
    }
    var text = $('#info').val();
    $('#info').val('');
    $('#send').css({
        background: 'white'
    });
    var p = "<div class='me'><div class='qipao'></div><div class='item'>" + text + '</div></div>';
    $('#chat').append(p);
    $('#chat').scrollTop($('#chat')[0].scrollHeight);
    if (text.indexOf('你是') != -1) {
      show(JSON.stringify({
        result:{
          text:"我是爱你的小红呀！"
        }
      }))
    } else if(text.indexOf('我是') != -1){
    show(JSON.stringify({
        result:{
          text:"超级无敌可爱王雷锋，我最喜欢了。"
        }
      }))

    } else if (text.indexOf('爱') != -1) {
show(JSON.stringify({
        result:{
          text:"不管你说啥，我就是爱王哈哈！"
        }
      }))
    } 
    else {
      get_jsonp(text);

    }
})

function show(data) {
    data = JSON.parse(data);
    var p = "<div class='robot'><div class='qipao'></div><div class='item'>" + data.result.text + '</div></div>';
    $('#chat').append(p);
    $('#chat').scrollTop($('#chat')[0].scrollHeight);
}

function diff_time(time) {
    if (time.getHours() - pre_time.getHours() == 0) {
        if (time.getMinutes() - pre_time.getMinutes() <= 5)
            return false;
    } else
        return true;
}

var EventUtil = {
  addHandler:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
      element.attachEvent("on"+type,handler);
    }else{
      element["on"+type] = handler;
    }
  },
  removeHander:function(element,type,handler){
    if(element.removeEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.detachEvent){
      element.detachEvent("on"+type,handler);
    }else{
      element["on"+type] = null;
    }
  }
}
EventUtil.addHandler(window,'resize',change_height);
function change_height(){
  $('#chat').css({height:window.innerHeight-$('#chat').next().height()});
  $('#info').css({width:$('#chat').width()-$('#send').width()-30});
  //console.log($('#chat').next().css(width));
}
change_height();
