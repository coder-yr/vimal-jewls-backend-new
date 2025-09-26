(function (React$1, designSystem) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React$1);

  function DashboardComponent() {
    return /*#__PURE__*/React__default.default.createElement("div", null, "DashboardComponent");
  }

  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // utils is a library of generic helper functions non-specific to axios

  const {
    toString
  } = Object.prototype;
  const {
    getPrototypeOf
  } = Object;
  const {
    iterator,
    toStringTag
  } = Symbol;
  const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(Object.create(null));
  const kindOfTest = type => {
    type = type.toLowerCase();
    return thing => kindOf(thing) === type;
  };
  const typeOfTest = type => thing => typeof thing === type;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   *
   * @returns {boolean} True if value is an Array, otherwise false
   */
  const {
    isArray
  } = Array;

  /**
   * Determine if a value is undefined
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  const isUndefined = typeOfTest('undefined');

  /**
   * Determine if a value is a Buffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  const isArrayBuffer = kindOfTest('ArrayBuffer');

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a String, otherwise false
   */
  const isString = typeOfTest('string');

  /**
   * Determine if a value is a Function
   *
   * @param {*} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  const isFunction = typeOfTest('function');

  /**
   * Determine if a value is a Number
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Number, otherwise false
   */
  const isNumber = typeOfTest('number');

  /**
   * Determine if a value is an Object
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an Object, otherwise false
   */
  const isObject = thing => thing !== null && typeof thing === 'object';

  /**
   * Determine if a value is a Boolean
   *
   * @param {*} thing The value to test
   * @returns {boolean} True if value is a Boolean, otherwise false
   */
  const isBoolean = thing => thing === true || thing === false;

  /**
   * Determine if a value is a plain Object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a plain Object, otherwise false
   */
  const isPlainObject = val => {
    if (kindOf(val) !== 'object') {
      return false;
    }
    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(toStringTag in val) && !(iterator in val);
  };

  /**
   * Determine if a value is an empty object (safely handles Buffers)
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is an empty object, otherwise false
   */
  const isEmptyObject = val => {
    // Early return for non-objects or Buffers to prevent RangeError
    if (!isObject(val) || isBuffer(val)) {
      return false;
    }
    try {
      return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
    } catch (e) {
      // Fallback for any other objects that might cause RangeError with Object.keys()
      return false;
    }
  };

  /**
   * Determine if a value is a Date
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Date, otherwise false
   */
  const isDate = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFile = kindOfTest('File');

  /**
   * Determine if a value is a Blob
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  const isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Stream
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  const isStream = val => isObject(val) && isFunction(val.pipe);

  /**
   * Determine if a value is a FormData
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  const isFormData = thing => {
    let kind;
    return thing && (typeof FormData === 'function' && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === 'formdata' ||
    // detect form-data instance
    kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]'));
  };

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  const isURLSearchParams = kindOfTest('URLSearchParams');
  const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   *
   * @returns {String} The String freed of excess whitespace
   */
  const trim = str => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   *
   * @param {Boolean} [allOwnKeys = false]
   * @returns {any}
   */
  function forEach(obj, fn, {
    allOwnKeys = false
  } = {}) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }
    let i;
    let l;

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }
    if (isArray(obj)) {
      // Iterate over array values
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Buffer check
      if (isBuffer(obj)) {
        return;
      }

      // Iterate over object keys
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    if (isBuffer(obj)) {
      return null;
    }
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  const _global = (() => {
    /*eslint no-undef:0*/
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== 'undefined' ? window : global;
  })();
  const isContextDefined = context => !isUndefined(context) && context !== _global;

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   *
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */
  ) {
    const {
      caseless
    } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   *
   * @param {Boolean} [allOwnKeys]
   * @returns {Object} The resulting value of object a
   */
  const extend = (a, b, thisArg, {
    allOwnKeys
  } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, {
      allOwnKeys
    });
    return a;
  };

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   *
   * @returns {string} content value without BOM
   */
  const stripBOM = content => {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  };

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   *
   * @returns {void}
   */
  const inherits = (constructor, superConstructor, props, descriptors) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, 'super', {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function|Boolean} [filter]
   * @param {Function} [propFilter]
   *
   * @returns {Object}
   */
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };

  /**
   * Determines whether a string ends with the characters of a specified string
   *
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   *
   * @returns {boolean}
   */
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };

  /**
   * Returns new array from array like object or null if failed
   *
   * @param {*} [thing]
   *
   * @returns {?Array}
   */
  const toArray = thing => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };

  /**
   * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
   * thing passed in is an instance of Uint8Array
   *
   * @param {TypedArray}
   *
   * @returns {Array}
   */
  // eslint-disable-next-line func-names
  const isTypedArray = (TypedArray => {
    // eslint-disable-next-line func-names
    return thing => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

  /**
   * For each entry in the object, call the function with the key and value.
   *
   * @param {Object<any, any>} obj - The object to iterate over.
   * @param {Function} fn - The function to call for each entry.
   *
   * @returns {void}
   */
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[iterator];
    const _iterator = generator.call(obj);
    let result;
    while ((result = _iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };

  /**
   * It takes a regular expression and a string, and returns an array of all the matches
   *
   * @param {string} regExp - The regular expression to match against.
   * @param {string} str - The string to search.
   *
   * @returns {Array<boolean>}
   */
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };

  /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
  const isHTMLForm = kindOfTest('HTMLFormElement');
  const toCamelCase = str => {
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    });
  };

  /* Creating a function that will check if an object has a property. */
  const hasOwnProperty = (({
    hasOwnProperty
  }) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

  /**
   * Determine if a value is a RegExp object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a RegExp object, otherwise false
   */
  const isRegExp = kindOfTest('RegExp');
  const reduceDescriptors = (obj, reducer) => {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };

  /**
   * Makes all methods read-only
   * @param {Object} obj
   */

  const freezeMethods = obj => {
    reduceDescriptors(obj, (descriptor, name) => {
      // skip restricted props in strict mode
      if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value)) return;
      descriptor.enumerable = false;
      if ('writable' in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error('Can not rewrite read-only method \'' + name + '\'');
        };
      }
    });
  };
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = arr => {
      arr.forEach(value => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  const noop = () => {};
  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };

  /**
   * If the thing is a FormData object, return true, otherwise return false.
   *
   * @param {unknown} thing - The thing to check.
   *
   * @returns {boolean}
   */
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[toStringTag] === 'FormData' && thing[iterator]);
  }
  const toJSONObject = obj => {
    const stack = new Array(10);
    const visit = (source, i) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }

        //Buffer check
        if (isBuffer(source)) {
          return source;
        }
        if (!('toJSON' in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = undefined;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  const isAsyncFn = kindOfTest('AsyncFunction');
  const isThenable = thing => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

  // original code
  // https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

  const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate;
    }
    return postMessageSupported ? ((token, callbacks) => {
      _global.addEventListener("message", ({
        source,
        data
      }) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      }, false);
      return cb => {
        callbacks.push(cb);
        _global.postMessage(token, "*");
      };
    })(`axios@${Math.random()}`, []) : cb => setTimeout(cb);
  })(typeof setImmediate === 'function', isFunction(_global.postMessage));
  const asap = typeof queueMicrotask !== 'undefined' ? queueMicrotask.bind(_global) : typeof process !== 'undefined' && process.nextTick || _setImmediate;

  // *********************

  const isIterable = thing => thing != null && isFunction(thing[iterator]);
  var utils$1 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isEmptyObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap,
    isIterable
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  function AxiosError$1(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status ? response.status : null;
    }
  }
  utils$1.inherits(AxiosError$1, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$1.toJSONObject(this.config),
        code: this.code,
        status: this.status
      };
    }
  });
  const prototype$1 = AxiosError$1.prototype;
  const descriptors = {};
  ['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED', 'ERR_NOT_SUPPORT', 'ERR_INVALID_URL'
  // eslint-disable-next-line func-names
  ].forEach(code => {
    descriptors[code] = {
      value: code
    };
  });
  Object.defineProperties(AxiosError$1, descriptors);
  Object.defineProperty(prototype$1, 'isAxiosError', {
    value: true
  });

  // eslint-disable-next-line func-names
  AxiosError$1.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);
    utils$1.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, prop => {
      return prop !== 'isAxiosError';
    });
    AxiosError$1.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };

  // eslint-disable-next-line strict
  var httpAdapter = null;

  /**
   * Determines if the given thing is a array or js object.
   *
   * @param {string} thing - The object or array to be visited.
   *
   * @returns {boolean}
   */
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
  }

  /**
   * It removes the brackets from the end of a string
   *
   * @param {string} key - The key of the parameter.
   *
   * @returns {string} the key without the brackets.
   */
  function removeBrackets(key) {
    return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
  }

  /**
   * It takes a path, a key, and a boolean, and returns a string
   *
   * @param {string} path - The path to the current key.
   * @param {string} key - The key of the current object being iterated over.
   * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
   *
   * @returns {string} The path to the current key.
   */
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      // eslint-disable-next-line no-param-reassign
      token = removeBrackets(token);
      return !dots && i ? '[' + token + ']' : token;
    }).join(dots ? '.' : '');
  }

  /**
   * If the array is an array and none of its elements are visitable, then it's a flat array.
   *
   * @param {Array<any>} arr - The array to check
   *
   * @returns {boolean}
   */
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable);
  }
  const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });

  /**
   * Convert a data object to FormData
   *
   * @param {Object} obj
   * @param {?Object} [formData]
   * @param {?Object} [options]
   * @param {Function} [options.visitor]
   * @param {Boolean} [options.metaTokens = true]
   * @param {Boolean} [options.dots = false]
   * @param {?Boolean} [options.indexes = false]
   *
   * @returns {Object}
   **/

  /**
   * It converts an object into a FormData object
   *
   * @param {Object<any, any>} obj - The object to convert to form data.
   * @param {string} formData - The FormData object to append to.
   * @param {Object<string, any>} options
   *
   * @returns
   */
  function toFormData$1(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError('target must be an object');
    }

    // eslint-disable-next-line no-param-reassign
    formData = formData || new (FormData)();

    // eslint-disable-next-line no-param-reassign
    options = utils$1.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      return !utils$1.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    // eslint-disable-next-line no-use-before-define
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
    const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
    if (!utils$1.isFunction(visitor)) {
      throw new TypeError('visitor must be a function');
    }
    function convertValue(value) {
      if (value === null) return '';
      if (utils$1.isDate(value)) {
        return value.toISOString();
      }
      if (utils$1.isBoolean(value)) {
        return value.toString();
      }
      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError$1('Blob is not supported. Use a Buffer instead.');
      }
      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }

    /**
     * Default visitor.
     *
     * @param {*} value
     * @param {String|Number} key
     * @param {Array<String|Number>} path
     * @this {FormData}
     *
     * @returns {boolean} return true to visit the each prop of the value recursively
     */
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === 'object') {
        if (utils$1.endsWith(key, '{}')) {
          // eslint-disable-next-line no-param-reassign
          key = metaTokens ? key : key.slice(0, -2);
          // eslint-disable-next-line no-param-reassign
          value = JSON.stringify(value);
        } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))) {
          // eslint-disable-next-line no-param-reassign
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + '[]', convertValue(el));
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils$1.isUndefined(value)) return;
      if (stack.indexOf(value) !== -1) {
        throw Error('Circular reference detected in ' + path.join('.'));
      }
      stack.push(value);
      utils$1.forEach(value, function each(el, key) {
        const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils$1.isObject(obj)) {
      throw new TypeError('data must be an object');
    }
    build(obj);
    return formData;
  }

  /**
   * It encodes a string by replacing all characters that are not in the unreserved set with
   * their percent-encoded equivalents
   *
   * @param {string} str - The string to encode.
   *
   * @returns {string} The encoded string.
   */
  function encode$1(str) {
    const charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }

  /**
   * It takes a params object and converts it to a FormData object
   *
   * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
   * @param {Object<string, any>} options - The options object passed to the Axios constructor.
   *
   * @returns {void}
   */
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData$1(params, this, options);
  }
  const prototype = AxiosURLSearchParams.prototype;
  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype.toString = function toString(encoder) {
    const _encode = encoder ? function (value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '').join('&');
  };

  /**
   * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
   * URI encoded counterparts
   *
   * @param {string} val The value to be encoded.
   *
   * @returns {string} The encoded value.
   */
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @param {?(object|Function)} options
   *
   * @returns {string} The formatted url
   */
  function buildURL(url, params, options) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode;
    if (utils$1.isFunction(options)) {
      options = {
        serialize: options
      };
    }
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
  }

  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }

    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$1.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }

  var transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

  var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

  var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

  var platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
  };

  const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';
  const _navigator = typeof navigator === 'object' && navigator || undefined;

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   *
   * @returns {boolean}
   */
  const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

  /**
   * Determine if we're running in a standard browser webWorker environment
   *
   * Although the `isStandardBrowserEnv` method indicates that
   * `allows axios to run in a web worker`, the WebWorker will still be
   * filtered out due to its judgment standard
   * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
   * This leads to a problem when axios post `FormData` in webWorker
   */
  const hasStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
  })();
  const origin = hasBrowserEnv && window.location.href || 'http://localhost';

  var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hasBrowserEnv: hasBrowserEnv,
    hasStandardBrowserEnv: hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
    navigator: _navigator,
    origin: origin
  });

  var platform = {
    ...utils,
    ...platform$1
  };

  function toURLEncodedForm(data, options) {
    return toFormData$1(data, new platform.classes.URLSearchParams(), {
      visitor: function (value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString('base64'));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      },
      ...options
    });
  }

  /**
   * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
   *
   * @param {string} name - The name of the property to get.
   *
   * @returns An array of strings.
   */
  function parsePropPath(name) {
    // foo[x][y][z]
    // foo.x.y.z
    // foo-x-y-z
    // foo x y z
    return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
      return match[0] === '[]' ? '' : match[1] || match[0];
    });
  }

  /**
   * Convert an array to an object.
   *
   * @param {Array<any>} arr - The array to convert to an object.
   *
   * @returns An object with the same keys and values as the array.
   */
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }

  /**
   * It takes a FormData object and returns a JavaScript object
   *
   * @param {string} formData The FormData object to convert to JSON.
   *
   * @returns {Object<string, any> | null} The converted object.
   */
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      if (name === '__proto__') return true;
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils$1.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils$1.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils$1.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils$1.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      const obj = {};
      utils$1.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }

  /**
   * It takes a string, tries to parse it, and if it fails, it returns the stringified version
   * of the input
   *
   * @param {any} rawValue - The value to be stringified.
   * @param {Function} parser - A function that parses a string into a JavaScript object.
   * @param {Function} encoder - A function that takes a value and returns a string.
   *
   * @returns {string} A stringified version of the rawValue.
   */
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$1.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ['xhr', 'http', 'fetch'],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || '';
      const hasJSONContentType = contentType.indexOf('application/json') > -1;
      const isObjectPayload = utils$1.isObject(data);
      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData = utils$1.isFormData(data);
      if (isFormData) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
        return data.toString();
      }
      let isFileList;
      if (isObjectPayload) {
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData$1(isFileList ? {
            'files[]': data
          } : data, _FormData && new _FormData(), this.formSerializer);
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType('application/json', false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === 'json';
      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === 'SyntaxError') {
              throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': undefined
      }
    }
  };
  utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], method => {
    defaults.headers[method] = {};
  });

  // RawAxiosHeaders whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  const ignoreDuplicateOf = utils$1.toObjectSet(['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']);

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} rawHeaders Headers needing to be parsed
   *
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = rawHeaders => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
      i = line.indexOf(':');
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === 'set-cookie') {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });
    return parsed;
  };

  const $internals = Symbol('internals');
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  const isValidHeaderName = str => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$1.isFunction(filter)) {
      return filter.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils$1.isString(value)) return;
    if (utils$1.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }
    if (utils$1.isRegExp(filter)) {
      return filter.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils$1.toCamelCase(' ' + header);
    ['get', 'set', 'has'].forEach(methodName => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function (arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  let AxiosHeaders$1 = class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error('header name must be a non-empty string');
        }
        const key = utils$1.findKey(self, lHeader);
        if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) {
          self[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
        let obj = {},
          dest,
          key;
        for (const entry of header) {
          if (!utils$1.isArray(entry)) {
            throw TypeError('Object iterator must return a key-value pair');
          }
          obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
        }
        setHeaders(obj, valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils$1.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils$1.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils$1.findKey(self, _header);
          if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
            delete self[key];
            deleted = true;
          }
        }
      }
      if (utils$1.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self = this;
      const headers = {};
      utils$1.forEach(this, (value, header) => {
        const key = utils$1.findKey(headers, header);
        if (key) {
          self[key] = normalizeValue(value);
          delete self[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self[header];
        }
        self[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = Object.create(null);
      utils$1.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
    }
    getSetCookie() {
      return this.get("set-cookie") || [];
    }
    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach(target => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype, _header);
          accessors[lHeader] = true;
        }
      }
      utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  };
  AxiosHeaders$1.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

  // reserved names hotfix
  utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({
    value
  }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils$1.freezeMethods(AxiosHeaders$1);

  /**
   * Transform the data for a request or a response
   *
   * @param {Array|Function} fns A single function or Array of functions
   * @param {?Object} response The response object
   *
   * @returns {*} The resulting transformed data
   */
  function transformData(fns, response) {
    const config = this || defaults;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;
    utils$1.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });
    headers.normalize();
    return data;
  }

  function isCancel$1(value) {
    return !!(value && value.__CANCEL__);
  }

  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  function CanceledError$1(message, config, request) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError$1.call(this, message == null ? 'canceled' : message, AxiosError$1.ERR_CANCELED, config, request);
    this.name = 'CanceledError';
  }
  utils$1.inherits(CanceledError$1, AxiosError$1, {
    __CANCEL__: true
  });

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   *
   * @returns {object} The response.
   */
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError$1('Request failed with status code ' + response.status, [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
    }
  }

  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
  }

  /**
   * Calculate data maxRate
   * @param {Number} [samplesCount= 10]
   * @param {Number} [min= 1000]
   * @returns {Function}
   */
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== undefined ? min : 1000;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
  }

  /**
   * Throttle decorator
   * @param {Function} fn
   * @param {Number} freq
   * @return {Function}
   */
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1000 / freq;
    let lastArgs;
    let timer;
    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn(...args);
    };
    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if (passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };
    const flush = () => lastArgs && invoke(lastArgs);
    return [throttled, flush];
  }

  const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);
    return throttle(e => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : undefined;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : undefined,
        bytes: progressBytes,
        rate: rate ? rate : undefined,
        estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? 'download' : 'upload']: true
      };
      listener(data);
    }, freq);
  };
  const progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null;
    return [loaded => throttled[0]({
      lengthComputable,
      total,
      loaded
    }), throttled[1]];
  };
  const asyncDecorator = fn => (...args) => utils$1.asap(() => fn(...args));

  var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => url => {
    url = new URL(url, platform.origin);
    return origin.protocol === url.protocol && origin.host === url.host && (isMSIE || origin.port === url.port);
  })(new URL(platform.origin), platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)) : () => true;

  var cookies = platform.hasStandardBrowserEnv ?
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push('path=' + path);
      utils$1.isString(domain) && cookie.push('domain=' + domain);
      secure === true && cookie.push('secure');
      document.cookie = cookie.join('; ');
    },
    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  } :
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   *
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   *
   * @returns {string} The combined URL
   */
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  }

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   *
   * @returns {string} The combined full path
   */
  function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
    let isRelativeUrl = !isAbsoluteURL(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  const headersToObject = thing => thing instanceof AxiosHeaders$1 ? {
    ...thing
  } : thing;

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   *
   * @returns {Object} New object resulting from merging config2 to config1
   */
  function mergeConfig$1(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, prop, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({
          caseless
        }, target, source);
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source);
      } else if (utils$1.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(a, b, prop, caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, prop, caseless);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a, prop, caseless);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(undefined, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
    };
    utils$1.forEach(Object.keys({
      ...config1,
      ...config2
    }), function computeConfigValue(prop) {
      const merge = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge(config1[prop], config2[prop], prop);
      utils$1.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }

  var resolveConfig = config => {
    const newConfig = mergeConfig$1({}, config);
    let {
      data,
      withXSRFToken,
      xsrfHeaderName,
      xsrfCookieName,
      headers,
      auth
    } = newConfig;
    newConfig.headers = headers = AxiosHeaders$1.from(headers);
    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

    // HTTP basic authentication
    if (auth) {
      headers.set('Authorization', 'Basic ' + btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : '')));
    }
    let contentType;
    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(undefined); // Let the browser set it
      } else if ((contentType = headers.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.

    if (platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
        // Add xsrf header
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  };

  const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';
  var xhrAdapter = isXHRAdapterSupported && function (config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
      let {
        responseType,
        onUploadProgress,
        onDownloadProgress
      } = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload;
      function done() {
        flushUpload && flushUpload(); // flush events
        flushDownload && flushDownload(); // flush events

        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
        _config.signal && _config.signal.removeEventListener('abort', onCanceled);
      }
      let request = new XMLHttpRequest();
      request.open(_config.method.toUpperCase(), _config.url, true);

      // Set the request timeout in MS
      request.timeout = _config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        // Prepare the response
        const responseHeaders = AxiosHeaders$1.from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
        const responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);

        // Clean up request
        request = null;
      }
      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }

          // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          }
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
        const transitional = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError$1(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED, config, request));

        // Clean up request
        request = null;
      };

      // Remove Content-Type if data is undefined
      requestData === undefined && requestHeaders.setContentType(null);

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }

      // Add withCredentials to request if needed
      if (!utils$1.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }

      // Add responseType to request if needed
      if (responseType && responseType !== 'json') {
        request.responseType = _config.responseType;
      }

      // Handle progress if needed
      if (onDownloadProgress) {
        [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
        request.addEventListener('progress', downloadThrottled);
      }

      // Not all browsers support upload events
      if (onUploadProgress && request.upload) {
        [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
        request.upload.addEventListener('progress', uploadThrottled);
        request.upload.addEventListener('loadend', flushUpload);
      }
      if (_config.cancelToken || _config.signal) {
        // Handle cancellation
        // eslint-disable-next-line func-names
        onCanceled = cancel => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
        }
      }
      const protocol = parseProtocol(_config.url);
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError$1('Unsupported protocol ' + protocol + ':', AxiosError$1.ERR_BAD_REQUEST, config));
        return;
      }

      // Send the request
      request.send(requestData || null);
    });
  };

  const composeSignals = (signals, timeout) => {
    const {
      length
    } = signals = signals ? signals.filter(Boolean) : [];
    if (timeout || length) {
      let controller = new AbortController();
      let aborted;
      const onabort = function (reason) {
        if (!aborted) {
          aborted = true;
          unsubscribe();
          const err = reason instanceof Error ? reason : this.reason;
          controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
        }
      };
      let timer = timeout && setTimeout(() => {
        timer = null;
        onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
      }, timeout);
      const unsubscribe = () => {
        if (signals) {
          timer && clearTimeout(timer);
          timer = null;
          signals.forEach(signal => {
            signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
          });
          signals = null;
        }
      };
      signals.forEach(signal => signal.addEventListener('abort', onabort));
      const {
        signal
      } = controller;
      signal.unsubscribe = () => utils$1.asap(unsubscribe);
      return signal;
    }
  };

  const streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;
    if (len < chunkSize) {
      yield chunk;
      return;
    }
    let pos = 0;
    let end;
    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };
  const readBytes = async function* (iterable, chunkSize) {
    for await (const chunk of readStream(iterable)) {
      yield* streamChunk(chunk, chunkSize);
    }
  };
  const readStream = async function* (stream) {
    if (stream[Symbol.asyncIterator]) {
      yield* stream;
      return;
    }
    const reader = stream.getReader();
    try {
      for (;;) {
        const {
          done,
          value
        } = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      await reader.cancel();
    }
  };
  const trackStream = (stream, chunkSize, onProgress, onFinish) => {
    const iterator = readBytes(stream, chunkSize);
    let bytes = 0;
    let done;
    let _onFinish = e => {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };
    return new ReadableStream({
      async pull(controller) {
        try {
          const {
            done,
            value
          } = await iterator.next();
          if (done) {
            _onFinish();
            controller.close();
            return;
          }
          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator.return();
      }
    }, {
      highWaterMark: 2
    });
  };

  const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
  const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

  // used only inside the fetch adapter
  const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ? (encoder => str => encoder.encode(str))(new TextEncoder()) : async str => new Uint8Array(await new Response(str).arrayBuffer()));
  const test = (fn, ...args) => {
    try {
      return !!fn(...args);
    } catch (e) {
      return false;
    }
  };
  const supportsRequestStream = isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      }
    }).headers.has('Content-Type');
    return duplexAccessed && !hasContentType;
  });
  const DEFAULT_CHUNK_SIZE = 64 * 1024;
  const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response('').body));
  const resolvers = {
    stream: supportsResponseStream && (res => res.body)
  };
  isFetchSupported && (res => {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
      !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? res => res[type]() : (_, config) => {
        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
    });
  })(new Response());
  const getBodyLength = async body => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: 'POST',
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + '';
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  var fetchAdapter = isFetchSupported && (async config => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = 'same-origin',
      fetchOptions
    } = resolveConfig(config);
    responseType = responseType ? (responseType + '').toLowerCase() : 'text';
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: 'POST',
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress)));
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? 'include' : 'omit';
      }

      // Cloudflare Workers throws when credentials are defined
      // see https://github.com/cloudflare/workerd/issues/902
      const isCredentialsSupported = "credentials" in Request.prototype;
      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : undefined
      });
      let response = await fetch(request, fetchOptions);
      const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ['status', 'statusText', 'headers'].forEach(prop => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
        response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }), options);
      }
      responseType = responseType || 'text';
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request), {
          cause: err.cause || err
        });
      }
      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  });

  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter
  };
  utils$1.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, 'name', {
          value
        });
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
      Object.defineProperty(fn, 'adapterName', {
        value
      });
    }
  });
  const renderReason = reason => `- ${reason}`;
  const isResolvedHandle = adapter => utils$1.isFunction(adapter) || adapter === null || adapter === false;
  var adapters = {
    getAdapter: adapters => {
      adapters = utils$1.isArray(adapters) ? adapters : [adapters];
      const {
        length
      } = adapters;
      let nameOrAdapter;
      let adapter;
      const rejectedReasons = {};
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
          if (adapter === undefined) {
            throw new AxiosError$1(`Unknown adapter '${id}'`);
          }
        }
        if (adapter) {
          break;
        }
        rejectedReasons[id || '#' + i] = adapter;
      }
      if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? 'is not supported by the environment' : 'is not available in the build'));
        let s = length ? reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0]) : 'as no adapter specified';
        throw new AxiosError$1(`There is no suitable adapter to dispatch the request ` + s, 'ERR_NOT_SUPPORT');
      }
      return adapter;
    },
    adapters: knownAdapters
  };

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   *
   * @param {Object} config The config that is to be used for the request
   *
   * @returns {void}
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError$1(null, config);
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders$1.from(config.headers);

    // Transform request data
    config.data = transformData.call(config, config.transformRequest);
    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false);
    }
    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData.call(config, config.transformResponse, response);
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel$1(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData.call(config, config.transformResponse, reason.response);
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }

  const VERSION$1 = "1.11.0";

  const validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators$1[type] = function validator(thing) {
      return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });
  const deprecatedWarnings = {};

  /**
   * Transitional option validator
   *
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   *
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return '[Axios v' + VERSION$1 + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }

    // eslint-disable-next-line func-names
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError$1(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError$1.ERR_DEPRECATED);
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
      }
      return validator ? validator(value, opt, opts) : true;
    };
  };
  validators$1.spelling = function spelling(correctSpelling) {
    return (value, opt) => {
      // eslint-disable-next-line no-console
      console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
      return true;
    };
  };

  /**
   * Assert object's properties type
   *
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   *
   * @returns {object}
   */

  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError$1('option ' + opt + ' must be ' + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION);
      }
    }
  }
  var validator = {
    assertOptions,
    validators: validators$1
  };

  const validators = validator.validators;

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   *
   * @return {Axios} A new instance of Axios
   */
  let Axios$1 = class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig || {};
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }

    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy = {};
          Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();

          // slice off the Error: ... line
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
          try {
            if (!err.stack) {
              err.stack = stack;
              // match without the 2 top stack lines
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
              err.stack += '\n' + stack;
            }
          } catch (e) {
            // ignore the case where "stack" is an un-writable property
          }
        }
        throw err;
      }
    }
    _request(configOrUrl, config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof configOrUrl === 'string') {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig$1(this.defaults, config);
      const {
        transitional,
        paramsSerializer,
        headers
      } = config;
      if (transitional !== undefined) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils$1.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }

      // Set config.allowAbsoluteUrls
      if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
        config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
      } else {
        config.allowAbsoluteUrls = true;
      }
      validator.assertOptions(config, {
        baseUrl: validators.spelling('baseURL'),
        withXsrfToken: validators.spelling('withXSRFToken')
      }, true);

      // Set config.method
      config.method = (config.method || this.defaults.method || 'get').toLowerCase();

      // Flatten headers
      let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);
      headers && utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], method => {
        delete headers[method];
      });
      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

      // filter out skipped interceptors
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), undefined];
        chain.unshift(...requestInterceptorChain);
        chain.push(...responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig$1(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };

  // Provide aliases for supported request methods
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios$1.prototype[method] = function (url, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/

    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig$1(config || {}, {
          method,
          headers: isForm ? {
            'Content-Type': 'multipart/form-data'
          } : {},
          url,
          data
        }));
      };
    }
    Axios$1.prototype[method] = generateHTTPMethod();
    Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
  });

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @param {Function} executor The executor function.
   *
   * @returns {CancelToken}
   */
  let CancelToken$1 = class CancelToken {
    constructor(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;

      // eslint-disable-next-line func-names
      this.promise.then(cancel => {
        if (!token._listeners) return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = onfulfilled => {
        let _resolve;
        // eslint-disable-next-line func-names
        const promise = new Promise(resolve => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }
        token.reason = new CanceledError$1(message, config, request);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }

    /**
     * Subscribe to the cancel signal
     */

    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }

    /**
     * Unsubscribe from the cancel signal
     */

    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    toAbortSignal() {
      const controller = new AbortController();
      const abort = err => {
        controller.abort(err);
      };
      this.subscribe(abort);
      controller.signal.unsubscribe = () => this.unsubscribe(abort);
      return controller.signal;
    }

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  };

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   *
   * @returns {Function}
   */
  function spread$1(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   *
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  function isAxiosError$1(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true;
  }

  const HttpStatusCode$1 = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
    HttpStatusCode$1[value] = key;
  });

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   *
   * @returns {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind(Axios$1.prototype.request, context);

    // Copy axios.prototype to instance
    utils$1.extend(instance, Axios$1.prototype, context, {
      allOwnKeys: true
    });

    // Copy context to instance
    utils$1.extend(instance, context, null, {
      allOwnKeys: true
    });

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
    };
    return instance;
  }

  // Create the default instance to be exported
  const axios = createInstance(defaults);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios$1;

  // Expose Cancel & CancelToken
  axios.CanceledError = CanceledError$1;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel$1;
  axios.VERSION = VERSION$1;
  axios.toFormData = toFormData$1;

  // Expose AxiosError class
  axios.AxiosError = AxiosError$1;

  // alias for CanceledError for backward compatibility
  axios.Cancel = axios.CanceledError;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread$1;

  // Expose isAxiosError
  axios.isAxiosError = isAxiosError$1;

  // Expose mergeConfig
  axios.mergeConfig = mergeConfig$1;
  axios.AxiosHeaders = AxiosHeaders$1;
  axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.getAdapter = adapters.getAdapter;
  axios.HttpStatusCode = HttpStatusCode$1;
  axios.default = axios;

  // This module is intended to unwrap Axios default export as named.
  // Keep top-level export same with static properties
  // so that it can keep same with es module or cjs
  const {
    Axios,
    AxiosError,
    CanceledError,
    isCancel,
    CancelToken,
    VERSION,
    all,
    Cancel,
    isAxiosError,
    spread,
    toFormData,
    AxiosHeaders,
    HttpStatusCode,
    formToJSON,
    getAdapter,
    mergeConfig
  } = axios;

  const serverUrlApi = "http://localhost:7502/api/";
  const serverUrlImage = "http://localhost:7502/images/";

  const UploadSingleImage = props => {
    const {
      property
    } = props;
    const fileUpload = async file => {
      if (file.length === 1) {
        const url = `${serverUrlApi}upload/image`;
        const formData = new FormData();
        formData.append("file", file[0]);
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };
        axios.post(url, formData, config).then(response => {
          if (response.status === 200) {
            console.log(response.data["filename"]);
            props.record.params[property.name] = `${serverUrlImage}${response.data["filename"]}`;
          }
        }).catch(error => {});
      }
    };
    return /*#__PURE__*/React.createElement(designSystem.Box, null, /*#__PURE__*/React.createElement(designSystem.DropZone, {
      onChange: fileUpload,
      validate: {
        maxSize: 5024000,
        mimeTypes: ["image/png", "image/jpg", "image/jpeg"]
      }
    }));
  };

  const ViewSingleImage = props => {
    const {
      record
    } = props;
    const imageUrl = record.params.image;
    // TODO on click pr bada view dikega
    return imageUrl ? /*#__PURE__*/React.createElement("img", {
      src: imageUrl,
      alt: "image",
      style: {
        width: "40px",
        height: "40px",
        borderRadius: "10%"
      }
    }) : /*#__PURE__*/React.createElement("span", null, "No Image");
  };

  const CreateStringList = props => {
    const {
      record,
      property
    } = props;
    const [items, setItems] = React$1.useState([]);
    const inputValue = React$1.useRef(null);
    const addItem = () => {
      if (!inputValue.current.value.trim()) return;
      const updated = [...items, inputValue.current.value.trim()];
      inputValue.current.value = "";
      setItems(updated);
      props.record.params[property.name] = updated;
    };
    const removeItem = index => {
      const updated = items.filter((_, i) => i !== index);
      setItems(updated);
      props.record.params[property.name] = updated;
    };

    // Load existing data
    React$1.useEffect(() => {
      // TODO fix thsi
      console.log("loading called");
      const value = record.params[property.name] || [];
      setItems(Array.isArray(value) ? value : []);
    }, [record.params, property.name]);
    return /*#__PURE__*/React.createElement(designSystem.Box, null, /*#__PURE__*/React.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React.createElement(designSystem.Box, {
      flex: true,
      alignItems: "center",
      gap: "default"
    }, /*#__PURE__*/React.createElement(designSystem.Input, {
      ref: inputValue,
      placeholder: "Enter text"
    }), /*#__PURE__*/React.createElement(designSystem.Button, {
      marginLeft: "xl",
      type: "button",
      variant: "primary",
      onClick: addItem
    }, "Add")), /*#__PURE__*/React.createElement(designSystem.Box, {
      mt: "lg"
    }, items.map((item, i) => /*#__PURE__*/React.createElement(designSystem.Box, {
      key: i,
      flex: true,
      alignItems: "center",
      mt: "sm"
    }, /*#__PURE__*/React.createElement("span", null, item), /*#__PURE__*/React.createElement(designSystem.Button, {
      marginLeft: "xl",
      variant: "danger",
      size: "sm",
      onClick: () => removeItem(i)
    }, "Remove")))));
  };

  const StringListView = props => {
    const {
      record,
      property
    } = props;
    const items = [];
    let index = 0;
    while (true) {
      var value = record.params[`texts.${index}`];
      if (value) {
        index++;
        items.push(value);
      } else {
        break;
      }
    }
    console.log(items);
    if (!Array.isArray(items) || items.length === 0) {
      return /*#__PURE__*/React.createElement("span", null, String(property.name));
    }
    return /*#__PURE__*/React.createElement("span", null, items.join(", "));
  };

  const DescriptionRichText = props => {
    const {
      record,
      property
    } = props;
    const [value, setValue] = React$1.useState("");
    const saveDescription = () => {
      if (!value) return;
      console.log(value);
      props.record.params[property.name] = value;
    };

    // Load existing data
    React$1.useEffect(() => {
      const value = record.params[property.name] || "";
      setValue(value);
    }, [record.params, property.name]);
    return /*#__PURE__*/React.createElement(designSystem.Box, null, /*#__PURE__*/React.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React.createElement(designSystem.Box, {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "default",
      marginBottom: "xl"
    }, /*#__PURE__*/React.createElement(designSystem.RichTextEditor, {
      value: value,
      onChange: contentt => setValue(contentt)
    }), /*#__PURE__*/React.createElement(designSystem.Button, {
      marginLeft: "xl",
      type: "button",
      variant: "primary",
      onClick: saveDescription
    }, "Save")));
  };

  const KeyValueList = props => {
    const {
      record,
      property
    } = props;
    const [entries, setEntries] = React$1.useState([]);
    const keyRef = React$1.useRef(null);
    const valueRef = React$1.useRef(null);
    const addItem = () => {
      if (!keyRef.current.value.trim()) return;
      if (!valueRef.current.value.trim()) return;
      const updated = [...entries, {
        key: `${keyRef.current.value.trim()}`,
        value: `${valueRef.current.value.trim()}`
      }];
      keyRef.current.value = "";
      valueRef.current.value = "";
      setEntries(updated);
      props.record.params[property.name] = updated;
    };
    const removeEntry = index => {
      const updated = entries.filter((_, i) => i !== index);
      setEntries(updated);
      props.record.params[property.name] = updated;
    };

    // Load existing data
    React$1.useEffect(() => {
      // TODO fix this
      console.log("loading called");
      const value = record.params[property.name] || [];
      setEntries(Array.isArray(value) ? value : []);
    }, [record.params, property.name]);
    return /*#__PURE__*/React.createElement(designSystem.Box, null, /*#__PURE__*/React.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React.createElement(designSystem.Box, {
      flex: true,
      alignItems: "center",
      gap: "default"
    }, /*#__PURE__*/React.createElement(designSystem.Input, {
      ref: keyRef,
      placeholder: "Enter Key"
    }), /*#__PURE__*/React.createElement(designSystem.Input, {
      ref: valueRef,
      placeholder: "Enter Value"
    }), /*#__PURE__*/React.createElement(designSystem.Button, {
      marginLeft: "xl",
      type: "button",
      variant: "primary",
      onClick: addItem
    }, "Add")), /*#__PURE__*/React.createElement(designSystem.Box, {
      mt: "lg",
      marginBottom: "xl"
    }, entries.map((item, index) => /*#__PURE__*/React.createElement(designSystem.Box, {
      key: index,
      flex: true,
      justifyContent: "space-between",
      alignItems: "center",
      mt: "sm"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, item.key), ": ", item.value), /*#__PURE__*/React.createElement(designSystem.Button, {
      size: "sm",
      variant: "danger",
      onClick: () => removeEntry(index)
    }, "Remove")))));
  };

  const UploadMultipleImage = props => {
    const {
      property
    } = props;
    const fileUpload = async files => {
      if (files.length > 0) {
        var images = [];
        for (var f1 in files) {
          var file = files[f1];
          const url = `${serverUrlApi}upload/image`;
          const formData = new FormData();
          formData.append("file", file);
          const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
          };
          axios.post(url, formData, config).then(response => {
            if (response.status === 200) {
              images.push(`${serverUrlImage}${response.data["filename"]}`);
            }
          }).catch(error => {});
        }
        props.record.params[property.name] = images;
      }
    };
    return /*#__PURE__*/React.createElement(designSystem.Box, null, /*#__PURE__*/React.createElement(designSystem.DropZone, {
      multiple: true,
      onChange: fileUpload,
      validate: {
        maxSize: 5024000,
        mimeTypes: ["image/png", "image/jpg", "image/jpeg"]
      }
    }));
  };

  const SizeColorStock = props => {
    const {
      record,
      property
    } = props;
    const [entries, setEntries] = React$1.useState([]);
    const sizeRef = React$1.useRef(null);
    const colorRef = React$1.useRef(null);
    const colorNameRef = React$1.useRef(null);
    const stockRef = React$1.useRef(null);
    const addItem = () => {
      if (!sizeRef.current.value.trim()) return;
      if (!colorRef.current.value.trim()) return;
      if (!colorNameRef.current.value.trim()) return;
      if (!stockRef.current.value.trim()) return;
      const updated = [...entries, {
        size: `${sizeRef.current.value.trim()}`,
        color: `${colorRef.current.value.trim()}`,
        colorName: `${colorNameRef.current.value.trim()}`,
        stock: `${stockRef.current.value.trim()}`
      }];
      sizeRef.current.value = "";
      colorRef.current.value = "";
      colorNameRef.current.value = "";
      stockRef.current.value = "";
      setEntries(updated);
      props.record.params[property.name] = updated;
    };
    const removeEntry = index => {
      const updated = entries.filter((_, i) => i !== index);
      setEntries(updated);
      props.record.params[property.name] = updated;
    };

    // Load existing data
    React$1.useEffect(() => {
      // TODO fix this
      console.log("loading called");
      const value = record.params[property.name] || [];
      setEntries(Array.isArray(value) ? value : []);
    }, [record.params, property.name]);
    return /*#__PURE__*/React.createElement(designSystem.Box, null, /*#__PURE__*/React.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React.createElement(designSystem.Box, {
      flex: true,
      alignItems: "center",
      gap: "default"
    }, /*#__PURE__*/React.createElement(designSystem.Input, {
      ref: sizeRef,
      placeholder: "Enter Size"
    }), /*#__PURE__*/React.createElement(designSystem.Input, {
      ref: colorRef,
      placeholder: "Enter Color Code",
      mx: "xl"
    }), /*#__PURE__*/React.createElement(designSystem.Input, {
      ref: colorNameRef,
      placeholder: "Enter Color Name"
    }), /*#__PURE__*/React.createElement(designSystem.Input, {
      type: "number",
      ref: stockRef,
      placeholder: "Enter Value",
      marginLeft: "xl"
    }), /*#__PURE__*/React.createElement(designSystem.Button, {
      marginLeft: "xl",
      type: "button",
      variant: "primary",
      onClick: addItem
    }, "Add")), /*#__PURE__*/React.createElement(designSystem.Box, {
      mt: "lg",
      marginBottom: "xl"
    }, entries.map((item, index) => /*#__PURE__*/React.createElement(designSystem.Box, {
      key: index,
      flex: true,
      justifyContent: "space-between",
      alignItems: "center",
      mt: "sm"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, item["size"]), ": ", item["colorName"], " :", " ", item["stock"], " Pcs"), /*#__PURE__*/React.createElement(designSystem.Button, {
      size: "sm",
      variant: "danger",
      onClick: () => removeEntry(index)
    }, "Remove")))));
  };

  const SizeChart = props => {
    const {
      record,
      property
    } = props;
    const [entries, setEntries] = React$1.useState([]);
    const sizeRef = React$1.useRef(null);
    const bustRef = React$1.useRef(null);
    const waistRef = React$1.useRef(null);
    const hipRef = React$1.useRef(null);
    const addItem = () => {
      if (!sizeRef.current.value.trim()) return;
      if (!bustRef.current.value.trim()) return;
      if (!waistRef.current.value.trim()) return;
      if (!hipRef.current.value.trim()) return;
      const updated = [...entries, {
        size: `${sizeRef.current.value.trim()}`,
        bust: `${bustRef.current.value.trim()}`,
        waist: `${waistRef.current.value.trim()}`,
        hip: `${hipRef.current.value.trim()}`
      }];
      sizeRef.current.value = "";
      bustRef.current.value = "";
      waistRef.current.value = "";
      hipRef.current.value = "";
      setEntries(updated);
      props.record.params[property.name] = updated;
    };
    const removeEntry = index => {
      const updated = entries.filter((_, i) => i !== index);
      setEntries(updated);
      props.record.params[property.name] = updated;
    };

    // Load existing data
    React$1.useEffect(() => {
      // TODO fix this
      console.log("loading called");
      const value = record.params[property.name] || [];
      setEntries(Array.isArray(value) ? value : []);
    }, [record.params, property.name]);
    return /*#__PURE__*/React.createElement(designSystem.Box, null, /*#__PURE__*/React.createElement(designSystem.Label, null, property.label), /*#__PURE__*/React.createElement(designSystem.Box, {
      flex: true,
      alignItems: "center",
      gap: "default"
    }, /*#__PURE__*/React.createElement(designSystem.Input, {
      ref: sizeRef,
      placeholder: "Enter Size"
    }), /*#__PURE__*/React.createElement(designSystem.Input, {
      ref: bustRef,
      type: "number",
      placeholder: "Enter bust in inches",
      mx: "xl"
    }), /*#__PURE__*/React.createElement(designSystem.Input, {
      ref: waistRef,
      type: "number",
      placeholder: "Enter waist in inches"
    }), /*#__PURE__*/React.createElement(designSystem.Input, {
      type: "number",
      ref: hipRef,
      placeholder: "Enter hip in inches",
      marginLeft: "xl"
    }), /*#__PURE__*/React.createElement(designSystem.Button, {
      marginLeft: "xl",
      type: "button",
      variant: "primary",
      onClick: addItem
    }, "Add")), /*#__PURE__*/React.createElement(designSystem.Box, {
      mt: "lg",
      marginBottom: "xl"
    }, entries.map((item, index) => /*#__PURE__*/React.createElement(designSystem.Box, {
      key: index,
      flex: true,
      justifyContent: "space-between",
      alignItems: "center",
      mt: "sm"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, item["size"]), ": ", item["bust"], " : ", item["waist"], " ", ": ", item["hip"]), /*#__PURE__*/React.createElement(designSystem.Button, {
      size: "sm",
      variant: "danger",
      onClick: () => removeEntry(index)
    }, "Remove")))));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.DashboardComponent = DashboardComponent;
  AdminJS.UserComponents.UploadSingleImage = UploadSingleImage;
  AdminJS.UserComponents.ViewSingleImage = ViewSingleImage;
  AdminJS.UserComponents.CreateStringList = CreateStringList;
  AdminJS.UserComponents.ViewStringList = StringListView;
  AdminJS.UserComponents.DescriptionRichText = DescriptionRichText;
  AdminJS.UserComponents.KeyValueList = KeyValueList;
  AdminJS.UserComponents.UploadMultipleImage = UploadMultipleImage;
  AdminJS.UserComponents.SizeColorStock = SizeColorStock;
  AdminJS.UserComponents.SizeChart = SizeChart;

})(React, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zZXJ2aWNlcy9hZG1pbi9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuanN4IiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvRm9ybURhdGEuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9CbG9iLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9jb21tb24vdXRpbHMuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2luZGV4LmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90aHJvdHRsZS5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9mZXRjaC5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvYWRhcHRlcnMuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi9zZXJ2aWNlcy9hZG1pbi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uL3NlcnZpY2VzL2FkbWluL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwiLi4vc2VydmljZXMvYWRtaW4vY29tcG9uZW50cy9jb21tb24vc2luZ2xlX2ltYWdlX3VwbG9hZC5qc3giLCIuLi9zZXJ2aWNlcy9hZG1pbi9jb21wb25lbnRzL2NvbW1vbi92aWV3X3NpbmdsZV9pbWFnZS5qc3giLCIuLi9zZXJ2aWNlcy9hZG1pbi9jb21wb25lbnRzL2NvbW1vbi9zdHJpbmdfbGlzdC5qc3giLCIuLi9zZXJ2aWNlcy9hZG1pbi9jb21wb25lbnRzL2NvbW1vbi9zdHJpbmdfbGlzdF92aWV3LmpzeCIsIi4uL3NlcnZpY2VzL2FkbWluL2NvbXBvbmVudHMvcHJvZHVjdC9kZXNjcmlwdGlvbl9yaWNoLmpzeCIsIi4uL3NlcnZpY2VzL2FkbWluL2NvbXBvbmVudHMvcHJvZHVjdC9rZXlfdmFsdWUuanN4IiwiLi4vc2VydmljZXMvYWRtaW4vY29tcG9uZW50cy9jb21tb24vbXVsdGlwbGVfaW1hZ2VfdXBsb2FkLmpzeCIsIi4uL3NlcnZpY2VzL2FkbWluL2NvbXBvbmVudHMvcHJvZHVjdC9zaXplX2NvbG9yX3N0b2NrLmpzeCIsIi4uL3NlcnZpY2VzL2FkbWluL2NvbXBvbmVudHMvcHJvZHVjdC9zaXplX2NoYXJ0LmpzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmZ1bmN0aW9uIERhc2hib2FyZENvbXBvbmVudCgpIHtcclxuICByZXR1cm4gPGRpdj5EYXNoYm9hcmRDb21wb25lbnQ8L2Rpdj47XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZENvbXBvbmVudDtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHt0b1N0cmluZ30gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3Qge2dldFByb3RvdHlwZU9mfSA9IE9iamVjdDtcbmNvbnN0IHtpdGVyYXRvciwgdG9TdHJpbmdUYWd9ID0gU3ltYm9sO1xuXG5jb25zdCBraW5kT2YgPSAoY2FjaGUgPT4gdGhpbmcgPT4ge1xuICAgIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZVxufVxuXG5jb25zdCB0eXBlT2ZUZXN0ID0gdHlwZSA9PiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7aXNBcnJheX0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcikpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Z1bmN0aW9uID0gdHlwZU9mVGVzdCgnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc051bWJlciA9IHR5cGVPZlRlc3QoJ251bWJlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJvb2xlYW5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJvb2xlYW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jvb2xlYW4gPSB0aGluZyA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiYgISh0b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoaXRlcmF0b3IgaW4gdmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3QgKHNhZmVseSBoYW5kbGVzIEJ1ZmZlcnMpXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0VtcHR5T2JqZWN0ID0gKHZhbCkgPT4ge1xuICAvLyBFYXJseSByZXR1cm4gZm9yIG5vbi1vYmplY3RzIG9yIEJ1ZmZlcnMgdG8gcHJldmVudCBSYW5nZUVycm9yXG4gIGlmICghaXNPYmplY3QodmFsKSB8fCBpc0J1ZmZlcih2YWwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICB0cnkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLmxlbmd0aCA9PT0gMCAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIEZhbGxiYWNrIGZvciBhbnkgb3RoZXIgb2JqZWN0cyB0aGF0IG1pZ2h0IGNhdXNlIFJhbmdlRXJyb3Igd2l0aCBPYmplY3Qua2V5cygpXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFsnUmVhZGFibGVTdHJlYW0nLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdIZWFkZXJzJ10ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEJ1ZmZlciBjaGVja1xuICAgIGlmIChpc0J1ZmZlcihvYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgY29uc3Qga2V5cyA9IGFsbE93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQga2V5O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iaiwga2V5KSB7XG4gIGlmIChpc0J1ZmZlcihvYmopKXtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgbGV0IF9rZXk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgX2tleSA9IGtleXNbaV07XG4gICAgaWYgKGtleSA9PT0gX2tleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gX2tleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IF9nbG9iYWwgPSAoKCkgPT4ge1xuICAvKmVzbGludCBuby11bmRlZjowKi9cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgcmV0dXJuIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbClcbn0pKCk7XG5cbmNvbnN0IGlzQ29udGV4dERlZmluZWQgPSAoY29udGV4dCkgPT4gIWlzVW5kZWZpbmVkKGNvbnRleHQpICYmIGNvbnRleHQgIT09IF9nbG9iYWw7XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgY29uc3Qge2Nhc2VsZXNzfSA9IGlzQ29udGV4dERlZmluZWQodGhpcykgJiYgdGhpcyB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0S2V5ID0gY2FzZWxlc3MgJiYgZmluZEtleShyZXN1bHQsIGtleSkgfHwga2V5O1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFt0YXJnZXRLZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2UocmVzdWx0W3RhcmdldEtleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyZ3VtZW50c1tpXSAmJiBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywge2FsbE93bktleXN9PSB7fSkgPT4ge1xuICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xuICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9LCB7YWxsT3duS2V5c30pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICB2YWx1ZTogc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgfSk7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID0+IHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICBjb25zdCBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9IChUeXBlZEFycmF5ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIHRoaW5nID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbaXRlcmF0b3JdO1xuXG4gIGNvbnN0IF9pdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IF9pdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge31cblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cbi8qKlxuICogSWYgdGhlIHRoaW5nIGlzIGEgRm9ybURhdGEgb2JqZWN0LCByZXR1cm4gdHJ1ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHRoaW5nIC0gVGhlIHRoaW5nIHRvIGNoZWNrLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1NwZWNDb21wbGlhbnRGb3JtKHRoaW5nKSB7XG4gIHJldHVybiAhISh0aGluZyAmJiBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgdGhpbmdbdG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW2l0ZXJhdG9yXSk7XG59XG5cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoMTApO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSwgaSkgPT4ge1xuXG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vQnVmZmVyIGNoZWNrXG4gICAgICBpZiAoaXNCdWZmZXIoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn1cblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG4vLyBvcmlnaW5hbCBjb2RlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vRGlnaXRhbEJyYWluSlMvQXhpb3NQcm9taXNlL2Jsb2IvMTZkZWFiMTM3MTBlYzA5Nzc5OTIyMTMxZjNmYTU5NTQzMjBmODNhYi9saWIvdXRpbHMuanMjTDExLUwzNFxuXG5jb25zdCBfc2V0SW1tZWRpYXRlID0gKChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQsIHBvc3RNZXNzYWdlU3VwcG9ydGVkKSA9PiB7XG4gIGlmIChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gc2V0SW1tZWRpYXRlO1xuICB9XG5cbiAgcmV0dXJuIHBvc3RNZXNzYWdlU3VwcG9ydGVkID8gKCh0b2tlbiwgY2FsbGJhY2tzKSA9PiB7XG4gICAgX2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoe3NvdXJjZSwgZGF0YX0pID0+IHtcbiAgICAgIGlmIChzb3VyY2UgPT09IF9nbG9iYWwgJiYgZGF0YSA9PT0gdG9rZW4pIHtcbiAgICAgICAgY2FsbGJhY2tzLmxlbmd0aCAmJiBjYWxsYmFja3Muc2hpZnQoKSgpO1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIHJldHVybiAoY2IpID0+IHtcbiAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgIF9nbG9iYWwucG9zdE1lc3NhZ2UodG9rZW4sIFwiKlwiKTtcbiAgICB9XG4gIH0pKGBheGlvc0Ake01hdGgucmFuZG9tKCl9YCwgW10pIDogKGNiKSA9PiBzZXRUaW1lb3V0KGNiKTtcbn0pKFxuICB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLFxuICBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpXG4pO1xuXG5jb25zdCBhc2FwID0gdHlwZW9mIHF1ZXVlTWljcm90YXNrICE9PSAndW5kZWZpbmVkJyA/XG4gIHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbCkgOiAoIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IF9zZXRJbW1lZGlhdGUpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKipcblxuXG5jb25zdCBpc0l0ZXJhYmxlID0gKHRoaW5nKSA9PiB0aGluZyAhPSBudWxsICYmIGlzRnVuY3Rpb24odGhpbmdbaXRlcmF0b3JdKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc0VtcHR5T2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGUsXG4gIHNldEltbWVkaWF0ZTogX3NldEltbWVkaWF0ZSxcbiAgYXNhcCxcbiAgaXNJdGVyYWJsZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICBpZiAocmVzcG9uc2UpIHtcbiAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXMgPyByZXNwb25zZS5zdGF0dXMgOiBudWxsO1xuICB9XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCcsXG4gICdFUlJfTk9UX1NVUFBPUlQnLFxuICAnRVJSX0lOVkFMSURfVVJMJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbl0uZm9yRWFjaChjb2RlID0+IHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuICB1dGlscy50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0sIHByb3AgPT4ge1xuICAgIHJldHVybiBwcm9wICE9PSAnaXNBeGlvc0Vycm9yJztcbiAgfSk7XG5cbiAgQXhpb3NFcnJvci5jYWxsKGF4aW9zRXJyb3IsIGVycm9yLm1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIGF4aW9zRXJyb3IuY2F1c2UgPSBlcnJvcjtcblxuICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuXG4gIHJldHVybiBheGlvc0Vycm9yO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NFcnJvcjtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3RcbmV4cG9ydCBkZWZhdWx0IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuLy8gdGVtcG9yYXJ5IGhvdGZpeCB0byBhdm9pZCBjaXJjdWxhciByZWZlcmVuY2VzIHVudGlsIEF4aW9zVVJMU2VhcmNoUGFyYW1zIGlzIHJlZmFjdG9yZWRcbmltcG9ydCBQbGF0Zm9ybUZvcm1EYXRhIGZyb20gJy4uL3BsYXRmb3JtL25vZGUvY2xhc3Nlcy9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gdGhpbmcgaXMgYSBhcnJheSBvciBqcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoaW5nIC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBiZSB2aXNpdGVkLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1Zpc2l0YWJsZSh0aGluZykge1xuICByZXR1cm4gdXRpbHMuaXNQbGFpbk9iamVjdCh0aGluZykgfHwgdXRpbHMuaXNBcnJheSh0aGluZyk7XG59XG5cbi8qKlxuICogSXQgcmVtb3ZlcyB0aGUgYnJhY2tldHMgZnJvbSB0aGUgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIHBhcmFtZXRlci5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUga2V5IHdpdGhvdXQgdGhlIGJyYWNrZXRzLlxuICovXG5mdW5jdGlvbiByZW1vdmVCcmFja2V0cyhrZXkpIHtcbiAgcmV0dXJuIHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykgPyBrZXkuc2xpY2UoMCwgLTIpIDoga2V5O1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGF0aCwgYSBrZXksIGFuZCBhIGJvb2xlYW4sIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgY3VycmVudCBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3Zlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkb3RzIC0gSWYgdHJ1ZSwgdGhlIGtleSB3aWxsIGJlIHJlbmRlcmVkIHdpdGggZG90cyBpbnN0ZWFkIG9mIGJyYWNrZXRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cykge1xuICBpZiAoIXBhdGgpIHJldHVybiBrZXk7XG4gIHJldHVybiBwYXRoLmNvbmNhdChrZXkpLm1hcChmdW5jdGlvbiBlYWNoKHRva2VuLCBpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgcmV0dXJuICFkb3RzICYmIGkgPyAnWycgKyB0b2tlbiArICddJyA6IHRva2VuO1xuICB9KS5qb2luKGRvdHMgPyAnLicgOiAnJyk7XG59XG5cbi8qKlxuICogSWYgdGhlIGFycmF5IGlzIGFuIGFycmF5IGFuZCBub25lIG9mIGl0cyBlbGVtZW50cyBhcmUgdmlzaXRhYmxlLCB0aGVuIGl0J3MgYSBmbGF0IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRmxhdEFycmF5KGFycikge1xuICByZXR1cm4gdXRpbHMuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB1dGlscy50b0ZsYXRPYmplY3QodXRpbHMsIHt9LCBudWxsLCBmdW5jdGlvbiBmaWx0ZXIocHJvcCkge1xuICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaXRvcl1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YVRva2VucyA9IHRydWVdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRvdHMgPSBmYWxzZV1cbiAqIEBwYXJhbSB7P0Jvb2xlYW59IFtvcHRpb25zLmluZGV4ZXMgPSBmYWxzZV1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG4vKipcbiAqIEl0IGNvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gZm9ybSBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIC0gVGhlIEZvcm1EYXRhIG9iamVjdCB0byBhcHBlbmQgdG8uXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKFBsYXRmb3JtRm9ybURhdGEgfHwgRm9ybURhdGEpKCk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIG9wdGlvbnMgPSB1dGlscy50b0ZsYXRPYmplY3Qob3B0aW9ucywge1xuICAgIG1ldGFUb2tlbnM6IHRydWUsXG4gICAgZG90czogZmFsc2UsXG4gICAgaW5kZXhlczogZmFsc2VcbiAgfSwgZmFsc2UsIGZ1bmN0aW9uIGRlZmluZWQob3B0aW9uLCBzb3VyY2UpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgICByZXR1cm4gIXV0aWxzLmlzVW5kZWZpbmVkKHNvdXJjZVtvcHRpb25dKTtcbiAgfSk7XG5cbiAgY29uc3QgbWV0YVRva2VucyA9IG9wdGlvbnMubWV0YVRva2VucztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIGNvbnN0IHZpc2l0b3IgPSBvcHRpb25zLnZpc2l0b3IgfHwgZGVmYXVsdFZpc2l0b3I7XG4gIGNvbnN0IGRvdHMgPSBvcHRpb25zLmRvdHM7XG4gIGNvbnN0IGluZGV4ZXMgPSBvcHRpb25zLmluZGV4ZXM7XG4gIGNvbnN0IF9CbG9iID0gb3B0aW9ucy5CbG9iIHx8IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBCbG9iO1xuICBjb25zdCB1c2VCbG9iID0gX0Jsb2IgJiYgdXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG5cbiAgaWYgKCF1dGlscy5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzLmlzQXJyYXkodmFsdWUpICYmIGlzRmxhdEFycmF5KHZhbHVlKSkgfHxcbiAgICAgICAgKCh1dGlscy5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscy5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpXG4gICAgICAgICkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUpO1xuICB9IDogZW5jb2RlO1xuXG4gIHJldHVybiB0aGlzLl9wYWlycy5tYXAoZnVuY3Rpb24gZWFjaChwYWlyKSB7XG4gICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICB9LCAnJykuam9pbignJicpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/KG9iamVjdHxGdW5jdGlvbil9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIFxuICBjb25zdCBfZW5jb2RlID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgc2VyaWFsaXplOiBvcHRpb25zXG4gICAgfTtcbiAgfSBcblxuICBjb25zdCBzZXJpYWxpemVGbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZXJpYWxpemU7XG5cbiAgbGV0IHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHNlcmlhbGl6ZUZuKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHNlcmlhbGl6ZUZuKHBhcmFtcywgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykgP1xuICAgICAgcGFyYW1zLnRvU3RyaW5nKCkgOlxuICAgICAgbmV3IEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykudG9TdHJpbmcoX2VuY29kZSk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIGNvbnN0IGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZihcIiNcIik7XG5cbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnID8gVVJMU2VhcmNoUGFyYW1zIDogQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBGb3JtRGF0YSA6IG51bGw7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGxcbiIsImltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcydcbmltcG9ydCBGb3JtRGF0YSBmcm9tICcuL2NsYXNzZXMvRm9ybURhdGEuanMnXG5pbXBvcnQgQmxvYiBmcm9tICcuL2NsYXNzZXMvQmxvYi5qcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXMsXG4gICAgRm9ybURhdGEsXG4gICAgQmxvYlxuICB9LFxuICBwcm90b2NvbHM6IFsnaHR0cCcsICdodHRwcycsICdmaWxlJywgJ2Jsb2InLCAndXJsJywgJ2RhdGEnXVxufTtcbiIsImNvbnN0IGhhc0Jyb3dzZXJFbnYgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG5jb25zdCBfbmF2aWdhdG9yID0gdHlwZW9mIG5hdmlnYXRvciA9PT0gJ29iamVjdCcgJiYgbmF2aWdhdG9yIHx8IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlckVudiA9IGhhc0Jyb3dzZXJFbnYgJiZcbiAgKCFfbmF2aWdhdG9yIHx8IFsnUmVhY3ROYXRpdmUnLCAnTmF0aXZlU2NyaXB0JywgJ05TJ10uaW5kZXhPZihfbmF2aWdhdG9yLnByb2R1Y3QpIDwgMCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgX25hdmlnYXRvciBhcyBuYXZpZ2F0b3IsXG4gIG9yaWdpblxufVxuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4vbm9kZS9pbmRleC5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2NvbW1vbi91dGlscy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b0Zvcm1EYXRhKGRhdGEsIG5ldyBwbGF0Zm9ybS5jbGFzc2VzLlVSTFNlYXJjaFBhcmFtcygpLCB7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscy5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICAuLi5vcHRpb25zXG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChoZWFkZXIpICYmIHV0aWxzLmlzSXRlcmFibGUoaGVhZGVyKSkge1xuICAgICAgbGV0IG9iaiA9IHt9LCBkZXN0LCBrZXk7XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGhlYWRlcikge1xuICAgICAgICBpZiAoIXV0aWxzLmlzQXJyYXkoZW50cnkpKSB7XG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdPYmplY3QgaXRlcmF0b3IgbXVzdCByZXR1cm4gYSBrZXktdmFsdWUgcGFpcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqW2tleSA9IGVudHJ5WzBdXSA9IChkZXN0ID0gb2JqW2tleV0pID9cbiAgICAgICAgICAodXRpbHMuaXNBcnJheShkZXN0KSA/IFsuLi5kZXN0LCBlbnRyeVsxXV0gOiBbZGVzdCwgZW50cnlbMV1dKSA6IGVudHJ5WzFdO1xuICAgICAgfVxuXG4gICAgICBzZXRIZWFkZXJzKG9iaiwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0U2V0Q29va2llKCkge1xuICAgIHJldHVybiB0aGlzLmdldChcInNldC1jb29raWVcIikgfHwgW107XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xuICB9XG5cbiAgc3RhdGljIGZyb20odGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XG4gIH1cblxuICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XG4gICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4gY29tcHV0ZWQuc2V0KHRhcmdldCkpO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkO1xuICB9XG5cbiAgc3RhdGljIGFjY2Vzc29yKGhlYWRlcikge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc10gPSAodGhpc1skaW50ZXJuYWxzXSA9IHtcbiAgICAgIGFjY2Vzc29yczoge31cbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoWydDb250ZW50LVR5cGUnLCAnQ29udGVudC1MZW5ndGgnLCAnQWNjZXB0JywgJ0FjY2VwdC1FbmNvZGluZycsICdVc2VyLUFnZW50JywgJ0F1dGhvcml6YXRpb24nXSk7XG5cbi8vIHJlc2VydmVkIG5hbWVzIGhvdGZpeFxudXRpbHMucmVkdWNlRGVzY3JpcHRvcnMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSwgKHt2YWx1ZX0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG51dGlscy5mcmVlemVNZXRob2RzKEF4aW9zSGVhZGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zSGVhZGVycztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3Q9fSByZXF1ZXN0IFRoZSByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIEF4aW9zRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xuICBfX0NBTkNFTF9fOiB0cnVlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsZWRFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9BeGlvc0Vycm9yLmpzJztcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xuICBjb25zdCBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDYWxjdWxhdGUgZGF0YSBtYXhSYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gW3NhbXBsZXNDb3VudD0gMTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW21pbj0gMTAwMF1cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3BlZWRvbWV0ZXIoc2FtcGxlc0NvdW50LCBtaW4pIHtcbiAgc2FtcGxlc0NvdW50ID0gc2FtcGxlc0NvdW50IHx8IDEwO1xuICBjb25zdCBieXRlcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBjb25zdCB0aW1lc3RhbXBzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGxldCBoZWFkID0gMDtcbiAgbGV0IHRhaWwgPSAwO1xuICBsZXQgZmlyc3RTYW1wbGVUUztcblxuICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDEwMDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1c2goY2h1bmtMZW5ndGgpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3Qgc3RhcnRlZEF0ID0gdGltZXN0YW1wc1t0YWlsXTtcblxuICAgIGlmICghZmlyc3RTYW1wbGVUUykge1xuICAgICAgZmlyc3RTYW1wbGVUUyA9IG5vdztcbiAgICB9XG5cbiAgICBieXRlc1toZWFkXSA9IGNodW5rTGVuZ3RoO1xuICAgIHRpbWVzdGFtcHNbaGVhZF0gPSBub3c7XG5cbiAgICBsZXQgaSA9IHRhaWw7XG4gICAgbGV0IGJ5dGVzQ291bnQgPSAwO1xuXG4gICAgd2hpbGUgKGkgIT09IGhlYWQpIHtcbiAgICAgIGJ5dGVzQ291bnQgKz0gYnl0ZXNbaSsrXTtcbiAgICAgIGkgPSBpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGhlYWQgPSAoaGVhZCArIDEpICUgc2FtcGxlc0NvdW50O1xuXG4gICAgaWYgKGhlYWQgPT09IHRhaWwpIHtcbiAgICAgIHRhaWwgPSAodGFpbCArIDEpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGlmIChub3cgLSBmaXJzdFNhbXBsZVRTIDwgbWluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFzc2VkID0gc3RhcnRlZEF0ICYmIG5vdyAtIHN0YXJ0ZWRBdDtcblxuICAgIHJldHVybiBwYXNzZWQgPyBNYXRoLnJvdW5kKGJ5dGVzQ291bnQgKiAxMDAwIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3BlZWRvbWV0ZXI7XG4iLCIvKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4oLi4uYXJncyk7XG4gIH1cblxuICBjb25zdCB0aHJvdHRsZWQgPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGFzc2VkID0gbm93IC0gdGltZXN0YW1wO1xuICAgIGlmICggcGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKVxuICAgICAgICB9LCB0aHJlc2hvbGQgLSBwYXNzZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZsdXNoID0gKCkgPT4gbGFzdEFyZ3MgJiYgaW52b2tlKGxhc3RBcmdzKTtcblxuICByZXR1cm4gW3Rocm90dGxlZCwgZmx1c2hdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aHJvdHRsZTtcbiIsImltcG9ydCBzcGVlZG9tZXRlciBmcm9tIFwiLi9zcGVlZG9tZXRlci5qc1wiO1xuaW1wb3J0IHRocm90dGxlIGZyb20gXCIuL3Rocm90dGxlLmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBwcm9ncmVzc0V2ZW50UmVkdWNlciA9IChsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSwgZnJlcSA9IDMpID0+IHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gdGhyb3R0bGUoZSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBsb2FkZWQgLSBieXRlc05vdGlmaWVkO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG4gICAgY29uc3QgaW5SYW5nZSA9IGxvYWRlZCA8PSB0b3RhbDtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBsb2FkZWQ7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZSxcbiAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRvdGFsICE9IG51bGwsXG4gICAgICBbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ106IHRydWVcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufVxuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudERlY29yYXRvciA9ICh0b3RhbCwgdGhyb3R0bGVkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuXG4gIHJldHVybiBbKGxvYWRlZCkgPT4gdGhyb3R0bGVkWzBdKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSwgdGhyb3R0bGVkWzFdXTtcbn1cblxuZXhwb3J0IGNvbnN0IGFzeW5jRGVjb3JhdG9yID0gKGZuKSA9PiAoLi4uYXJncykgPT4gdXRpbHMuYXNhcCgoKSA9PiBmbiguLi5hcmdzKSk7XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgPyAoKG9yaWdpbiwgaXNNU0lFKSA9PiAodXJsKSA9PiB7XG4gIHVybCA9IG5ldyBVUkwodXJsLCBwbGF0Zm9ybS5vcmlnaW4pO1xuXG4gIHJldHVybiAoXG4gICAgb3JpZ2luLnByb3RvY29sID09PSB1cmwucHJvdG9jb2wgJiZcbiAgICBvcmlnaW4uaG9zdCA9PT0gdXJsLmhvc3QgJiZcbiAgICAoaXNNU0lFIHx8IG9yaWdpbi5wb3J0ID09PSB1cmwucG9ydClcbiAgKTtcbn0pKFxuICBuZXcgVVJMKHBsYXRmb3JtLm9yaWdpbiksXG4gIHBsYXRmb3JtLm5hdmlnYXRvciAmJiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KHBsYXRmb3JtLm5hdmlnYXRvci51c2VyQWdlbnQpXG4pIDogKCkgPT4gdHJ1ZTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIHtcbiAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IFtuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKV07XG5cbiAgICAgIHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscy5pc1N0cmluZyhkb21haW4pICYmIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG5cbiAgICAgIHNlY3VyZSA9PT0gdHJ1ZSAmJiBjb29raWUucHVzaCgnc2VjdXJlJyk7XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG5cbiAgICByZWFkKG5hbWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfVxuXG4gIDpcblxuICAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIHtcbiAgICB3cml0ZSgpIHt9LFxuICAgIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZSgpIHt9XG4gIH07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcbmltcG9ydCBjb21iaW5lVVJMcyBmcm9tICcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMLCBhbGxvd0Fic29sdXRlVXJscykge1xuICBsZXQgaXNSZWxhdGl2ZVVybCA9ICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCk7XG4gIGlmIChiYXNlVVJMICYmIChpc1JlbGF0aXZlVXJsIHx8IGFsbG93QWJzb2x1dGVVcmxzID09IGZhbHNlKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuL0F4aW9zSGVhZGVycy5qc1wiO1xuXG5jb25zdCBoZWFkZXJzVG9PYmplY3QgPSAodGhpbmcpID0+IHRoaW5nIGluc3RhbmNlb2YgQXhpb3NIZWFkZXJzID8geyAuLi50aGluZyB9IDogdGhpbmc7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIGNvbnN0IGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlLCBwcm9wLCBjYXNlbGVzcykge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UuY2FsbCh7Y2FzZWxlc3N9LCB0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMoYSwgYiwgcHJvcCAsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIHByb3AgLCBjYXNlbGVzcyk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEsIHByb3AgLCBjYXNlbGVzcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhhLCBiLCBwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIpO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtZXJnZU1hcCA9IHtcbiAgICB1cmw6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgbWV0aG9kOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGRhdGE6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgYmFzZVVSTDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHBhcmFtc1NlcmlhbGl6ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0TWVzc2FnZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aFhTUkZUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZUVuY29kaW5nOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHZhbGlkYXRlU3RhdHVzOiBtZXJnZURpcmVjdEtleXMsXG4gICAgaGVhZGVyczogKGEsIGIgLCBwcm9wKSA9PiBtZXJnZURlZXBQcm9wZXJ0aWVzKGhlYWRlcnNUb09iamVjdChhKSwgaGVhZGVyc1RvT2JqZWN0KGIpLHByb3AsIHRydWUpXG4gIH07XG5cbiAgdXRpbHMuZm9yRWFjaChPYmplY3Qua2V5cyh7Li4uY29uZmlnMSwgLi4uY29uZmlnMn0pLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwsIG5ld0NvbmZpZy5hbGxvd0Fic29sdXRlVXJscyksIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcblxuICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gIGlmIChhdXRoKSB7XG4gICAgaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArXG4gICAgICBidG9hKChhdXRoLnVzZXJuYW1lIHx8ICcnKSArICc6JyArIChhdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgucGFzc3dvcmQpKSA6ICcnKSlcbiAgICApO1xuICB9XG5cbiAgbGV0IGNvbnRlbnRUeXBlO1xuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpKSB7XG4gICAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiB8fCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUodW5kZWZpbmVkKTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH0gZWxzZSBpZiAoKGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpKSAhPT0gZmFsc2UpIHtcbiAgICAgIC8vIGZpeCBzZW1pY29sb24gZHVwbGljYXRpb24gaXNzdWUgZm9yIFJlYWN0TmF0aXZlIEZvcm1EYXRhIGltcGxlbWVudGF0aW9uXG4gICAgICBjb25zdCBbdHlwZSwgLi4udG9rZW5zXSA9IGNvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKS5tYXAodG9rZW4gPT4gdG9rZW4udHJpbSgpKS5maWx0ZXIoQm9vbGVhbikgOiBbXTtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoW3R5cGUgfHwgJ211bHRpcGFydC9mb3JtLWRhdGEnLCAuLi50b2tlbnNdLmpvaW4oJzsgJykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCB4c3JmIGhlYWRlclxuICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52KSB7XG4gICAgd2l0aFhTUkZUb2tlbiAmJiB1dGlscy5pc0Z1bmN0aW9uKHdpdGhYU1JGVG9rZW4pICYmICh3aXRoWFNSRlRva2VuID0gd2l0aFhTUkZUb2tlbihuZXdDb25maWcpKTtcblxuICAgIGlmICh3aXRoWFNSRlRva2VuIHx8ICh3aXRoWFNSRlRva2VuICE9PSBmYWxzZSAmJiBpc1VSTFNhbWVPcmlnaW4obmV3Q29uZmlnLnVybCkpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIGNvbnN0IHhzcmZWYWx1ZSA9IHhzcmZIZWFkZXJOYW1lICYmIHhzcmZDb29raWVOYW1lICYmIGNvb2tpZXMucmVhZCh4c3JmQ29va2llTmFtZSk7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgaGVhZGVycy5zZXQoeHNyZkhlYWRlck5hbWUsIHhzcmZWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0NvbmZpZztcbn1cblxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHNldHRsZSBmcm9tICcuLy4uL2NvcmUvc2V0dGxlLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBwYXJzZVByb3RvY29sIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQge3Byb2dyZXNzRXZlbnRSZWR1Y2VyfSBmcm9tICcuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzJztcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gXCIuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanNcIjtcblxuY29uc3QgaXNYSFJBZGFwdGVyU3VwcG9ydGVkID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJztcblxuZXhwb3J0IGRlZmF1bHQgaXNYSFJBZGFwdGVyU3VwcG9ydGVkICYmIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgIGxldCByZXF1ZXN0RGF0YSA9IF9jb25maWcuZGF0YTtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKF9jb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgbGV0IHtyZXNwb25zZVR5cGUsIG9uVXBsb2FkUHJvZ3Jlc3MsIG9uRG93bmxvYWRQcm9ncmVzc30gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgIGxldCBmbHVzaFVwbG9hZCwgZmx1c2hEb3dubG9hZDtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgIGZsdXNoRG93bmxvYWQgJiYgZmx1c2hEb3dubG9hZCgpOyAvLyBmbHVzaCBldmVudHNcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuXG4gICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgIH1cblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBfY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKFxuICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nID9cbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCBmdW5jdGlvbiBfcmVqZWN0KGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xuICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gb25sb2FkZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBvbmxvYWRlbmQgb24gdGhlIG5leHQgJ3RpY2snXG4gICAgICAgIHNldFRpbWVvdXQob25sb2FkZW5kKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIGxldCB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIF9jb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBfY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKF9jb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IF9jb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAob25Eb3dubG9hZFByb2dyZXNzKSB7XG4gICAgICAoW2Rvd25sb2FkVGhyb3R0bGVkLCBmbHVzaERvd25sb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSkpO1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGRvd25sb2FkVGhyb3R0bGVkKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmIChvblVwbG9hZFByb2dyZXNzICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICAoW3VwbG9hZFRocm90dGxlZCwgZmx1c2hVcGxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25VcGxvYWRQcm9ncmVzcykpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZFRocm90dGxlZCk7XG5cbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmbHVzaFVwbG9hZCk7XG4gICAgfVxuXG4gICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gY2FuY2VsID0+IHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IGNhbmNlbC50eXBlID8gbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnLCByZXF1ZXN0KSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4uc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgIF9jb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBfY29uZmlnLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3RvY29sID0gcGFyc2VQcm90b2NvbChfY29uZmlnLnVybCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgcGxhdGZvcm0ucHJvdG9jb2xzLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEgfHwgbnVsbCk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSBcIi4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzXCI7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5jb25zdCBjb21wb3NlU2lnbmFscyA9IChzaWduYWxzLCB0aW1lb3V0KSA9PiB7XG4gIGNvbnN0IHtsZW5ndGh9ID0gKHNpZ25hbHMgPSBzaWduYWxzID8gc2lnbmFscy5maWx0ZXIoQm9vbGVhbikgOiBbXSk7XG5cbiAgaWYgKHRpbWVvdXQgfHwgbGVuZ3RoKSB7XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBsZXQgYWJvcnRlZDtcblxuICAgIGNvbnN0IG9uYWJvcnQgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICBpZiAoIWFib3J0ZWQpIHtcbiAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGNvbnN0IGVyciA9IHJlYXNvbiBpbnN0YW5jZW9mIEVycm9yID8gcmVhc29uIDogdGhpcy5yZWFzb247XG4gICAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyIGluc3RhbmNlb2YgQXhpb3NFcnJvciA/IGVyciA6IG5ldyBDYW5jZWxlZEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBlcnIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdGltZXIgPSB0aW1lb3V0ICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgb25hYm9ydChuZXcgQXhpb3NFcnJvcihgdGltZW91dCAke3RpbWVvdXR9IG9mIG1zIGV4Y2VlZGVkYCwgQXhpb3NFcnJvci5FVElNRURPVVQpKVxuICAgIH0sIHRpbWVvdXQpXG5cbiAgICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICAgIGlmIChzaWduYWxzKSB7XG4gICAgICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XG4gICAgICAgICAgc2lnbmFsLnVuc3Vic2NyaWJlID8gc2lnbmFsLnVuc3Vic2NyaWJlKG9uYWJvcnQpIDogc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzaWduYWxzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4gc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkpO1xuXG4gICAgY29uc3Qge3NpZ25hbH0gPSBjb250cm9sbGVyO1xuXG4gICAgc2lnbmFsLnVuc3Vic2NyaWJlID0gKCkgPT4gdXRpbHMuYXNhcCh1bnN1YnNjcmliZSk7XG5cbiAgICByZXR1cm4gc2lnbmFsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2VTaWduYWxzO1xuIiwiXG5leHBvcnQgY29uc3Qgc3RyZWFtQ2h1bmsgPSBmdW5jdGlvbiogKGNodW5rLCBjaHVua1NpemUpIHtcbiAgbGV0IGxlbiA9IGNodW5rLmJ5dGVMZW5ndGg7XG5cbiAgaWYgKCFjaHVua1NpemUgfHwgbGVuIDwgY2h1bmtTaXplKSB7XG4gICAgeWllbGQgY2h1bms7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHBvcyA9IDA7XG4gIGxldCBlbmQ7XG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGVuZCA9IHBvcyArIGNodW5rU2l6ZTtcbiAgICB5aWVsZCBjaHVuay5zbGljZShwb3MsIGVuZCk7XG4gICAgcG9zID0gZW5kO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWFkQnl0ZXMgPSBhc3luYyBmdW5jdGlvbiogKGl0ZXJhYmxlLCBjaHVua1NpemUpIHtcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZWFkU3RyZWFtKGl0ZXJhYmxlKSkge1xuICAgIHlpZWxkKiBzdHJlYW1DaHVuayhjaHVuaywgY2h1bmtTaXplKTtcbiAgfVxufVxuXG5jb25zdCByZWFkU3RyZWFtID0gYXN5bmMgZnVuY3Rpb24qIChzdHJlYW0pIHtcbiAgaWYgKHN0cmVhbVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0pIHtcbiAgICB5aWVsZCogc3RyZWFtO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5nZXRSZWFkZXIoKTtcbiAgdHJ5IHtcbiAgICBmb3IgKDs7KSB7XG4gICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgeWllbGQgdmFsdWU7XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIGF3YWl0IHJlYWRlci5jYW5jZWwoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdHJhY2tTdHJlYW0gPSAoc3RyZWFtLCBjaHVua1NpemUsIG9uUHJvZ3Jlc3MsIG9uRmluaXNoKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplKTtcblxuICBsZXQgYnl0ZXMgPSAwO1xuICBsZXQgZG9uZTtcbiAgbGV0IF9vbkZpbmlzaCA9IChlKSA9PiB7XG4gICAgaWYgKCFkb25lKSB7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIG9uRmluaXNoICYmIG9uRmluaXNoKGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgX29uRmluaXNoKCk7XG4gICAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgICBpZiAob25Qcm9ncmVzcykge1xuICAgICAgICAgIGxldCBsb2FkZWRCeXRlcyA9IGJ5dGVzICs9IGxlbjtcbiAgICAgICAgICBvblByb2dyZXNzKGxvYWRlZEJ5dGVzKTtcbiAgICAgICAgfVxuICAgICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfb25GaW5pc2goZXJyKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FuY2VsKHJlYXNvbikge1xuICAgICAgX29uRmluaXNoKHJlYXNvbik7XG4gICAgICByZXR1cm4gaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgfVxuICB9LCB7XG4gICAgaGlnaFdhdGVyTWFyazogMlxuICB9KVxufVxuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gXCIuLi9wbGF0Zm9ybS9pbmRleC5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuaW1wb3J0IGNvbXBvc2VTaWduYWxzIGZyb20gXCIuLi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzXCI7XG5pbXBvcnQge3RyYWNrU3RyZWFtfSBmcm9tIFwiLi4vaGVscGVycy90cmFja1N0cmVhbS5qc1wiO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi4vY29yZS9BeGlvc0hlYWRlcnMuanNcIjtcbmltcG9ydCB7cHJvZ3Jlc3NFdmVudFJlZHVjZXIsIHByb2dyZXNzRXZlbnREZWNvcmF0b3IsIGFzeW5jRGVjb3JhdG9yfSBmcm9tIFwiLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qc1wiO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSBcIi4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qc1wiO1xuaW1wb3J0IHNldHRsZSBmcm9tIFwiLi4vY29yZS9zZXR0bGUuanNcIjtcblxuY29uc3QgaXNGZXRjaFN1cHBvcnRlZCA9IHR5cGVvZiBmZXRjaCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgUmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgUmVzcG9uc2UgPT09ICdmdW5jdGlvbic7XG5jb25zdCBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkID0gaXNGZXRjaFN1cHBvcnRlZCAmJiB0eXBlb2YgUmVhZGFibGVTdHJlYW0gPT09ICdmdW5jdGlvbic7XG5cbi8vIHVzZWQgb25seSBpbnNpZGUgdGhlIGZldGNoIGFkYXB0ZXJcbmNvbnN0IGVuY29kZVRleHQgPSBpc0ZldGNoU3VwcG9ydGVkICYmICh0eXBlb2YgVGV4dEVuY29kZXIgPT09ICdmdW5jdGlvbicgP1xuICAgICgoZW5jb2RlcikgPT4gKHN0cikgPT4gZW5jb2Rlci5lbmNvZGUoc3RyKSkobmV3IFRleHRFbmNvZGVyKCkpIDpcbiAgICBhc3luYyAoc3RyKSA9PiBuZXcgVWludDhBcnJheShhd2FpdCBuZXcgUmVzcG9uc2Uoc3RyKS5hcnJheUJ1ZmZlcigpKVxuKTtcblxuY29uc3QgdGVzdCA9IChmbiwgLi4uYXJncykgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiAhIWZuKC4uLmFyZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiB0ZXN0KCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gIHRlc3QoKCkgPT4gdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShuZXcgUmVzcG9uc2UoJycpLmJvZHkpKTtcblxuXG5jb25zdCByZXNvbHZlcnMgPSB7XG4gIHN0cmVhbTogc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAoKHJlcykgPT4gcmVzLmJvZHkpXG59O1xuXG5pc0ZldGNoU3VwcG9ydGVkICYmICgoKHJlcykgPT4ge1xuICBbJ3RleHQnLCAnYXJyYXlCdWZmZXInLCAnYmxvYicsICdmb3JtRGF0YScsICdzdHJlYW0nXS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICFyZXNvbHZlcnNbdHlwZV0gJiYgKHJlc29sdmVyc1t0eXBlXSA9IHV0aWxzLmlzRnVuY3Rpb24ocmVzW3R5cGVdKSA/IChyZXMpID0+IHJlc1t0eXBlXSgpIDpcbiAgICAgIChfLCBjb25maWcpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFJlc3BvbnNlIHR5cGUgJyR7dHlwZX0nIGlzIG5vdCBzdXBwb3J0ZWRgLCBBeGlvc0Vycm9yLkVSUl9OT1RfU1VQUE9SVCwgY29uZmlnKTtcbiAgICAgIH0pXG4gIH0pO1xufSkobmV3IFJlc3BvbnNlKSk7XG5cbmNvbnN0IGdldEJvZHlMZW5ndGggPSBhc3luYyAoYm9keSkgPT4ge1xuICBpZiAoYm9keSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZih1dGlscy5pc0Jsb2IoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5zaXplO1xuICB9XG5cbiAgaWYodXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgIGNvbnN0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHksXG4gICAgfSk7XG4gICAgcmV0dXJuIChhd2FpdCBfcmVxdWVzdC5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihib2R5KSkge1xuICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gIH1cblxuICBpZih1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gIH1cblxuICBpZih1dGlscy5pc1N0cmluZyhib2R5KSkge1xuICAgIHJldHVybiAoYXdhaXQgZW5jb2RlVGV4dChib2R5KSkuYnl0ZUxlbmd0aDtcbiAgfVxufVxuXG5jb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKGhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcblxuICByZXR1cm4gbGVuZ3RoID09IG51bGwgPyBnZXRCb2R5TGVuZ3RoKGJvZHkpIDogbGVuZ3RoO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0ZldGNoU3VwcG9ydGVkICYmIChhc3luYyAoY29uZmlnKSA9PiB7XG4gIGxldCB7XG4gICAgdXJsLFxuICAgIG1ldGhvZCxcbiAgICBkYXRhLFxuICAgIHNpZ25hbCxcbiAgICBjYW5jZWxUb2tlbixcbiAgICB0aW1lb3V0LFxuICAgIG9uRG93bmxvYWRQcm9ncmVzcyxcbiAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBoZWFkZXJzLFxuICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgZmV0Y2hPcHRpb25zXG4gIH0gPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gIGxldCBjb21wb3NlZFNpZ25hbCA9IGNvbXBvc2VTaWduYWxzKFtzaWduYWwsIGNhbmNlbFRva2VuICYmIGNhbmNlbFRva2VuLnRvQWJvcnRTaWduYWwoKV0sIHRpbWVvdXQpO1xuXG4gIGxldCByZXF1ZXN0O1xuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gY29tcG9zZWRTaWduYWwgJiYgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUgJiYgKCgpID0+IHtcbiAgICAgIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gIH0pO1xuXG4gIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICB0cnkge1xuICAgIGlmIChcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICkge1xuICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJiAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoY29udGVudFR5cGVIZWFkZXIpXG4gICAgICB9XG5cbiAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICApO1xuXG4gICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsIGZsdXNoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzLmlzU3RyaW5nKHdpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscyA/ICdpbmNsdWRlJyA6ICdvbWl0JztcbiAgICB9XG5cbiAgICAvLyBDbG91ZGZsYXJlIFdvcmtlcnMgdGhyb3dzIHdoZW4gY3JlZGVudGlhbHMgYXJlIGRlZmluZWRcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2Nsb3VkZmxhcmUvd29ya2VyZC9pc3N1ZXMvOTAyXG4gICAgY29uc3QgaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA9IFwiY3JlZGVudGlhbHNcIiBpbiBSZXF1ZXN0LnByb3RvdHlwZTtcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICBzaWduYWw6IGNvbXBvc2VkU2lnbmFsLFxuICAgICAgbWV0aG9kOiBtZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgZHVwbGV4OiBcImhhbGZcIixcbiAgICAgIGNyZWRlbnRpYWxzOiBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID8gd2l0aENyZWRlbnRpYWxzIDogdW5kZWZpbmVkXG4gICAgfSk7XG5cbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0LCBmZXRjaE9wdGlvbnMpO1xuXG4gICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgKGlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUpKSkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykpO1xuXG4gICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID0gb25Eb3dubG9hZFByb2dyZXNzICYmIHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25Eb3dubG9hZFByb2dyZXNzKSwgdHJ1ZSlcbiAgICAgICkgfHwgW107XG5cbiAgICAgIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKFxuICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsICgpID0+IHtcbiAgICAgICAgICBmbHVzaCAmJiBmbHVzaCgpO1xuICAgICAgICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10ocmVzcG9uc2UsIGNvbmZpZyk7XG5cbiAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfSlcbiAgICB9KVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuXG4gICAgaWYgKGVyciAmJiBlcnIubmFtZSA9PT0gJ1R5cGVFcnJvcicgJiYgL0xvYWQgZmFpbGVkfGZldGNoL2kudGVzdChlcnIubWVzc2FnZSkpIHtcbiAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KSxcbiAgICAgICAge1xuICAgICAgICAgIGNhdXNlOiBlcnIuY2F1c2UgfHwgZXJyXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZXJyLCBlcnIgJiYgZXJyLmNvZGUsIGNvbmZpZywgcmVxdWVzdCk7XG4gIH1cbn0pO1xuXG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgaHR0cEFkYXB0ZXIgZnJvbSAnLi9odHRwLmpzJztcbmltcG9ydCB4aHJBZGFwdGVyIGZyb20gJy4veGhyLmpzJztcbmltcG9ydCBmZXRjaEFkYXB0ZXIgZnJvbSAnLi9mZXRjaC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5cbmNvbnN0IGtub3duQWRhcHRlcnMgPSB7XG4gIGh0dHA6IGh0dHBBZGFwdGVyLFxuICB4aHI6IHhockFkYXB0ZXIsXG4gIGZldGNoOiBmZXRjaEFkYXB0ZXJcbn1cblxudXRpbHMuZm9yRWFjaChrbm93bkFkYXB0ZXJzLCAoZm4sIHZhbHVlKSA9PiB7XG4gIGlmIChmbikge1xuICAgIHRyeSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICduYW1lJywge3ZhbHVlfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ2FkYXB0ZXJOYW1lJywge3ZhbHVlfSk7XG4gIH1cbn0pO1xuXG5jb25zdCByZW5kZXJSZWFzb24gPSAocmVhc29uKSA9PiBgLSAke3JlYXNvbn1gO1xuXG5jb25zdCBpc1Jlc29sdmVkSGFuZGxlID0gKGFkYXB0ZXIpID0+IHV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgYWRhcHRlciA9PT0gbnVsbCB8fCBhZGFwdGVyID09PSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRBZGFwdGVyOiAoYWRhcHRlcnMpID0+IHtcbiAgICBhZGFwdGVycyA9IHV0aWxzLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgbGV0IGlkO1xuXG4gICAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGFwdGVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuXG4gICAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKVxuICAgICAgICAubWFwKChbaWQsIHN0YXRlXSkgPT4gYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICAgICApO1xuXG4gICAgICBsZXQgcyA9IGxlbmd0aCA/XG4gICAgICAgIChyZWFzb25zLmxlbmd0aCA+IDEgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pKSA6XG4gICAgICAgICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0cmFuc2Zvcm1EYXRhIGZyb20gJy4vdHJhbnNmb3JtRGF0YS5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi4vY2FuY2VsL2lzQ2FuY2VsLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBhZGFwdGVycyBmcm9tIFwiLi4vYWRhcHRlcnMvYWRhcHRlcnMuanNcIjtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcik7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICByZXNwb25zZVxuICAgICk7XG5cbiAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVhc29uLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIxLjExLjBcIjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbnZhbGlkYXRvcnMuc3BlbGxpbmcgPSBmdW5jdGlvbiBzcGVsbGluZyhjb3JyZWN0U3BlbGxpbmcpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oYCR7b3B0fSBpcyBsaWtlbHkgYSBtaXNzcGVsbGluZyBvZiAke2NvcnJlY3RTcGVsbGluZ31gKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBidWlsZFVSTCBmcm9tICcuLi9oZWxwZXJzL2J1aWxkVVJMLmpzJztcbmltcG9ydCBJbnRlcmNlcHRvck1hbmFnZXIgZnJvbSAnLi9JbnRlcmNlcHRvck1hbmFnZXIuanMnO1xuaW1wb3J0IGRpc3BhdGNoUmVxdWVzdCBmcm9tICcuL2Rpc3BhdGNoUmVxdWVzdC5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tICcuL2J1aWxkRnVsbFBhdGguanMnO1xuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4vQXhpb3NIZWFkZXJzLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnIHx8IHt9O1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gY29uZmlnT3JVcmwgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICAgKiBAcGFyYW0gez9PYmplY3R9IGNvbmZpZ1xuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gICAqL1xuICBhc3luYyByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgbGV0IGR1bW15ID0ge307XG5cbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPyBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShkdW1teSkgOiAoZHVtbXkgPSBuZXcgRXJyb3IoKSk7XG5cbiAgICAgICAgLy8gc2xpY2Ugb2ZmIHRoZSBFcnJvcjogLi4uIGxpbmVcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkdW1teS5zdGFjayA/IGR1bW15LnN0YWNrLnJlcGxhY2UoL14uK1xcbi8sICcnKSA6ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghZXJyLnN0YWNrKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBzdGFjaztcbiAgICAgICAgICAgIC8vIG1hdGNoIHdpdGhvdXQgdGhlIDIgdG9wIHN0YWNrIGxpbmVzXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGFjayAmJiAhU3RyaW5nKGVyci5zdGFjaykuZW5kc1dpdGgoc3RhY2sucmVwbGFjZSgvXi4rXFxuLitcXG4vLCAnJykpKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgKz0gJ1xcbicgKyBzdGFja1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlnbm9yZSB0aGUgY2FzZSB3aGVyZSBcInN0YWNrXCIgaXMgYW4gdW4td3JpdGFibGUgcHJvcGVydHlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVyc30gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXJcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMocGFyYW1zU2VyaWFsaXplciwge1xuICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICBzZXJpYWxpemU6IHZhbGlkYXRvcnMuZnVuY3Rpb25cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IGNvbmZpZy5hbGxvd0Fic29sdXRlVXJsc1xuICAgIGlmIChjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5hbGxvd0Fic29sdXRlVXJscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgPSB0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKGNvbmZpZywge1xuICAgICAgYmFzZVVybDogdmFsaWRhdG9ycy5zcGVsbGluZygnYmFzZVVSTCcpLFxuICAgICAgd2l0aFhzcmZUb2tlbjogdmFsaWRhdG9ycy5zcGVsbGluZygnd2l0aFhTUkZUb2tlbicpXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICAgIGNvbmZpZy5tZXRob2QgPSAoY29uZmlnLm1ldGhvZCB8fCB0aGlzLmRlZmF1bHRzLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICAgIGxldCBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoXG4gICAgICBoZWFkZXJzLmNvbW1vbixcbiAgICAgIGhlYWRlcnNbY29uZmlnLm1ldGhvZF1cbiAgICApO1xuXG4gICAgaGVhZGVycyAmJiB1dGlscy5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0KC4uLnJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2goLi4ucmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGxlbiA9IGNoYWluLmxlbmd0aDtcblxuICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluW2krK10sIGNoYWluW2krK10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBsZW4gPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICBsZXQgbmV3Q29uZmlnID0gY29uZmlnO1xuXG4gICAgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgY29uc3Qgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgY29uc3Qgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICB0cnkge1xuICAgICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgb25SZWplY3RlZC5jYWxsKHRoaXMsIGVycm9yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHByb21pc2UgPSBkaXNwYXRjaFJlcXVlc3QuY2FsbCh0aGlzLCBuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIGxlbiA9IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZ2V0VXJpKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsLCBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMpO1xuICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuICB9XG59XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL0NhbmNlbGVkRXJyb3IuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IG9uZnVsZmlsbGVkID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHRvQWJvcnRTaWduYWwoKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGFib3J0ID0gKGVycikgPT4ge1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIpO1xuICAgIH07XG5cbiAgICB0aGlzLnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICBjb250cm9sbGVyLnNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHRoaXMudW5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvc1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4vbGliL2F4aW9zLmpzJztcblxuLy8gVGhpcyBtb2R1bGUgaXMgaW50ZW5kZWQgdG8gdW53cmFwIEF4aW9zIGRlZmF1bHQgZXhwb3J0IGFzIG5hbWVkLlxuLy8gS2VlcCB0b3AtbGV2ZWwgZXhwb3J0IHNhbWUgd2l0aCBzdGF0aWMgcHJvcGVydGllc1xuLy8gc28gdGhhdCBpdCBjYW4ga2VlcCBzYW1lIHdpdGggZXMgbW9kdWxlIG9yIGNqc1xuY29uc3Qge1xuICBBeGlvcyxcbiAgQXhpb3NFcnJvcixcbiAgQ2FuY2VsZWRFcnJvcixcbiAgaXNDYW5jZWwsXG4gIENhbmNlbFRva2VuLFxuICBWRVJTSU9OLFxuICBhbGwsXG4gIENhbmNlbCxcbiAgaXNBeGlvc0Vycm9yLFxuICBzcHJlYWQsXG4gIHRvRm9ybURhdGEsXG4gIEF4aW9zSGVhZGVycyxcbiAgSHR0cFN0YXR1c0NvZGUsXG4gIGZvcm1Ub0pTT04sXG4gIGdldEFkYXB0ZXIsXG4gIG1lcmdlQ29uZmlnXG59ID0gYXhpb3M7XG5cbmV4cG9ydCB7XG4gIGF4aW9zIGFzIGRlZmF1bHQsXG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWdcbn1cbiIsImV4cG9ydCBjb25zdCBzZXJ2ZXJVcmxBcGkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6NzUwMi9hcGkvXCI7XHJcbmV4cG9ydCBjb25zdCBzZXJ2ZXJVcmxJbWFnZSA9IFwiaHR0cDovL2xvY2FsaG9zdDo3NTAyL2ltYWdlcy9cIjtcclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgQm94LCBEcm9wWm9uZSB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IHsgc2VydmVyVXJsQXBpLCBzZXJ2ZXJVcmxJbWFnZSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcclxuY29uc3QgVXBsb2FkU2luZ2xlSW1hZ2UgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IHByb3BlcnR5IH0gPSBwcm9wcztcclxuICBjb25zdCBmaWxlVXBsb2FkID0gYXN5bmMgKGZpbGUpID0+IHtcclxuICAgIGlmIChmaWxlLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICBjb25zdCB1cmwgPSBgJHtzZXJ2ZXJVcmxBcGl9dXBsb2FkL2ltYWdlYDtcclxuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKFwiZmlsZVwiLCBmaWxlWzBdKTtcclxuICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIGF4aW9zXHJcbiAgICAgICAgLnBvc3QodXJsLCBmb3JtRGF0YSwgY29uZmlnKVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGFbXCJmaWxlbmFtZVwiXSk7XHJcbiAgICAgICAgICAgIHByb3BzLnJlY29yZC5wYXJhbXNbXHJcbiAgICAgICAgICAgICAgcHJvcGVydHkubmFtZVxyXG4gICAgICAgICAgICBdID0gYCR7c2VydmVyVXJsSW1hZ2V9JHtyZXNwb25zZS5kYXRhW1wiZmlsZW5hbWVcIl19YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHt9KTtcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94PlxyXG4gICAgICA8RHJvcFpvbmVcclxuICAgICAgICBvbkNoYW5nZT17ZmlsZVVwbG9hZH1cclxuICAgICAgICB2YWxpZGF0ZT17e1xyXG4gICAgICAgICAgbWF4U2l6ZTogNTAyNDAwMCxcclxuICAgICAgICAgIG1pbWVUeXBlczogW1wiaW1hZ2UvcG5nXCIsIFwiaW1hZ2UvanBnXCIsIFwiaW1hZ2UvanBlZ1wiXSxcclxuICAgICAgICB9fVxyXG4gICAgICA+PC9Ecm9wWm9uZT5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVcGxvYWRTaW5nbGVJbWFnZTtcclxuIiwiY29uc3QgVmlld1NpbmdsZUltYWdlID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyByZWNvcmQgfSA9IHByb3BzO1xyXG4gIGNvbnN0IGltYWdlVXJsID0gcmVjb3JkLnBhcmFtcy5pbWFnZTtcclxuICAvLyBUT0RPIG9uIGNsaWNrIHByIGJhZGEgdmlldyBkaWtlZ2FcclxuICByZXR1cm4gaW1hZ2VVcmwgPyAoXHJcbiAgICA8aW1nXHJcbiAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgIGFsdD1cImltYWdlXCJcclxuICAgICAgc3R5bGU9e3sgd2lkdGg6IFwiNDBweFwiLCBoZWlnaHQ6IFwiNDBweFwiLCBib3JkZXJSYWRpdXM6IFwiMTAlXCIgfX1cclxuICAgIC8+XHJcbiAgKSA6IChcclxuICAgIDxzcGFuPk5vIEltYWdlPC9zcGFuPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWV3U2luZ2xlSW1hZ2U7XHJcbiIsImltcG9ydCB7IEJveCwgQnV0dG9uLCBJbnB1dCwgTGFiZWwgfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyB1c2VSZWYsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuY29uc3QgQ3JlYXRlU3RyaW5nTGlzdCA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgaW5wdXRWYWx1ZSA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBhZGRJdGVtID0gKCkgPT4ge1xyXG4gICAgaWYgKCFpbnB1dFZhbHVlLmN1cnJlbnQudmFsdWUudHJpbSgpKSByZXR1cm47XHJcbiAgICBjb25zdCB1cGRhdGVkID0gWy4uLml0ZW1zLCBpbnB1dFZhbHVlLmN1cnJlbnQudmFsdWUudHJpbSgpXTtcclxuICAgIGlucHV0VmFsdWUuY3VycmVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICBzZXRJdGVtcyh1cGRhdGVkKTtcclxuICAgIHByb3BzLnJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gPSB1cGRhdGVkO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbW92ZUl0ZW0gPSAoaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IHVwZGF0ZWQgPSBpdGVtcy5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGluZGV4KTtcclxuICAgIHNldEl0ZW1zKHVwZGF0ZWQpO1xyXG4gICAgcHJvcHMucmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSA9IHVwZGF0ZWQ7XHJcbiAgfTtcclxuXHJcbiAgLy8gTG9hZCBleGlzdGluZyBkYXRhXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIFRPRE8gZml4IHRoc2lcclxuICAgIGNvbnNvbGUubG9nKFwibG9hZGluZyBjYWxsZWRcIik7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gfHwgW107XHJcbiAgICBzZXRJdGVtcyhBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW10pO1xyXG4gIH0sIFtyZWNvcmQucGFyYW1zLCBwcm9wZXJ0eS5uYW1lXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94PlxyXG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XHJcbiAgICAgIDxCb3ggZmxleCBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZ2FwPVwiZGVmYXVsdFwiPlxyXG4gICAgICAgIDxJbnB1dCByZWY9e2lucHV0VmFsdWV9IHBsYWNlaG9sZGVyPVwiRW50ZXIgdGV4dFwiIC8+XHJcbiAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgbWFyZ2luTGVmdD1cInhsXCJcclxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxyXG4gICAgICAgICAgb25DbGljaz17YWRkSXRlbX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBBZGRcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICA8Qm94IG10PVwibGdcIj5cclxuICAgICAgICB7aXRlbXMubWFwKChpdGVtLCBpKSA9PiAoXHJcbiAgICAgICAgICA8Qm94IGtleT17aX0gZmxleCBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgbXQ9XCJzbVwiPlxyXG4gICAgICAgICAgICA8c3Bhbj57aXRlbX08L3NwYW4+XHJcbiAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICBtYXJnaW5MZWZ0PVwieGxcIlxyXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJkYW5nZXJcIlxyXG4gICAgICAgICAgICAgIHNpemU9XCJzbVwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVtb3ZlSXRlbShpKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIFJlbW92ZVxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L0JveD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmVhdGVTdHJpbmdMaXN0O1xyXG4iLCJjb25zdCBTdHJpbmdMaXN0VmlldyA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcbiAgY29uc3QgaXRlbXMgPSBbXTtcclxuICBsZXQgaW5kZXggPSAwO1xyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICB2YXIgdmFsdWUgPSByZWNvcmQucGFyYW1zW2B0ZXh0cy4ke2luZGV4fWBdO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgICAgIGl0ZW1zLnB1c2godmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKGl0ZW1zKTtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIDxzcGFuPntTdHJpbmcocHJvcGVydHkubmFtZSl9PC9zcGFuPjtcclxuICB9XHJcbiAgcmV0dXJuIDxzcGFuPntpdGVtcy5qb2luKFwiLCBcIil9PC9zcGFuPjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0cmluZ0xpc3RWaWV3O1xyXG4iLCJpbXBvcnQgeyBCb3gsIEJ1dHRvbiwgTGFiZWwsIFJpY2hUZXh0RWRpdG9yIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5jb25zdCBEZXNjcmlwdGlvblJpY2hUZXh0ID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcclxuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IHNhdmVEZXNjcmlwdGlvbiA9ICgpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHJldHVybjtcclxuICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcclxuICAgIHByb3BzLnJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gPSB2YWx1ZTtcclxuICB9O1xyXG5cclxuICAvLyBMb2FkIGV4aXN0aW5nIGRhdGFcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSByZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdIHx8IFwiXCI7XHJcbiAgICBzZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgfSwgW3JlY29yZC5wYXJhbXMsIHByb3BlcnR5Lm5hbWVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3g+XHJcbiAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cclxuICAgICAgPEJveFxyXG4gICAgICAgIGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIlxyXG4gICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcclxuICAgICAgICBnYXA9XCJkZWZhdWx0XCJcclxuICAgICAgICBtYXJnaW5Cb3R0b209XCJ4bFwiXHJcbiAgICAgID5cclxuICAgICAgICA8UmljaFRleHRFZGl0b3JcclxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXsoY29udGVudHQpID0+IHNldFZhbHVlKGNvbnRlbnR0KX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICBtYXJnaW5MZWZ0PVwieGxcIlxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXHJcbiAgICAgICAgICBvbkNsaWNrPXtzYXZlRGVzY3JpcHRpb259XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgU2F2ZVxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8L0JveD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXNjcmlwdGlvblJpY2hUZXh0O1xyXG4iLCJpbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmNvbnN0IEtleVZhbHVlTGlzdCA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcbiAgY29uc3QgW2VudHJpZXMsIHNldEVudHJpZXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IGtleVJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB2YWx1ZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBhZGRJdGVtID0gKCkgPT4ge1xyXG4gICAgaWYgKCFrZXlSZWYuY3VycmVudC52YWx1ZS50cmltKCkpIHJldHVybjtcclxuICAgIGlmICghdmFsdWVSZWYuY3VycmVudC52YWx1ZS50cmltKCkpIHJldHVybjtcclxuICAgIGNvbnN0IHVwZGF0ZWQgPSBbXHJcbiAgICAgIC4uLmVudHJpZXMsXHJcbiAgICAgIHtcclxuICAgICAgICBrZXk6IGAke2tleVJlZi5jdXJyZW50LnZhbHVlLnRyaW0oKX1gLFxyXG4gICAgICAgIHZhbHVlOiBgJHt2YWx1ZVJlZi5jdXJyZW50LnZhbHVlLnRyaW0oKX1gLFxyXG4gICAgICB9LFxyXG4gICAgXTtcclxuICAgIGtleVJlZi5jdXJyZW50LnZhbHVlID0gXCJcIjtcclxuICAgIHZhbHVlUmVmLmN1cnJlbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgc2V0RW50cmllcyh1cGRhdGVkKTtcclxuICAgIHByb3BzLnJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gPSB1cGRhdGVkO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbW92ZUVudHJ5ID0gKGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCB1cGRhdGVkID0gZW50cmllcy5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGluZGV4KTtcclxuICAgIHNldEVudHJpZXModXBkYXRlZCk7XHJcbiAgICBwcm9wcy5yZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdID0gdXBkYXRlZDtcclxuICB9O1xyXG5cclxuICAvLyBMb2FkIGV4aXN0aW5nIGRhdGFcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gVE9ETyBmaXggdGhpc1xyXG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGNhbGxlZFwiKTtcclxuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSB8fCBbXTtcclxuICAgIHNldEVudHJpZXMoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdKTtcclxuICB9LCBbcmVjb3JkLnBhcmFtcywgcHJvcGVydHkubmFtZV0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveD5cclxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICA8Qm94IGZsZXggYWxpZ25JdGVtcz1cImNlbnRlclwiIGdhcD1cImRlZmF1bHRcIj5cclxuICAgICAgICA8SW5wdXQgcmVmPXtrZXlSZWZ9IHBsYWNlaG9sZGVyPVwiRW50ZXIgS2V5XCIgLz5cclxuICAgICAgICA8SW5wdXQgcmVmPXt2YWx1ZVJlZn0gcGxhY2Vob2xkZXI9XCJFbnRlciBWYWx1ZVwiIC8+XHJcbiAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgbWFyZ2luTGVmdD1cInhsXCJcclxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxyXG4gICAgICAgICAgb25DbGljaz17YWRkSXRlbX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBBZGRcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICA8Qm94IG10PVwibGdcIiBtYXJnaW5Cb3R0b209XCJ4bFwiPlxyXG4gICAgICAgIHtlbnRyaWVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgZmxleFxyXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIlxyXG4gICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcclxuICAgICAgICAgICAgbXQ9XCJzbVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgIDxzdHJvbmc+e2l0ZW0ua2V5fTwvc3Ryb25nPjoge2l0ZW0udmFsdWV9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgIHNpemU9XCJzbVwiXHJcbiAgICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVtb3ZlRW50cnkoaW5kZXgpfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgUmVtb3ZlXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEtleVZhbHVlTGlzdDtcclxuIiwiaW1wb3J0IHsgQm94LCBEcm9wWm9uZSB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IHsgc2VydmVyVXJsQXBpLCBzZXJ2ZXJVcmxJbWFnZSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcclxuY29uc3QgVXBsb2FkTXVsdGlwbGVJbWFnZSA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcHJvcGVydHkgfSA9IHByb3BzO1xyXG4gIGNvbnN0IGZpbGVVcGxvYWQgPSBhc3luYyAoZmlsZXMpID0+IHtcclxuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHZhciBpbWFnZXMgPSBbXTtcclxuICAgICAgZm9yICh2YXIgZjEgaW4gZmlsZXMpIHtcclxuICAgICAgICB2YXIgZmlsZSA9IGZpbGVzW2YxXTtcclxuICAgICAgICBjb25zdCB1cmwgPSBgJHtzZXJ2ZXJVcmxBcGl9dXBsb2FkL2ltYWdlYDtcclxuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcImZpbGVcIiwgZmlsZSk7XHJcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBheGlvc1xyXG4gICAgICAgICAgLnBvc3QodXJsLCBmb3JtRGF0YSwgY29uZmlnKVxyXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgIGltYWdlcy5wdXNoKGAke3NlcnZlclVybEltYWdlfSR7cmVzcG9uc2UuZGF0YVtcImZpbGVuYW1lXCJdfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge30pO1xyXG4gICAgICB9XHJcbiAgICAgIHByb3BzLnJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gPSBpbWFnZXM7XHJcbiAgICB9XHJcbiAgfTtcclxuICByZXR1cm4gKFxyXG4gICAgPEJveD5cclxuICAgICAgPERyb3Bab25lXHJcbiAgICAgICAgbXVsdGlwbGVcclxuICAgICAgICBvbkNoYW5nZT17ZmlsZVVwbG9hZH1cclxuICAgICAgICB2YWxpZGF0ZT17e1xyXG4gICAgICAgICAgbWF4U2l6ZTogNTAyNDAwMCxcclxuICAgICAgICAgIG1pbWVUeXBlczogW1wiaW1hZ2UvcG5nXCIsIFwiaW1hZ2UvanBnXCIsIFwiaW1hZ2UvanBlZ1wiXSxcclxuICAgICAgICB9fVxyXG4gICAgICA+PC9Ecm9wWm9uZT5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVcGxvYWRNdWx0aXBsZUltYWdlO1xyXG4iLCJpbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmNvbnN0IFNpemVDb2xvclN0b2NrID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyByZWNvcmQsIHByb3BlcnR5IH0gPSBwcm9wcztcclxuICBjb25zdCBbZW50cmllcywgc2V0RW50cmllc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3Qgc2l6ZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBjb2xvclJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBjb2xvck5hbWVSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgc3RvY2tSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYWRkSXRlbSA9ICgpID0+IHtcclxuICAgIGlmICghc2l6ZVJlZi5jdXJyZW50LnZhbHVlLnRyaW0oKSkgcmV0dXJuO1xyXG4gICAgaWYgKCFjb2xvclJlZi5jdXJyZW50LnZhbHVlLnRyaW0oKSkgcmV0dXJuO1xyXG4gICAgaWYgKCFjb2xvck5hbWVSZWYuY3VycmVudC52YWx1ZS50cmltKCkpIHJldHVybjtcclxuICAgIGlmICghc3RvY2tSZWYuY3VycmVudC52YWx1ZS50cmltKCkpIHJldHVybjtcclxuICAgIGNvbnN0IHVwZGF0ZWQgPSBbXHJcbiAgICAgIC4uLmVudHJpZXMsXHJcbiAgICAgIHtcclxuICAgICAgICBzaXplOiBgJHtzaXplUmVmLmN1cnJlbnQudmFsdWUudHJpbSgpfWAsXHJcbiAgICAgICAgY29sb3I6IGAke2NvbG9yUmVmLmN1cnJlbnQudmFsdWUudHJpbSgpfWAsXHJcbiAgICAgICAgY29sb3JOYW1lOiBgJHtjb2xvck5hbWVSZWYuY3VycmVudC52YWx1ZS50cmltKCl9YCxcclxuICAgICAgICBzdG9jazogYCR7c3RvY2tSZWYuY3VycmVudC52YWx1ZS50cmltKCl9YCxcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICBzaXplUmVmLmN1cnJlbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgY29sb3JSZWYuY3VycmVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICBjb2xvck5hbWVSZWYuY3VycmVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICBzdG9ja1JlZi5jdXJyZW50LnZhbHVlID0gXCJcIjtcclxuICAgIHNldEVudHJpZXModXBkYXRlZCk7XHJcbiAgICBwcm9wcy5yZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdID0gdXBkYXRlZDtcclxuICB9O1xyXG5cclxuICBjb25zdCByZW1vdmVFbnRyeSA9IChpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgdXBkYXRlZCA9IGVudHJpZXMuZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpbmRleCk7XHJcbiAgICBzZXRFbnRyaWVzKHVwZGF0ZWQpO1xyXG4gICAgcHJvcHMucmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSA9IHVwZGF0ZWQ7XHJcbiAgfTtcclxuXHJcbiAgLy8gTG9hZCBleGlzdGluZyBkYXRhXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIFRPRE8gZml4IHRoaXNcclxuICAgIGNvbnNvbGUubG9nKFwibG9hZGluZyBjYWxsZWRcIik7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gfHwgW107XHJcbiAgICBzZXRFbnRyaWVzKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSk7XHJcbiAgfSwgW3JlY29yZC5wYXJhbXMsIHByb3BlcnR5Lm5hbWVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3g+XHJcbiAgICAgIDxMYWJlbD57cHJvcGVydHkubGFiZWx9PC9MYWJlbD5cclxuICAgICAgPEJveCBmbGV4IGFsaWduSXRlbXM9XCJjZW50ZXJcIiBnYXA9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgPElucHV0IHJlZj17c2l6ZVJlZn0gcGxhY2Vob2xkZXI9XCJFbnRlciBTaXplXCIgLz5cclxuICAgICAgICA8SW5wdXQgcmVmPXtjb2xvclJlZn0gcGxhY2Vob2xkZXI9XCJFbnRlciBDb2xvciBDb2RlXCIgbXg9XCJ4bFwiIC8+XHJcbiAgICAgICAgPElucHV0IHJlZj17Y29sb3JOYW1lUmVmfSBwbGFjZWhvbGRlcj1cIkVudGVyIENvbG9yIE5hbWVcIiAvPlxyXG4gICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICByZWY9e3N0b2NrUmVmfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBWYWx1ZVwiXHJcbiAgICAgICAgICBtYXJnaW5MZWZ0PVwieGxcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgbWFyZ2luTGVmdD1cInhsXCJcclxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxyXG4gICAgICAgICAgb25DbGljaz17YWRkSXRlbX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBBZGRcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICA8Qm94IG10PVwibGdcIiBtYXJnaW5Cb3R0b209XCJ4bFwiPlxyXG4gICAgICAgIHtlbnRyaWVzLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgZmxleFxyXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIlxyXG4gICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcclxuICAgICAgICAgICAgbXQ9XCJzbVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgIDxzdHJvbmc+e2l0ZW1bXCJzaXplXCJdfTwvc3Ryb25nPjoge2l0ZW1bXCJjb2xvck5hbWVcIl19IDp7XCIgXCJ9XHJcbiAgICAgICAgICAgICAge2l0ZW1bXCJzdG9ja1wiXX0gUGNzXHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgIHNpemU9XCJzbVwiXHJcbiAgICAgICAgICAgICAgdmFyaWFudD1cImRhbmdlclwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVtb3ZlRW50cnkoaW5kZXgpfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgUmVtb3ZlXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNpemVDb2xvclN0b2NrO1xyXG4iLCJpbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsIH0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmNvbnN0IFNpemVDaGFydCA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVjb3JkLCBwcm9wZXJ0eSB9ID0gcHJvcHM7XHJcbiAgY29uc3QgW2VudHJpZXMsIHNldEVudHJpZXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IHNpemVSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYnVzdFJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCB3YWlzdFJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBoaXBSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgYWRkSXRlbSA9ICgpID0+IHtcclxuICAgIGlmICghc2l6ZVJlZi5jdXJyZW50LnZhbHVlLnRyaW0oKSkgcmV0dXJuO1xyXG4gICAgaWYgKCFidXN0UmVmLmN1cnJlbnQudmFsdWUudHJpbSgpKSByZXR1cm47XHJcbiAgICBpZiAoIXdhaXN0UmVmLmN1cnJlbnQudmFsdWUudHJpbSgpKSByZXR1cm47XHJcbiAgICBpZiAoIWhpcFJlZi5jdXJyZW50LnZhbHVlLnRyaW0oKSkgcmV0dXJuO1xyXG4gICAgY29uc3QgdXBkYXRlZCA9IFtcclxuICAgICAgLi4uZW50cmllcyxcclxuICAgICAge1xyXG4gICAgICAgIHNpemU6IGAke3NpemVSZWYuY3VycmVudC52YWx1ZS50cmltKCl9YCxcclxuICAgICAgICBidXN0OiBgJHtidXN0UmVmLmN1cnJlbnQudmFsdWUudHJpbSgpfWAsXHJcbiAgICAgICAgd2Fpc3Q6IGAke3dhaXN0UmVmLmN1cnJlbnQudmFsdWUudHJpbSgpfWAsXHJcbiAgICAgICAgaGlwOiBgJHtoaXBSZWYuY3VycmVudC52YWx1ZS50cmltKCl9YCxcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICBzaXplUmVmLmN1cnJlbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgYnVzdFJlZi5jdXJyZW50LnZhbHVlID0gXCJcIjtcclxuICAgIHdhaXN0UmVmLmN1cnJlbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgaGlwUmVmLmN1cnJlbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgc2V0RW50cmllcyh1cGRhdGVkKTtcclxuICAgIHByb3BzLnJlY29yZC5wYXJhbXNbcHJvcGVydHkubmFtZV0gPSB1cGRhdGVkO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbW92ZUVudHJ5ID0gKGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCB1cGRhdGVkID0gZW50cmllcy5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGluZGV4KTtcclxuICAgIHNldEVudHJpZXModXBkYXRlZCk7XHJcbiAgICBwcm9wcy5yZWNvcmQucGFyYW1zW3Byb3BlcnR5Lm5hbWVdID0gdXBkYXRlZDtcclxuICB9O1xyXG5cclxuICAvLyBMb2FkIGV4aXN0aW5nIGRhdGFcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gVE9ETyBmaXggdGhpc1xyXG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGNhbGxlZFwiKTtcclxuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkLnBhcmFtc1twcm9wZXJ0eS5uYW1lXSB8fCBbXTtcclxuICAgIHNldEVudHJpZXMoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdKTtcclxuICB9LCBbcmVjb3JkLnBhcmFtcywgcHJvcGVydHkubmFtZV0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveD5cclxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxyXG4gICAgICA8Qm94IGZsZXggYWxpZ25JdGVtcz1cImNlbnRlclwiIGdhcD1cImRlZmF1bHRcIj5cclxuICAgICAgICA8SW5wdXQgcmVmPXtzaXplUmVmfSBwbGFjZWhvbGRlcj1cIkVudGVyIFNpemVcIiAvPlxyXG4gICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgcmVmPXtidXN0UmVmfVxyXG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGJ1c3QgaW4gaW5jaGVzXCJcclxuICAgICAgICAgIG14PVwieGxcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPElucHV0XHJcbiAgICAgICAgICByZWY9e3dhaXN0UmVmfVxyXG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHdhaXN0IGluIGluY2hlc1wiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8SW5wdXRcclxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgcmVmPXtoaXBSZWZ9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGhpcCBpbiBpbmNoZXNcIlxyXG4gICAgICAgICAgbWFyZ2luTGVmdD1cInhsXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgIG1hcmdpbkxlZnQ9XCJ4bFwiXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcclxuICAgICAgICAgIG9uQ2xpY2s9e2FkZEl0ZW19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgQWRkXHJcbiAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgPEJveCBtdD1cImxnXCIgbWFyZ2luQm90dG9tPVwieGxcIj5cclxuICAgICAgICB7ZW50cmllcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgIGZsZXhcclxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCJcclxuICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXHJcbiAgICAgICAgICAgIG10PVwic21cIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICA8c3Ryb25nPntpdGVtW1wic2l6ZVwiXX08L3N0cm9uZz46IHtpdGVtW1wiYnVzdFwiXX0gOiB7aXRlbVtcIndhaXN0XCJdfXtcIiBcIn1cclxuICAgICAgICAgICAgICA6IHtpdGVtW1wiaGlwXCJdfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICBzaXplPVwic21cIlxyXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJkYW5nZXJcIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJlbW92ZUVudHJ5KGluZGV4KX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIFJlbW92ZVxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L0JveD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaXplQ2hhcnQ7XHJcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZENvbXBvbmVudCBmcm9tICcuLi9zZXJ2aWNlcy9hZG1pbi9jb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZENvbXBvbmVudCA9IERhc2hib2FyZENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZFNpbmdsZUltYWdlIGZyb20gJy4uL3NlcnZpY2VzL2FkbWluL2NvbXBvbmVudHMvY29tbW9uL3NpbmdsZV9pbWFnZV91cGxvYWQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZFNpbmdsZUltYWdlID0gVXBsb2FkU2luZ2xlSW1hZ2VcbmltcG9ydCBWaWV3U2luZ2xlSW1hZ2UgZnJvbSAnLi4vc2VydmljZXMvYWRtaW4vY29tcG9uZW50cy9jb21tb24vdmlld19zaW5nbGVfaW1hZ2UnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlZpZXdTaW5nbGVJbWFnZSA9IFZpZXdTaW5nbGVJbWFnZVxuaW1wb3J0IENyZWF0ZVN0cmluZ0xpc3QgZnJvbSAnLi4vc2VydmljZXMvYWRtaW4vY29tcG9uZW50cy9jb21tb24vc3RyaW5nX2xpc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNyZWF0ZVN0cmluZ0xpc3QgPSBDcmVhdGVTdHJpbmdMaXN0XG5pbXBvcnQgVmlld1N0cmluZ0xpc3QgZnJvbSAnLi4vc2VydmljZXMvYWRtaW4vY29tcG9uZW50cy9jb21tb24vc3RyaW5nX2xpc3RfdmlldydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVmlld1N0cmluZ0xpc3QgPSBWaWV3U3RyaW5nTGlzdFxuaW1wb3J0IERlc2NyaXB0aW9uUmljaFRleHQgZnJvbSAnLi4vc2VydmljZXMvYWRtaW4vY29tcG9uZW50cy9wcm9kdWN0L2Rlc2NyaXB0aW9uX3JpY2gnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRlc2NyaXB0aW9uUmljaFRleHQgPSBEZXNjcmlwdGlvblJpY2hUZXh0XG5pbXBvcnQgS2V5VmFsdWVMaXN0IGZyb20gJy4uL3NlcnZpY2VzL2FkbWluL2NvbXBvbmVudHMvcHJvZHVjdC9rZXlfdmFsdWUnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLktleVZhbHVlTGlzdCA9IEtleVZhbHVlTGlzdFxuaW1wb3J0IFVwbG9hZE11bHRpcGxlSW1hZ2UgZnJvbSAnLi4vc2VydmljZXMvYWRtaW4vY29tcG9uZW50cy9jb21tb24vbXVsdGlwbGVfaW1hZ2VfdXBsb2FkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRNdWx0aXBsZUltYWdlID0gVXBsb2FkTXVsdGlwbGVJbWFnZVxuaW1wb3J0IFNpemVDb2xvclN0b2NrIGZyb20gJy4uL3NlcnZpY2VzL2FkbWluL2NvbXBvbmVudHMvcHJvZHVjdC9zaXplX2NvbG9yX3N0b2NrJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TaXplQ29sb3JTdG9jayA9IFNpemVDb2xvclN0b2NrXG5pbXBvcnQgU2l6ZUNoYXJ0IGZyb20gJy4uL3NlcnZpY2VzL2FkbWluL2NvbXBvbmVudHMvcHJvZHVjdC9zaXplX2NoYXJ0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TaXplQ2hhcnQgPSBTaXplQ2hhcnQiXSwibmFtZXMiOlsiRGFzaGJvYXJkQ29tcG9uZW50IiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiYmluZCIsImZuIiwidGhpc0FyZyIsIndyYXAiLCJhcHBseSIsImFyZ3VtZW50cyIsInRvU3RyaW5nIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJpdGVyYXRvciIsInRvU3RyaW5nVGFnIiwiU3ltYm9sIiwia2luZE9mIiwiY2FjaGUiLCJ0aGluZyIsInN0ciIsImNhbGwiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiY3JlYXRlIiwia2luZE9mVGVzdCIsInR5cGUiLCJ0eXBlT2ZUZXN0IiwiaXNBcnJheSIsIkFycmF5IiwiaXNVbmRlZmluZWQiLCJpc0J1ZmZlciIsInZhbCIsImNvbnN0cnVjdG9yIiwiaXNGdW5jdGlvbiIsImlzQXJyYXlCdWZmZXIiLCJpc0FycmF5QnVmZmVyVmlldyIsInJlc3VsdCIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiYnVmZmVyIiwiaXNTdHJpbmciLCJpc051bWJlciIsImlzT2JqZWN0IiwiaXNCb29sZWFuIiwiaXNQbGFpbk9iamVjdCIsImlzRW1wdHlPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiZSIsImlzRGF0ZSIsImlzRmlsZSIsImlzQmxvYiIsImlzRmlsZUxpc3QiLCJpc1N0cmVhbSIsInBpcGUiLCJpc0Zvcm1EYXRhIiwia2luZCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiaXNVUkxTZWFyY2hQYXJhbXMiLCJpc1JlYWRhYmxlU3RyZWFtIiwiaXNSZXF1ZXN0IiwiaXNSZXNwb25zZSIsImlzSGVhZGVycyIsIm1hcCIsInRyaW0iLCJyZXBsYWNlIiwiZm9yRWFjaCIsIm9iaiIsImFsbE93bktleXMiLCJpIiwibCIsImdldE93blByb3BlcnR5TmFtZXMiLCJsZW4iLCJrZXkiLCJmaW5kS2V5IiwiX2tleSIsIl9nbG9iYWwiLCJnbG9iYWxUaGlzIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImlzQ29udGV4dERlZmluZWQiLCJjb250ZXh0IiwibWVyZ2UiLCJjYXNlbGVzcyIsImFzc2lnblZhbHVlIiwidGFyZ2V0S2V5IiwiZXh0ZW5kIiwiYSIsImIiLCJzdHJpcEJPTSIsImNvbnRlbnQiLCJjaGFyQ29kZUF0IiwiaW5oZXJpdHMiLCJzdXBlckNvbnN0cnVjdG9yIiwicHJvcHMiLCJkZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJhc3NpZ24iLCJ0b0ZsYXRPYmplY3QiLCJzb3VyY2VPYmoiLCJkZXN0T2JqIiwiZmlsdGVyIiwicHJvcEZpbHRlciIsInByb3AiLCJtZXJnZWQiLCJlbmRzV2l0aCIsInNlYXJjaFN0cmluZyIsInBvc2l0aW9uIiwiU3RyaW5nIiwidW5kZWZpbmVkIiwibGFzdEluZGV4IiwiaW5kZXhPZiIsInRvQXJyYXkiLCJhcnIiLCJpc1R5cGVkQXJyYXkiLCJUeXBlZEFycmF5IiwiVWludDhBcnJheSIsImZvckVhY2hFbnRyeSIsImdlbmVyYXRvciIsIl9pdGVyYXRvciIsIm5leHQiLCJkb25lIiwicGFpciIsIm1hdGNoQWxsIiwicmVnRXhwIiwibWF0Y2hlcyIsImV4ZWMiLCJwdXNoIiwiaXNIVE1MRm9ybSIsInRvQ2FtZWxDYXNlIiwicmVwbGFjZXIiLCJtIiwicDEiLCJwMiIsInRvVXBwZXJDYXNlIiwiaGFzT3duUHJvcGVydHkiLCJpc1JlZ0V4cCIsInJlZHVjZURlc2NyaXB0b3JzIiwicmVkdWNlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJyZWR1Y2VkRGVzY3JpcHRvcnMiLCJkZXNjcmlwdG9yIiwibmFtZSIsInJldCIsImRlZmluZVByb3BlcnRpZXMiLCJmcmVlemVNZXRob2RzIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwic2V0IiwiRXJyb3IiLCJ0b09iamVjdFNldCIsImFycmF5T3JTdHJpbmciLCJkZWxpbWl0ZXIiLCJkZWZpbmUiLCJzcGxpdCIsIm5vb3AiLCJ0b0Zpbml0ZU51bWJlciIsImRlZmF1bHRWYWx1ZSIsIk51bWJlciIsImlzRmluaXRlIiwiaXNTcGVjQ29tcGxpYW50Rm9ybSIsInRvSlNPTk9iamVjdCIsInN0YWNrIiwidmlzaXQiLCJzb3VyY2UiLCJ0YXJnZXQiLCJyZWR1Y2VkVmFsdWUiLCJpc0FzeW5jRm4iLCJpc1RoZW5hYmxlIiwidGhlbiIsImNhdGNoIiwiX3NldEltbWVkaWF0ZSIsInNldEltbWVkaWF0ZVN1cHBvcnRlZCIsInBvc3RNZXNzYWdlU3VwcG9ydGVkIiwic2V0SW1tZWRpYXRlIiwidG9rZW4iLCJjYWxsYmFja3MiLCJhZGRFdmVudExpc3RlbmVyIiwiZGF0YSIsInNoaWZ0IiwiY2IiLCJwb3N0TWVzc2FnZSIsIk1hdGgiLCJyYW5kb20iLCJzZXRUaW1lb3V0IiwiYXNhcCIsInF1ZXVlTWljcm90YXNrIiwicHJvY2VzcyIsIm5leHRUaWNrIiwiaXNJdGVyYWJsZSIsImhhc093blByb3AiLCJBeGlvc0Vycm9yIiwibWVzc2FnZSIsImNvZGUiLCJjb25maWciLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJjYXB0dXJlU3RhY2tUcmFjZSIsInN0YXR1cyIsInV0aWxzIiwidG9KU09OIiwiZGVzY3JpcHRpb24iLCJudW1iZXIiLCJmaWxlTmFtZSIsImxpbmVOdW1iZXIiLCJjb2x1bW5OdW1iZXIiLCJmcm9tIiwiZXJyb3IiLCJjdXN0b21Qcm9wcyIsImF4aW9zRXJyb3IiLCJjYXVzZSIsImlzVmlzaXRhYmxlIiwicmVtb3ZlQnJhY2tldHMiLCJyZW5kZXJLZXkiLCJwYXRoIiwiZG90cyIsImNvbmNhdCIsImVhY2giLCJqb2luIiwiaXNGbGF0QXJyYXkiLCJzb21lIiwicHJlZGljYXRlcyIsInRlc3QiLCJ0b0Zvcm1EYXRhIiwiZm9ybURhdGEiLCJvcHRpb25zIiwiVHlwZUVycm9yIiwibWV0YVRva2VucyIsImluZGV4ZXMiLCJkZWZpbmVkIiwib3B0aW9uIiwidmlzaXRvciIsImRlZmF1bHRWaXNpdG9yIiwiX0Jsb2IiLCJCbG9iIiwidXNlQmxvYiIsImNvbnZlcnRWYWx1ZSIsInRvSVNPU3RyaW5nIiwiQnVmZmVyIiwiSlNPTiIsInN0cmluZ2lmeSIsImVsIiwiaW5kZXgiLCJleHBvc2VkSGVscGVycyIsImJ1aWxkIiwicG9wIiwiZW5jb2RlIiwiY2hhck1hcCIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1hdGNoIiwiQXhpb3NVUkxTZWFyY2hQYXJhbXMiLCJwYXJhbXMiLCJfcGFpcnMiLCJlbmNvZGVyIiwiX2VuY29kZSIsImJ1aWxkVVJMIiwidXJsIiwic2VyaWFsaXplIiwic2VyaWFsaXplRm4iLCJzZXJpYWxpemVkUGFyYW1zIiwiaGFzaG1hcmtJbmRleCIsIkludGVyY2VwdG9yTWFuYWdlciIsImhhbmRsZXJzIiwidXNlIiwiZnVsZmlsbGVkIiwicmVqZWN0ZWQiLCJzeW5jaHJvbm91cyIsInJ1bldoZW4iLCJlamVjdCIsImlkIiwiY2xlYXIiLCJmb3JFYWNoSGFuZGxlciIsImgiLCJzaWxlbnRKU09OUGFyc2luZyIsImZvcmNlZEpTT05QYXJzaW5nIiwiY2xhcmlmeVRpbWVvdXRFcnJvciIsIlVSTFNlYXJjaFBhcmFtcyIsImlzQnJvd3NlciIsImNsYXNzZXMiLCJwcm90b2NvbHMiLCJoYXNCcm93c2VyRW52IiwiZG9jdW1lbnQiLCJfbmF2aWdhdG9yIiwibmF2aWdhdG9yIiwiaGFzU3RhbmRhcmRCcm93c2VyRW52IiwicHJvZHVjdCIsImhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiIsIldvcmtlckdsb2JhbFNjb3BlIiwiaW1wb3J0U2NyaXB0cyIsIm9yaWdpbiIsImxvY2F0aW9uIiwiaHJlZiIsInBsYXRmb3JtIiwidG9VUkxFbmNvZGVkRm9ybSIsImhlbHBlcnMiLCJpc05vZGUiLCJwYXJzZVByb3BQYXRoIiwiYXJyYXlUb09iamVjdCIsImZvcm1EYXRhVG9KU09OIiwiYnVpbGRQYXRoIiwiaXNOdW1lcmljS2V5IiwiaXNMYXN0IiwiZW50cmllcyIsInN0cmluZ2lmeVNhZmVseSIsInJhd1ZhbHVlIiwicGFyc2VyIiwicGFyc2UiLCJkZWZhdWx0cyIsInRyYW5zaXRpb25hbCIsInRyYW5zaXRpb25hbERlZmF1bHRzIiwiYWRhcHRlciIsInRyYW5zZm9ybVJlcXVlc3QiLCJoZWFkZXJzIiwiY29udGVudFR5cGUiLCJnZXRDb250ZW50VHlwZSIsImhhc0pTT05Db250ZW50VHlwZSIsImlzT2JqZWN0UGF5bG9hZCIsInNldENvbnRlbnRUeXBlIiwiZm9ybVNlcmlhbGl6ZXIiLCJfRm9ybURhdGEiLCJlbnYiLCJ0cmFuc2Zvcm1SZXNwb25zZSIsIkpTT05SZXF1ZXN0ZWQiLCJyZXNwb25zZVR5cGUiLCJzdHJpY3RKU09OUGFyc2luZyIsIkVSUl9CQURfUkVTUE9OU0UiLCJ0aW1lb3V0IiwieHNyZkNvb2tpZU5hbWUiLCJ4c3JmSGVhZGVyTmFtZSIsIm1heENvbnRlbnRMZW5ndGgiLCJtYXhCb2R5TGVuZ3RoIiwidmFsaWRhdGVTdGF0dXMiLCJjb21tb24iLCJtZXRob2QiLCJpZ25vcmVEdXBsaWNhdGVPZiIsInJhd0hlYWRlcnMiLCJwYXJzZWQiLCJsaW5lIiwic3Vic3RyaW5nIiwiJGludGVybmFscyIsIm5vcm1hbGl6ZUhlYWRlciIsImhlYWRlciIsIm5vcm1hbGl6ZVZhbHVlIiwicGFyc2VUb2tlbnMiLCJ0b2tlbnMiLCJ0b2tlbnNSRSIsImlzVmFsaWRIZWFkZXJOYW1lIiwibWF0Y2hIZWFkZXJWYWx1ZSIsImlzSGVhZGVyTmFtZUZpbHRlciIsImZvcm1hdEhlYWRlciIsInciLCJjaGFyIiwiYnVpbGRBY2Nlc3NvcnMiLCJhY2Nlc3Nvck5hbWUiLCJtZXRob2ROYW1lIiwiYXJnMSIsImFyZzIiLCJhcmczIiwiY29uZmlndXJhYmxlIiwiQXhpb3NIZWFkZXJzIiwidmFsdWVPclJld3JpdGUiLCJyZXdyaXRlIiwic2V0SGVhZGVyIiwiX3ZhbHVlIiwiX2hlYWRlciIsIl9yZXdyaXRlIiwibEhlYWRlciIsInNldEhlYWRlcnMiLCJwYXJzZUhlYWRlcnMiLCJkZXN0IiwiZW50cnkiLCJnZXQiLCJoYXMiLCJtYXRjaGVyIiwiZGVsZXRlIiwiZGVsZXRlZCIsImRlbGV0ZUhlYWRlciIsIm5vcm1hbGl6ZSIsImZvcm1hdCIsIm5vcm1hbGl6ZWQiLCJ0YXJnZXRzIiwiYXNTdHJpbmdzIiwiZ2V0U2V0Q29va2llIiwiZmlyc3QiLCJjb21wdXRlZCIsImFjY2Vzc29yIiwiaW50ZXJuYWxzIiwiYWNjZXNzb3JzIiwiZGVmaW5lQWNjZXNzb3IiLCJtYXBwZWQiLCJoZWFkZXJWYWx1ZSIsInRyYW5zZm9ybURhdGEiLCJmbnMiLCJ0cmFuc2Zvcm0iLCJpc0NhbmNlbCIsIl9fQ0FOQ0VMX18iLCJDYW5jZWxlZEVycm9yIiwiRVJSX0NBTkNFTEVEIiwic2V0dGxlIiwicmVzb2x2ZSIsInJlamVjdCIsIkVSUl9CQURfUkVRVUVTVCIsImZsb29yIiwicGFyc2VQcm90b2NvbCIsInNwZWVkb21ldGVyIiwic2FtcGxlc0NvdW50IiwibWluIiwiYnl0ZXMiLCJ0aW1lc3RhbXBzIiwiaGVhZCIsInRhaWwiLCJmaXJzdFNhbXBsZVRTIiwiY2h1bmtMZW5ndGgiLCJub3ciLCJEYXRlIiwic3RhcnRlZEF0IiwiYnl0ZXNDb3VudCIsInBhc3NlZCIsInJvdW5kIiwidGhyb3R0bGUiLCJmcmVxIiwidGltZXN0YW1wIiwidGhyZXNob2xkIiwibGFzdEFyZ3MiLCJ0aW1lciIsImludm9rZSIsImFyZ3MiLCJjbGVhclRpbWVvdXQiLCJ0aHJvdHRsZWQiLCJmbHVzaCIsInByb2dyZXNzRXZlbnRSZWR1Y2VyIiwibGlzdGVuZXIiLCJpc0Rvd25sb2FkU3RyZWFtIiwiYnl0ZXNOb3RpZmllZCIsIl9zcGVlZG9tZXRlciIsImxvYWRlZCIsInRvdGFsIiwibGVuZ3RoQ29tcHV0YWJsZSIsInByb2dyZXNzQnl0ZXMiLCJyYXRlIiwiaW5SYW5nZSIsInByb2dyZXNzIiwiZXN0aW1hdGVkIiwiZXZlbnQiLCJwcm9ncmVzc0V2ZW50RGVjb3JhdG9yIiwiYXN5bmNEZWNvcmF0b3IiLCJpc01TSUUiLCJVUkwiLCJwcm90b2NvbCIsImhvc3QiLCJwb3J0IiwidXNlckFnZW50Iiwid3JpdGUiLCJleHBpcmVzIiwiZG9tYWluIiwic2VjdXJlIiwiY29va2llIiwidG9HTVRTdHJpbmciLCJyZWFkIiwiUmVnRXhwIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicmVtb3ZlIiwiaXNBYnNvbHV0ZVVSTCIsImNvbWJpbmVVUkxzIiwiYmFzZVVSTCIsInJlbGF0aXZlVVJMIiwiYnVpbGRGdWxsUGF0aCIsInJlcXVlc3RlZFVSTCIsImFsbG93QWJzb2x1dGVVcmxzIiwiaXNSZWxhdGl2ZVVybCIsImhlYWRlcnNUb09iamVjdCIsIm1lcmdlQ29uZmlnIiwiY29uZmlnMSIsImNvbmZpZzIiLCJnZXRNZXJnZWRWYWx1ZSIsIm1lcmdlRGVlcFByb3BlcnRpZXMiLCJ2YWx1ZUZyb21Db25maWcyIiwiZGVmYXVsdFRvQ29uZmlnMiIsIm1lcmdlRGlyZWN0S2V5cyIsIm1lcmdlTWFwIiwicGFyYW1zU2VyaWFsaXplciIsInRpbWVvdXRNZXNzYWdlIiwid2l0aENyZWRlbnRpYWxzIiwid2l0aFhTUkZUb2tlbiIsIm9uVXBsb2FkUHJvZ3Jlc3MiLCJvbkRvd25sb2FkUHJvZ3Jlc3MiLCJkZWNvbXByZXNzIiwiYmVmb3JlUmVkaXJlY3QiLCJ0cmFuc3BvcnQiLCJodHRwQWdlbnQiLCJodHRwc0FnZW50IiwiY2FuY2VsVG9rZW4iLCJzb2NrZXRQYXRoIiwicmVzcG9uc2VFbmNvZGluZyIsImNvbXB1dGVDb25maWdWYWx1ZSIsImNvbmZpZ1ZhbHVlIiwibmV3Q29uZmlnIiwiYXV0aCIsImJ0b2EiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwidW5lc2NhcGUiLCJCb29sZWFuIiwiaXNVUkxTYW1lT3JpZ2luIiwieHNyZlZhbHVlIiwiY29va2llcyIsImlzWEhSQWRhcHRlclN1cHBvcnRlZCIsIlhNTEh0dHBSZXF1ZXN0IiwiUHJvbWlzZSIsImRpc3BhdGNoWGhyUmVxdWVzdCIsIl9jb25maWciLCJyZXNvbHZlQ29uZmlnIiwicmVxdWVzdERhdGEiLCJyZXF1ZXN0SGVhZGVycyIsIm9uQ2FuY2VsZWQiLCJ1cGxvYWRUaHJvdHRsZWQiLCJkb3dubG9hZFRocm90dGxlZCIsImZsdXNoVXBsb2FkIiwiZmx1c2hEb3dubG9hZCIsInVuc3Vic2NyaWJlIiwic2lnbmFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9wZW4iLCJvbmxvYWRlbmQiLCJyZXNwb25zZUhlYWRlcnMiLCJnZXRBbGxSZXNwb25zZUhlYWRlcnMiLCJyZXNwb25zZURhdGEiLCJyZXNwb25zZVRleHQiLCJzdGF0dXNUZXh0IiwiX3Jlc29sdmUiLCJfcmVqZWN0IiwiZXJyIiwib25yZWFkeXN0YXRlY2hhbmdlIiwiaGFuZGxlTG9hZCIsInJlYWR5U3RhdGUiLCJyZXNwb25zZVVSTCIsIm9uYWJvcnQiLCJoYW5kbGVBYm9ydCIsIkVDT05OQUJPUlRFRCIsIm9uZXJyb3IiLCJoYW5kbGVFcnJvciIsIkVSUl9ORVRXT1JLIiwib250aW1lb3V0IiwiaGFuZGxlVGltZW91dCIsInRpbWVvdXRFcnJvck1lc3NhZ2UiLCJFVElNRURPVVQiLCJzZXRSZXF1ZXN0SGVhZGVyIiwidXBsb2FkIiwiY2FuY2VsIiwiYWJvcnQiLCJzdWJzY3JpYmUiLCJhYm9ydGVkIiwic2VuZCIsImNvbXBvc2VTaWduYWxzIiwic2lnbmFscyIsImNvbnRyb2xsZXIiLCJBYm9ydENvbnRyb2xsZXIiLCJyZWFzb24iLCJzdHJlYW1DaHVuayIsImNodW5rIiwiY2h1bmtTaXplIiwiYnl0ZUxlbmd0aCIsInBvcyIsImVuZCIsInJlYWRCeXRlcyIsIml0ZXJhYmxlIiwicmVhZFN0cmVhbSIsInN0cmVhbSIsImFzeW5jSXRlcmF0b3IiLCJyZWFkZXIiLCJnZXRSZWFkZXIiLCJ0cmFja1N0cmVhbSIsIm9uUHJvZ3Jlc3MiLCJvbkZpbmlzaCIsIl9vbkZpbmlzaCIsIlJlYWRhYmxlU3RyZWFtIiwicHVsbCIsImNsb3NlIiwibG9hZGVkQnl0ZXMiLCJlbnF1ZXVlIiwicmV0dXJuIiwiaGlnaFdhdGVyTWFyayIsImlzRmV0Y2hTdXBwb3J0ZWQiLCJmZXRjaCIsIlJlcXVlc3QiLCJSZXNwb25zZSIsImlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQiLCJlbmNvZGVUZXh0IiwiVGV4dEVuY29kZXIiLCJhcnJheUJ1ZmZlciIsInN1cHBvcnRzUmVxdWVzdFN0cmVhbSIsImR1cGxleEFjY2Vzc2VkIiwiaGFzQ29udGVudFR5cGUiLCJib2R5IiwiZHVwbGV4IiwiREVGQVVMVF9DSFVOS19TSVpFIiwic3VwcG9ydHNSZXNwb25zZVN0cmVhbSIsInJlc29sdmVycyIsInJlcyIsIl8iLCJFUlJfTk9UX1NVUFBPUlQiLCJnZXRCb2R5TGVuZ3RoIiwic2l6ZSIsIl9yZXF1ZXN0IiwicmVzb2x2ZUJvZHlMZW5ndGgiLCJnZXRDb250ZW50TGVuZ3RoIiwiZmV0Y2hPcHRpb25zIiwiY29tcG9zZWRTaWduYWwiLCJ0b0Fib3J0U2lnbmFsIiwicmVxdWVzdENvbnRlbnRMZW5ndGgiLCJjb250ZW50VHlwZUhlYWRlciIsImlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQiLCJjcmVkZW50aWFscyIsImlzU3RyZWFtUmVzcG9uc2UiLCJyZXNwb25zZUNvbnRlbnRMZW5ndGgiLCJrbm93bkFkYXB0ZXJzIiwiaHR0cCIsImh0dHBBZGFwdGVyIiwieGhyIiwieGhyQWRhcHRlciIsImZldGNoQWRhcHRlciIsInJlbmRlclJlYXNvbiIsImlzUmVzb2x2ZWRIYW5kbGUiLCJnZXRBZGFwdGVyIiwiYWRhcHRlcnMiLCJuYW1lT3JBZGFwdGVyIiwicmVqZWN0ZWRSZWFzb25zIiwicmVhc29ucyIsInN0YXRlIiwicyIsInRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQiLCJ0aHJvd0lmUmVxdWVzdGVkIiwiZGlzcGF0Y2hSZXF1ZXN0Iiwib25BZGFwdGVyUmVzb2x1dGlvbiIsIm9uQWRhcHRlclJlamVjdGlvbiIsIlZFUlNJT04iLCJ2YWxpZGF0b3JzIiwidmFsaWRhdG9yIiwiZGVwcmVjYXRlZFdhcm5pbmdzIiwidmVyc2lvbiIsImZvcm1hdE1lc3NhZ2UiLCJvcHQiLCJkZXNjIiwib3B0cyIsIkVSUl9ERVBSRUNBVEVEIiwiY29uc29sZSIsIndhcm4iLCJzcGVsbGluZyIsImNvcnJlY3RTcGVsbGluZyIsImFzc2VydE9wdGlvbnMiLCJzY2hlbWEiLCJhbGxvd1Vua25vd24iLCJFUlJfQkFEX09QVElPTl9WQUxVRSIsIkVSUl9CQURfT1BUSU9OIiwiQXhpb3MiLCJpbnN0YW5jZUNvbmZpZyIsImludGVyY2VwdG9ycyIsImNvbmZpZ09yVXJsIiwiZHVtbXkiLCJib29sZWFuIiwiZnVuY3Rpb24iLCJiYXNlVXJsIiwid2l0aFhzcmZUb2tlbiIsImNvbnRleHRIZWFkZXJzIiwicmVxdWVzdEludGVyY2VwdG9yQ2hhaW4iLCJzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMiLCJ1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyIsImludGVyY2VwdG9yIiwidW5zaGlmdCIsInJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiIsInB1c2hSZXNwb25zZUludGVyY2VwdG9ycyIsInByb21pc2UiLCJjaGFpbiIsIm9uRnVsZmlsbGVkIiwib25SZWplY3RlZCIsImdldFVyaSIsImZ1bGxQYXRoIiwiZm9yRWFjaE1ldGhvZE5vRGF0YSIsImZvckVhY2hNZXRob2RXaXRoRGF0YSIsImdlbmVyYXRlSFRUUE1ldGhvZCIsImlzRm9ybSIsImh0dHBNZXRob2QiLCJDYW5jZWxUb2tlbiIsImV4ZWN1dG9yIiwicmVzb2x2ZVByb21pc2UiLCJwcm9taXNlRXhlY3V0b3IiLCJfbGlzdGVuZXJzIiwib25mdWxmaWxsZWQiLCJzcGxpY2UiLCJjIiwic3ByZWFkIiwiY2FsbGJhY2siLCJpc0F4aW9zRXJyb3IiLCJwYXlsb2FkIiwiSHR0cFN0YXR1c0NvZGUiLCJDb250aW51ZSIsIlN3aXRjaGluZ1Byb3RvY29scyIsIlByb2Nlc3NpbmciLCJFYXJseUhpbnRzIiwiT2siLCJDcmVhdGVkIiwiQWNjZXB0ZWQiLCJOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb24iLCJOb0NvbnRlbnQiLCJSZXNldENvbnRlbnQiLCJQYXJ0aWFsQ29udGVudCIsIk11bHRpU3RhdHVzIiwiQWxyZWFkeVJlcG9ydGVkIiwiSW1Vc2VkIiwiTXVsdGlwbGVDaG9pY2VzIiwiTW92ZWRQZXJtYW5lbnRseSIsIkZvdW5kIiwiU2VlT3RoZXIiLCJOb3RNb2RpZmllZCIsIlVzZVByb3h5IiwiVW51c2VkIiwiVGVtcG9yYXJ5UmVkaXJlY3QiLCJQZXJtYW5lbnRSZWRpcmVjdCIsIkJhZFJlcXVlc3QiLCJVbmF1dGhvcml6ZWQiLCJQYXltZW50UmVxdWlyZWQiLCJGb3JiaWRkZW4iLCJOb3RGb3VuZCIsIk1ldGhvZE5vdEFsbG93ZWQiLCJOb3RBY2NlcHRhYmxlIiwiUHJveHlBdXRoZW50aWNhdGlvblJlcXVpcmVkIiwiUmVxdWVzdFRpbWVvdXQiLCJDb25mbGljdCIsIkdvbmUiLCJMZW5ndGhSZXF1aXJlZCIsIlByZWNvbmRpdGlvbkZhaWxlZCIsIlBheWxvYWRUb29MYXJnZSIsIlVyaVRvb0xvbmciLCJVbnN1cHBvcnRlZE1lZGlhVHlwZSIsIlJhbmdlTm90U2F0aXNmaWFibGUiLCJFeHBlY3RhdGlvbkZhaWxlZCIsIkltQVRlYXBvdCIsIk1pc2RpcmVjdGVkUmVxdWVzdCIsIlVucHJvY2Vzc2FibGVFbnRpdHkiLCJMb2NrZWQiLCJGYWlsZWREZXBlbmRlbmN5IiwiVG9vRWFybHkiLCJVcGdyYWRlUmVxdWlyZWQiLCJQcmVjb25kaXRpb25SZXF1aXJlZCIsIlRvb01hbnlSZXF1ZXN0cyIsIlJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZSIsIlVuYXZhaWxhYmxlRm9yTGVnYWxSZWFzb25zIiwiSW50ZXJuYWxTZXJ2ZXJFcnJvciIsIk5vdEltcGxlbWVudGVkIiwiQmFkR2F0ZXdheSIsIlNlcnZpY2VVbmF2YWlsYWJsZSIsIkdhdGV3YXlUaW1lb3V0IiwiSHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQiLCJWYXJpYW50QWxzb05lZ290aWF0ZXMiLCJJbnN1ZmZpY2llbnRTdG9yYWdlIiwiTG9vcERldGVjdGVkIiwiTm90RXh0ZW5kZWQiLCJOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZCIsImNyZWF0ZUluc3RhbmNlIiwiZGVmYXVsdENvbmZpZyIsImluc3RhbmNlIiwiYXhpb3MiLCJDYW5jZWwiLCJhbGwiLCJwcm9taXNlcyIsImZvcm1Ub0pTT04iLCJkZWZhdWx0Iiwic2VydmVyVXJsQXBpIiwic2VydmVyVXJsSW1hZ2UiLCJVcGxvYWRTaW5nbGVJbWFnZSIsInByb3BlcnR5IiwiZmlsZVVwbG9hZCIsImZpbGUiLCJwb3N0IiwibG9nIiwicmVjb3JkIiwiQm94IiwiRHJvcFpvbmUiLCJvbkNoYW5nZSIsInZhbGlkYXRlIiwibWF4U2l6ZSIsIm1pbWVUeXBlcyIsIlZpZXdTaW5nbGVJbWFnZSIsImltYWdlVXJsIiwiaW1hZ2UiLCJzcmMiLCJhbHQiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiYm9yZGVyUmFkaXVzIiwiQ3JlYXRlU3RyaW5nTGlzdCIsIml0ZW1zIiwic2V0SXRlbXMiLCJ1c2VTdGF0ZSIsImlucHV0VmFsdWUiLCJ1c2VSZWYiLCJhZGRJdGVtIiwiY3VycmVudCIsInVwZGF0ZWQiLCJyZW1vdmVJdGVtIiwidXNlRWZmZWN0IiwiTGFiZWwiLCJsYWJlbCIsImZsZXgiLCJhbGlnbkl0ZW1zIiwiZ2FwIiwiSW5wdXQiLCJyZWYiLCJwbGFjZWhvbGRlciIsIkJ1dHRvbiIsIm1hcmdpbkxlZnQiLCJ2YXJpYW50Iiwib25DbGljayIsIm10IiwiaXRlbSIsIlN0cmluZ0xpc3RWaWV3IiwiRGVzY3JpcHRpb25SaWNoVGV4dCIsInNldFZhbHVlIiwic2F2ZURlc2NyaXB0aW9uIiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwibWFyZ2luQm90dG9tIiwiUmljaFRleHRFZGl0b3IiLCJjb250ZW50dCIsIktleVZhbHVlTGlzdCIsInNldEVudHJpZXMiLCJrZXlSZWYiLCJ2YWx1ZVJlZiIsInJlbW92ZUVudHJ5IiwiVXBsb2FkTXVsdGlwbGVJbWFnZSIsImZpbGVzIiwiaW1hZ2VzIiwiZjEiLCJtdWx0aXBsZSIsIlNpemVDb2xvclN0b2NrIiwic2l6ZVJlZiIsImNvbG9yUmVmIiwiY29sb3JOYW1lUmVmIiwic3RvY2tSZWYiLCJjb2xvciIsImNvbG9yTmFtZSIsInN0b2NrIiwibXgiLCJTaXplQ2hhcnQiLCJidXN0UmVmIiwid2Fpc3RSZWYiLCJoaXBSZWYiLCJidXN0Iiwid2Fpc3QiLCJoaXAiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJWaWV3U3RyaW5nTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUVBLFNBQVNBLGtCQUFrQkEsR0FBRztFQUM1QixFQUFBLG9CQUFPQyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsRUFBSyxvQkFBdUIsQ0FBQztFQUN0Qzs7RUNGZSxTQUFTQyxJQUFJQSxDQUFDQyxFQUFFLEVBQUVDLE9BQU8sRUFBRTtJQUN4QyxPQUFPLFNBQVNDLElBQUlBLEdBQUc7RUFDckIsSUFBQSxPQUFPRixFQUFFLENBQUNHLEtBQUssQ0FBQ0YsT0FBTyxFQUFFRyxTQUFTLENBQUM7SUFDckMsQ0FBQztFQUNIOztFQ0ZBOztFQUVBLE1BQU07RUFBQ0MsRUFBQUE7RUFBUSxDQUFDLEdBQUdDLE1BQU0sQ0FBQ0MsU0FBUztFQUNuQyxNQUFNO0VBQUNDLEVBQUFBO0VBQWMsQ0FBQyxHQUFHRixNQUFNO0VBQy9CLE1BQU07SUFBQ0cs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
