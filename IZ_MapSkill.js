//=============================================================================
// IZ_MapSkill.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 IZ
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version 0.1.5β 2018/3/9
// 
//
// ■更新履歴
// 0.1.5β 2018/3/9   ・操作方法ヘルプの文章をパラメータで設定できるように変更。
// 0.1.4β 2018/2/24  ・職業で立ち絵を変更しようとすると出るエラーを修正。
// 0.1.3β 2017/11/17 ・ヘルプ画面に表示される文字列の形式を指定する設定を追加。
// 0.1.2β 2017/11/9　・指定したスキルタイプのスキルのみ表示する機能を追加。
//					　・メニュー背景のマップ画面にぼかし処理をかけないように変更。
// 0.1.1β 2017/11/4　・リリース
//
// ■更新予定
// 　・ウィンドウの代わりに背景画像を設定できる機能を検討中
//=============================================================================

/*:
 * @plugindesc マップ画面をあまり隠さない新しいスキルシーンを定義します。
 * @author いず
 *
 *
 * @param SkillType
 * @desc 新しいスキルメニューに表示するスキルタイプのid
 * 複数指定可能。ひとつずつ半角英数字で指定してください。
 * @default
 * @type number[]
 * 
 *
 * @param ActorImgType
 * @desc アクター画像をどのタイプにするか
 * 0:画像なし 1:顔グラフィック 2:立ち絵（img\mapSkill内に画像を保存してください）
 * @type number
 * @default 0
 * @min 0
 * @max 2
 *
 * @param ActorImgX
 * @desc 画面左上に対する立ち絵画像左上のX座標
 * ※立ち絵を使用するときのみ有効
 * @type number
 * @default 0
 *
 * @param ActorImgY
 * @desc 画面左上に対する立ち絵画像左上のY座標
 * ※立ち絵を使用するときのみ有効
 * @type number
 * @default 0
 *
 * @param ActorImgWidth
 * @desc 立ち絵画像の幅
 * ※立ち絵を使用するときのみ有効
 * @type number
 * @default 300
 *
 * @param ActorImgHeight
 * @desc 立ち絵画像の幅
 * ※立ち絵を使用するときのみ有効
 * @type number
 * @default 624
 *
 * @param ActorImgClass
 * @desc （※立ち絵を使うとき）アクター画像を職業によって変えるか
 * 0:画像なし 1:顔グラフィック 2:立ち絵（img内に画像を保存してください）
 * @type boolean
 * @default false
 *
 * @param ImageFiles
 * @desc 立ち絵画像リスト。imgフォルダ直下にmapSkillという名前のフォルダを作成し、
 * その中に立ち絵を保存してください。さらに、ここで使用する画像を指定してください。
 * @default
 * @require 1
 * @dir img/mapSkill/
 * @type file[]
 *
 * @param DrawActorName
 * @desc アクター名を表示するか
 * @default true
 * @type boolean
 *
 * @param DrawParamName
 * @desc "HP", "MP", "TP"の文字を表示するか
 * @default true
 * @type boolean
 *
 * @param DrawHpGauge
 * @desc HPゲージを表示するか
 * @default true
 * @type boolean
 *
 * @param DrawMpGauge
 * @desc MPゲージを表示するか
 * @default true
 * @type boolean
 *
 * @param DrawTpGauge
 * @desc TPゲージを表示するか
 * @default true
 * @type boolean
 *
 * @param mpColor
 * @desc drawParamNameがfalseのとき、MPの数字の色
 * MPの文字の色
 * @default 1
 * @type number
 * @min 0
 *
 * @param helpStyle
 * @desc ヘルプをどのような形式で表示するか。
 * _icon:アイコンid _name:名前　_desc〇:解説〇行目
 * @default \I[_icon]_name：_desc1
 *
 * @param help2Text
 * @desc 画面下端の操作方法のヘルプの文章
 * @default Esc : 戻る／メニューを閉じる 　PgUp : 次キャラクター 　PgDn : 前キャラクター
 *
 * @help プラグインコマンド : MapSkill 〇〇（後述）で
 * マップ画面をあまり隠さないスキルシーン（Scene_MapSkill）に遷移します。
 *
 * ■スキルタイプの指定(new in ver.0.1.2β)
 * ・新しいスキルメニューに表示するスキルタイプのidをプラグインパラメータのリストで指定してください。
 * ・idは半角英数字で１つずつ指定してください。
 * ・何も指定しない場合はすべてのスキルタイプのスキルが表示されます。
 *
 * ■立ち絵を使うための準備
 *
 * ・imgフォルダ直下にmapSkillという名前のフォルダを作成し、
 * 　その中に立ち絵用画像を保存していきます。
 *
 * ・職業によってアクター画像を『変えない』とき、立ち絵画像のファイル名は
 *　（アクターid）.png の形で設定して下さい。
 * 　例；アクター番号１のキャラクターの立ち絵のファイル名 -> 1.png
 *
 * ・職業によってアクター画像を『変える』とき、立ち絵画像のファイル名は
 *　（アクターid）_（職業id）.png の形で設定して下さい。
 * 　例；アクターidが１のキャラクターの職業idが１のときの
 * 　　　立ち絵のファイル名 -> 1_1.png
 *
 * ・立ち絵の幅と高さはすべての画像で統一してください。
 *
 *
 * ■プラグインコマンド一覧
 * ・MapSkill open  ->  Scene_MapSkillを開く
 * ・MapSkill 1     ->  Scene_MapSkillを開いて隊列の1番目のキャラクターにセット
 * ・MapSkill 2     ->  〃　　　　　　　　　　　　　2番目　　　〃
 * 　※隊列番号3番目以降のキャラクターの場合も同様。
 *
 *
 * ■プラグインパラメータ "helpStyle" では、
 * 　エディタのメッセージウィンドウと同じ制御文字を用いて
 * 　表示されるヘルプの文字の大きさ・色などを制御できます。(new in ver.0.1.3β)
 *
 * ・プラグインパラメータ "helpStyle" で使用できる制御文字一覧
 * 　\I[〇]：アイコン〇番を表示
 * 　\I[_icon]：ヘルプにセットされたアイテムのアイコンを表示
 * 　_desc〇：ヘルプの〇行目
 * 　\C[〇]：これ以降の文字色を〇番の色に変更
 * 　\{：これ以降の文字を大きく
 * 　\}：これ以降の文字を小さく　
 *　 その他、ツクール本体の設定に準ずる。
 *
 * ・ヘルプ表示内容について、エディタ上の〇行目に "\n" と入力した場合、
 * 　それ以降の文字列は〇＋１行目の文字列として扱われます。
 * 　（現在6行目まで対応）
 * ※3行以上のヘルプを使用する場合、トリアコンタン様のUsableCarriageReturn.jsを
 * 　このプラグインの上に配置して有効にしてください。
 *
 * 　例；
 * 　エディタのヘルプ表示内容の設定に
 * 　「一行目の文章はこんなかんじ。
 * 　　二行目は\n途中で改行する。」と入力すると
 *
 * 　「一行目の文章はこんなかんじ。
 * 　　二行目は
 * 　　途中で改行する。」　のように表示され、
 * 
 * 　『途中で改行する』の部分は_desc3で表示できます。
 *
 */

