//=============================================================================
// IZ_BlockGameOver
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.0beta 全滅してもゲームオーバー処理を呼び出さないようにします。
* @author いず
* @help 
*・全滅してもゲームオーバー処理を呼び出さないようにします。
*
*・マップシーンと戦闘シーンで個別に設定することができます。
*
*
* @param blockOnMap
* @desc マップ画面でゲームオーバーを禁止する：true　禁止しない：false
* @default true
*
* @param blockInBattle
* @desc 戦闘画面でゲームオーバーを禁止する：true　禁止しない：false
* @default true
*
*
*/


(function () {

    //
    //■パラメーター
    //
    var parameters = PluginManager.parameters('IZ_BlockGameOver');
    var blockOnMap = String(parameters['blockOnMap']);
    var blockInBattle = String(parameters['blockInBattle']);
   
    //
    //■マップ画面
    //
    var _Scene_Map_updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function () {
        if (!blockOnMap) {
            this.checkGameover();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateTransferPlayer();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateEncounter();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateCallMenu();
        }
        if (!SceneManager.isSceneChanging()) {
            this.updateCallDebug();
        }
    };

    //
    //■アイテム画面・スキル画面
    //
    var _Scene_ItemBase_useItem = Scene_ItemBase.prototype.useItem;
    Scene_ItemBase.prototype.useItem = function () {
        this.playSeForItem();
        this.user().useItem(this.item());
        this.applyItem();
        this.checkCommonEvent();
        if (!blockOnMap) {
            this.checkGameover();
        }
        this._actorWindow.refresh();
    };

    //
    //■戦闘画面
    //
    var _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function () {
        if (this.isBattleTest()) {
            AudioManager.stopBgm();
            SceneManager.exit();
        } else if (!this._escaped && $gameParty.isAllDead()) {
            if (this._canLose) {
                $gameParty.reviveBattleMembers();
                SceneManager.pop();
            } else {
                if (blockInBattle) {
                    SceneManager.pop();
                } else {
                    SceneManager.goto(Scene_Gameover);
                }
            }
        } else {
            SceneManager.pop();
        }
        this._phase = null;
    };
    
})();