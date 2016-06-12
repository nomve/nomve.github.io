/* */ 
"format global";
(function (global) {
  var babelHelpers = global.babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.defaults = function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedClass = (function () {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];

            if (typeof decorator === "function") {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
            }
          }

          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }

        Object.defineProperty(target, key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();

  babelHelpers.createDecoratedObject = function (descriptors) {
    var target = {};

    for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];
      var decorators = descriptor.decorators;
      var key = descriptor.key;
      delete descriptor.key;
      delete descriptor.decorators;
      descriptor.enumerable = true;
      descriptor.configurable = true;
      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

      if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];

          if (typeof decorator === "function") {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
          }
        }
      }

      if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }

      Object.defineProperty(target, key, descriptor);
    }

    return target;
  };

  babelHelpers.defineDecoratedPropertyDescriptor = function (target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor) return;
    var descriptor = {};

    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];

    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  };

  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
    strings.raw = raw;
    return strings;
  };

  babelHelpers.toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers.slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  babelHelpers.slicedToArrayLoose = function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];

      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);

        if (i && _arr.length === i) break;
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.hasOwn = Object.prototype.hasOwnProperty;
  babelHelpers.slice = Array.prototype.slice;
  babelHelpers.bind = Function.prototype.bind;

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        var callNext = step.bind(null, "next");
        var callThrow = step.bind(null, "throw");

        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(callNext, callThrow);
          }
        }

        callNext();
      });
    };
  };

  babelHelpers.interopExportWildcard = function (obj, defaults) {
    var newObj = defaults({}, obj);
    delete newObj["default"];
    return newObj;
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  };

  babelHelpers._typeof = function (obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers._extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers.newArrowCheck = function (innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.objectDestructuringEmpty = function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  };

  babelHelpers.temporalUndefined = {};

  babelHelpers.temporalAssertDefined = function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    }

    return true;
  };

  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;
  babelHelpers.typeofReactElement = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

  babelHelpers.defaultProps = function (defaultProps, props) {
    if (defaultProps) {
      for (var propName in defaultProps) {
        if (typeof props[propName] === "undefined") {
          props[propName] = defaultProps[propName];
        }
      }
    }

    return props;
  };

  babelHelpers._instanceof = function (left, right) {
    if (right != null && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  };

  babelHelpers.interopRequire = function (obj) {
    return obj && obj.__esModule ? obj["default"] : obj;
  };
})(typeof global === "undefined" ? self : global);

!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System, require) {

!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
$__System.register('2', [], function (_export) {
    'use strict';

    _export('default', elementInsertion);

    function assureSelectionIsArrayLike() {
        var selection = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        if (selection === null) {
            selection = [];
        }
        return typeof selection.length === 'undefined' ? [selection] : selection;
    }

    function elementInsertion(object) {
        var elementCollection = new WeakSet();

        if (typeof object.length === 'undefined') {
            object.length = 0;
        }

        return {
            append: function append(selection) {
                if (typeof selection === 'string') {
                    selection = document.querySelectorAll(selection);
                }

                if (typeof selection !== 'undefined') {
                    (function () {
                        var elements = assureSelectionIsArrayLike(selection);

                        [].forEach.call(elements, function (element, index) {
                            if (!elementCollection.has(element) && element !== null) {
                                object[object.length] = elements[index];
                                object.length += 1;
                                elementCollection.add(element);
                            }
                        });
                    })();
                }
            }
        };
    }

    return {
        setters: [],
        execute: function () {}
    };
});
$__System.registerDynamic("3", ["4", "5"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio,
        _ = root._;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      _ = $__require('5');
    }
    Tuio.Source = Tuio.Model.extend({
      sourceId: null,
      sourceName: null,
      sourceInstance: null,
      sourceAddress: null,
      dimension: null,
      dimensionBufferView: null,
      frameTime: null,
      initialize: function(params) {
        params = params || {};
        var sourceStringParams = this.setSourceString(params.sourceString),
            sourceId = params.sourceId || 0,
            sourceName = params.sourceName || sourceStringParams.sourceName,
            sourceInstance = params.sourceInstance || sourceStringParams.sourceInstance,
            sourceAddress = params.sourceAddress || sourceStringParams.sourceAddress,
            dimension = params.dimension || 0;
        this.sourceId = sourceId;
        this.sourceName = sourceName;
        this.sourceInstance = sourceInstance;
        this.sourceAddress = sourceAddress;
        this.dimension = dimension;
        this.dimensionBufferView = new DataView(new ArrayBuffer(4));
        this.dimensionBufferView.setUint32(0, this.dimension);
        this.frameTime = params.frameTime || new Tuio.Time();
      },
      getSourceId: function() {
        return this.sourceId;
      },
      setSourceString: function(sourceString) {
        var defaultSource = {
          sourceName: "",
          sourceInstance: 0,
          sourceAddress: "localhost"
        },
            sourceParams = {},
            sourceRegex = /([^\:]+)(?::([^@]+)(?:@(\S+))?)?/,
            sourceParamsArray = [];
        if (typeof sourceString === "string") {
          sourceParamsArray = sourceString.match(sourceRegex);
          sourceParams = {
            sourceName: sourceParamsArray[1],
            sourceInstance: sourceParamsArray[2],
            sourceAddress: sourceParamsArray[3]
          };
          if (typeof sourceParams.sourceInstance !== "undefined") {
            sourceParams.sourceInstance = parseInt(sourceParams.sourceInstance, 10);
          }
        }
        return _.merge(defaultSource, sourceParams);
      },
      getSourceString: function() {
        return this.sourceName + ":" + this.sourceInstance + "@" + this.sourceAddress;
      },
      getWidth: function() {
        return this.dimensionBufferView.getUint16(0);
      },
      getHeight: function() {
        return this.dimensionBufferView.getUint16(2);
      },
      getFrameTime: function() {
        return this.frameTime;
      },
      setFrameTime: function(ttime) {
        if (typeof ttime !== "undefined")
          this.frameTime = ttime;
      }
    }, {});
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Source;
    }
  }(this));
  return module.exports;
});

$__System.registerDynamic("6", ["4", "7"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      Tuio.Time = $__require('7');
    }
    Tuio.ObjectContainer = Tuio.Model.extend({
      pointer: null,
      token: null,
      sessionId: null,
      startTime: null,
      currentTime: null,
      source: null,
      state: null,
      initialize: function(params) {
        params = params || {};
        this.sessionId = params.si;
        this.startTime = params.ttime || Tuio.Time.getSystemTime();
        this.currentTime = this.startTime;
        this.source = params.src;
        this.state = Tuio.TUIO_ADDED;
      },
      remove: function(ttime) {
        this.removeTuioPointer(ttime);
        this.removeTuioToken(ttime);
        this.state = Tuio.TUIO_REMOVED;
      },
      update: function(ttime) {
        this.currentTime = ttime;
        this.state = Tuio.TUIO_IDLE;
      },
      stop: function(ttime) {
        if (this.pointer) {
          this.pointer.stop(ttime);
        }
        if (this.token) {
          this.token.stop(ttime);
        }
        this.currentTime = ttime;
      },
      isMoving: function() {
        return (this.containsTuioPointer() && this.pointer.isMoving()) || (this.containsTuioPointer() && this.pointer.isMoving());
      },
      removeTuioPointer: function(ttime) {
        if (this.pointer) {
          this.pointer.remove(ttime);
        }
        this.currentTime = ttime;
      },
      deleteTuioPointer: function() {
        this.pointer = null;
      },
      containsTuioPointer: function() {
        return !!this.pointer;
      },
      containsNewTuioPointer: function() {
        return this.containsTuioPointer() && this.pointer.getTuioState() === Tuio.TUIO_ADDED;
      },
      setTuioPointer: function(pointer) {
        this.pointer = pointer;
      },
      getTuioPointer: function() {
        return this.pointer;
      },
      removeTuioToken: function(ttime) {
        if (this.token) {
          this.token.remove(ttime);
        }
        this.currentTime = ttime;
      },
      deleteTuioToken: function() {
        this.token = null;
      },
      containsTuioToken: function() {
        return !!this.token;
      },
      containsNewTuioToken: function() {
        return this.containsTuioToken() && this.token.getTuioState() === Tuio.TUIO_ADDED;
      },
      getTuioToken: function() {
        return this.token;
      },
      setTuioToken: function(token) {
        this.token = token;
      },
      getSessionId: function() {
        return this.sessionId;
      },
      getTuioTime: function() {
        return this.currentTime;
      },
      getStartTime: function() {
        return this.startTime;
      },
      setTuioSource: function(source) {
        this.source = source;
      },
      getTuioSource: function() {
        return this.source;
      },
      getTuioState: function() {
        return this.state;
      }
    });
    if (typeof exports !== "undefined") {
      module.exports = Tuio.ObjectContainer;
    }
  })(this);
  return module.exports;
});

$__System.registerDynamic("8", ["9"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  (function(process) {
    (function(global, factory) {
      if (typeof define === 'function' && define["amd"])
        define([], factory);
      else if (typeof $__require === 'function' && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
      else
        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();
    })(this, function() {
      "use strict";
      function Long(low, high, unsigned) {
        this.low = low | 0;
        this.high = high | 0;
        this.unsigned = !!unsigned;
      }
      Long.__isLong__;
      Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
      });
      function isLong(obj) {
        return (obj && obj["__isLong__"]) === true;
      }
      Long.isLong = isLong;
      var INT_CACHE = {};
      var UINT_CACHE = {};
      function fromInt(value, unsigned) {
        var obj,
            cachedObj,
            cache;
        if (unsigned) {
          value >>>= 0;
          if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
              return cachedObj;
          }
          obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
          if (cache)
            UINT_CACHE[value] = obj;
          return obj;
        } else {
          value |= 0;
          if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
              return cachedObj;
          }
          obj = fromBits(value, value < 0 ? -1 : 0, false);
          if (cache)
            INT_CACHE[value] = obj;
          return obj;
        }
      }
      Long.fromInt = fromInt;
      function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value))
          return unsigned ? UZERO : ZERO;
        if (unsigned) {
          if (value < 0)
            return UZERO;
          if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
        } else {
          if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
          if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
        }
        if (value < 0)
          return fromNumber(-value, unsigned).neg();
        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
      }
      Long.fromNumber = fromNumber;
      function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
      }
      Long.fromBits = fromBits;
      var pow_dbl = Math.pow;
      function fromString(str, unsigned, radix) {
        if (str.length === 0)
          throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
          return ZERO;
        if (typeof unsigned === 'number')
          radix = unsigned, unsigned = false;
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
          throw RangeError('radix');
        var p;
        if ((p = str.indexOf('-')) > 0)
          throw Error('interior hyphen');
        else if (p === 0) {
          return fromString(str.substring(1), unsigned, radix).neg();
        }
        var radixToPower = fromNumber(pow_dbl(radix, 8));
        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
          var size = Math.min(8, str.length - i),
              value = parseInt(str.substring(i, i + size), radix);
          if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
          } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
          }
        }
        result.unsigned = unsigned;
        return result;
      }
      Long.fromString = fromString;
      function fromValue(val) {
        if (val instanceof Long)
          return val;
        if (typeof val === 'number')
          return fromNumber(val);
        if (typeof val === 'string')
          return fromString(val);
        return fromBits(val.low, val.high, val.unsigned);
      }
      Long.fromValue = fromValue;
      var TWO_PWR_16_DBL = 1 << 16;
      var TWO_PWR_24_DBL = 1 << 24;
      var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
      var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
      var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
      var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
      var ZERO = fromInt(0);
      Long.ZERO = ZERO;
      var UZERO = fromInt(0, true);
      Long.UZERO = UZERO;
      var ONE = fromInt(1);
      Long.ONE = ONE;
      var UONE = fromInt(1, true);
      Long.UONE = UONE;
      var NEG_ONE = fromInt(-1);
      Long.NEG_ONE = NEG_ONE;
      var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
      Long.MAX_VALUE = MAX_VALUE;
      var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
      Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
      var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);
      Long.MIN_VALUE = MIN_VALUE;
      var LongPrototype = Long.prototype;
      LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
      };
      LongPrototype.toNumber = function toNumber() {
        if (this.unsigned)
          return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
      };
      LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
          throw RangeError('radix');
        if (this.isZero())
          return '0';
        if (this.isNegative()) {
          if (this.eq(MIN_VALUE)) {
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
          } else
            return '-' + this.neg().toString(radix);
        }
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
            rem = this;
        var result = '';
        while (true) {
          var remDiv = rem.div(radixToPower),
              intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
              digits = intval.toString(radix);
          rem = remDiv;
          if (rem.isZero())
            return digits + result;
          else {
            while (digits.length < 6)
              digits = '0' + digits;
            result = '' + digits + result;
          }
        }
      };
      LongPrototype.getHighBits = function getHighBits() {
        return this.high;
      };
      LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
      };
      LongPrototype.getLowBits = function getLowBits() {
        return this.low;
      };
      LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
      };
      LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative())
          return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
          if ((val & (1 << bit)) != 0)
            break;
        return this.high != 0 ? bit + 33 : bit + 1;
      };
      LongPrototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
      };
      LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
      };
      LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
      };
      LongPrototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
      };
      LongPrototype.isEven = function isEven() {
        return (this.low & 1) === 0;
      };
      LongPrototype.equals = function equals(other) {
        if (!isLong(other))
          other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
          return false;
        return this.high === other.high && this.low === other.low;
      };
      LongPrototype.eq = LongPrototype.equals;
      LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(other);
      };
      LongPrototype.neq = LongPrototype.notEquals;
      LongPrototype.lessThan = function lessThan(other) {
        return this.comp(other) < 0;
      };
      LongPrototype.lt = LongPrototype.lessThan;
      LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(other) <= 0;
      };
      LongPrototype.lte = LongPrototype.lessThanOrEqual;
      LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(other) > 0;
      };
      LongPrototype.gt = LongPrototype.greaterThan;
      LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(other) >= 0;
      };
      LongPrototype.gte = LongPrototype.greaterThanOrEqual;
      LongPrototype.compare = function compare(other) {
        if (!isLong(other))
          other = fromValue(other);
        if (this.eq(other))
          return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
          return -1;
        if (!thisNeg && otherNeg)
          return 1;
        if (!this.unsigned)
          return this.sub(other).isNegative() ? -1 : 1;
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
      };
      LongPrototype.comp = LongPrototype.compare;
      LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE))
          return MIN_VALUE;
        return this.not().add(ONE);
      };
      LongPrototype.neg = LongPrototype.negate;
      LongPrototype.add = function add(addend) {
        if (!isLong(addend))
          addend = fromValue(addend);
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;
        var c48 = 0,
            c32 = 0,
            c16 = 0,
            c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
      };
      LongPrototype.subtract = function subtract(subtrahend) {
        if (!isLong(subtrahend))
          subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
      };
      LongPrototype.sub = LongPrototype.subtract;
      LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero())
          return ZERO;
        if (!isLong(multiplier))
          multiplier = fromValue(multiplier);
        if (multiplier.isZero())
          return ZERO;
        if (this.eq(MIN_VALUE))
          return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
          return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) {
          if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
          else
            return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
          return this.mul(multiplier.neg()).neg();
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
          return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;
        var c48 = 0,
            c32 = 0,
            c16 = 0,
            c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
      };
      LongPrototype.mul = LongPrototype.multiply;
      LongPrototype.divide = function divide(divisor) {
        if (!isLong(divisor))
          divisor = fromValue(divisor);
        if (divisor.isZero())
          throw Error('division by zero');
        if (this.isZero())
          return this.unsigned ? UZERO : ZERO;
        var approx,
            rem,
            res;
        if (this.eq(MIN_VALUE)) {
          if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
            return MIN_VALUE;
          else if (divisor.eq(MIN_VALUE))
            return ONE;
          else {
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(ZERO)) {
              return divisor.isNegative() ? ONE : NEG_ONE;
            } else {
              rem = this.sub(divisor.mul(approx));
              res = approx.add(rem.div(divisor));
              return res;
            }
          }
        } else if (divisor.eq(MIN_VALUE))
          return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
          if (divisor.isNegative())
            return this.neg().div(divisor.neg());
          return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
          return this.div(divisor.neg()).neg();
        res = ZERO;
        rem = this;
        while (rem.gte(divisor)) {
          approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
          var log2 = Math.ceil(Math.log(approx) / Math.LN2),
              delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),
              approxRes = fromNumber(approx),
              approxRem = approxRes.mul(divisor);
          while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
          }
          if (approxRes.isZero())
            approxRes = ONE;
          res = res.add(approxRes);
          rem = rem.sub(approxRem);
        }
        return res;
      };
      LongPrototype.div = LongPrototype.divide;
      LongPrototype.modulo = function modulo(divisor) {
        if (!isLong(divisor))
          divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
      };
      LongPrototype.mod = LongPrototype.modulo;
      LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
      };
      LongPrototype.and = function and(other) {
        if (!isLong(other))
          other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
      };
      LongPrototype.or = function or(other) {
        if (!isLong(other))
          other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
      };
      LongPrototype.xor = function xor(other) {
        if (!isLong(other))
          other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
      };
      LongPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isLong(numBits))
          numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
          return this;
        else if (numBits < 32)
          return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
          return fromBits(0, this.low << (numBits - 32), this.unsigned);
      };
      LongPrototype.shl = LongPrototype.shiftLeft;
      LongPrototype.shiftRight = function shiftRight(numBits) {
        if (isLong(numBits))
          numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
          return this;
        else if (numBits < 32)
          return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
          return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
      };
      LongPrototype.shr = LongPrototype.shiftRight;
      LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isLong(numBits))
          numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
          return this;
        else {
          var high = this.high;
          if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
          } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
          else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
      };
      LongPrototype.shru = LongPrototype.shiftRightUnsigned;
      LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned)
          return this;
        return fromBits(this.low, this.high, false);
      };
      LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
          return this;
        return fromBits(this.low, this.high, true);
      };
      return Long;
    });
  })($__require('9'));
  return module.exports;
});

$__System.registerDynamic("a", ["8"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('8');
  return module.exports;
});

$__System.registerDynamic("b", ["a", "c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(Buffer) {
    var osc = osc || {};
    (function() {
      "use strict";
      osc.SECS_70YRS = 2208988800;
      osc.TWO_32 = 4294967296;
      osc.defaults = {
        metadata: false,
        unpackSingleArgs: true
      };
      osc.isBufferEnv = typeof Buffer !== "undefined";
      osc.isCommonJS = typeof module !== "undefined" && module.exports;
      osc.isNode = osc.isCommonJS && typeof window === "undefined";
      osc.isArray = function(obj) {
        return obj && Object.prototype.toString.call(obj) === "[object Array]";
      };
      osc.isTypedArrayView = function(obj) {
        return obj.buffer && obj.buffer instanceof ArrayBuffer;
      };
      osc.isBuffer = function(obj) {
        return osc.isBufferEnv && obj instanceof Buffer;
      };
      var Long = typeof dcodeIO !== "undefined" ? dcodeIO.Long : typeof Long !== "undefined" ? Long : osc.isNode ? $__require('a') : undefined;
      osc.dataView = function(obj, offset, length) {
        if (obj.buffer) {
          return new DataView(obj.buffer, offset, length);
        }
        if (obj instanceof ArrayBuffer) {
          return new DataView(obj, offset, length);
        }
        return new DataView(new Uint8Array(obj), offset, length);
      };
      osc.byteArray = function(obj) {
        if (obj instanceof Uint8Array) {
          return obj;
        }
        var buf = obj.buffer ? obj.buffer : obj;
        if (!(buf instanceof ArrayBuffer) && (typeof buf.length === "undefined" || typeof buf === "string")) {
          throw new Error("Can't wrap a non-array-like object as Uint8Array. Object was: " + JSON.stringify(obj, null, 2));
        }
        return new Uint8Array(buf);
      };
      osc.nativeBuffer = function(obj) {
        if (osc.isBufferEnv && osc.isNode) {
          return osc.isBuffer(obj) ? obj : new Buffer(obj.buffer ? obj : new Uint8Array(obj));
        }
        return osc.isTypedArrayView(obj) ? obj : new Uint8Array(obj);
      };
      osc.copyByteArray = function(source, target, offset) {
        if (osc.isTypedArrayView(source) && osc.isTypedArrayView(target)) {
          target.set(source, offset);
        } else {
          var start = offset === undefined ? 0 : offset,
              len = Math.min(target.length - offset, source.length);
          for (var i = 0,
              j = start; i < len; i++, j++) {
            target[j] = source[i];
          }
        }
        return target;
      };
      osc.readString = function(dv, offsetState) {
        var charCodes = [],
            idx = offsetState.idx;
        for (; idx < dv.byteLength; idx++) {
          var charCode = dv.getUint8(idx);
          if (charCode !== 0) {
            charCodes.push(charCode);
          } else {
            idx++;
            break;
          }
        }
        idx = (idx + 3) & ~0x03;
        offsetState.idx = idx;
        return String.fromCharCode.apply(null, charCodes);
      };
      osc.writeString = function(str) {
        var terminated = str + "\u0000",
            len = terminated.length,
            paddedLen = (len + 3) & ~0x03,
            arr = new Uint8Array(paddedLen);
        for (var i = 0; i < terminated.length; i++) {
          var charCode = terminated.charCodeAt(i);
          arr[i] = charCode;
        }
        return arr;
      };
      osc.readPrimitive = function(dv, readerName, numBytes, offsetState) {
        var val = dv[readerName](offsetState.idx, false);
        offsetState.idx += numBytes;
        return val;
      };
      osc.writePrimitive = function(val, dv, writerName, numBytes, offset) {
        offset = offset === undefined ? 0 : offset;
        var arr;
        if (!dv) {
          arr = new Uint8Array(numBytes);
          dv = new DataView(arr.buffer);
        } else {
          arr = new Uint8Array(dv.buffer);
        }
        dv[writerName](offset, val, false);
        return arr;
      };
      osc.readInt32 = function(dv, offsetState) {
        return osc.readPrimitive(dv, "getInt32", 4, offsetState);
      };
      osc.writeInt32 = function(val, dv, offset) {
        return osc.writePrimitive(val, dv, "setInt32", 4, offset);
      };
      osc.readInt64 = function(dv, offsetState) {
        var high = osc.readPrimitive(dv, "getInt32", 4, offsetState),
            low = osc.readPrimitive(dv, "getInt32", 4, offsetState);
        if (Long) {
          return new Long(low, high);
        } else {
          return {
            high: high,
            low: low,
            unsigned: false
          };
        }
      };
      osc.writeInt64 = function(val, dv, offset) {
        var arr = new Uint8Array(8);
        arr.set(osc.writePrimitive(val.high, dv, "setInt32", 4, offset), 0);
        arr.set(osc.writePrimitive(val.low, dv, "setInt32", 4, offset + 4), 4);
        return arr;
      };
      osc.readFloat32 = function(dv, offsetState) {
        return osc.readPrimitive(dv, "getFloat32", 4, offsetState);
      };
      osc.writeFloat32 = function(val, dv, offset) {
        return osc.writePrimitive(val, dv, "setFloat32", 4, offset);
      };
      osc.readFloat64 = function(dv, offsetState) {
        return osc.readPrimitive(dv, "getFloat64", 8, offsetState);
      };
      osc.writeFloat64 = function(val, dv, offset) {
        return osc.writePrimitive(val, dv, "setFloat64", 8, offset);
      };
      osc.readChar32 = function(dv, offsetState) {
        var charCode = osc.readPrimitive(dv, "getUint32", 4, offsetState);
        return String.fromCharCode(charCode);
      };
      osc.writeChar32 = function(str, dv, offset) {
        var charCode = str.charCodeAt(0);
        if (charCode === undefined || charCode < -1) {
          return undefined;
        }
        return osc.writePrimitive(charCode, dv, "setUint32", 4, offset);
      };
      osc.readBlob = function(dv, offsetState) {
        var len = osc.readInt32(dv, offsetState),
            paddedLen = (len + 3) & ~0x03,
            blob = new Uint8Array(dv.buffer, offsetState.idx, len);
        offsetState.idx += paddedLen;
        return blob;
      };
      osc.writeBlob = function(data) {
        data = osc.byteArray(data);
        var len = data.byteLength,
            paddedLen = (len + 3) & ~0x03,
            offset = 4,
            blobLen = paddedLen + offset,
            arr = new Uint8Array(blobLen),
            dv = new DataView(arr.buffer);
        osc.writeInt32(len, dv);
        arr.set(data, offset);
        return arr;
      };
      osc.readMIDIBytes = function(dv, offsetState) {
        var midi = new Uint8Array(dv.buffer, offsetState.idx, 4);
        offsetState.idx += 4;
        return midi;
      };
      osc.writeMIDIBytes = function(bytes) {
        bytes = osc.byteArray(bytes);
        var arr = new Uint8Array(4);
        arr.set(bytes);
        return arr;
      };
      osc.readColor = function(dv, offsetState) {
        var bytes = new Uint8Array(dv.buffer, offsetState.idx, 4),
            alpha = bytes[3] / 255;
        offsetState.idx += 4;
        return {
          r: bytes[0],
          g: bytes[1],
          b: bytes[2],
          a: alpha
        };
      };
      osc.writeColor = function(color) {
        var alpha = Math.round(color.a * 255),
            arr = new Uint8Array([color.r, color.g, color.b, alpha]);
        return arr;
      };
      osc.readTrue = function() {
        return true;
      };
      osc.readFalse = function() {
        return false;
      };
      osc.readNull = function() {
        return null;
      };
      osc.readImpulse = function() {
        return 1.0;
      };
      osc.readTimeTag = function(dv, offsetState) {
        var secs1900 = osc.readPrimitive(dv, "getUint32", 4, offsetState),
            frac = osc.readPrimitive(dv, "getUint32", 4, offsetState),
            native = (secs1900 === 0 && frac === 1) ? Date.now() : osc.ntpToJSTime(secs1900, frac);
        return {
          raw: [secs1900, frac],
          native: native
        };
      };
      osc.writeTimeTag = function(timeTag) {
        var raw = timeTag.raw ? timeTag.raw : osc.jsToNTPTime(timeTag.native),
            arr = new Uint8Array(8),
            dv = new DataView(arr.buffer);
        osc.writeInt32(raw[0], dv, 0);
        osc.writeInt32(raw[1], dv, 4);
        return arr;
      };
      osc.timeTag = function(secs, now) {
        secs = secs || 0;
        now = now || Date.now();
        var nowSecs = now / 1000,
            nowWhole = Math.floor(nowSecs),
            nowFracs = nowSecs - nowWhole,
            secsWhole = Math.floor(secs),
            secsFracs = secs - secsWhole,
            fracs = nowFracs + secsFracs;
        if (fracs > 1) {
          var fracsWhole = Math.floor(fracs),
              fracsFracs = fracs - fracsWhole;
          secsWhole += fracsWhole;
          fracs = fracsFracs;
        }
        var ntpSecs = nowWhole + secsWhole + osc.SECS_70YRS,
            ntpFracs = Math.round(osc.TWO_32 * fracs);
        return {raw: [ntpSecs, ntpFracs]};
      };
      osc.ntpToJSTime = function(secs1900, frac) {
        var secs1970 = secs1900 - osc.SECS_70YRS,
            decimals = frac / osc.TWO_32,
            msTime = (secs1970 + decimals) * 1000;
        return msTime;
      };
      osc.jsToNTPTime = function(jsTime) {
        var secs = jsTime / 1000,
            secsWhole = Math.floor(secs),
            secsFrac = secs - secsWhole,
            ntpSecs = secsWhole + osc.SECS_70YRS,
            ntpFracs = Math.round(osc.TWO_32 * secsFrac);
        return [ntpSecs, ntpFracs];
      };
      osc.readArguments = function(dv, options, offsetState) {
        var typeTagString = osc.readString(dv, offsetState);
        if (typeTagString.indexOf(",") !== 0) {
          throw new Error("A malformed type tag string was found while reading " + "the arguments of an OSC message. String was: " + typeTagString, " at offset: " + offsetState.idx);
        }
        var argTypes = typeTagString.substring(1).split(""),
            args = [];
        osc.readArgumentsIntoArray(args, argTypes, typeTagString, dv, options, offsetState);
        return args;
      };
      osc.readArgument = function(argType, typeTagString, dv, options, offsetState) {
        var typeSpec = osc.argumentTypes[argType];
        if (!typeSpec) {
          throw new Error("'" + argType + "' is not a valid OSC type tag. Type tag string was: " + typeTagString);
        }
        var argReader = typeSpec.reader,
            arg = osc[argReader](dv, offsetState);
        if (options.metadata) {
          arg = {
            type: argType,
            value: arg
          };
        }
        return arg;
      };
      osc.readArgumentsIntoArray = function(arr, argTypes, typeTagString, dv, options, offsetState) {
        var i = 0;
        while (i < argTypes.length) {
          var argType = argTypes[i],
              arg;
          if (argType === "[") {
            var fromArrayOpen = argTypes.slice(i + 1),
                endArrayIdx = fromArrayOpen.indexOf("]");
            if (endArrayIdx < 0) {
              throw new Error("Invalid argument type tag: an open array type tag ('[') was found " + "without a matching close array tag ('[]'). Type tag was: " + typeTagString);
            }
            var typesInArray = fromArrayOpen.slice(0, endArrayIdx);
            arg = osc.readArgumentsIntoArray([], typesInArray, typeTagString, dv, options, offsetState);
            i += endArrayIdx + 2;
          } else {
            arg = osc.readArgument(argType, typeTagString, dv, options, offsetState);
            i++;
          }
          arr.push(arg);
        }
        return arr;
      };
      osc.writeArguments = function(args, options) {
        var argCollection = osc.collectArguments(args, options);
        return osc.joinParts(argCollection);
      };
      osc.joinParts = function(dataCollection) {
        var buf = new Uint8Array(dataCollection.byteLength),
            parts = dataCollection.parts,
            offset = 0;
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          osc.copyByteArray(part, buf, offset);
          offset += part.length;
        }
        return buf;
      };
      osc.addDataPart = function(dataPart, dataCollection) {
        dataCollection.parts.push(dataPart);
        dataCollection.byteLength += dataPart.length;
      };
      osc.writeArrayArguments = function(args, dataCollection) {
        var typeTag = "[";
        for (var i = 0; i < args.length; i++) {
          var arg = args[i];
          typeTag += osc.writeArgument(arg, dataCollection);
        }
        typeTag += "]";
        return typeTag;
      };
      osc.writeArgument = function(arg, dataCollection) {
        if (osc.isArray(arg)) {
          return osc.writeArrayArguments(arg, dataCollection);
        }
        var type = arg.type,
            writer = osc.argumentTypes[type].writer;
        if (writer) {
          var data = osc[writer](arg.value);
          osc.addDataPart(data, dataCollection);
        }
        return arg.type;
      };
      osc.collectArguments = function(args, options, dataCollection) {
        if (!osc.isArray(args)) {
          args = typeof args === "undefined" ? [] : [args];
        }
        dataCollection = dataCollection || {
          byteLength: 0,
          parts: []
        };
        if (!options.metadata) {
          args = osc.annotateArguments(args);
        }
        var typeTagString = ",",
            currPartIdx = dataCollection.parts.length;
        for (var i = 0; i < args.length; i++) {
          var arg = args[i];
          typeTagString += osc.writeArgument(arg, dataCollection);
        }
        var typeData = osc.writeString(typeTagString);
        dataCollection.byteLength += typeData.byteLength;
        dataCollection.parts.splice(currPartIdx, 0, typeData);
        return dataCollection;
      };
      osc.readMessage = function(data, options, offsetState) {
        options = options || osc.defaults;
        var dv = osc.dataView(data, data.byteOffset, data.byteLength);
        offsetState = offsetState || {idx: 0};
        var address = osc.readString(dv, offsetState);
        return osc.readMessageContents(address, dv, options, offsetState);
      };
      osc.readMessageContents = function(address, dv, options, offsetState) {
        if (address.indexOf("/") !== 0) {
          throw new Error("A malformed OSC address was found while reading " + "an OSC message. String was: " + address);
        }
        var args = osc.readArguments(dv, options, offsetState);
        return {
          address: address,
          args: args.length === 1 && options.unpackSingleArgs ? args[0] : args
        };
      };
      osc.collectMessageParts = function(msg, options, dataCollection) {
        dataCollection = dataCollection || {
          byteLength: 0,
          parts: []
        };
        osc.addDataPart(osc.writeString(msg.address), dataCollection);
        return osc.collectArguments(msg.args, options, dataCollection);
      };
      osc.writeMessage = function(msg, options) {
        options = options || osc.defaults;
        if (!osc.isValidMessage(msg)) {
          throw new Error("An OSC message must contain a valid address. Message was: " + JSON.stringify(msg, null, 2));
        }
        var msgCollection = osc.collectMessageParts(msg, options);
        return osc.joinParts(msgCollection);
      };
      osc.isValidMessage = function(msg) {
        return msg.address && msg.address.indexOf("/") === 0;
      };
      osc.readBundle = function(dv, options, offsetState) {
        return osc.readPacket(dv, options, offsetState);
      };
      osc.collectBundlePackets = function(bundle, options, dataCollection) {
        dataCollection = dataCollection || {
          byteLength: 0,
          parts: []
        };
        osc.addDataPart(osc.writeString("#bundle"), dataCollection);
        osc.addDataPart(osc.writeTimeTag(bundle.timeTag), dataCollection);
        for (var i = 0; i < bundle.packets.length; i++) {
          var packet = bundle.packets[i],
              collector = packet.address ? osc.collectMessageParts : osc.collectBundlePackets,
              packetCollection = collector(packet, options);
          dataCollection.byteLength += packetCollection.byteLength;
          osc.addDataPart(osc.writeInt32(packetCollection.byteLength), dataCollection);
          dataCollection.parts = dataCollection.parts.concat(packetCollection.parts);
        }
        return dataCollection;
      };
      osc.writeBundle = function(bundle, options) {
        if (!osc.isValidBundle(bundle)) {
          throw new Error("An OSC bundle must contain 'timeTag' and 'packets' properties. " + "Bundle was: " + JSON.stringify(bundle, null, 2));
        }
        options = options || osc.defaults;
        var bundleCollection = osc.collectBundlePackets(bundle, options);
        return osc.joinParts(bundleCollection);
      };
      osc.isValidBundle = function(bundle) {
        return bundle.timeTag !== undefined && bundle.packets !== undefined;
      };
      osc.readBundleContents = function(dv, options, offsetState, len) {
        var timeTag = osc.readTimeTag(dv, offsetState),
            packets = [];
        while (offsetState.idx < len) {
          var packetSize = osc.readInt32(dv, offsetState),
              packetLen = offsetState.idx + packetSize,
              packet = osc.readPacket(dv, options, offsetState, packetLen);
          packets.push(packet);
        }
        return {
          timeTag: timeTag,
          packets: packets
        };
      };
      osc.readPacket = function(data, options, offsetState, len) {
        var dv = osc.dataView(data, data.byteOffset, data.byteLength);
        len = len === undefined ? dv.byteLength : len;
        offsetState = offsetState || {idx: 0};
        var header = osc.readString(dv, offsetState),
            firstChar = header[0];
        if (firstChar === "#") {
          return osc.readBundleContents(dv, options, offsetState, len);
        } else if (firstChar === "/") {
          return osc.readMessageContents(header, dv, options, offsetState);
        }
        throw new Error("The header of an OSC packet didn't contain an OSC address or a #bundle string." + " Header was: " + header);
      };
      osc.writePacket = function(packet, options) {
        if (osc.isValidMessage(packet)) {
          return osc.writeMessage(packet, options);
        } else if (osc.isValidBundle(packet)) {
          return osc.writeBundle(packet, options);
        } else {
          throw new Error("The specified packet was not recognized as a valid OSC message or bundle." + " Packet was: " + JSON.stringify(packet, null, 2));
        }
      };
      osc.argumentTypes = {
        i: {
          reader: "readInt32",
          writer: "writeInt32"
        },
        h: {
          reader: "readInt64",
          writer: "writeInt64"
        },
        f: {
          reader: "readFloat32",
          writer: "writeFloat32"
        },
        s: {
          reader: "readString",
          writer: "writeString"
        },
        S: {
          reader: "readString",
          writer: "writeString"
        },
        b: {
          reader: "readBlob",
          writer: "writeBlob"
        },
        t: {
          reader: "readTimeTag",
          writer: "writeTimeTag"
        },
        T: {reader: "readTrue"},
        F: {reader: "readFalse"},
        N: {reader: "readNull"},
        I: {reader: "readImpulse"},
        d: {
          reader: "readFloat64",
          writer: "writeFloat64"
        },
        c: {
          reader: "readChar32",
          writer: "writeChar32"
        },
        r: {
          reader: "readColor",
          writer: "writeColor"
        },
        m: {
          reader: "readMIDIBytes",
          writer: "writeMIDIBytes"
        }
      };
      osc.inferTypeForArgument = function(arg) {
        var type = typeof arg;
        switch (type) {
          case "boolean":
            return arg ? "T" : "F";
          case "string":
            return "s";
          case "number":
            return "f";
          case "undefined":
            return "N";
          case "object":
            if (arg === null) {
              return "N";
            } else if (arg instanceof Uint8Array || arg instanceof ArrayBuffer) {
              return "b";
            } else if (typeof arg.high === "number" && typeof arg.low === "number") {
              return "h";
            }
            break;
        }
        throw new Error("Can't infer OSC argument type for value: " + JSON.stringify(arg, null, 2));
      };
      osc.annotateArguments = function(args) {
        var annotated = [];
        for (var i = 0; i < args.length; i++) {
          var arg = args[i],
              msgArg;
          if (typeof(arg) === "object" && arg.type && arg.value !== undefined) {
            msgArg = arg;
          } else if (osc.isArray(arg)) {
            msgArg = osc.annotateArguments(arg);
          } else {
            var oscType = osc.inferTypeForArgument(arg);
            msgArg = {
              type: oscType,
              value: arg
            };
          }
          annotated.push(msgArg);
        }
        return annotated;
      };
      if (osc.isCommonJS) {
        module.exports = osc;
      }
    }());
  })($__require('c').Buffer);
  return module.exports;
});

$__System.registerDynamic("d", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  (function(Buffer) {
    (function(root, factory) {
      "use strict";
      if (typeof exports === "object") {
        root.slip = exports;
        factory(exports);
      } else if (typeof define === "function" && define.amd) {
        define(["exports"], function(exports) {
          root.slip = exports;
          return (root.slip, factory(exports));
        });
      } else {
        root.slip = {};
        factory(root.slip);
      }
    }(this, function(exports) {
      "use strict";
      var slip = exports;
      slip.END = 192;
      slip.ESC = 219;
      slip.ESC_END = 220;
      slip.ESC_ESC = 221;
      slip.byteArray = function(data, offset, length) {
        return data instanceof ArrayBuffer ? new Uint8Array(data, offset, length) : data;
      };
      slip.expandByteArray = function(arr) {
        var expanded = new Uint8Array(arr.length * 2);
        expanded.set(arr);
        return expanded;
      };
      slip.sliceByteArray = function(arr, start, end) {
        var sliced = arr.buffer.slice ? arr.buffer.slice(start, end) : arr.subarray(start, end);
        return new Uint8Array(sliced);
      };
      slip.encode = function(data, o) {
        o = o || {};
        o.bufferPadding = o.bufferPadding || 4;
        data = slip.byteArray(data, o.offset, o.byteLength);
        var bufLen = (data.length + o.bufferPadding + 3) & ~0x03,
            encoded = new Uint8Array(bufLen),
            j = 1;
        encoded[0] = slip.END;
        for (var i = 0; i < data.length; i++) {
          if (j > encoded.length - 3) {
            encoded = slip.expandByteArray(encoded);
          }
          var val = data[i];
          if (val === slip.END) {
            encoded[j++] = slip.ESC;
            val = slip.ESC_END;
          } else if (val === slip.ESC) {
            encoded[j++] = slip.ESC;
            val = slip.ESC_ESC;
          }
          encoded[j++] = val;
        }
        encoded[j] = slip.END;
        return slip.sliceByteArray(encoded, 0, j + 1);
      };
      slip.Decoder = function(o) {
        o = typeof o !== "function" ? o || {} : {onMessage: o};
        this.maxMessageSize = o.maxMessageSize || 10485760;
        this.bufferSize = o.bufferSize || 1024;
        this.msgBuffer = new Uint8Array(this.bufferSize);
        this.msgBufferIdx = 0;
        this.onMessage = o.onMessage;
        this.onError = o.onError;
        this.escape = false;
      };
      var p = slip.Decoder.prototype;
      p.decode = function(data) {
        data = slip.byteArray(data);
        var msg;
        for (var i = 0; i < data.length; i++) {
          var val = data[i];
          if (this.escape) {
            if (val === slip.ESC_ESC) {
              val = slip.ESC;
            } else if (val === slip.ESC_END) {
              val = slip.END;
            }
          } else {
            if (val === slip.ESC) {
              this.escape = true;
              continue;
            }
            if (val === slip.END) {
              msg = this.handleEnd();
              continue;
            }
          }
          var more = this.addByte(val);
          if (!more) {
            this.handleMessageMaxError();
          }
        }
        return msg;
      };
      p.handleMessageMaxError = function() {
        if (this.onError) {
          this.onError(this.msgBuffer.subarray(0), "The message is too large; the maximum message size is " + this.maxMessageSize / 1024 + "KB. Use a larger maxMessageSize if necessary.");
        }
        this.msgBufferIdx = 0;
        this.escape = false;
      };
      p.addByte = function(val) {
        if (this.msgBufferIdx > this.msgBuffer.length - 1) {
          this.msgBuffer = slip.expandByteArray(this.msgBuffer);
        }
        this.msgBuffer[this.msgBufferIdx++] = val;
        this.escape = false;
        return this.msgBuffer.length < this.maxMessageSize;
      };
      p.handleEnd = function() {
        if (this.msgBufferIdx === 0) {
          return;
        }
        var msg = slip.sliceByteArray(this.msgBuffer, 0, this.msgBufferIdx);
        if (this.onMessage) {
          this.onMessage(msg);
        }
        this.msgBufferIdx = 0;
        return msg;
      };
      return slip;
    }));
  })($__require('c').Buffer);
  return module.exports;
});

$__System.registerDynamic("e", ["d"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('d');
  return module.exports;
});

$__System.registerDynamic("f", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || undefined;
  }
  module.exports = EventEmitter;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;
  EventEmitter.defaultMaxListeners = 10;
  EventEmitter.prototype.setMaxListeners = function(n) {
    if (!isNumber(n) || n < 0 || isNaN(n))
      throw TypeError('n must be a positive number');
    this._maxListeners = n;
    return this;
  };
  EventEmitter.prototype.emit = function(type) {
    var er,
        handler,
        len,
        args,
        i,
        listeners;
    if (!this._events)
      this._events = {};
    if (type === 'error') {
      if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er;
        }
        throw TypeError('Uncaught, unspecified "error" event.');
      }
    }
    handler = this._events[type];
    if (isUndefined(handler))
      return false;
    if (isFunction(handler)) {
      switch (arguments.length) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          len = arguments.length;
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      len = arguments.length;
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }
    return true;
  };
  EventEmitter.prototype.addListener = function(type, listener) {
    var m;
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
    if (!this._events)
      this._events = {};
    if (this._events.newListener)
      this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);
    if (!this._events[type])
      this._events[type] = listener;
    else if (isObject(this._events[type]))
      this._events[type].push(listener);
    else
      this._events[type] = [this._events[type], listener];
    if (isObject(this._events[type]) && !this._events[type].warned) {
      var m;
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }
      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
        if (typeof console.trace === 'function') {
          console.trace();
        }
      }
    }
    return this;
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.once = function(type, listener) {
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
    var fired = false;
    function g() {
      this.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }
    g.listener = listener;
    this.on(type, g);
    return this;
  };
  EventEmitter.prototype.removeListener = function(type, listener) {
    var list,
        position,
        length,
        i;
    if (!isFunction(listener))
      throw TypeError('listener must be a function');
    if (!this._events || !this._events[type])
      return this;
    list = this._events[type];
    length = list.length;
    position = -1;
    if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
      delete this._events[type];
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    } else if (isObject(list)) {
      for (i = length; i-- > 0; ) {
        if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }
      if (position < 0)
        return this;
      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function(type) {
    var key,
        listeners;
    if (!this._events)
      return this;
    if (!this._events.removeListener) {
      if (arguments.length === 0)
        this._events = {};
      else if (this._events[type])
        delete this._events[type];
      return this;
    }
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === 'removeListener')
          continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = {};
      return this;
    }
    listeners = this._events[type];
    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else {
      while (listeners.length)
        this.removeListener(type, listeners[listeners.length - 1]);
    }
    delete this._events[type];
    return this;
  };
  EventEmitter.prototype.listeners = function(type) {
    var ret;
    if (!this._events || !this._events[type])
      ret = [];
    else if (isFunction(this._events[type]))
      ret = [this._events[type]];
    else
      ret = this._events[type].slice();
    return ret;
  };
  EventEmitter.listenerCount = function(emitter, type) {
    var ret;
    if (!emitter._events || !emitter._events[type])
      ret = 0;
    else if (isFunction(emitter._events[type]))
      ret = 1;
    else
      ret = emitter._events[type].length;
    return ret;
  };
  function isFunction(arg) {
    return typeof arg === 'function';
  }
  function isNumber(arg) {
    return typeof arg === 'number';
  }
  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
  return module.exports;
});

$__System.registerDynamic("10", ["f"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('f');
  return module.exports;
});

$__System.registerDynamic("11", ["10"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__System._nodeRequire ? $__System._nodeRequire('events') : $__require('10');
  return module.exports;
});

$__System.registerDynamic("12", ["11"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('11');
  return module.exports;
});

$__System.registerDynamic("13", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  ;
  (function(exports) {
    'use strict';
    var Arr = (typeof Uint8Array !== 'undefined') ? Uint8Array : Array;
    var PLUS = '+'.charCodeAt(0);
    var SLASH = '/'.charCodeAt(0);
    var NUMBER = '0'.charCodeAt(0);
    var LOWER = 'a'.charCodeAt(0);
    var UPPER = 'A'.charCodeAt(0);
    var PLUS_URL_SAFE = '-'.charCodeAt(0);
    var SLASH_URL_SAFE = '_'.charCodeAt(0);
    function decode(elt) {
      var code = elt.charCodeAt(0);
      if (code === PLUS || code === PLUS_URL_SAFE)
        return 62;
      if (code === SLASH || code === SLASH_URL_SAFE)
        return 63;
      if (code < NUMBER)
        return -1;
      if (code < NUMBER + 10)
        return code - NUMBER + 26 + 26;
      if (code < UPPER + 26)
        return code - UPPER;
      if (code < LOWER + 26)
        return code - LOWER + 26;
    }
    function b64ToByteArray(b64) {
      var i,
          j,
          l,
          tmp,
          placeHolders,
          arr;
      if (b64.length % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
      }
      var len = b64.length;
      placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;
      arr = new Arr(b64.length * 3 / 4 - placeHolders);
      l = placeHolders > 0 ? b64.length - 4 : b64.length;
      var L = 0;
      function push(v) {
        arr[L++] = v;
      }
      for (i = 0, j = 0; i < l; i += 4, j += 3) {
        tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3));
        push((tmp & 0xFF0000) >> 16);
        push((tmp & 0xFF00) >> 8);
        push(tmp & 0xFF);
      }
      if (placeHolders === 2) {
        tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4);
        push(tmp & 0xFF);
      } else if (placeHolders === 1) {
        tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2);
        push((tmp >> 8) & 0xFF);
        push(tmp & 0xFF);
      }
      return arr;
    }
    function uint8ToBase64(uint8) {
      var i,
          extraBytes = uint8.length % 3,
          output = "",
          temp,
          length;
      function encode(num) {
        return lookup.charAt(num);
      }
      function tripletToBase64(num) {
        return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
      }
      for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
        temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
        output += tripletToBase64(temp);
      }
      switch (extraBytes) {
        case 1:
          temp = uint8[uint8.length - 1];
          output += encode(temp >> 2);
          output += encode((temp << 4) & 0x3F);
          output += '==';
          break;
        case 2:
          temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
          output += encode(temp >> 10);
          output += encode((temp >> 4) & 0x3F);
          output += encode((temp << 2) & 0x3F);
          output += '=';
          break;
      }
      return output;
    }
    exports.toByteArray = b64ToByteArray;
    exports.fromByteArray = uint8ToBase64;
  }(typeof exports === 'undefined' ? (this.base64js = {}) : exports));
  return module.exports;
});

$__System.registerDynamic("14", ["13"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('13');
  return module.exports;
});

$__System.registerDynamic("15", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e,
        m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? (nBytes - 1) : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : ((s ? -1 : 1) * Infinity);
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e,
        m,
        c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
    var i = isLE ? 0 : (nBytes - 1);
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
    buffer[offset + i - d] |= s * 128;
  };
  return module.exports;
});

$__System.registerDynamic("16", ["15"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('15');
  return module.exports;
});

$__System.registerDynamic("17", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var toString = {}.toString;
  module.exports = Array.isArray || function(arr) {
    return toString.call(arr) == '[object Array]';
  };
  return module.exports;
});

$__System.registerDynamic("18", ["17"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('17');
  return module.exports;
});

$__System.registerDynamic("19", ["14", "16", "18"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var base64 = $__require('14');
  var ieee754 = $__require('16');
  var isArray = $__require('18');
  exports.Buffer = Buffer;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  Buffer.poolSize = 8192;
  var rootParent = {};
  Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
  function typedArraySupport() {
    function Bar() {}
    try {
      var arr = new Uint8Array(1);
      arr.foo = function() {
        return 42;
      };
      arr.constructor = Bar;
      return arr.foo() === 42 && arr.constructor === Bar && typeof arr.subarray === 'function' && arr.subarray(1, 1).byteLength === 0;
    } catch (e) {
      return false;
    }
  }
  function kMaxLength() {
    return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
  }
  function Buffer(arg) {
    if (!(this instanceof Buffer)) {
      if (arguments.length > 1)
        return new Buffer(arg, arguments[1]);
      return new Buffer(arg);
    }
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      this.length = 0;
      this.parent = undefined;
    }
    if (typeof arg === 'number') {
      return fromNumber(this, arg);
    }
    if (typeof arg === 'string') {
      return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8');
    }
    return fromObject(this, arg);
  }
  function fromNumber(that, length) {
    that = allocate(that, length < 0 ? 0 : checked(length) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < length; i++) {
        that[i] = 0;
      }
    }
    return that;
  }
  function fromString(that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '')
      encoding = 'utf8';
    var length = byteLength(string, encoding) | 0;
    that = allocate(that, length);
    that.write(string, encoding);
    return that;
  }
  function fromObject(that, object) {
    if (Buffer.isBuffer(object))
      return fromBuffer(that, object);
    if (isArray(object))
      return fromArray(that, object);
    if (object == null) {
      throw new TypeError('must start with number, buffer, array or string');
    }
    if (typeof ArrayBuffer !== 'undefined') {
      if (object.buffer instanceof ArrayBuffer) {
        return fromTypedArray(that, object);
      }
      if (object instanceof ArrayBuffer) {
        return fromArrayBuffer(that, object);
      }
    }
    if (object.length)
      return fromArrayLike(that, object);
    return fromJsonObject(that, object);
  }
  function fromBuffer(that, buffer) {
    var length = checked(buffer.length) | 0;
    that = allocate(that, length);
    buffer.copy(that, 0, 0, length);
    return that;
  }
  function fromArray(that, array) {
    var length = checked(array.length) | 0;
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromTypedArray(that, array) {
    var length = checked(array.length) | 0;
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromArrayBuffer(that, array) {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      array.byteLength;
      that = Buffer._augment(new Uint8Array(array));
    } else {
      that = fromTypedArray(that, new Uint8Array(array));
    }
    return that;
  }
  function fromArrayLike(that, array) {
    var length = checked(array.length) | 0;
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromJsonObject(that, object) {
    var array;
    var length = 0;
    if (object.type === 'Buffer' && isArray(object.data)) {
      array = object.data;
      length = checked(array.length) | 0;
    }
    that = allocate(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
  } else {
    Buffer.prototype.length = undefined;
    Buffer.prototype.parent = undefined;
  }
  function allocate(that, length) {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      that = Buffer._augment(new Uint8Array(length));
      that.__proto__ = Buffer.prototype;
    } else {
      that.length = length;
      that._isBuffer = true;
    }
    var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1;
    if (fromPool)
      that.parent = rootParent;
    return that;
  }
  function checked(length) {
    if (length >= kMaxLength()) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
    }
    return length | 0;
  }
  function SlowBuffer(subject, encoding) {
    if (!(this instanceof SlowBuffer))
      return new SlowBuffer(subject, encoding);
    var buf = new Buffer(subject, encoding);
    delete buf.parent;
    return buf;
  }
  Buffer.isBuffer = function isBuffer(b) {
    return !!(b != null && b._isBuffer);
  };
  Buffer.compare = function compare(a, b) {
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
      throw new TypeError('Arguments must be Buffers');
    }
    if (a === b)
      return 0;
    var x = a.length;
    var y = b.length;
    var i = 0;
    var len = Math.min(x, y);
    while (i < len) {
      if (a[i] !== b[i])
        break;
      ++i;
    }
    if (i !== len) {
      x = a[i];
      y = b[i];
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'binary':
      case 'base64':
      case 'raw':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true;
      default:
        return false;
    }
  };
  Buffer.concat = function concat(list, length) {
    if (!isArray(list))
      throw new TypeError('list argument must be an Array of Buffers.');
    if (list.length === 0) {
      return new Buffer(0);
    }
    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; i++) {
        length += list[i].length;
      }
    }
    var buf = new Buffer(length);
    var pos = 0;
    for (i = 0; i < list.length; i++) {
      var item = list[i];
      item.copy(buf, pos);
      pos += item.length;
    }
    return buf;
  };
  function byteLength(string, encoding) {
    if (typeof string !== 'string')
      string = '' + string;
    var len = string.length;
    if (len === 0)
      return 0;
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case 'ascii':
        case 'binary':
        case 'raw':
        case 'raws':
          return len;
        case 'utf8':
        case 'utf-8':
          return utf8ToBytes(string).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2;
        case 'hex':
          return len >>> 1;
        case 'base64':
          return base64ToBytes(string).length;
        default:
          if (loweredCase)
            return utf8ToBytes(string).length;
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    var loweredCase = false;
    start = start | 0;
    end = end === undefined || end === Infinity ? this.length : end | 0;
    if (!encoding)
      encoding = 'utf8';
    if (start < 0)
      start = 0;
    if (end > this.length)
      end = this.length;
    if (end <= start)
      return '';
    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end);
        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end);
        case 'ascii':
          return asciiSlice(this, start, end);
        case 'binary':
          return binarySlice(this, start, end);
        case 'base64':
          return base64Slice(this, start, end);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError('Unknown encoding: ' + encoding);
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.prototype.toString = function toString() {
    var length = this.length | 0;
    if (length === 0)
      return '';
    if (arguments.length === 0)
      return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b))
      throw new TypeError('Argument must be a Buffer');
    if (this === b)
      return true;
    return Buffer.compare(this, b) === 0;
  };
  Buffer.prototype.inspect = function inspect() {
    var str = '';
    var max = exports.INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
      if (this.length > max)
        str += ' ... ';
    }
    return '<Buffer ' + str + '>';
  };
  Buffer.prototype.compare = function compare(b) {
    if (!Buffer.isBuffer(b))
      throw new TypeError('Argument must be a Buffer');
    if (this === b)
      return 0;
    return Buffer.compare(this, b);
  };
  Buffer.prototype.indexOf = function indexOf(val, byteOffset) {
    if (byteOffset > 0x7fffffff)
      byteOffset = 0x7fffffff;
    else if (byteOffset < -0x80000000)
      byteOffset = -0x80000000;
    byteOffset >>= 0;
    if (this.length === 0)
      return -1;
    if (byteOffset >= this.length)
      return -1;
    if (byteOffset < 0)
      byteOffset = Math.max(this.length + byteOffset, 0);
    if (typeof val === 'string') {
      if (val.length === 0)
        return -1;
      return String.prototype.indexOf.call(this, val, byteOffset);
    }
    if (Buffer.isBuffer(val)) {
      return arrayIndexOf(this, val, byteOffset);
    }
    if (typeof val === 'number') {
      if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
        return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
      }
      return arrayIndexOf(this, [val], byteOffset);
    }
    function arrayIndexOf(arr, val, byteOffset) {
      var foundIndex = -1;
      for (var i = 0; byteOffset + i < arr.length; i++) {
        if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === val.length)
            return byteOffset + foundIndex;
        } else {
          foundIndex = -1;
        }
      }
      return -1;
    }
    throw new TypeError('val must be string, number or Buffer');
  };
  Buffer.prototype.get = function get(offset) {
    console.log('.get() is deprecated. Access using array indexes instead.');
    return this.readUInt8(offset);
  };
  Buffer.prototype.set = function set(v, offset) {
    console.log('.set() is deprecated. Access using array indexes instead.');
    return this.writeUInt8(v, offset);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (strLen % 2 !== 0)
      throw new Error('Invalid hex string');
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; i++) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed))
        throw new Error('Invalid hex string');
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function binaryWrite(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer.prototype.write = function write(string, offset, length, encoding) {
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined)
          encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
    } else {
      var swap = encoding;
      encoding = offset;
      offset = length | 0;
      length = swap;
    }
    var remaining = this.length - offset;
    if (length === undefined || length > remaining)
      length = remaining;
    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError('attempt to write outside buffer bounds');
    }
    if (!encoding)
      encoding = 'utf8';
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length);
        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length);
        case 'ascii':
          return asciiWrite(this, string, offset, length);
        case 'binary':
          return binaryWrite(this, string, offset, length);
        case 'base64':
          return base64Write(this, string, offset, length);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase)
            throw new TypeError('Unknown encoding: ' + encoding);
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer.prototype.toJSON = function toJSON() {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = (firstByte > 0xEF) ? 4 : (firstByte > 0xDF) ? 3 : (firstByte > 0xBF) ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte,
            thirdByte,
            fourthByte,
            tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 0x1000;
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    var res = '';
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);
    for (var i = start; i < end; i++) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret;
  }
  function binarySlice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);
    for (var i = start; i < end; i++) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    var out = '';
    for (var i = start; i < end; i++) {
      out += toHex(buf[i]);
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = Buffer._augment(this.subarray(start, end));
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);
      for (var i = 0; i < sliceLen; i++) {
        newBuf[i] = this[i + start];
      }
    }
    if (newBuf.length)
      newBuf.parent = this.parent || this;
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0)
      throw new RangeError('offset is not uint');
    if (offset + ext > length)
      throw new RangeError('Trying to access beyond buffer length');
  }
  Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }
    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }
    return val;
  };
  Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] | (this[offset + 1] << 8);
  };
  Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return (this[offset] << 8) | this[offset + 1];
  };
  Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ((this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16)) + (this[offset + 3] * 0x1000000);
  };
  Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] * 0x1000000) + ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]);
  };
  Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength);
    return val;
  };
  Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkOffset(offset, byteLength, this.length);
    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength);
    return val;
  };
  Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80))
      return (this[offset]);
    return ((0xff - this[offset] + 1) * -1);
  };
  Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    var val = this[offset] | (this[offset + 1] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val;
  };
  Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | (this[offset] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val;
  };
  Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24);
  };
  Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | (this[offset + 3]);
  };
  Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf))
      throw new TypeError('buffer must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('value is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError('index out of range');
  }
  Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert)
      checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);
    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT)
      value = Math.floor(value);
    this[offset] = (value & 0xff);
    return offset + 1;
  };
  function objectWriteUInt16(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 0xffff + value + 1;
    for (var i = 0,
        j = Math.min(buf.length - offset, 2); i < j; i++) {
      buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>> (littleEndian ? i : 1 - i) * 8;
    }
  }
  Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
  };
  Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
  };
  function objectWriteUInt32(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 0xffffffff + value + 1;
    for (var i = 0,
        j = Math.min(buf.length - offset, 4); i < j; i++) {
      buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
    }
  }
  Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = (value >>> 24);
      this[offset + 2] = (value >>> 16);
      this[offset + 1] = (value >>> 8);
      this[offset] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
  };
  Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
  };
  Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = value < 0 ? 1 : 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = byteLength - 1;
    var mul = 1;
    var sub = value < 0 ? 1 : 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT)
      value = Math.floor(value);
    if (value < 0)
      value = 0xff + value + 1;
    this[offset] = (value & 0xff);
    return offset + 1;
  };
  Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2;
  };
  Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2;
  };
  Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
      this[offset + 2] = (value >>> 16);
      this[offset + 3] = (value >>> 24);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4;
  };
  Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0)
      value = 0xffffffff + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4;
  };
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (value > max || value < min)
      throw new RangeError('value is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError('index out of range');
    if (offset < 0)
      throw new RangeError('index out of range');
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds');
    }
    if (start < 0 || start >= this.length)
      throw new RangeError('sourceStart out of bounds');
    if (end < 0)
      throw new RangeError('sourceEnd out of bounds');
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    var len = end - start;
    var i;
    if (this === target && start < targetStart && targetStart < end) {
      for (i = len - 1; i >= 0; i--) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      for (i = 0; i < len; i++) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      target._set(this.subarray(start, start + len), targetStart);
    }
    return len;
  };
  Buffer.prototype.fill = function fill(value, start, end) {
    if (!value)
      value = 0;
    if (!start)
      start = 0;
    if (!end)
      end = this.length;
    if (end < start)
      throw new RangeError('end < start');
    if (end === start)
      return;
    if (this.length === 0)
      return;
    if (start < 0 || start >= this.length)
      throw new RangeError('start out of bounds');
    if (end < 0 || end > this.length)
      throw new RangeError('end out of bounds');
    var i;
    if (typeof value === 'number') {
      for (i = start; i < end; i++) {
        this[i] = value;
      }
    } else {
      var bytes = utf8ToBytes(value.toString());
      var len = bytes.length;
      for (i = start; i < end; i++) {
        this[i] = bytes[i % len];
      }
    }
    return this;
  };
  Buffer.prototype.toArrayBuffer = function toArrayBuffer() {
    if (typeof Uint8Array !== 'undefined') {
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        return (new Buffer(this)).buffer;
      } else {
        var buf = new Uint8Array(this.length);
        for (var i = 0,
            len = buf.length; i < len; i += 1) {
          buf[i] = this[i];
        }
        return buf.buffer;
      }
    } else {
      throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
    }
  };
  var BP = Buffer.prototype;
  Buffer._augment = function _augment(arr) {
    arr.constructor = Buffer;
    arr._isBuffer = true;
    arr._set = arr.set;
    arr.get = BP.get;
    arr.set = BP.set;
    arr.write = BP.write;
    arr.toString = BP.toString;
    arr.toLocaleString = BP.toString;
    arr.toJSON = BP.toJSON;
    arr.equals = BP.equals;
    arr.compare = BP.compare;
    arr.indexOf = BP.indexOf;
    arr.copy = BP.copy;
    arr.slice = BP.slice;
    arr.readUIntLE = BP.readUIntLE;
    arr.readUIntBE = BP.readUIntBE;
    arr.readUInt8 = BP.readUInt8;
    arr.readUInt16LE = BP.readUInt16LE;
    arr.readUInt16BE = BP.readUInt16BE;
    arr.readUInt32LE = BP.readUInt32LE;
    arr.readUInt32BE = BP.readUInt32BE;
    arr.readIntLE = BP.readIntLE;
    arr.readIntBE = BP.readIntBE;
    arr.readInt8 = BP.readInt8;
    arr.readInt16LE = BP.readInt16LE;
    arr.readInt16BE = BP.readInt16BE;
    arr.readInt32LE = BP.readInt32LE;
    arr.readInt32BE = BP.readInt32BE;
    arr.readFloatLE = BP.readFloatLE;
    arr.readFloatBE = BP.readFloatBE;
    arr.readDoubleLE = BP.readDoubleLE;
    arr.readDoubleBE = BP.readDoubleBE;
    arr.writeUInt8 = BP.writeUInt8;
    arr.writeUIntLE = BP.writeUIntLE;
    arr.writeUIntBE = BP.writeUIntBE;
    arr.writeUInt16LE = BP.writeUInt16LE;
    arr.writeUInt16BE = BP.writeUInt16BE;
    arr.writeUInt32LE = BP.writeUInt32LE;
    arr.writeUInt32BE = BP.writeUInt32BE;
    arr.writeIntLE = BP.writeIntLE;
    arr.writeIntBE = BP.writeIntBE;
    arr.writeInt8 = BP.writeInt8;
    arr.writeInt16LE = BP.writeInt16LE;
    arr.writeInt16BE = BP.writeInt16BE;
    arr.writeInt32LE = BP.writeInt32LE;
    arr.writeInt32BE = BP.writeInt32BE;
    arr.writeFloatLE = BP.writeFloatLE;
    arr.writeFloatBE = BP.writeFloatBE;
    arr.writeDoubleLE = BP.writeDoubleLE;
    arr.writeDoubleBE = BP.writeDoubleBE;
    arr.fill = BP.fill;
    arr.inspect = BP.inspect;
    arr.toArrayBuffer = BP.toArrayBuffer;
    return arr;
  };
  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    if (str.length < 2)
      return '';
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str;
  }
  function stringtrim(str) {
    if (str.trim)
      return str.trim();
    return str.replace(/^\s+|\s+$/g, '');
  }
  function toHex(n) {
    if (n < 16)
      return '0' + n.toString(16);
    return n.toString(16);
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; i++) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        if (!leadSurrogate) {
          if (codePoint > 0xDBFF) {
            if ((units -= 3) > -1)
              bytes.push(0xEF, 0xBF, 0xBD);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(0xEF, 0xBF, 0xBD);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1)
            bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(0xEF, 0xBF, 0xBD);
      }
      leadSurrogate = null;
      if (codePoint < 0x80) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0)
          break;
        bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0)
          break;
        bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0)
          break;
        bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
      } else {
        throw new Error('Invalid code point');
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; i++) {
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c,
        hi,
        lo;
    var byteArray = [];
    for (var i = 0; i < str.length; i++) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; i++) {
      if ((i + offset >= dst.length) || (i >= src.length))
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  return module.exports;
});

$__System.registerDynamic("1a", ["19"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('19');
  return module.exports;
});

$__System.registerDynamic("1b", ["1a"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__System._nodeRequire ? $__System._nodeRequire('buffer') : $__require('1a');
  return module.exports;
});

$__System.registerDynamic("c", ["1b"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('1b');
  return module.exports;
});

$__System.registerDynamic("1c", ["a", "b", "e", "12", "c", "9"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  (function(Buffer, process) {
    var osc = osc || {};
    (function() {
      "use strict";
      osc.SECS_70YRS = 2208988800;
      osc.TWO_32 = 4294967296;
      osc.defaults = {
        metadata: false,
        unpackSingleArgs: true
      };
      osc.isBufferEnv = typeof Buffer !== "undefined";
      osc.isCommonJS = typeof module !== "undefined" && module.exports;
      osc.isNode = osc.isCommonJS && typeof window === "undefined";
      osc.isArray = function(obj) {
        return obj && Object.prototype.toString.call(obj) === "[object Array]";
      };
      osc.isTypedArrayView = function(obj) {
        return obj.buffer && obj.buffer instanceof ArrayBuffer;
      };
      osc.isBuffer = function(obj) {
        return osc.isBufferEnv && obj instanceof Buffer;
      };
      var Long = typeof dcodeIO !== "undefined" ? dcodeIO.Long : typeof Long !== "undefined" ? Long : osc.isNode ? $__require('a') : undefined;
      osc.dataView = function(obj, offset, length) {
        if (obj.buffer) {
          return new DataView(obj.buffer, offset, length);
        }
        if (obj instanceof ArrayBuffer) {
          return new DataView(obj, offset, length);
        }
        return new DataView(new Uint8Array(obj), offset, length);
      };
      osc.byteArray = function(obj) {
        if (obj instanceof Uint8Array) {
          return obj;
        }
        var buf = obj.buffer ? obj.buffer : obj;
        if (!(buf instanceof ArrayBuffer) && (typeof buf.length === "undefined" || typeof buf === "string")) {
          throw new Error("Can't wrap a non-array-like object as Uint8Array. Object was: " + JSON.stringify(obj, null, 2));
        }
        return new Uint8Array(buf);
      };
      osc.nativeBuffer = function(obj) {
        if (osc.isBufferEnv && osc.isNode) {
          return osc.isBuffer(obj) ? obj : new Buffer(obj.buffer ? obj : new Uint8Array(obj));
        }
        return osc.isTypedArrayView(obj) ? obj : new Uint8Array(obj);
      };
      osc.copyByteArray = function(source, target, offset) {
        if (osc.isTypedArrayView(source) && osc.isTypedArrayView(target)) {
          target.set(source, offset);
        } else {
          var start = offset === undefined ? 0 : offset,
              len = Math.min(target.length - offset, source.length);
          for (var i = 0,
              j = start; i < len; i++, j++) {
            target[j] = source[i];
          }
        }
        return target;
      };
      osc.readString = function(dv, offsetState) {
        var charCodes = [],
            idx = offsetState.idx;
        for (; idx < dv.byteLength; idx++) {
          var charCode = dv.getUint8(idx);
          if (charCode !== 0) {
            charCodes.push(charCode);
          } else {
            idx++;
            break;
          }
        }
        idx = (idx + 3) & ~0x03;
        offsetState.idx = idx;
        return String.fromCharCode.apply(null, charCodes);
      };
      osc.writeString = function(str) {
        var terminated = str + "\u0000",
            len = terminated.length,
            paddedLen = (len + 3) & ~0x03,
            arr = new Uint8Array(paddedLen);
        for (var i = 0; i < terminated.length; i++) {
          var charCode = terminated.charCodeAt(i);
          arr[i] = charCode;
        }
        return arr;
      };
      osc.readPrimitive = function(dv, readerName, numBytes, offsetState) {
        var val = dv[readerName](offsetState.idx, false);
        offsetState.idx += numBytes;
        return val;
      };
      osc.writePrimitive = function(val, dv, writerName, numBytes, offset) {
        offset = offset === undefined ? 0 : offset;
        var arr;
        if (!dv) {
          arr = new Uint8Array(numBytes);
          dv = new DataView(arr.buffer);
        } else {
          arr = new Uint8Array(dv.buffer);
        }
        dv[writerName](offset, val, false);
        return arr;
      };
      osc.readInt32 = function(dv, offsetState) {
        return osc.readPrimitive(dv, "getInt32", 4, offsetState);
      };
      osc.writeInt32 = function(val, dv, offset) {
        return osc.writePrimitive(val, dv, "setInt32", 4, offset);
      };
      osc.readInt64 = function(dv, offsetState) {
        var high = osc.readPrimitive(dv, "getInt32", 4, offsetState),
            low = osc.readPrimitive(dv, "getInt32", 4, offsetState);
        if (Long) {
          return new Long(low, high);
        } else {
          return {
            high: high,
            low: low,
            unsigned: false
          };
        }
      };
      osc.writeInt64 = function(val, dv, offset) {
        var arr = new Uint8Array(8);
        arr.set(osc.writePrimitive(val.high, dv, "setInt32", 4, offset), 0);
        arr.set(osc.writePrimitive(val.low, dv, "setInt32", 4, offset + 4), 4);
        return arr;
      };
      osc.readFloat32 = function(dv, offsetState) {
        return osc.readPrimitive(dv, "getFloat32", 4, offsetState);
      };
      osc.writeFloat32 = function(val, dv, offset) {
        return osc.writePrimitive(val, dv, "setFloat32", 4, offset);
      };
      osc.readFloat64 = function(dv, offsetState) {
        return osc.readPrimitive(dv, "getFloat64", 8, offsetState);
      };
      osc.writeFloat64 = function(val, dv, offset) {
        return osc.writePrimitive(val, dv, "setFloat64", 8, offset);
      };
      osc.readChar32 = function(dv, offsetState) {
        var charCode = osc.readPrimitive(dv, "getUint32", 4, offsetState);
        return String.fromCharCode(charCode);
      };
      osc.writeChar32 = function(str, dv, offset) {
        var charCode = str.charCodeAt(0);
        if (charCode === undefined || charCode < -1) {
          return undefined;
        }
        return osc.writePrimitive(charCode, dv, "setUint32", 4, offset);
      };
      osc.readBlob = function(dv, offsetState) {
        var len = osc.readInt32(dv, offsetState),
            paddedLen = (len + 3) & ~0x03,
            blob = new Uint8Array(dv.buffer, offsetState.idx, len);
        offsetState.idx += paddedLen;
        return blob;
      };
      osc.writeBlob = function(data) {
        data = osc.byteArray(data);
        var len = data.byteLength,
            paddedLen = (len + 3) & ~0x03,
            offset = 4,
            blobLen = paddedLen + offset,
            arr = new Uint8Array(blobLen),
            dv = new DataView(arr.buffer);
        osc.writeInt32(len, dv);
        arr.set(data, offset);
        return arr;
      };
      osc.readMIDIBytes = function(dv, offsetState) {
        var midi = new Uint8Array(dv.buffer, offsetState.idx, 4);
        offsetState.idx += 4;
        return midi;
      };
      osc.writeMIDIBytes = function(bytes) {
        bytes = osc.byteArray(bytes);
        var arr = new Uint8Array(4);
        arr.set(bytes);
        return arr;
      };
      osc.readColor = function(dv, offsetState) {
        var bytes = new Uint8Array(dv.buffer, offsetState.idx, 4),
            alpha = bytes[3] / 255;
        offsetState.idx += 4;
        return {
          r: bytes[0],
          g: bytes[1],
          b: bytes[2],
          a: alpha
        };
      };
      osc.writeColor = function(color) {
        var alpha = Math.round(color.a * 255),
            arr = new Uint8Array([color.r, color.g, color.b, alpha]);
        return arr;
      };
      osc.readTrue = function() {
        return true;
      };
      osc.readFalse = function() {
        return false;
      };
      osc.readNull = function() {
        return null;
      };
      osc.readImpulse = function() {
        return 1.0;
      };
      osc.readTimeTag = function(dv, offsetState) {
        var secs1900 = osc.readPrimitive(dv, "getUint32", 4, offsetState),
            frac = osc.readPrimitive(dv, "getUint32", 4, offsetState),
            native = (secs1900 === 0 && frac === 1) ? Date.now() : osc.ntpToJSTime(secs1900, frac);
        return {
          raw: [secs1900, frac],
          native: native
        };
      };
      osc.writeTimeTag = function(timeTag) {
        var raw = timeTag.raw ? timeTag.raw : osc.jsToNTPTime(timeTag.native),
            arr = new Uint8Array(8),
            dv = new DataView(arr.buffer);
        osc.writeInt32(raw[0], dv, 0);
        osc.writeInt32(raw[1], dv, 4);
        return arr;
      };
      osc.timeTag = function(secs, now) {
        secs = secs || 0;
        now = now || Date.now();
        var nowSecs = now / 1000,
            nowWhole = Math.floor(nowSecs),
            nowFracs = nowSecs - nowWhole,
            secsWhole = Math.floor(secs),
            secsFracs = secs - secsWhole,
            fracs = nowFracs + secsFracs;
        if (fracs > 1) {
          var fracsWhole = Math.floor(fracs),
              fracsFracs = fracs - fracsWhole;
          secsWhole += fracsWhole;
          fracs = fracsFracs;
        }
        var ntpSecs = nowWhole + secsWhole + osc.SECS_70YRS,
            ntpFracs = Math.round(osc.TWO_32 * fracs);
        return {raw: [ntpSecs, ntpFracs]};
      };
      osc.ntpToJSTime = function(secs1900, frac) {
        var secs1970 = secs1900 - osc.SECS_70YRS,
            decimals = frac / osc.TWO_32,
            msTime = (secs1970 + decimals) * 1000;
        return msTime;
      };
      osc.jsToNTPTime = function(jsTime) {
        var secs = jsTime / 1000,
            secsWhole = Math.floor(secs),
            secsFrac = secs - secsWhole,
            ntpSecs = secsWhole + osc.SECS_70YRS,
            ntpFracs = Math.round(osc.TWO_32 * secsFrac);
        return [ntpSecs, ntpFracs];
      };
      osc.readArguments = function(dv, options, offsetState) {
        var typeTagString = osc.readString(dv, offsetState);
        if (typeTagString.indexOf(",") !== 0) {
          throw new Error("A malformed type tag string was found while reading " + "the arguments of an OSC message. String was: " + typeTagString, " at offset: " + offsetState.idx);
        }
        var argTypes = typeTagString.substring(1).split(""),
            args = [];
        osc.readArgumentsIntoArray(args, argTypes, typeTagString, dv, options, offsetState);
        return args;
      };
      osc.readArgument = function(argType, typeTagString, dv, options, offsetState) {
        var typeSpec = osc.argumentTypes[argType];
        if (!typeSpec) {
          throw new Error("'" + argType + "' is not a valid OSC type tag. Type tag string was: " + typeTagString);
        }
        var argReader = typeSpec.reader,
            arg = osc[argReader](dv, offsetState);
        if (options.metadata) {
          arg = {
            type: argType,
            value: arg
          };
        }
        return arg;
      };
      osc.readArgumentsIntoArray = function(arr, argTypes, typeTagString, dv, options, offsetState) {
        var i = 0;
        while (i < argTypes.length) {
          var argType = argTypes[i],
              arg;
          if (argType === "[") {
            var fromArrayOpen = argTypes.slice(i + 1),
                endArrayIdx = fromArrayOpen.indexOf("]");
            if (endArrayIdx < 0) {
              throw new Error("Invalid argument type tag: an open array type tag ('[') was found " + "without a matching close array tag ('[]'). Type tag was: " + typeTagString);
            }
            var typesInArray = fromArrayOpen.slice(0, endArrayIdx);
            arg = osc.readArgumentsIntoArray([], typesInArray, typeTagString, dv, options, offsetState);
            i += endArrayIdx + 2;
          } else {
            arg = osc.readArgument(argType, typeTagString, dv, options, offsetState);
            i++;
          }
          arr.push(arg);
        }
        return arr;
      };
      osc.writeArguments = function(args, options) {
        var argCollection = osc.collectArguments(args, options);
        return osc.joinParts(argCollection);
      };
      osc.joinParts = function(dataCollection) {
        var buf = new Uint8Array(dataCollection.byteLength),
            parts = dataCollection.parts,
            offset = 0;
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          osc.copyByteArray(part, buf, offset);
          offset += part.length;
        }
        return buf;
      };
      osc.addDataPart = function(dataPart, dataCollection) {
        dataCollection.parts.push(dataPart);
        dataCollection.byteLength += dataPart.length;
      };
      osc.writeArrayArguments = function(args, dataCollection) {
        var typeTag = "[";
        for (var i = 0; i < args.length; i++) {
          var arg = args[i];
          typeTag += osc.writeArgument(arg, dataCollection);
        }
        typeTag += "]";
        return typeTag;
      };
      osc.writeArgument = function(arg, dataCollection) {
        if (osc.isArray(arg)) {
          return osc.writeArrayArguments(arg, dataCollection);
        }
        var type = arg.type,
            writer = osc.argumentTypes[type].writer;
        if (writer) {
          var data = osc[writer](arg.value);
          osc.addDataPart(data, dataCollection);
        }
        return arg.type;
      };
      osc.collectArguments = function(args, options, dataCollection) {
        if (!osc.isArray(args)) {
          args = typeof args === "undefined" ? [] : [args];
        }
        dataCollection = dataCollection || {
          byteLength: 0,
          parts: []
        };
        if (!options.metadata) {
          args = osc.annotateArguments(args);
        }
        var typeTagString = ",",
            currPartIdx = dataCollection.parts.length;
        for (var i = 0; i < args.length; i++) {
          var arg = args[i];
          typeTagString += osc.writeArgument(arg, dataCollection);
        }
        var typeData = osc.writeString(typeTagString);
        dataCollection.byteLength += typeData.byteLength;
        dataCollection.parts.splice(currPartIdx, 0, typeData);
        return dataCollection;
      };
      osc.readMessage = function(data, options, offsetState) {
        options = options || osc.defaults;
        var dv = osc.dataView(data, data.byteOffset, data.byteLength);
        offsetState = offsetState || {idx: 0};
        var address = osc.readString(dv, offsetState);
        return osc.readMessageContents(address, dv, options, offsetState);
      };
      osc.readMessageContents = function(address, dv, options, offsetState) {
        if (address.indexOf("/") !== 0) {
          throw new Error("A malformed OSC address was found while reading " + "an OSC message. String was: " + address);
        }
        var args = osc.readArguments(dv, options, offsetState);
        return {
          address: address,
          args: args.length === 1 && options.unpackSingleArgs ? args[0] : args
        };
      };
      osc.collectMessageParts = function(msg, options, dataCollection) {
        dataCollection = dataCollection || {
          byteLength: 0,
          parts: []
        };
        osc.addDataPart(osc.writeString(msg.address), dataCollection);
        return osc.collectArguments(msg.args, options, dataCollection);
      };
      osc.writeMessage = function(msg, options) {
        options = options || osc.defaults;
        if (!osc.isValidMessage(msg)) {
          throw new Error("An OSC message must contain a valid address. Message was: " + JSON.stringify(msg, null, 2));
        }
        var msgCollection = osc.collectMessageParts(msg, options);
        return osc.joinParts(msgCollection);
      };
      osc.isValidMessage = function(msg) {
        return msg.address && msg.address.indexOf("/") === 0;
      };
      osc.readBundle = function(dv, options, offsetState) {
        return osc.readPacket(dv, options, offsetState);
      };
      osc.collectBundlePackets = function(bundle, options, dataCollection) {
        dataCollection = dataCollection || {
          byteLength: 0,
          parts: []
        };
        osc.addDataPart(osc.writeString("#bundle"), dataCollection);
        osc.addDataPart(osc.writeTimeTag(bundle.timeTag), dataCollection);
        for (var i = 0; i < bundle.packets.length; i++) {
          var packet = bundle.packets[i],
              collector = packet.address ? osc.collectMessageParts : osc.collectBundlePackets,
              packetCollection = collector(packet, options);
          dataCollection.byteLength += packetCollection.byteLength;
          osc.addDataPart(osc.writeInt32(packetCollection.byteLength), dataCollection);
          dataCollection.parts = dataCollection.parts.concat(packetCollection.parts);
        }
        return dataCollection;
      };
      osc.writeBundle = function(bundle, options) {
        if (!osc.isValidBundle(bundle)) {
          throw new Error("An OSC bundle must contain 'timeTag' and 'packets' properties. " + "Bundle was: " + JSON.stringify(bundle, null, 2));
        }
        options = options || osc.defaults;
        var bundleCollection = osc.collectBundlePackets(bundle, options);
        return osc.joinParts(bundleCollection);
      };
      osc.isValidBundle = function(bundle) {
        return bundle.timeTag !== undefined && bundle.packets !== undefined;
      };
      osc.readBundleContents = function(dv, options, offsetState, len) {
        var timeTag = osc.readTimeTag(dv, offsetState),
            packets = [];
        while (offsetState.idx < len) {
          var packetSize = osc.readInt32(dv, offsetState),
              packetLen = offsetState.idx + packetSize,
              packet = osc.readPacket(dv, options, offsetState, packetLen);
          packets.push(packet);
        }
        return {
          timeTag: timeTag,
          packets: packets
        };
      };
      osc.readPacket = function(data, options, offsetState, len) {
        var dv = osc.dataView(data, data.byteOffset, data.byteLength);
        len = len === undefined ? dv.byteLength : len;
        offsetState = offsetState || {idx: 0};
        var header = osc.readString(dv, offsetState),
            firstChar = header[0];
        if (firstChar === "#") {
          return osc.readBundleContents(dv, options, offsetState, len);
        } else if (firstChar === "/") {
          return osc.readMessageContents(header, dv, options, offsetState);
        }
        throw new Error("The header of an OSC packet didn't contain an OSC address or a #bundle string." + " Header was: " + header);
      };
      osc.writePacket = function(packet, options) {
        if (osc.isValidMessage(packet)) {
          return osc.writeMessage(packet, options);
        } else if (osc.isValidBundle(packet)) {
          return osc.writeBundle(packet, options);
        } else {
          throw new Error("The specified packet was not recognized as a valid OSC message or bundle." + " Packet was: " + JSON.stringify(packet, null, 2));
        }
      };
      osc.argumentTypes = {
        i: {
          reader: "readInt32",
          writer: "writeInt32"
        },
        h: {
          reader: "readInt64",
          writer: "writeInt64"
        },
        f: {
          reader: "readFloat32",
          writer: "writeFloat32"
        },
        s: {
          reader: "readString",
          writer: "writeString"
        },
        S: {
          reader: "readString",
          writer: "writeString"
        },
        b: {
          reader: "readBlob",
          writer: "writeBlob"
        },
        t: {
          reader: "readTimeTag",
          writer: "writeTimeTag"
        },
        T: {reader: "readTrue"},
        F: {reader: "readFalse"},
        N: {reader: "readNull"},
        I: {reader: "readImpulse"},
        d: {
          reader: "readFloat64",
          writer: "writeFloat64"
        },
        c: {
          reader: "readChar32",
          writer: "writeChar32"
        },
        r: {
          reader: "readColor",
          writer: "writeColor"
        },
        m: {
          reader: "readMIDIBytes",
          writer: "writeMIDIBytes"
        }
      };
      osc.inferTypeForArgument = function(arg) {
        var type = typeof arg;
        switch (type) {
          case "boolean":
            return arg ? "T" : "F";
          case "string":
            return "s";
          case "number":
            return "f";
          case "undefined":
            return "N";
          case "object":
            if (arg === null) {
              return "N";
            } else if (arg instanceof Uint8Array || arg instanceof ArrayBuffer) {
              return "b";
            } else if (typeof arg.high === "number" && typeof arg.low === "number") {
              return "h";
            }
            break;
        }
        throw new Error("Can't infer OSC argument type for value: " + JSON.stringify(arg, null, 2));
      };
      osc.annotateArguments = function(args) {
        var annotated = [];
        for (var i = 0; i < args.length; i++) {
          var arg = args[i],
              msgArg;
          if (typeof(arg) === "object" && arg.type && arg.value !== undefined) {
            msgArg = arg;
          } else if (osc.isArray(arg)) {
            msgArg = osc.annotateArguments(arg);
          } else {
            var oscType = osc.inferTypeForArgument(arg);
            msgArg = {
              type: oscType,
              value: arg
            };
          }
          annotated.push(msgArg);
        }
        return annotated;
      };
      if (osc.isCommonJS) {
        module.exports = osc;
      }
    }());
    ;
    (function(global, factory) {
      if (typeof define === 'function' && define["amd"])
        define([], factory);
      else if (typeof $__require === 'function' && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
      else
        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();
    })(this, function() {
      "use strict";
      function Long(low, high, unsigned) {
        this.low = low | 0;
        this.high = high | 0;
        this.unsigned = !!unsigned;
      }
      Long.__isLong__;
      Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
      });
      function isLong(obj) {
        return (obj && obj["__isLong__"]) === true;
      }
      Long.isLong = isLong;
      var INT_CACHE = {};
      var UINT_CACHE = {};
      function fromInt(value, unsigned) {
        var obj,
            cachedObj,
            cache;
        if (unsigned) {
          value >>>= 0;
          if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
              return cachedObj;
          }
          obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
          if (cache)
            UINT_CACHE[value] = obj;
          return obj;
        } else {
          value |= 0;
          if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
              return cachedObj;
          }
          obj = fromBits(value, value < 0 ? -1 : 0, false);
          if (cache)
            INT_CACHE[value] = obj;
          return obj;
        }
      }
      Long.fromInt = fromInt;
      function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value))
          return unsigned ? UZERO : ZERO;
        if (unsigned) {
          if (value < 0)
            return UZERO;
          if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
        } else {
          if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
          if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
        }
        if (value < 0)
          return fromNumber(-value, unsigned).neg();
        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
      }
      Long.fromNumber = fromNumber;
      function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
      }
      Long.fromBits = fromBits;
      var pow_dbl = Math.pow;
      function fromString(str, unsigned, radix) {
        if (str.length === 0)
          throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
          return ZERO;
        if (typeof unsigned === 'number')
          radix = unsigned, unsigned = false;
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
          throw RangeError('radix');
        var p;
        if ((p = str.indexOf('-')) > 0)
          throw Error('interior hyphen');
        else if (p === 0) {
          return fromString(str.substring(1), unsigned, radix).neg();
        }
        var radixToPower = fromNumber(pow_dbl(radix, 8));
        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
          var size = Math.min(8, str.length - i),
              value = parseInt(str.substring(i, i + size), radix);
          if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
          } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
          }
        }
        result.unsigned = unsigned;
        return result;
      }
      Long.fromString = fromString;
      function fromValue(val) {
        if (val instanceof Long)
          return val;
        if (typeof val === 'number')
          return fromNumber(val);
        if (typeof val === 'string')
          return fromString(val);
        return fromBits(val.low, val.high, val.unsigned);
      }
      Long.fromValue = fromValue;
      var TWO_PWR_16_DBL = 1 << 16;
      var TWO_PWR_24_DBL = 1 << 24;
      var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
      var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
      var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
      var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
      var ZERO = fromInt(0);
      Long.ZERO = ZERO;
      var UZERO = fromInt(0, true);
      Long.UZERO = UZERO;
      var ONE = fromInt(1);
      Long.ONE = ONE;
      var UONE = fromInt(1, true);
      Long.UONE = UONE;
      var NEG_ONE = fromInt(-1);
      Long.NEG_ONE = NEG_ONE;
      var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
      Long.MAX_VALUE = MAX_VALUE;
      var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
      Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
      var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);
      Long.MIN_VALUE = MIN_VALUE;
      var LongPrototype = Long.prototype;
      LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
      };
      LongPrototype.toNumber = function toNumber() {
        if (this.unsigned)
          return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
      };
      LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
          throw RangeError('radix');
        if (this.isZero())
          return '0';
        if (this.isNegative()) {
          if (this.eq(MIN_VALUE)) {
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
          } else
            return '-' + this.neg().toString(radix);
        }
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
            rem = this;
        var result = '';
        while (true) {
          var remDiv = rem.div(radixToPower),
              intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
              digits = intval.toString(radix);
          rem = remDiv;
          if (rem.isZero())
            return digits + result;
          else {
            while (digits.length < 6)
              digits = '0' + digits;
            result = '' + digits + result;
          }
        }
      };
      LongPrototype.getHighBits = function getHighBits() {
        return this.high;
      };
      LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
      };
      LongPrototype.getLowBits = function getLowBits() {
        return this.low;
      };
      LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
      };
      LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative())
          return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
          if ((val & (1 << bit)) != 0)
            break;
        return this.high != 0 ? bit + 33 : bit + 1;
      };
      LongPrototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
      };
      LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
      };
      LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
      };
      LongPrototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
      };
      LongPrototype.isEven = function isEven() {
        return (this.low & 1) === 0;
      };
      LongPrototype.equals = function equals(other) {
        if (!isLong(other))
          other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
          return false;
        return this.high === other.high && this.low === other.low;
      };
      LongPrototype.eq = LongPrototype.equals;
      LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(other);
      };
      LongPrototype.neq = LongPrototype.notEquals;
      LongPrototype.lessThan = function lessThan(other) {
        return this.comp(other) < 0;
      };
      LongPrototype.lt = LongPrototype.lessThan;
      LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(other) <= 0;
      };
      LongPrototype.lte = LongPrototype.lessThanOrEqual;
      LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(other) > 0;
      };
      LongPrototype.gt = LongPrototype.greaterThan;
      LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(other) >= 0;
      };
      LongPrototype.gte = LongPrototype.greaterThanOrEqual;
      LongPrototype.compare = function compare(other) {
        if (!isLong(other))
          other = fromValue(other);
        if (this.eq(other))
          return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
          return -1;
        if (!thisNeg && otherNeg)
          return 1;
        if (!this.unsigned)
          return this.sub(other).isNegative() ? -1 : 1;
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
      };
      LongPrototype.comp = LongPrototype.compare;
      LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE))
          return MIN_VALUE;
        return this.not().add(ONE);
      };
      LongPrototype.neg = LongPrototype.negate;
      LongPrototype.add = function add(addend) {
        if (!isLong(addend))
          addend = fromValue(addend);
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;
        var c48 = 0,
            c32 = 0,
            c16 = 0,
            c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
      };
      LongPrototype.subtract = function subtract(subtrahend) {
        if (!isLong(subtrahend))
          subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
      };
      LongPrototype.sub = LongPrototype.subtract;
      LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero())
          return ZERO;
        if (!isLong(multiplier))
          multiplier = fromValue(multiplier);
        if (multiplier.isZero())
          return ZERO;
        if (this.eq(MIN_VALUE))
          return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
          return this.isOdd() ? MIN_VALUE : ZERO;
        if (this.isNegative()) {
          if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
          else
            return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
          return this.mul(multiplier.neg()).neg();
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
          return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;
        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;
        var c48 = 0,
            c32 = 0,
            c16 = 0,
            c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
      };
      LongPrototype.mul = LongPrototype.multiply;
      LongPrototype.divide = function divide(divisor) {
        if (!isLong(divisor))
          divisor = fromValue(divisor);
        if (divisor.isZero())
          throw Error('division by zero');
        if (this.isZero())
          return this.unsigned ? UZERO : ZERO;
        var approx,
            rem,
            res;
        if (this.eq(MIN_VALUE)) {
          if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
            return MIN_VALUE;
          else if (divisor.eq(MIN_VALUE))
            return ONE;
          else {
            var halfThis = this.shr(1);
            approx = halfThis.div(divisor).shl(1);
            if (approx.eq(ZERO)) {
              return divisor.isNegative() ? ONE : NEG_ONE;
            } else {
              rem = this.sub(divisor.mul(approx));
              res = approx.add(rem.div(divisor));
              return res;
            }
          }
        } else if (divisor.eq(MIN_VALUE))
          return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
          if (divisor.isNegative())
            return this.neg().div(divisor.neg());
          return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
          return this.div(divisor.neg()).neg();
        res = ZERO;
        rem = this;
        while (rem.gte(divisor)) {
          approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
          var log2 = Math.ceil(Math.log(approx) / Math.LN2),
              delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),
              approxRes = fromNumber(approx),
              approxRem = approxRes.mul(divisor);
          while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
          }
          if (approxRes.isZero())
            approxRes = ONE;
          res = res.add(approxRes);
          rem = rem.sub(approxRem);
        }
        return res;
      };
      LongPrototype.div = LongPrototype.divide;
      LongPrototype.modulo = function modulo(divisor) {
        if (!isLong(divisor))
          divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
      };
      LongPrototype.mod = LongPrototype.modulo;
      LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
      };
      LongPrototype.and = function and(other) {
        if (!isLong(other))
          other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
      };
      LongPrototype.or = function or(other) {
        if (!isLong(other))
          other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
      };
      LongPrototype.xor = function xor(other) {
        if (!isLong(other))
          other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
      };
      LongPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isLong(numBits))
          numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
          return this;
        else if (numBits < 32)
          return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
          return fromBits(0, this.low << (numBits - 32), this.unsigned);
      };
      LongPrototype.shl = LongPrototype.shiftLeft;
      LongPrototype.shiftRight = function shiftRight(numBits) {
        if (isLong(numBits))
          numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
          return this;
        else if (numBits < 32)
          return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
          return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
      };
      LongPrototype.shr = LongPrototype.shiftRight;
      LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isLong(numBits))
          numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
          return this;
        else {
          var high = this.high;
          if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
          } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
          else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
      };
      LongPrototype.shru = LongPrototype.shiftRightUnsigned;
      LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned)
          return this;
        return fromBits(this.low, this.high, false);
      };
      LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
          return this;
        return fromBits(this.low, this.high, true);
      };
      return Long;
    });
    ;
    (function(root, factory) {
      "use strict";
      if (typeof exports === "object") {
        root.slip = exports;
        factory(exports);
      } else if (typeof define === "function" && define.amd) {
        define(["exports"], function(exports) {
          root.slip = exports;
          return (root.slip, factory(exports));
        });
      } else {
        root.slip = {};
        factory(root.slip);
      }
    }(this, function(exports) {
      "use strict";
      var slip = exports;
      slip.END = 192;
      slip.ESC = 219;
      slip.ESC_END = 220;
      slip.ESC_ESC = 221;
      slip.byteArray = function(data, offset, length) {
        return data instanceof ArrayBuffer ? new Uint8Array(data, offset, length) : data;
      };
      slip.expandByteArray = function(arr) {
        var expanded = new Uint8Array(arr.length * 2);
        expanded.set(arr);
        return expanded;
      };
      slip.sliceByteArray = function(arr, start, end) {
        var sliced = arr.buffer.slice ? arr.buffer.slice(start, end) : arr.subarray(start, end);
        return new Uint8Array(sliced);
      };
      slip.encode = function(data, o) {
        o = o || {};
        o.bufferPadding = o.bufferPadding || 4;
        data = slip.byteArray(data, o.offset, o.byteLength);
        var bufLen = (data.length + o.bufferPadding + 3) & ~0x03,
            encoded = new Uint8Array(bufLen),
            j = 1;
        encoded[0] = slip.END;
        for (var i = 0; i < data.length; i++) {
          if (j > encoded.length - 3) {
            encoded = slip.expandByteArray(encoded);
          }
          var val = data[i];
          if (val === slip.END) {
            encoded[j++] = slip.ESC;
            val = slip.ESC_END;
          } else if (val === slip.ESC) {
            encoded[j++] = slip.ESC;
            val = slip.ESC_ESC;
          }
          encoded[j++] = val;
        }
        encoded[j] = slip.END;
        return slip.sliceByteArray(encoded, 0, j + 1);
      };
      slip.Decoder = function(o) {
        o = typeof o !== "function" ? o || {} : {onMessage: o};
        this.maxMessageSize = o.maxMessageSize || 10485760;
        this.bufferSize = o.bufferSize || 1024;
        this.msgBuffer = new Uint8Array(this.bufferSize);
        this.msgBufferIdx = 0;
        this.onMessage = o.onMessage;
        this.onError = o.onError;
        this.escape = false;
      };
      var p = slip.Decoder.prototype;
      p.decode = function(data) {
        data = slip.byteArray(data);
        var msg;
        for (var i = 0; i < data.length; i++) {
          var val = data[i];
          if (this.escape) {
            if (val === slip.ESC_ESC) {
              val = slip.ESC;
            } else if (val === slip.ESC_END) {
              val = slip.END;
            }
          } else {
            if (val === slip.ESC) {
              this.escape = true;
              continue;
            }
            if (val === slip.END) {
              msg = this.handleEnd();
              continue;
            }
          }
          var more = this.addByte(val);
          if (!more) {
            this.handleMessageMaxError();
          }
        }
        return msg;
      };
      p.handleMessageMaxError = function() {
        if (this.onError) {
          this.onError(this.msgBuffer.subarray(0), "The message is too large; the maximum message size is " + this.maxMessageSize / 1024 + "KB. Use a larger maxMessageSize if necessary.");
        }
        this.msgBufferIdx = 0;
        this.escape = false;
      };
      p.addByte = function(val) {
        if (this.msgBufferIdx > this.msgBuffer.length - 1) {
          this.msgBuffer = slip.expandByteArray(this.msgBuffer);
        }
        this.msgBuffer[this.msgBufferIdx++] = val;
        this.escape = false;
        return this.msgBuffer.length < this.maxMessageSize;
      };
      p.handleEnd = function() {
        if (this.msgBufferIdx === 0) {
          return;
        }
        var msg = slip.sliceByteArray(this.msgBuffer, 0, this.msgBufferIdx);
        if (this.onMessage) {
          this.onMessage(msg);
        }
        this.msgBufferIdx = 0;
        return msg;
      };
      return slip;
    }));
    ;
    ;
    (function() {
      'use strict';
      function EventEmitter() {}
      var proto = EventEmitter.prototype;
      var exports = this;
      var originalGlobalValue = exports.EventEmitter;
      function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
          if (listeners[i].listener === listener) {
            return i;
          }
        }
        return -1;
      }
      function alias(name) {
        return function aliasClosure() {
          return this[name].apply(this, arguments);
        };
      }
      proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;
        if (evt instanceof RegExp) {
          response = {};
          for (key in events) {
            if (events.hasOwnProperty(key) && evt.test(key)) {
              response[key] = events[key];
            }
          }
        } else {
          response = events[evt] || (events[evt] = []);
        }
        return response;
      };
      proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;
        for (i = 0; i < listeners.length; i += 1) {
          flatListeners.push(listeners[i].listener);
        }
        return flatListeners;
      };
      proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;
        if (listeners instanceof Array) {
          response = {};
          response[evt] = listeners;
        }
        return response || listeners;
      };
      proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;
        for (key in listeners) {
          if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
            listeners[key].push(listenerIsWrapped ? listener : {
              listener: listener,
              once: false
            });
          }
        }
        return this;
      };
      proto.on = alias('addListener');
      proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
          listener: listener,
          once: true
        });
      };
      proto.once = alias('addOnceListener');
      proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
      };
      proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
          this.defineEvent(evts[i]);
        }
        return this;
      };
      proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;
        for (key in listeners) {
          if (listeners.hasOwnProperty(key)) {
            index = indexOfListener(listeners[key], listener);
            if (index !== -1) {
              listeners[key].splice(index, 1);
            }
          }
        }
        return this;
      };
      proto.off = alias('removeListener');
      proto.addListeners = function addListeners(evt, listeners) {
        return this.manipulateListeners(false, evt, listeners);
      };
      proto.removeListeners = function removeListeners(evt, listeners) {
        return this.manipulateListeners(true, evt, listeners);
      };
      proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
          for (i in evt) {
            if (evt.hasOwnProperty(i) && (value = evt[i])) {
              if (typeof value === 'function') {
                single.call(this, i, value);
              } else {
                multiple.call(this, i, value);
              }
            }
          }
        } else {
          i = listeners.length;
          while (i--) {
            single.call(this, evt, listeners[i]);
          }
        }
        return this;
      };
      proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;
        if (type === 'string') {
          delete events[evt];
        } else if (evt instanceof RegExp) {
          for (key in events) {
            if (events.hasOwnProperty(key) && evt.test(key)) {
              delete events[key];
            }
          }
        } else {
          delete this._events;
        }
        return this;
      };
      proto.removeAllListeners = alias('removeEvent');
      proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;
        for (key in listenersMap) {
          if (listenersMap.hasOwnProperty(key)) {
            listeners = listenersMap[key].slice(0);
            i = listeners.length;
            while (i--) {
              listener = listeners[i];
              if (listener.once === true) {
                this.removeListener(evt, listener.listener);
              }
              response = listener.listener.apply(this, args || []);
              if (response === this._getOnceReturnValue()) {
                this.removeListener(evt, listener.listener);
              }
            }
          }
        }
        return this;
      };
      proto.trigger = alias('emitEvent');
      proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
      };
      proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
      };
      proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
          return this._onceReturnValue;
        } else {
          return true;
        }
      };
      proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
      };
      EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
      };
      if (typeof define === 'function' && define.amd) {
        define(function() {
          return EventEmitter;
        });
      } else if (typeof module === 'object' && module.exports) {
        module.exports = EventEmitter;
      } else {
        exports.EventEmitter = EventEmitter;
      }
    }.call(this));
    ;
    var osc = osc || $__require('b'),
        slip = slip || $__require('e'),
        EventEmitter = EventEmitter || $__require('12').EventEmitter;
    (function() {
      "use strict";
      osc.firePacketEvents = function(port, packet, timeTag, packetInfo) {
        if (packet.address) {
          port.emit("message", packet, timeTag, packetInfo);
        } else {
          osc.fireBundleEvents(port, packet, timeTag, packetInfo);
        }
      };
      osc.fireBundleEvents = function(port, bundle, timeTag, packetInfo) {
        port.emit("bundle", bundle, timeTag, packetInfo);
        for (var i = 0; i < bundle.packets.length; i++) {
          var packet = bundle.packets[i];
          osc.firePacketEvents(port, packet, bundle.timeTag, packetInfo);
        }
      };
      osc.Port = function(options) {
        this.options = options || {};
        this.on("data", this.decodeOSC.bind(this));
      };
      var p = osc.Port.prototype = Object.create(EventEmitter.prototype);
      p.constructor = osc.Port;
      p.send = function(oscPacket) {
        var args = Array.prototype.slice.call(arguments),
            encoded = this.encodeOSC(oscPacket),
            buf = osc.nativeBuffer(encoded);
        args[0] = buf;
        this.sendRaw.apply(this, args);
      };
      p.encodeOSC = function(packet) {
        packet = packet.buffer ? packet.buffer : packet;
        var encoded;
        try {
          encoded = osc.writePacket(packet, this.options);
        } catch (err) {
          this.emit("error", err);
        }
        return encoded;
      };
      p.decodeOSC = function(data, packetInfo) {
        data = osc.byteArray(data);
        this.emit("raw", data, packetInfo);
        try {
          var packet = osc.readPacket(data, this.options);
          this.emit("osc", packet, packetInfo);
          osc.firePacketEvents(this, packet, undefined, packetInfo);
        } catch (err) {
          this.emit("error", err);
        }
      };
      osc.SLIPPort = function(options) {
        var that = this;
        var o = this.options = options || {};
        o.useSLIP = o.useSLIP === undefined ? true : o.useSLIP;
        this.decoder = new slip.Decoder({
          onMessage: this.decodeOSC.bind(this),
          onError: function(err) {
            that.emit("error", err);
          }
        });
        var decodeHandler = o.useSLIP ? this.decodeSLIPData : this.decodeOSC;
        this.on("data", decodeHandler.bind(this));
      };
      p = osc.SLIPPort.prototype = Object.create(osc.Port.prototype);
      p.constructor = osc.SLIPPort;
      p.encodeOSC = function(packet) {
        packet = packet.buffer ? packet.buffer : packet;
        var framed;
        try {
          var encoded = osc.writePacket(packet, this.options);
          framed = slip.encode(encoded);
        } catch (err) {
          this.emit("error", err);
        }
        return framed;
      };
      p.decodeSLIPData = function(data, packetInfo) {
        this.decoder.decode(data, packetInfo);
      };
      osc.relay = function(from, to, eventName, sendFnName, transformFn, sendArgs) {
        eventName = eventName || "message";
        sendFnName = sendFnName || "send";
        transformFn = transformFn || function() {};
        sendArgs = sendArgs ? [null].concat(sendArgs) : [];
        var listener = function(data) {
          sendArgs[0] = data;
          data = transformFn(data);
          to[sendFnName].apply(to, sendArgs);
        };
        from.on(eventName, listener);
        return {
          eventName: eventName,
          listener: listener
        };
      };
      osc.relayPorts = function(from, to, o) {
        var eventName = o.raw ? "raw" : "osc",
            sendFnName = o.raw ? "sendRaw" : "send";
        return osc.relay(from, to, eventName, sendFnName, o.transform);
      };
      osc.stopRelaying = function(from, relaySpec) {
        from.removeListener(relaySpec.eventName, relaySpec.listener);
      };
      osc.Relay = function(port1, port2, options) {
        var o = this.options = options || {};
        o.raw = false;
        this.port1 = port1;
        this.port2 = port2;
        this.listen();
      };
      p = osc.Relay.prototype = Object.create(EventEmitter.prototype);
      p.constructor = osc.Relay;
      p.open = function() {
        this.port1.open();
        this.port2.open();
      };
      p.listen = function() {
        if (this.port1Spec && this.port2Spec) {
          this.close();
        }
        this.port1Spec = osc.relayPorts(this.port1, this.port2, this.options);
        this.port2Spec = osc.relayPorts(this.port2, this.port1, this.options);
        var closeListener = this.close.bind(this);
        this.port1.on("close", closeListener);
        this.port2.on("close", closeListener);
      };
      p.close = function() {
        osc.stopRelaying(this.port1, this.port1Spec);
        osc.stopRelaying(this.port2, this.port2Spec);
        this.emit("close", this.port1, this.port2);
      };
      if (typeof module !== "undefined" && module.exports) {
        module.exports = osc;
      }
    }());
    ;
    var osc = osc;
    (function() {
      "use strict";
      osc.WebSocketPort = function(options) {
        osc.Port.call(this, options);
        this.on("open", this.listen.bind(this));
        this.socket = options.socket;
        if (this.socket) {
          if (this.socket.readyState === 1) {
            this.emit("open", this.socket);
          } else {
            this.open();
          }
        }
      };
      var p = osc.WebSocketPort.prototype = Object.create(osc.Port.prototype);
      p.constructor = osc.WebSocketPort;
      p.open = function() {
        if (!this.socket) {
          this.socket = new WebSocket(this.options.url);
        }
        this.socket.binaryType = "arraybuffer";
        var that = this;
        this.socket.onopen = function() {
          that.emit("open", that.socket);
        };
      };
      p.listen = function() {
        var that = this;
        this.socket.onmessage = function(e) {
          that.emit("data", e.data, e);
        };
        this.socket.onerror = function(err) {
          that.emit("error", err);
        };
        this.socket.onclose = function(e) {
          that.emit("close", e);
        };
        that.emit("ready");
      };
      p.sendRaw = function(encoded) {
        if (!this.socket) {
          return;
        }
        this.socket.send(encoded);
      };
      p.close = function(code, reason) {
        this.socket.close(code, reason);
      };
    }());
  })($__require('c').Buffer, $__require('9'));
  return module.exports;
});

$__System.registerDynamic("1d", ["4", "7", "3", "6", "1e", "5", "1c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio,
        io = root.io,
        _ = root._,
        osc = root.osc;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      Tuio.Time = $__require('7');
      Tuio.Source = $__require('3');
      Tuio.ObjectContainer = $__require('6');
      Tuio.Pointer = $__require('1e');
      _ = $__require('5');
      osc = $__require('1c');
    }
    Tuio.Client = Tuio.Model.extend({
      host: null,
      socket: null,
      connected: null,
      objectList: null,
      aliveObjectList: null,
      newObjectList: null,
      frameObjects: null,
      cursorList: null,
      aliveCursorList: null,
      newCursorList: null,
      frameCursors: null,
      sourceList: null,
      aliveComponentList: null,
      objectContainerList: null,
      freeCursorList: null,
      maxCursorId: null,
      currentFrame: null,
      currentTime: null,
      oscReceiver: null,
      frameSource: null,
      sourceCount: null,
      frameTime: null,
      lateFrame: null,
      initialize: function(params) {
        this.host = params.host;
        this.connected = false;
        this.objectList = {};
        this.aliveObjectList = [];
        this.newObjectList = [];
        this.frameObjects = [];
        this.cursorList = {};
        this.aliveCursorList = [];
        this.newCursorList = [];
        this.frameCursors = [];
        this.sourceList = {}, this.aliveComponentList = [];
        this.objectContainerList = [];
        this.frameObjects = [];
        this.freeCursorList = [];
        this.maxCursorId = -1;
        this.currentFrame = 0;
        this.currentTime = null;
        this.oscReceiver = new osc.WebSocketPort({url: this.host});
        this.sourceCount = 0;
        this.lateFrame = false;
        _.bindAll(this, "onConnect", "acceptBundle", "acceptMessage", "onDisconnect");
      },
      connect: function() {
        Tuio.Time.initSession();
        this.currentTime = new Tuio.Time();
        this.currentTime.reset();
        this.oscReceiver.on("open", this.onConnect);
        this.oscReceiver.on("close", this.onDisconnect);
        this.oscReceiver.open();
      },
      onConnect: function() {
        this.oscReceiver.on("message", this.acceptMessage);
        this.oscReceiver.on("error", function(e) {
          console.log(e.message);
        });
        this.connected = true;
        this.trigger("connect");
      },
      onDisconnect: function() {
        this.oscReceiver.removeListener("message", this.acceptMessage);
        this.connected = false;
        this.trigger("disconnect");
      },
      isConnected: function() {
        return this.connected;
      },
      getTuioObjects: function(version1) {
        return _.clone(this.objectList);
      },
      getTuioCursors: function() {
        return _.clone(this.cursorList);
      },
      getTuioPointers: function() {
        var self = this,
            pointers = [];
        this.objectContainerList.forEach(function(object) {
          if (object.pointer && self.frameSource && object.getTuioSource().getSourceString() === self.frameSource.getSourceString()) {
            pointers.push(object.pointer);
          }
        });
        return pointers;
      },
      getTuioTokens: function() {
        var self = this,
            tokens = [];
        this.objectContainerList.forEach(function(object) {
          if (object.token && self.frameSource && object.getTuioSource().getSourceString() === self.frameSource.getSourceString()) {
            tokens.push(object.token);
          }
        });
        return tokens;
      },
      getTuioObject: function(sid) {
        return this.objectList[sid];
      },
      getTuioCursor: function(sid) {
        return this.cursorList[sid];
      },
      acceptBundle: function(oscBundle) {
        var msg = null,
            oscBundle = [];
        for (var i = 0,
            max = oscBundle.length; i < max; i++) {
          msg = oscBundle[i];
          switch (msg[0]) {
            case "/tuio/2Dobj":
            case "/tuio/2Dcur":
              this.acceptMessage(msg);
              break;
          }
        }
      },
      acceptMessage: function(oscMessage) {
        var address = oscMessage.address,
            messageArgs = oscMessage.args,
            tuio1command = messageArgs[0],
            tuio1arguments = messageArgs.slice(1, messageArgs.length);
        switch (address) {
          case "/tuio/2Dobj":
            this.handleObjectMessage(tuio1command, tuio1arguments);
            break;
          case "/tuio/2Dcur":
            this.handleCursorMessage(tuio1command, tuio1arguments);
            break;
          case "/tuio2/frm":
            this.handleFrameMessage(messageArgs);
            break;
          case "/tuio2/ptr":
            this.handlePointerMessage(messageArgs);
            break;
          case "/tuio2/tok":
            this.handleTokenMessage(messageArgs);
            break;
          case "/tuio2/alv":
            this.handleAliveMessage(messageArgs);
            break;
        }
      },
      handleObjectMessage: function(command, args) {
        switch (command) {
          case "set":
            this.objectSet(args);
            break;
          case "alive":
            this.objectAlive(args);
            break;
          case "fseq":
            this.objectFseq(args);
            break;
        }
      },
      handleCursorMessage: function(command, args) {
        switch (command) {
          case "set":
            this.cursorSet(args);
            break;
          case "alive":
            this.cursorAlive(args);
            break;
          case "fseq":
            this.cursorFseq(args);
            break;
        }
      },
      handleFrameMessage: function(args) {
        args = args || [];
        var frameId = args[0],
            timetag = args[1],
            dimension = args[2],
            sourceString = args[3],
            lastFrameId,
            timediff;
        this.frameSource = this.sourceList[sourceString];
        if (typeof this.frameSource === "undefined") {
          this.frameSource = new Tuio.Source({
            frameId: frameId,
            dimension: dimension,
            sourceString: sourceString,
            sourceId: this.sourceCount
          });
          this.sourceList[sourceString] = this.frameSource;
          this.sourceCount += 1;
        }
        this.frameTime = new Tuio.Time.fromMilliseconds(timetag.native * 1000);
        this.frameTime.setFrameId(frameId);
        lastFrameId = this.frameSource.getFrameTime().getFrameId();
        timediff = this.frameTime.getTotalMilliseconds() - this.frameSource.getFrameTime().getTotalMilliseconds();
        this.frameSource.setFrameTime(this.frameTime);
        this.lateFrame = (frameId < lastFrameId && frameId !== 0 && timediff < 1000) ? true : false;
      },
      handleAliveMessage: function(args) {
        args = args || [];
        var self = this;
        this.aliveComponentList = [];
        if (typeof args.length !== "undefined") {
          [].push.apply(this.aliveComponentList, args);
        }
        this.objectContainerList.forEach(function(object) {
          if (self.aliveComponentList.indexOf(object.getSessionId()) === -1) {
            object.remove(self.frameTime);
            self.frameObjects.push(object);
          }
        });
        this.frameObjects.forEach(function(frameObject) {
          switch (frameObject.getTuioState()) {
            case Tuio.TUIO_ADDED:
              self.objectContainerList.push(frameObject);
              break;
            case Tuio.TUIO_REMOVED:
              var removeIndex = self.objectContainerList.indexOf(frameObject);
              if (removeIndex !== -1) {
                self.objectContainerList.splice(removeIndex, 1);
              }
              break;
          }
        });
        this.frameObjects = [];
        if (this.frameTime) {
          this.trigger("refresh", Tuio.Time.fromTime(this.frameTime));
        }
      },
      getAliveComponents: function() {
        return this.aliveComponentList;
      },
      handlePointerMessage: function(args) {
        var s_id = args[0],
            tu_id = args[1],
            c_id = args[2],
            xpos = args[3],
            ypos = args[4],
            angle = args[5],
            shear = args[6],
            radius = args[7],
            pressure = args[8],
            xspeed = args[9],
            yspeed = args[10],
            pspeed = args[11],
            maccel = args[12],
            paccel = args[13],
            object = this.obtainFrameObject(s_id),
            pointerUpdateParams = {
              xp: xpos,
              yp: ypos,
              a: angle,
              sa: shear,
              r: radius,
              p: pressure,
              ttime: this.frameTime,
              xs: xspeed,
              ys: yspeed,
              ps: pspeed,
              ma: maccel,
              pa: paccel
            },
            pointerCreateParams = _.extend({}, pointerUpdateParams, {
              pi: -1,
              source: this.frameSource,
              tobj: object
            }),
            pointer;
        pointer = object.getTuioPointer();
        if (!pointer) {
          pointer = new Tuio.Pointer(pointerCreateParams);
          pointer.setTypeUserId(tu_id);
          object.setTuioPointer(pointer);
        } else if (pointer.getX() !== xpos || pointer.getY() !== ypos || pointer.getAngle() !== angle || pointer.getShear() !== shear || pointer.getRadius() !== radius || pointer.getPressure() !== pressure || pointer.getXSpeed() !== xspeed || pointer.getYSpeed() !== yspeed || pointer.getPressureSpeed() !== pspeed || pointer.getPressureAccel() !== paccel || pointer.getMotionAccel() !== maccel) {
          pointer.update(pointerUpdateParams);
        }
      },
      handleTokenMessage: function(args) {
        var s_id = args[0],
            tu_id = args[1],
            c_id = args[2],
            xpos = args[3],
            ypos = args[4],
            angle = args[5],
            xspeed = args[9],
            yspeed = args[10],
            rspeed = args[11],
            maccel = args[12],
            raccel = args[13],
            object = this.obtainFrameObject(s_id),
            tokenUpdateParams = {
              xp: xpos,
              yp: ypos,
              a: angle,
              ttime: this.frameTime,
              xs: xspeed,
              ys: yspeed,
              rs: rspeed,
              ma: maccel,
              ra: raccel
            },
            tokenCreateParams = _.extend({}, tokenUpdateParams, {
              sym: -1,
              source: this.frameSource,
              tobj: object
            }),
            token;
        token = object.getTuioToken();
        if (!token) {
          token = new Tuio.Token(tokenCreateParams);
          token.setTypeUserId(tu_id);
          object.setTuioToken(token);
        } else if (token.getX() !== xpos || token.getY() !== ypos || token.getAngle() !== angle || token.getXSpeed() !== xspeed || token.getYSpeed() !== yspeed || token.getRotationSpeed() !== rspeed || token.getRotationAccel() !== raccel || token.getMotionAccel() !== maccel) {
          token.update(tokenUpdateParams);
        }
      },
      getFrameObjects: function() {
        return this.frameObjects;
      },
      obtainFrameObject: function(sessionId) {
        var object;
        if (this.frameSource) {
          object = this.getFrameObject(this.frameSource.getSourceId(), sessionId);
        }
        if (typeof object === "undefined") {
          object = new Tuio.ObjectContainer({
            ttime: this.frameTime,
            si: sessionId,
            src: this.frameSource
          });
          this.frameObjects.push(object);
        }
        return object;
      },
      getFrameObject: function(sourceId, sessionId) {
        var wantedPointer;
        this.frameObjects.forEach(function(framePointer) {
          if (framePointer.getSessionId() === sessionId) {
            wantedPointer = framePointer;
          }
        });
        if (typeof wantedPointer === "undefined") {
          this.objectContainerList.forEach(function(activePointer) {
            if (typeof activePointer.getTuioSource() !== "undefined" && activePointer.getTuioSource().getSourceId() === sourceId && activePointer.getSessionId() === sessionId) {
              wantedPointer = activePointer;
            }
          });
        }
        return wantedPointer;
      },
      objectSet: function(args) {
        var sid = args[0],
            cid = args[1],
            xPos = args[2],
            yPos = args[3],
            angle = args[4],
            xSpeed = args[5],
            ySpeed = args[6],
            rSpeed = args[7],
            mAccel = args[8],
            rAccel = args[9];
        if (!_.has(this.objectList, sid)) {
          var addObject = new Tuio.Object({
            si: sid,
            sym: cid,
            xp: xPos,
            yp: yPos,
            a: angle
          });
          this.frameObjects.push(addObject);
        } else {
          var tobj = this.objectList[sid];
          if (!tobj) {
            return;
          }
          if ((tobj.xPos !== xPos) || (tobj.yPos !== yPos) || (tobj.angle !== angle) || (tobj.xSpeed !== xSpeed) || (tobj.ySpeed !== ySpeed) || (tobj.rotationSpeed !== rSpeed) || (tobj.motionAccel !== mAccel) || (tobj.rotationAccel !== rAccel)) {
            var updateObject = new Tuio.Object({
              si: sid,
              sym: cid,
              xp: xPos,
              yp: yPos,
              a: angle
            });
            updateObject.update({
              xp: xPos,
              yp: yPos,
              a: angle,
              xs: xSpeed,
              ys: ySpeed,
              rs: rSpeed,
              ma: mAccel,
              ra: rAccel
            });
            this.frameObjects.push(updateObject);
          }
        }
      },
      objectAlive: function(args) {
        var removeObject = null;
        this.newObjectList = args;
        this.aliveObjectList = _.difference(this.aliveObjectList, this.newObjectList);
        for (var i = 0,
            max = this.aliveObjectList.length; i < max; i++) {
          removeObject = this.objectList[this.aliveObjectList[i]];
          if (removeObject) {
            removeObject.remove(this.currentTime);
            this.frameObjects.push(removeObject);
          }
        }
      },
      objectFseq: function(args) {
        var fseq = args[0],
            lateFrame = false,
            tobj = null;
        if (fseq > 0) {
          if (fseq > this.currentFrame) {
            this.currentTime = Tuio.Time.getSessionTime();
          }
          if ((fseq >= this.currentFrame) || ((this.currentFrame - fseq) > 100)) {
            this.currentFrame = fseq;
          } else {
            lateFrame = true;
          }
        } else if (Tuio.Time.getSessionTime().subtractTime(this.currentTime).getTotalMilliseconds() > 100) {
          this.currentTime = Tuio.Time.getSessionTime();
        }
        if (!lateFrame) {
          for (var i = 0,
              max = this.frameObjects.length; i < max; i++) {
            tobj = this.frameObjects[i];
            switch (tobj.getTuioState()) {
              case Tuio.TUIO_REMOVED:
                this.objectRemoved(tobj);
                break;
              case Tuio.TUIO_ADDED:
                this.objectAdded(tobj);
                break;
              default:
                this.objectDefault(tobj);
                break;
            }
          }
          this.trigger("refresh", Tuio.Time.fromTime(this.currentTime));
          var buffer = this.aliveObjectList;
          this.aliveObjectList = this.newObjectList;
          this.newObjectList = buffer;
        }
        this.frameObjects = [];
      },
      objectRemoved: function(tobj) {
        var removeObject = tobj;
        removeObject.remove(this.currentTime);
        this.trigger("removeTuioObject", removeObject);
        delete this.objectList[removeObject.getSessionId()];
      },
      objectAdded: function(tobj) {
        var addObject = new Tuio.Object({
          ttime: this.currentTime,
          si: tobj.getSessionId(),
          sym: tobj.getSymbolId(),
          xp: tobj.getX(),
          yp: tobj.getY(),
          a: tobj.getAngle()
        });
        this.objectList[addObject.getSessionId()] = addObject;
        this.trigger("addTuioObject", addObject);
      },
      objectDefault: function(tobj) {
        var updateObject = this.objectList[tobj.getSessionId()];
        if ((tobj.getX() !== updateObject.getX() && tobj.getXSpeed() === 0) || (tobj.getY() !== updateObject.getY() && tobj.getYSpeed() === 0)) {
          updateObject.update({
            ttime: this.currentTime,
            xp: tobj.getX(),
            yp: tobj.getY(),
            a: tobj.getAngle()
          });
        } else {
          updateObject.update({
            ttime: this.currentTime,
            xp: tobj.getX(),
            yp: tobj.getY(),
            a: tobj.getAngle(),
            xs: tobj.getXSpeed(),
            ys: tobj.getYSpeed(),
            rs: tobj.getRotationSpeed(),
            ma: tobj.getMotionAccel(),
            ra: tobj.getRotationAccel()
          });
        }
        this.trigger("updateTuioObject", updateObject);
      },
      cursorSet: function(args) {
        var sid = args[0],
            xPos = args[1],
            yPos = args[2],
            xSpeed = args[3],
            ySpeed = args[4],
            mAccel = args[5];
        if (!_.has(this.cursorList, sid)) {
          var addCursor = new Tuio.Cursor({
            si: sid,
            ci: -1,
            xp: xPos,
            yp: yPos
          });
          this.frameCursors.push(addCursor);
        } else {
          var tcur = this.cursorList[sid];
          if (!tcur) {
            return;
          }
          if ((tcur.xPos !== xPos) || (tcur.yPos !== yPos) || (tcur.xSpeed !== xSpeed) || (tcur.ySpeed !== ySpeed) || (tcur.motionAccel !== mAccel)) {
            var updateCursor = new Tuio.Cursor({
              si: sid,
              ci: tcur.getCursorId(),
              xp: xPos,
              yp: yPos
            });
            updateCursor.update({
              xp: xPos,
              yp: yPos,
              xs: xSpeed,
              ys: ySpeed,
              ma: mAccel
            });
            this.frameCursors.push(updateCursor);
          }
        }
      },
      cursorAlive: function(args) {
        var removeCursor = null;
        this.newCursorList = args;
        this.aliveCursorList = _.difference(this.aliveCursorList, this.newCursorList);
        for (var i = 0,
            max = this.aliveCursorList.length; i < max; i++) {
          removeCursor = this.cursorList[this.aliveCursorList[i]];
          if (removeCursor) {
            removeCursor.remove(this.currentTime);
            this.frameCursors.push(removeCursor);
          }
        }
      },
      cursorFseq: function(args) {
        var fseq = args[0],
            lateFrame = false,
            tcur = null;
        if (fseq > 0) {
          if (fseq > this.currentFrame) {
            this.currentTime = Tuio.Time.getSessionTime();
          }
          if ((fseq >= this.currentFrame) || ((this.currentFrame - fseq) > 100)) {
            this.currentFrame = fseq;
          } else {
            lateFrame = true;
          }
        } else if (Tuio.Time.getSessionTime().subtractTime(this.currentTime).getTotalMilliseconds() > 100) {
          this.currentTime = Tuio.Time.getSessionTime();
        }
        if (!lateFrame) {
          for (var i = 0,
              max = this.frameCursors.length; i < max; i++) {
            tcur = this.frameCursors[i];
            switch (tcur.getTuioState()) {
              case Tuio.TUIO_REMOVED:
                this.cursorRemoved(tcur);
                break;
              case Tuio.TUIO_ADDED:
                this.cursorAdded(tcur);
                break;
              default:
                this.cursorDefault(tcur);
                break;
            }
          }
          this.trigger("refresh", Tuio.Time.fromTime(this.currentTime));
          var buffer = this.aliveCursorList;
          this.aliveCursorList = this.newCursorList;
          this.newCursorList = buffer;
        }
        this.frameCursors = [];
      },
      cursorRemoved: function(tcur) {
        var removeCursor = tcur;
        removeCursor.remove(this.currentTime);
        this.trigger("removeTuioCursor", removeCursor);
        delete this.cursorList[removeCursor.getSessionId()];
        if (removeCursor.getCursorId() === this.maxCursorId) {
          this.maxCursorId = -1;
          if (_.size(this.cursorList) > 0) {
            var maxCursor = _.max(this.cursorList, function(cur) {
              return cur.getCursorId();
            });
            if (maxCursor.getCursorId() > this.maxCursorId) {
              this.maxCursorId = maxCursor.getCursorId();
            }
            this.freeCursorList = _.without(this.freeCursorList, function(cur) {
              return cur.getCursorId() >= this.maxCursorId;
            });
          } else {
            this.freeCursorList = [];
          }
        } else if (removeCursor.getCursorId() < this.maxCursorId) {
          this.freeCursorList.push(removeCursor);
        }
      },
      cursorAdded: function(tcur) {
        var cid = _.size(this.cursorList),
            testCursor = null;
        if ((cid <= this.maxCursorId) && (this.freeCursorList.length > 0)) {
          var closestCursor = this.freeCursorList[0];
          for (var i = 0,
              max = this.freeCursorList.length; i < max; i++) {
            testCursor = this.freeCursorList[i];
            if (testCursor.getDistanceToPoint(tcur) < closestCursor.getDistanceToPoint(tcur)) {
              closestCursor = testCursor;
            }
          }
          cid = closestCursor.getCursorId();
          this.freeCursorList = _.without(this.freeCursorList, function(cur) {
            return cur.getCursorId() === cid;
          });
        } else {
          this.maxCursorId = cid;
        }
        var addCursor = new Tuio.Cursor({
          ttime: this.currentTime,
          si: tcur.getSessionId(),
          ci: cid,
          xp: tcur.getX(),
          yp: tcur.getY()
        });
        this.cursorList[addCursor.getSessionId()] = addCursor;
        this.trigger("addTuioCursor", addCursor);
      },
      cursorDefault: function(tcur) {
        var updateCursor = this.cursorList[tcur.getSessionId()];
        if ((tcur.getX() !== updateCursor.getX() && tcur.getXSpeed() === 0) || (tcur.getY() !== updateCursor.getY() && tcur.getYSpeed() === 0)) {
          updateCursor.update({
            ttime: this.currentTime,
            xp: tcur.getX(),
            yp: tcur.getY()
          });
        } else {
          updateCursor.update({
            ttime: this.currentTime,
            xp: tcur.getX(),
            yp: tcur.getY(),
            xs: tcur.getXSpeed(),
            ys: tcur.getYSpeed(),
            ma: tcur.getMotionAccel()
          });
        }
        this.trigger("updateTuioCursor", updateCursor);
      }
    });
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Client;
    }
  }(this));
  return module.exports;
});

$__System.register('1f', [], function (_export) {
    'use strict';

    _export('default', nodeSearch);

    function nodeSearch() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var calibration = params.calibration;
        var result = [];

        function coordinatesFromParams() {
            var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var clientX = params.clientX;
            var clientY = params.clientY;
            var screenX = params.screenX;
            var screenY = params.screenY;

            if (typeof screenX !== 'undefined' && typeof screenY !== 'undefined' && calibration.isScreenUsable()) {
                var adjustedPoints = calibration.screenToBrowserCoordinates(screenX, screenY);
                clientX = adjustedPoints.clientX;
                clientY = adjustedPoints.clientY;
            }

            return { clientX: clientX, clientY: clientY };
        }

        return {
            fromPoint: function fromPoint() {
                var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                // elementFromPoint returns null when nothing found
                // e.g. looking outside of the viewport
                var foundElement = null;

                var _coordinatesFromParams = coordinatesFromParams(params);

                var clientX = _coordinatesFromParams.clientX;
                var clientY = _coordinatesFromParams.clientY;

                if (typeof clientX !== 'undefined' && typeof clientY !== 'undefined') {
                    foundElement = document.elementFromPoint(clientX, clientY);
                }

                return foundElement;
            },
            parentsOf: function parentsOf(node) {
                var nextParent = node.parentNode;
                result.length = 0;

                while (nextParent) {
                    result[result.length] = nextParent;
                    nextParent = nextParent.parentNode;
                }

                return result;
            }
        };
    }

    return {
        setters: [],
        execute: function () {}
    };
});
$__System.register('20', ['21'], function (_export) {
    'use strict';

    var inputObjectFromTuio, tuioObjectUpdate;

    // a helper object for tuioInput
    // it creates, keeps and updates instances of inputObjects
    // that correspond to tuioComponents like cursors or pointers

    _export('default', tuioInput);

    function tuioInput() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var tuioClient = params.tuioClient;
        var listeners = [];
        var enabled = false;
        var tuioInputHistory = nodesInputHistory(params);
        var allTuioComponents = [];

        function onTuioRefresh() {
            fetchTuioData();
            var allCurrentInput = tuioInputHistory.store(allTuioComponents);

            notify(tuioInputHistory.nodeCurrentInput(), tuioInputHistory.nodeHistoryInput(), allCurrentInput);
        }

        function copyCurrentTuioComponents(pointers, cursors, tokens, objects) {
            allTuioComponents.length = 0;
            for (var i = 0, _length = pointers.length; i < _length; i += 1) {
                allTuioComponents[allTuioComponents.length] = pointers[i];
            }
            for (var i = 0, _length2 = tokens.length; i < _length2; i += 1) {
                allTuioComponents[allTuioComponents.length] = tokens[i];
            }
            // tuio v1 types are stored in an {} object
            for (var key in cursors) {
                allTuioComponents[allTuioComponents.length] = cursors[key];
            }
            for (var key in objects) {
                allTuioComponents[allTuioComponents.length] = objects[key];
            }
        }

        function fetchTuioData() {
            var pointers = tuioClient.getTuioPointers(),
                cursors = tuioClient.getTuioCursors(),
                tokens = tuioClient.getTuioTokens(),
                objects = tuioClient.getTuioObjects();
            copyCurrentTuioComponents(pointers, cursors, tokens, objects);
        }

        function enable() {
            if (!enabled) {
                tuioClient.on('refresh', onTuioRefresh);
                enabled = true;
            }
        }

        function notify() {
            for (var i = 0; i < listeners.length; i += 1) {
                var callback = listeners[i];
                callback.apply(undefined, arguments);
            }
        }

        // listen to tuio/websocket
        enable();
        tuioClient.connect();

        return {
            listen: function listen(callback) {
                if (typeof callback !== 'function') {
                    throw new Error('Attempting to register a listener that\n                                    is not a function');
                }
                listeners.push(callback);
            },

            notify: notify,

            mute: function mute(callback) {
                var callbackIndex = listeners.indexOf(callback);
                if (callbackIndex !== -1) {
                    listeners.splice(callbackIndex, 1);
                }
            },

            enable: enable,

            // doesn't remove the callback registered with 'listen'
            // use mute for that
            // this removes the listener from tuioclient
            disable: function disable() {
                if (enabled) {
                    tuioClient.off('refresh', onTuioRefresh);
                    enabled = false;
                }
            }
        };
    }

    function nodesInputHistory() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        // limit for all stored objects
        var _params$limit = params.limit;
        var limit = _params$limit === undefined ? 10 : _params$limit;
        var findNode = params.findNode;
        var calibration = params.calibration;
        // list of stored inputObject instances used by all nodes
        var storedObjects = [];
        // a map of node => [inputObjects]
        // all inputObjects that were in contact with the node at one point
        var nodesWithInputHistory = new WeakMap();
        // similar map, but only with nodes that have active input
        var nodesWithInput = new Map();
        var allCurrentInput = [];

        // find matching inputObject for a tuioComponent
        // matches per id
        function findIndexOf(tuioComponent) {
            var indexOfComponent = -1;
            for (var index = 0; index < storedObjects.length; index += 1) {
                var object = storedObjects[index];
                if (object.identifier === tuioComponent.getSessionId()) {
                    indexOfComponent = index;
                    break;
                }
            }
            return indexOfComponent;
        }
        // removes an inputObject from node => [inputObjects]
        // if the instance does not exist in storedObjects
        // this is done because once the limit for storedObjects is reached
        // it will remove the first element from the list
        // but it is still in the list for an individual node history
        function removeDroppedInputObjectsFrom(historyForNode) {
            for (var historyIndex = 0; historyIndex < historyForNode.length; historyIndex += 1) {
                var historyInputObject = historyForNode[historyIndex],
                    notStored = storedObjects.indexOf(historyInputObject) === -1;
                if (notStored) {
                    historyForNode.splice(historyIndex, 1);
                }
            }
        }
        // takes a tuioComponent and either
        // finds and updates a matching inputObject
        // or creates a new inputObject
        // this is based on sessionId
        function convertToInputObject(tuioComponent) {
            var indexOfComponent = findIndexOf(tuioComponent),
                newComponent = indexOfComponent === -1,
                inputObject = undefined;

            if (newComponent) {
                var storeLimitReached = storedObjects.length === limit;
                inputObject = inputObjectFromTuio(tuioComponent, calibration);
                if (storeLimitReached) {
                    storedObjects.shift();
                }
                storedObjects[storedObjects.length] = inputObject;
            } else {
                inputObject = storedObjects[indexOfComponent];
                tuioObjectUpdate(inputObject, tuioComponent, calibration);
            }
            return inputObject;
        }
        //
        function toNodeInputCurrent(node, inputObject) {
            if (!nodesWithInput.has(node)) {
                nodesWithInput.set(node, []);
            }
            var inputObjects = nodesWithInput.get(node);
            inputObjects[inputObjects.length] = inputObject;
        }
        //
        function toNodeInputHistory(node, inputObject) {
            if (!nodesWithInputHistory.has(node)) {
                nodesWithInputHistory.set(node, []);
            }
            var historyForNode = nodesWithInputHistory.get(node),
                inputObjectNotInHistory = historyForNode.indexOf(inputObject) === -1;
            if (inputObjectNotInHistory) {
                removeDroppedInputObjectsFrom(historyForNode);
                historyForNode[historyForNode.length] = inputObject;
            }
        }

        return {
            nodeHistoryInput: function nodeHistoryInput() {
                return nodesWithInputHistory;
            },
            nodeCurrentInput: function nodeCurrentInput() {
                return nodesWithInput;
            },
            // returns an array of in browser inputObjects that correspond to tuioComponents
            store: function store(tuioComponents) {
                nodesWithInput.clear();
                allCurrentInput.length = 0;
                for (var i = 0; i < tuioComponents.length; i += 1) {
                    var inputObject = convertToInputObject(tuioComponents[i]);
                    var foundNode = findNode.fromPoint(inputObject);
                    if (foundNode) {
                        toNodeInputCurrent(foundNode, inputObject);
                        toNodeInputHistory(foundNode, inputObject);
                        allCurrentInput[allCurrentInput.length] = inputObject;
                    }
                }
                return allCurrentInput;
            }
        };
    }
    return {
        setters: [function (_) {
            inputObjectFromTuio = _.inputObjectFromTuio;
            tuioObjectUpdate = _.tuioObjectUpdate;
        }],
        execute: function () {}
    };
});
$__System.register('22', ['21'], function (_export) {
    'use strict';

    var tuioObjectUpdate;

    // a helper object for tuioInput
    // it creates, keeps and updates instances of inputObjects
    // that correspond to tuioComponents like cursors or pointers

    _export('default', touchInput);

    function touchInput(params) {
        var listeners = [],
            enabled = false,
            tuioInputHistory = nodesInputHistory(params);

        function onInput(event) {
            event.preventDefault();
            console.log(event);

            var allCurrentInput = tuioInputHistory.store(event.touches);

            notify(tuioInputHistory.nodeCurrentInput(), tuioInputHistory.nodeHistoryInput(), allCurrentInput);
        }

        function enable() {
            if (!enabled) {
                document.addEventListener('touchstart', onInput, false);
                document.addEventListener('touchend', onInput, false);
                document.addEventListener('touchcancel', onInput, false);
                document.addEventListener('touchmove', onInput, false);
                enabled = true;
            }
        }

        function notify() {
            for (var i = 0; i < listeners.length; i += 1) {
                var callback = listeners[i];
                callback.apply(undefined, arguments);
            }
        }

        // listen to tuio/websocket
        enable();

        return {
            listen: function listen(callback) {
                if (typeof callback !== 'function') {
                    throw new Error('Attempting to register a listener that\n                                    is not a function');
                }
                listeners.push(callback);
            },

            notify: notify,

            mute: function mute(callback) {
                var callbackIndex = listeners.indexOf(callback);
                if (callbackIndex !== -1) {
                    listeners.splice(callbackIndex, 1);
                }
            },

            enable: enable,

            // doesn't remove the callback registered with 'listen'
            // use mute for that
            // this removes the listener from tuioclient
            disable: function disable() {
                if (enabled) {
                    document.removeEventListener('touchstart', onInput, false);
                    document.removeEventListener('touchend', onInput, false);
                    document.removeEventListener('touchcancel', onInput, false);
                    document.removeEventListener('touchmove', onInput, false);
                    enabled = false;
                }
            }
        };
    }

    function nodesInputHistory() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        // limit for all stored objects
        var _params$limit = params.limit;
        var limit = _params$limit === undefined ? 10 : _params$limit;
        var findNode = params.findNode;
        // list of stored inputObject instances used by all nodes
        var storedObjects = [];
        // a map of node => [inputObjects]
        // all inputObjects that were in contact with the node at one point
        var nodesWithInputHistory = new WeakMap();
        // similar map, but only with nodes that have active input
        var nodesWithInput = new Map();
        var allCurrentInput = [];

        // find matching inputObject for a tuioComponent
        // matches per id
        function findIndexOf(nativeInputObject) {
            var indexOfComponent = -1;
            for (var index = 0; index < storedObjects.length; index += 1) {
                var object = storedObjects[index];
                if (object.identifier === nativeInputObject.identifier) {
                    indexOfComponent = index;
                    break;
                }
            }
            return indexOfComponent;
        }
        // removes an inputObject from node => [inputObjects]
        // if the instance does not exist in storedObjects
        // this is done because once the limit for storedObjects is reached
        // it will remove the first element from the list
        // but it is still in the list for an individual node history
        function removeDroppedInputObjectsFrom(historyForNode) {
            for (var historyIndex = 0; historyIndex < historyForNode.length; historyIndex += 1) {
                var historyInputObject = historyForNode[historyIndex],
                    notStored = storedObjects.indexOf(historyInputObject) === -1;
                if (notStored) {
                    historyForNode.splice(historyIndex, 1);
                }
            }
        }
        // takes a tuioComponent and either
        // finds and updates a matching inputObject
        // or creates a new inputObject
        // this is based on sessionId
        function convertToInputObject(nativeInputObject) {
            var indexOfComponent = findIndexOf(nativeInputObject),
                newComponent = indexOfComponent === -1,
                inputObject = undefined;

            if (newComponent) {
                var storeLimitReached = storedObjects.length === limit;
                inputObject = inputObjectFromNative(nativeInputObject);
                if (storeLimitReached) {
                    storedObjects.shift();
                }
                storedObjects[storedObjects.length] = inputObject;
            } else {
                inputObject = storedObjects[indexOfComponent];
                nativeObjectUpdate(inputObject, nativeInputObject);
            }
            return inputObject;
        }
        //
        function toNodeInputCurrent(node, inputObject) {
            if (!nodesWithInput.has(node)) {
                nodesWithInput.set(node, []);
            }
            var inputObjects = nodesWithInput.get(node);
            inputObjects[inputObjects.length] = inputObject;
        }
        //
        function toNodeInputHistory(node, inputObject) {
            if (!nodesWithInputHistory.has(node)) {
                nodesWithInputHistory.set(node, []);
            }
            var historyForNode = nodesWithInputHistory.get(node),
                inputObjectNotInHistory = historyForNode.indexOf(inputObject) === -1;
            if (inputObjectNotInHistory) {
                removeDroppedInputObjectsFrom(historyForNode);
                historyForNode[historyForNode.length] = inputObject;
            }
        }

        return {
            nodeHistoryInput: function nodeHistoryInput() {
                return nodesWithInputHistory;
            },
            nodeCurrentInput: function nodeCurrentInput() {
                return nodesWithInput;
            },
            // returns an array of in browser inputObjects that correspond to tuioComponents
            store: function store(nativeInputObjects) {
                nodesWithInput.clear();
                allCurrentInput.length = 0;
                for (var i = 0; i < nativeInputObjects.length; i += 1) {
                    var foundNode = findNode.fromPoint(nativeInputObjects[i]);
                    if (foundNode) {
                        var inputObject = convertToInputObject(nativeInputObjects[i]);
                        toNodeInputCurrent(foundNode, inputObject);
                        toNodeInputHistory(foundNode, inputObject);
                        allCurrentInput[allCurrentInput.length] = inputObject;
                    }
                }
                return allCurrentInput;
            }
        };
    }

    function pointInformation(nativeInputObject) {
        var screenX = nativeInputObject.screenX;
        var screenY = nativeInputObject.screenY;
        var clientX = nativeInputObject.clientX;
        var clientY = nativeInputObject.clientY;
        var pageX = nativeInputObject.pageX;
        var pageY = nativeInputObject.pageY;

        return {
            screenX: screenX, screenY: screenY,
            clientX: clientX, clientY: clientY,
            pageX: pageX, pageY: pageY
        };
    }

    function inputObjectFromNative(nativeInputObject) {
        var identifier = nativeInputObject.identifier;
        var point = pointInformation(nativeInputObject);
        var path = [point];

        return babelHelpers._extends({
            identifier: identifier,
            path: path
        }, point);
    }

    function nativeObjectUpdate(inputObject, nativeInputObject) {
        // update path
        var lastPoint = pointInformation(nativeInputObject);
        inputObject.path[inputObject.path.length] = lastPoint;
        // update point information (screenX, clientX...)
        // but keep the original identifier
        Object.assign(inputObject, lastPoint);
    }
    return {
        setters: [function (_) {
            tuioObjectUpdate = _.tuioObjectUpdate;
        }],
        execute: function () {}
    };
});
$__System.register('23', ['24'], function (_export) {
    'use strict';

    var eventPropagatesImmediately, globalEventCache, events;

    _export('domCollectionEvents', domCollectionEvents);

    function domCollectionEvents() {
        var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        object.on = function collectionEventOn(event, listener) {
            this.forEach(function (element) {
                return events.on(element, event, listener);
            });
            return this;
        };

        object.off = function collectionEventOff(event, listener) {
            this.forEach(function (element) {
                return events.off(element, event, listener);
            });
            return this;
        };

        object.emit = function collectionEventEmit(event) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            this.forEach(function (element) {
                return events.emit.apply(events, [element, event].concat(args));
            });
            return this;
        };

        return object;
    }

    return {
        setters: [function (_) {
            eventPropagatesImmediately = _.eventPropagatesImmediately;
        }],
        execute: function () {
            globalEventCache = {
                map: new WeakMap(),
                getListeners: function getListeners(element, event) {

                    var cachedEvents = this.map.get(element);
                    if (typeof cachedEvents === 'undefined') {
                        cachedEvents = new Map();
                        this.map.set(element, cachedEvents);
                    }

                    var cachedListeners = cachedEvents[event];
                    if (typeof cachedListeners === 'undefined') {
                        cachedListeners = [];
                        cachedEvents[event] = cachedListeners;
                    }

                    return cachedListeners;
                },
                callListeners: function callListeners(element, event) {
                    var args = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

                    var listeners = this.getListeners(element, event);
                    for (var i = 0; i < listeners.length; i += 1) {
                        listeners[i].apply(element, args);
                        if (!eventPropagatesImmediately(args[0])) {
                            break;
                        }
                    }
                },
                addListener: function addListener(element, event, listener) {
                    if (typeof listener === 'function') {
                        this.getListeners(element, event).push(listener);
                    }
                },
                removeListener: function removeListener(element, event, listener) {
                    var listeners = this.getListeners(element, event);

                    var indexOfListener = listeners.indexOf(listener);
                    if (indexOfListener !== -1) {
                        listeners.splice(indexOfListener, 1);
                    }
                },
                removeListeners: function removeListeners(element, event, listener) {
                    if (typeof listener !== 'undefined') {
                        this.removeListener(element, event, listener);
                        return;
                    }

                    var cachedEvents = this.map.get(element);
                    if (typeof cachedEvents !== 'undefined') {
                        delete cachedEvents[event];
                    }
                },
                clear: function clear() {
                    this.map = new WeakMap();
                }
            };
            events = {
                emit: function emit(element, event) {
                    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                        args[_key - 2] = arguments[_key];
                    }

                    globalEventCache.callListeners(element, event, args);
                },
                on: function on(element, event, listener) {
                    globalEventCache.addListener(element, event, listener);
                },
                off: function off(element, event, listener) {
                    globalEventCache.removeListeners(element, event, listener);
                },
                clearGlobalEventsCache: function clearGlobalEventsCache() {
                    globalEventCache.clear();
                }
            };

            _export('events', events);
        }
    };
});
$__System.register('24', ['25'], function (_export) {
    'use strict';

    var features, eventControls, EventObject;

    _export('eventPropagates', eventPropagates);

    _export('eventPropagatesImmediately', eventPropagatesImmediately);

    _export('createEventObject', createEventObject);

    function eventPropagates(eventObject) {
        var eventControl = eventControls.get(eventObject);
        return !eventControl.stop;
    }

    function eventPropagatesImmediately(eventObject) {
        var propagates = true;
        var eventControl = eventControls.get(eventObject);
        if (eventControl) {
            propagates = !eventControl.stopImmediately;
        }
        return propagates;
    }

    function createEventObject(nodes, targetNode, inputObjects, gesture) {
        if (nodes === undefined) nodes = [];

        var eventObject = new EventObject(inputObjects, targetNode, gesture);
        if (nodes.length > 1) {
            eventObject.target = nodes;
        }
        return eventObject;
    }

    function EventFeatures() {
        for (var key in features) {
            this[key] = undefined;
        }
    }
    return {
        setters: [function (_) {
            features = _;
        }],
        execute: function () {
            eventControls = new WeakMap();

            EventObject = (function () {
                function EventObject(input, target, gesture) {
                    babelHelpers.classCallCheck(this, EventObject);

                    this.input = input;
                    this.target = target;
                    this.currentTarget = target;
                    this.featureValues = new EventFeatures();
                    eventControls.set(this, {
                        stop: false,
                        stopImmediately: false
                    });
                    if (typeof gesture === 'object') {
                        gesture.featureValuesToObject(this.featureValues);
                    }
                }

                EventObject.prototype.stopPropagation = function stopPropagation() {
                    var eventControl = eventControls.get(this);
                    eventControl.stop = true;
                    return this;
                };

                EventObject.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
                    var eventControl = eventControls.get(this);
                    eventControl.stopImmediately = true;
                    return this;
                };

                return EventObject;
            })();
        }
    };
});
$__System.register('26', ['27', '28'], function (_export) {
    'use strict';

    var featureBase, lowerUpperVectorLimit, vector;

    _export('motion', motion);

    function motion(params) {
        var baseFeature = featureBase(params);
        var constraints = params.constraints;
        var tempVector = vector();
        var limit = undefined;

        if (typeof constraints !== 'undefined') {
            limit = lowerUpperVectorLimit(constraints);
        }

        function matchWithValue(motionVector) {
            var match = undefined;
            if (typeof limit !== 'undefined') {
                match = motionVector.x >= limit.lower.x && motionVector.y >= limit.lower.y && motionVector.x <= limit.upper.x && motionVector.y <= limit.upper.y;
            } else {
                match = motionVector.length() !== 0;
            }
            return match;
        }
        // not a bug
        // tuio coordinates are with top left origin
        // if we want a vector with bottom left origin
        // which for y equals previous - current
        function totalInputObjectsMotion(vectorSum, inputObject) {
            var path = inputObject.path;
            if (path.length > 1) {
                var currentPoint = path[path.length - 1],
                    previousPoint = path[path.length - 2];

                var x = currentPoint.screenX - previousPoint.screenX,
                    y = previousPoint.screenY - currentPoint.screenY;

                tempVector.setCoordinates(x, y);
                vectorSum.add(tempVector);
            }
            return vectorSum;
        }

        return {
            type: function type() {
                return 'Motion';
            },

            load: function load(inputState) {
                var inputObjects = baseFeature.inputObjectsFrom(inputState).filter(baseFeature.checkAgainstDefinition),
                    match = false;

                if (inputObjects.length !== 0) {
                    var motionVector = inputObjects.reduce(totalInputObjectsMotion, vector());
                    // average based on input count
                    motionVector.scaleWith(1 / inputObjects.length);
                    match = matchWithValue(motionVector);

                    if (match) {
                        var x = motionVector.x;
                        var y = motionVector.y;

                        baseFeature.setMatchedValue({ x: x, y: y });
                    }
                }

                return match;
            },

            setValueToObject: baseFeature.setValueToObject
        };
    }

    return {
        setters: [function (_) {
            featureBase = _.featureBase;
            lowerUpperVectorLimit = _.lowerUpperVectorLimit;
        }, function (_2) {
            vector = _2.vector;
        }],
        execute: function () {}
    };
});
$__System.register('29', ['27'], function (_export) {
    'use strict';

    var featureBase, lowerUpperLimit, extractConstraintsFrom, countFeatureException;

    _export('count', count);

    function count(params) {

        isValidCountFeature(params);

        var baseFeature = featureBase(params),
            constraints = extractConstraintsFrom(params),
            limit = lowerUpperLimit(constraints);

        return {
            type: function type() {
                return 'Count';
            },

            load: function load(inputState) {
                var inputObjects = baseFeature.inputObjectsFrom(inputState).filter(baseFeature.checkAgainstDefinition);

                var count = inputObjects.length;

                var match = count >= limit.lower && count <= limit.upper;

                if (match) {
                    baseFeature.setMatchedValue(count);
                }

                return match;
            },

            setValueToObject: baseFeature.setValueToObject
        };
    }

    function isValidCountFeature(countFeature) {
        if (typeof countFeature.constraints === 'undefined' || !countFeature.constraints.length) {
            throw new Error(countFeatureException.NO_CONSTRAINTS);
        }
    }

    return {
        setters: [function (_) {
            featureBase = _.featureBase;
            lowerUpperLimit = _.lowerUpperLimit;
            extractConstraintsFrom = _.extractConstraintsFrom;
        }],
        execute: function () {
            countFeatureException = Object.freeze({
                NO_CONSTRAINTS: 'Attempting to add a count feature with no constraints;\n                        i.e. number of contact points'
            });

            _export('countFeatureException', countFeatureException);
        }
    };
});
$__System.register('2a', ['27', '2b'], function (_export) {
    'use strict';

    var featureBase, Point, pathFeatureException;

    _export('path', path);

    function path(params) {

        isValidPathFeature(params);

        var baseFeature = featureBase(params);
        var recognizer = params.recognizer;
        // name will be something like
        // "0,0,10,10" from [[0,0], [10,10]]
        var name = params.constraints.toString();
        var constraints = dollarPointsFrom(params.constraints);
        var allScores = [];
        // value is empirical
        // TODO allow it to be user defined
        var validThreshold = 1.9;

        recognizer.AddGesture(name, constraints);

        function coordinatesToPoint(point) {
            // could create a pool to avoid creating objects
            // but the $1 recognizer already creates new instances when resampling
            return new Point(point.screenX, point.screenY);
        }

        function toAllScores(allScores, inputObject) {
            var $points = inputObject.path.map(coordinatesToPoint);
            var result = recognizer.Recognize($points, true);
            if (result.Name === name && result.Score > validThreshold) {
                allScores[allScores.length] = result.Score;
            }
            return allScores;
        }

        function toTotalScore(previous, current) {
            return previous + current;
        }

        return {
            type: function type() {
                return 'Path';
            },

            load: function load(inputState) {
                var inputObjects = baseFeature.inputObjectsFrom(inputState).filter(baseFeature.checkAgainstDefinition),
                    match = false;

                if (inputObjects.length !== 0) {
                    allScores.length = 0;
                    // calculate scores of valid inputs
                    var allCurrentScores = inputObjects.reduce(toAllScores, allScores);
                    // calculate total score if all inputs valid
                    if (allCurrentScores.length === inputObjects.length) {
                        var totalScore = allCurrentScores.reduce(toTotalScore);
                        var averageScore = totalScore / inputObjects.length;
                        if (averageScore > validThreshold) {
                            match = true;
                            baseFeature.setMatchedValue(totalScore / inputObjects.length);
                        }
                    }
                }

                return match;
            },
            setValueToObject: baseFeature.setValueToObject
        };
    }

    function isValidPathFeature() {
        var pathFeature = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var constraints = pathFeature.constraints;

        if (typeof constraints === 'undefined' || !constraints.length) {
            throw new Error(pathFeatureException.NO_CONSTRAINTS);
        }
        if (constraints.length < 2) {
            throw new Error(pathFeatureException.INVALID_CONSTRAINTS);
        }
        constraints.forEach(function (point) {
            if (point.length < 2) {
                throw new Error(pathFeatureException.INVALID_CONSTRAINTS_POINT);
            }
        });
    }

    function dollarPointsFrom(constraints) {
        return constraints.map(function (constraintPoint) {
            var x = constraintPoint[0],

            // constraints with bottom left origin
            // tuio input with top left
            y = 1 - constraintPoint[1];

            return new Point(x, y);
        });
    }

    return {
        setters: [function (_) {
            featureBase = _.featureBase;
        }, function (_b) {
            Point = _b.Point;
        }],
        execute: function () {
            pathFeatureException = Object.freeze({
                NO_CONSTRAINTS: 'Attempting to add a path feature with no constraints;\n                        i.e. number of path points',
                INVALID_CONSTRAINTS: 'Attempting to add a path feature with invalid constraints;\n                            number of points less than two',
                INVALID_CONSTRAINTS_POINT: 'Attempting to add a path point, but it does not contain\n                                    two coordinates x, y'
            });

            _export('pathFeatureException', pathFeatureException);
        }
    };
});
$__System.register('2c', ['27'], function (_export) {
    'use strict';

    var featureBase, extractConstraintsFrom, lowerUpperLimit;

    _export('scale', scale);

    function scale(params) {

        var constraints = extractConstraintsFrom(params),
            baseFeature = featureBase(params),
            limit = lowerUpperLimit(constraints),
            centroid = undefined;

        function matchWithValue(scale) {
            return scale !== 1 && scale >= limit.lower && scale <= limit.upper;
        }

        function totalInputObjectsScale(totalScaleFactor, inputObject) {
            var path = inputObject.path,
                currentPointScaleFactor = 1;

            if (path.length > 1) {
                var previousPoint = path[path.length - 2],
                    currentPoint = path[path.length - 1];

                var previousDistance = baseFeature.pointToPointDistance(centroid, previousPoint),
                    currentDistance = baseFeature.pointToPointDistance(centroid, currentPoint);
                currentPointScaleFactor = currentDistance / previousDistance;
            }

            return totalScaleFactor + currentPointScaleFactor;
        }

        return {
            type: function type() {
                return 'Scale';
            },
            load: function load(inputState) {
                var match = false,
                    inputObjects = baseFeature.inputObjectsFrom(inputState).filter(baseFeature.checkAgainstDefinition);

                var inputCount = inputObjects.length;

                if (inputCount > 1) {
                    centroid = baseFeature.calculateCentroid(inputObjects, true);
                    if (centroid) {
                        var totalScaleFactor = inputObjects.reduce(totalInputObjectsScale, 0),
                            averageScaleFactor = totalScaleFactor / inputCount;

                        match = matchWithValue(averageScaleFactor);
                        if (match) {
                            baseFeature.setMatchedValue(averageScaleFactor);
                        }
                    }
                }

                return match;
            },

            setValueToObject: baseFeature.setValueToObject
        };
    }

    return {
        setters: [function (_) {
            featureBase = _.featureBase;
            extractConstraintsFrom = _.extractConstraintsFrom;
            lowerUpperLimit = _.lowerUpperLimit;
        }],
        execute: function () {}
    };
});
$__System.register('2d', ['27', '28'], function (_export) {
    'use strict';

    var featureBase, lowerUpperLimit, extractConstraintsFrom, vector;

    _export('rotation', rotation);

    function rotation(params) {

        var constraints = extractConstraintsFrom(params),
            baseFeature = featureBase(params),
            touchInput = [],
            objectInput = [],
            rotationDirections = [],
            limit = lowerUpperLimit(constraints);

        function directionVector(first, second) {
            var x = second.screenX - first.screenX,

            // tuio has origin top left, convert to bottom left
            y = first.screenY - second.screenY,
                screenRatio = window.screen.width / window.screen.height;
            return vector(x, Math.floor(y * screenRatio));
        }

        function normalizeAngle(value) {
            // tuio uses values PI -> 2PI for rotation
            // stick to that instead of negative numbers for counter clockwise
            if (value < 0) {
                value += Math.PI * 2;
            }
            return value;
        }

        function directedAngleBetweenVectors(first, second) {
            // first minus second gives positive values moving clockwise
            var angle = Math.atan2(first.y, first.x) - Math.atan2(second.y, second.x);

            return normalizeAngle(angle);
        }

        function matchWithValue(angle) {
            return angle !== 0 && angle >= limit.lower && angle <= limit.upper;
        }

        function angleFromMovingAndFixedPoint(movingPoint, fixedPoint) {
            var path = movingPoint.path,
                angle = 0;

            if (path.length > 1) {
                var secondToLastPoint = path[path.length - 2],
                    lastPoint = path[path.length - 1];

                var fixedToSecondToLast = directionVector(fixedPoint, secondToLastPoint),
                    fixedToLast = directionVector(fixedPoint, lastPoint);

                angle = directedAngleBetweenVectors(fixedToSecondToLast, fixedToLast);
            }

            return angle;
        }

        function isClockwise(angle) {
            return angle < Math.PI;
        }

        function allValuesIdentical(array) {
            var first = array[0];
            for (var i = 1; i < array.length; i += 1) {
                if (first !== array[i]) {
                    return false;
                }
            }
            return true;
        }

        function calculateTouchAngle() {
            var centroid = baseFeature.calculateCentroid(touchInput, true),
                inputCount = 0,
                totalAngle = 0,
                averageAngle = 0;
            rotationDirections.length = 0;

            if (centroid) {
                for (var i = 0; i < touchInput.length; i += 1) {
                    var currentAngle = angleFromMovingAndFixedPoint(touchInput[i], centroid);
                    if (currentAngle !== 0) {
                        totalAngle += currentAngle;
                        inputCount += 1;
                        rotationDirections[rotationDirections.length] = isClockwise(currentAngle);
                    }
                }

                if (inputCount !== 0 && allValuesIdentical(rotationDirections)) {
                    averageAngle = totalAngle / inputCount;
                }
            }
            return averageAngle;
        }

        var objectRotations = new Map();
        function initRotationValues() {
            objectRotations.clear();
            return {
                touches: undefined,
                objects: objectRotations
            };
        }

        function sortTouchObjectInput(inputObjects) {
            touchInput.length = 0;
            objectInput.length = 0;
            for (var i = 0; i < inputObjects.length; i += 1) {
                var inputObject = inputObjects[i];
                if (baseFeature.checkAgainstDefinition(inputObject)) {
                    if (typeof inputObject.angle === 'undefined') {
                        touchInput[touchInput.length] = inputObject;
                    } else {
                        objectInput[objectInput.length] = inputObject;
                    }
                }
            }
        }

        function calculateObjectAngles(rotationValues) {
            var atLeastOneMatch = false;
            for (var i = 0; i < objectInput.length; i += 1) {
                var path = objectInput[i].path;
                if (path.length > 1) {
                    var firstAngle = path[path.length - 2].angle,
                        lastAngle = path[path.length - 1].angle;

                    var angle = normalizeAngle(lastAngle - firstAngle);
                    if (matchWithValue(angle)) {
                        atLeastOneMatch = true;
                        rotationValues.objects[objectInput[i].componentId] = angle;
                    }
                }
            }
            return atLeastOneMatch;
        }

        return {
            type: function type() {
                return 'Rotation';
            },
            load: function load(inputState) {
                var inputObjects = baseFeature.inputObjectsFrom(inputState),
                    match = false,
                    rotationValues = initRotationValues();

                sortTouchObjectInput(inputObjects);

                if (touchInput.length > 1) {
                    var averageAngle = calculateTouchAngle();
                    match = matchWithValue(averageAngle);
                    if (match) {
                        rotationValues.touches = averageAngle;
                    }
                }

                if (objectInput.length !== 0) {
                    var objectMatch = calculateObjectAngles(rotationValues);
                    match = match || objectMatch;
                }

                if (match) {
                    baseFeature.setMatchedValue(rotationValues);
                }

                return match;
            },

            setValueToObject: baseFeature.setValueToObject
        };
    }

    return {
        setters: [function (_2) {
            featureBase = _2.featureBase;
            lowerUpperLimit = _2.lowerUpperLimit;
            extractConstraintsFrom = _2.extractConstraintsFrom;
        }, function (_) {
            vector = _.vector;
        }],
        execute: function () {}
    };
});
$__System.register('2e', ['27'], function (_export) {
    'use strict';

    var featureBase, lowerUpperLimit, extractConstraintsFrom, delayException;

    _export('delay', delay);

    function delay(params) {

        isValidDelayFeature(params);

        var constraints = extractConstraintsFrom(params),
            baseFeature = featureBase(params),
            limit = lowerUpperLimit(constraints);

        function getTotalTimeDiff(totalTimeDiff, inputObject) {
            var currentTime = Date.now(),
                timeDiff = currentTime - inputObject.startingTime;

            return totalTimeDiff + timeDiff;
        }

        function inputWithinConstraints(inputObject) {
            var currentTime = Date.now(),
                timeDiff = currentTime - inputObject.startingTime;

            return timeDiff >= limit.lower && timeDiff <= limit.upper;
        }

        return {
            type: function type() {
                return 'Delay';
            },
            load: function load(inputState) {
                var inputObjects = baseFeature.inputObjectsFrom(inputState).filter(baseFeature.checkAgainstDefinition);
                var match = false;

                if (inputObjects.length > 0) {
                    match = inputObjects.every(inputWithinConstraints);
                    if (match) {
                        var totalTimeDiff = inputObjects.reduce(getTotalTimeDiff, 0);
                        var averageTimeDiff = totalTimeDiff / inputObjects.length;
                        baseFeature.setMatchedValue(averageTimeDiff);
                    }
                }
                return match;
            },
            setValueToObject: baseFeature.setValueToObject
        };
    }

    function isValidDelayFeature(params) {
        var constraints = params.constraints;

        if (typeof constraints === 'undefined') {
            throw new Error(delayException.NO_CONSTRAINTS);
        }
        if (!Array.isArray(constraints)) {
            throw new Error(delayException.INVALID_CONSTRAINTS + '; received ' + constraints);
        }
        if (constraints.length === 0) {
            throw new Error(delayException.NO_CONSTRAINTS + '; received empty array.');
        }
        if (constraints.length > 2) {
            throw new Error(delayException.INVALID_CONSTRAINTS + ';\n                            received more than 2 constraints.');
        }
        constraints.forEach(function (value) {
            if (typeof value !== 'number') {
                throw new Error(delayException.INVALID_CONSTRAINTS + ';\n                received: ' + typeof constraints[0] + ', ' + typeof constraints[1]);
            }
        });
    }
    return {
        setters: [function (_) {
            featureBase = _.featureBase;
            lowerUpperLimit = _.lowerUpperLimit;
            extractConstraintsFrom = _.extractConstraintsFrom;
        }],
        execute: function () {
            delayException = Object.freeze({
                NO_CONSTRAINTS: 'Attempting to add a delay feature with no constraints;\n                        i.e. lower and upper limit',
                INVALID_CONSTRAINTS: 'Attempting to add a delay feature with invalid constraints;\n                            expecting array of lower, upper'
            });

            _export('delayException', delayException);
        }
    };
});
$__System.register('2f', ['27'], function (_export) {
    'use strict';

    var featureBase, lowerUpperLimit, objectIdException;

    _export('objectid', objectid);

    function objectid(params) {

        isValidObjectIdFeature(params);

        var constraints = params.constraints;
        var baseFeature = featureBase(params);
        var limit = lowerUpperLimit(constraints);
        var componentIds = [];

        function idWithinRange(inputObject) {
            var componentId = inputObject.componentId;
            var match = componentId >= limit.lower && componentId <= limit.upper;
            return match;
        }

        function extractComponentIdsFrom(inputObjects) {
            componentIds.length = 0;
            for (var i = 0; i < inputObjects.length; i += 1) {
                componentIds[i] = inputObjects[i].componentId;
            }
            return componentIds;
        }

        return {
            type: function type() {
                return 'ObjectID';
            },
            load: function load(inputState) {
                var inputObjects = baseFeature.inputObjectsFrom(inputState).filter(baseFeature.checkAgainstDefinition);

                var match = inputObjects.length !== 0 && inputObjects.every(idWithinRange);
                if (match) {
                    var idValues = extractComponentIdsFrom(inputObjects);
                    baseFeature.setMatchedValue(idValues);
                }
                return match;
            },
            setValueToObject: baseFeature.setValueToObject
        };
    }

    function isValidObjectIdFeature(params) {
        var constraints = params.constraints;

        if (typeof constraints === 'undefined') {
            throw new Error(objectIdException.NO_CONSTRAINTS);
        }
        if (!Array.isArray(constraints) || constraints.length !== 2) {
            throw new Error(objectIdException.INVALID_CONSTRAINTS + ';\n                            received ' + constraints);
        }
        constraints.forEach(function (value) {
            if (typeof value !== 'number') {
                throw new Error(objectIdException.INVALID_CONSTRAINTS + ';\n                received: ' + typeof constraints[0] + ', ' + typeof constraints[1]);
            }
        });
    }

    return {
        setters: [function (_) {
            featureBase = _.featureBase;
            lowerUpperLimit = _.lowerUpperLimit;
        }],
        execute: function () {
            objectIdException = Object.freeze({
                NO_CONSTRAINTS: 'Attempting to add an objectId feature with no constraints;\n                        i.e. lower and upper range limit',
                INVALID_CONSTRAINTS: 'Attempting to add an objectId feature with invalid constraints;\n                            range has to contain lower and upper limit.'
            });

            _export('objectIdException', objectIdException);
        }
    };
});
$__System.register('30', ['27'], function (_export) {
    'use strict';

    var featureBase, lowerUpperLimit, objectParentException;

    _export('objectparent', objectparent);

    function objectparent(params) {

        isValidObjectParentFeature(params);

        var constraints = params.constraints;
        var baseFeature = featureBase(params);
        var limit = lowerUpperLimit(constraints);
        var userIds = [];

        function userIdWithinRange(inputObject) {
            var userId = inputObject.user,
                match = userId >= limit.lower && userId <= limit.upper;
            return match;
        }

        function extractUserIdsFrom(inputObjects) {
            userIds.length = 0;
            for (var i = 0; i < inputObjects.length; i += 1) {
                userIds[i] = inputObjects[i].user;
            }
            return userIds;
        }

        return {
            type: function type() {
                return 'ObjectParent';
            },
            load: function load(inputState) {
                var inputObjects = baseFeature.inputObjectsFrom(inputState).filter(baseFeature.checkAgainstDefinition);

                var match = inputObjects.length !== 0 && inputObjects.every(userIdWithinRange);
                if (match) {
                    var _userIds = extractUserIdsFrom(inputObjects);
                    baseFeature.setMatchedValue(_userIds);
                }
                return match;
            },
            setValueToObject: baseFeature.setValueToObject
        };
    }

    function isValidObjectParentFeature(params) {
        var constraints = params.constraints;

        if (typeof constraints === 'undefined') {
            throw new Error(objectParentException.NO_CONSTRAINTS);
        }
        if (!Array.isArray(constraints) || constraints.length !== 2) {
            throw new Error(objectParentException.INVALID_CONSTRAINTS + ';\n                            received ' + constraints);
        }
        constraints.forEach(function (value) {
            if (typeof value !== 'number') {
                throw new Error(objectParentException.INVALID_CONSTRAINTS + ';\n                received: ' + typeof constraints[0] + ', ' + typeof constraints[1]);
            }
        });
    }

    return {
        setters: [function (_) {
            featureBase = _.featureBase;
            lowerUpperLimit = _.lowerUpperLimit;
        }],
        execute: function () {
            objectParentException = Object.freeze({
                NO_CONSTRAINTS: 'Attempting to add an objectParent feature with no constraints;\n                        i.e. lower and upper range limit',
                INVALID_CONSTRAINTS: 'Attempting to add an objectParent feature with invalid constraints;\n                            range has to contain lower and upper limit.'
            });

            _export('objectParentException', objectParentException);
        }
    };
});
$__System.register('31', ['27'], function (_export) {
    'use strict';

    var featureBase, lowerUpperLimit, objectGroupException;

    _export('objectgroup', objectgroup);

    function objectgroup(params) {

        isValidObjectGroupFeature(params);

        var constraints = params.constraints;
        var baseFeature = featureBase(params);
        var limit = lowerUpperLimit(constraints);
        var radius = constraints[2];

        function centroidToInputDistance(inputObjects, centroid) {
            var largestDistance = 0;
            for (var i = 0; i < inputObjects.length; i += 1) {
                var distance = baseFeature.pointToPointDistance(inputObjects[i], centroid);
                if (distance > largestDistance) {
                    largestDistance = distance;
                }
            }
            return largestDistance;
        }

        return {
            type: function type() {
                return 'ObjectGroup';
            },
            load: function load(inputState) {
                var inputObjects = baseFeature.inputObjectsFrom(inputState).filter(baseFeature.checkAgainstDefinition),
                    count = inputObjects.length,
                    match = false;

                if (inputObjects.length > 1) {
                    var centroid = baseFeature.calculateCentroid(inputObjects),
                        largestDistance = centroidToInputDistance(inputObjects, centroid);

                    match = Math.floor(largestDistance) <= radius && count >= limit.lower && count <= limit.upper;

                    if (match) {
                        baseFeature.setMatchedValue({
                            radius: largestDistance,
                            midpoint: centroid
                        });
                    }
                }

                return match;
            },
            setValueToObject: baseFeature.setValueToObject
        };
    }

    function isValidObjectGroupFeature(params) {
        var constraints = params.constraints;

        if (typeof constraints === 'undefined') {
            throw new Error(objectGroupException.NO_CONSTRAINTS);
        }
        if (!Array.isArray(constraints) || constraints.length !== 3) {
            throw new Error(objectGroupException.INVALID_CONSTRAINTS + ';\n                            received ' + constraints);
        }
        constraints.forEach(function (value) {
            if (typeof value !== 'number') {
                throw new Error(objectGroupException.INVALID_CONSTRAINTS + ';\n                received: ' + typeof constraints[0] + ', ' + typeof constraints[1]);
            }
        });
    }

    return {
        setters: [function (_) {
            featureBase = _.featureBase;
            lowerUpperLimit = _.lowerUpperLimit;
        }],
        execute: function () {
            objectGroupException = Object.freeze({
                NO_CONSTRAINTS: 'Attempting to add an objectGroup feature with no constraints;\n                        i.e. lower and upper input limit, and radius',
                INVALID_CONSTRAINTS: 'Attempting to add an objectGroup feature with invalid constraints;\n                            has to contain lower and upper input limit, and radius'
            });

            _export('objectGroupException', objectGroupException);
        }
    };
});
$__System.register('25', ['26', '29', '30', '31', '2a', '2c', '2d', '2e', '2f'], function (_export) {
  'use strict';

  return {
    setters: [function (_) {
      var _exportObj = {};
      _exportObj['motion'] = _.motion;

      _export(_exportObj);
    }, function (_2) {
      var _exportObj2 = {};
      _exportObj2['count'] = _2.count;

      _export(_exportObj2);
    }, function (_3) {
      var _exportObj3 = {};
      _exportObj3['objectparent'] = _3.objectparent;

      _export(_exportObj3);
    }, function (_4) {
      var _exportObj4 = {};
      _exportObj4['objectgroup'] = _4.objectgroup;

      _export(_exportObj4);
    }, function (_a) {
      var _exportObj5 = {};
      _exportObj5['path'] = _a.path;

      _export(_exportObj5);
    }, function (_c) {
      var _exportObj6 = {};
      _exportObj6['scale'] = _c.scale;

      _export(_exportObj6);
    }, function (_d) {
      var _exportObj7 = {};
      _exportObj7['rotation'] = _d.rotation;

      _export(_exportObj7);
    }, function (_e) {
      var _exportObj8 = {};
      _exportObj8['delay'] = _e.delay;

      _export(_exportObj8);
    }, function (_f) {
      var _exportObj9 = {};
      _exportObj9['objectid'] = _f.objectid;

      _export(_exportObj9);
    }],
    execute: function () {}
  };
});
$__System.register('2b', [], function (_export) {
    /**
     * The $1 Unistroke Recognizer (JavaScript version)
     *
     *	Jacob O. Wobbrock, Ph.D.
     * 	The Information School
     *	University of Washington
     *	Seattle, WA 98195-2840
     *	wobbrock@uw.edu
     *
     *	Andrew D. Wilson, Ph.D.
     *	Microsoft Research
     *	One Microsoft Way
     *	Redmond, WA 98052
     *	awilson@microsoft.com
     *
     *	Yang Li, Ph.D.
     *	Department of Computer Science and Engineering
     * 	University of Washington
     *	Seattle, WA 98195-2840
     * 	yangli@cs.washington.edu
     *
     * The academic publication for the $1 recognizer, and what should be
     * used to cite it, is:
     *
     *	Wobbrock, J.O., Wilson, A.D. and Li, Y. (2007). Gestures without
     *	  libraries, toolkits or training: A $1 recognizer for user interface
     *	  prototypes. Proceedings of the ACM Symposium on User Interface
     *	  Software and Technology (UIST '07). Newport, Rhode Island (October
     *	  7-10, 2007). New York: ACM Press, pp. 159-168.
     *
     * The Protractor enhancement was separately published by Yang Li and programmed
     * here by Jacob O. Wobbrock:
     *
     *	Li, Y. (2010). Protractor: A fast and accurate gesture
     *	  recognizer. Proceedings of the ACM Conference on Human
     *	  Factors in Computing Systems (CHI '10). Atlanta, Georgia
     *	  (April 10-15, 2010). New York: ACM Press, pp. 2169-2172.
     *
     * This software is distributed under the "New BSD License" agreement:
     *
     * Copyright (C) 2007-2012, Jacob O. Wobbrock, Andrew D. Wilson and Yang Li.
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     *    * Redistributions of source code must retain the above copyright
     *      notice, this list of conditions and the following disclaimer.
     *    * Redistributions in binary form must reproduce the above copyright
     *      notice, this list of conditions and the following disclaimer in the
     *      documentation and/or other materials provided with the distribution.
     *    * Neither the names of the University of Washington nor Microsoft,
     *      nor the names of its contributors may be used to endorse or promote
     *      products derived from this software without specific prior written
     *      permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
     * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
     * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
     * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Jacob O. Wobbrock OR Andrew D. Wilson
     * OR Yang Li BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
     * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
     * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
     * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
     * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
     * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    **/
    //
    // Point class
    //
    'use strict';

    var NumUnistrokes, NumPoints, SquareSize, Origin, Diagonal, HalfDiagonal, AngleRange, AnglePrecision, Phi;

    //
    // Rectangle class
    //

    _export('Point', Point);

    //
    // Private helper functions from this point down
    //

    _export('DollarRecognizer', DollarRecognizer);

    function Point(x, y) // constructor
    {
        this.X = x;
        this.Y = y;
    }

    function Rectangle(x, y, width, height) // constructor
    {
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
    }
    //
    // Unistroke class: a unistroke template
    //
    function Unistroke(name, points) // constructor
    {
        this.Name = name;
        this.Points = Resample(points, NumPoints);
        var radians = IndicativeAngle(this.Points);
        this.Points = RotateBy(this.Points, -radians);
        this.Points = ScaleTo(this.Points, SquareSize);
        this.Points = TranslateTo(this.Points, Origin);
        this.Vector = Vectorize(this.Points); // for Protractor
    }
    //
    // Result class
    //
    function Result(name, score) // constructor
    {
        this.Name = name;
        this.Score = score;
    }
    //
    // DollarRecognizer class constants
    //
    // Golden Ratio
    //
    // DollarRecognizer class
    //

    function DollarRecognizer() // constructor
    {
        //
        // one built-in unistroke per gesture type
        //
        this.Unistrokes = [];
        //
        // The $1 Gesture Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), and DeleteUserGestures()
        //
        this.Recognize = function (points, useProtractor) {
            points = Resample(points, NumPoints);
            var radians = IndicativeAngle(points);
            points = RotateBy(points, -radians);
            points = ScaleTo(points, SquareSize);
            points = TranslateTo(points, Origin);
            var vector = Vectorize(points); // for Protractor

            var b = +Infinity;
            var u = -1;
            for (var i = 0; i < this.Unistrokes.length; i++) // for each unistroke
            {
                var d;
                if (useProtractor) // for Protractor
                    d = OptimalCosineDistance(this.Unistrokes[i].Vector, vector);else // Golden Section Search (original $1)
                    d = DistanceAtBestAngle(points, this.Unistrokes[i], -AngleRange, +AngleRange, AnglePrecision);
                if (d < b) {
                    b = d; // best (least) distance
                    u = i; // unistroke
                }
            }
            return u == -1 ? new Result('No match.', 0.0) : new Result(this.Unistrokes[u].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal);
        };
        this.AddGesture = function (name, points) {
            this.Unistrokes[this.Unistrokes.length] = new Unistroke(name, points); // append new unistroke
            var num = 0;
            for (var i = 0; i < this.Unistrokes.length; i++) {
                if (this.Unistrokes[i].Name == name) num++;
            }
            return num;
        };
        this.DeleteUserGestures = function () {
            this.Unistrokes.length = NumUnistrokes; // clear any beyond the original set
            return NumUnistrokes;
        };
    }

    function Resample(points, n) {
        var I = PathLength(points) / (n - 1); // interval length
        var D = 0.0;
        var newpoints = new Array(points[0]);
        for (var i = 1; i < points.length; i++) {
            var d = Distance(points[i - 1], points[i]);
            if (D + d >= I) {
                var qx = points[i - 1].X + (I - D) / d * (points[i].X - points[i - 1].X);
                var qy = points[i - 1].Y + (I - D) / d * (points[i].Y - points[i - 1].Y);
                var q = new Point(qx, qy);
                newpoints[newpoints.length] = q; // append new point 'q'
                points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
                D = 0.0;
            } else D += d;
        }
        if (newpoints.length == n - 1) // somtimes we fall a rounding-error short of adding the last point, so add it if so
            newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
        return newpoints;
    }
    function IndicativeAngle(points) {
        var c = Centroid(points);
        return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
    }
    function RotateBy(points, radians) // rotates points around centroid
    {
        var c = Centroid(points);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++) {
            var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X;
            var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    function ScaleTo(points, size) // non-uniform scale; assumes 2D gestures (i.e., no lines)
    {
        var B = BoundingBox(points);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++) {
            var qx = points[i].X * (size / B.Width);
            var qy = points[i].Y * (size / B.Height);
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    function TranslateTo(points, pt) // translates points' centroid
    {
        var c = Centroid(points);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++) {
            var qx = points[i].X + pt.X - c.X;
            var qy = points[i].Y + pt.Y - c.Y;
            newpoints[newpoints.length] = new Point(qx, qy);
        }
        return newpoints;
    }
    function Vectorize(points) // for Protractor
    {
        var sum = 0.0;
        var vector = new Array();
        for (var i = 0; i < points.length; i++) {
            vector[vector.length] = points[i].X;
            vector[vector.length] = points[i].Y;
            sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
        }
        var magnitude = Math.sqrt(sum);
        for (var j = 0; j < vector.length; j++) vector[j] /= magnitude;
        return vector;
    }
    function OptimalCosineDistance(v1, v2) // for Protractor
    {
        var a = 0.0;
        var b = 0.0;
        for (var i = 0; i < v1.length; i += 2) {
            a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
            b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
        }
        var angle = Math.atan(b / a);
        return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
    }
    function DistanceAtBestAngle(points, T, a, b, threshold) {
        var x1 = Phi * a + (1.0 - Phi) * b;
        var f1 = DistanceAtAngle(points, T, x1);
        var x2 = (1.0 - Phi) * a + Phi * b;
        var f2 = DistanceAtAngle(points, T, x2);
        while (Math.abs(b - a) > threshold) {
            if (f1 < f2) {
                b = x2;
                x2 = x1;
                f2 = f1;
                x1 = Phi * a + (1.0 - Phi) * b;
                f1 = DistanceAtAngle(points, T, x1);
            } else {
                a = x1;
                x1 = x2;
                f1 = f2;
                x2 = (1.0 - Phi) * a + Phi * b;
                f2 = DistanceAtAngle(points, T, x2);
            }
        }
        return Math.min(f1, f2);
    }
    function DistanceAtAngle(points, T, radians) {
        var newpoints = RotateBy(points, radians);
        return PathDistance(newpoints, T.Points);
    }
    function Centroid(points) {
        var x = 0.0,
            y = 0.0;
        for (var i = 0; i < points.length; i++) {
            x += points[i].X;
            y += points[i].Y;
        }
        x /= points.length;
        y /= points.length;
        return new Point(x, y);
    }
    function BoundingBox(points) {
        var minX = +Infinity,
            maxX = -Infinity,
            minY = +Infinity,
            maxY = -Infinity;
        for (var i = 0; i < points.length; i++) {
            minX = Math.min(minX, points[i].X);
            minY = Math.min(minY, points[i].Y);
            maxX = Math.max(maxX, points[i].X);
            maxY = Math.max(maxY, points[i].Y);
        }
        return new Rectangle(minX, minY, maxX - minX, maxY - minY);
    }
    function PathDistance(pts1, pts2) {
        var d = 0.0;
        for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
        d += Distance(pts1[i], pts2[i]);
        return d / pts1.length;
    }
    function PathLength(points) {
        var d = 0.0;
        for (var i = 1; i < points.length; i++) d += Distance(points[i - 1], points[i]);
        return d;
    }
    function Distance(p1, p2) {
        var dx = p2.X - p1.X;
        var dy = p2.Y - p1.Y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    function Deg2Rad(d) {
        return d * Math.PI / 180.0;
    }
    return {
        setters: [],
        execute: function () {
            NumUnistrokes = 0;
            NumPoints = 64;
            SquareSize = 250.0;
            Origin = new Point(0, 0);
            Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
            HalfDiagonal = 0.5 * Diagonal;
            AngleRange = Deg2Rad(45.0);
            AnglePrecision = Deg2Rad(2.0);
            Phi = 0.5 * (-1.0 + Math.sqrt(5.0));
        }
    };
});
$__System.register('28', [], function (_export) {
    'use strict';

    var Vector, vectorPool, usedVectors, vectorPoolSize, i;

    _export('vector', vector);

    function vector() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        if (usedVectors === vectorPoolSize) {
            usedVectors = 0;
        }

        var vectorObject = vectorPool[usedVectors];

        vectorObject.setCoordinates(x, y);
        usedVectors += 1;

        return vectorObject;
    }

    return {
        setters: [],
        execute: function () {
            Vector = (function () {
                function Vector(x, y) {
                    babelHelpers.classCallCheck(this, Vector);

                    this.exceptions = Object.freeze({
                        ILLEGAL_COORDINATES: 'Initializing a vector with incorrect coordinates',
                        ILLEGAL_ADD: 'Adding to a vector with a non-vector value',
                        ILLEGAL_SCALAR: 'Multiplying a vector with a non-scalar value',
                        INVALID_VECTOR: 'Invalid vector'
                    });
                    this.x = x;
                    this.y = y;
                }

                Vector.prototype.validVector = function validVector(x, y) {
                    return typeof x === 'number' && typeof y === 'number';
                };

                Vector.prototype.validScalar = function validScalar(value) {
                    if (typeof value !== 'number') {
                        throw new Error(this.exceptions.ILLEGAL_SCALAR + '. Instead using: ' + value);
                    }
                };

                Vector.prototype.vectorInvalid = function vectorInvalid() {
                    var error = arguments.length <= 0 || arguments[0] === undefined ? this.exceptions.INVALID_VECTOR : arguments[0];

                    throw new Error(error + '.\n                                Expecting {x: Number, y: Number}.\n                                Received ' + typeof x + ' ' + typeof y);
                };

                Vector.prototype.add = function add() {
                    var vectorToAdd = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var x = vectorToAdd.x;
                    var y = vectorToAdd.y;

                    if (!this.validVector(x, y)) {
                        throw new Error(this.exceptions.ILLEGAL_ADD + '.\n                                Instead using: ' + vectorToAdd);
                    }
                    this.x += x;
                    this.y += y;
                    return this;
                };

                Vector.prototype.scaleWith = function scaleWith(value) {
                    return this.scaleX(value).scaleY(value);
                };

                Vector.prototype.scaleX = function scaleX(value) {
                    this.validScalar(value);
                    this.x *= value;
                    return this;
                };

                Vector.prototype.scaleY = function scaleY(value) {
                    this.validScalar(value);
                    this.y *= value;
                    return this;
                };

                Vector.prototype.length = function length() {
                    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
                };

                Vector.prototype.dot = function dot() {
                    var withVector = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var x = withVector.x;
                    var y = withVector.y;

                    if (!this.validVector(x, y)) {
                        this.vectorInvalid();
                    }
                    return this.x * x + this.y * y;
                };

                Vector.prototype.setCoordinates = function setCoordinates() {
                    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

                    if (!this.validVector(x, y)) {
                        this.vectorInvalid(this.exceptions.ILLEGAL_COORDINATES);
                    }
                    this.x = x;
                    this.y = y;
                    return this;
                };

                return Vector;
            })();

            vectorPool = [];
            usedVectors = 0;

            // needs to be fixed
            vectorPoolSize = 100;

            for (i = 0; i < vectorPoolSize; i += 1) {
                vectorPool.push(new Vector());
            }
        }
    };
});
$__System.register('32', [], function (_export) {
    'use strict';

    var instance;

    _export('default', screenCalibration);

    function screenCalibration() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var listenForInputEvent = true;
        var mouseEvent = params.mouseEvent;
        var _params$pause = params.pause;
        var inputEventPause = _params$pause === undefined ? 2000 : _params$pause;
        var browserCoordinates = {
            screenX: undefined,
            screenY: undefined,
            clientX: undefined,
            clientY: undefined,
            pageX: undefined,
            pageY: undefined
        };

        function viewportPositionTop() {
            return mouseEvent.screenY - mouseEvent.clientY;
        }

        function viewportPositionLeft() {
            return mouseEvent.screenX - mouseEvent.clientX;
        }

        function captureEvent(event) {
            if (listenForInputEvent) {

                calibrationMouseEvent(event);
                listenForInputEvent = false;

                setTimeout(function pauseBeforeAllowingRecalibration() {
                    listenForInputEvent = true;
                }, inputEventPause);
            }
        }

        function calibrationMouseEvent() {
            var event = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (typeof event.clientX === 'undefined' || typeof event.clientY === 'undefined' || typeof event.screenX === 'undefined' || typeof event.screenY === 'undefined') {
                throw new Error('Mouse event passed for calibration not\n                                a valid event');
            }
            mouseEvent = event;

            return this;
        }

        // called before the object is returned
        if (typeof mouseEvent !== 'undefined') {
            calibrationMouseEvent(mouseEvent);
        }
        document.addEventListener('mouseover', captureEvent);

        instance = {
            mouseEvent: calibrationMouseEvent,

            viewportPosition: function viewportPosition() {
                var top = viewportPositionTop(),
                    left = viewportPositionLeft();

                return { top: top, left: left };
            },

            screenToBrowserCoordinates: function screenToBrowserCoordinates(screenX, screenY) {
                var clientX = screenX - viewportPositionLeft(),
                    clientY = screenY - viewportPositionTop();

                browserCoordinates.clientX = clientX;
                browserCoordinates.clientY = clientY;
                browserCoordinates.screenX = screenX;
                browserCoordinates.screenY = screenY;
                browserCoordinates.pageX = clientX + window.pageXOffset, browserCoordinates.pageY = clientY + window.pageYOffset;

                return browserCoordinates;
            },

            isScreenUsable: function isScreenUsable() {
                return typeof mouseEvent !== 'undefined';
            }
        };

        return instance;
    }

    return {
        setters: [],
        execute: function () {
            instance = undefined;

            screenCalibration.instance = function calibrationInstance() {
                if (typeof instance === 'undefined') {
                    instance = screenCalibration();
                }
                return instance;
            };
        }
    };
});
$__System.register('27', ['25', '28', '32', '33', '2b'], function (_export) {
    'use strict';

    var features, vector, screenCalibration, extractDurationFrom, validInputFromDuration, DollarRecognizer, singleRecognizerInstance, featureException;

    _export('featureFactory', featureFactory);

    _export('featureBase', featureBase);

    _export('extractConstraintsFrom', extractConstraintsFrom);

    _export('lowerUpperLimit', lowerUpperLimit);

    _export('lowerUpperVectorLimit', lowerUpperVectorLimit);

    _export('clearUserDefinedPaths', clearUserDefinedPaths);

    function featureFactory() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var _params$type = params.type;
        var type = _params$type === undefined ? '' : _params$type;

        type = type.toLowerCase();
        var constructor = features[type];

        if (typeof constructor === 'undefined') {
            throw new Error(featureException.NONEXISTING + ' ' + type);
        }
        if (type === 'path') {
            params.recognizer = singleRecognizerInstance;
        }

        return constructor(params);
    }

    function featureBase(params) {
        var filters = params.filters;
        var type = params.type;
        var duration = extractDurationFrom(params);
        var matchedValue = undefined;
        // TODO
        // maybe pass in an instance somehow
        var calibration = screenCalibration.instance();

        function matchFiltersWith(inputObject) {
            //tuio v1 objects and cursors have not typeid
            //unknown typeId in v2 is 0
            var typeId = inputObject.type ? inputObject.type : 0,
                typeIdKnown = typeId !== 0,
                hasNoFilters = typeof filters === 'undefined',
                filtersMatch = false;

            if (typeIdKnown) {
                var typeIdAsBitmask = 1 << typeId - 1;
                filtersMatch = !!(filters & typeIdAsBitmask);
            }

            return hasNoFilters || filtersMatch;
        }

        return {
            inputObjectsFrom: function inputObjectsFrom(inputState) {
                var inputObjects = inputState.inputObjects;
                var inputHistory = inputState.inputHistory;

                // for individual features, take the whole history
                // when duration defined
                // allows for features like double tap
                if (duration.definition.length !== 0) {
                    inputObjects = validInputFromDuration(inputHistory, duration);
                }
                return inputObjects;
            },
            checkAgainstDefinition: function checkAgainstDefinition(inputObject) {
                return matchFiltersWith(inputObject);
            },
            setMatchedValue: function setMatchedValue(value) {
                matchedValue = value;
            },
            setValueToObject: function setValueToObject(featureValues) {
                if (typeof featureValues === 'object') {
                    featureValues[type.toLowerCase()] = matchedValue;
                }
            },
            pointToPointDistance: function pointToPointDistance(first, second) {
                var x = first.screenX - second.screenX,
                    y = first.screenY - second.screenY,
                    directionVector = vector(x, y);

                return directionVector.length();
            },
            calculateCentroid: function calculateCentroid(inputObjects) {
                var useFirstPointInPath = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

                var inputCount = inputObjects.length,
                    screenX = 0,
                    screenY = 0;

                for (var i = 0; i < inputCount; i += 1) {
                    var object = inputObjects[i];
                    if (useFirstPointInPath) {
                        if (object.path.length < 2) {
                            return;
                        }
                        object = object.path[object.path.length - 2];
                    }
                    screenX += object.screenX;
                    screenY += object.screenY;
                }

                screenX /= inputCount;
                screenY /= inputCount;

                return calibration.screenToBrowserCoordinates(screenX, screenY);
            }
        };
    }

    function extractConstraintsFrom(params) {
        var constraints = params.constraints;
        var defaultLowerLimit = 0;
        var defaultUpperLimit = Number.POSITIVE_INFINITY;

        if (!Array.isArray(constraints)) {
            constraints = [defaultLowerLimit, defaultUpperLimit];
        }
        if (constraints.length === 0) {
            constraints.push(defaultLowerLimit);
        }
        if (constraints.length === 1) {
            constraints.push(defaultUpperLimit);
        }
        return constraints;
    }

    function lowerUpperLimit() {
        var constraints = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        var lower = constraints[0],
            upper = constraints[1];

        return { lower: lower, upper: upper };
    }

    function lowerUpperVectorLimit() {
        var constraints = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        // basicaly creates an object like
        // object.lower.x, object.lower.y
        // object.upper.x, object.upper.y
        return lowerUpperLimit([{
            x: constraints[0][0],
            y: constraints[0][1]
        }, {
            x: constraints[1][0],
            y: constraints[1][1]
        }]);
    }

    function clearUserDefinedPaths() {
        singleRecognizerInstance.DeleteUserGestures();
    }

    return {
        setters: [function (_) {
            features = _;
        }, function (_3) {
            vector = _3.vector;
        }, function (_4) {
            screenCalibration = _4['default'];
        }, function (_2) {
            extractDurationFrom = _2.extractDurationFrom;
            validInputFromDuration = _2.validInputFromDuration;
        }, function (_b) {
            DollarRecognizer = _b.DollarRecognizer;
        }],
        execute: function () {
            singleRecognizerInstance = new DollarRecognizer();
            featureException = Object.freeze({
                NONEXISTING: 'Attempting to add a gesture with a non-existing feature:'
            });

            _export('featureException', featureException);
        }
    };
});
$__System.registerDynamic("1e", ["4", "34"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      Tuio.Component = $__require('34');
    }
    Tuio.Pointer = Tuio.Component.extend({
      pointerId: null,
      typeId: null,
      userId: null,
      componentId: null,
      shear: null,
      radius: null,
      pressure: null,
      pressureSpeed: null,
      pressureAccel: null,
      initialize: function(params) {
        params = params || {};
        Tuio.Component.prototype.initialize.call(this, params);
        this.pointerId = params.pi;
        this.typeId = params.ti;
        this.userId = params.ui;
        this.componentId = params.ci;
        this.shear = params.sa;
        this.radius = params.r;
        this.pressure = params.p;
        this.pressureSpeed = params.ps;
        this.pressureAccel = params.pa;
      },
      getPointerId: function() {
        return this.pointerId;
      },
      getTypeId: function() {
        return this.typeId;
      },
      getUserId: function() {
        return this.userId;
      },
      getComponentId: function() {
        return this.componentId;
      },
      getShear: function() {
        return this.shear;
      },
      getRadius: function() {
        return this.radius;
      },
      getPressure: function() {
        return this.pressure;
      },
      getPressureSpeed: function() {
        return this.pressureSpeed;
      },
      getPressureAccel: function() {
        return this.pressureAccel;
      },
      update: function(params) {
        params = params || {};
        Tuio.Component.prototype.update.call(this, params);
        this.shear = params.sa;
        this.radius = params.r;
        this.pressure = params.p;
        this.pressureSpeed = params.ps;
        this.pressureAccel = params.pa;
      }
    }, {fromPointer: function(tptr) {
        return new Tuio.Pointer({
          ti: tptr.getTypeId(),
          ui: tptr.getUserId(),
          pi: tptr.getPointerId(),
          xp: tptr.getX(),
          yp: tptr.getY(),
          ci: tptr.getComponentId(),
          a: tptr.getAngle(),
          sa: tptr.getShear(),
          r: tptr.getRadius(),
          p: tptr.getPressure(),
          tobj: tptr.getContainingTuioObject()
        });
      }});
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Pointer;
    }
  }(this));
  return module.exports;
});

$__System.registerDynamic("35", ["4", "36"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      Tuio.Container = $__require('36');
    }
    Tuio.Cursor = Tuio.Container.extend({
      cursorId: null,
      initialize: function(params) {
        Tuio.Container.prototype.initialize.call(this, params);
        this.cursorId = params.ci;
      },
      getCursorId: function() {
        return this.cursorId;
      }
    }, {fromCursor: function(tcur) {
        return new Tuio.Cursor({
          si: tcur.getSessionId(),
          ci: tcur.getCursorId(),
          xp: tcur.getX(),
          yp: tcur.getY()
        });
      }});
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Cursor;
    }
  }(this));
  return module.exports;
});

$__System.registerDynamic("34", ["4", "36"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      Tuio.Container = $__require('36');
    }
    Tuio.Component = Tuio.Container.extend({
      container: null,
      angle: null,
      rotationSpeed: null,
      rotationAccel: null,
      initialize: function(params) {
        params = params || {};
        Tuio.Container.prototype.initialize.call(this, params);
        this.container = params.tobj;
        this.angle = params.a;
        this.rotationSpeed = params.rs || 0;
        this.rotationAccel = params.ra || 0;
      },
      update: function(params) {
        Tuio.Container.prototype.update.call(this, params);
        this.angle = params.a;
        this.rotationSpeed = params.rs;
        this.rotationAccel = params.ra;
      },
      getContainingTuioObject: function() {
        return this.container;
      },
      getSessionId: function() {
        if (typeof this.container !== "undefined") {
          return this.container.getSessionId();
        }
      },
      getAngle: function() {
        return this.angle;
      },
      getRotationSpeed: function() {
        return this.rotationSpeed;
      },
      getRotationAccel: function() {
        return this.rotationAccel;
      },
      setTypeUserId: function(tu_id) {
        var arrayBuffer = new ArrayBuffer(4),
            bufferView = new DataView(arrayBuffer);
        bufferView.setUint32(0, tu_id);
        this.typeId = bufferView.getUint16(0);
        this.userId = bufferView.getUint16(2);
      }
    }, {});
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Component;
    }
  }(this));
  return module.exports;
});

$__System.registerDynamic("37", ["4", "34"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      Tuio.Component = $__require('34');
    }
    Tuio.Token = Tuio.Component.extend({
      symbolId: null,
      typeId: null,
      userId: null,
      initialize: function(params) {
        params = params || {};
        Tuio.Component.prototype.initialize.call(this, params);
        this.symbolId = params.sym;
        this.typeId = params.ti;
        this.userId = params.ui;
      },
      getSymbolId: function() {
        return this.symbolId;
      },
      getTypeId: function() {
        return this.typeId;
      },
      getUserId: function() {
        return this.userId;
      }
    }, {fromToken: function(ttok) {
        return new Tuio.Token({
          ti: ttok.getTypeId(),
          ui: ttok.getUserId(),
          sym: ttok.getSymbolId(),
          xp: ttok.getX(),
          yp: ttok.getY(),
          rs: ttok.getRotationSpeed(),
          ra: ttok.getRotationAccel(),
          tobj: ttok.getContainingTuioObject(),
          a: ttok.getAngle()
        });
      }});
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Token;
    }
  }(this));
  return module.exports;
});

$__System.registerDynamic("38", ["4", "7"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      Tuio.Time = $__require('7');
    }
    Tuio.Point = Tuio.Model.extend({
      xPos: null,
      yPos: null,
      currentTime: null,
      startTime: null,
      initialize: function(params) {
        this.xPos = params.xp || 0;
        this.yPos = params.yp || 0;
        this.currentTime = Tuio.Time.fromTime(params.ttime || Tuio.Time.getSessionTime());
        this.startTime = Tuio.Time.fromTime(this.currentTime);
      },
      update: function(params) {
        this.xPos = params.xp;
        this.yPos = params.yp;
        if (params.hasOwnProperty("ttime")) {
          this.currentTime = Tuio.Time.fromTime(params.ttime);
        }
      },
      updateToPoint: function(tpoint) {
        this.xPos = tpoint.getX();
        this.yPos = tpoint.getY();
      },
      getX: function() {
        return this.xPos;
      },
      getY: function() {
        return this.yPos;
      },
      getDistance: function(xp, yp) {
        var dx = this.xPos - xp,
            dy = this.yPos - yp;
        return Math.sqrt(dx * dx + dy * dy);
      },
      getDistanceToPoint: function(tpoint) {
        return this.getDistance(tpoint.getX(), tpoint.getY());
      },
      getAngle: function(xp, yp) {
        var side = this.xPos - xp,
            height = this.yPos - yp,
            distance = this.getDistance(xp, yp),
            angle = Math.asin(side / distance) + Math.PI / 2;
        if (height < 0) {
          angle = 2 * Math.PI - angle;
        }
        return angle;
      },
      getAngleToPoint: function(tpoint) {
        return this.getAngle(tpoint.getX(), tpoint.getY());
      },
      getAngleDegrees: function(xp, yp) {
        return (this.getAngle(xp, yp) / Math.PI) * 180;
      },
      getAngleDegreesToPoint: function(tpoint) {
        return (this.getAngleToPoint(tpoint) / Math.PI) * 180;
      },
      getScreenX: function(width) {
        return Math.round(this.xPos * width);
      },
      getScreenY: function(height) {
        return Math.round(this.yPos * height);
      },
      getTuioTime: function() {
        return Tuio.Time.fromTime(this.currentTime);
      },
      getStartTime: function() {
        return Tuio.Time.fromTime(this.startTime);
      }
    }, {fromPoint: function(tpoint) {
        return new Tuio.Point({
          xp: tpoint.getX(),
          yp: tpoint.getY()
        });
      }});
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Point;
    }
  }(this));
  return module.exports;
});

$__System.registerDynamic("39", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  return module.exports;
});

$__System.registerDynamic("3a", ["39"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('39');
  return module.exports;
});

$__System.registerDynamic("3b", ["3a"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__System._nodeRequire ? process : $__require('3a');
  return module.exports;
});

$__System.registerDynamic("9", ["3b"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('3b');
  return module.exports;
});

$__System.registerDynamic("3c", ["9"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  (function(process) {
    ;
    (function() {
      var undefined;
      var VERSION = '3.10.1';
      var BIND_FLAG = 1,
          BIND_KEY_FLAG = 2,
          CURRY_BOUND_FLAG = 4,
          CURRY_FLAG = 8,
          CURRY_RIGHT_FLAG = 16,
          PARTIAL_FLAG = 32,
          PARTIAL_RIGHT_FLAG = 64,
          ARY_FLAG = 128,
          REARG_FLAG = 256;
      var DEFAULT_TRUNC_LENGTH = 30,
          DEFAULT_TRUNC_OMISSION = '...';
      var HOT_COUNT = 150,
          HOT_SPAN = 16;
      var LARGE_ARRAY_SIZE = 200;
      var LAZY_FILTER_FLAG = 1,
          LAZY_MAP_FLAG = 2;
      var FUNC_ERROR_TEXT = 'Expected a function';
      var PLACEHOLDER = '__lodash_placeholder__';
      var argsTag = '[object Arguments]',
          arrayTag = '[object Array]',
          boolTag = '[object Boolean]',
          dateTag = '[object Date]',
          errorTag = '[object Error]',
          funcTag = '[object Function]',
          mapTag = '[object Map]',
          numberTag = '[object Number]',
          objectTag = '[object Object]',
          regexpTag = '[object RegExp]',
          setTag = '[object Set]',
          stringTag = '[object String]',
          weakMapTag = '[object WeakMap]';
      var arrayBufferTag = '[object ArrayBuffer]',
          float32Tag = '[object Float32Array]',
          float64Tag = '[object Float64Array]',
          int8Tag = '[object Int8Array]',
          int16Tag = '[object Int16Array]',
          int32Tag = '[object Int32Array]',
          uint8Tag = '[object Uint8Array]',
          uint8ClampedTag = '[object Uint8ClampedArray]',
          uint16Tag = '[object Uint16Array]',
          uint32Tag = '[object Uint32Array]';
      var reEmptyStringLeading = /\b__p \+= '';/g,
          reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
          reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
          reUnescapedHtml = /[&<>"'`]/g,
          reHasEscapedHtml = RegExp(reEscapedHtml.source),
          reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g,
          reEvaluate = /<%([\s\S]+?)%>/g,
          reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
          reIsPlainProp = /^\w*$/,
          rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
      var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
          reHasRegExpChars = RegExp(reRegExpChars.source);
      var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reHasHexPrefix = /^0[xX]/;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsUint = /^\d+$/;
      var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var reWords = (function() {
        var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
            lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';
        return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
      }());
      var contextProps = ['Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number', 'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'isFinite', 'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap'];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        '\xc0': 'A',
        '\xc1': 'A',
        '\xc2': 'A',
        '\xc3': 'A',
        '\xc4': 'A',
        '\xc5': 'A',
        '\xe0': 'a',
        '\xe1': 'a',
        '\xe2': 'a',
        '\xe3': 'a',
        '\xe4': 'a',
        '\xe5': 'a',
        '\xc7': 'C',
        '\xe7': 'c',
        '\xd0': 'D',
        '\xf0': 'd',
        '\xc8': 'E',
        '\xc9': 'E',
        '\xca': 'E',
        '\xcb': 'E',
        '\xe8': 'e',
        '\xe9': 'e',
        '\xea': 'e',
        '\xeb': 'e',
        '\xcC': 'I',
        '\xcd': 'I',
        '\xce': 'I',
        '\xcf': 'I',
        '\xeC': 'i',
        '\xed': 'i',
        '\xee': 'i',
        '\xef': 'i',
        '\xd1': 'N',
        '\xf1': 'n',
        '\xd2': 'O',
        '\xd3': 'O',
        '\xd4': 'O',
        '\xd5': 'O',
        '\xd6': 'O',
        '\xd8': 'O',
        '\xf2': 'o',
        '\xf3': 'o',
        '\xf4': 'o',
        '\xf5': 'o',
        '\xf6': 'o',
        '\xf8': 'o',
        '\xd9': 'U',
        '\xda': 'U',
        '\xdb': 'U',
        '\xdc': 'U',
        '\xf9': 'u',
        '\xfa': 'u',
        '\xfb': 'u',
        '\xfc': 'u',
        '\xdd': 'Y',
        '\xfd': 'y',
        '\xff': 'y',
        '\xc6': 'Ae',
        '\xe6': 'ae',
        '\xde': 'Th',
        '\xfe': 'th',
        '\xdf': 'ss'
      };
      var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;'
      };
      var htmlUnescapes = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#96;': '`'
      };
      var objectTypes = {
        'function': true,
        'object': true
      };
      var regexpEscapes = {
        '0': 'x30',
        '1': 'x31',
        '2': 'x32',
        '3': 'x33',
        '4': 'x34',
        '5': 'x35',
        '6': 'x36',
        '7': 'x37',
        '8': 'x38',
        '9': 'x39',
        'A': 'x41',
        'B': 'x42',
        'C': 'x43',
        'D': 'x44',
        'E': 'x45',
        'F': 'x46',
        'a': 'x61',
        'b': 'x62',
        'c': 'x63',
        'd': 'x64',
        'e': 'x65',
        'f': 'x66',
        'n': 'x6e',
        'r': 'x72',
        't': 'x74',
        'u': 'x75',
        'v': 'x76',
        'x': 'x78'
      };
      var stringEscapes = {
        '\\': '\\',
        "'": "'",
        '\n': 'n',
        '\r': 'r',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      };
      var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
      var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
      var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;
      var freeSelf = objectTypes[typeof self] && self && self.Object && self;
      var freeWindow = objectTypes[typeof window] && window && window.Object && window;
      var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
      var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;
      function baseCompareAscending(value, other) {
        if (value !== other) {
          var valIsNull = value === null,
              valIsUndef = value === undefined,
              valIsReflexive = value === value;
          var othIsNull = other === null,
              othIsUndef = other === undefined,
              othIsReflexive = other === other;
          if ((value > other && !othIsNull) || !valIsReflexive || (valIsNull && !othIsUndef && othIsReflexive) || (valIsUndef && othIsReflexive)) {
            return 1;
          }
          if ((value < other && !valIsNull) || !othIsReflexive || (othIsNull && !valIsUndef && valIsReflexive) || (othIsUndef && valIsReflexive)) {
            return -1;
          }
        }
        return 0;
      }
      function baseFindIndex(array, predicate, fromRight) {
        var length = array.length,
            index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length)) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        if (value !== value) {
          return indexOfNaN(array, fromIndex);
        }
        var index = fromIndex - 1,
            length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function baseIsFunction(value) {
        return typeof value == 'function' || false;
      }
      function baseToString(value) {
        return value == null ? '' : (value + '');
      }
      function charsLeftIndex(string, chars) {
        var index = -1,
            length = string.length;
        while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
        return index;
      }
      function charsRightIndex(string, chars) {
        var index = string.length;
        while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
        return index;
      }
      function compareAscending(object, other) {
        return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
      }
      function compareMultiple(object, other, orders) {
        var index = -1,
            objCriteria = object.criteria,
            othCriteria = other.criteria,
            length = objCriteria.length,
            ordersLength = orders.length;
        while (++index < length) {
          var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
          if (result) {
            if (index >= ordersLength) {
              return result;
            }
            var order = orders[index];
            return result * ((order === 'asc' || order === true) ? 1 : -1);
          }
        }
        return object.index - other.index;
      }
      function deburrLetter(letter) {
        return deburredLetters[letter];
      }
      function escapeHtmlChar(chr) {
        return htmlEscapes[chr];
      }
      function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
        if (leadingChar) {
          chr = regexpEscapes[chr];
        } else if (whitespaceChar) {
          chr = stringEscapes[chr];
        }
        return '\\' + chr;
      }
      function escapeStringChar(chr) {
        return '\\' + stringEscapes[chr];
      }
      function indexOfNaN(array, fromIndex, fromRight) {
        var length = array.length,
            index = fromIndex + (fromRight ? 0 : -1);
        while ((fromRight ? index-- : ++index < length)) {
          var other = array[index];
          if (other !== other) {
            return index;
          }
        }
        return -1;
      }
      function isObjectLike(value) {
        return !!value && typeof value == 'object';
      }
      function isSpace(charCode) {
        return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 || (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
      }
      function replaceHolders(array, placeholder) {
        var index = -1,
            length = array.length,
            resIndex = -1,
            result = [];
        while (++index < length) {
          if (array[index] === placeholder) {
            array[index] = PLACEHOLDER;
            result[++resIndex] = index;
          }
        }
        return result;
      }
      function sortedUniq(array, iteratee) {
        var seen,
            index = -1,
            length = array.length,
            resIndex = -1,
            result = [];
        while (++index < length) {
          var value = array[index],
              computed = iteratee ? iteratee(value, index, array) : value;
          if (!index || seen !== computed) {
            seen = computed;
            result[++resIndex] = value;
          }
        }
        return result;
      }
      function trimmedLeftIndex(string) {
        var index = -1,
            length = string.length;
        while (++index < length && isSpace(string.charCodeAt(index))) {}
        return index;
      }
      function trimmedRightIndex(string) {
        var index = string.length;
        while (index-- && isSpace(string.charCodeAt(index))) {}
        return index;
      }
      function unescapeHtmlChar(chr) {
        return htmlUnescapes[chr];
      }
      function runInContext(context) {
        context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
        var Array = context.Array,
            Date = context.Date,
            Error = context.Error,
            Function = context.Function,
            Math = context.Math,
            Number = context.Number,
            Object = context.Object,
            RegExp = context.RegExp,
            String = context.String,
            TypeError = context.TypeError;
        var arrayProto = Array.prototype,
            objectProto = Object.prototype,
            stringProto = String.prototype;
        var fnToString = Function.prototype.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var objToString = objectProto.toString;
        var oldDash = root._;
        var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
        var ArrayBuffer = context.ArrayBuffer,
            clearTimeout = context.clearTimeout,
            parseFloat = context.parseFloat,
            pow = Math.pow,
            propertyIsEnumerable = objectProto.propertyIsEnumerable,
            Set = getNative(context, 'Set'),
            setTimeout = context.setTimeout,
            splice = arrayProto.splice,
            Uint8Array = context.Uint8Array,
            WeakMap = getNative(context, 'WeakMap');
        var nativeCeil = Math.ceil,
            nativeCreate = getNative(Object, 'create'),
            nativeFloor = Math.floor,
            nativeIsArray = getNative(Array, 'isArray'),
            nativeIsFinite = context.isFinite,
            nativeKeys = getNative(Object, 'keys'),
            nativeMax = Math.max,
            nativeMin = Math.min,
            nativeNow = getNative(Date, 'now'),
            nativeParseInt = context.parseInt,
            nativeRandom = Math.random;
        var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
            POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
        var MAX_ARRAY_LENGTH = 4294967295,
            MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
            HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var MAX_SAFE_INTEGER = 9007199254740991;
        var metaMap = WeakMap && new WeakMap;
        var realNames = {};
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        function baseLodash() {}
        function LodashWrapper(value, chainAll, actions) {
          this.__wrapped__ = value;
          this.__actions__ = actions || [];
          this.__chain__ = !!chainAll;
        }
        var support = lodash.support = {};
        lodash.templateSettings = {
          'escape': reEscape,
          'evaluate': reEvaluate,
          'interpolate': reInterpolate,
          'variable': '',
          'imports': {'_': lodash}
        };
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = POSITIVE_INFINITY;
          this.__views__ = [];
        }
        function lazyClone() {
          var result = new LazyWrapper(this.__wrapped__);
          result.__actions__ = arrayCopy(this.__actions__);
          result.__dir__ = this.__dir__;
          result.__filtered__ = this.__filtered__;
          result.__iteratees__ = arrayCopy(this.__iteratees__);
          result.__takeCount__ = this.__takeCount__;
          result.__views__ = arrayCopy(this.__views__);
          return result;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result = new LazyWrapper(this);
            result.__dir__ = -1;
            result.__filtered__ = true;
          } else {
            result = this.clone();
            result.__dir__ *= -1;
          }
          return result;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(),
              dir = this.__dir__,
              isArr = isArray(array),
              isRight = dir < 0,
              arrLength = isArr ? array.length : 0,
              view = getView(0, arrLength, this.__views__),
              start = view.start,
              end = view.end,
              length = end - start,
              index = isRight ? end : (start - 1),
              iteratees = this.__iteratees__,
              iterLength = iteratees.length,
              resIndex = 0,
              takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || arrLength < LARGE_ARRAY_SIZE || (arrLength == length && takeCount == length)) {
            return baseWrapperValue((isRight && isArr) ? array.reverse() : array, this.__actions__);
          }
          var result = [];
          outer: while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1,
                value = array[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex],
                  iteratee = data.iteratee,
                  type = data.type,
                  computed = iteratee(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result[resIndex++] = value;
          }
          return result;
        }
        function MapCache() {
          this.__data__ = {};
        }
        function mapDelete(key) {
          return this.has(key) && delete this.__data__[key];
        }
        function mapGet(key) {
          return key == '__proto__' ? undefined : this.__data__[key];
        }
        function mapHas(key) {
          return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
        }
        function mapSet(key, value) {
          if (key != '__proto__') {
            this.__data__[key] = value;
          }
          return this;
        }
        function SetCache(values) {
          var length = values ? values.length : 0;
          this.data = {
            'hash': nativeCreate(null),
            'set': new Set
          };
          while (length--) {
            this.push(values[length]);
          }
        }
        function cacheIndexOf(cache, value) {
          var data = cache.data,
              result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
          return result ? 0 : -1;
        }
        function cachePush(value) {
          var data = this.data;
          if (typeof value == 'string' || isObject(value)) {
            data.set.add(value);
          } else {
            data.hash[value] = true;
          }
        }
        function arrayConcat(array, other) {
          var index = -1,
              length = array.length,
              othIndex = -1,
              othLength = other.length,
              result = Array(length + othLength);
          while (++index < length) {
            result[index] = array[index];
          }
          while (++othIndex < othLength) {
            result[index++] = other[othIndex];
          }
          return result;
        }
        function arrayCopy(source, array) {
          var index = -1,
              length = source.length;
          array || (array = Array(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function arrayEach(array, iteratee) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEachRight(array, iteratee) {
          var length = array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEvery(array, predicate) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        function arrayExtremum(array, iteratee, comparator, exValue) {
          var index = -1,
              length = array.length,
              computed = exValue,
              result = computed;
          while (++index < length) {
            var value = array[index],
                current = +iteratee(value);
            if (comparator(current, computed)) {
              computed = current;
              result = value;
            }
          }
          return result;
        }
        function arrayFilter(array, predicate) {
          var index = -1,
              length = array.length,
              resIndex = -1,
              result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[++resIndex] = value;
            }
          }
          return result;
        }
        function arrayMap(array, iteratee) {
          var index = -1,
              length = array.length,
              result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        function arrayPush(array, values) {
          var index = -1,
              length = values.length,
              offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        function arrayReduce(array, iteratee, accumulator, initFromArray) {
          var index = -1,
              length = array.length;
          if (initFromArray && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
          var length = array.length;
          if (initFromArray && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        function arraySum(array, iteratee) {
          var length = array.length,
              result = 0;
          while (length--) {
            result += +iteratee(array[length]) || 0;
          }
          return result;
        }
        function assignDefaults(objectValue, sourceValue) {
          return objectValue === undefined ? sourceValue : objectValue;
        }
        function assignOwnDefaults(objectValue, sourceValue, key, object) {
          return (objectValue === undefined || !hasOwnProperty.call(object, key)) ? sourceValue : objectValue;
        }
        function assignWith(object, source, customizer) {
          var index = -1,
              props = keys(source),
              length = props.length;
          while (++index < length) {
            var key = props[index],
                value = object[key],
                result = customizer(value, source[key], key, object, source);
            if ((result === result ? (result !== value) : (value === value)) || (value === undefined && !(key in object))) {
              object[key] = result;
            }
          }
          return object;
        }
        function baseAssign(object, source) {
          return source == null ? object : baseCopy(source, keys(source), object);
        }
        function baseAt(collection, props) {
          var index = -1,
              isNil = collection == null,
              isArr = !isNil && isArrayLike(collection),
              length = isArr ? collection.length : 0,
              propsLength = props.length,
              result = Array(propsLength);
          while (++index < propsLength) {
            var key = props[index];
            if (isArr) {
              result[index] = isIndex(key, length) ? collection[key] : undefined;
            } else {
              result[index] = isNil ? undefined : collection[key];
            }
          }
          return result;
        }
        function baseCopy(source, props, object) {
          object || (object = {});
          var index = -1,
              length = props.length;
          while (++index < length) {
            var key = props[index];
            object[key] = source[key];
          }
          return object;
        }
        function baseCallback(func, thisArg, argCount) {
          var type = typeof func;
          if (type == 'function') {
            return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
          }
          if (func == null) {
            return identity;
          }
          if (type == 'object') {
            return baseMatches(func);
          }
          return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
        }
        function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
          var result;
          if (customizer) {
            result = object ? customizer(value, key, object) : customizer(value);
          }
          if (result !== undefined) {
            return result;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result = initCloneArray(value);
            if (!isDeep) {
              return arrayCopy(value, result);
            }
          } else {
            var tag = objToString.call(value),
                isFunc = tag == funcTag;
            if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
              result = initCloneObject(isFunc ? {} : value);
              if (!isDeep) {
                return baseAssign(result, value);
              }
            } else {
              return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : (object ? value : {});
            }
          }
          stackA || (stackA = []);
          stackB || (stackB = []);
          var length = stackA.length;
          while (length--) {
            if (stackA[length] == value) {
              return stackB[length];
            }
          }
          stackA.push(value);
          stackB.push(result);
          (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
            result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
          });
          return result;
        }
        var baseCreate = (function() {
          function object() {}
          return function(prototype) {
            if (isObject(prototype)) {
              object.prototype = prototype;
              var result = new object;
              object.prototype = undefined;
            }
            return result || {};
          };
        }());
        function baseDelay(func, wait, args) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return setTimeout(function() {
            func.apply(undefined, args);
          }, wait);
        }
        function baseDifference(array, values) {
          var length = array ? array.length : 0,
              result = [];
          if (!length) {
            return result;
          }
          var index = -1,
              indexOf = getIndexOf(),
              isCommon = indexOf == baseIndexOf,
              cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
              valuesLength = values.length;
          if (cache) {
            indexOf = cacheIndexOf;
            isCommon = false;
            values = cache;
          }
          outer: while (++index < length) {
            var value = array[index];
            if (isCommon && value === value) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values[valuesIndex] === value) {
                  continue outer;
                }
              }
              result.push(value);
            } else if (indexOf(values, value, 0) < 0) {
              result.push(value);
            }
          }
          return result;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result = true;
          baseEach(collection, function(value, index, collection) {
            result = !!predicate(value, index, collection);
            return result;
          });
          return result;
        }
        function baseExtremum(collection, iteratee, comparator, exValue) {
          var computed = exValue,
              result = computed;
          baseEach(collection, function(value, index, collection) {
            var current = +iteratee(value, index, collection);
            if (comparator(current, computed) || (current === exValue && current === result)) {
              computed = current;
              result = value;
            }
          });
          return result;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = start == null ? 0 : (+start || 0);
          if (start < 0) {
            start = -start > length ? 0 : (length + start);
          }
          end = (end === undefined || end > length) ? length : (+end || 0);
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : (end >>> 0);
          start >>>= 0;
          while (start < length) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result = [];
          baseEach(collection, function(value, index, collection) {
            if (predicate(value, index, collection)) {
              result.push(value);
            }
          });
          return result;
        }
        function baseFind(collection, predicate, eachFunc, retKey) {
          var result;
          eachFunc(collection, function(value, key, collection) {
            if (predicate(value, key, collection)) {
              result = retKey ? key : value;
              return false;
            }
          });
          return result;
        }
        function baseFlatten(array, isDeep, isStrict, result) {
          result || (result = []);
          var index = -1,
              length = array.length;
          while (++index < length) {
            var value = array[index];
            if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
              if (isDeep) {
                baseFlatten(value, isDeep, isStrict, result);
              } else {
                arrayPush(result, value);
              }
            } else if (!isStrict) {
              result[result.length] = value;
            }
          }
          return result;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForIn(object, iteratee) {
          return baseFor(object, iteratee, keysIn);
        }
        function baseForOwn(object, iteratee) {
          return baseFor(object, iteratee, keys);
        }
        function baseForOwnRight(object, iteratee) {
          return baseForRight(object, iteratee, keys);
        }
        function baseFunctions(object, props) {
          var index = -1,
              length = props.length,
              resIndex = -1,
              result = [];
          while (++index < length) {
            var key = props[index];
            if (isFunction(object[key])) {
              result[++resIndex] = key;
            }
          }
          return result;
        }
        function baseGet(object, path, pathKey) {
          if (object == null) {
            return;
          }
          if (pathKey !== undefined && pathKey in toObject(object)) {
            path = [pathKey];
          }
          var index = 0,
              length = path.length;
          while (object != null && index < length) {
            object = object[path[index++]];
          }
          return (index && index == length) ? object : undefined;
        }
        function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
        }
        function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var objIsArr = isArray(object),
              othIsArr = isArray(other),
              objTag = arrayTag,
              othTag = arrayTag;
          if (!objIsArr) {
            objTag = objToString.call(object);
            if (objTag == argsTag) {
              objTag = objectTag;
            } else if (objTag != objectTag) {
              objIsArr = isTypedArray(object);
            }
          }
          if (!othIsArr) {
            othTag = objToString.call(other);
            if (othTag == argsTag) {
              othTag = objectTag;
            } else if (othTag != objectTag) {
              othIsArr = isTypedArray(other);
            }
          }
          var objIsObj = objTag == objectTag,
              othIsObj = othTag == objectTag,
              isSameTag = objTag == othTag;
          if (isSameTag && !(objIsArr || objIsObj)) {
            return equalByTag(object, other, objTag);
          }
          if (!isLoose) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
            if (objIsWrapped || othIsWrapped) {
              return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stackA || (stackA = []);
          stackB || (stackB = []);
          var length = stackA.length;
          while (length--) {
            if (stackA[length] == object) {
              return stackB[length] == other;
            }
          }
          stackA.push(object);
          stackB.push(other);
          var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
          stackA.pop();
          stackB.pop();
          return result;
        }
        function baseIsMatch(object, matchData, customizer) {
          var index = matchData.length,
              length = index,
              noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = toObject(object);
          while (index--) {
            var data = matchData[index];
            if ((noCustomizer && data[2]) ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0],
                objValue = object[key],
                srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined && !(key in object)) {
                return false;
              }
            } else {
              var result = customizer ? customizer(objValue, srcValue, key) : undefined;
              if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseMap(collection, iteratee) {
          var index = -1,
              result = isArrayLike(collection) ? Array(collection.length) : [];
          baseEach(collection, function(value, key, collection) {
            result[++index] = iteratee(value, key, collection);
          });
          return result;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            var key = matchData[0][0],
                value = matchData[0][1];
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === value && (value !== undefined || (key in toObject(object)));
            };
          }
          return function(object) {
            return baseIsMatch(object, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          var isArr = isArray(path),
              isCommon = isKey(path) && isStrictComparable(srcValue),
              pathKey = (path + '');
          path = toPath(path);
          return function(object) {
            if (object == null) {
              return false;
            }
            var key = pathKey;
            object = toObject(object);
            if ((isArr || !isCommon) && !(key in object)) {
              object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
              if (object == null) {
                return false;
              }
              key = last(path);
              object = toObject(object);
            }
            return object[key] === srcValue ? (srcValue !== undefined || (key in object)) : baseIsEqual(srcValue, object[key], undefined, true);
          };
        }
        function baseMerge(object, source, customizer, stackA, stackB) {
          if (!isObject(object)) {
            return object;
          }
          var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
              props = isSrcArr ? undefined : keys(source);
          arrayEach(props || source, function(srcValue, key) {
            if (props) {
              key = srcValue;
              srcValue = source[key];
            }
            if (isObjectLike(srcValue)) {
              stackA || (stackA = []);
              stackB || (stackB = []);
              baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
            } else {
              var value = object[key],
                  result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
                  isCommon = result === undefined;
              if (isCommon) {
                result = srcValue;
              }
              if ((result !== undefined || (isSrcArr && !(key in object))) && (isCommon || (result === result ? (result !== value) : (value === value)))) {
                object[key] = result;
              }
            }
          });
          return object;
        }
        function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
          var length = stackA.length,
              srcValue = source[key];
          while (length--) {
            if (stackA[length] == srcValue) {
              object[key] = stackB[length];
              return;
            }
          }
          var value = object[key],
              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
              isCommon = result === undefined;
          if (isCommon) {
            result = srcValue;
            if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
              result = isArray(value) ? value : (isArrayLike(value) ? arrayCopy(value) : []);
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              result = isArguments(value) ? toPlainObject(value) : (isPlainObject(value) ? value : {});
            } else {
              isCommon = false;
            }
          }
          stackA.push(srcValue);
          stackB.push(result);
          if (isCommon) {
            object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
          } else if (result === result ? (result !== value) : (value === value)) {
            object[key] = result;
          }
        }
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined : object[key];
          };
        }
        function basePropertyDeep(path) {
          var pathKey = (path + '');
          path = toPath(path);
          return function(object) {
            return baseGet(object, path, pathKey);
          };
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0;
          while (length--) {
            var index = indexes[length];
            if (index != previous && isIndex(index)) {
              var previous = index;
              splice.call(array, index, 1);
            }
          }
          return array;
        }
        function baseRandom(min, max) {
          return min + nativeFloor(nativeRandom() * (max - min + 1));
        }
        function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
          eachFunc(collection, function(value, index, collection) {
            accumulator = initFromCollection ? (initFromCollection = false, value) : iteratee(accumulator, value, index, collection);
          });
          return accumulator;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        function baseSlice(array, start, end) {
          var index = -1,
              length = array.length;
          start = start == null ? 0 : (+start || 0);
          if (start < 0) {
            start = -start > length ? 0 : (length + start);
          }
          end = (end === undefined || end > length) ? length : (+end || 0);
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : ((end - start) >>> 0);
          start >>>= 0;
          var result = Array(length);
          while (++index < length) {
            result[index] = array[index + start];
          }
          return result;
        }
        function baseSome(collection, predicate) {
          var result;
          baseEach(collection, function(value, index, collection) {
            result = predicate(value, index, collection);
            return !result;
          });
          return !!result;
        }
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        function baseSortByOrder(collection, iteratees, orders) {
          var callback = getCallback(),
              index = -1;
          iteratees = arrayMap(iteratees, function(iteratee) {
            return callback(iteratee);
          });
          var result = baseMap(collection, function(value) {
            var criteria = arrayMap(iteratees, function(iteratee) {
              return iteratee(value);
            });
            return {
              'criteria': criteria,
              'index': ++index,
              'value': value
            };
          });
          return baseSortBy(result, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function baseSum(collection, iteratee) {
          var result = 0;
          baseEach(collection, function(value, index, collection) {
            result += +iteratee(value, index, collection) || 0;
          });
          return result;
        }
        function baseUniq(array, iteratee) {
          var index = -1,
              indexOf = getIndexOf(),
              length = array.length,
              isCommon = indexOf == baseIndexOf,
              isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
              seen = isLarge ? createCache() : null,
              result = [];
          if (seen) {
            indexOf = cacheIndexOf;
            isCommon = false;
          } else {
            isLarge = false;
            seen = iteratee ? [] : result;
          }
          outer: while (++index < length) {
            var value = array[index],
                computed = iteratee ? iteratee(value, index, array) : value;
            if (isCommon && value === value) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee) {
                seen.push(computed);
              }
              result.push(value);
            } else if (indexOf(seen, computed, 0) < 0) {
              if (iteratee || isLarge) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
          return result;
        }
        function baseValues(object, props) {
          var index = -1,
              length = props.length,
              result = Array(length);
          while (++index < length) {
            result[index] = object[props[index]];
          }
          return result;
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length,
              index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
          return isDrop ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length)) : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
        }
        function baseWrapperValue(value, actions) {
          var result = value;
          if (result instanceof LazyWrapper) {
            result = result.value();
          }
          var index = -1,
              length = actions.length;
          while (++index < length) {
            var action = actions[index];
            result = action.func.apply(action.thisArg, arrayPush([result], action.args));
          }
          return result;
        }
        function binaryIndex(array, value, retHighest) {
          var low = 0,
              high = array ? array.length : low;
          if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = (low + high) >>> 1,
                  computed = array[mid];
              if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return binaryIndexBy(array, value, identity, retHighest);
        }
        function binaryIndexBy(array, value, iteratee, retHighest) {
          value = iteratee(value);
          var low = 0,
              high = array ? array.length : 0,
              valIsNaN = value !== value,
              valIsNull = value === null,
              valIsUndef = value === undefined;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2),
                computed = iteratee(array[mid]),
                isDef = computed !== undefined,
                isReflexive = computed === computed;
            if (valIsNaN) {
              var setLow = isReflexive || retHighest;
            } else if (valIsNull) {
              setLow = isReflexive && isDef && (retHighest || computed != null);
            } else if (valIsUndef) {
              setLow = isReflexive && (retHighest || isDef);
            } else if (computed == null) {
              setLow = false;
            } else {
              setLow = retHighest ? (computed <= value) : (computed < value);
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function bindCallback(func, thisArg, argCount) {
          if (typeof func != 'function') {
            return identity;
          }
          if (thisArg === undefined) {
            return func;
          }
          switch (argCount) {
            case 1:
              return function(value) {
                return func.call(thisArg, value);
              };
            case 3:
              return function(value, index, collection) {
                return func.call(thisArg, value, index, collection);
              };
            case 4:
              return function(accumulator, value, index, collection) {
                return func.call(thisArg, accumulator, value, index, collection);
              };
            case 5:
              return function(value, other, key, object, source) {
                return func.call(thisArg, value, other, key, object, source);
              };
          }
          return function() {
            return func.apply(thisArg, arguments);
          };
        }
        function bufferClone(buffer) {
          var result = new ArrayBuffer(buffer.byteLength),
              view = new Uint8Array(result);
          view.set(new Uint8Array(buffer));
          return result;
        }
        function composeArgs(args, partials, holders) {
          var holdersLength = holders.length,
              argsIndex = -1,
              argsLength = nativeMax(args.length - holdersLength, 0),
              leftIndex = -1,
              leftLength = partials.length,
              result = Array(leftLength + argsLength);
          while (++leftIndex < leftLength) {
            result[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            result[holders[argsIndex]] = args[argsIndex];
          }
          while (argsLength--) {
            result[leftIndex++] = args[argsIndex++];
          }
          return result;
        }
        function composeArgsRight(args, partials, holders) {
          var holdersIndex = -1,
              holdersLength = holders.length,
              argsIndex = -1,
              argsLength = nativeMax(args.length - holdersLength, 0),
              rightIndex = -1,
              rightLength = partials.length,
              result = Array(argsLength + rightLength);
          while (++argsIndex < argsLength) {
            result[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            result[offset + holders[holdersIndex]] = args[argsIndex++];
          }
          return result;
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee, thisArg) {
            var result = initializer ? initializer() : {};
            iteratee = getCallback(iteratee, thisArg, 3);
            if (isArray(collection)) {
              var index = -1,
                  length = collection.length;
              while (++index < length) {
                var value = collection[index];
                setter(result, value, iteratee(value, index, collection), collection);
              }
            } else {
              baseEach(collection, function(value, key, collection) {
                setter(result, value, iteratee(value, key, collection), collection);
              });
            }
            return result;
          };
        }
        function createAssigner(assigner) {
          return restParam(function(object, sources) {
            var index = -1,
                length = object == null ? 0 : sources.length,
                customizer = length > 2 ? sources[length - 2] : undefined,
                guard = length > 2 ? sources[2] : undefined,
                thisArg = length > 1 ? sources[length - 1] : undefined;
            if (typeof customizer == 'function') {
              customizer = bindCallback(customizer, thisArg, 5);
              length -= 2;
            } else {
              customizer = typeof thisArg == 'function' ? thisArg : undefined;
              length -= (customizer ? 1 : 0);
            }
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined : customizer;
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee) {
            var length = collection ? getLength(collection) : 0;
            if (!isLength(length)) {
              return eachFunc(collection, iteratee);
            }
            var index = fromRight ? length : -1,
                iterable = toObject(collection);
            while ((fromRight ? index-- : ++index < length)) {
              if (iteratee(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee, keysFunc) {
            var iterable = toObject(object),
                props = keysFunc(object),
                length = props.length,
                index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length)) {
              var key = props[index];
              if (iteratee(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBindWrapper(func, thisArg) {
          var Ctor = createCtorWrapper(func);
          function wrapper() {
            var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
            return fn.apply(thisArg, arguments);
          }
          return wrapper;
        }
        function createCache(values) {
          return (nativeCreate && Set) ? new SetCache(values) : null;
        }
        function createCompounder(callback) {
          return function(string) {
            var index = -1,
                array = words(deburr(string)),
                length = array.length,
                result = '';
            while (++index < length) {
              result = callback(result, array[index], index);
            }
            return result;
          };
        }
        function createCtorWrapper(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor;
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype),
                result = Ctor.apply(thisBinding, args);
            return isObject(result) ? result : thisBinding;
          };
        }
        function createCurry(flag) {
          function curryFunc(func, arity, guard) {
            if (guard && isIterateeCall(func, arity, guard)) {
              arity = undefined;
            }
            var result = createWrapper(func, flag, undefined, undefined, undefined, undefined, undefined, arity);
            result.placeholder = curryFunc.placeholder;
            return result;
          }
          return curryFunc;
        }
        function createDefaults(assigner, customizer) {
          return restParam(function(args) {
            var object = args[0];
            if (object == null) {
              return object;
            }
            args.push(customizer);
            return assigner.apply(undefined, args);
          });
        }
        function createExtremum(comparator, exValue) {
          return function(collection, iteratee, thisArg) {
            if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
              iteratee = undefined;
            }
            iteratee = getCallback(iteratee, thisArg, 3);
            if (iteratee.length == 1) {
              collection = isArray(collection) ? collection : toIterable(collection);
              var result = arrayExtremum(collection, iteratee, comparator, exValue);
              if (!(collection.length && result === exValue)) {
                return result;
              }
            }
            return baseExtremum(collection, iteratee, comparator, exValue);
          };
        }
        function createFind(eachFunc, fromRight) {
          return function(collection, predicate, thisArg) {
            predicate = getCallback(predicate, thisArg, 3);
            if (isArray(collection)) {
              var index = baseFindIndex(collection, predicate, fromRight);
              return index > -1 ? collection[index] : undefined;
            }
            return baseFind(collection, predicate, eachFunc);
          };
        }
        function createFindIndex(fromRight) {
          return function(array, predicate, thisArg) {
            if (!(array && array.length)) {
              return -1;
            }
            predicate = getCallback(predicate, thisArg, 3);
            return baseFindIndex(array, predicate, fromRight);
          };
        }
        function createFindKey(objectFunc) {
          return function(object, predicate, thisArg) {
            predicate = getCallback(predicate, thisArg, 3);
            return baseFind(object, predicate, objectFunc, true);
          };
        }
        function createFlow(fromRight) {
          return function() {
            var wrapper,
                length = arguments.length,
                index = fromRight ? length : -1,
                leftIndex = 0,
                funcs = Array(length);
            while ((fromRight ? index-- : ++index < length)) {
              var func = funcs[leftIndex++] = arguments[index];
              if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
              }
              if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
                wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? -1 : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func),
                  data = funcName == 'wrapper' ? getData(func) : undefined;
              if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments,
                  value = args[0];
              if (wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
                return wrapper.plant(value).value();
              }
              var index = 0,
                  result = length ? funcs[index].apply(this, args) : value;
              while (++index < length) {
                result = funcs[index].call(this, result);
              }
              return result;
            };
          };
        }
        function createForEach(arrayFunc, eachFunc) {
          return function(collection, iteratee, thisArg) {
            return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ? arrayFunc(collection, iteratee) : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
          };
        }
        function createForIn(objectFunc) {
          return function(object, iteratee, thisArg) {
            if (typeof iteratee != 'function' || thisArg !== undefined) {
              iteratee = bindCallback(iteratee, thisArg, 3);
            }
            return objectFunc(object, iteratee, keysIn);
          };
        }
        function createForOwn(objectFunc) {
          return function(object, iteratee, thisArg) {
            if (typeof iteratee != 'function' || thisArg !== undefined) {
              iteratee = bindCallback(iteratee, thisArg, 3);
            }
            return objectFunc(object, iteratee);
          };
        }
        function createObjectMapper(isMapKeys) {
          return function(object, iteratee, thisArg) {
            var result = {};
            iteratee = getCallback(iteratee, thisArg, 3);
            baseForOwn(object, function(value, key, object) {
              var mapped = iteratee(value, key, object);
              key = isMapKeys ? mapped : key;
              value = isMapKeys ? value : mapped;
              result[key] = value;
            });
            return result;
          };
        }
        function createPadDir(fromRight) {
          return function(string, length, chars) {
            string = baseToString(string);
            return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
          };
        }
        function createPartial(flag) {
          var partialFunc = restParam(function(func, partials) {
            var holders = replaceHolders(partials, partialFunc.placeholder);
            return createWrapper(func, flag, undefined, partials, holders);
          });
          return partialFunc;
        }
        function createReduce(arrayFunc, eachFunc) {
          return function(collection, iteratee, accumulator, thisArg) {
            var initFromArray = arguments.length < 3;
            return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ? arrayFunc(collection, iteratee, accumulator, initFromArray) : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
          };
        }
        function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
          var isAry = bitmask & ARY_FLAG,
              isBind = bitmask & BIND_FLAG,
              isBindKey = bitmask & BIND_KEY_FLAG,
              isCurry = bitmask & CURRY_FLAG,
              isCurryBound = bitmask & CURRY_BOUND_FLAG,
              isCurryRight = bitmask & CURRY_RIGHT_FLAG,
              Ctor = isBindKey ? undefined : createCtorWrapper(func);
          function wrapper() {
            var length = arguments.length,
                index = length,
                args = Array(length);
            while (index--) {
              args[index] = arguments[index];
            }
            if (partials) {
              args = composeArgs(args, partials, holders);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight);
            }
            if (isCurry || isCurryRight) {
              var placeholder = wrapper.placeholder,
                  argsHolders = replaceHolders(args, placeholder);
              length -= argsHolders.length;
              if (length < arity) {
                var newArgPos = argPos ? arrayCopy(argPos) : undefined,
                    newArity = nativeMax(arity - length, 0),
                    newsHolders = isCurry ? argsHolders : undefined,
                    newHoldersRight = isCurry ? undefined : argsHolders,
                    newPartials = isCurry ? args : undefined,
                    newPartialsRight = isCurry ? undefined : args;
                bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
                bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
                if (!isCurryBound) {
                  bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
                }
                var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                    result = createHybridWrapper.apply(undefined, newData);
                if (isLaziable(func)) {
                  setData(result, newData);
                }
                result.placeholder = placeholder;
                return result;
              }
            }
            var thisBinding = isBind ? thisArg : this,
                fn = isBindKey ? thisBinding[func] : func;
            if (argPos) {
              args = reorder(args, argPos);
            }
            if (isAry && ary < args.length) {
              args.length = ary;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtorWrapper(func);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createPadding(string, length, chars) {
          var strLength = string.length;
          length = +length;
          if (strLength >= length || !nativeIsFinite(length)) {
            return '';
          }
          var padLength = length - strLength;
          chars = chars == null ? ' ' : (chars + '');
          return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
        }
        function createPartialWrapper(func, bitmask, thisArg, partials) {
          var isBind = bitmask & BIND_FLAG,
              Ctor = createCtorWrapper(func);
          function wrapper() {
            var argsIndex = -1,
                argsLength = arguments.length,
                leftIndex = -1,
                leftLength = partials.length,
                args = Array(leftLength + argsLength);
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRound(methodName) {
          var func = Math[methodName];
          return function(number, precision) {
            precision = precision === undefined ? 0 : (+precision || 0);
            if (precision) {
              precision = pow(10, precision);
              return func(number * precision) / precision;
            }
            return func(number);
          };
        }
        function createSortedIndex(retHighest) {
          return function(array, value, iteratee, thisArg) {
            var callback = getCallback(iteratee);
            return (iteratee == null && callback === baseCallback) ? binaryIndex(array, value, retHighest) : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
          };
        }
        function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
          var isBindKey = bitmask & BIND_KEY_FLAG;
          if (!isBindKey && typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
            partials = holders = undefined;
          }
          length -= (holders ? holders.length : 0);
          if (bitmask & PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials,
                holdersRight = holders;
            partials = holders = undefined;
          }
          var data = isBindKey ? undefined : getData(func),
              newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
          if (data) {
            mergeData(newData, data);
            bitmask = newData[1];
            arity = newData[9];
          }
          newData[9] = arity == null ? (isBindKey ? 0 : func.length) : (nativeMax(arity - length, 0) || 0);
          if (bitmask == BIND_FLAG) {
            var result = createBindWrapper(newData[0], newData[2]);
          } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
            result = createPartialWrapper.apply(undefined, newData);
          } else {
            result = createHybridWrapper.apply(undefined, newData);
          }
          var setter = data ? baseSetData : setData;
          return setter(result, newData);
        }
        function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var index = -1,
              arrLength = array.length,
              othLength = other.length;
          if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
            return false;
          }
          while (++index < arrLength) {
            var arrValue = array[index],
                othValue = other[index],
                result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
            if (result !== undefined) {
              if (result) {
                continue;
              }
              return false;
            }
            if (isLoose) {
              if (!arraySome(other, function(othValue) {
                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
              })) {
                return false;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
              return false;
            }
          }
          return true;
        }
        function equalByTag(object, other, tag) {
          switch (tag) {
            case boolTag:
            case dateTag:
              return +object == +other;
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case numberTag:
              return (object != +object) ? other != +other : object == +other;
            case regexpTag:
            case stringTag:
              return object == (other + '');
          }
          return false;
        }
        function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
          var objProps = keys(object),
              objLength = objProps.length,
              othProps = keys(other),
              othLength = othProps.length;
          if (objLength != othLength && !isLoose) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var skipCtor = isLoose;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key],
                othValue = other[key],
                result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;
            if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
              return false;
            }
            skipCtor || (skipCtor = key == 'constructor');
          }
          if (!skipCtor) {
            var objCtor = object.constructor,
                othCtor = other.constructor;
            if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
              return false;
            }
          }
          return true;
        }
        function getCallback(func, thisArg, argCount) {
          var result = lodash.callback || callback;
          result = result === callback ? baseCallback : result;
          return argCount ? result(func, thisArg, argCount) : result;
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result = func.name,
              array = realNames[result],
              length = array ? array.length : 0;
          while (length--) {
            var data = array[length],
                otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result;
        }
        function getIndexOf(collection, target, fromIndex) {
          var result = lodash.indexOf || indexOf;
          result = result === indexOf ? baseIndexOf : result;
          return collection ? result(collection, target, fromIndex) : result;
        }
        var getLength = baseProperty('length');
        function getMatchData(object) {
          var result = pairs(object),
              length = result.length;
          while (length--) {
            result[length][2] = isStrictComparable(result[length][1]);
          }
          return result;
        }
        function getNative(object, key) {
          var value = object == null ? undefined : object[key];
          return isNative(value) ? value : undefined;
        }
        function getView(start, end, transforms) {
          var index = -1,
              length = transforms.length;
          while (++index < length) {
            var data = transforms[index],
                size = data.size;
            switch (data.type) {
              case 'drop':
                start += size;
                break;
              case 'dropRight':
                end -= size;
                break;
              case 'take':
                end = nativeMin(end, start + size);
                break;
              case 'takeRight':
                start = nativeMax(start, end - size);
                break;
            }
          }
          return {
            'start': start,
            'end': end
          };
        }
        function initCloneArray(array) {
          var length = array.length,
              result = new array.constructor(length);
          if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
            result.index = array.index;
            result.input = array.input;
          }
          return result;
        }
        function initCloneObject(object) {
          var Ctor = object.constructor;
          if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
            Ctor = Object;
          }
          return new Ctor;
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return bufferClone(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              var buffer = object.buffer;
              return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              var result = new Ctor(object.source, reFlags.exec(object));
              result.lastIndex = object.lastIndex;
          }
          return result;
        }
        function invokePath(object, path, args) {
          if (object != null && !isKey(path, object)) {
            path = toPath(path);
            object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
            path = last(path);
          }
          var func = object == null ? object : object[path];
          return func == null ? undefined : func.apply(object, args);
        }
        function isArrayLike(value) {
          return value != null && isLength(getLength(value));
        }
        function isIndex(value, length) {
          value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return value > -1 && value % 1 == 0 && value < length;
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
            var other = object[index];
            return value === value ? (value === other) : (other !== other);
          }
          return false;
        }
        function isKey(value, object) {
          var type = typeof value;
          if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
            return true;
          }
          if (isArray(value)) {
            return false;
          }
          var result = !reIsDeepProp.test(value);
          return result || (object != null && value in toObject(object));
        }
        function isLaziable(func) {
          var funcName = getFuncName(func);
          if (!(funcName in LazyWrapper.prototype)) {
            return false;
          }
          var other = lodash[funcName];
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isLength(value) {
          return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function mergeData(data, source) {
          var bitmask = data[1],
              srcBitmask = source[1],
              newBitmask = bitmask | srcBitmask,
              isCommon = newBitmask < ARY_FLAG;
          var isCombo = (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) || (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) || (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
          }
          value = source[7];
          if (value) {
            data[7] = arrayCopy(value);
          }
          if (srcBitmask & ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function mergeDefaults(objectValue, sourceValue) {
          return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
        }
        function pickByArray(object, props) {
          object = toObject(object);
          var index = -1,
              length = props.length,
              result = {};
          while (++index < length) {
            var key = props[index];
            if (key in object) {
              result[key] = object[key];
            }
          }
          return result;
        }
        function pickByCallback(object, predicate) {
          var result = {};
          baseForIn(object, function(value, key, object) {
            if (predicate(value, key, object)) {
              result[key] = value;
            }
          });
          return result;
        }
        function reorder(array, indexes) {
          var arrLength = array.length,
              length = nativeMin(indexes.length, arrLength),
              oldArray = arrayCopy(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
          }
          return array;
        }
        var setData = (function() {
          var count = 0,
              lastCalled = 0;
          return function(key, value) {
            var stamp = now(),
                remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return key;
              }
            } else {
              count = 0;
            }
            return baseSetData(key, value);
          };
        }());
        function shimKeys(object) {
          var props = keysIn(object),
              propsLength = props.length,
              length = propsLength && object.length;
          var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));
          var index = -1,
              result = [];
          while (++index < propsLength) {
            var key = props[index];
            if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
              result.push(key);
            }
          }
          return result;
        }
        function toIterable(value) {
          if (value == null) {
            return [];
          }
          if (!isArrayLike(value)) {
            return values(value);
          }
          return isObject(value) ? value : Object(value);
        }
        function toObject(value) {
          return isObject(value) ? value : Object(value);
        }
        function toPath(value) {
          if (isArray(value)) {
            return value;
          }
          var result = [];
          baseToString(value).replace(rePropName, function(match, number, quote, string) {
            result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
          });
          return result;
        }
        function wrapperClone(wrapper) {
          return wrapper instanceof LazyWrapper ? wrapper.clone() : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
        }
        function chunk(array, size, guard) {
          if (guard ? isIterateeCall(array, size, guard) : size == null) {
            size = 1;
          } else {
            size = nativeMax(nativeFloor(size) || 1, 1);
          }
          var index = 0,
              length = array ? array.length : 0,
              resIndex = -1,
              result = Array(nativeCeil(length / size));
          while (index < length) {
            result[++resIndex] = baseSlice(array, index, (index += size));
          }
          return result;
        }
        function compact(array) {
          var index = -1,
              length = array ? array.length : 0,
              resIndex = -1,
              result = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result[++resIndex] = value;
            }
          }
          return result;
        }
        var difference = restParam(function(array, values) {
          return (isObjectLike(array) && isArrayLike(array)) ? baseDifference(array, baseFlatten(values, false, true)) : [];
        });
        function drop(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          return baseSlice(array, n < 0 ? 0 : n);
        }
        function dropRight(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          n = length - (+n || 0);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate, thisArg) {
          return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true) : [];
        }
        function dropWhile(array, predicate, thisArg) {
          return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        var findIndex = createFindIndex();
        var findLastIndex = createFindIndex(true);
        function first(array) {
          return array ? array[0] : undefined;
        }
        function flatten(array, isDeep, guard) {
          var length = array ? array.length : 0;
          if (guard && isIterateeCall(array, isDeep, guard)) {
            isDeep = false;
          }
          return length ? baseFlatten(array, isDeep) : [];
        }
        function flattenDeep(array) {
          var length = array ? array.length : 0;
          return length ? baseFlatten(array, true) : [];
        }
        function indexOf(array, value, fromIndex) {
          var length = array ? array.length : 0;
          if (!length) {
            return -1;
          }
          if (typeof fromIndex == 'number') {
            fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
          } else if (fromIndex) {
            var index = binaryIndex(array, value);
            if (index < length && (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
              return index;
            }
            return -1;
          }
          return baseIndexOf(array, value, fromIndex || 0);
        }
        function initial(array) {
          return dropRight(array, 1);
        }
        var intersection = restParam(function(arrays) {
          var othLength = arrays.length,
              othIndex = othLength,
              caches = Array(length),
              indexOf = getIndexOf(),
              isCommon = indexOf == baseIndexOf,
              result = [];
          while (othIndex--) {
            var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
            caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
          }
          var array = arrays[0],
              index = -1,
              length = array ? array.length : 0,
              seen = caches[0];
          outer: while (++index < length) {
            value = array[index];
            if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
              var othIndex = othLength;
              while (--othIndex) {
                var cache = caches[othIndex];
                if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(value);
              }
              result.push(value);
            }
          }
          return result;
        });
        function last(array) {
          var length = array ? array.length : 0;
          return length ? array[length - 1] : undefined;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array ? array.length : 0;
          if (!length) {
            return -1;
          }
          var index = length;
          if (typeof fromIndex == 'number') {
            index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
          } else if (fromIndex) {
            index = binaryIndex(array, value, true) - 1;
            var other = array[index];
            if (value === value ? (value === other) : (other !== other)) {
              return index;
            }
            return -1;
          }
          if (value !== value) {
            return indexOfNaN(array, index, true);
          }
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        function pull() {
          var args = arguments,
              array = args[0];
          if (!(array && array.length)) {
            return array;
          }
          var index = 0,
              indexOf = getIndexOf(),
              length = args.length;
          while (++index < length) {
            var fromIndex = 0,
                value = args[index];
            while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        var pullAt = restParam(function(array, indexes) {
          indexes = baseFlatten(indexes);
          var result = baseAt(array, indexes);
          basePullAt(array, indexes.sort(baseCompareAscending));
          return result;
        });
        function remove(array, predicate, thisArg) {
          var result = [];
          if (!(array && array.length)) {
            return result;
          }
          var index = -1,
              indexes = [],
              length = array.length;
          predicate = getCallback(predicate, thisArg, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result;
        }
        function rest(array) {
          return drop(array, 1);
        }
        function slice(array, start, end) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          }
          return baseSlice(array, start, end);
        }
        var sortedIndex = createSortedIndex();
        var sortedLastIndex = createSortedIndex(true);
        function take(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (guard ? isIterateeCall(array, n, guard) : n == null) {
            n = 1;
          }
          n = length - (+n || 0);
          return baseSlice(array, n < 0 ? 0 : n);
        }
        function takeRightWhile(array, predicate, thisArg) {
          return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true) : [];
        }
        function takeWhile(array, predicate, thisArg) {
          return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3)) : [];
        }
        var union = restParam(function(arrays) {
          return baseUniq(baseFlatten(arrays, false, true));
        });
        function uniq(array, isSorted, iteratee, thisArg) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          if (isSorted != null && typeof isSorted != 'boolean') {
            thisArg = iteratee;
            iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
            isSorted = false;
          }
          var callback = getCallback();
          if (!(iteratee == null && callback === baseCallback)) {
            iteratee = callback(iteratee, thisArg, 3);
          }
          return (isSorted && getIndexOf() == baseIndexOf) ? sortedUniq(array, iteratee) : baseUniq(array, iteratee);
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var index = -1,
              length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLike(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          var result = Array(length);
          while (++index < length) {
            result[index] = arrayMap(array, baseProperty(index));
          }
          return result;
        }
        function unzipWith(array, iteratee, thisArg) {
          var length = array ? array.length : 0;
          if (!length) {
            return [];
          }
          var result = unzip(array);
          if (iteratee == null) {
            return result;
          }
          iteratee = bindCallback(iteratee, thisArg, 4);
          return arrayMap(result, function(group) {
            return arrayReduce(group, iteratee, undefined, true);
          });
        }
        var without = restParam(function(array, values) {
          return isArrayLike(array) ? baseDifference(array, values) : [];
        });
        function xor() {
          var index = -1,
              length = arguments.length;
          while (++index < length) {
            var array = arguments[index];
            if (isArrayLike(array)) {
              var result = result ? arrayPush(baseDifference(result, array), baseDifference(array, result)) : array;
            }
          }
          return result ? baseUniq(result) : [];
        }
        var zip = restParam(unzip);
        function zipObject(props, values) {
          var index = -1,
              length = props ? props.length : 0,
              result = {};
          if (length && !values && !isArray(props[0])) {
            values = [];
          }
          while (++index < length) {
            var key = props[index];
            if (values) {
              result[key] = values[index];
            } else if (key) {
              result[key[0]] = key[1];
            }
          }
          return result;
        }
        var zipWith = restParam(function(arrays) {
          var length = arrays.length,
              iteratee = length > 2 ? arrays[length - 2] : undefined,
              thisArg = length > 1 ? arrays[length - 1] : undefined;
          if (length > 2 && typeof iteratee == 'function') {
            length -= 2;
          } else {
            iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
            thisArg = undefined;
          }
          arrays.length = length;
          return unzipWith(arrays, iteratee, thisArg);
        });
        function chain(value) {
          var result = lodash(value);
          result.__chain__ = true;
          return result;
        }
        function tap(value, interceptor, thisArg) {
          interceptor.call(thisArg, value);
          return value;
        }
        function thru(value, interceptor, thisArg) {
          return interceptor.call(thisArg, value);
        }
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        var wrapperConcat = restParam(function(values) {
          values = baseFlatten(values);
          return this.thru(function(array) {
            return arrayConcat(isArray(array) ? array : [toObject(array)], values);
          });
        });
        function wrapperPlant(value) {
          var result,
              parent = this;
          while (parent instanceof baseLodash) {
            var clone = wrapperClone(parent);
            if (result) {
              previous.__wrapped__ = clone;
            } else {
              result = clone;
            }
            var previous = clone;
            parent = parent.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          var interceptor = function(value) {
            return (wrapped && wrapped.__dir__ < 0) ? value : value.reverse();
          };
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              'func': thru,
              'args': [interceptor],
              'thisArg': undefined
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(interceptor);
        }
        function wrapperToString() {
          return (this.value() + '');
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var at = restParam(function(collection, props) {
          return baseAt(collection, baseFlatten(props));
        });
        var countBy = createAggregator(function(result, value, key) {
          hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
        });
        function every(collection, predicate, thisArg) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
            predicate = undefined;
          }
          if (typeof predicate != 'function' || thisArg !== undefined) {
            predicate = getCallback(predicate, thisArg, 3);
          }
          return func(collection, predicate);
        }
        function filter(collection, predicate, thisArg) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          predicate = getCallback(predicate, thisArg, 3);
          return func(collection, predicate);
        }
        var find = createFind(baseEach);
        var findLast = createFind(baseEachRight, true);
        function findWhere(collection, source) {
          return find(collection, baseMatches(source));
        }
        var forEach = createForEach(arrayEach, baseEach);
        var forEachRight = createForEach(arrayEachRight, baseEachRight);
        var groupBy = createAggregator(function(result, value, key) {
          if (hasOwnProperty.call(result, key)) {
            result[key].push(value);
          } else {
            result[key] = [value];
          }
        });
        function includes(collection, target, fromIndex, guard) {
          var length = collection ? getLength(collection) : 0;
          if (!isLength(length)) {
            collection = values(collection);
            length = collection.length;
          }
          if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
            fromIndex = 0;
          } else {
            fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
          }
          return (typeof collection == 'string' || !isArray(collection) && isString(collection)) ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1) : (!!length && getIndexOf(collection, target, fromIndex) > -1);
        }
        var indexBy = createAggregator(function(result, value, key) {
          result[key] = value;
        });
        var invoke = restParam(function(collection, path, args) {
          var index = -1,
              isFunc = typeof path == 'function',
              isProp = isKey(path),
              result = isArrayLike(collection) ? Array(collection.length) : [];
          baseEach(collection, function(value) {
            var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined);
            result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
          });
          return result;
        });
        function map(collection, iteratee, thisArg) {
          var func = isArray(collection) ? arrayMap : baseMap;
          iteratee = getCallback(iteratee, thisArg, 3);
          return func(collection, iteratee);
        }
        var partition = createAggregator(function(result, value, key) {
          result[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function pluck(collection, path) {
          return map(collection, property(path));
        }
        var reduce = createReduce(arrayReduce, baseEach);
        var reduceRight = createReduce(arrayReduceRight, baseEachRight);
        function reject(collection, predicate, thisArg) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          predicate = getCallback(predicate, thisArg, 3);
          return func(collection, function(value, index, collection) {
            return !predicate(value, index, collection);
          });
        }
        function sample(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n == null) {
            collection = toIterable(collection);
            var length = collection.length;
            return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
          }
          var index = -1,
              result = toArray(collection),
              length = result.length,
              lastIndex = length - 1;
          n = nativeMin(n < 0 ? 0 : (+n || 0), length);
          while (++index < n) {
            var rand = baseRandom(index, lastIndex),
                value = result[rand];
            result[rand] = result[index];
            result[index] = value;
          }
          result.length = n;
          return result;
        }
        function shuffle(collection) {
          return sample(collection, POSITIVE_INFINITY);
        }
        function size(collection) {
          var length = collection ? getLength(collection) : 0;
          return isLength(length) ? length : keys(collection).length;
        }
        function some(collection, predicate, thisArg) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
            predicate = undefined;
          }
          if (typeof predicate != 'function' || thisArg !== undefined) {
            predicate = getCallback(predicate, thisArg, 3);
          }
          return func(collection, predicate);
        }
        function sortBy(collection, iteratee, thisArg) {
          if (collection == null) {
            return [];
          }
          if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
            iteratee = undefined;
          }
          var index = -1;
          iteratee = getCallback(iteratee, thisArg, 3);
          var result = baseMap(collection, function(value, key, collection) {
            return {
              'criteria': iteratee(value, key, collection),
              'index': ++index,
              'value': value
            };
          });
          return baseSortBy(result, compareAscending);
        }
        var sortByAll = restParam(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var guard = iteratees[2];
          if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
            iteratees.length = 1;
          }
          return baseSortByOrder(collection, baseFlatten(iteratees), []);
        });
        function sortByOrder(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (guard && isIterateeCall(iteratees, orders, guard)) {
            orders = undefined;
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseSortByOrder(collection, iteratees, orders);
        }
        function where(collection, source) {
          return filter(collection, baseMatches(source));
        }
        var now = nativeNow || function() {
          return new Date().getTime();
        };
        function after(n, func) {
          if (typeof func != 'function') {
            if (typeof n == 'function') {
              var temp = n;
              n = func;
              func = temp;
            } else {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
          }
          n = nativeIsFinite(n = +n) ? n : 0;
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          if (guard && isIterateeCall(func, n, guard)) {
            n = undefined;
          }
          n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
          return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
        }
        function before(n, func) {
          var result;
          if (typeof func != 'function') {
            if (typeof n == 'function') {
              var temp = n;
              n = func;
              func = temp;
            } else {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
          }
          return function() {
            if (--n > 0) {
              result = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined;
            }
            return result;
          };
        }
        var bind = restParam(function(func, thisArg, partials) {
          var bitmask = BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, bind.placeholder);
            bitmask |= PARTIAL_FLAG;
          }
          return createWrapper(func, bitmask, thisArg, partials, holders);
        });
        var bindAll = restParam(function(object, methodNames) {
          methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);
          var index = -1,
              length = methodNames.length;
          while (++index < length) {
            var key = methodNames[index];
            object[key] = createWrapper(object[key], BIND_FLAG, object);
          }
          return object;
        });
        var bindKey = restParam(function(object, key, partials) {
          var bitmask = BIND_FLAG | BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, bindKey.placeholder);
            bitmask |= PARTIAL_FLAG;
          }
          return createWrapper(key, bitmask, object, partials, holders);
        });
        var curry = createCurry(CURRY_FLAG);
        var curryRight = createCurry(CURRY_RIGHT_FLAG);
        function debounce(func, wait, options) {
          var args,
              maxTimeoutId,
              result,
              stamp,
              thisArg,
              timeoutId,
              trailingCall,
              lastCalled = 0,
              maxWait = false,
              trailing = true;
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          wait = wait < 0 ? 0 : (+wait || 0);
          if (options === true) {
            var leading = true;
            trailing = false;
          } else if (isObject(options)) {
            leading = !!options.leading;
            maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
            trailing = 'trailing' in options ? !!options.trailing : trailing;
          }
          function cancel() {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            if (maxTimeoutId) {
              clearTimeout(maxTimeoutId);
            }
            lastCalled = 0;
            maxTimeoutId = timeoutId = trailingCall = undefined;
          }
          function complete(isCalled, id) {
            if (id) {
              clearTimeout(id);
            }
            maxTimeoutId = timeoutId = trailingCall = undefined;
            if (isCalled) {
              lastCalled = now();
              result = func.apply(thisArg, args);
              if (!timeoutId && !maxTimeoutId) {
                args = thisArg = undefined;
              }
            }
          }
          function delayed() {
            var remaining = wait - (now() - stamp);
            if (remaining <= 0 || remaining > wait) {
              complete(trailingCall, maxTimeoutId);
            } else {
              timeoutId = setTimeout(delayed, remaining);
            }
          }
          function maxDelayed() {
            complete(trailing, timeoutId);
          }
          function debounced() {
            args = arguments;
            stamp = now();
            thisArg = this;
            trailingCall = trailing && (timeoutId || !leading);
            if (maxWait === false) {
              var leadingCall = leading && !timeoutId;
            } else {
              if (!maxTimeoutId && !leading) {
                lastCalled = stamp;
              }
              var remaining = maxWait - (stamp - lastCalled),
                  isCalled = remaining <= 0 || remaining > maxWait;
              if (isCalled) {
                if (maxTimeoutId) {
                  maxTimeoutId = clearTimeout(maxTimeoutId);
                }
                lastCalled = stamp;
                result = func.apply(thisArg, args);
              } else if (!maxTimeoutId) {
                maxTimeoutId = setTimeout(maxDelayed, remaining);
              }
            }
            if (isCalled && timeoutId) {
              timeoutId = clearTimeout(timeoutId);
            } else if (!timeoutId && wait !== maxWait) {
              timeoutId = setTimeout(delayed, wait);
            }
            if (leadingCall) {
              isCalled = true;
              result = func.apply(thisArg, args);
            }
            if (isCalled && !timeoutId && !maxTimeoutId) {
              args = thisArg = undefined;
            }
            return result;
          }
          debounced.cancel = cancel;
          return debounced;
        }
        var defer = restParam(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = restParam(function(func, wait, args) {
          return baseDelay(func, wait, args);
        });
        var flow = createFlow();
        var flowRight = createFlow(true);
        function memoize(func, resolver) {
          if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments,
                key = resolver ? resolver.apply(this, args) : args[0],
                cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result = func.apply(this, args);
            memoized.cache = cache.set(key, result);
            return result;
          };
          memoized.cache = new memoize.Cache;
          return memoized;
        }
        var modArgs = restParam(function(func, transforms) {
          transforms = baseFlatten(transforms);
          if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var length = transforms.length;
          return restParam(function(args) {
            var index = nativeMin(args.length, length);
            while (index--) {
              args[index] = transforms[index](args[index]);
            }
            return func.apply(this, args);
          });
        });
        function negate(predicate) {
          if (typeof predicate != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return function() {
            return !predicate.apply(this, arguments);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var partial = createPartial(PARTIAL_FLAG);
        var partialRight = createPartial(PARTIAL_RIGHT_FLAG);
        var rearg = restParam(function(func, indexes) {
          return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes));
        });
        function restParam(func, start) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
          return function() {
            var args = arguments,
                index = -1,
                length = nativeMax(args.length - start, 0),
                rest = Array(length);
            while (++index < length) {
              rest[index] = args[start + index];
            }
            switch (start) {
              case 0:
                return func.call(this, rest);
              case 1:
                return func.call(this, args[0], rest);
              case 2:
                return func.call(this, args[0], args[1], rest);
            }
            var otherArgs = Array(start + 1);
            index = -1;
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = rest;
            return func.apply(this, otherArgs);
          };
        }
        function spread(func) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return function(array) {
            return func.apply(this, array);
          };
        }
        function throttle(func, wait, options) {
          var leading = true,
              trailing = true;
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (options === false) {
            leading = false;
          } else if (isObject(options)) {
            leading = 'leading' in options ? !!options.leading : leading;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            'leading': leading,
            'maxWait': +wait,
            'trailing': trailing
          });
        }
        function wrap(value, wrapper) {
          wrapper = wrapper == null ? identity : wrapper;
          return createWrapper(wrapper, PARTIAL_FLAG, undefined, [value], []);
        }
        function clone(value, isDeep, customizer, thisArg) {
          if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
            isDeep = false;
          } else if (typeof isDeep == 'function') {
            thisArg = customizer;
            customizer = isDeep;
            isDeep = false;
          }
          return typeof customizer == 'function' ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1)) : baseClone(value, isDeep);
        }
        function cloneDeep(value, customizer, thisArg) {
          return typeof customizer == 'function' ? baseClone(value, true, bindCallback(customizer, thisArg, 1)) : baseClone(value, true);
        }
        function gt(value, other) {
          return value > other;
        }
        function gte(value, other) {
          return value >= other;
        }
        function isArguments(value) {
          return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
        }
        var isArray = nativeIsArray || function(value) {
          return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
        };
        function isBoolean(value) {
          return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
        }
        function isDate(value) {
          return isObjectLike(value) && objToString.call(value) == dateTag;
        }
        function isElement(value) {
          return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) || (isObjectLike(value) && isFunction(value.splice)))) {
            return !value.length;
          }
          return !keys(value).length;
        }
        function isEqual(value, other, customizer, thisArg) {
          customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
          var result = customizer ? customizer(value, other) : undefined;
          return result === undefined ? baseIsEqual(value, other, customizer) : !!result;
        }
        function isError(value) {
          return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
        }
        function isFinite(value) {
          return typeof value == 'number' && nativeIsFinite(value);
        }
        function isFunction(value) {
          return isObject(value) && objToString.call(value) == funcTag;
        }
        function isObject(value) {
          var type = typeof value;
          return !!value && (type == 'object' || type == 'function');
        }
        function isMatch(object, source, customizer, thisArg) {
          customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
          return baseIsMatch(object, getMatchData(source), customizer);
        }
        function isNaN(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (value == null) {
            return false;
          }
          if (isFunction(value)) {
            return reIsNative.test(fnToString.call(value));
          }
          return isObjectLike(value) && reIsHostCtor.test(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNumber(value) {
          return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
        }
        function isPlainObject(value) {
          var Ctor;
          if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) || (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
            return false;
          }
          var result;
          baseForIn(value, function(subValue, key) {
            result = key;
          });
          return result === undefined || hasOwnProperty.call(value, result);
        }
        function isRegExp(value) {
          return isObject(value) && objToString.call(value) == regexpTag;
        }
        function isString(value) {
          return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
        }
        function isTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
        }
        function isUndefined(value) {
          return value === undefined;
        }
        function lt(value, other) {
          return value < other;
        }
        function lte(value, other) {
          return value <= other;
        }
        function toArray(value) {
          var length = value ? getLength(value) : 0;
          if (!isLength(length)) {
            return values(value);
          }
          if (!length) {
            return [];
          }
          return arrayCopy(value);
        }
        function toPlainObject(value) {
          return baseCopy(value, keysIn(value));
        }
        var merge = createAssigner(baseMerge);
        var assign = createAssigner(function(object, source, customizer) {
          return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
        });
        function create(prototype, properties, guard) {
          var result = baseCreate(prototype);
          if (guard && isIterateeCall(prototype, properties, guard)) {
            properties = undefined;
          }
          return properties ? baseAssign(result, properties) : result;
        }
        var defaults = createDefaults(assign, assignDefaults);
        var defaultsDeep = createDefaults(merge, mergeDefaults);
        var findKey = createFindKey(baseForOwn);
        var findLastKey = createFindKey(baseForOwnRight);
        var forIn = createForIn(baseFor);
        var forInRight = createForIn(baseForRight);
        var forOwn = createForOwn(baseForOwn);
        var forOwnRight = createForOwn(baseForOwnRight);
        function functions(object) {
          return baseFunctions(object, keysIn(object));
        }
        function get(object, path, defaultValue) {
          var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
          return result === undefined ? defaultValue : result;
        }
        function has(object, path) {
          if (object == null) {
            return false;
          }
          var result = hasOwnProperty.call(object, path);
          if (!result && !isKey(path)) {
            path = toPath(path);
            object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
            if (object == null) {
              return false;
            }
            path = last(path);
            result = hasOwnProperty.call(object, path);
          }
          return result || (isLength(object.length) && isIndex(path, object.length) && (isArray(object) || isArguments(object)));
        }
        function invert(object, multiValue, guard) {
          if (guard && isIterateeCall(object, multiValue, guard)) {
            multiValue = undefined;
          }
          var index = -1,
              props = keys(object),
              length = props.length,
              result = {};
          while (++index < length) {
            var key = props[index],
                value = object[key];
            if (multiValue) {
              if (hasOwnProperty.call(result, value)) {
                result[value].push(key);
              } else {
                result[value] = [key];
              }
            } else {
              result[value] = key;
            }
          }
          return result;
        }
        var keys = !nativeKeys ? shimKeys : function(object) {
          var Ctor = object == null ? undefined : object.constructor;
          if ((typeof Ctor == 'function' && Ctor.prototype === object) || (typeof object != 'function' && isArrayLike(object))) {
            return shimKeys(object);
          }
          return isObject(object) ? nativeKeys(object) : [];
        };
        function keysIn(object) {
          if (object == null) {
            return [];
          }
          if (!isObject(object)) {
            object = Object(object);
          }
          var length = object.length;
          length = (length && isLength(length) && (isArray(object) || isArguments(object)) && length) || 0;
          var Ctor = object.constructor,
              index = -1,
              isProto = typeof Ctor == 'function' && Ctor.prototype === object,
              result = Array(length),
              skipIndexes = length > 0;
          while (++index < length) {
            result[index] = (index + '');
          }
          for (var key in object) {
            if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
              result.push(key);
            }
          }
          return result;
        }
        var mapKeys = createObjectMapper(true);
        var mapValues = createObjectMapper();
        var omit = restParam(function(object, props) {
          if (object == null) {
            return {};
          }
          if (typeof props[0] != 'function') {
            var props = arrayMap(baseFlatten(props), String);
            return pickByArray(object, baseDifference(keysIn(object), props));
          }
          var predicate = bindCallback(props[0], props[1], 3);
          return pickByCallback(object, function(value, key, object) {
            return !predicate(value, key, object);
          });
        });
        function pairs(object) {
          object = toObject(object);
          var index = -1,
              props = keys(object),
              length = props.length,
              result = Array(length);
          while (++index < length) {
            var key = props[index];
            result[index] = [key, object[key]];
          }
          return result;
        }
        var pick = restParam(function(object, props) {
          if (object == null) {
            return {};
          }
          return typeof props[0] == 'function' ? pickByCallback(object, bindCallback(props[0], props[1], 3)) : pickByArray(object, baseFlatten(props));
        });
        function result(object, path, defaultValue) {
          var result = object == null ? undefined : object[path];
          if (result === undefined) {
            if (object != null && !isKey(path, object)) {
              path = toPath(path);
              object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
              result = object == null ? undefined : object[last(path)];
            }
            result = result === undefined ? defaultValue : result;
          }
          return isFunction(result) ? result.call(object) : result;
        }
        function set(object, path, value) {
          if (object == null) {
            return object;
          }
          var pathKey = (path + '');
          path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);
          var index = -1,
              length = path.length,
              lastIndex = length - 1,
              nested = object;
          while (nested != null && ++index < length) {
            var key = path[index];
            if (isObject(nested)) {
              if (index == lastIndex) {
                nested[key] = value;
              } else if (nested[key] == null) {
                nested[key] = isIndex(path[index + 1]) ? [] : {};
              }
            }
            nested = nested[key];
          }
          return object;
        }
        function transform(object, iteratee, accumulator, thisArg) {
          var isArr = isArray(object) || isTypedArray(object);
          iteratee = getCallback(iteratee, thisArg, 4);
          if (accumulator == null) {
            if (isArr || isObject(object)) {
              var Ctor = object.constructor;
              if (isArr) {
                accumulator = isArray(object) ? new Ctor : [];
              } else {
                accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
              }
            } else {
              accumulator = {};
            }
          }
          (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
            return iteratee(accumulator, value, index, object);
          });
          return accumulator;
        }
        function values(object) {
          return baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return baseValues(object, keysIn(object));
        }
        function inRange(value, start, end) {
          start = +start || 0;
          if (end === undefined) {
            end = start;
            start = 0;
          } else {
            end = +end || 0;
          }
          return value >= nativeMin(start, end) && value < nativeMax(start, end);
        }
        function random(min, max, floating) {
          if (floating && isIterateeCall(min, max, floating)) {
            max = floating = undefined;
          }
          var noMin = min == null,
              noMax = max == null;
          if (floating == null) {
            if (noMax && typeof min == 'boolean') {
              floating = min;
              min = 1;
            } else if (typeof max == 'boolean') {
              floating = max;
              noMax = true;
            }
          }
          if (noMin && noMax) {
            max = 1;
            noMax = false;
          }
          min = +min || 0;
          if (noMax) {
            max = min;
            min = 0;
          } else {
            max = +max || 0;
          }
          if (floating || min % 1 || max % 1) {
            var rand = nativeRandom();
            return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
          }
          return baseRandom(min, max);
        }
        var camelCase = createCompounder(function(result, word, index) {
          word = word.toLowerCase();
          return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
        });
        function capitalize(string) {
          string = baseToString(string);
          return string && (string.charAt(0).toUpperCase() + string.slice(1));
        }
        function deburr(string) {
          string = baseToString(string);
          return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
        }
        function endsWith(string, target, position) {
          string = baseToString(string);
          target = (target + '');
          var length = string.length;
          position = position === undefined ? length : nativeMin(position < 0 ? 0 : (+position || 0), length);
          position -= target.length;
          return position >= 0 && string.indexOf(target, position) == position;
        }
        function escape(string) {
          string = baseToString(string);
          return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = baseToString(string);
          return (string && reHasRegExpChars.test(string)) ? string.replace(reRegExpChars, escapeRegExpChar) : (string || '(?:)');
        }
        var kebabCase = createCompounder(function(result, word, index) {
          return result + (index ? '-' : '') + word.toLowerCase();
        });
        function pad(string, length, chars) {
          string = baseToString(string);
          length = +length;
          var strLength = string.length;
          if (strLength >= length || !nativeIsFinite(length)) {
            return string;
          }
          var mid = (length - strLength) / 2,
              leftLength = nativeFloor(mid),
              rightLength = nativeCeil(mid);
          chars = createPadding('', rightLength, chars);
          return chars.slice(0, leftLength) + string + chars;
        }
        var padLeft = createPadDir();
        var padRight = createPadDir(true);
        function parseInt(string, radix, guard) {
          if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          string = trim(string);
          return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
        }
        function repeat(string, n) {
          var result = '';
          string = baseToString(string);
          n = +n;
          if (n < 1 || !string || !nativeIsFinite(n)) {
            return result;
          }
          do {
            if (n % 2) {
              result += string;
            }
            n = nativeFloor(n / 2);
            string += string;
          } while (n);
          return result;
        }
        var snakeCase = createCompounder(function(result, word, index) {
          return result + (index ? '_' : '') + word.toLowerCase();
        });
        var startCase = createCompounder(function(result, word, index) {
          return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
        });
        function startsWith(string, target, position) {
          string = baseToString(string);
          position = position == null ? 0 : nativeMin(position < 0 ? 0 : (+position || 0), string.length);
          return string.lastIndexOf(target, position) == position;
        }
        function template(string, options, otherOptions) {
          var settings = lodash.templateSettings;
          if (otherOptions && isIterateeCall(string, options, otherOptions)) {
            options = otherOptions = undefined;
          }
          string = baseToString(string);
          options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);
          var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
              importsKeys = keys(imports),
              importsValues = baseValues(imports, importsKeys);
          var isEscaping,
              isEvaluating,
              index = 0,
              interpolate = options.interpolate || reNoMatch,
              source = "__p += '";
          var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
          var sourceURL = '//# sourceURL=' + ('sourceURL' in options ? options.sourceURL : ('lodash.templateSources[' + (++templateCounter) + ']')) + '\n';
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = options.variable;
          if (!variable) {
            source = 'with (obj) {\n' + source + '\n}\n';
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
          source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
          var result = attempt(function() {
            return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
          });
          result.source = source;
          if (isError(result)) {
            throw result;
          }
          return result;
        }
        function trim(string, chars, guard) {
          var value = string;
          string = baseToString(string);
          if (!string) {
            return string;
          }
          if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
            return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
          }
          chars = (chars + '');
          return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
        }
        function trimLeft(string, chars, guard) {
          var value = string;
          string = baseToString(string);
          if (!string) {
            return string;
          }
          if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
            return string.slice(trimmedLeftIndex(string));
          }
          return string.slice(charsLeftIndex(string, (chars + '')));
        }
        function trimRight(string, chars, guard) {
          var value = string;
          string = baseToString(string);
          if (!string) {
            return string;
          }
          if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
            return string.slice(0, trimmedRightIndex(string) + 1);
          }
          return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
        }
        function trunc(string, options, guard) {
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined;
          }
          var length = DEFAULT_TRUNC_LENGTH,
              omission = DEFAULT_TRUNC_OMISSION;
          if (options != null) {
            if (isObject(options)) {
              var separator = 'separator' in options ? options.separator : separator;
              length = 'length' in options ? (+options.length || 0) : length;
              omission = 'omission' in options ? baseToString(options.omission) : omission;
            } else {
              length = +options || 0;
            }
          }
          string = baseToString(string);
          if (length >= string.length) {
            return string;
          }
          var end = length - omission.length;
          if (end < 1) {
            return omission;
          }
          var result = string.slice(0, end);
          if (separator == null) {
            return result + omission;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match,
                  newEnd,
                  substring = string.slice(0, end);
              if (!separator.global) {
                separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
              }
              separator.lastIndex = 0;
              while ((match = separator.exec(substring))) {
                newEnd = match.index;
              }
              result = result.slice(0, newEnd == null ? end : newEnd);
            }
          } else if (string.indexOf(separator, end) != end) {
            var index = result.lastIndexOf(separator);
            if (index > -1) {
              result = result.slice(0, index);
            }
          }
          return result + omission;
        }
        function unescape(string) {
          string = baseToString(string);
          return (string && reHasEscapedHtml.test(string)) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        function words(string, pattern, guard) {
          if (guard && isIterateeCall(string, pattern, guard)) {
            pattern = undefined;
          }
          string = baseToString(string);
          return string.match(pattern || reWords) || [];
        }
        var attempt = restParam(function(func, args) {
          try {
            return func.apply(undefined, args);
          } catch (e) {
            return isError(e) ? e : new Error(e);
          }
        });
        function callback(func, thisArg, guard) {
          if (guard && isIterateeCall(func, thisArg, guard)) {
            thisArg = undefined;
          }
          return isObjectLike(func) ? matches(func) : baseCallback(func, thisArg);
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function identity(value) {
          return value;
        }
        function matches(source) {
          return baseMatches(baseClone(source, true));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, true));
        }
        var method = restParam(function(path, args) {
          return function(object) {
            return invokePath(object, path, args);
          };
        });
        var methodOf = restParam(function(object, args) {
          return function(path) {
            return invokePath(object, path, args);
          };
        });
        function mixin(object, source, options) {
          if (options == null) {
            var isObj = isObject(source),
                props = isObj ? keys(source) : undefined,
                methodNames = (props && props.length) ? baseFunctions(source, props) : undefined;
            if (!(methodNames ? methodNames.length : isObj)) {
              methodNames = false;
              options = source;
              source = object;
              object = this;
            }
          }
          if (!methodNames) {
            methodNames = baseFunctions(source, keys(source));
          }
          var chain = true,
              index = -1,
              isFunc = isFunction(object),
              length = methodNames.length;
          if (options === false) {
            chain = false;
          } else if (isObject(options) && 'chain' in options) {
            chain = options.chain;
          }
          while (++index < length) {
            var methodName = methodNames[index],
                func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = (function(func) {
                return function() {
                  var chainAll = this.__chain__;
                  if (chain || chainAll) {
                    var result = object(this.__wrapped__),
                        actions = result.__actions__ = arrayCopy(this.__actions__);
                    actions.push({
                      'func': func,
                      'args': arguments,
                      'thisArg': object
                    });
                    result.__chain__ = chainAll;
                    return result;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }(func));
            }
          }
          return object;
        }
        function noConflict() {
          root._ = oldDash;
          return this;
        }
        function noop() {}
        function property(path) {
          return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return baseGet(object, toPath(path), path + '');
          };
        }
        function range(start, end, step) {
          if (step && isIterateeCall(start, end, step)) {
            end = step = undefined;
          }
          start = +start || 0;
          step = step == null ? 1 : (+step || 0);
          if (end == null) {
            end = start;
            start = 0;
          } else {
            end = +end || 0;
          }
          var index = -1,
              length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
              result = Array(length);
          while (++index < length) {
            result[index] = start;
            start += step;
          }
          return result;
        }
        function times(n, iteratee, thisArg) {
          n = nativeFloor(n);
          if (n < 1 || !nativeIsFinite(n)) {
            return [];
          }
          var index = -1,
              result = Array(nativeMin(n, MAX_ARRAY_LENGTH));
          iteratee = bindCallback(iteratee, thisArg, 1);
          while (++index < n) {
            if (index < MAX_ARRAY_LENGTH) {
              result[index] = iteratee(index);
            } else {
              iteratee(index);
            }
          }
          return result;
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return baseToString(prefix) + id;
        }
        function add(augend, addend) {
          return (+augend || 0) + (+addend || 0);
        }
        var ceil = createRound('ceil');
        var floor = createRound('floor');
        var max = createExtremum(gt, NEGATIVE_INFINITY);
        var min = createExtremum(lt, POSITIVE_INFINITY);
        var round = createRound('round');
        function sum(collection, iteratee, thisArg) {
          if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
            iteratee = undefined;
          }
          iteratee = getCallback(iteratee, thisArg, 3);
          return iteratee.length == 1 ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee) : baseSum(collection, iteratee);
        }
        lodash.prototype = baseLodash.prototype;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        MapCache.prototype['delete'] = mapDelete;
        MapCache.prototype.get = mapGet;
        MapCache.prototype.has = mapHas;
        MapCache.prototype.set = mapSet;
        SetCache.prototype.push = cachePush;
        memoize.Cache = MapCache;
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.callback = callback;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.functions = functions;
        lodash.groupBy = groupBy;
        lodash.indexBy = indexBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.invert = invert;
        lodash.invoke = invoke;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.modArgs = modArgs;
        lodash.negate = negate;
        lodash.omit = omit;
        lodash.once = once;
        lodash.pairs = pairs;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pluck = pluck;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.restParam = restParam;
        lodash.set = set;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortByAll = sortByAll;
        lodash.sortByOrder = sortByOrder;
        lodash.spread = spread;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.times = times;
        lodash.toArray = toArray;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.union = union;
        lodash.uniq = uniq;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.where = where;
        lodash.without = without;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipWith = zipWith;
        lodash.backflow = flowRight;
        lodash.collect = map;
        lodash.compose = flowRight;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.extend = assign;
        lodash.iteratee = callback;
        lodash.methods = functions;
        lodash.object = zipObject;
        lodash.select = filter;
        lodash.tail = rest;
        lodash.unique = uniq;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.deburr = deburr;
        lodash.endsWith = endsWith;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.findWhere = findWhere;
        lodash.first = first;
        lodash.floor = floor;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isBoolean = isBoolean;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isMatch = isMatch;
        lodash.isNaN = isNaN;
        lodash.isNative = isNative;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isString = isString;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.min = min;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padLeft = padLeft;
        lodash.padRight = padRight;
        lodash.parseInt = parseInt;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.sum = sum;
        lodash.template = template;
        lodash.trim = trim;
        lodash.trimLeft = trimLeft;
        lodash.trimRight = trimRight;
        lodash.trunc = trunc;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.words = words;
        lodash.all = every;
        lodash.any = some;
        lodash.contains = includes;
        lodash.eq = isEqual;
        lodash.detect = find;
        lodash.foldl = reduce;
        lodash.foldr = reduceRight;
        lodash.head = first;
        lodash.include = includes;
        lodash.inject = reduce;
        mixin(lodash, (function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!lodash.prototype[methodName]) {
              source[methodName] = func;
            }
          });
          return source;
        }()), false);
        lodash.sample = sample;
        lodash.prototype.sample = function(n) {
          if (!this.__chain__ && n == null) {
            return sample(this.value());
          }
          return this.thru(function(value) {
            return sample(value, n);
          });
        };
        lodash.VERSION = VERSION;
        arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(['drop', 'take'], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            var filtered = this.__filtered__;
            if (filtered && !index) {
              return new LazyWrapper(this);
            }
            n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);
            var result = this.clone();
            if (filtered) {
              result.__takeCount__ = nativeMin(result.__takeCount__, n);
            } else {
              result.__views__.push({
                'size': n,
                'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
              });
            }
            return result;
          };
          LazyWrapper.prototype[methodName + 'Right'] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
          var type = index + 1,
              isFilter = type != LAZY_MAP_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
            var result = this.clone();
            result.__iteratees__.push({
              'iteratee': getCallback(iteratee, thisArg, 1),
              'type': type
            });
            result.__filtered__ = result.__filtered__ || isFilter;
            return result;
          };
        });
        arrayEach(['first', 'last'], function(methodName, index) {
          var takeName = 'take' + (index ? 'Right' : '');
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(['initial', 'rest'], function(methodName, index) {
          var dropName = 'drop' + (index ? '' : 'Right');
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        arrayEach(['pluck', 'where'], function(methodName, index) {
          var operationName = index ? 'filter' : 'map',
              createCallback = index ? baseMatches : property;
          LazyWrapper.prototype[methodName] = function(value) {
            return this[operationName](createCallback(value));
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.reject = function(predicate, thisArg) {
          predicate = getCallback(predicate, thisArg, 1);
          return this.filter(function(value) {
            return !predicate(value);
          });
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = start == null ? 0 : (+start || 0);
          var result = this;
          if (result.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result);
          }
          if (start < 0) {
            result = result.takeRight(-start);
          } else if (start) {
            result = result.drop(start);
          }
          if (end !== undefined) {
            end = (+end || 0);
            result = end < 0 ? result.dropRight(-end) : result.take(end - start);
          }
          return result;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate, thisArg) {
          return this.reverse().takeWhile(predicate, thisArg).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(POSITIVE_INFINITY);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
              retUnwrapped = /^(?:first|last)$/.test(methodName),
              lodashFunc = lodash[retUnwrapped ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName];
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var args = retUnwrapped ? [1] : arguments,
                chainAll = this.__chain__,
                value = this.__wrapped__,
                isHybrid = !!this.__actions__.length,
                isLazy = value instanceof LazyWrapper,
                iteratee = args[0],
                useLazy = isLazy || isArray(value);
            if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
              isLazy = useLazy = false;
            }
            var interceptor = function(value) {
              return (retUnwrapped && chainAll) ? lodashFunc(value, 1)[0] : lodashFunc.apply(undefined, arrayPush([value], args));
            };
            var action = {
              'func': thru,
              'args': [interceptor],
              'thisArg': undefined
            },
                onlyLazy = isLazy && !isHybrid;
            if (retUnwrapped && !chainAll) {
              if (onlyLazy) {
                value = value.clone();
                value.__actions__.push(action);
                return func.call(value);
              }
              return lodashFunc.call(undefined, this.value())[0];
            }
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result = func.apply(value, args);
              result.__actions__.push(action);
              return new LodashWrapper(result, chainAll);
            }
            return this.thru(interceptor);
          };
        });
        arrayEach(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
          var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
              chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
              retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              return func.apply(this.value(), args);
            }
            return this[chainName](function(value) {
              return func.apply(value, args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name,
                names = realNames[key] || (realNames[key] = []);
            names.push({
              'name': methodName,
              'func': lodashFunc
            });
          }
        });
        realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{
          'name': 'wrapper',
          'func': undefined
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.concat = wrapperConcat;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toString = wrapperToString;
        lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.collect = lodash.prototype.map;
        lodash.prototype.head = lodash.prototype.first;
        lodash.prototype.select = lodash.prototype.filter;
        lodash.prototype.tail = lodash.prototype.rest;
        return lodash;
      }
      var _ = runInContext();
      if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        root._ = _;
        define(function() {
          return _;
        });
      } else if (freeExports && freeModule) {
        if (moduleExports) {
          (freeModule.exports = _)._ = _;
        } else {
          freeExports._ = _;
        }
      } else {
        root._ = _;
      }
    }.call(this));
  })($__require('9'));
  return module.exports;
});

$__System.registerDynamic("5", ["3c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('3c');
  return module.exports;
});

$__System.registerDynamic("4", ["5"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var previousTuio = root.Tuio;
    var slice = Array.prototype.slice;
    var splice = Array.prototype.splice;
    var Tuio;
    if (typeof exports !== "undefined") {
      Tuio = exports;
    } else {
      Tuio = root.Tuio = {};
    }
    Tuio.VERSION = "0.0.1";
    Tuio.TUIO_ADDED = 0;
    Tuio.TUIO_ACCELERATING = 1;
    Tuio.TUIO_DECELERATING = 2;
    Tuio.TUIO_STOPPED = 3;
    Tuio.TUIO_REMOVED = 4;
    Tuio.TUIO_ROTATING = 5;
    Tuio.TUIO_IDLE = 6;
    var _ = root._;
    if (!_ && (typeof $__require !== "undefined")) {
      _ = $__require('5');
    }
    Tuio.noConflict = function() {
      root.Tuio = previousTuio;
      return this;
    };
    var eventSplitter = /\s+/;
    var Events = Tuio.Events = {
      on: function(events, callback, context) {
        var calls,
            event,
            node,
            tail,
            list;
        if (!callback) {
          return this;
        }
        events = events.split(eventSplitter);
        calls = this._callbacks || (this._callbacks = {});
        while (event = events.shift()) {
          list = calls[event];
          node = list ? list.tail : {};
          node.next = tail = {};
          node.context = context;
          node.callback = callback;
          calls[event] = {
            tail: tail,
            next: list ? list.next : node
          };
        }
        return this;
      },
      off: function(events, callback, context) {
        var event,
            calls,
            node,
            tail,
            cb,
            ctx;
        if (!(calls = this._callbacks)) {
          return;
        }
        if (!(events || callback || context)) {
          delete this._callbacks;
          return this;
        }
        events = events ? events.split(eventSplitter) : _.keys(calls);
        while (event = events.shift()) {
          node = calls[event];
          delete calls[event];
          if (!node || !(callback || context)) {
            continue;
          }
          tail = node.tail;
          while ((node = node.next) !== tail) {
            cb = node.callback;
            ctx = node.context;
            if ((callback && cb !== callback) || (context && ctx !== context)) {
              this.on(event, cb, ctx);
            }
          }
        }
        return this;
      },
      trigger: function(events) {
        var event,
            node,
            calls,
            tail,
            args,
            all,
            rest;
        if (!(calls = this._callbacks)) {
          return this;
        }
        all = calls.all;
        events = events.split(eventSplitter);
        rest = slice.call(arguments, 1);
        while (event = events.shift()) {
          if (node = calls[event]) {
            tail = node.tail;
            while ((node = node.next) !== tail) {
              node.callback.apply(node.context || this, rest);
            }
          }
          if (node = all) {
            tail = node.tail;
            args = [event].concat(rest);
            while ((node = node.next) !== tail) {
              node.callback.apply(node.context || this, args);
            }
          }
        }
        return this;
      }
    };
    var Model = Tuio.Model = function() {
      this.initialize.apply(this, arguments);
    };
    _.extend(Model.prototype, Events);
    var extend = function(protoProps, classProps) {
      var child = inherits(this, protoProps, classProps);
      child.extend = this.extend;
      return child;
    };
    Tuio.Model.extend = extend;
    var Ctor = function() {};
    var inherits = function(parent, protoProps, staticProps) {
      var child;
      if (protoProps && protoProps.hasOwnProperty("constructor")) {
        child = protoProps.constructor;
      } else {
        child = function() {
          parent.apply(this, arguments);
        };
      }
      _.extend(child, parent);
      Ctor.prototype = parent.prototype;
      child.prototype = new Ctor();
      if (protoProps) {
        _.extend(child.prototype, protoProps);
      }
      if (staticProps) {
        _.extend(child, staticProps);
      }
      child.prototype.constructor = child;
      child.__super__ = parent.prototype;
      return child;
    };
  }(this));
  return module.exports;
});

$__System.registerDynamic("7", ["4"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
    }
    Tuio.Time = Tuio.Model.extend({
      seconds: 0,
      microSeconds: 0,
      frameId: 0,
      initialize: function(sec, usec) {
        this.seconds = sec || 0;
        this.microSeconds = usec || 0;
      },
      add: function(us) {
        return new Tuio.Time(this.seconds + Math.floor(us / 1000000), this.microSeconds + us % 1000000);
      },
      addTime: function(ttime) {
        var sec = this.seconds + ttime.getSeconds(),
            usec = this.microSeconds + ttime.getMicroseconds();
        sec += Math.floor(usec / 1000000);
        usec = usec % 1000000;
        return new Tuio.Time(sec, usec);
      },
      subtract: function(us) {
        var sec = this.seconds - Math.floor(us / 1000000),
            usec = this.microSeconds - us % 1000000;
        if (usec < 0) {
          usec += 1000000;
          sec = sec - 1;
        }
        return new Tuio.Time(sec, usec);
      },
      subtractTime: function(ttime) {
        var sec = this.seconds - ttime.getSeconds(),
            usec = this.microSeconds - ttime.getMicroseconds();
        if (usec < 0) {
          usec += 1000000;
          sec = sec - 1;
        }
        return new Tuio.Time(sec, usec);
      },
      equals: function(ttime) {
        return ((this.seconds === ttime.getSeconds()) && (this.microSeconds === ttime.getMicroseconds()));
      },
      reset: function() {
        this.seconds = 0;
        this.microSeconds = 0;
      },
      getSeconds: function() {
        return this.seconds;
      },
      getMicroseconds: function() {
        return this.microSeconds;
      },
      getTotalMilliseconds: function() {
        return this.seconds * 1000 + Math.floor(this.microSeconds / 1000);
      },
      getFrameId: function() {
        return this.frameId;
      },
      setFrameId: function(frameId) {
        this.frameId = frameId;
      }
    }, {
      startSeconds: 0,
      startMicroSeconds: 0,
      fromMilliseconds: function(msec) {
        return new Tuio.Time(Math.floor(msec / 1000), 1000 * (msec % 1000));
      },
      fromTime: function(ttime) {
        return new Tuio.Time(ttime.getSeconds(), ttime.getMicroseconds());
      },
      initSession: function() {
        var startTime = Tuio.Time.getSystemTime();
        Tuio.Time.startSeconds = startTime.getSeconds();
        Tuio.Time.startMicroSeconds = startTime.getMicroseconds();
      },
      getSessionTime: function() {
        return Tuio.Time.getSystemTime().subtractTime(Tuio.Time.getStartTime());
      },
      getStartTime: function() {
        return new Tuio.Time(Tuio.Time.startSeconds, Tuio.Time.startMicroSeconds);
      },
      getSystemTime: function() {
        var usec = new Date().getTime() * 1000;
        return new Tuio.Time(Math.floor(usec / 1000000), usec % 1000000);
      }
    });
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Time;
    }
  }(this));
  return module.exports;
});

$__System.registerDynamic("36", ["4", "38", "7"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      Tuio.Point = $__require('38');
      Tuio.Time = $__require('7');
    }
    Tuio.Container = Tuio.Point.extend({
      sessionId: null,
      xSpeed: null,
      ySpeed: null,
      motionSpeed: null,
      motionAccel: null,
      path: null,
      state: null,
      initialize: function(params) {
        Tuio.Point.prototype.initialize.call(this, params);
        this.sessionId = params.si;
        this.xSpeed = params.xs || 0;
        this.ySpeed = params.ys || 0;
        this.motionSpeed = 0;
        this.motionAccel = params.ma || 0;
        this.path = [new Tuio.Point({
          ttime: this.currentTime,
          xp: this.xPos,
          yp: this.yPos
        })];
        this.state = Tuio.TUIO_ADDED;
      },
      update: function(params) {
        var lastPoint = this.path[this.path.length - 1];
        Tuio.Point.prototype.update.call(this, params);
        if (params.hasOwnProperty("xs") && params.hasOwnProperty("ys") && params.hasOwnProperty("ma")) {
          this.xSpeed = params.xs;
          this.ySpeed = params.ys;
          this.motionSpeed = Math.sqrt(this.xSpeed * this.xSpeed + this.ySpeed * this.ySpeed);
          this.motionAccel = params.ma;
        } else {
          var diffTime = this.currentTime.subtractTime(lastPoint.getTuioTime()),
              dt = diffTime.getTotalMilliseconds() / 1000,
              dx = this.xPos - lastPoint.getX(),
              dy = this.yPos - lastPoint.getY(),
              dist = Math.sqrt(dx * dx + dy * dy),
              lastMotionSpeed = this.motionSpeed;
          this.xSpeed = dx / dt;
          this.ySpeed = dy / dt;
          this.motionSpeed = dist / dt;
          this.motionAccel = (this.motionSpeed - lastMotionSpeed) / dt;
        }
        this.updatePathAndState();
      },
      updateContainer: function(tcon) {
        Tuio.Point.prototype.updateToPoint.call(this, tcon);
        this.xSpeed = tcon.getXSpeed();
        this.ySpeed = tcon.getYSpeed();
        this.motionSpeed = tcon.getMotionSpeed();
        this.motionAccel = tcon.getMotionAccel();
        this.updatePathAndState();
      },
      updatePathAndState: function() {
        this.path.push(new Tuio.Point({
          ttime: this.currentTime,
          xp: this.xPos,
          yp: this.yPos
        }));
        if (this.motionAccel > 0) {
          this.state = Tuio.TUIO_ACCELERATING;
        } else if (this.motionAccel < 0) {
          this.state = Tuio.TUIO_DECELERATING;
        } else {
          this.state = Tuio.TUIO_STOPPED;
        }
      },
      stop: function(ttime) {
        this.update({
          ttime: ttime,
          xp: this.xPos,
          yp: this.yPos
        });
      },
      remove: function(ttime) {
        this.currentTime = Tuio.Time.fromTime(ttime);
        this.state = Tuio.TUIO_REMOVED;
      },
      getSessionId: function() {
        return this.sessionId;
      },
      getXSpeed: function() {
        return this.xSpeed;
      },
      getYSpeed: function() {
        return this.ySpeed;
      },
      getPosition: function() {
        return new Tuio.Point(this.xPos, this.yPos);
      },
      getPath: function() {
        return this.path;
      },
      getMotionSpeed: function() {
        return this.motionSpeed;
      },
      getMotionAccel: function() {
        return this.motionAccel;
      },
      getTuioState: function() {
        return this.state;
      },
      isMoving: function() {
        return ((this.state === Tuio.TUIO_ACCELERATING) || (this.state === Tuio.TUIO_DECELERATING));
      }
    }, {fromContainer: function(tcon) {
        return new Tuio.Container({
          xp: tcon.getX(),
          yp: tcon.getY(),
          si: tcon.getSessionID()
        });
      }});
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Container;
    }
  }(this));
  return module.exports;
});

$__System.registerDynamic("3d", ["4", "36"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var Tuio = root.Tuio;
    if (typeof $__require !== "undefined") {
      Tuio = $__require('4');
      Tuio.Container = $__require('36');
    }
    Tuio.Object = Tuio.Container.extend({
      symbolId: null,
      angle: null,
      rotationSpeed: null,
      rotationAccel: null,
      initialize: function(params) {
        Tuio.Container.prototype.initialize.call(this, params);
        this.symbolId = params.sym;
        this.angle = params.a;
        this.rotationSpeed = 0;
        this.rotationAccel = 0;
      },
      update: function(params) {
        var lastPoint = this.path[this.path.length - 1];
        Tuio.Container.prototype.update.call(this, params);
        if (params.hasOwnProperty("rs") && params.hasOwnProperty("ra")) {
          this.angle = params.a;
          this.rotationSpeed = params.rs;
          this.rotationAccel = params.ra;
        } else {
          var diffTime = this.currentTime.subtractTime(lastPoint.getTuioTime()),
              dt = diffTime.getTotalMilliseconds() / 1000,
              lastAngle = this.angle,
              lastRotationSpeed = this.rotationSpeed;
          this.angle = params.a;
          var da = (this.angle - lastAngle) / (2 * Math.PI);
          if (da > 0.75) {
            da -= 1;
          } else if (da < -0.75) {
            da += 1;
          }
          this.rotationSpeed = da / dt;
          this.rotationAccel = (this.rotationSpeed - lastRotationSpeed) / dt;
        }
        this.updateObjectState();
      },
      updateObject: function(tobj) {
        Tuio.Container.prototype.updateContainer.call(this, tobj);
        this.angle = tobj.getAngle();
        this.rotationSpeed = tobj.getRotationSpeed();
        this.rotationAccel = tobj.getRotationAccel();
        this.updateObjectState();
      },
      updateObjectState: function() {
        if ((this.rotationAccel !== 0) && (this.state !== Tuio.TUIO_STOPPED)) {
          this.state = Tuio.TUIO_ROTATING;
        }
      },
      stop: function(ttime) {
        this.update({
          ttime: ttime,
          xp: this.xPos,
          yp: this.yPos,
          a: this.angle
        });
      },
      getSymbolId: function() {
        return this.symbolId;
      },
      getAngle: function() {
        return this.angle;
      },
      getAngleDegrees: function() {
        return this.angle / Math.PI * 180;
      },
      getRotationSpeed: function() {
        return this.rotationSpeed;
      },
      getRotationAccel: function() {
        return this.rotationAccel;
      },
      isMoving: function() {
        return ((this.state === Tuio.TUIO_ACCELERATING) || (this.state === Tuio.TUIO_DECELERATING) || (this.state === Tuio.TUIO_ROTATING));
      }
    }, {fromObject: function(tobj) {
        return new Tuio.Object({
          xp: tobj.getX(),
          yp: tobj.getY(),
          si: tobj.getSessionID(),
          sym: tobj.getSymbolId(),
          a: tobj.getAngle()
        });
      }});
    if (typeof exports !== "undefined") {
      module.exports = Tuio.Object;
    }
  }(this));
  return module.exports;
});

$__System.register('21', ['35', '37', '1e', '3d'], function (_export) {
    'use strict';

    var TuioCursor, TuioToken, TuioPointer, TuioObject, inputType;

    _export('inputObjectFromTuio', inputObjectFromTuio);

    _export('inputObjectFromPath', inputObjectFromPath);

    _export('tuioObjectUpdate', tuioObjectUpdate);

    function inputObjectFromTuio(tuioComponent, calibration) {
        var identifier = tuioComponent.getSessionId(),
            point = pointInformation(tuioComponent, calibration, Date.now()),
            path = [point],
            componentType = componentTypeInformation(tuioComponent),
            componentId = componentIdInformation(tuioComponent),
            type = undefined,
            user = undefined;

        if (typeof tuioComponent.getTypeId === 'function') {
            type = tuioComponent.getTypeId();
        }

        if (typeof tuioComponent.getUserId === 'function') {
            user = tuioComponent.getUserId();
        }

        return babelHelpers._extends({
            identifier: identifier, type: type, user: user,
            path: path,
            componentType: componentType,
            componentId: componentId
        }, point);
    }

    function inputObjectFromPath(inputObject, path) {
        var identifier = inputObject.identifier;
        var type = inputObject.type;
        var firstPointInPath = path[0];

        return babelHelpers._extends({
            identifier: identifier, path: path, type: type
        }, firstPointInPath);
    }

    function tuioObjectUpdate(inputObject, tuioComponent, calibration) {
        // update path
        var lastPoint = pointInformation(tuioComponent, calibration, Date.now());
        inputObject.path[inputObject.path.length] = lastPoint;
        // update point information (screenX, clientX...)
        // but keep the original starting time
        Object.assign(inputObject, pointInformation(tuioComponent, calibration, inputObject.startingTime));
    }

    function pointInformation(tuioComponent, calibration, startingTime) {

        var relativeScreenX = tuioComponent.getX(),
            relativeScreenY = tuioComponent.getY(),

        // this is time in milliseconds
        tuioTime = (tuioComponent.getTuioTime().seconds * 1e6 + tuioComponent.getTuioTime().microSeconds) * 1e-3,
            screenX = tuioComponent.getScreenX(window.screen.width),
            screenY = tuioComponent.getScreenY(window.screen.height),
            clientX = undefined,
            clientY = undefined,
            pageX = undefined,
            pageY = undefined,
            angle = undefined;

        if (typeof calibration !== 'undefined' && calibration.isScreenUsable()) {
            var _calibration$screenToBrowserCoordinates = calibration.screenToBrowserCoordinates(screenX, screenY);

            clientX = _calibration$screenToBrowserCoordinates.clientX;
            clientY = _calibration$screenToBrowserCoordinates.clientY;
            pageX = _calibration$screenToBrowserCoordinates.pageX;
            pageY = _calibration$screenToBrowserCoordinates.pageY;
        }

        if (!isNaN(tuioComponent.getAngle())) {
            angle = tuioComponent.getAngle();
        }

        return {
            relativeScreenX: relativeScreenX, relativeScreenY: relativeScreenY,
            screenX: screenX, screenY: screenY,
            clientX: clientX, clientY: clientY,
            pageX: pageX, pageY: pageY,
            startingTime: startingTime,
            tuioTime: tuioTime,
            angle: angle
        };
    }

    function componentTypeInformation(tuioComponent) {
        if (tuioComponent instanceof TuioPointer) return inputType.POINTER;
        if (tuioComponent instanceof TuioCursor) return inputType.CURSOR;
        if (tuioComponent instanceof TuioObject) return inputType.OBJECT;
        if (tuioComponent instanceof TuioToken) return inputType.TOKEN;
    }

    function componentIdInformation(tuioComponent) {
        if (tuioComponent instanceof TuioObject) return tuioComponent.getSymbolId();
    }
    return {
        setters: [function (_) {
            TuioCursor = _['default'];
        }, function (_2) {
            TuioToken = _2['default'];
        }, function (_e) {
            TuioPointer = _e['default'];
        }, function (_d) {
            TuioObject = _d['default'];
        }],
        execute: function () {
            inputType = Object.freeze({
                POINTER: 'pointer',
                CURSOR: 'cursor',
                OBJECT: 'object',
                TOKEN: 'token'
            });

            _export('inputType', inputType);
        }
    };
});
$__System.register("3e", [], function (_export) {
    // compares if an array (of identifiers) is equal to another
    // [1,2,3] equals [1,2,3]
    // but also [3,2,1]
    "use strict";

    _export("compareInput", compareInput);

    _export("inputComparison", inputComparison);

    function compareInput(first, second) {
        var equalLength = first.length === second.length,
            secondContainsAllOfFirst = true;

        for (var i = 0; i < first.length; i += 1) {
            var item = first[i];
            if (second.indexOf(item) === -1) {
                secondContainsAllOfFirst = false;
                break;
            }
        }

        return equalLength && secondContainsAllOfFirst;
    }

    function inputComparison() {

        var currentInputIds = [],
            matchedInputIds = [],
            previousInputIds = [],
            currentInputPreviouslyMatched = undefined,
            currentInputPreviouslyUsed = undefined;

        // returns an array of identifiers [1,2,...]
        // from an array of inputObjects
        // [{identifier: 1,...}, {identifier: 2,...},...}
        function extractIdentifiersFrom() {
            var inputObjects = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            currentInputIds.length = 0;
            for (var i = 0; i < inputObjects.length; i += 1) {
                var inputObject = inputObjects[i];
                if (inputObject) {
                    currentInputIds[currentInputIds.length] = inputObject.identifier;
                }
            }
        }

        function setSecondAsFirst(first, second) {
            first.length = 0;
            for (var i = 0; i < second.length; i += 1) {
                first[i] = second[i];
            }
        }

        return {
            use: function use(inputObjects) {
                extractIdentifiersFrom(inputObjects);
                //
                currentInputPreviouslyMatched = compareInput(currentInputIds, matchedInputIds);
                //
                currentInputPreviouslyUsed = compareInput(currentInputIds, previousInputIds);
                // save for the next time the .load method is called
                setSecondAsFirst(previousInputIds, currentInputIds);
            },
            matched: function matched() {
                setSecondAsFirst(matchedInputIds, currentInputIds);
            },
            previouslyMatched: function previouslyMatched() {
                return currentInputPreviouslyMatched;
            },
            previouslyUsed: function previouslyUsed() {
                return currentInputPreviouslyUsed;
            }
        };
    }

    return {
        setters: [],
        execute: function () {}
    };
});
$__System.register('33', ['21', '27', '3e'], function (_export) {
    'use strict';

    var inputObjectFromPath, featureFactory, inputComparison, userDefinedGestures, gestureFlags, gestureFlagNames, gestureException;

    _export('createGesture', createGesture);

    // check if inputObjects are an array with at least one element

    _export('extractDurationFrom', extractDurationFrom);

    _export('validInputFromDuration', validInputFromDuration);

    function createGesture(gestureDefinition) {
        var bubbleTopNodes = [],
            stickyTopNode = null,
            validTopNodesOnEmit = [],
            _features = undefined;

        // don't store gesture if definition invalid
        isValidGesture(gestureDefinition);
        // initialize and store features
        // a valid gesture has every feature valid
        _features = initializeFeaturesFrom(gestureDefinition);
        // initialize flags
        var _flags = extractFlagsFrom(gestureDefinition),
            hasOneshotFlag = _flags.indexOf(gestureFlags.ONESHOT) !== -1,
            hasBubbleFlag = _flags.indexOf(gestureFlags.BUBBLE) !== -1,
            hasStickyFlag = _flags.indexOf(gestureFlags.STICKY) !== -1,
            hasNoFlag = _flags.length === 0,
            _duration = extractDurationFrom(gestureDefinition);

        var inputCheck = inputComparison();

        function validateEveryFeatureFor(inputState) {
            for (var i = 0; i < _features.length; i += 1) {
                if (!_features[i].load(inputState)) {
                    return false;
                }
            }
            return true;
        }

        function inputObjectsFrom(inputState) {
            var inputObjects = inputState.inputObjects;

            if (_duration.definition.length !== 0) {
                inputObjects = validInputFromDuration(inputObjects, _duration);
            }

            return inputObjects;
        }

        return {
            definition: function definition() {
                return gestureDefinition;
            },

            name: function name() {
                return gestureDefinition.name;
            },

            features: function features() {
                return _features;
            },

            flags: function flags() {
                return _flags;
            },

            duration: function duration() {
                return _duration;
            },
            // hopefully somehow simpler in the future
            // checks if the gesture is valid by validating every feature
            // and returns nodes to emit gestures on (based on which flags are set)
            load: function load() {
                var inputState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                inputState.inputObjects = inputObjectsFrom(inputState);

                var node = inputState.node;
                var inputObjects = inputState.inputObjects;

                if (validInput(inputObjects)) {
                    inputCheck.use(inputObjects);
                    // boils down to
                    // gestures with oneshot flags should be triggered once
                    // until the identifiers change (e.g. tuio session ids)
                    var everyFeatureMatches = false,
                        oneshotFlagFulfilled = hasOneshotFlag && inputCheck.previouslyMatched();
                    // the gesture should not match if it is oneshot
                    // and already triggered
                    if (!oneshotFlagFulfilled) {
                        everyFeatureMatches = validateEveryFeatureFor(inputState);
                    }
                    if (hasBubbleFlag) {
                        if (!inputCheck.previouslyUsed()) {
                            bubbleTopNodes.length = 0;
                        }
                        if (bubbleTopNodes.indexOf(node) === -1) {
                            bubbleTopNodes[bubbleTopNodes.length] = node;
                        }
                    }
                    if (everyFeatureMatches) {
                        validTopNodesOnEmit.length = 0;
                        if (hasBubbleFlag) {
                            for (var i = 0; i < bubbleTopNodes.length; i += 1) {
                                validTopNodesOnEmit[i] = bubbleTopNodes[i];
                            }
                        } else if (hasStickyFlag) {
                            // if input the same use the already known sticky node
                            if (!inputCheck.previouslyMatched()) {
                                stickyTopNode = node;
                            }
                            validTopNodesOnEmit[validTopNodesOnEmit.length] = stickyTopNode;
                        } else if (
                        // oneshot gestures will get here only once
                        hasOneshotFlag || hasNoFlag) {
                            validTopNodesOnEmit[validTopNodesOnEmit.length] = node;
                        }
                        // save currentInputIds for future reference
                        inputCheck.matched();
                    } else {
                        validTopNodesOnEmit.length = 0;
                    }
                }
                return validTopNodesOnEmit;
            },
            featureValuesToObject: function featureValuesToObject(data) {
                for (var i = 0; i < _features.length; i += 1) {
                    var feature = _features[i];
                    feature.setValueToObject(data);
                }
                return this;
            }
        };
    }

    function isValidGesture(definition) {
        if (typeof definition === 'undefined' || Object.keys(definition).length === 0) {
            throw new Error(gestureException.EMPTY);
        }

        var name = definition.name;
        var features = definition.features;
        var duration = definition.duration;

        if (typeof name === 'undefined') {
            throw new Error(gestureException.NO_NAME);
        }
        if (typeof features === 'undefined' || typeof features.length === 'undefined' || features.length === 0) {
            throw new Error(gestureException.NO_FEATURES);
        }
        if (userDefinedGestures.has(name)) {
            throw new Error(gestureException.DUPLICATE);
        }
        if (typeof definition.flags !== 'undefined') {
            var definitionFlags = extractFlagsFrom(definition);
            // needs to be one of 'sticky', 'bubble', 'oneshot'
            var validFlags = definitionFlags.every(function (flagName) {
                return gestureFlagNames.indexOf(flagName) !== -1;
            });
            if (!validFlags) {
                throw new Error(gestureException.INVALID_FLAGS + '.\n                Expecting some of: ' + gestureFlagNames + '; received: ' + definitionFlags);
            }
        }
        if (typeof duration !== 'undefined') {
            if (!Array.isArray(duration) || duration.length > 2) {
                throw new Error(gestureException.INVALID_DURATION + '. Expecting\n                                [number], or [number, number]; received ' + duration);
            }
            duration.forEach(function (durationLimit) {
                if (typeof durationLimit !== 'number') {
                    throw new Error(gestureException.INVALID_DURATION + '. Expecting\n                                    array of numbers, received ' + typeof durationLimit);
                }
            });
        }
    }

    // returns an array of instantiated feature objects
    function initializeFeaturesFrom(gestureDefinition) {
        return gestureDefinition.features.map(function (feature) {
            return featureFactory(feature);
        });
    }

    // definition can have flags set as string, 'oneshot'
    // or array of flags, ['oneshot'], or ['oneshot', 'bubble']
    // always returns an array
    function extractFlagsFrom(gestureDefinition) {
        var definitionFlags = gestureDefinition.flags,
            flags = [];
        if (typeof definitionFlags !== 'undefined') {
            if (!Array.isArray(definitionFlags)) {
                definitionFlags = [definitionFlags];
            }
            flags = definitionFlags;
        }
        return flags;
    }

    function extractDurationFrom(definitionObject) {
        var duration = {
            // original definition
            definition: [],
            // in milliseconds
            start: Infinity,
            end: 0
        };
        if (typeof definitionObject.duration !== 'undefined') {
            var definition = duration.definition = definitionObject.duration;
            if (typeof definition[0] !== 'undefined') {
                duration.start = definition[0];
            }
            if (typeof definition[1] !== 'undefined') {
                duration.end = definition[1];
            }
        }
        return duration;
    }

    function validInput() {
        var inputObjects = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        return !!inputObjects.length;
    }

    function validInputPathFromDuration(inputObject, duration, currentTime) {
        var validInputPath = [];
        for (var j = 0; j < inputObject.path.length; j += 1) {
            var point = inputObject.path[j];
            var timeDiff = currentTime - point.startingTime;
            if (timeDiff <= duration.start && timeDiff >= duration.end) {
                validInputPath[validInputPath.length] = point;
            }
        }

        return validInputPath;
    }

    function validInputFromDuration(inputObjects, duration) {
        if (inputObjects === undefined) inputObjects = [];

        var validInputObjects = [],
            currentTime = Date.now();

        for (var i = 0; i < inputObjects.length; i += 1) {
            var inputObject = inputObjects[i];
            var validInputPath = validInputPathFromDuration(inputObject, duration, currentTime);
            if (validInputPath.length !== 0) {
                var validInputObject = inputObjectFromPath(inputObject, validInputPath);
                validInputObjects[validInputObjects.length] = validInputObject;
            }
        }

        return validInputObjects;
    }

    return {
        setters: [function (_2) {
            inputObjectFromPath = _2.inputObjectFromPath;
        }, function (_) {
            featureFactory = _.featureFactory;
        }, function (_e) {
            inputComparison = _e.inputComparison;
        }],
        execute: function () {
            userDefinedGestures = new Map();

            _export('userDefinedGestures', userDefinedGestures);

            gestureFlags = Object.freeze({
                ONESHOT: 'oneshot',
                STICKY: 'sticky',
                BUBBLE: 'bubble'
            });
            gestureFlagNames = Object.freeze(Object.keys(gestureFlags).map(function (key) {
                return gestureFlags[key];
            }));
            gestureException = Object.freeze({
                EMPTY: 'Attempting to define a gesture without\n                        passing a gesture',
                NO_NAME: 'Attempting to define a gesture without name',
                NO_FEATURES: 'Attempting to define a gestures without features',
                DUPLICATE: 'Attempting to define a gesture that already exists',
                INVALID_FLAGS: 'Attempting to define a gesture with an invalid flag',
                INVALID_DURATION: 'Attempting to define a gesture with invalid duration'
            });

            _export('gestureException', gestureException);
        }
    };
});
$__System.register('3f', ['23', '24', '33', '3e'], function (_export) {
    'use strict';

    var events, createEventObject, eventPropagatesImmediately, eventPropagates, userDefinedGestures, compareInput, builtInEvents, inputState;

    _export('gestureEmition', gestureEmition);

    function gestureEmition() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var allPreviousInput = [];
        var nodesForBuiltInEvents = Array(1);
        var triggeredParents = [];
        var findNode = params.findNode;

        function triggerCollection(nodesToEmitOn, inputObjects, gesture) {
            var eventName = typeof gesture === 'string' ? gesture : gesture.name();
            var eventObject = undefined;
            triggeredParents.length = 0;
            for (var i = 0; i < nodesToEmitOn.length; i += 1) {
                var currentNode = nodesToEmitOn[i];
                eventObject = createEventObject(nodesToEmitOn, currentNode, inputObjects, gesture);
                events.emit(currentNode, eventName, eventObject);
                if (eventPropagates(eventObject)) {
                    var parents = findNode.parentsOf(currentNode);
                    for (var j = 0; j < parents.length; j += 1) {
                        if (eventPropagates(eventObject)) {
                            if (!eventPropagatesImmediately(eventObject)) {
                                break;
                            }
                            var _parent = parents[j];
                            if (triggeredParents.indexOf(_parent) === -1) {
                                triggeredParents[triggeredParents.length] = _parent;
                                eventObject = createEventObject(nodesToEmitOn, currentNode, inputObjects, gesture);
                                eventObject.currentTarget = _parent;
                                events.emit(_parent, eventName, eventObject);
                            }
                        }
                    }
                }
            }
        }

        function triggerOnLastKnownNode(inputObjects, event) {
            var lastKnownInputObject = inputObjects[0],
                foundNode = findNode.fromPoint(lastKnownInputObject);

            nodesForBuiltInEvents[0] = foundNode;
            triggerCollection(nodesForBuiltInEvents, inputObjects, event);
        }

        return {
            builtIn: function builtIn(allCurrentInput) {
                if (allCurrentInput.length !== 0 && allPreviousInput.length === 0) {
                    triggerOnLastKnownNode(allCurrentInput, builtInEvents.INPUTSTART);
                } else if (allCurrentInput.length === 0 && allPreviousInput.length !== 0) {
                    triggerOnLastKnownNode(allPreviousInput, builtInEvents.INPUTEND);
                } else if (!compareInput(allCurrentInput, allPreviousInput)) {
                    triggerOnLastKnownNode(allCurrentInput, builtInEvents.INPUTCHANGE);
                }

                allPreviousInput.length = 0;
                for (var i = 0; i < allCurrentInput.length; i += 1) {
                    allPreviousInput[i] = allCurrentInput[i];
                }
            },
            userDefined: function userDefined(nodesInput, nodesInputHistory) {
                nodesInput.forEach(function forAllNodes(inputObjects, node) {
                    userDefinedGestures.forEach(function forAllGestures(gesture) {
                        var inputHistory = nodesInputHistory.get(node),
                            inputState = createInputState(inputObjects, inputHistory, node),
                            nodesToEmitOn = gesture.load(inputState);

                        if (nodesToEmitOn.length !== 0) {
                            triggerCollection(nodesToEmitOn, inputObjects, gesture);
                        }
                    });
                });
            }
        };
    }

    function createInputState(inputObjects, inputHistory, node) {
        inputState.inputObjects = inputObjects;
        inputState.inputHistory = inputHistory;
        inputState.node = node;
        return inputState;
    }
    return {
        setters: [function (_) {
            events = _.events;
        }, function (_2) {
            createEventObject = _2.createEventObject;
            eventPropagatesImmediately = _2.eventPropagatesImmediately;
            eventPropagates = _2.eventPropagates;
        }, function (_3) {
            userDefinedGestures = _3.userDefinedGestures;
        }, function (_e) {
            compareInput = _e.compareInput;
        }],
        execute: function () {
            builtInEvents = Object.freeze({
                INPUTSTART: 'inputstart',
                INPUTEND: 'inputend',
                INPUTCHANGE: 'inputchange'
            });
            inputState = {
                inputObjects: undefined,
                inputHistory: undefined,
                node: undefined
            };
        }
    };
});
$__System.register('40', ['2', '20', '22', '23', '32', '33', '1d', '1f', '3f'], function (_export) {
    'use strict';

    var elementInsertion, tuioInput, touchInput, domCollectionEvents, screenCalibration, createGesture, userDefinedGestures, TuioClient, nodeSearch, gestureEmition, emitGesture, findNode, defaultCalibration;

    _export('default', gispl);

    function gispl(selection) {

        var gisplApi = {},
            selectionInsertion = elementInsertion(gisplApi);

        domCollectionEvents(gisplApi);

        //initial selection insertion as gispl[index]
        selectionInsertion.append(selection);

        //iterate over the selection collection
        gisplApi.forEach = function gisplForEach() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            [].forEach.apply(this, args);
        };

        //additional elements
        // the registered callbacks up to this point
        // won't be applied to the new elements
        gisplApi.add = selectionInsertion.append;

        //event method aliases
        gisplApi.trigger = gisplApi.emit;

        return gisplApi;
    }

    function handleInput(nodesInput, nodesInputHistory, allCurrentInput) {
        if (typeof emitGesture === 'undefined') {
            emitGesture = gestureEmition({ findNode: findNode });
        }

        emitGesture.builtIn(allCurrentInput);
        emitGesture.userDefined(nodesInput, nodesInputHistory);
    }

    return {
        setters: [function (_2) {
            elementInsertion = _2['default'];
        }, function (_4) {
            tuioInput = _4['default'];
        }, function (_5) {
            touchInput = _5['default'];
        }, function (_) {
            domCollectionEvents = _.domCollectionEvents;
        }, function (_6) {
            screenCalibration = _6['default'];
        }, function (_3) {
            createGesture = _3.createGesture;
            userDefinedGestures = _3.userDefinedGestures;
        }, function (_d) {
            TuioClient = _d['default'];
        }, function (_f) {
            nodeSearch = _f['default'];
        }, function (_f2) {
            gestureEmition = _f2.gestureEmition;
        }],
        execute: function () {
            emitGesture = undefined;
            findNode = undefined;
            defaultCalibration = screenCalibration();
            gispl.addGesture = function gisplAddGesture(gestureDefinition) {
                if (typeof gestureDefinition === 'string') {
                    gestureDefinition = JSON.parse(gestureDefinition);
                }

                var gesture = createGesture(gestureDefinition, findNode);
                var _gestureDefinition = gestureDefinition;
                var name = _gestureDefinition.name;

                userDefinedGestures.set(name, gesture);
                return gispl;
            };

            gispl.clearGestures = function gisplClearGestures() {
                userDefinedGestures.clear();
                return gispl;
            };

            gispl.gesture = function gisplGesture(gestureName) {
                return userDefinedGestures.get(gestureName);
            };

            gispl.initTuio = function gisplInitTuio(params) {
                var host = params.host;
                var _params$calibration = params.calibration;
                var calibration = _params$calibration === undefined ? defaultCalibration : _params$calibration;

                var tuioClient = new TuioClient({ host: host });
                findNode = nodeSearch({ calibration: calibration });

                tuioInput({ tuioClient: tuioClient,
                    findNode: findNode,
                    calibration: calibration }).listen(handleInput);
            };

            gispl.initTouch = function gisplInitTouch() {
                var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var _params$calibration2 = params.calibration;
                var calibration = _params$calibration2 === undefined ? defaultCalibration : _params$calibration2;

                findNode = nodeSearch({ calibration: calibration });

                touchInput({ findNode: findNode }).listen(handleInput);
            };

            gispl.filterBitmask = function gisplFilterBitmask() {
                var filters = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

                var bitmaskFilter = 0;
                if (filters.length) {
                    filters.forEach(function (filter) {
                        bitmaskFilter = bitmaskFilter | 1 << filter - 1;
                    });
                }
                return bitmaskFilter;
            };
        }
    };
});
(function() {
var define = $__System.amdDefine;
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var arr = [];
  var document = window.document;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "2.2.1",
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      },
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([\da-z])/gi,
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback) {
      return jQuery.each(this, callback);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor();
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      var realStringObj = obj && obj.toString();
      return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    },
    isPlainObject: function(obj) {
      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
      return true;
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval: function(code) {
      var script,
          indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function(obj, callback) {
      var length,
          i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = [];
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp,
          args,
          proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle = (function(window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function(list, elem) {
          var i = 0,
              len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          "ID": new RegExp("^#(" + identifier + ")"),
          "CLASS": new RegExp("^\\.(" + identifier + ")"),
          "TAG": new RegExp("^(" + identifier + "|[*])"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },
        unloadHandler = function() {
          setDocument();
        };
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, els) {
          var j = target.length,
              i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1;
        }};
    }
    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          nidselect,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          nodeType = context ? context.nodeType : 9;
      results = results || [];
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if ((m = match[1])) {
              if (nodeType === 9) {
                if ((elem = context.getElementById(m))) {
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }
              } else {
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;
            } else if (context.nodeName.toLowerCase() !== "object") {
              if ((nid = context.getAttribute("id"))) {
                nid = nid.replace(rescape, "\\$&");
              } else {
                context.setAttribute("id", (nid = expando));
              }
              groups = tokenize(selector);
              i = groups.length;
              nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
              while (i--) {
                groups[i] = nidselect + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {} finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      if ((parent = document.defaultView) && parent.top !== parent) {
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(document.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            return m ? [m] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(document.querySelectorAll))) {
        assert(function(div) {
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(div) {
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function(div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        "ATTR": function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function(match) {
          var excess,
              unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache) {
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                if (diff === false) {
                  while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0);
            }
          };
        },
        "PSEUDO": function(pseudo, argument) {
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        "not": markFunction(function(selector) {
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        "lang": markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        "target": function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function(elem) {
          return elem === docElem;
        },
        "focus": function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        "enabled": function(elem) {
          return elem.disabled === false;
        },
        "disabled": function(elem) {
          return elem.disabled === true;
        },
        "checked": function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },
        "selected": function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        "empty": function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        "header": function(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        "first": createPositionalPseudo(function() {
          return [0];
        }),
        "last": createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          checkNonElements = base && dir === "parentNode",
          doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName];
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return (newCache[2] = oldCache[2]);
              } else {
                uniqueCache[dir] = newCache;
                if ((newCache[2] = matcher(elem, context, xml))) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;
            if (outermost) {
              outermostContext = context === document || context || outermost;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem);
                  xml = !documentIsHTML;
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    if (!assert(function(div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function(div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function(div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var dir = function(elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function(n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
          len = this.length,
          ret = [],
          self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery,
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      init = jQuery.fn.init = function(selector, context, root) {
        var match,
            elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document.getElementById(match[2]);
              if (elem && elem.parentNode) {
                this.length = 1;
                this[0] = elem;
              }
              this.context = document;
              this.selector = selector;
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        } else if (jQuery.isFunction(selector)) {
          return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
      };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    index: function(elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return siblings(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnotwhite = (/\S+/g);
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var firing,
        memory,
        fired,
        locked,
        list = [],
        queue = [],
        firingIndex = -1,
        fire = function() {
          locked = options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        },
        self = {
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          lock: function() {
            locked = queue = [];
            if (!memory) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          fired: function() {
            return !!fired;
          }
        };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(subordinate) {
      var i = 0,
          resolveValues = slice.call(arguments),
          length = resolveValues.length,
          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
          updateFunc = function(i, contexts, values) {
            return function(value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!(--remaining)) {
                deferred.resolveWith(contexts, values);
              }
            };
          },
          progressValues,
          progressContexts,
          resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        window.setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.ready.promise();
  var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  var acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    register: function(owner, initial) {
      var value = initial || {};
      if (owner.nodeType) {
        owner[this.expando] = value;
      } else {
        Object.defineProperty(owner, this.expando, {
          value: value,
          writable: true,
          configurable: true
        });
      }
      return owner[this.expando];
    },
    cache: function(owner) {
      if (!acceptData(owner)) {
        return {};
      }
      var value = owner[this.expando];
      if (!value) {
        value = {};
        if (acceptData(owner)) {
          if (owner.nodeType) {
            owner[this.expando] = value;
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function(owner, data, value) {
      var prop,
          cache = this.cache(owner);
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        for (prop in data) {
          cache[prop] = data[prop];
        }
      }
      return cache;
    },
    get: function(owner, key) {
      return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
    },
    access: function(owner, key, value) {
      var stored;
      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
          name,
          camel,
          cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key === undefined) {
        this.register(owner);
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : (name.match(rnotwhite) || []);
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function(owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function(elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function(elem, name) {
      dataUser.remove(elem, name);
    },
    _data: function(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          dataUser.set(this, key);
        });
      }
      return access(this, function(value) {
        var data,
            camelKey;
        if (elem && value === undefined) {
          data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
          if (data !== undefined) {
            return data;
          }
          camelKey = jQuery.camelCase(key);
          data = dataUser.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        camelKey = jQuery.camelCase(key);
        this.each(function() {
          var data = dataUser.get(this, camelKey);
          dataUser.set(this, camelKey, value);
          if (key.indexOf("-") > -1 && data !== undefined) {
            dataUser.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
          dataPriv.remove(elem, [type + "queue", key]);
        })});
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale = 1,
        maxIterations = 20,
        currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      unit = unit || initialInUnit[3];
      valueParts = valueParts || [];
      initialInUnit = +initial || 1;
      do {
        scale = scale || ".5";
        initialInUnit = initialInUnit / scale;
        jQuery.style(elem, prop, initialInUnit + unit);
      } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var rcheckableType = (/^(?:checkbox|radio)$/i);
  var rtagName = (/<([\w:-]+)/);
  var rscriptType = (/^$|\/(?:java|ecma)script/i);
  var wrapMap = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        if (jQuery.type(elem) === "object") {
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }
          jQuery.merge(nodes, tmp.childNodes);
          tmp = fragment.firstChild;
          tmp.textContent = "";
        }
      }
    }
    fragment.textContent = "";
    i = 0;
    while ((elem = nodes[i++])) {
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      contains = jQuery.contains(elem.ownerDocument, elem);
      tmp = getAll(fragment.appendChild(elem), "script");
      if (contains) {
        setGlobalEval(tmp);
      }
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  (function() {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn,
        type;
    if (typeof types === "object") {
      if (typeof selector !== "string") {
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        fn = data;
        data = undefined;
      } else {
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function(event) {
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function() {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue = [],
          args = slice.call(arguments),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i,
          matches,
          sel,
          handleObj,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;
      if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
      filter: function(event, original) {
        var eventDoc,
            doc,
            body,
            button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
        }
        return event;
      }
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
          prop,
          copy,
          type = event.type,
          originalEvent = event,
          fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: {noBubble: true},
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }}
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj,
          type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      rnoInnerhtml = /<script|<style|<link/i,
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i,
        l,
        type,
        pdataOld,
        pdataCur,
        udataOld,
        udataCur,
        events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
    if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
      return collection.each(function(index) {
        var self = collection.eq(index);
        if (isFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);
            if (hasScripts) {
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;
          jQuery.map(scripts, restoreScript);
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src) {
                if (jQuery._evalUrl) {
                  jQuery._evalUrl(node.src);
                }
              } else {
                jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && jQuery.contains(node.ownerDocument, node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    cleanData: function(elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    domManip: domManip,
    detach: function(selector) {
      return remove(this, selector, true);
    },
    remove: function(selector) {
      return remove(this, selector);
    },
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return domManip(this, arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return domManip(this, arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function() {
      var elem,
          i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var ignored = [];
      return domManip(this, arguments, function(elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe,
      elemdisplay = {
        HTML: "block",
        BODY: "block"
      };
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
        display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
        doc = iframe[0].contentDocument;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = (/^margin/);
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function(elem, options, callback, args) {
    var ret,
        name,
        old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var documentElement = document.documentElement;
  (function() {
    var pixelPositionVal,
        boxSizingReliableVal,
        pixelMarginRightVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div");
    if (!div.style) {
      return;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
    container.appendChild(div);
    function computeStyleTests() {
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
      div.innerHTML = "";
      documentElement.appendChild(container);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";
      reliableMarginLeftVal = divStyle.marginLeft === "2px";
      boxSizingReliableVal = divStyle.width === "4px";
      div.style.marginRight = "50%";
      pixelMarginRightVal = divStyle.marginRight === "4px";
      documentElement.removeChild(container);
    }
    jQuery.extend(support, {
      pixelPosition: function() {
        computeStyleTests();
        return pixelPositionVal;
      },
      boxSizingReliable: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelMarginRight: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return pixelMarginRightVal;
      },
      reliableMarginLeft: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return reliableMarginLeftVal;
      },
      reliableMarginRight: function() {
        var ret,
            marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";
        documentElement.appendChild(container);
        ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
        documentElement.removeChild(container);
        div.removeChild(marginDiv);
        return ret;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
    computed = computed || getStyles(elem);
    ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
    if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
      ret = jQuery.style(elem, name);
    }
    if (computed) {
      if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {get: function() {
        if (conditionFn()) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }};
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      cssPrefixes = ["Webkit", "O", "Moz", "ms"],
      emptyStyle = document.createElement("div").style;
  function vendorPropName(name) {
    if (name in emptyStyle) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rcssNum.exec(value);
    return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
        val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (document.msFullscreenElement && window.top !== window) {
      if (elem.getClientRects().length) {
        val = Math.round(elem.getBoundingClientRect()[name] * 100);
      }
    }
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
  }
  function showHide(elements, show) {
    var display,
        elem,
        hidden,
        values = [],
        index = 0,
        length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = dataPriv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    cssHooks: {opacity: {get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }}},
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    cssProps: {"float": "cssFloat"},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
          type,
          hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number") {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var matches,
            styles = extra && getStyles(elem),
            subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[name] = value;
          value = jQuery.css(elem, name);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {marginLeft: 0}, function() {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    if (computed) {
      return swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
        var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }};
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {_default: {
      get: function(tween) {
        var result;
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }};
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }};
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
      timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rrun = /queueHooks$/;
  function createFxNow() {
    window.setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {height: type};
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
        collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
        index = 0,
        length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        tween,
        hooks,
        oldfire,
        display,
        checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = dataPriv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = dataPriv.access(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        dataPriv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index,
        name,
        easing,
        value,
        hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = Animation.prefilters.length,
        deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {"*": [function(prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]},
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnotwhite);
      }
      var prop,
          index = 0,
          length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
            data = dataPriv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    window.clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function() {
        window.clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);
      return ret == null ? undefined : ret;
    },
    attrHooks: {type: {set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }}},
    removeAttr: function(elem, value) {
      var name,
          propName,
          i = 0,
          attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    }
  });
  boolHook = {set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }};
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret,
          handle;
      if (!isXML) {
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function(elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType;
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return (elem[name] = value);
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {tabIndex: {get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
        }}},
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      }};
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  var rclass = /[\t\r\n\f]/g;
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if (typeof value === "string" && value) {
        classes = value.match(rnotwhite) || [];
        while ((elem = this[i++])) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = jQuery.trim(cur);
            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      return this.each(function() {
        var className,
            i,
            self,
            classNames;
        if (type === "string") {
          i = 0;
          self = jQuery(this);
          classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            dataPriv.set(this, "__className__", className);
          }
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function(selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";
      while ((elem = this[i++])) {
        if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({val: function(value) {
      var hooks,
          ret,
          isFunction,
          elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }});
  jQuery.extend({valHooks: {
      option: {get: function(elem) {
          return jQuery.trim(elem.value);
        }},
      select: {
        get: function(elem) {
          var value,
              option,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one" || index < 0,
              values = one ? null : [],
              max = one ? index + 1 : options.length,
              i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }});
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      }};
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  jQuery.extend(jQuery.event, {
    trigger: function(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    simulate: function(type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  });
  jQuery.fn.extend({
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }});
  support.focusin = "onfocusin" in window;
  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  var location = window.location;
  var nonce = jQuery.now();
  var rquery = (/\?/);
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  jQuery.parseXML = function(data) {
    var xml;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      xml = (new window.DOMParser()).parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
      rts = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      prefilters = {},
      transports = {},
      allTypes = "*/".concat("*"),
      originAnchor = document.createElement("a");
  originAnchor.href = location.href;
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = (structure === transports);
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
          cacheURL,
          responseHeadersString,
          responseHeaders,
          timeoutTimer,
          urlAnchor,
          fireGlobals,
          i,
          s = jQuery.ajaxSetup({}, options),
          callbackContext = s.context || s,
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          statusCode = s.statusCode || {},
          requestHeaders = {},
          requestHeadersNames = {},
          state = 0,
          strAbort = "canceled",
          jqXHR = {
            readyState: 0,
            getResponseHeader: function(key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },
            setRequestHeader: function(name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            overrideMimeType: function(type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },
            statusCode: function(map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                } else {
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");
        try {
          urlAnchor.href = s.url;
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          s.crossDomain = true;
        }
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (state === 2) {
          return jqXHR;
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
            contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    return !jQuery.expr.filters.visible(elem);
  };
  jQuery.expr.filters.visible = function(elem) {
    return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
  };
  var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, value) {
          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = {
    0: 200,
    1223: 204
  },
      xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback,
        errorCallback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
              xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {binary: xhr.response} : {text: xhr.responseText}, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          errorCallback = xhr.onerror = callback("error");
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                window.setTimeout(function() {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }
          callback = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {"text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }}
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
          callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);
        } else {
          window[callbackName] = overwritten;
        }
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  support.createHTMLDocument = (function() {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  })();
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || (support.createHTMLDocument ? document.implementation.createHTMLDocument("") : document);
    var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).always(callback && function(jqXHR, status) {
        self.each(function() {
          callback.apply(self, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {setOffset: function(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }};
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
          win,
          elem = this[0],
          box = {
            top: 0,
            left: 0
          },
          doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      box = elem.getBoundingClientRect();
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
          offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.extend({
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    size: function() {
      return this.length;
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    define("41", [], function() {
      return jQuery;
    }), define("jquery", ["41"], function(m) {
      return m;
    });
  }
  var _jQuery = window.jQuery,
      _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
}));

})();
(function() {
var define = $__System.amdDefine;
define("42", ["41"], function(main) {
  return main;
});

})();
$__System.register('1', ['40', '42'], function (_export) {
    'use strict';

    var gispl, $;
    return {
        setters: [function (_) {
            gispl = _['default'];
        }, function (_2) {
            $ = _2['default'];
        }],
        execute: function () {

            $(document).ready(function () {
                var scaling = 'scale-enlarge',
                    fingerRotation = 'finger-rotation',
                    stickyMotion = 'any-motion';

                gispl.addGesture({
                    name: scaling,
                    features: [{ type: 'Count', constraints: [2, 2] }, { type: 'Scale', constraints: [] }]
                });

                gispl.addGesture({
                    name: fingerRotation,
                    features: [{ type: 'Rotation' }, { type: 'Count', constraints: [2, 2] }]
                });

                gispl.addGesture({
                    name: stickyMotion,
                    features: [{ type: 'Motion' }, { type: 'Count', constraints: [2, 2] }]
                });

                var images$ = $('img'),
                    imageRotations = new WeakMap(),
                    imageScales = new WeakMap(),
                    relativeOriginalTouchPositions = new WeakMap(),
                    touchPositionInImage = new WeakMap(),
                    currentTranslations = new WeakMap(),
                    zIndex = 1,
                    drawing = false;

                images$.each(function (index, element) {
                    imageScales.set(element, 1);
                    imageRotations.set(element, 0);
                    currentTranslations.set(element, { translateX: 0, translateY: 0 });
                });

                gispl(images$).on(fingerRotation, function fingerRotationCallback(event) {
                    var rotation = event.featureValues.rotation.touches,
                        degrees = rotation / Math.PI * 180;
                    var previousDegrees = imageRotations.get(this);
                    imageRotations.set(this, previousDegrees + degrees);
                    requestDraw();
                });

                gispl(images$).on(scaling, function (event) {
                    var scale = event.featureValues.scale;
                    var previousScale = imageScales.get(this);
                    imageScales.set(this, scale * previousScale);
                    requestDraw();
                });

                gispl(images$).on(stickyMotion, function (event) {
                    var input = event.input;
                    var clientX = 0;
                    var clientY = 0;

                    for (var i = 0; i < input.length; i += 1) {
                        clientX += input[i].clientX;
                        clientY += input[i].clientY;
                    }

                    clientX = Math.floor(clientX / input.length);
                    clientY = Math.floor(clientY / input.length);

                    var originalPosition = relativeOriginalTouchPositions.get(this);

                    var current = currentTranslations.get(this);
                    current.translateX = clientX - originalPosition.clientX;
                    current.translateY = clientY - originalPosition.clientY;
                    requestDraw();
                }).on('inputstart', function (event) {
                    var input = event.input;
                    var clientX = 0;
                    var clientY = 0;

                    for (var i = 0; i < input.length; i += 1) {
                        clientX += input[i].clientX;
                        clientY += input[i].clientY;
                    }

                    clientX = Math.floor(clientX / input.length);
                    clientY = Math.floor(clientY / input.length);

                    // init original position with current values if not set
                    if (!relativeOriginalTouchPositions.has(this)) {
                        relativeOriginalTouchPositions.set(this, { clientX: clientX, clientY: clientY });
                    }
                    // current position with respect to image

                    var _getBoundingClientRect = this.getBoundingClientRect();

                    var left = _getBoundingClientRect.left;
                    var top = _getBoundingClientRect.top;
                    var currentPositionInImage = {
                        imageX: clientX - left,
                        imageY: clientY - top
                    };

                    // init
                    if (!touchPositionInImage.has(this)) {
                        touchPositionInImage.set(this, currentPositionInImage);
                    }
                    // adjust original position if the position within image on next touch
                    // is not the same
                    var previousPositionInImage = touchPositionInImage.get(this);
                    var inImageOffset = {
                        x: currentPositionInImage.imageX - previousPositionInImage.imageX,
                        y: currentPositionInImage.imageY - previousPositionInImage.imageY
                    };

                    var originalPosition = relativeOriginalTouchPositions.get(this);
                    originalPosition.clientX += inImageOffset.x;
                    originalPosition.clientY += inImageOffset.y;
                    touchPositionInImage.set(this, currentPositionInImage);

                    this.style.zIndex = zIndex;
                    zIndex += 1;
                });

                function requestDraw() {
                    if (!drawing) {
                        requestAnimationFrame(draw);
                        drawing = true;
                    }
                }

                function draw() {
                    for (var i = 0; i < images$.length; i += 1) {
                        var element = images$[i];
                        var scale = imageScales.get(element);
                        var degrees = imageRotations.get(element);

                        var _currentTranslations$get = currentTranslations.get(element);

                        var translateX = _currentTranslations$get.translateX;
                        var translateY = _currentTranslations$get.translateY;

                        element.style.transform = 'scale(' + scale + ')\n                                        rotate(' + degrees + 'deg)\n                                        translate(' + translateX + 'px, ' + translateY + 'px)';
                    }
                    drawing = false;
                }

                gispl.initTouch();
            });
        }
    };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=demo.js.map