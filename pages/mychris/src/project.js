require=function o(s,r,a){function h(e,t){if(!r[e]){if(!s[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(u)return u(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var c=r[e]={exports:{}};s[e][0].call(c.exports,function(t){return h(s[e][1][t]||t)},c,c.exports,o,s,r,a)}return r[e].exports}for(var u="function"==typeof require&&require,t=0;t<a.length;t++)h(a[t]);return h}({BackPackUI:[function(t,e,i){"use strict";cc._RF.push(e,"96a192UeP9FDZ6jqVOqcUAs","BackPackUI"),cc.Class({extends:cc.Component,properties:{slotPrefab:{default:null,type:cc.Prefab},scrollView:{default:null,type:cc.ScrollView},totalCount:0},init:function(t){this.heroSlots=[],this.home=t;for(var e=0;e<this.totalCount;++e){var i=this.addHeroSlot();this.heroSlots.push(i)}},addHeroSlot:function(){var t=cc.instantiate(this.slotPrefab);return this.scrollView.content.addChild(t),t},show:function(){this.node.active=!0,this.node.emit("fade-in"),this.home.toggleHomeBtns(!1)},hide:function(){this.node.emit("fade-out"),this.home.toggleHomeBtns(!0)}}),cc._RF.pop()},{}],ButtonScaler:[function(t,e,i){"use strict";cc._RF.push(e,"f5d10E3oQ9G/LlvNZly0S2Y","ButtonScaler"),cc.Class({extends:cc.Component,properties:{pressedScale:1,transDuration:0},onLoad:function(){var e=this;function t(t){this.stopAllActions(),this.runAction(e.scaleUpAction)}e.initScale=this.node.scale,e.button=e.getComponent(cc.Button),e.scaleDownAction=cc.scaleTo(e.transDuration,e.pressedScale),e.scaleUpAction=cc.scaleTo(e.transDuration,e.initScale),this.node.on("touchstart",function(t){this.stopAllActions(),this.runAction(e.scaleDownAction)},this.node),this.node.on("touchend",t,this.node),this.node.on("touchcancel",t,this.node)}}),cc._RF.pop()},{}],ChargeUI:[function(t,e,i){"use strict";cc._RF.push(e,"11f1epEd5FProshh8dSXgPW","ChargeUI"),cc.Class({extends:cc.Component,properties:{},init:function(t,e){this.home=t,this.parentBtns=e},show:function(){this.node.active=!0,this.node.emit("fade-in"),this.home.toggleHomeBtns(!1),cc.eventManager.pauseTarget(this.parentBtns)},hide:function(){this.node.emit("fade-out"),this.home.toggleHomeBtns(!0),cc.eventManager.resumeTarget(this.parentBtns)}}),cc._RF.pop()},{}],ContentCtrl:[function(t,e,i){"use strict";cc._RF.push(e,"9e4a2Bv0khI94dH0af51YS8","ContentCtrl"),cc.Class({extends:cc.Component,properties:{itemIcons:{default:[],type:cc.SpriteFrame},itemPrefab:cc.Prefab,elementPrefab:cc.Prefab,room:cc.Node,itemWidth:100},onLoad:function(){this.curItemIdx=0,this.items=[];for(var t=0;t<this.itemIcons.length;++t){var e=this.itemIcons[t],i=cc.instantiate(this.itemPrefab).getComponent("ItemCtrl");console.log(i),this.node.addChild(i.node),i.init({idx:t,iconSF:e,content:this}),this.items[t]=i}},onPressed:function(t){var e=cc.instantiate(this.elementPrefab).getComponent("Element");this.room.addChild(e.node),e.init({iconSF:t}),this.room.getComponent("RoomCtrl").updateShot()}}),cc._RF.pop()},{}],Element:[function(t,e,i){"use strict";cc._RF.push(e,"0c651YLwYZAGa9GStbT+Iwi","Element"),cc.Class({extends:cc.Component,properties:{icon:cc.Sprite,stretch:cc.Node,remove:cc.Node,isSelected:!0},init:function(t){cc.log(t),this.icon.spriteFrame=t.iconSF,this.remove.on(cc.Node.EventType.TOUCH_START,this.onRemove.bind(this),this.node),this.icon.node.on(cc.Node.EventType.TOUCH_MOVE,function(t){this.opacity=200;var e=t.touch.getDelta();this.x+=e.x,this.y+=e.y},this.node),this.icon.node.on(cc.Node.EventType.TOUCH_END,function(){this.opacity=255},this.node),this.stretch.on(cc.Node.EventType.TOUCH_MOVE,function(t){this.opacity=200;var e=t.touch.getDelta();cc.log(this),this.icon.node.width+=e.x,this.icon.node.height+=e.y,this.stretch.x+=e.x/2,this.stretch.y+=e.y/2,this.remove.x-=e.x/2,this.remove.y-=e.y/2},this),cc.director.emit("isSelected",this.uuid),cc.director.on("isSelected",function(t){cc.log("in on"),cc.log(t.detail),this.uuid!==t.detail&&(this.isSelected=!1,this.remove.active=!1,this.stretch.active=!1)},this),this.icon.node.on(cc.Node.EventType.TOUCH_START,function(){cc.director.emit("isSelected",this.uuid),this.isSelected=!0,this.remove.active=!0,this.stretch.active=!0},this)},onRemove:function(){this.node.destroy()},onPressed:function(){cc.log("haha")}}),cc._RF.pop()},{}],EnergyCounter:[function(t,e,i){"use strict";cc._RF.push(e,"70152iIQt1AkKnsFXGgadR8","EnergyCounter"),cc.Class({extends:cc.Component,properties:{timeToRecover:0,totalCount:0,currentCount:0,labelTimer:{default:null,type:cc.Label},labelCount:{default:null,type:cc.Label},progressBar:{default:null,type:cc.ProgressBar}},onLoad:function(){this.timer=0},update:function(t){var e=this.timer/this.timeToRecover;this.progressBar.progress=e,this.currentCount>this.totalCount&&(this.currentCount=this.totalCount);var i=Math.floor(this.timeToRecover-this.timer);this.labelCount.string=this.currentCount+"/"+this.totalCount,this.labelTimer.string=Math.floor(i/60).toString()+":"+(i%60<10?"0":"")+i%60,this.timer+=t,this.timer>=this.timeToRecover&&(this.timer=0,this.currentCount++)}}),cc._RF.pop()},{}],HeroSlot:[function(t,e,i){"use strict";cc._RF.push(e,"648ecAs4bREAJsQ6IycZbX7","HeroSlot");var s=function(t,e){var i=cc.random0To1();return t+Math.floor((e-t)*i)};cc.Class({extends:cc.Component,properties:{sfAttributes:{default:[],type:cc.SpriteFrame},sfRanks:{default:[],type:cc.SpriteFrame},sfHeroes:{default:[],type:cc.SpriteFrame},sfBorders:{default:[],type:cc.SpriteFrame},labelLevel:{default:null,type:cc.Label},spHero:{default:null,type:cc.Sprite},spRank:{default:null,type:cc.Sprite},spAttribute:{default:null,type:cc.Sprite},spBorder:{default:null,type:cc.Sprite},spStars:{default:[],type:cc.Sprite}},onLoad:function(){this.refresh()},refresh:function(){var t=s(0,this.sfBorders.length),e=s(0,this.sfHeroes.length),i=s(0,this.spStars.length),n=s(0,this.sfRanks.length),c=s(0,this.sfAttributes.length),o=s(0,100);this.labelLevel.string="LV."+o,this.spRank.spriteFrame=this.sfRanks[n],this.refreshStars(i),this.spBorder.spriteFrame=this.sfBorders[t],this.spAttribute.spriteFrame=this.sfAttributes[c],this.spHero.spriteFrame=this.sfHeroes[e]},refreshStars:function(t){for(var e=0;e<this.spStars.length;++e)this.spStars[e].enabled=e<=t}}),cc._RF.pop()},{}],HomeUI:[function(t,e,i){"use strict";cc._RF.push(e,"80382PDGl1Jf4nvzaq1gyOV","HomeUI");var n=t("BackPackUI"),c=t("ShopUI"),o=cc.Enum({Home:-1,Shop:-1});cc.Class({extends:cc.Component,properties:{menuAnim:{default:null,type:cc.Animation},homeBtnGroups:{default:[],type:cc.Node},backPackUI:{default:null,type:n},shopUI:c},onLoad:function(){this.curPanel=o.Home,this.menuAnim.play("menu_reset")},start:function(){this.backPackUI.init(this),this.shopUI.init(this,o.Shop),this.scheduleOnce(function(){this.menuAnim.play("menu_intro")}.bind(this),.5)},toggleHomeBtns:function(t){for(var e=0;e<this.homeBtnGroups.length;++e){var i=this.homeBtnGroups[e];t?cc.eventManager.resumeTarget(i,!0):cc.eventManager.pauseTarget(i,!0)}},gotoShop:function(){this.curPanel!==o.Shop&&this.shopUI.show()},gotoHome:function(){this.curPanel===o.Shop&&(this.shopUI.hide(),this.curPanel=o.Home)}}),cc._RF.pop()},{BackPackUI:"BackPackUI",ShopUI:"ShopUI"}],ItemCtrl:[function(t,e,i){"use strict";cc._RF.push(e,"ab6a12cyCNKyJwTi3hr+VKy","ItemCtrl"),cc.Class({extends:cc.Component,properties:{itemIcons:{default:[],type:cc.SpriteFrame},itemWidth:100},init:function(t){this.idx=t.idx,this.content=t.content,this.getComponent(cc.Sprite).spriteFrame=t.iconSF,this.node.on("touchstart",this.onPressed.bind(this),this.node)},onPressed:function(){cc.log("haha"),this.content.onPressed(this.getComponent(cc.Sprite).spriteFrame)}}),cc._RF.pop()},{}],MainMenu:[function(t,e,i){"use strict";cc._RF.push(e,"1bc0eZACFdK24h0UsytreOq","MainMenu");var n=t("MenuSidebar");cc.Class({extends:cc.Component,properties:{sidebar:n,roller:cc.Node,panelWidth:0,tabSwitchDuration:0},onLoad:function(){this.sidebar.init(this),this.curPanelIdx=0,this.roller.x=this.curPanelIdx*-this.panelWidth},switchPanel:function(t){this.curPanelIdx=t;var e=this.curPanelIdx*-this.panelWidth,i=cc.moveTo(this.tabSwitchDuration,cc.p(e,0)).easing(cc.easeQuinticActionInOut()),n=cc.callFunc(this.onSwitchPanelFinished,this);this.roller.stopAllActions(),cc.eventManager.pauseTarget(this.roller),this.roller.runAction(cc.sequence(i,n))},onSwitchPanelFinished:function(){cc.eventManager.resumeTarget(this.roller)}}),cc._RF.pop()},{MenuSidebar:"MenuSidebar"}],MenuSidebar:[function(t,e,i){"use strict";cc._RF.push(e,"95628GDDSZIYpJENqXlvcpc","MenuSidebar"),cc.Class({extends:cc.Component,properties:{tabIcons:{default:[],type:cc.SpriteFrame},tabPrefab:cc.Prefab,container:cc.Node,highlight:cc.Node,tabWidth:0},init:function(t){this.mainMenu=t,this.tabSwitchDuration=t.tabSwitchDuration,this.curTabIdx=0,this.tabs=[];for(var e=0;e<this.tabIcons.length;++e){var i=this.tabIcons[e],n=cc.instantiate(this.tabPrefab).getComponent("TabCtrl");this.container.addChild(n.node),n.init({sidebar:this,idx:e,iconSF:i}),this.tabs[e]=n}this.tabs[this.curTabIdx].turnBig(),this.highlight.x=this.curTabIdx*this.tabWidth},tabPressed:function(t){for(var e=0;e<this.tabs.length;++e){var i=this.tabs[e];i.idx===t?(i.turnBig(),cc.eventManager.pauseTarget(i.node)):this.curTabIdx===i.idx&&(i.turnSmall(),cc.eventManager.resumeTarget(i.node))}this.curTabIdx=t;var n=cc.moveTo(this.tabSwitchDuration,cc.p(this.curTabIdx*this.tabWidth)).easing(cc.easeQuinticActionInOut());this.highlight.stopAllActions(),this.highlight.runAction(n),this.mainMenu.switchPanel(this.curTabIdx)}}),cc._RF.pop()},{}],PanelTransition:[function(t,e,i){"use strict";cc._RF.push(e,"e5284RIOh1C4Jyzfa64lV9l","PanelTransition"),cc.Class({extends:cc.Component,properties:{duration:0},onLoad:function(){this.outOfWorld=cc.p(3e3,0),this.node.position=this.outOfWorld;var t=cc.callFunc(this.onFadeOutFinish,this),e=cc.callFunc(this.onFadeInFinish,this);this.actionFadeIn=cc.sequence(cc.spawn(cc.fadeTo(this.duration,255),cc.scaleTo(this.duration,1)),e),this.actionFadeOut=cc.sequence(cc.spawn(cc.fadeTo(this.duration,0),cc.scaleTo(this.duration,2)),t),this.node.on("fade-in",this.startFadeIn,this),this.node.on("fade-out",this.startFadeOut,this)},startFadeIn:function(){cc.eventManager.pauseTarget(this.node,!0),this.node.position=cc.p(0,0),this.node.setScale(2),this.node.opacity=0,this.node.runAction(this.actionFadeIn)},startFadeOut:function(){cc.eventManager.pauseTarget(this.node,!0),this.node.runAction(this.actionFadeOut)},onFadeInFinish:function(){cc.eventManager.resumeTarget(this.node,!0)},onFadeOutFinish:function(){this.node.position=this.outOfWorld}}),cc._RF.pop()},{}],RoomCtrl:[function(t,e,i){"use strict";cc._RF.push(e,"a82ceExYURJ44twmahfqSQj","RoomCtrl"),cc.Class({extends:cc.Component,properties:{shot:cc.Sprite,tabBar:cc.Node,pannelRoller:cc.Node},onLoad:function(){cc.log(this.shot),this.shot.node.active=!1,this.shot.node.on(cc.Node.EventType.TOUCH_START,this.shotcut.bind(this),this.node)},onRemove:function(){this.node.destroy(),this.updateShot()},updateShot:function(){2<this.node.children.length&&(this.shot.node.active=!0)},shotcut:function(){cc.director.emit("isSelected",this.uuid),this.tabBar.active=!1,this.pannelRoller.active=!1,this.shot.node.active=!1,cc.director.on(cc.Director.EVENT_AFTER_DRAW,function(){var t=document.getElementById("GameCanvas").toDataURL("imagea/png");cc.director.off(cc.Director.EVENT_AFTER_DRAW);var e=document.createElement("div");cc.log(i);cc.winSize;var i=window.devicePixelRatio;e.innerHTML="<img id='share' style='width:"+window.innerWidth+"px; height:"+window.innerHeight+"px; display: flex; position: absolute; z-index: 10; padding: 0px; margin: 0px;' src='"+t+"' >",document.body.appendChild(e.childNodes[0])})}}),cc._RF.pop()},{}],ShopUI:[function(t,e,i){"use strict";cc._RF.push(e,"b06f068UltB3KPTKgJesZOm","ShopUI");var n=t("ChargeUI");cc.Class({extends:cc.Component,properties:{anim:cc.Animation,figure:cc.Sprite,btnsNode:cc.Node,chargeUI:n},init:function(t,e){this.home=t,this.node.active=!1,this.anim.play("shop_reset"),this.panelType=e,this.figure.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1,1,.96),cc.scaleTo(1,1,1)))),this.chargeUI.init(t,this.btnsNode)},show:function(){this.node.active=!0,this.anim.play("shop_intro")},hide:function(){this.anim.play("shop_outro")},onFinishShow:function(){this.home.curPanel=this.panelType},onFinishHide:function(){this.node.active=!1}}),cc._RF.pop()},{ChargeUI:"ChargeUI"}],SubBtnsUI:[function(t,e,i){"use strict";cc._RF.push(e,"6907fq75H1EIrLmj/AFBg+B","SubBtnsUI"),cc.Class({extends:cc.Component,properties:{subBtnsAnim:cc.Animation,btnShowSub:cc.Button,btnHideSub:cc.Button,btnContainer:cc.Node},onLoad:function(){this.btnShowSub.node.active=!0,this.btnHideSub.node.active=!1},showSubBtns:function(){this.btnContainer.active=!0,this.subBtnsAnim.play("sub_pop")},hideSubBtns:function(){this.subBtnsAnim.play("sub_fold")},onFinishAnim:function(t){this.btnShowSub.node.active=t,this.btnHideSub.node.active=!t}}),cc._RF.pop()},{}],TabCtrl:[function(t,e,i){"use strict";cc._RF.push(e,"62208XJq9ZC2oNDeQGcbCab","TabCtrl"),cc.Class({extends:cc.Component,properties:{idx:0,icon:cc.Sprite,anim:cc.Animation},init:function(t){this.sidebar=t.sidebar,this.idx=t.idx,this.icon.spriteFrame=t.iconSF,this.node.on("touchstart",this.onPressed.bind(this),this.node),console.log(this.anim)},onPressed:function(){this.sidebar.tabPressed(this.idx)},turnBig:function(){this.anim.play("tab_turn_big")},turnSmall:function(){this.anim.play("tab_turn_small")}}),cc._RF.pop()},{}],btnCtrl:[function(t,e,i){"use strict";cc._RF.push(e,"0499f+vhCxCQZEPs2PamSdq","btnCtrl"),cc.Class({extends:cc.Component,properties:{up:!1,iconUp:cc.SpriteFrame,iconDown:cc.SpriteFrame,roller:cc.Node},onLoad:function(){this.node.on("touchstart",this.onPressed.bind(this),this.node)},onPressed:function(){cc.log(11);var t=this.getComponent(cc.Sprite);if(this.up){cc.log("in up"),this.up=!this.up,t.spriteFrame=this.iconDown;var e=cc.moveTo(.5,cc.p(this.node.parent.x,this.node.parent.y+668)).easing(cc.easeQuinticActionInOut()),i=cc.moveTo(.5,cc.p(this.roller.x,this.roller.y+668)).easing(cc.easeQuinticActionInOut());this.node.parent.runAction(e),this.roller.runAction(i)}else{cc.log("in down"),this.up=!this.up,t.spriteFrame=this.iconUp;var n=cc.moveTo(.5,cc.p(this.node.parent.x,this.node.parent.y-668)).easing(cc.easeQuinticActionInOut()),c=cc.moveTo(.5,cc.p(this.roller.x,this.roller.y-668)).easing(cc.easeQuinticActionInOut());this.node.parent.runAction(n),this.roller.runAction(c)}}}),cc._RF.pop()},{}]},{},["BackPackUI","ButtonScaler","ChargeUI","ContentCtrl","Element","EnergyCounter","HeroSlot","HomeUI","ItemCtrl","PanelTransition","RoomCtrl","ShopUI","SubBtnsUI","MainMenu","MenuSidebar","TabCtrl","btnCtrl"]);