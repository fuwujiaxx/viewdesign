/**
* @class Shineyue.Basice
*
* @description 一些基础的方法，变量类型判断，和对一些原有类型添加新的方法
*/
var Shineyue = Shineyue || {};

var Shineyue.Basic = (function(){

        //指向当前对象
    var global = this,

        //获得Object 的原型
        objectPrototype = Object.prototype,

        //饭后指向 window对象 的  Object 原型的toString  方法
        toString = objectPrototype.toString,

        // 空方法
        emptyFn = function(){},

        // 私有方法
        privateFn = function(){},

        Basic = {

          // 获取当前对象
          global : global,

          // 获取系统当前时间
          now : (Date.now || (Date.now = function(){
            return +new Date();
          })),

          // 属性复制
          apply : function(object , config , defaults){
            if(defaults){
              arguments.callee(object , defaults);
            }

            if(object && config && typeof config === 'object'){
              for(var i in config){
                object[i] = config[i];
              }
            }

            return object;
          },

          // 属性复制 ， 如果存在就不复制
          applyIf : function(){

          }
        };

    return Basic;
}());

Shineyue.apply = Shineyue.Basic.apply;

Shineyue.applyIf = Shineyue.Basic.applyIf;

/**
* 检查浏览器是否支持 function.bind 方法，如果不支持就在Function
* 原型上定义一个 bind 方法
*/
if(!Function.prototype.bind){
  (function(){

    var slice = Array.prototype.slice,

    bind = function(me){
      var args = slice.call(arguments , 1),
          method = this;

      //如果参数存在
      if(args.length){
          return function(){
            var t = arguments;

            return method.apply(me , t.length ? args.concat(slice.call(t)) : args);
          };
      }

      //没有参数
      args = null;
      return function(){
        return method.apply(me , arguments);
      };
    };

    Function.prototype.bind = bind;
  }());
}

/**
* @class Shineyue.Array
*
* @description 在原有的Array上扩展了一些方法
*/
Shineyue.Array = (function(){

}());

/**
* @class Shineyue.Number
*
* @description 原有的数字类型 ， 在对浮点类型进行，加减乘除时会出现精度丢失问题
*,所以此类就是解决这些问题的。
* 因为在浮点类型中只有0和 0.5是十进制时可以被转换为精确的
* 十进制转二进制:
* 第一步: 0.125 * 2 = 0
* 第二步: 0.25 * 2 = 0
* 第三步: 0.5 * 2 = 1
* 所以 0.125 的二进制就是 001
*
* 二进制转换十进制:
* 0 * 2^-1 + 0 * 2^-2 +  1 * 2^-3 = 0.125
*
*/
Shineyue.Number = (function(){

}());


/**
* @class Shineyue.String
*
* @description 对字符串进行一些处理
*/
Shineyue.String = (function(){

}());
