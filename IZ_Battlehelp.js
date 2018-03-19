//=============================================================================
// IZ_BattleHelp
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.0 バトルシーンにおけるヘルプウィンドウの更新タイミングを変更します。
* YEP_BattleEngineCoreのSelectHelpWindowをfalseにして使用して下さい。
*
* @author いず
* @help スキル/アイテム選択後、対象選択画面までヘルプウィンドウの内容が保持されます。
* スキル/アイテムの内容を確認しながら効果対象を選択することができます。
* YEP_BattleEngineCoreと併用する際は、
* このプラグインを下にセットした上で
* YEP_BattleEngineCoreのパラメータ；Select Help Window を false にしてください。
* 
*/

Scene_Battle.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(this.fadeSpeed(), false);
    BattleManager.playBattleBgm();
    BattleManager.startBattle();

    //
    Window_Help.prototype.clear = function () {
        //this.setText('');
    };
    //
};

Scene_Battle.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    $gameParty.onBattleEnd();
    $gameTroop.onBattleEnd();
    AudioManager.stopMe();

    //
    Window_Help.prototype.clear = function () {
        this.setText('');
    };
    //
};



Window_BattleSkill.prototype.hide = function () {
    //this.hideHelpWindow();
    Window_SkillList.prototype.hide.call(this);
};

Window_BattleSkill.prototype.hide2 = function () {
    this.hideHelpWindow();
    Window_SkillList.prototype.hide.call(this);
};

Window_BattleItem.prototype.hide = function () {
    //this.hideHelpWindow();
    Window_ItemList.prototype.hide.call(this);
};

Window_BattleItem.prototype.hide2 = function () {
    this.hideHelpWindow();
    Window_ItemList.prototype.hide.call(this);
};


Scene_Battle.prototype.onSkillCancel = function () {

    this._skillWindow.hide2();//
    this._actorCommandWindow.activate();

};

Scene_Battle.prototype.onItemCancel = function () {
    this._itemWindow.hide2();//
    this._actorCommandWindow.activate();    
};

Scene_Battle.prototype.onSelectAction = function () {
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
};



Scene_Battle.prototype.onActorOk = function () {

    Window_Help.prototype.clear = function () {
        this.setText('');
    };

    var action = BattleManager.inputtingAction();
    action.setTarget(this._actorWindow.index());
    this._actorWindow.hide();
    this._skillWindow.hide2();
    this._itemWindow.hide2();
    this.selectNextCommand();

    Window_Help.prototype.clear = function () {
        //this.setText('');
    };
};


Scene_Battle.prototype.onEnemyOk = function () {

    Window_Help.prototype.clear = function () {
        this.setText('');
    };

    var action = BattleManager.inputtingAction();
    action.setTarget(this._enemyWindow.enemyIndex());
    this._enemyWindow.hide();
    this._skillWindow.hide2();
    this._itemWindow.hide2();
    this.selectNextCommand();

    Window_Help.prototype.clear = function () {
        //this.setText('');
    };

};


 Window_Help.prototype.lineHeight = function () {
    return 36;
 };

 Window_Help.prototype.processNewLine = function (textState) {
     textState.x = textState.left;
     textState.y += textState.height + 10;//
     textState.height = this.calcTextHeight(textState, false);
     textState.index++;
 };