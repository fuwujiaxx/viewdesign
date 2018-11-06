/**
* @class Shineyue.Basice
*
* @description 一些基础的方法，变量类型判断，和对一些原有类型添加新的方法
*/
var Shineyue = Shineyue || {};

Shineyue.Config = function(name){
  var me = this,
      capitalizedName = name.charAt(0).toUpperCase() +
      name.substr(1);

      /**
      *@property {String} name
      *The name of this config property.
      *@readOnly
      *@private
      *@since 1.0.0
      */
  me.name = name;

  /**
  *@property {Object} names
  *This object holds the caches names used to lookup properties or methods for this
  *config property. The properties of this object are explained in the context of an
  *exmaple property named "foo".
  *
  *
  *@property {String} names. internal The default backing property ("_foo").
  *
  *@property {String} names. initializing The property that is `true` when the config
  *is being initialized ("isFooInitializing").
  *
  *@property {String} names.apply The name of the applier method ("applyFoo").
  *
  *@property {String} names.update The name of the updater method ("updateFoo").
  *
  *@property {String} names.get The name of the getter method  ("getFoo").
  *
  *@property {String} names.set The name of the setter method ("setFoo").
  *
  *@property {String} names.initGet The name of the initializing getter ("initGetFoo").
  *
  *@property {String} names.changeEvent The name of the change event ("foochange").
  *
  *@readonly
  *@private
  *@since 1.0.0
  */
  me.names = {
    internal : '_' + name,
    initializing : 'is' + capitalizedName + 'Initializing',
    apply : 'apply' + capitalizedName,
    update : 'update' + capitalizedName,
    get : 'get' + capitalizedName,
    set : 'set' + capitalizedName,
    initGet : 'initGet' + capitalizedName,
    changeEvent : name.toLowerCase() + 'change'
  };

  me.root = me;
};

/**
*
*/
Shineyue.Config.map = {};
Shineyue.Config.get = function(name){
  var map = Shineyue.Config.map,
      ret = map[name] || (map[name] = new Shineyue.Config(name));
  return ret;
};

Shineyue.Config.prototype = {
  self : Shineyue.Config,
  isConfig : true,

  /**
  *@cfg {Boolean} [cached = false]
  *When set as `true` the config property will be stored on the class prototype once
  *the first instance has had a chance to process the default value.
  *@private
  *@since  1.0.0
  */

  /**
  *@cfg {Boolean} [lazy=false]
  *When set as `true` the config property will not be immediately initialized during
  *the `initConfig` call.
  *@private
  *@since 1.0.0
  */

  /**
  *@cfg {Boolean} [evented=false]
  *When set as `true` the config property will be treated as a {@link Shineyue.Evented Evented Config}.
  *@private
  *@since 1.0.0
  */

  /**
  *@cfg {Function} [merge]
  *This function if supplied will be called as classes or instances provide values
  *that need to be combined with inherited values. The function should return the
  *value that will be the config value. Further calls my receive such returned
  *values as `oldValue`.
  *
  *
  *@cfg {Mixed} merge.newValue The new value to merge with the old.
  *
  *@cfg {Mixed} merge.oldValue The current value prior to `newValue` being merged.
  *
  *@cfg {Mixed} merge.target The class or instance to which the merged config value
  *will be applied.
  *
  *@cfg {Shineyue.Class} merge.mixinClass The mixin providing the `newValue` or `null` if
  *the `newValue` is not being provided by a mixin.
  *
  */

  getGetter : function(){
    return this.getter || (this.root.getter = this.makeGetter());
  },

  getInitGetter : function(){
    return this.initGetter || (this.root.initGetter = this.makeInitGetter());
  },

  getSetter : function(){
    return this.setter || (this.root.setter = this.makeSetter());
  },

  getEventedSetter : function(){
    return this.eventedSetter || (this.root.eventedSetter = this.makeEventedSetter());
  },

  /**
  *Returns the name of the property that stores this config on the given instance or
  *class prototype.
  *@param {Object} target
  *@return {String}
  */
  getInternalName : function(){
    return target.$configPrefixed ? this.names.internal : this.name;
  },

  mergeNew : function(newValue , oldValue , target , mixinClass){
    var ret , key;
    if(!oldValue){
      ret = newValue;
    }else if(!newValue){
      ret = oldValue;
    }else{
      ret = Shineyue.Object.chain(oldValue);
      for(key in newValue){
        if(!mixinClass || !(key in ret)){
          ret[key] = newValue[key];
        }
      }
    }

    return ret;
  },

  /**
  *Merges the `newValue` and the `oldValue` assuming that these are basically objects
  *the represent sets. For example something like:
  *       {
  *         foo : true,
  *         bar : true
  *       }
  *The merge process converts arrays like the following into the above:
  *       ['foo' , 'bar']
  *
  *@param {String/String[]/Object} newValue
  *@param {Object} oldValue
  *@param {Boolean} [preserveExisting=false]
  *@return {Object}
  *@private
  *@since 1.0.0
  */
  mergeSets : function(newValue , oldValue , preserveExisting){
    var ret = oldValue ? Shineyue.Object.chain(oldValue) : {},
        i , val;

    if(newValue instanceof Array){
      for(i = newValue.length; i--;){
        val = newValue[i];
        if(!preserveExisting || !(val in ret)){
          ret[val] = true;
        }
      }
    }else if(newValue){
      if(newValue.constructor === Object){
        for(i in newValue){
          val = newValue[i];
        }
      }else if(){

      }
    }
  },
};

