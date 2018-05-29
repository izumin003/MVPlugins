//=============================================================================
// IZ_HelpWindow
//
// ----------------------------------------------------------------------------
// Copyright (c) 2018 IZ
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version 1.2.1 2018/3/12
// 
//
// ■更新履歴
// 1.2.1  2018/5/20　公開にあたり微調整。 
// 1.2.0  2018/3/12　ヘルプの表示内容をデフォルトに戻したときに生じていた不具合を修正。
// 1.1.0  2018/3/10  各シーンにつきヘルプスタイルを2パターンまで登録できるように変更。
// 1.0.0  2018/3/9   初版作成。
// 
//
//=============================================================================
/*:
* @plugindesc v1.2.1 ヘルプウィンドウの行数や表示形式をカスタマイズします。
*
* @author いず
*
* @param ---ItemHelpStyle---
* @default
*
* @param ItemHelpVisibleRaws
* @desc アイテムヘルプウィンドウを何行表示にするか
* @default 2
* @type number
* @min 0
* @parent ---ItemHelpStyle---
*
* @param ItemHelp
* @desc アイテムのヘルプをどのような形式で表示するか。
* _icon:アイコンid _name:名前 _desc〇:解説〇行目 \n:改行
* @default \I[_icon]_name：_desc1\n_desc2
* @parent ---ItemHelpStyle---
*
* @param ItemHelp2
* @desc アイテムのヘルプの2パターン目。
* データベースのメモ欄に<HS:ItemHelp2>と記入してください。
* @default \I[_icon]_name：_desc1\n_desc2
* @parent ---ItemHelpStyle---
*
* @param ---EquipmentHelpStyle---
* @default
*
* @param EquipmentHelpVisibleRaws
* @desc 装備ヘルプウィンドウを何行表示にするか
* @default 2
* @type number
* @min 0
* @parent ---EquipmentHelpStyle---
*
* @param EquipmentHelp
* @desc 装備のヘルプをどのような形式で表示するか。
* _icon:アイコンid _name:名前 _desc〇:解説〇行目 \n:改行
* @default \I[_icon]_name：_desc1\n_desc2
* @parent ---EquipmentHelpStyle---
*
* @param EquipmentHelp2
* @desc 装備のヘルプの2パターン目。
* データベースのメモ欄に<HS:EquipmentHelp2>と記入してください。
* @default \I[_icon]_name：_desc1\n_desc2
* @parent ---EquipmentHelpStyle---
*
* @param ---SkillHelpStyle---
* @default
*
* @param SkillHelpVisibleRaws
* @desc スキルヘルプウィンドウを何行表示にするか
* @default 2
* @type number
* @min 0
* @parent ---SkillHelpStyle---
*
* @param SkillHelp
* @desc スキルのヘルプをどのような形式で表示するか。
* _icon:アイコンid _name:名前 _desc〇:解説〇行目 \n:改行
* @default \I[_icon]_name：_desc1\n_desc2
* @parent ---SkillHelpStyle---
*
* @param SkillHelp2
* @desc スキルのヘルプの2パターン目。
* データベースのメモ欄に<HS:SkillHelp2>と記入してください。
* @default \I[_icon]_name：_desc1\n_desc2
* @parent ---SkillHelpStyle---
*
* @param ---ShopHelpStyle---
* @default
*
* @param ShopHelpVisibleRaws
* @desc ショップのヘルプウィンドウを何行表示にするか
* @default 2
* @type number
* @min 0
* @parent ---ShopHelpStyle---
*
* @param ShopHelp
* @desc ショップのヘルプをどのような形式で表示するか。
* データベースのメモ欄に<HS:ShopHelp2>と記入してください。
* @default \I[_icon]_name：_desc1\n_desc2
* @parent ---ShopHelpStyle---
*
* @param ShopHelp2
* @desc ショップのヘルプの2パターン目。
* データベースのメモ欄に<HS:ShopHelp2>と記入してください。
* @default \I[_icon]_name：_desc1\n_desc2
* @parent ---ShopHelpStyle---
*
* @help v1.1 ヘルプウィンドウの行数や表示形式をカスタマイズします。
* 
* 
* １．プラグインパラメータ "helpStyle" では、
* 　　エディタのメッセージウィンドウと同じ制御文字を用いて
* 　　表示されるヘルプの文字の大きさ・色などを制御できます。
*   　空欄にするとデフォルト通りの挙動になります。
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
* 　　（現在6行目まで対応）
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
* 　　
*
*/

