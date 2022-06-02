import BaseObject from '../base/Object.js';
import assert from '../../base/assert.js';
import CalendarType from './CalendarType.js';
var rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
var Locale = BaseObject.extend('sap.ui.core.Locale', {
    constructor: function (sLocaleId) {
        BaseObject.apply(this);
        var aResult = rLocale.exec(sLocaleId.replace(/_/g, '-'));
        if (aResult === null) {
            throw new TypeError('The given language \'' + sLocaleId + '\' does not adhere to BCP-47.');
        }
        this.sLocaleId = sLocaleId;
        this.sLanguage = aResult[1] || null;
        this.sScript = aResult[2] || null;
        this.sRegion = aResult[3] || null;
        this.sVariant = aResult[4] && aResult[4].slice(1) || null;
        this.sExtension = aResult[5] && aResult[5].slice(1) || null;
        this.sPrivateUse = aResult[6] || null;
        if (this.sLanguage) {
            this.sLanguage = this.sLanguage.toLowerCase();
        }
        if (this.sScript) {
            this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, function ($) {
                return $.toUpperCase();
            });
        }
        if (this.sRegion) {
            this.sRegion = this.sRegion.toUpperCase();
        }
    },
    getLanguage: function () {
        return this.sLanguage;
    },
    getScript: function () {
        return this.sScript;
    },
    getRegion: function () {
        return this.sRegion;
    },
    getVariant: function () {
        return this.sVariant;
    },
    getVariantSubtags: function () {
        return this.sVariant ? this.sVariant.split('-') : [];
    },
    getExtension: function () {
        return this.sExtension;
    },
    getExtensionSubtags: function () {
        return this.sExtension ? this.sExtension.slice(2).split('-') : [];
    },
    getPrivateUse: function () {
        return this.sPrivateUse;
    },
    getPrivateUseSubtags: function () {
        return this.sPrivateUse ? this.sPrivateUse.slice(2).split('-') : [];
    },
    hasPrivateUseSubtag: function (sSubtag) {
        assert(sSubtag && sSubtag.match(/^[0-9A-Z]{1,8}$/i), 'subtag must be a valid BCP47 private use tag');
        return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
    },
    toString: function () {
        return join(this.sLanguage, this.sScript, this.sRegion, this.sVariant, this.sExtension, this.sPrivateUse);
    },
    toLanguageTag: function () {
        var sLanguage = this.getModernLanguage();
        var sScript = this.sScript;
        if (sLanguage === 'sr' && sScript === 'Latn') {
            sLanguage = 'sh';
            sScript = null;
        }
        return join(sLanguage, sScript, this.sRegion, this.sVariant, this.sExtension, this.sPrivateUse);
    },
    getModernLanguage: function () {
        return M_ISO639_OLD_TO_NEW[this.sLanguage] || this.sLanguage;
    },
    getSAPLogonLanguage: function () {
        var sLanguage = this.sLanguage || '';
        if (sLanguage.indexOf('-') >= 0) {
            sLanguage = sLanguage.slice(0, sLanguage.indexOf('-'));
        }
        sLanguage = M_ISO639_OLD_TO_NEW[sLanguage] || sLanguage;
        if (sLanguage === 'zh' && !this.sScript && this.sRegion === 'TW') {
            return 'ZF';
        }
        return M_LOCALE_TO_ABAP_LANGUAGE[join(sLanguage, this.sScript)] || M_LOCALE_TO_ABAP_LANGUAGE[join(sLanguage, this.sRegion)] || M_LOCALE_TO_ABAP_LANGUAGE[getPseudoLanguageTag(this.sPrivateUse)] || sLanguage.toUpperCase();
    },
    getPreferredCalendarType: function () {
        return Locale._mPreferredCalendar[this.getLanguage() + '-' + this.getRegion()] || Locale._mPreferredCalendar[this.getLanguage()] || Locale._mPreferredCalendar['default'];
    }
});
function getPseudoLanguageTag(sPrivateUse) {
    if (sPrivateUse) {
        var m = /-(saptrc|sappsd|saprigi)(?:-|$)/i.exec(sPrivateUse);
        return m && 'en-US-x-' + m[1].toLowerCase();
    }
}
var M_ISO639_OLD_TO_NEW = {
    'iw': 'he',
    'ji': 'yi'
};
var M_ABAP_LANGUAGE_TO_LOCALE = {
    'ZH': 'zh-Hans',
    'ZF': 'zh-Hant',
    'SH': 'sr-Latn',
    '6N': 'en-GB',
    '1P': 'pt-PT',
    '1X': 'es-MX',
    '3F': 'fr-CA',
    '1Q': 'en-US-x-saptrc',
    '2Q': 'en-US-x-sappsd',
    '3Q': 'en-US-x-saprigi'
};
var M_LOCALE_TO_ABAP_LANGUAGE = inverse(M_ABAP_LANGUAGE_TO_LOCALE);
function getDesigntimePropertyAsArray(sValue) {
    var m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(sValue);
    return m && m[2] ? m[2].split(/,/) : null;
}
var A_RTL_LOCALES = getDesigntimePropertyAsArray('$cldr-rtl-locales:ar,fa,he$') || [];
Locale._cldrLocales = getDesigntimePropertyAsArray('$cldr-locales:ar,ar_EG,ar_SA,bg,ca,cy,cs,da,de,de_AT,de_CH,el,el_CY,en,en_AU,en_GB,en_HK,en_IE,en_IN,en_NZ,en_PG,en_SG,en_ZA,es,es_AR,es_BO,es_CL,es_CO,es_MX,es_PE,es_UY,es_VE,et,fa,fi,fr,fr_BE,fr_CA,fr_CH,fr_LU,he,hi,hr,hu,id,it,it_CH,ja,kk,ko,lt,lv,ms,nb,nl,nl_BE,pl,pt,pt_PT,ro,ru,ru_UA,sk,sl,sr,sr_Latn,sv,th,tr,uk,vi,zh_CN,zh_HK,zh_SG,zh_TW$');
Locale._mPreferredCalendar = {
    'ar-SA': CalendarType.Islamic,
    'fa': CalendarType.Persian,
    'th': CalendarType.Buddhist,
    'default': CalendarType.Gregorian
};
Locale._coreI18nLocales = getDesigntimePropertyAsArray('$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,en_GB,es,es_MX,et,fi,fr,hi,hr,hu,it,iw,ja,kk,ko,lt,lv,ms,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$');
Locale._impliesRTL = function (vLanguage) {
    var oLocale = vLanguage instanceof Locale ? vLanguage : new Locale(vLanguage);
    var sLanguage = oLocale.getLanguage() || '';
    sLanguage = sLanguage && M_ISO639_OLD_TO_NEW[sLanguage] || sLanguage;
    var sRegion = oLocale.getRegion() || '';
    if (sRegion && A_RTL_LOCALES.indexOf(sLanguage + '_' + sRegion) >= 0) {
        return true;
    }
    return A_RTL_LOCALES.indexOf(sLanguage) >= 0;
};
Locale.fromSAPLogonLanguage = function (sSAPLogonLanguage) {
    if (sSAPLogonLanguage && typeof sSAPLogonLanguage === 'string') {
        sSAPLogonLanguage = M_ABAP_LANGUAGE_TO_LOCALE[sSAPLogonLanguage.toUpperCase()] || sSAPLogonLanguage;
        try {
            return new Locale(sSAPLogonLanguage);
        } catch (e) {
        }
    }
};
function join() {
    return Array.prototype.filter.call(arguments, Boolean).join('-');
}
function inverse(obj) {
    return Object.keys(obj).reduce(function (inv, key) {
        inv[obj[key]] = key;
        return inv;
    }, {});
}
export default Locale;