var Shineyue.Basic = (function(flexSetter){

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

        noArgs = [],

        baseStaticMember ,

        baseStaticMembers = [],

        getConfig = function(name , peek){
          var me = this,
              ret , cfg , getterName;

          if(name){
            cfg = Shineyue.Config.map[name];
          }
        },

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

/**
*@class Shineyue.Date
*
*@description 对日期进行一些处理
*/
Shineyue.Date = (function(){

}());

/**
*@class Shineyue.Function
*
*@description 方法
*/
Shineyue.Function = (function(){

}());


/**
*@class Shineyue.Object
*
*@description 对Object对象进行一些处理
*/
Shineyue.Object = (function(){

}());

Shineyue.apply(Shineyue , {

  extend : function(){

  }(),


});


/**
*
* @class Shineyue.Base
*/
Shineyue.Base = (function(flexSetter){
  var Base = function(){};

  Shineyue.apply(Base , {

    $className : 'Shineyue.Base',

    $isClass : true,

    create : function(){
      return Shineyue.create.apply(Shineyue ,
         [ this ].concat(Array.prototype.slice.call(arguments , 0)));
    },

    extend : function(parent){
      var me = this,
          parentPrototype = parent.prototype,
          prototype , name , statics;

      prototype = me.prototype = Shineyue.Object.chain(parentPrototype);
      prototype.self = me;

      me.supperclass = prototype.supperclass = parentPrototype;

    },



  });

  return Base;
}());

/**
*@class Shineyue.Class
*
*@description 基本类
*/
(function(){

  var ShineyueClass,
      Base = Shineyue.Base;

  function makeCtor(className){
    function constructor(){
        return this.constructor.apply(this , arguments) || null;
    }

    if(className){
      constructor.name = className;
    }

    return constructor;
  }

  // Shineyue.Class 类
  Shineyue.Class = SyCls = function(Class , data , onCreated){

    if(typeof Class != 'function'){
      onCreated = data;
      data = Class;
      Class = null;
    }

    if(!data){
      data = {};
    }

    Class = SyCls.create(Class , data);
    SyCls.process(Class , data , onCreated);
    return Class;
  };

  Shineyue.apply(Shineyue , {

    makeCtor : makeCtor,

    /**
    *@private
    */
    onBeforeCreated : function(Class, data, hooks){
      Class.addMembers(data);
      hooks.onCreated.call(Class , Class);
    },

    /**
    *@private
    */
    create : function(Class , data){
      if(!Class){
        Class = makeCtor(data.$className);
      }

      return Class;
    },

    /**
    *@private
    */
    process : function(Class , data ,  onCreated){

    },

  });

}());

/**
* @Shineyue.Dom 操作js原生DOM对象
*
* @description 该方法提供了 对元素的插入
*，大小，位置，样式的一些操作
*/
Shineyue.Dom = (function(){
  var doc = document,

  // 使用Id 取得元素
  getEl = function(id){
    return doc.getElementById(id);
  },

  // 通过表达式 取得元素
  queryEl = function(exp){
    return doc.querySelector(exp);
  },

  // 通过表达式 获取一组元素
  queryElAll = function(exp){
    return doc.querySelectorAll(exp);
  },

  // 元素插入到那个位置
  insWhere = function(where , ele , html){
    ele.insertAdjacement(where , html);
  },

  // 元素插入在ele 节点开始标签之前
  insBeforeBegin = function(ele , html){
    insWhere('BeforeBegin' , ele , html);
  },

  // 元素插入在ele 节点开始标签之后
  insBeforeEnd = function(ele , html){
    insWhere('BeforeEnd' , ele , html);
  },

  // 元素插入在ele 节点结束标签之前
  insAfterBegin = function(ele , html){
    insWhere('AfterBegin' , ele , html);
  },

  // 元素插入在ele 节点结束标签之后
  insAfterEnd = function(ele , html){
    insWhere('AfterEnd' , ele , html);
  },

  // 获取元素的X轴的距离
  getX = function(){
    return
  },

  // 获取元素的Y轴的距离
  getY = function(){

  },

  // 获取元素XY轴的距离
  getXY = function(){

  },

  // 设置元素X轴的距离
  setX = function(){

  },

  //设置元素Y轴的距离
  setY = function(){

  },

  //设置元素XY轴的距离
  setXY = function(){

  },

  //设置元素样式
  setStyle = function(){

  },

  // 设置元素的多个样式
  setStyles = function(){

  },

  //设置值元素css
  setCss = function(){

  },

  // 获取元素的样式
  getStyle = function(){

  },

  // 获取元素的多个样式
  getStyles = function(){

  },

  // 获取元素的css
  getCss = function(){

  },

  // 获取元素的z-index
  getZindex = function(){

  },

  // 设置元素的z-index
  setZindex = function(){

  },

  Dom = {

  };

  return Dom;
}());
