//=============================================================================
// IZ_DamageCalc.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 IZ
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.1.0β 2017/10/12
//=============================================================================

/*:
 * @plugindesc ダメージ計算の方法を変更します。
 * １，２ダメージなどの小さな数字だけを使うゲームに使用してください。
 * @author いず
 *
 * @param grdEffectValue
 * @desc 防御時に減らすダメージ
 * ■0：割合で増減  ■その他の数値：指定した数字ずつ増減
 * @default 1
 * @type number
 *
 * @param absorptionNumber
 * @desc 属性有効度をabsorptionNumberの値に設定すると、
 * その属性の攻撃を吸収する。
 * @default 1000
 * @type number
 * @min 0
 * @max 1000
 *
 * @param noEffectNumber
 * @desc 属性有効度をnoEffectNumberの値に設定すると、
 * その属性の攻撃を完全にガード（0ダメージに）する。
 * @default 0
 * @type number
 * @min 0
 * @max 1000
 *
 * @param neutralizationNumber
 * @desc 属性有効度をneutralizationNumberの値に設定すると、
 * 属性吸収・無効化・その他の属性有効度の設定を無効化する。
 * @default 1
 * @type number
 * @min 0
 * @max 1000
 *
 * @param absRegeneration
 * @desc HP、MPの再生値を割合ではなく数値で指定するか
 * ■true : 数値指定　■false : 割合指定（default）
 * @default true
 * @type boolean
 *
 * @param mhpBuff
 * @desc 最大HPのバフ・デバフの効果
 * ■0：割合で増減  ■その他の数値：指定した数字ずつ増減
 * @default 1
 * @type number
 * @min 0
 *
 * @param mmpBuff
 * @desc 最大MPのバフ・デバフの効果
 * ■0：割合で増減  ■その他の数値：指定した数字ずつ増減
 * @default 1
 * @type number
 * @min 0
 *
 * @param atkBuff
 * @desc 攻撃力のバフ・デバフの効果
 * ■0：割合で増減  ■その他の数値：指定した数字ずつ増減
 * @default 1
 * @type number
 * @min 0
 * @decimals 1
 *
 * @param defBuff
 * @desc 防御力のバフ・デバフの効果
 * ■0：割合で増減  ■その他の数値：指定した数字ずつ増減
 * @default 1
 * @type number
 * @min 0
 * @decimals 1
 *
 * @param matBuff
 * @desc 魔法力のバフ・デバフの効果
 * ■0：割合で増減  ■その他の数値：指定した数字ずつ増減
 * @default 1
 * @type number
 * @min 0
 * @decimals 1
 *
 * @param mdfBuff
 * @desc 魔法防御のバフ・デバフの効果
 * ■0：割合で増減  ■その他の数値：指定した数字ずつ増減
 * @default 1
 * @type number
 * @min 0
 * @decimals 1
 *
 * @param agiBuff
 * @desc 敏捷性のバフ・デバフの効果
 * ■0：割合で増減  ■その他の数値：指定した数字ずつ増減
 * @default 1
 * @type number
 * @min 0
 * @decimals 1
 *
 * @param lukBuff
 * @desc 運のバフ・デバフの効果
 * ■0：割合で増減  ■その他の数値：指定した数字ずつ増減
 * @default 1
 * @type number
 * @min 0
 * @decimals 1
 *
 * @param criticalRate
 * @desc クリティカル時のダメージ倍率
 * @default 3
 * @type number
 * @min 0
 * @decimals 1
 *
 * @param recGuard
 * @desc 属性が付属された回復呪文を受けたとき、もしくは相手の攻撃を吸収するときに
 * 防御の効果を適用するか
 * @default false
 * @type boolean
 *
 * @help ダメージ計算の方法を変更します。
 * 64のマリオストーリー(nintendo)みたいな感じになります（例えが古い…）。
 * 1、2などの小さなダメージをメインで扱うゲームの製作に使用して下さい。
 *
 * ■変更内容↓
 *
 * １．防御の挙動を、「受けるダメージを指定した数値だけ減らす」に変更します。
 * 　　プラグインパラメータ；grdEffectValue
 * 　　※grdEffectValueに 0 を入力した場合はデフォルトと同じ挙動になります。
 *
 * ２．属性有効度の挙動を変更します。
 * 　　 100%               → 属性有効度に影響なし
 * 　　(100+a)%            → 式の値 +a
 * 　　(100-a)%            → 式の値 -a （ダメージ最小値 = 0）
 * 　　(noEffectNumber)%   → 0
 * 　　(absorptionNumber)% → 式の値分だけ吸収
 *     (neutralizeNumber)% → 式の値（属性有効度を100%に上書き）
 * 　　※装備品やステートによる属性有効度は累積されます。
 * 　　　例；炎属性有効度101%（被炎ダメージ+1）のキャラ＋炎属性101%（被炎ダメージ+1）の盾
 * 　　　　　→被炎属性ダメージ+2
 * 　　※優先順位は、属性有効度設定無効化＞吸収＞ダメージ無効化＞その他　です。
 * 　　　例１；炎属性有効度(neutralizeNumber)%の腕輪＋炎属性200%の服＋炎属性吸収の盾
 * 　　　　　　→炎属性有効度100%
 * 　　　例２；炎属性有効度(absorptionNumber)%の盾＋炎属性有効度(noEffectNumber)%の服
 * 　　　　　　→炎属性吸収。
 * 　　　例３；炎属性有効度(noEffectNumber)%の盾＋炎属性有効度300%（被炎ダメージ+200）の服
 * 　　　　　　→炎属性無効化
 * 　　　
 *
 * ３．防御効果率、回復効果率、薬の知識、MP消費率、
 * 　　物理ダメージ率、魔法ダメージ率、床ダメージ率の挙動を変更します。
 *      100%　　→ 式の値から変化なし
 * 　　(100+a)% → 式の値 +a
 * 　　(100-a)% → 式の値 -a （ダメージ最小値 = 0）
 * 　　※装備品やステートによる属性有効度は累積されます。（２．と同様）
 *
 * ４．HP再生率、MP再生率の効果を変更します。
 * 　　 a% → １ターンに a 回復
 *
 * ５．ステート；攻撃力アップ、呪文威力アップなどのバフ・デバフの効果を変更します。
 * 　　プラグインパラメータ；atkBuff、defBuffなど
 *　　　──────┬───────┬─────────
 *　　　入力した値　│　１段階目　　│　　２段階目
 *　　　──────┼───────┼─────────
 *　 　　0 (default)│ 　　±25% 　　│ 　　±50%
 *　　　──────┼───────┼─────────
 *   　　0以外の数値 │±指定した数値 │ ±指定した数値×2
 *　　　──────┴───────┴─────────
 *  　　（※少数位は四捨五入して整数で計算）
 *
 *
 */

