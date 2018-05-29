//=============================================================================
// IZ_BattleHelp
//
// ----------------------------------------------------------------------------
// Copyright (c) 2018 IZ
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version 1.3.1 2018/5/20
// 
//
// ■更新履歴
// ver.1.3.1  2018/5/20   公開にあたり微調整
// ver.1.3.0  2018/3/9    ウィンドウの更新タイミングをデフォルトのままにする機能を追加。
// ver.1.2.0  2018/3/1    ヘルプスタイルの改行処理に関するエラーを改善。
// ver.1.1.0  2017/11/16  ヘルプスタイルの設定オプションを追加。
// 
//
//=============================================================================
/*:
* @plugindesc v1.3.1 バトルシーンにおけるヘルプの更新タイミングと表示内容を変更します。
* YEP_BattleEngineCoreのSelectHelpWindowをfalseにして使用して下さい。
*
* @author いず
*
* @param helpVisibleRaws
* @desc ヘルプウィンドウを何行表示にするか
* @default 2
* @type number
* @min 0
*
* @param helpStyle
* @desc ヘルプをどのような形式で表示するか。
* _icon:アイコンid _name:名前　_desc〇:解説〇行目
* @default \I[_icon]_name：_desc1
*
* @param changeUpdateTiming
* @desc ヘルプの更新タイミングを変更するか
* @default true
* @type boolean
* 
*
* @help スキル/アイテム選択後、対象選択画面までヘルプウィンドウの内容が保持されます。
* スキル/アイテムの内容を確認しながら効果対象を選択することができます。
* YEP_BattleEngineCoreと併用する際は、
* このプラグインを下にセットした上で
* YEP_BattleEngineCoreのパラメータ；Select Help Window を false にして
* このプラグインをYEP_BattleEngineCoreよりも下に配置してください。
* 
* １．プラグインパラメータ "helpStyle" では、
* 　　エディタのメッセージウィンドウと同じ制御文字を用いて
* 　　表示されるヘルプの文字の大きさ、色、表示内容を制御できます。
*
* 　■プラグインパラメータ "helpStyle" で使用できる制御文字一覧
* 　　\I[〇]：アイコン〇番を表示
* 　　\I[_icon]：ヘルプにセットされたアイテムのアイコンを表示
* 　　_desc〇：ヘルプの〇行目
* 　　\C[〇]：これ以降の文字色を〇番の色に変更
* 　　\{：これ以降の文字を大きく
* 　　\}：これ以降の文字を小さく　
*　 　その他、ツクール本体の設定に準ずる。
*
* ２．エディタ上の〇行目に "\n" と入力した場合、
* 　　それ以降の文字列は〇＋１行目の文字列として扱われます。
* 　　（現在4行目まで対応）
* 　　※3行以上のヘルプを使用する場合、トリアコンタン様のUsableCarriageReturn.jsを
*  　　 このプラグインの上に配置して有効にしてください。
*
* 　　例；
* 　　エディタのヘルプ表示内容の設定に
* 　　「一行目の文章はこんなかんじ。
* 　　　二行目は\n途中で改行する。」と入力すると
*
* 　　「一行目の文章はこんなかんじ。
* 　　　二行目は
* 　　　途中で改行する。」　のように表示され、
* 
* 　　『途中で改行する』の部分は_desc3で表示できます。
*/

