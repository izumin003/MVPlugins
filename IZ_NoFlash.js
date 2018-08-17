//=============================================================================
// IZ_NoFlash.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 IZ
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0 2018/8/17
//=============================================================================

/*:
 * @plugindesc 動作負荷が大きいフラッシュ処理を無効化します。
 * @author いず
 *
 * @help 画面やキャラクターのフラッシュ処理を呼び出さないようにします。
 * ブラウザゲームとしてアップロードするときだけ有効にする、といった
 * 使い方を想定しています。
 *
 * このプラグインにはプラグインパラメータおよび、プラグインコマンドはありません。
 *
 */

(function () {

    'use strict'
    var pluginName = 'IZ_NoFlash';


    //==============================
    // * GameObject__flash
    //==============================
    Game_Screen.prototype.startFlash = function (color, duration) {
        /*
        this._flashColor = color.clone();
        this._flashDuration = duration;
        */
    };

    Game_Screen.prototype.updateFlash = function () {
        /*
        if (this._flashDuration > 0) {
            var d = this._flashDuration;
            this._flashColor[3] *= (d - 1) / d;
            this._flashDuration--;
        }
        */
    };

    Game_Screen.prototype.startFlashForDamage = function () {
        //this.startFlash([255, 0, 0, 128], 8);
    };

    Game_Interpreter.prototype.command224 = function () {
        /*
        $gameScreen.startFlash(this._params[0], this._params[1]);
        if (this._params[2]) {
            this.wait(this._params[1]);
        }*/
        return true;
    };


    //==============================
    // * GameSprite__flash
    //==============================
    Sprite_Animation.prototype.updateFlash = function () {
        /*
        if (this._flashDuration > 0) {
            var d = this._flashDuration--;
            this._flashColor[3] *= (d - 1) / d;
            this._target.setBlendColor(this._flashColor);
        }*/
    };

    Sprite_Animation.prototype.updateScreenFlash = function () {
        /*
        if (this._screenFlashDuration > 0) {
            var d = this._screenFlashDuration--;
            if (this._screenFlashSprite) {
                this._screenFlashSprite.x = -this.absoluteX();
                this._screenFlashSprite.y = -this.absoluteY();
                this._screenFlashSprite.opacity *= (d - 1) / d;
                this._screenFlashSprite.visible = (this._screenFlashDuration > 0);
            }
        }*/
    };

    Sprite_Animation.prototype.createScreenFlashSprite = function () {
        /*
        this._screenFlashSprite = new ScreenSprite();
        this.addChild(this._screenFlashSprite);
        */
    };

    Sprite_Animation.prototype.startFlash = function (color, duration) {
        //this._flashColor = color.clone();
        //this._flashDuration = duration;
    };

    Sprite_Animation.prototype.startScreenFlash = function (color, duration) {
        /*
        this._screenFlashDuration = duration;
        if (this._screenFlashSprite) {
            this._screenFlashSprite.setColor(color[0], color[1], color[2]);
            this._screenFlashSprite.opacity = color[3];
        }*/
    };


})();