(function () {

    'use strict'
    var pluginName = 'IZ_MapSkill';

    //■プラグインパラメータ
    var parameters = PluginManager.parameters('IZ_MapSkill');

    var st = parameters['SkillType'];
    var izSkillType = JSON.parse(st);

    var ActorImgType = Number(parameters['ActorImgType'] || 0);
    var ActorImgX = Number(parameters['ActorImgX'] || 0);
    var ActorImgY = Number(parameters['ActorImgY'] || 0);
    var ActorImgWidth = Number(parameters['ActorImgWidth'] || 0);
    var ActorImgHeight = Number(parameters['ActorImgHeight'] || 0);
    var ActorImgClass = Boolean(parameters['ActorImgClass'] === 'true');
    var DrawActorName = Boolean(parameters['DrawActorName'] === 'true');
    var DrawParamName = Boolean(parameters['DrawParamName'] === 'true');
    var DrawHpGauge = Boolean(parameters['DrawHpGauge'] === 'true');
    var DrawMpGauge = Boolean(parameters['DrawMpGauge'] === 'true');
    var DrawTpGauge = Boolean(parameters['DrawTpGauge'] === 'true');
    var mpColor = Number(parameters['mpColor']) || 1;
    var tpColor = Number(parameters['tpColor']) || 1;
    var helpStyle = parameters['helpStyle'] || '';
    var help2Text = String(parameters['help2Text'] || '');


        
    //-----------------------------------------------------------------------------
    // Scene_MapSkill
    //
    // The scene class of the skill screen.

    function Scene_MapSkill() {
        this.initialize.apply(this, arguments);
    }

    Scene_MapSkill.prototype = Object.create(Scene_ItemBase.prototype);
    Scene_MapSkill.prototype.constructor = Scene_MapSkill;

    Scene_MapSkill.prototype.initialize = function () {
        Scene_ItemBase.prototype.initialize.call(this);
    };

    Scene_MapSkill.prototype.create = function () {
        Scene_ItemBase.prototype.create.call(this);
        if (ActorImgType == 2) {
            this.createActorImgWindow();
        }
        this.createMSHelpWindow();
        this.createStatusWindow();
        this.createItemWindow();
        this.createMSHelpWindow2();
        this.createActorWindow();
        this._itemWindow.activate();
        this._itemWindow.select(0);
    };

    Scene_MapSkill.prototype.createActorImgWindow = function () {
        this._actorImgWindow = new Window_MSActorImg();
        this._actorImgWindow.loadImages();
        this.addWindow(this._actorImgWindow);
    };

    Scene_MapSkill.prototype.createActorWindow = function () {
        var wx = this._statusWindow.width;
        var wy = this._statusWindow.y + this._helpWindow.height;
        var ww = Graphics.boxWidth - this._statusWindow.width;
        var wh = Graphics.boxHeight - wy;
        this._actorWindow = new Window_MSMenuActor(wx, wy, ww, wh);
        this._actorWindow.setHandler('ok', this.onActorOk.bind(this));
        this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
        this.addWindow(this._actorWindow);
    }

    Scene_MapSkill.prototype.createMSHelpWindow = function () {
        this._helpWindow = new Window_MSHelp();
        this.addWindow(this._helpWindow);
    };

    Scene_MapSkill.prototype.createMSHelpWindow2 = function () {
        this._helpWindow2 = new Window_MSHelp2();
        this.addWindow(this._helpWindow2);
    };

    Scene_MapSkill.prototype.start = function () {
        Scene_ItemBase.prototype.start.call(this);
        this.refreshActor();
        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };

    Scene_MapSkill.prototype.createStatusWindow = function () {
        var ww = 200;
        var wh = ActorImgType == 1 ? 338 : 194;
        var wx = 0;
        var wy = Graphics.boxHeight - wh;
        this._statusWindow = new Window_MapSkillStatus(wx, wy, ww, wh);
        this._statusWindow.reserveFaceImages();
        this.addWindow(this._statusWindow);
    };

    Scene_MapSkill.prototype.createItemWindow = function () {
        var faceHeight = ActorImgType == 1 ? 144 : 0;
        var wx = this._statusWindow.width;
        var wy = this._statusWindow.y + this._helpWindow.height + faceHeight;
        var ww = Graphics.boxWidth - this._statusWindow.width;
        var wh = Graphics.boxHeight - wy - 44;
        this._itemWindow = new Window_MapSkillList(wx, wy, ww, wh);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.popScene.bind(this));
        this._itemWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._itemWindow.setHandler('pageup', this.previousActor.bind(this));
        this.addWindow(this._itemWindow);
    };


    //WindowLayerの設定（ウィンドウの重なりを許可）
    Scene_MapSkill.prototype.createWindowLayer = function () {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        this._windowLayer = new WindowLayerMS();
        this._windowLayer.move(x, y, width, height);
        this.addChild(this._windowLayer);
    };

    Scene_MapSkill.prototype.refreshActor = function () {
        var actor = this.actor();
        this._statusWindow.setActor(actor);
        this._itemWindow.setActor(actor);
        if (ActorImgType == 2) {
            this._actorImgWindow.setActor(actor);
        }
    };

    Scene_MapSkill.prototype.user = function () {
        return this.actor();
    };

    Scene_MapSkill.prototype.onItemOk = function () {
        this.actor().setLastMenuSkill(this.item());
        this.determineItem();
    };

    Scene_MapSkill.prototype.playSeForItem = function () {
        SoundManager.playUseSkill();
    };

    Scene_MapSkill.prototype.useItem = function () {
        Scene_ItemBase.prototype.useItem.call(this);
        this._statusWindow.refresh();
        this._itemWindow.refresh();
    };

    Scene_MapSkill.prototype.onActorChange = function () {
        this.refreshActor();
        this._itemWindow.activate();
    };
    

    //-----------------------------------------------------------------------------
    // Window_MSActorImg
    //
    // The window for displaying the Actor Image

    function Window_MSActorImg() {
        this.initialize.apply(this, arguments);
    }

    Window_MSActorImg.prototype = Object.create(Window_Base.prototype);
    Window_MSActorImg.prototype.constructor = Window_MSActorImg;

    Window_MSActorImg.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this, ActorImgX, ActorImgY, ActorImgWidth, ActorImgHeight);
        this._actor = null;
        this.opacity = 0;
        this._sprite = null;
    };

    Window_MSActorImg.prototype.standardPadding = function () {
        return 0;
    };

    Window_MSActorImg.prototype.setActor = function (actor) {
        
        if (this._actor !== actor) {
            this.contents.clear();
            if (this._sprite != null) {
                this.removeChild(this._sprite);
            }

            this._actor = actor;
            var img = ImageManager.loadMSActorImg(actor);
            this._sprite = new Sprite(img);
            this.addChild(this._sprite);
        }
    };

   
    Window_MSActorImg.prototype.loadImages = function () {
        $gameParty.members().forEach(function (actor) {
            var actorId = String(actor._actorId);
            if (ActorImgClass) {
                var actorClass = String(actor._classId);
                var filename = actorId + "_" + actorClass;
            } else {
                filename = actorId;
            }
            ImageManager.reserveMSActorImage(filename);
        }, this);
    };

    ImageManager.reserveMSActorImage = function (filename, hue, reservationId) {
        return this.reserveBitmap('img/mapSkill/', filename, hue, true, reservationId);
    };

    ImageManager.loadMSActorImg = function (actor) {
        var hue = 0;
        var actorId = String(actor._actorId);
        if (ActorImgClass) {
            var actorClass = String(actor._classId);
            var filename = actorId + "_" + actorClass;
        } else {
            filename = actorId;
        }
        return this.loadBitmap('img/mapSkill/', filename, hue, true);
    };


    //-----------------------------------------------------------------------------
    // Window_MapSkillStatus
    //
    // The window for displaying the skill user's status on the skill screen.

    function Window_MapSkillStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_MapSkillStatus.prototype = Object.create(Window_Base.prototype);
    Window_MapSkillStatus.prototype.constructor = Window_MapSkillStatus;

    Window_MapSkillStatus.prototype.windowWidth = function () {
        return 200;
    }

    Window_MapSkillStatus.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
    };

    Window_MapSkillStatus.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_MapSkillStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._actor) {
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            var y = h / 2 - this.lineHeight() * 1.5;
            var width = w - 162 - this.textPadding();
            if (ActorImgType == 1) {
                this.drawActorFace(this._actor, 10, -84, 144, h);
            }
            this.drawActorSimpleStatus(this._actor, 0, y, width);
        }
    };
    
    Window_MapSkillStatus.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
        var shiftY0 = ActorImgType == 1 ? 82 : 0;
        var lineHeight = this.lineHeight();
        var width2 = this.windowWidth() - 2 * this.standardPadding;
        var shiftY = 0.8 * this.lineHeight() - shiftY0;
        var n = 0;
        if (DrawActorName) {
            this.drawActorName(actor, x, y-shiftY);
            n++;
        }
        
        this.drawActorIcons(actor, x, y-shiftY + lineHeight * (n+2));
        this.drawActorHp(actor, x, y-shiftY + lineHeight * n, width2);
        this.drawActorMp(actor, x, y-shiftY + lineHeight * (n+1), width2);
        this.drawActorTp(actor, x, y-shiftY + lineHeight * (n+1), width2);
    };
    
    Window_MapSkillStatus.prototype.drawActorIcons = function (actor, x, y, width) {
        width = width || 160;
        var icons = actor.allIcons().slice(0, Math.floor(width / Window_Base._iconWidth));
        for (var i = 0; i < icons.length; i++) {
            this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
        }
    };

    Window_MapSkillStatus.prototype.drawActorHp = function(actor, x, y, width) {
        width = width || 160;
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        if (DrawParamName) {
            this.drawText(TextManager.hpA, x, y, 44);
        }
        this.drawCurrentHpAndMaxHp(actor.hp, actor.mhp, x, y, width,
                               this.hpColor(actor), this.normalColor());
    };

    Window_MapSkillStatus.prototype.drawCurrentHpAndMaxHp = function (current, max, x, y,
                                                   width, color1, color2) {
        var valueWidth = this.textWidth('000');
        this.contents.fontSize -= 10;
        var slashWidth = this.textWidth('/');
        var valueWidth2 = this.textWidth('000');
        this.contents.fontSize += 10;

        var x1 = x + width - valueWidth2;
        var x2 = x1 - slashWidth;
        var x3 = x2 - valueWidth;
        if (x3 >= x) {
            this.changeTextColor(color1);
            this.drawText(current, x3, y, valueWidth, 'right');
            this.changeTextColor(color2);
            this.contents.fontSize -= 10;
            this.drawText('/', x2, y + 4, slashWidth, 'right');
            this.drawText(max, x1, y + 6, valueWidth2, 'right');
            this.contents.fontSize += 10;
        } else {
            this.changeTextColor(color1);
            this.drawText(current, x1, y, valueWidth, 'right');
        }
    };

    Window_MapSkillStatus.prototype.drawActorMp = function (actor, x, y, width) {
        this.contents.fontSize += 8;
        width = this.textWidth('00');
        this.resetFontSettings();
        this.contents.fontSize -= 10;
        width += this.textWidth('/00');
        this.resetFontSettings();

        this.changeTextColor(this.systemColor());
        if (DrawMpGauge) {
            var color1 = this.mpGaugeColor1();
            var color2 = this.mpGaugeColor2();
            this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
        }
        if (DrawParamName) {
            this.drawText(TextManager.mpA, x, y, 44);
            this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
                                   this.mpColor(actor), this.normalColor());
        } else {
            this.drawCurrentMpAndMaxMp(actor.mp, actor.mmp, x, y, width,
                                   this.mpColor(actor), this.normalColor());
        }
    };
    
    Window_MapSkillStatus.prototype.drawCurrentMpAndMaxMp = function (current, max, x, y,
                                                   width, color1, color2) {
        var labelWidth = this.textWidth('MP');
        this.contents.fontSize += 8;
        var valueWidth = this.textWidth('00');
        this.contents.fontSize -= 18;
        var valueWidth2 = this.textWidth('00');
        var slashWidth = this.textWidth('/');
        this.contents.fontSize += 10;

        var x1 = x + width - valueWidth2;
        var x2 = x1 - slashWidth;
        var x3 = x2 - valueWidth;
        if (!DrawParamName) {
            this.contents.fontSize += 8;
            this.changeTextColor(this.mpCostColor());
            this.drawText(current, x3, y, valueWidth, 'right');
            this.resetFontSettings();
            this.contents.fontSize -= 10;
            this.drawText('/', x2, y+4, slashWidth, 'right');
            this.drawText(max, x1, y+6, valueWidth2, 'right');
            this.resetFontSettings();
        } else if (x3 >= x + labelWidth) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(current, x3, y, valueWidth, 'right');
            this.changeTextColor(color2);
            this.drawText('/', x2, y, slashWidth, 'right');
            this.drawText(max, x1, y, valueWidth, 'right');
            this.resetFontSettings();
        
        } else {
            this.changeTextColor(this.mpCostColor());
            this.drawText(current, x1, y, valueWidth, 'right');
            this.resetFontSettings();
        }
    };

    Window_MapSkillStatus.prototype.drawActorTp = function (actor, x, y, width) {
        width = width || 160;
        var width2 = this.textWidth('00000');
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        this.drawGauge(x+width2, y, width - width2, actor.tpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        if (DrawParamName) {
            this.drawText(TextManager.tpA, x + width2, y, 44);
        }
        this.changeTextColor(this.tpColor(actor));
        this.drawText(actor.tp, x + width2, y, 90, 'right');
    };
    


    //-----------------------------------------------------------------------------
    // Window_MapSkillList
    //
    // The window for selecting a skill on the skill screen.

    function Window_MapSkillList() {
        this.initialize.apply(this, arguments);
    }

    Window_MapSkillList.prototype = Object.create(Window_SkillList.prototype);
    Window_MapSkillList.prototype.constructor = Window_MapSkillList;

    Window_MapSkillList.prototype.setStypeId = function (stypeId) {
		if (this._stypeId !== stypeId) {
				this._stypeId = stypeId;
                this.refresh();
                this.resetScroll();
            }
    };

	Window_MapSkillList.prototype.includes = function(item) {
		var result = false;
		if(izSkillType.length == 0){
			result = true;
		}else{
			for (var i = 0, len = izSkillType.length; i < len; i++) {
				if(item && item.stypeId === Number(izSkillType[i])){
				result = true;
				break;
				}
			}
		}
		return result;
	};

    Window_MapSkillList.prototype.maxCols = function () {
        return Math.floor(Graphics.boxWidth / 90);
    };

    Window_MapSkillList.prototype.spacing = function () {
        return 15;
    };

    Window_MapSkillList.prototype.isEnabled = function (item) {
        return this._actor && this._actor.canUse(item);
    };
 
    Window_MapSkillList.prototype.drawItem = function (index) {
        var skill = this._data[index];
        if (skill) {
            var costWidth = this.costWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(skill));
            this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
            this.drawSkillCost(skill, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    Window_MapSkillList.prototype.costWidth = function () {
        return this.textWidth('000');
    };

    Window_MapSkillList.prototype.drawSkillCost = function (skill, x, y, width) {
        if (this._actor.skillTpCost(skill) > 0) {
            this.changeTextColor(this.tpCostColor());
            this.drawText(this._actor.skillTpCost(skill), x, y, width, 'right');
        } else if (this._actor.skillMpCost(skill) > 0) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
        }
    };

    Window_MapSkillList.prototype.updateHelp = function () {
        this.setHelpWindowItem(this.item());
    };

    Window_MapSkillList.prototype.refresh = function () {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_MapSkillList.prototype.lineHeight = function () {
        return 75;
    };

    Window_MapSkillList.prototype.standardFontSize = function () {
        return 24;
    };

    Window_MapSkillList.prototype.standardPadding = function () {
        return 10;
    };

    Window_MapSkillList.prototype.textPadding = function () {
        return 0;
    };

    Window_MapSkillList.prototype.drawIcon = function (iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, 50, 50);
    };

    Window_MapSkillList.prototype.drawItem = function (index) {
        var skill = this._data[index];
        if (skill) {
            var costWidth = this.costWidth();
            var rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(skill));
            this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
            this.drawSkillCost(skill, rect.x, rect.y, rect.width,index);
            this.changePaintOpacity(1);
        }
    };

    Window_MapSkillList.prototype.costWidth = function () {
        return this.textWidth('000');
    };

    Window_MapSkillList.prototype.drawSkillCost = function (skill, x, y, width,index) {
        if (this._actor.skillTpCost(skill) > 0 && this._actor.skillMpCost(skill) == 0) {
            this.changeTextColor(this.tpCostColor());
            this.drawText(this._actor.skillTpCost(skill), x, y + 26, width, 'center');
        } else if (this._actor.skillTpCost(skill) == 0 && this._actor.skillMpCost(skill) > 0) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(this._actor.skillMpCost(skill), x, y + 26, width, 'center');
        } else if (this._actor.skillTpCost(skill) > 0 && this._actor.skillMpCost(skill) > 0) {
            var rect = this.itemRect(index);
            this.textWidth('00');
            this.changeTextColor(this.mpCostColor());
            this.drawText(this._actor.skillMpCost(skill), x - 0 * rect.width, y + 26, width/2, 'center');
            this.changeTextColor(this.tpCostColor());
            this.drawText(this._actor.skillTpCost(skill), x + 0.5 * rect.width, y + 26, width / 2, 'center');
            this.textWidth('000');
        }          
    };

    Window_MapSkillList.prototype.drawItemName = function (item, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
        }
    };


    //-----------------------------------------------------------------------------
    // Window_MSMenuActor
    //
    // The window for selecting a target actor on the map skill screens.

    function Window_MSMenuActor() {
        this.initialize.apply(this, arguments);
    }

    Window_MSMenuActor.prototype = Object.create(Window_MenuActor.prototype);
    Window_MSMenuActor.prototype.constructor = Window_MSMenuActor;

    Window_MSMenuActor.prototype.standardPadding = function () {
        return 10;
    };

    Window_MSMenuActor.prototype.initialize = function (x, y, width, height) {
        var y1 = ActorImgType == 1 ? y + 144 : y;
        var height1 = ActorImgType == 1 ? height - 144 : height;
        Window_Selectable.prototype.initialize.call(this, x, y1, width, height1);
        this._formationMode = false;
        this._pendingIndex = -1;
        this.refresh();
        this.hide();
    };

    Window_MSMenuActor.prototype.loadImages = function () {
        $gameParty.members().forEach(function (actor) {
            ImageManager.reserveCharactors(actor.characterName());
        }, this);
    };

    Window_MSMenuActor.prototype.maxCols = function () {
        return 4;
    }

    Window_MSMenuActor.prototype.itemHeight = function () {
        var clientHeight = this.height - this.padding * 2;
        return clientHeight;
    };

    Window_MSMenuActor.prototype.loadImages = function () {
        $gameParty.members().forEach(function (actor) {
            ImageManager.reserveCharacter(actor.characterName());
        }, this);
    };

    Window_MSMenuActor.prototype.drawItemImage = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        this.drawActorCharacter(actor,rect.x+24,rect.y+48);
    };

    Window_MSMenuActor.prototype.drawItemStatus = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        var x = rect.x;
        var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
        var width = rect.width - this.textPadding();
        this.drawActorSimpleStatus(actor, x, y, width);
    };

    Window_MSMenuActor.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
        var lineHeight = this.lineHeight()-2;
        var mpWidth = width * 0.4;
        var characterHeight = 20;
        this.drawActorIcons(actor, x, y + lineHeight * 2 + characterHeight);
        this.drawActorHp(actor, x, y + characterHeight, width);
        this.drawActorMp(actor, x, y + lineHeight * 1 + characterHeight, mpWidth);
        this.drawActorTp(actor, x + mpWidth + 10, y + lineHeight * 1 + characterHeight, width-mpWidth-10);
    };

    Window_MSMenuActor.prototype.drawActorIcons = function (actor, x, y, width) {
        width = width || 130;
        var icons = actor.allIcons().slice(0, Math.floor(width / 24));
        for (var i = 0; i < icons.length; i++) {
            this.drawIcon(icons[i], x + 24 * i, y + 2);
        }
    };

    Window_MSMenuActor.prototype.drawIcon = function (iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, 24, 24);
    };

    Window_MSMenuActor.prototype.drawActorHp = function (actor, x, y, width) {
        width = width || 130;
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
        this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                               this.hpColor(actor), this.normalColor());
    }

    Window_MSMenuActor.prototype.drawActorMp = function (actor, x, y, width) {
        this.changeTextColor(this.systemColor());
        this.drawCurrentMpAndMaxMp(actor.mp, actor.mmp, x, y, width,
                               this.mpColor(actor), this.normalColor());
    }

    Window_MSMenuActor.prototype.drawCurrentMpAndMaxMp = function (current, max, x, y,
                                                   width, color1, color2) {
        var valueWidth = this.textWidth('00');
        this.contents.fontSize -= 10;
        var valueWidth2 = this.textWidth('00');
        var slashWidth = this.textWidth('/');
        this.contents.fontSize += 10;

        var x3 = x;
        var x2 = x3 + valueWidth;
        var x1 = x2 + slashWidth;
            
        if (x3 >= x) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(current, x3, y, valueWidth, 'right');
            this.resetFontSettings();
            this.contents.fontSize -= 10;
            this.drawText('/', x2, y + 4, slashWidth, 'right');
            this.drawText(max, x1, y + 6, valueWidth2, 'right');
            this.resetFontSettings();
        } else {
            this.changeTextColor(this.mpCostColor());
            this.drawText(current, x1, y, valueWidth, 'right');
            this.resetFontSettings();
        }
    };

    Window_MSMenuActor.prototype.drawActorTp = function (actor, x, y, width) {
        width = width || 96;
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.changeTextColor(this.tpColor(actor));
        this.drawText(actor.tp, x + width - 64, y, 64, 'right');
    };


    //-----------------------------------------------------------------------------
    // Window_MSHelp
    function Window_MSHelp() {
        this.initialize.apply(this, arguments);
    }

    Window_MSHelp.prototype = Object.create(Window_Help.prototype);
    Window_MSHelp.prototype.constructor = Window_MSHelp;

    Window_MSHelp.prototype.initialize = function (numLines) {
        var wx = 200;
        var wy = Graphics.boxHeight - 194;
        var width = Graphics.boxWidth - wx;
        var height = this.fittingHeight(1);
        Window_Base.prototype.initialize.call(this, wx, wy, width, height);
        this._text = '';
    };

    Window_MSHelp.prototype.lineHeight = function () {
        return 32;
    };

    Window_MSHelp.prototype.standardFontSize = function () {
        return 24;
    };

    Window_MSHelp.prototype.standardPadding = function () {
        return 10;
    };

    Window_MSHelp.prototype.textPadding = function () {
        return 0;
    };

    Window_MSHelp.prototype.drawIcon = function (iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, 28, 28);
    };

	Window_MSHelp.prototype.setItem = function(item) {
		var helpText = '';
		if(helpStyle != '' && item){
			var helpText = helpStyle;
			helpText = helpText.replace(/_icon/g, item.iconIndex); 
            helpText = helpText.replace(/_name/g, item.name);
            helpText.replace(/\n/, /\\n/);
            var descs = item.description ? item.description.split(/\n|\\n/) : []; 

            for (i = 0; i < descs.length; i++) {
                if (descs[i] == "\\n") {
                    descs.splice(i, 1);
                }
            }

			helpText = descs[0] ? helpText.replace(/_desc1/g, descs[0]) : helpText.replace(/_desc1/g, '');
			helpText = descs[1] ? helpText.replace(/_desc2/g, descs[1]) : helpText.replace(/_desc2/g, '');
			helpText = descs[2] ? helpText.replace(/_desc3/g, descs[2]) : helpText.replace(/_desc3/g, '');
            helpText = descs[3] ? helpText.replace(/_desc4/g, descs[3]) : helpText.replace(/_desc4/g, '');
            helpText = descs[4] ? helpText.replace(/_desc5/g, descs[4]) : helpText.replace(/_desc5/g, '');
            helpText = descs[5] ? helpText.replace(/_desc6/g, descs[5]) : helpText.replace(/_desc6/g, '');
		}else{
			helpText = item ? item.description : '';
		}
		this.setText(helpText);
    };


    //-----------------------------------------------------------------------------
    // Window_MSHelp2
    function Window_MSHelp2() {
        this.initialize.apply(this, arguments);
    }

    Window_MSHelp2.prototype = Object.create(Window_Base.prototype);
    Window_MSHelp2.prototype.constructor = Window_MSHelp2;

    Window_MSHelp2.prototype.initialize = function () {
        var wx = 200;
        var wy = Graphics.boxHeight - 44;
        var width = Graphics.boxWidth - wx;
        var height = 44;
        Window_Base.prototype.initialize.call(this, wx, wy, width, height);
        this.refresh();
    };

    Window_MSHelp2.prototype.lineHeight = function () {
        return 20;
    };

    Window_MSHelp2.prototype.standardFontSize = function () {
        return 15;
    };

    Window_MSHelp2.prototype.standardPadding = function () {
        return 10;
    };

    Window_MSHelp2.prototype.textPadding = function () {
        return 0;
    };

    Window_MSHelp2.prototype.drawIcon = function (iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, 18, 18);
    };

    Window_MSHelp2.prototype.refresh = function () {
        var width = this.contentsWidth();
        this.drawText(help2Text, 0, 0, width, 'center');
    }


    /////////////////////////////////////////////////////////
    //■WindowLayerMS
    //
    //ウィンドウ同士の重なりを許可したウィンドウレイヤー
    /////////////////////////////////////////////////////////

    function WindowLayerMS() {
        this.initialize.apply(this, arguments);
    }

    WindowLayerMS.prototype = Object.create(WindowLayer.prototype);
    WindowLayerMS.prototype.constructor = WindowLayerMS;

    WindowLayerMS.prototype._maskWindow = function (window) { };

    WindowLayerMS.prototype._canvasClearWindowRect = function (renderSession, window) { };

    /////////////////////////////////////////////////////////
    //■Game_Interpreter
    //
    //プラグインコマンドの定義
    /////////////////////////////////////////////////////////
    var _Game_Interpreter_pluginCommand =Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'MapSkill') {
            if (args[0] !== 'open') {
                var num = Number.parseInt(args[0]) - 1;
                var a = $gameParty._actors[num];
                $gameParty.setMenuActor($gameActors.actor(a));
            }
            SceneManager.push(Scene_MapSkill);
        }
    };


	/////////////////////////////////////////////////////////
    //■IZ_NonBlurBG
    //プラグイン統合
    //メニュー背景にぼかしをかけない処理を追加
    /////////////////////////////////////////////////////////
	SceneManager.snapForBackgroundNonBlur = function () {
        this._backgroundBitmap = this.snap();
    };

    var _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function () {
        Scene_Base.prototype.terminate.call(this);
		
		if(SceneManager.isNextScene(Scene_MapSkill)){
			this._spriteset.update();
            this._mapNameWindow.hide();
			 SceneManager.snapForBackgroundNonBlur();
			
			$gameScreen.clearZoom();
			this.removeChild(this._fadeSprite);
			this.removeChild(this._mapNameWindow);
			this.removeChild(this._windowLayer);
			this.removeChild(this._spriteset);

		}else{
			_Scene_Map_terminate.call(this);
		}
    };

    
})();