(function () {
	
	'use strict'
	var pluginName = 'IZ_BattleHelp';
	var parameters = PluginManager.parameters(pluginName);
	var helpVisibleRaws = Number(parameters['helpVisibleRaws'] || 2);
    var helpStyle = parameters['helpStyle'] || '';
    var changeUpdateTiming = Boolean(parameters['changeUpdateTiming'] || '');

    var _Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
    Scene_Battle.prototype.createHelpWindow = function () {
        if (changeUpdateTiming) {
            this._helpWindow = new Window_izBattleHelp();
            this._helpWindow.visible = false;
            this.addWindow(this._helpWindow);
        } else {
            _Scene_Battle_createHelpWindow.call(this);
        }
		
	}

    var _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function () {
        if (changeUpdateTiming) {
            Scene_Base.prototype.start.call(this);
            this.startFadeIn(this.fadeSpeed(), false);
            BattleManager.playBattleBgm();
            BattleManager.startBattle();
            
            Window_izBattleHelp.prototype.clear = function () {};
		
        } else {
            _Scene_Battle_start.call(this);
        }
	};

    var _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        if (changeUpdateTiming) {
            Scene_Base.prototype.terminate.call(this);
            $gameParty.onBattleEnd();
            $gameTroop.onBattleEnd();
            AudioManager.stopMe();

            Window_izBattleHelp.prototype.clear = function () {
                this.setText('');
            };

        } else {
            _Scene_Battle_terminate.call(this);
        }
		
	};


    var _Window_BattleSkill_hide = Window_BattleSkill.prototype.hide;
    Window_BattleSkill.prototype.hide = function () {
        if (changeUpdateTiming) {
            //this.hideHelpWindow();
            Window_SkillList.prototype.hide.call(this);
        } else {
            _Window_BattleSkill_hide.call(this);
        }
		
	};

	Window_BattleSkill.prototype.hide2 = function () {
		this.hideHelpWindow();
		Window_SkillList.prototype.hide.call(this);
	};

    var _Window_BattleItem_hide = Window_BattleItem.prototype.hide;
    Window_BattleItem.prototype.hide = function () {
        if (changeUpdateTiming) {
            //this.hideHelpWindow();
            Window_ItemList.prototype.hide.call(this);
        } else {
            _Window_BattleItem_hide.call(this);
        }
		
	};

	Window_BattleItem.prototype.hide2 = function () {
		this.hideHelpWindow();
		Window_ItemList.prototype.hide.call(this);
	};


    var _Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
    Scene_Battle.prototype.onSkillCancel = function () {
        if (changeUpdateTiming) {
            this._skillWindow.hide2();//
            this._actorCommandWindow.activate();
        } else {
            _Scene_Battle_onSkillCancel.call(this);
        }
	};


    var _Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
    Scene_Battle.prototype.onItemCancel = function () {
        if (changeUpdateTiming) {
            this._itemWindow.hide2();//
            this._actorCommandWindow.activate();
        } else {
            _Scene_Battle_onItemCancel.call(this);
        }
	};

    var _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
    Scene_Battle.prototype.onSelectAction = function () {
        if (changeUpdateTiming) {
            var action = BattleManager.inputtingAction();
            if (!action.needsSelection()) {
                this._skillWindow.hide2();
                this._itemWindow.hide2();
                this.selectNextCommand();
            } else if (action.isForOpponent()) {
                this._skillWindow.hide();
                this._itemWindow.hide();
                this.selectEnemySelection();
            } else {
                this._skillWindow.hide();
                this._itemWindow.hide();
                this.selectActorSelection();
            }
        } else {
            _Scene_Battle_onSelectAction.call(this);
        }
		
	};


    var _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function () {
        if (changeUpdateTiming) {
            Window_izBattleHelp.prototype.clear = function () {
                this.setText('');
            };

            var action = BattleManager.inputtingAction();
            action.setTarget(this._actorWindow.index());
            this._actorWindow.hide();
            this._skillWindow.hide2();
            this._itemWindow.hide2();
            this.selectNextCommand();

            Window_izBattleHelp.prototype.clear = function () {
                //this.setText('');
            };
        } else {
            _Scene_Battle_onActorOk.call(this);
        }        	
	};


    var _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function () {
        if (changeUpdateTiming) {
            Window_izBattleHelp.prototype.clear = function () {
                this.setText('');
            };

            var action = BattleManager.inputtingAction();
            action.setTarget(this._enemyWindow.enemyIndex());
            this._enemyWindow.hide();
            this._skillWindow.hide2();
            this._itemWindow.hide2();
            this.selectNextCommand();

            Window_izBattleHelp.prototype.clear = function () {
                //this.setText('');
            };
        } else {
            _Scene_Battle_onEnemyOk.call(this);
        }
	};

	function Window_izBattleHelp() {
		this.initialize.apply(this, arguments);
	}

	Window_izBattleHelp.prototype = Object.create(Window_Help.prototype);
	Window_izBattleHelp.prototype.constructor = Window_izBattleHelp;

	Window_izBattleHelp.prototype.initialize = function (numLines) {
	    var width = Graphics.boxWidth;
	    var height = this.fittingHeight(helpVisibleRaws);
	    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	    this._text = '';
	};

	Window_izBattleHelp.prototype.setItem = function(item) {
		var helpText = '';
		if(helpStyle != '' && item){
			var helpText = helpStyle;
			helpText = helpText.replace(/_icon/g, item.iconIndex); 
			helpText = helpText.replace(/_name/g, item.name);
            helpText.replace(/\n/, /\\n/);
            var descs = item.description ? item.description.split(/\n|\\n/) : [];

            for (i = 0; i < descs.length; i++) {
                if (descs[i] == "\\n") {
                    descs.slice(i, 1);
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


	/*
	 Window_izBattleHelp.prototype.lineHeight = function () {
		return 36;
	};

	Window_izBattleHelp.prototype.processNewLine = function (textState) {
		textState.x = textState.left;
		textState.y += textState.height + 10;//
		textState.height = this.calcTextHeight(textState, false);
		 textState.index++;
	};
	*/

 })();