var ices1 = {

  // 均分数组
  chunk: function (array, size = 1) {
    let len = array.length
    let arr = []

    if (size === 0) return arr

    for (let i = 0; i < len; i += size) {
      arr.push(array.slice(i, i + size))
    }

    return arr
  },

  //去除false、 null、 NaN 等特定值
  compact: function (array) {
    let len = array.length

    for (let i = 0; i < len; i++) {
      if (array[i] === '' || array[i] === 0 || array[i] ==
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
      if (typeof (arguments[i]) == 'object') {
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
      arr = ices1.difference(arr, arguments[i])
    }

    return arr
  },

  //截选 ary 第 n 后几个元素
  drop: (ary, n = 1) => {
    let res = []

    n = n < 0 ? 0 : n
    for (var i = n; i < ary.length; i++) {
      res.push(ary[i])
    }

    return res
  },

  //截选 ary 倒数第 n 前几个
  dropRight: (ary, n = 1) => {
    let res = []
    let len = ary.length - 1

    n = n < 1 ? 0 : n
    for (var i = len - n; i >= 0; i--) {
      res.unshift(ary[i])
    }

    return res
  },

  //数组 内容 填充
  fill: (ary, val, start = 0, end = ary.length) => {

    end = end > ary.length ? ary.length : end
    for (var i = start; i < end; i++) {
      ary[i] = val
    }

    return ary
  },

  //ary 转 val 一层
  flatten: (ary) => {
    let res = []
    let len = ary.length

    for (var i = 0; i < len; i++) {
      if (typeof (ary[i]) == 'object') {
        res.push(...ary[i])
      } else {
        res.push(ary[i])
      }
    }

    return res
  },

  //数组深度拆分
  flattenDeep: ary => {
    var result = []

    for (var i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i])) {
        var tmp = ices1.flattenDeep(ary[i])
        result.push(...tmp)
      } else {
        result.push(ary[i])
      }
    }

    return result
  },

  //数组深度拆分, 分级拆分
  flattenDepth: (ary, depth = 1) => {
    if (depth === 0) {
      return ary.slice()
    }

    var result = []

    for (var i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i])) {
        var tmp = ices1.flattenDepth(ary[i], depth - 1)
        result.push(...tmp)
      } else {
        result.push(ary[i])
      }
    }

    return result
  },

  //数组对 转 对象
  fromPairs: (args) => {
    let obj = {}

    for (let i = 0; i < args.length; i++) {
      obj[args[i][0]] = args[i][1]
    }

    return obj
  },

  //获取 ary 第一个值
  head: ary => ary[0],

  //在 ary 寻找 val 
  indexOf: (ary, val, start = 0) => {
    for (var i = start; i < ary.length; i++) {
      if (ary[i] === val) {
        return i
      }
    }

    return -1
  },

  //取除 最后一元素外 ary 切片
  initial: ary => ary.slice(0, ary.length - 1),

  //求 多个 ary 交集
  intersection: function (ary) {
    let result = []
    let tmp = []

    for (let i = 1; i < arguments.length; i++) {
      tmp = tmp.concat(arguments[i])
    }

    for (var i = 0; i < arguments[0].length; i++) {
      if (!tmp.includes(arguments[0][i])) {
        result.push(arguments[0][i])
      }
    }

    return result
  },











  //字符串转数字
  parseInt: str => +str | 0,

  //重复字符串
  repeat: function (string = '', n = 1) {
    let s = ''

    for (let i = 0; i < n; i++) {
      s += string
    }

    return s
  },


  // 创建一个只能传一个参数的函数
  unary: function (func) {
    return function (val) {
      return func(val)
    }
  },



  // 传入值结果取反
  negate: function (f) {
    return function (...args) {
      return !f(...args)
    }
  },







}