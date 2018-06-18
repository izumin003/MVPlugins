//=============================================================================
// IZ_ChangeBalloonPos.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 IZ
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version 1.0.0 2018/6/16
// 
//
// ■更新履歴
// 1.0.0 2018/6/16　・リリース
//
//=============================================================================

/*:
 * @plugindesc 特定のマップイベントのみ、吹き出しの表示位置を変更します。
 * 吹き出し位置を変更する場合は、マップイベントのメモ欄に特定のタグを記入します。
 * @author いず
 *
 *
 * @param == BalloonPos1 ==
 * @desc 
 * @type number
 * @default 
 *
 * @param X1
 * @desc 吹き出し位置X座標
 * default : 0（中央軸上）数値が大きいほど右 
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @decimals 2
 * @parent == BalloonPos1 ==
 *
 * @param Y1
 * @desc 吹き出し位置Y座標
 * default : 1（イベント頭上）数値が大きいほど上
 * @type number
 * @min -9999
 * @max 9999
 * @default 1
 * @decimals 2
 * @parent == BalloonPos1 ==
 *
 *
 * @param == BalloonPos2 ==
 * @desc
 * @type number
 * @default
 *
 * @param X2
 * @desc 吹き出し位置X座標
 * default : 0（中央軸上）数値が大きいほど右
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @decimals 2
 * @parent == BalloonPos2 ==
 *
 * @param Y2
 * @desc 吹き出し位置Y座標
 * default : 1（イベント頭上）数値が大きいほど上
 * @type number
 * @min -9999
 * @max 9999
 * @default 1
 * @decimals 2
 * @parent == BalloonPos2 ==
 *
 * @param == BalloonPos3 ==
 * @desc
 * @type number
 * @default
 *
 * @param X3
 * @desc 吹き出し位置X座標
 * default : 0（中央軸上）数値が大きいほど右
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @decimals 2
 * @parent == BalloonPos3 ==
 *
 * @param Y3
 * @desc 吹き出し位置Y座標
 * default : 1（イベント頭上）数値が大きいほど上
 * @type number
 * @min -9999
 * @max 9999
 * @default 1
 * @decimals 2
 * @parent == BalloonPos3 ==
 *
 * @help マップイベントに表示する吹き出しの位置を変更します。
 * 吹き出し位置を変更したいマップイベントのメモ欄に
 * 下記のタグを記入してください。
 * 吹き出し位置は、デフォルトのものを含め4種類設定できます。 
 *
 *
 * ■タグ一覧
 * ・(タグなし)：デフォルト、イベント頭上、中央軸上
 * ・<balloonPos1> : ユーザー設定１
 * ・<balloonPos2> : ユーザー設定２
 * ・<balloonPos3> : ユーザー設定３
 *
 * ■プラグインパラメータの数値について
 * ・吹き出しの位置は、次のように制御されます。
 * 　〇 X座標
 * 　　 = キャラクター中心軸 + キャラクターの横幅 × (X1 or X2 or X3)
 * 　〇 Y座標
 * 　　 = キャラクター足元 - キャラクターの縦長さ × (Y1 or Y2 or Y3)
 */

(function () {

    'use strict'

    //■プラグインパラメータ
    var parameters = PluginManager.parameters('IZ_ChangeBalloonPos');

    var balloonPosX1 = Number(parameters['X1'] || 0);
    var balloonPosY1 = Number(parameters['Y1'] || 1);
    var balloonPosX2 = Number(parameters['X2'] || 0);
    var balloonPosY2 = Number(parameters['Y2'] || 1);
    var balloonPosX3 = Number(parameters['X3'] || 0);
    var balloonPosY3 = Number(parameters['Y3'] || 1);

    //==============================
    // * Sprite__updateBalloon
    //==============================
    Sprite_Character.prototype.updateBalloon = function () {
        this.setupBalloon();
        if (this._balloonSprite) {
            var eventId = this._character._eventId;
            if (eventId && eventId > 0) {
                if ($dataMap.events[eventId].note.match(/<(?:balloonPos1)>/i)) {
                    this._balloonSprite.x = this.x + this.width * balloonPosX1;
                    this._balloonSprite.y = this.y - this.height * balloonPosY1;
                } else if ($dataMap.events[eventId].note.match(/<(?:balloonPos2)>/i)) {
                    this._balloonSprite.x = this.x + this.width * balloonPosX2;
                    this._balloonSprite.y = this.y - this.height * balloonPosY2;
                } else if ($dataMap.events[eventId].note.match(/<(?:balloonPos3)>/i)) {
                    this._balloonSprite.x = this.x + this.width * balloonPosX3;
                    this._balloonSprite.y = this.y - this.height * balloonPosY3;
                } else {
                    this._balloonSprite.x = this.x;
                    this._balloonSprite.y = this.y - this.height;
                }
            } else {
                this._balloonSprite.x = this.x;
                this._balloonSprite.y = this.y - this.height;
            }
            
            if (!this._balloonSprite.isPlaying()) {
                this.endBalloon();
            }
        }
    };

})();