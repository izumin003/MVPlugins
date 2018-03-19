//=============================================================================
// IZ_HideParameters
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.0 すべてのシーンにおけるHP、MP、TPなどの表示・非表示を切り替えることができます。
* @author いず
* @help 
*・すべてのシーンにおけるレベル、ステート、HP、MP、TP、お金、経験値、
*　攻撃力、防御力、魔法力、魔法防御、敏捷性、運の表示・非表示を切り替えることができます。
*
*・プラグインパラメーターを1にすると表示、0にすると非表示になります。
*
*
* @param showLevel
* @desc レベルを表示する：1　表示しない：0
* @default 1
*
* @param showStates
* @desc ステートアイコンを表示する：1　表示しない：0
* @default 1
*
* @param showHP
* @desc HPを表示する：1　表示しない：0
* @default 1
*
* @param showMP
* @desc MPを表示する：1　表示しない：0
* @default 1
*
* @param showTP
* @desc TPを表示する：1　表示しない：0
* @default 1
*
* @param showGold
* @desc お金を表示する：1　表示しない：0
* @default 1
*
* @param showGoldWindow
* @desc 所持金ウィンドウを表示する：1　表示しない：0
* ウィンドウを消した場合、所持金も表示されなくなります。
* @default 1
*
* @param showExp
* @desc 経験値を表示する：1　表示しない：0
* @default 1
*
* @param showAtk
* @desc 攻撃力を表示する：1　表示しない：0
* @default 1
*
* @param showDef
* @desc 防御力を表示する：1　表示しない：0
* @default 1
*
* @param showMat
* @desc 魔法力を表示する：1　表示しない：0
* @default 1
*
* @param showMdf
* @desc 魔法防御を表示する：1　表示しない：0
* @default 1
*
* @param showAgi
* @desc 敏捷性を表示する：1　表示しない：0
* @default 1
*
* @param showLuck
* @desc 運を表示する：1　表示しない：0
* @default 1
*
*/


