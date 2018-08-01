var ices1 = function() {

  // 均分数组
  let chunk = (array, size = 1) => {
    let len = array.length
    let arr = []

    if (size === 0) return arr

    for (let i = 0; i < len; i += size) {
      arr.push(array.slice(i, i + size))
    }

    return arr
  }

  //去除false、 null、 NaN 等特定值
  let compact = array => {
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
  }

  //连接数组
  let concat = (array, ...args) => {
    let len = args.length
    let arr = []
    arr.push(...array)

    for (let i = 0; i < len; i++) {
      if (typeof (args[i]) == 'object') {
        arr.push(...args[i])
      } else {
        arr.push(args[i])
      }
    }

    return arr
  }

  //根据后面数组，移除与前 array 中相同项
  let difference = (array, ...args) => {
    args = concat([], ...args)
    let len = array.length
    let lenFit = args.length
    var arr = []

    for (var i = 0; i < len; i++) {
      if (!args.includes(array[i])) {
        arr.push(array[i])
      }
    }

    return arr
  }


  // 改进 differenceBy
  let differenceBy = (array, ...args) => {
    let result = diff = []
    let iter = null

    if(!Array.isArray(args[args.length - 1])) {
        iter = args.pop()
    } 
    iter = ices1.iteratee(iter)   
    // 参数归一 

    diff = [].concat(...args).map(iter)
    result = array.filter(item => !diff.includes(iter(item)))

    return result
  }

  // 根据 iteratee 移除 array (旧版)
  function old_DifferenceBy(array, ...args){
    let iter = args[args.length - 1]
    if(Array.isArray(iter)) {
        values = [].concat(...args)
    } else {
        values = [].concat(...args)
        values.pop()
    }
    iter = iteratee(iter)   //参数归一
    let res = []
    
    let diff = []
    for(let j = 0; j < values.length; j++) {
        diff.push(iter(values[j]))
    }
    for(let i = 0; i < array.length; i++) {
        if(!diff.includes(iter(array[i]))) {
            res.push(array[i])
        }
    }

    return res
}



  //截选 ary 第 n 后几个元素
  let drop = (ary, n = 1) => {
    let res = []

    n = n < 0 ? 0 : n
    for (var i = n; i < ary.length; i++) {
      res.push(ary[i])
    }

    return res
  }

  //截选 ary 倒数第 n 前几个
  let dropRight = (ary, n = 1) => {
    let res = []
    let len = ary.length - 1

    n = n < 1 ? 0 : n
    for (var i = len - n; i >= 0; i--) {
      res.unshift(ary[i])
    }

    return res
  }

  //数组 内容 填充
  let fill = (ary, val, start = 0, end = ary.length) => {

    end = end > ary.length ? ary.length : end
    for (var i = start; i < end; i++) {
      ary[i] = val
    }

    return ary
  }

  //ary 转 val 一层
  let flatten = ary => {
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
  }

  //数组深度拆分
  let flattenDeep = ary => {
    var result = []

    for (var i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i])) {
        var tmp = flattenDeep(ary[i])
        result.push(...tmp)
      } else {
        result.push(ary[i])
      }
    }

    return result
  }

  //数组深度拆分, 分级拆分
  let flattenDepth = (ary, depth = 1) => {
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
  }
  
  // join: ary -> str
  let join = (ary, separator=',') => {
    let res = ''

    for(let i = 0; i < ary.length; i++) {
      res += i < ary.length - 1 ? ary[i] + '' + separator : ary[i]
    }

    return res
  }

  // last: get last one
  let last = ary => ary[ary.length - 1]

  // lastIndexOf: get val index
  let lastIndexOf = (ary, val, fromIndex = ary.length - 1) => {
    for(let i = fromIndex; i > -1; i--) {
      if(ary[i] === val) {
        return i
      }
    }

    return -1
  }

  // nth: get val by .
  let nth = (ary, n = 0) => n >= 0 ? ary[n] : ary[ary.length + n]
  
  //pull: removes all given values from array
  let pull = (ary,...args) => {
    for(let i = 0; i < ary.length; i++) {
      if(args.includes(ary[i])) {
        ary.splice(i, 1)
        i--
      }
    }

    return ary
  }   

  //pullAll: removes all given values from array
  let pullAll = (ary, rmary) => {
    for(let i = 0; i < ary.length; i++) {
      if(rmary.includes(ary[i])) {
        ary.splice(i, 1)
        i--
      }
    }

    return ary
  }  

  // pullAt: removes all given values By index
  let pullAt = (ary, indexs) => {
    let res = []
    if(Array.isArray(indexs)) {
      res = indexs.map( x => ary[x])
      indexs.sort((a, b) => b - a).map( x => (ary.splice(x, 1)))
    } else {
      res.push(ary.splice(indexs, 1))
    }

    return res
  }

  // remove: removes all elements from ary (by function)
  let remove = (ary, func = () => 1) => ary.filter(func)

  // reverse: reverse
  let reverse = ary => ary.map((_, index) => ary[ary.length - index - 1])

  // slice: slice
  let slice = (ary, start = 0, end = ary.length) => ary.reduce((res, _, index) => 
    {
      if(index >= start && index < end) res.push(ary[index])
      return res 
    },[])

  // sortedIndex: sortedIndex
  let sortedIndex = (ary, val) => {
    for(let i = 0; i < ary.length; i++) {
      if(val <= ary[i]) {
        return i
      }
    }

    return ary.length
  } 

  //without: removes all given values from array
  let without = (ary,...args) => {
    let res = []
    for(let i = 0; i < ary.length; i++) {
      if(!args.includes(ary[i])) {
        res.push(ary[i])
      }
    }

    return res
  }

  //数组对 转 对象
  let fromPairs = args => {
    let obj = {}

    for (let i = 0; i < args.length; i++) {
      obj[args[i][0]] = args[i][1]
    }

    return obj
  }

  //获取 ary 第一个值
  let head = ary => ary[0]

  //在 ary 寻找 val 
  let indexOf = (ary, val, start = 0) => {
    for (var i = start; i < ary.length; i++) {
      if (ary[i] === val) {
        return i
      }
    }

    return -1
  }

  //取除 最后一元素外 ary 切片
  let initial = ary => ary.slice(0, ary.length - 1)

  //求 多个 ary 交集
  let intersection = (...args) => {
    let result = []
    let tmp = []

    for (let i = 1; i < args.length; i++) {
      tmp = tmp.concat(args[i])
    }

    for (var i = 0; i < args[0].length; i++) {
      if (tmp.includes(args[0][i])) {
        result.push(args[0][i])
      }
    }

    return result
  }



  //字符串转数字
  let parseInt = str => {
    let tmp = ''

    for(let i = 0;i < str.length; i++) {
      if(+str[i] !== +str[i]) {
        break
      }
      tmp += str[i]
    }

    return +tmp | 0
  }

  //重复字符串
  let repeat = (string = '', n = 1) => {
    let s = ''

    for (let i = 0; i < n; i++) {
      s += string
    }

    return s
  }


  // 创建一个只能传一个参数的函数
  let unary = func => val => func(val)

  // 传入值结果取反
  let negate = f => (...args) => !f(...args)

  // sumBy
  let sumBy = (ary, iter) => ary.reduce((pre, cur) => pre + ices1.iteratee(iter)(cur), 0)



  // 辅助 函数
  let iteratee = iter => {
    if(typeof iter === 'function') {
        return iter
    } else if (typeof iter === 'string') {
        return function(obj) {
            return obj[iter]
        }
    } else {
        return it => it
    }
  }


  return {

    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy: differenceBy,
// differenceWith: differenceWith,
    drop: drop,
    dropRight: dropRight,
// dropRightWhile: dropRightWhile,
// dropWhile: dropWhile,
    fill: fill,
// findIndex: findIndex,
// findLastIndex: findLastIndex,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    // intersectionBy: intersectionBy,
    // intersectionWith: intersectionWith,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    // pullAllBy: pullAllBY,
    // pullAllWith: pullAllWith,
    pullAt: pullAt,
    remove: remove,
    reverse: reverse,
    slice: slice,
    sortedIndex: sortedIndex,
  // sortedIndexBy: sortedIndexBy,
  // sortedIndexOf: sortedIndexOf,



    without: without,
    parseInt: parseInt,
    repeat: repeat,
    unary: unary,
    negate:negate,
    sumBy: sumBy,
    // isEqual: isEqual,
    //辅助函数
    iteratee: iteratee,
  }






}()