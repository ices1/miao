var ices1 = {

  // 均分数组
  chunk: function(array, size = 1) {
    let len = array.length
    let arr = []

    if(size === 0) return arr

      for (let i = 0; i < len; i += size) {
        arr.push(array.slice(i, i + size))
      }

      return arr
    },

  //去除false、 null、 NaN 等特定值
  compact: function(array) {
    let len = array.length

    for (let i = 0; i < len; i++) {
      if(array[i] === '' || array[i] === 0 || array[i] == 
        null || array[i] !== array[i] || array[i] === false) {
        array.splice(i, 1)
        i--
        len--
      }
    }

    return array
  },

  //连接数组
  concat: function (array) {
    let len = arguments.length
    let arr = []

    for (let i = 0; i < len; i++) {
      if(typeof(arguments[i]) == 'object') {
        arr.push(...arguments[i])
      } else {
        arr.push(arguments[i])
      }
    }

    return arr
  },
  
  //根据后面数组，移除与前 array 中相同项
  difference: function (array, arrFit = []) {
    let len = array.length
    let lenFit = arrFit.length
    var arr = []

    for (var i = 0; i < len; i++) {
      if (!arrFit.includes(array[i])) {
        arr.push(array[i])
      }
    }

    for (var i = 2; i < arguments.length; i++) {
      arr = difference(arr, arguments[i])
    }

    return arr
  },

  // 创建一个只能传一个参数的函数
  unary: function (func) {
    return function(val) {
      return func(val)
    }
  },

  // 传入值结果取反
  negate: function(f) {
    return function (...args) {
      return !f(...args)
    }
  },

}