(function () {

    //
    //■パラメーター
    //
    var parameters = PluginManager.parameters('IZ_HideParameters');
    var showLevel = parseInt(String(parameters['showLevel']), 10) != 0;
    var showStates = parseInt(String(parameters['showStates']), 10) != 0;
    var showHP = parseInt(String(parameters['showHP']), 10) != 0;
    var showMP = parseInt(String(parameters['showMP']), 10) != 0;
    var showTP = parseInt(String(parameters['showTP']), 10) != 0;
    var showGold = parseInt(String(parameters['showGold']), 10) != 0;
    var showGoldWindow = parseInt(String(parameters['showGoldWindow']), 10) != 0;
    var showExp = parseInt(String(parameters['showExp']), 10) != 0;
    var showAtk = parseInt(String(parameters['showAtk']), 10) != 0;
    var showDef = parseInt(String(parameters['showDef']), 10) != 0;
    var showMat = parseInt(String(parameters['showMat']), 10) != 0;
    var showMdf = parseInt(String(parameters['showMdf']), 10) != 0;
    var showAgi = parseInt(String(parameters['showAgi']), 10) != 0;
    var showLuck = parseInt(String(parameters['showLuck']), 10) != 0;
   
    //
    //■レベルの表示／非表示
    //
    if (!showLevel) {
        Window_Base.prototype.drawActorLevel = function (actor, x, y) { };
    }

    //
    //■ステートの表示／非表示
    //
    if (!showStates) {
        Window_Base.prototype.drawActorIcons = function (actor, x, y, width) { };
    }

    //
    //■HPの表示／非表示
    //
    if (!showHP) {
        Window_Base.prototype.drawActorHp = function (actor, x, y, width) { };
    }

    //
    //■MPの表示／非表示
    //
    if (!showMP) {
        Window_Base.prototype.drawActorMp = function (actor, x, y, width) { };
    }

    //
    //■TPの表示／非表示
    //
    if (!showTP) {
        Window_Base.prototype.drawActorTp = function (actor, x, y, width) { };
    }

    //
    //■drawActorSimpleStatusの変更
    //
    var _Window_Base_drawActorSimpleStatus = Window_Base.prototype.drawActorSimpleStatus;
    Window_Base.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
        var lineHeight = this.lineHeight();
        var x2 = x + 180;
        var width2 = Math.min(200, width - 180 - this.textPadding());
        var a = 1;
        this.drawActorName(actor, x, y);
        if (showLevel) {
            this.drawActorLevel(actor, x, y + lineHeight * a);
            a += 1
        }
        if (showStates) {
            this.drawActorIcons(actor, x, y + lineHeight * a);
        }
        a = 1;
        this.drawActorClass(actor, x2, y);
        if (showHP) {
            this.drawActorHp(actor, x2, y + lineHeight * a, width2);
            a += 1;
        }
        if (showMP) {
            this.drawActorMp(actor, x2, y + lineHeight * a, width2);
        }
    };


    //
    //■WindowBattleStatusの変更
    //
    var _Window_BattleStatus_drawGaugeAreaWithTp = Window_BattleStatus.prototype.drawGaugeAreaWithTp;
    Window_BattleStatus.prototype.drawGaugeAreaWithTp = function (rect, actor) {
        var j = 0;
        if (showHP) {
            this.drawActorHp(actor, rect.x + 0, rect.y, 108);
            j += 1;
        }
        if (showMP) {
            if (j == 0) {
                this.drawActorMp(actor, rect.x + 0, rect.y, 96);
            } else {
                this.drawActorMp(actor, rect.x + 123, rect.y, 96);
            }
            j += 1;
        }
        if (showTP) {
            if (j == 0) {
                this.drawActorTp(actor, rect.x + 0, rect.y, 96);
            } else if (j == 1) {
                this.drawActorTp(actor, rect.x + 123, rect.y, 96);
            } else {
                this.drawActorTp(actor, rect.x + 234, rect.y, 96);
            }
        }
        
        
    };

    var _Window_BattleStatus_drawGaugeAreaWithoutTp = Window_BattleStatus.prototype.drawGaugeAreaWithoutTp;
    Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function (rect, actor) {
        var j = 0;
        if (showHP) {
            this.drawActorHp(actor, rect.x + 0, rect.y, 201);
            j += 1;
        }
        if (showMP) {
            if (j == 0) {
                this.drawActorMp(actor, rect.x + 0, rect.y, 201);
            } else {
                this.drawActorMp(actor, rect.x + 216, rect.y, 201);
            }
        }        
    };


    //
    //■所持金の表示／非表示
    //
    if (!showGold) {
        Window_Base.prototype.drawCurrencyValue = function (value, unit, x, y, width) { };
    }

    //
    //■所持金ウィンドウの表示／非表示
    //
    var _Window_Gold_initialize = Window_Gold.prototype.initialize;
    Window_Gold.prototype.initialize = function (x, y) {
        if (showGoldWindow) {
            var width = this.windowWidth();
            var height = this.windowHeight();
        } else {
            var width = 0;
            var height = 0;
        }
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    //
    //■ショップ画面における金額の表示／非表示
    //
    
    if (!showGold) {

        Window_ShopBuy.prototype.drawItem = function (index) {
            var item = this._data[index];
            var rect = this.itemRect(index);
            var priceWidth = 96;
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
            //this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
            this.changePaintOpacity(true);
        };

        Window_ShopNumber.prototype.initialize = function (x, y, height) {
            var width = this.windowWidth();
            Window_Selectable.prototype.initialize.call(this, x, y, width, height);
            this._item = null;
            this._max = 1;
            //this._price = 0;
            this._number = 1;
            //this._currencyUnit = TextManager.currencyUnit;
            this.createButtons();
        };

        Window_ShopNumber.prototype.drawTotalPrice = function () { };

    }
    

    //
    //■経験値の表示／非表示
    //
    if (!showExp) {
        Window_Status.prototype.drawExpInfo = function (x, y) { };
    }

    //
    //■最大HP・最大MP・攻撃力・防御力・魔法力・魔法防御・敏捷性・運の表示／非表示
    //
    var _Window_Status_drawParameters = Window_Status.prototype.drawParameters;
    Window_Status.prototype.drawParameters = function (x, y) {
        var j = 0;
        var lineHeight = this.lineHeight();
        for (var i = 0; i < 6; i++) {
            var paramId = i + 2;
            var showParam = false;
            if (i == 0 && showAtk) { showParam = true; }
            else if (i == 1 && showDef) { showParam = true; }
            else if (i == 2 && showMat) { showParam = true; }
            else if (i == 3 && showMdf) { showParam = true; }
            else if (i == 4 && showAgi) { showParam = true; }
            else if (i == 5 && showLuck) { showParam = true; }
            if (showParam) {
                var y2 = y + lineHeight * j;
                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.param(paramId), x, y2, 160);
                this.resetTextColor();
                this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');
                j += 1;
            }
        }
    };

    var _Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
    Window_EquipStatus.prototype.refresh = function () {
        this.contents.clear();
        var j = 0;
        if (this._actor) {
            this.drawActorName(this._actor, this.textPadding(), 0);
            for (var i = 0; i < 6; i++) {
                var showParam = false;
                if (i == 0 && showAtk) { showParam = true; }
                else if (i == 1 && showDef) { showParam = true; }
                else if (i == 2 && showMat) { showParam = true; }
                else if (i == 3 && showMdf) { showParam = true; }
                else if (i == 4 && showAgi) { showParam = true; }
                else if (i == 5 && showLuck) { showParam = true; }
                if (showParam) {
                    this.drawItem(0, this.lineHeight() * (1 + j), 2 + i);
                    j += 1;
                }
            }
        }
    };

})();