(function () {

    'use strict'
    var pluginName = 'IZ_DamageCalc';

    var parameters = PluginManager.parameters('IZ_DamageCalc');
    var grdEffectValue = Number(parameters['grdEffectValue']) || 1;
    var absorptionNumber = Number(parameters['absorptionNumber']) || 1000;
    var noEffectNumver = Number(parameters['noEffectNumber']) || 0;
    var neutralizationNumber = Number(parameters['neutralizationNumber']) || 1;
    var absRegenaration = Boolean(parameters['absRegeneration'] === 'true');
    var mhpBuff = Number(parameters['mhpBuff']) || 1;
    var mmpBuff = Number(parameters['mmpBuff']) || 1;
    var atkBuff = Number(parameters['atkBuff']) || 1;
    var defBuff = Number(parameters['defBuff']) || 1;
    var matBuff = Number(parameters['matBuff']) || 1;
    var mdfBuff = Number(parameters['mdfBuff']) || 1;
    var agiBuff = Number(parameters['agiBuff']) || 1;
    var lukBuff = Number(parameters['lukBuff']) || 1;
    var criticalRate = Number(parameters['criticalRate']) || 3;
    var recGuard = Boolean(parameters['recGuard'] === 'true');


    /////////////////////////////////////////////////////////
    //■Game_Action
    /////////////////////////////////////////////////////////

    //====================================
    //薬の効果の挙動を変更
    //■ItemRecovoerHp/Mp
    //====================================
    Game_Action.prototype.itemEffectRecoverHp = function (target, effect) {
        var value = (target.mhp * effect.value1 + effect.value2) * target.rec;
        if (this.isItem()) {
            value += 100 * (this.subject().pha - 1);
        }
        value = Math.floor(value);
        if (value !== 0) {
            target.gainHp(value);
            this.makeSuccess(target);
        }
    };

    var Game_Action_itemEffectRecoverMp = Game_Action.prototype.itemEffectRecoverMp;
    Game_Action.prototype.itemEffectRecoverMp = function (target, effect) {
        var value = (target.mmp * effect.value1 + effect.value2) * target.rec;
        if (this.isItem()) {
            value += 100 * (this.subject().pha - 1);
        }
        value = Math.floor(value);
        if (value !== 0) {
            target.gainMp(value);
            this.makeSuccess(target);
        }
    };

    //====================================
    //ダメージに属性効果・会心・防御を適用
    //■MakeDamageBalue
    //====================================
    var Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function (target, critical) {
        var item = this.item();
        var baseValue = this.evalDamageFormula(target);

        //■ローカル変数
        var value;      //ダメージ計算値
        var canAbsorb;  //吸収できるか(bool)

        
        //■計算処理

        //属性有効度の挙動を変更
        if (this.calcElementRate(target) < 0 ) {    //有効度が1000以上の時吸
            value = -baseValue;
            baseValue = -baseValue;
            canAbsorb = true;
        } else if (this.calcElementRate(target) == 0) {  //有効度が0のとき無効
            value = 0;
            baseValue = 0;
            canAbsorb = false;
        } else {                                    //有効度を0以外の数字に設定した場合は通常計算
            value = baseValue + 100 * (this.calcElementRate(target) - 1);
            canAbsorb = false;
        }

        //物理ダメージ率の挙動を変更
        if (this.isPhysical() && (canAbsorb == false)) {
            value = value + 100 * (target.pdr - 1);
        }

        //魔法ダメージ率の挙動を変更
        if (this.isMagical() && (canAbsorb == false)) {
            value = value + 100 * (target.mdr - 1);
        }

        //回復率の挙動を変更
        if (baseValue < 0) {
            value = value - 100 * (target.rec - 1);
        }
        if (critical) {
            value = this.applyCritical(value);
        }

        //乱数の適用
        value = this.applyVariance(value, item.damage.variance);

        //回復・吸収時の挙動の変更
        if (value >= 0) {
            value = this.applyGuard(value, target);
        } else if (recGuard) {
            value = this.recGuard(value, target);
        }

        //整数値に丸める
        value = Math.round(value);

        return value;
    };
    

    /*
    //=======================
    //ダメージ計算式の評価
    //■EvalDamageFormula
    //=======================
    var Game_Action_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
    Game_Action.prototype.evalDamageFormula = function (target) {
        try {
            var item = this.item();
            var a = this.subject();
            var b = target;
            var v = $gameVariables._data;
            var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
            var value = Math.max(eval(item.damage.formula), 0) * sign;
            if (isNaN(value)) value = 0;
            return value;
        } catch (e) {
            return 0;
        }
    };*/


    /*
    //=======================
    //属性効果計算
    //■calcElementRate
    //=======================
    var Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
    Game_Action.prototype.calcElementRate = function (target) {
        if (this.item().damage.elementId < 0) {
            return this.elementsMaxRate(target, this.subject().attackElements());
        } else {
            return target.elementRate(this.item().damage.elementId);
        }
    };*/

    /*
    //=======================
    //効果が最大の属性を適用
    //■ElementsMaxRate
    //=======================
    var Game_Action_elementsMaxRate = Game_Action.prototype.elementsMaxRate;
    Game_Action.prototype.elementsMaxRate = function (target, elements) {
        if (elements.length > 0) {
            return Math.max.apply(null, elements.map(function (elementId) {
                return target.elementRate(elementId);
            }, this));
        } else {
            return 1;
        }
    };*/


    //=======================
    //クリティカル補正
    //■ApplyCritical
    //=======================
    var Game_Action_applyCritical = Game_Action.prototype.applyCritical;
    Game_Action.prototype.applyCritical = function (damage) {
        return damage * criticalRate;
    };


    /*
    //=======================
    //乱数補正
    //■ApplyVariane
    //=======================
    var Game_Action_applyVariance = Game_Action.prototype.applyVariance;
    Game_Action.prototype.applyVariance = function (damage, variance) {
        //var amp = Math.floor(Math.max(Math.abs(damage) * variance / 100, 0));
        //var v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
        //return damage >= 0 ? damage + v : damage - v;
        if (damage % 1 > 0.5) {

        }
        return
    };*/

    //=======================
    //防御適用
    //■ApplyGuard
    //=======================
    var Game_Action_applyGuard = Game_Action.prototype.applyGuard;
    Game_Action.prototype.applyGuard = function (damage, target) {
        //return damage / (damage > 0 && target.isGuard() ? 2 * target.grd : 1);
        if (target.isGuard()) {
            return Math.max(damage - 100 * (target.grd - 0.99),0);
        } else {
            return damage;
        }
    };

    //=======================
    //防御で回復を軽減
    //■RecoveryGuard ←new!
    //=======================
    Game_Action.prototype.recGuard = function(damage, target){
        if(target.isGuard){
            return Math.min(damage + 100 * (target.grd - 0.99), 0);
        }else{
            return damage;
        }
    }


    /////////////////////////////////////////////////////////
    //■Game_BattlerBase
    /////////////////////////////////////////////////////////

    //==================================
    //特徴有効度他累積型パラメータ
    //■IzParamRate・IzTraitsSum ←new!
    //==================================
    Game_BattlerBase.prototype.izParamRate = function (paramId) {
        return this.izTraitsSum(Game_BattlerBase.TRAIT_PARAM, paramId);
    };

    Game_BattlerBase.prototype.izTraitsSum = function (code, id) {
        return this.traitsWithId(code, id).reduce(function (r, trait) {
            return r + (trait.value - 1.0);
        }, 0);  
    };

    Game_BattlerBase.prototype.elementRate = function (elementId) {
        return this.elementTraitsPi(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId);
    };

    Game_BattlerBase.prototype.elementTraitsPi = function (code, id) {
        var traits = this.traitsWithId(code, id);
        var effectiveValue = 1;
        var neutralize = false;
        return this.traitsWithId(code, id).reduce(function (r, trait) {
            var value = trait.value;
            if (value * 100 == neutralizationNumber || neutralize) {
                neutralize = true;
                effectiveValue = 1;
            } else if (value * 100 == absorptionNumber || effectiveValue == -1) {
                effectiveValue = -1;
            } else if (value * 100 == noEffectNumver || effectiveValue == 0) {
                effectiveValue = 0;
            } else {
                effectiveValue = Math.max(r + trait.value - 1.0, 0);
            }
            return effectiveValue;

        }, 1);
    };


    //==================================
    //パラメータに応じたバフ増減幅を返す
    //■IzBuffValue ←new!
    //==================================
    Game_BattlerBase.prototype.izBuffValue = function(paramId){
        switch (paramId) {
            case 0:
                return mhpBuff;
                break;
            case 1:
                return mmpBuff;
                break;
            case 2:
                return atkBuff;
                break;
            case 3:
                return defBuff;
                break;
            case 4:
                return matBuff;
                break;
            case 5:
                return mdfBuff;
                break;
            case 6:
                return agiBuff;
                break;
            case 7:
                return lukBuff;
                break;

        }
    }
    
    //====================================
    //ダメージ式に使用するパラメータの計算
    //■Param
    //====================================
    var Game_BattlerBase_param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function (paramId) {
        var value = this.paramBase(paramId) + this.paramPlus(paramId);
        value += 100 * this.izParamRate(paramId);

        if (this.izBuffValue(paramId) == 0) {
            value *= this.paramBuffRate(paramId);
        } else {
            value += this._buffs[paramId] * this.izBuffValue(paramId);
        }
        
        var maxValue = this.paramMax(paramId);
        var minValue = this.paramMin(paramId);
        return Math.round(value.clamp(minValue, maxValue));
    };
    
    //=======================
    //MP消費率の挙動の変更
    //■SkillMpCost
    //=======================
    var Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
    Game_BattlerBase.prototype.skillMpCost = function (skill) {
        return Math.max(Math.round(skill.mpCost + 100 * (this.mcr - 1)),0);
    };


    /////////////////////////////////////////////////////////
    //■Game_Battler
    /////////////////////////////////////////////////////////

    //=======================
    //HP・MP再生率の挙動を変更
    //■RegenerateHp/Mp
    //=======================
    var Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
    Game_Battler.prototype.regenerateHp = function () {
        var value = absRegenaration ? 100 * this.hrg : Math.floor(this.mhp * this.hrg);
        value = Math.max(value, -this.maxSlipDamage());
        if (value !== 0) {
            this.gainHp(value);
        }
    };

    var Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
    Game_Battler.prototype.regenerateMp = function () {
        var value = absRegenaration ? 100 * this.mrg : Math.floor(this.mmp * this.mrg);
        if (value !== 0) {
            this.gainMp(value);
        }
    };

    

    /////////////////////////////////////////////////////////
    //■Game_Actor
    /////////////////////////////////////////////////////////

    //=======================
    //HP・MP再生率の挙動を変更
    //■RegenerateHp/Mp
    //=======================
    var Game_Actor_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
    Game_Actor.prototype.executeFloorDamage = function () {
        var damage = Math.round(this.basicFloorDamage() + 100 * ( this.fdr - 1));
        damage = Math.min(damage, this.maxFloorDamage());
        this.gainHp(-damage);
        if (damage > 0) {
            this.performMapDamage();
        }
    };

})();
