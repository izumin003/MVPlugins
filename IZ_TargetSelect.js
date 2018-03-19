//=============================================================================
// IZ_TargetSelect
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.0 バトルシーンにおいて、効果対象が全体/ランダムな
スキル/アイテムでも、効果対象選択ウィンドウを表示するようにします。
* @author いず
* @help 
* 
*/

(function () {
    /*
    ▼　使いそうなもの　▼

    Window_BattleActor.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._index = -1;
        this._cursorFixed = false;
        this._cursorAll = false;
        this._stayCount = 0;
        this._helpWindow = null;
        this._handlers = {};
        this._touching = false;
        this._scrollX = 0;
        this._scrollY = 0;
        this.deactivate();
    };


    Window_BattleEnemy.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._index = -1;
        this._cursorFixed = false;
        this._cursorAll = false;
        this._stayCount = 0;
        this._helpWindow = null;
        this._handlers = {};
        this._touching = false;
        this._scrollX = 0;
        this._scrollY = 0;
        this.deactivate();
    };

    Window_BattleActor.prototype.cursorAll = function() {
    return this._cursorAll;
    };

    Window_BattleEnemy.prototype.cursorAll = function() {
    return this._cursorAll;
    };

    */

    var _Scene_Battle_onSelectAction = Scene_Battle.prototype.onSelectAction;
    Scene_Battle.prototype.onSelectAction = function () {
        var action = BattleManager.inputtingAction();
        this._skillWindow.hide();
        this._itemWindow.hide();
        if (!action.needsSelection()) {

            if (action.isForOpponent()) {
                Window_BattleEnemy.prototype.setCursorAll(true);
                this.selectEnemySelection();
            } else {
                Window_BattleActor.prototype.setCursorAll(true);
                this.selectActorSelection();
            }
        } else if (action.isForOpponent()) {
            Window_BattleEnemy.prototype.setCursorAll(false);
            this.selectEnemySelection();
        } else {
            Window_BattleActor.prototype.setCursorAll(false);
            this.selectActorSelection();
        }
    };

})();