(function () {
	
	'use strict'
	var pluginName = 'IZ_HelpWindow';
	var parameters = PluginManager.parameters(pluginName);
	var ItemHelpVisibleRaws = Number(parameters['ItemHelpVisibleRaws'] || 2);
    var ItemHelp = parameters['ItemHelp'] || '';
    var ItemHelp2 = parameters['ItemHelp2'] || '';
    var EquipmentHelpVisibleRaws = Number(parameters['EquipmentHelpVisibleRaws'] || 2);
    var EquipmentHelp = parameters['EquipmentHelp'] || '';
    var EquipmentHelp2 = parameters['EquipmentHelp2'] || '';
    var SkillHelpVisibleRaws = Number(parameters['SkillHelpVisibleRaws'] || 2);
    var SkillHelp = parameters['SkillHelp'] || '';
    var SkillHelp2 = parameters['SkillHelp2'] || '';
    var ShopHelpVisibleRaws = Number(parameters['ShopHelpVisibleRaws'] || 2);
    var ShopHelp = parameters['ShopHelp'] || '';
    var ShopHelp2 = parameters['ShopHelp2'] || '';


    
    var _Window_Help_initialize = Window_Help.prototype.initialize;
    Window_Help.prototype.initialize = function (numLines) {

        //シーンによって場合分け
        if (SceneManager._scene.constructor === Scene_Item) {
            //Scene_Item
            var width = Graphics.boxWidth;
            var height = this.fittingHeight(ItemHelpVisibleRaws);
            Window_Base.prototype.initialize.call(this, 0, 0, width, height);
            this._text = '';
        } else if (SceneManager._scene.constructor === Scene_Equip) {
            //Scene_Equip
            var width = Graphics.boxWidth;
            var height = this.fittingHeight(EquipmentHelpVisibleRaws);
            Window_Base.prototype.initialize.call(this, 0, 0, width, height);
            this._text = '';
        } else if (SceneManager._scene.constructor === Scene_Skill) {
            //Scene_Skill
            var width = Graphics.boxWidth;
            var height = this.fittingHeight(SkillHelpVisibleRaws);
            Window_Base.prototype.initialize.call(this, 0, 0, width, height);
            this._text = '';
        } else if (SceneManager._scene.constructor === Scene_Shop) {
            //Scene_Shop
            var width = Graphics.boxWidth;
            var height = this.fittingHeight(ShopHelpVisibleRaws);
            Window_Base.prototype.initialize.call(this, 0, 0, width, height);
            this._text = '';
        } else {
            //OtherScenes->default
            _Window_Help_initialize.call(this, numLines);
        }

	};


    var _Window_Help_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function (item) {

        var helpText = '';
        var DEFAULT = true; //trueの場合、デフォルト通りの動作

        //デフォルトor書式変更判定
        if (SceneManager._scene.constructor === Scene_Item && item) {
            if (item.meta.HS === 'ItemHelp2') {
                if (ItemHelp2 != '') {
                    var helpText = ItemHelp2;
                    DEFAULT = false;
                }
            } else if (ItemHelp != '') {
                var helpText = ItemHelp;
                DEFAULT = false;
            }
        } else if (SceneManager._scene.constructor === Scene_Equip && EquipmentHelp != '' && item) {
            if (item.meta.HS === 'EquipmentHelp2') {
                if (EquipmentHelp2 != '') {
                    var helpText = EquipmentHelp2;
                    DEFAULT = false;
                }
            } else if (EquipmentHelp != '') {
                var helpText = EquipmentHelp;
                DEFAULT = false;
            }
        } else if (SceneManager._scene.constructor === Scene_Skill && SkillHelp != '' && item) {
            if (item.meta.HS === 'SkillHelp2') {
                if (SkillHelp2 != '') {
                    var helpText = SkillHelp2;
                    DEFAULT = false;
                } 
            } else if (SkillHelp != '') {
                var helpText = SkillHelp;
                DEFAULT = false;
            }
        } else if (SceneManager._scene.constructor === Scene_Shop && ShopHelp != '' && item) {
            if (item.meta.HS === 'ShopHelp2') {
                if (ItemHelp2 != '') {
                    var helpText = ShopHelp2;
                    DEFAULT = false;
                }
            } else if (ShopHelp != '') {
                var helpText = ShopHelp;
                DEFAULT = false;
            }
        }

        if (DEFAULT == false) {
            //書式を変更する場合
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

            this.setText(helpText);

        } else {
            //デフォルトの場合
            _Window_Help_setItem.call(this, item);
        }
    };

 })();