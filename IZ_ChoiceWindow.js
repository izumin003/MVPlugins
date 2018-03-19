//=============================================================================
// IZ_ChoiceWindow
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.0 選択肢ウィンドウをスマホ操作に最適化します。
* 
* @author いず
* @help 
*・選択肢ウィンドウを横長に表示して、スマホの縦持ち操作に最適化します。 
*・エディタの選択肢ウィンドウ表示位置の設定で、
*　ウィンドウの位置の設定の代わりに選択肢の列数を選択するようにします。
*
* 位置    行数
* 左      2
* 中      1
* 右      3
*
*/


(function () {
   

    //-----------------------------------------------------------------------------
    // Window_ChoiceList
    //
    // The window used for the event command [Show Choices].


    //
    //■選択肢ウィンドウの場所を変更する機能を列数変更機能に書き換え
    //
    var _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function () {
        var positionType = $gameMessage.choicePositionType();
        var messageY = this._messageWindow.y;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        switch (positionType) {
            case 0:
                this.x = 0;
                Window_ChoiceList.prototype.maxCols = function () {
                    return 2;
                };
                break;
            case 1:
                this.x = (Graphics.boxWidth - this.width) / 2;
                Window_ChoiceList.prototype.maxCols = function () {
                    return 1;
                };
                break;
            case 2:
                this.x = Graphics.boxWidth - this.width;
                Window_ChoiceList.prototype.maxCols = function () {
                    return 3;
                };
                break;
        }
        if (messageY >= Graphics.boxHeight / 2) {
            this.y = messageY - this.height;
        } else {
            this.y = messageY + this._messageWindow.height;
        }

    };

    //
    //■ウィンドウ幅を画面幅に合わせる
    //
    Window_ChoiceList.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };


    //
    //■行数の調整
    //
    Window_ChoiceList.prototype.numVisibleRows = function () {
        var messageY = this._messageWindow.y;
        var messageHeight = this._messageWindow.height;
        var centerY = Graphics.boxHeight / 2;
        var choices = $gameMessage.choices();

        var positionType = $gameMessage.choicePositionType();

        switch (positionType) {
            case 0:
                var numLines = Math.ceil(choices.length / 2);
                break;
            case 1:
                var numLines = choices.length;
                break;
            case 2:
                var numLines = Math.ceil(choices.length / 3);
                break;
        }

        var maxLines = 8;
        if (messageY < centerY && messageY + messageHeight > centerY) {
            maxLines = 4;
        }
        if (numLines > maxLines) {
            numLines = maxLines;
        }
        return numLines;
    };


    //
    //■１つの選択肢に表示できる文字数の調整
    //　（上手いやり方がわからないので暫定的に最大240pxにしておく）
    //
    Window_ChoiceList.prototype.maxChoiceWidth = function () {
        var maxWidth = 240;//表示できる文章の最大長さ（px）
        var choices = $gameMessage.choices();
        for (var i = 0; i < choices.length; i++) {
            var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
            if (maxWidth < choiceWidth) {
                maxWidth = choiceWidth;
            }
        }
        return maxWidth;
    };


})();