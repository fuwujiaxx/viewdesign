
/**
*@class Shineyue.Boot
*
*@description 判断平台类型, 以及浏览器类型 , 然后按需加载各平台需要的代码
*/
var Shineyue = Shineyue || {};

Shineyue.Boot = (function(){

  var uc = navigator.userAgent,

      platform = navigator.platform,

      doc = document,

      //检测类型
      check = function(regx , up){
        return regx.test(up);
      },

      //判断当前浏览器采用的渲染方式
      /**
      *  有两个模式：
      *  BackCompat：标准兼容模式关闭，当document.compatMode等于BackCompat时，浏览器客户区宽度为document.body.clientWidth;
      *  CSS1Compat：标准兼容模式开启,当document.compatMode等于CSS1Compat时浏览器客户区宽度为document.documentElement.clientWidth;
      */
      isStrict = doc.compatMode == "CSS1Compat",

      //windows 平台
      isWin = check(/(?:Win32|Windows)/ , platform),

      //Mac 平台
      isMac = check(/(?:Mac68K|MacPPC|Macintosh|MacIntel)/ , platform),

      //Unix 平台
      isUnix = check(/(?:X11)/ , platform) && !isWin && !isMac,

      //Linux 平台
      isLinux = check(/(?:Linux)/ , platform),

      //android 平台
      isAndroid = check(/(?:android)/i , uc) && isLinux,

      //windows 2000 平台
      isWin2000 = check(/(?:Windows NT 5.0|Windows 2000)/ , uc) && isWin,

      //windows Xp 平台
      isWinXp = check(/(?:Windows NT 5.1|Windows XP)/ , uc) &&  isWin,

      //windows 2003 平台
      isWin2003 = check(/(?:Windows NT 5.2|Windows 2003)/ , uc) && isWin,

      //Windows Vista 平台
      isWinVista = check(/(?:Windows NT 6.0|Windows Vista)/ , uc) && isWin,

      //Windows 7 平台
      isWin7 = check(/(?:Windows NT 6.1|Windows 7)/ , uc) && isWin,

      //Windows 8 平台
      isWin8 = check(/(?:Windows NT 6.2|Windows 8)/ , uc) && isWin,

      //Windows 10 平台
      isWin10 = check(/(?:Windows NT 6.3|Windows 10)/ , uc) && isWin,

      //移动终端
      isMobile = check(/(?:AppleWebKit.*Mobile.*|AppleWebKit)/ , uc),

      //安卓手机
      isAndroid = check(/Android/ , uc),

      //苹果手机
      isiPhone = check(/iPhone/ , uc),

      //winphone手机
      isWinPhone = check(/Windows Phone/ , uc),

      //iPad
      isiPad = check(/iPad/ , uc),

      //WeChat 微信
      isWeChat = check(/MicroMessenger/ , uc),

      //欧鹏浏览器
      isOpera = check(/opera/ , uc),

      //谷歌
      isChrome = check(/\bchrome\b/ , uc),

      //webkit 内核
      isWebKit = check(/webkit/ , uc),

      //Safari 浏览器
      isSafari = !isChrome && check(/safari/ , uc),

      //Safari2 浏览器
      isSafari2 = isSafari && check(/applewebkit\/4/ , uc),

      //Safari3 浏览器
      isSafari3 = isSafari && check(/version\/3/ , uc),

      //Safari4 浏览器
      isSafari4 = isSafari && check(/version\/4/ , uc),

      //火狐 浏览器
      isFirefox = check(/Firefox/ , uc),

      //IE 浏览器
      isIE = !isOpera && check(/msie/ , uc),

      //IE 7 浏览器
      isIE7 = isIE && check(/msie 7/ , uc),

      //IE 8 浏览器
      isIE8 = isIE && check(/msie 8/ , uc),

      //IE 9 浏览器
      isIE9 = isIE && check(/msie 9/ , uc),

      //IE 10 浏览器
      isIE10 = isIE && check(/msie 10/ , uc),

      //IE 11 浏览器
      isIE11 = isIE && check(/msie 11/ , uc),

      //IE 12 浏览器
      isIE12 = isIE && check(/msie 12/ , uc),

      //IE6 浏览器
      isIE6 = isIE && !isIE7 && !isIE8 && !isIE9 && !isIE10 && !isIE11 && !isIE12,

      //QQ 浏览器
      isQQ = check(/MQQBrowser/ , uc),

      //360 浏览器
      is360 = isChrome && (function(option , value){
        var  mimeTypes = navigator.mimeTypes;
        for (var mt in mimeTypes) {
            if (mimeTypes[mt][option] == value) {
                return true;
            }
        }
        return false;
      }("type" , "application/vnd.chromium.remoting-viewer")),

      //UC 浏览器
      isUC = check(/ubrowser/ , uc),

      //搜狗 浏览器
      isSogo = check(/metasr/ , uc),

      //遨游 浏览器
      isMaxthon = check(/maxthon/ , uc),

      //百度 浏览器
      isMaxthon = check(/bidubrowser/ , uc),

      resolverEl = doc.createElement('a'),

      isBrowser = typeof window !== 'undefined',

      _apply = function(object , config , defaults){
        if(defaults){
          _apply(object , defaults);
        }

        if(object && config && typeof config === 'object'){
          for(var i in config){
            object[i] = config[i];
          }
        }

        return object;
      },

      _merge = function(){
        var lowerCase = false,
            obj = Array.prototype.shift.call(arguments),
            index , i , len , value;

        if(typeof arguments[arguments.length - 1] === 'boolean'){
          lowerCase = Array.prototype.pop.call(arguments);
        }

        len = arguments.length;

        for(index = 0; index < len; index++){
          value = arguments[index];
          if(typeof value === 'object'){
            for(i in value){
              obj[lowerCase ? i.toLowerCase() : i] = value[i];
            }
          }
        }

        return obj;
      },

      _getKeys = (typeof Object.keys == 'function') ? function(obj){
        if(!obj){
          return [];
        }
        return Object.keys(obj);
      } : function(obj){
        var keys = [],
            o;
        for(o in obj){
          if(obj.hasOwnProperty(o)){
            keys.push(o);
          }
        }
        return keys;
      },

      Boot = {

        init : function(){
          new Entry();
        }
      };

  function Request(){

  };

  Request.prototype = {
    createScript : function(url){
      var script = doc.createElement('script');
      script.setAttribute("src" , url);
      script.setAttribute("async" , true);
      script.setAttribute("type" , "text/javascript");
      return script;
    }
  };

  function Entry(){
    var script = new Request().createScript("./../src/basic/layout.js");
    document.head.appendChild(script);
  };

  Entry.prototype = {
    
  };

  return Boot;
}());
