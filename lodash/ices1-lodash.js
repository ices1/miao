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
  
/* ----------------String-------------- */

  // camelCase
  let camelCase = str => formatString(str).reduce((pre, cur) => pre ? pre + cur[0].toUpperCase() + cur.slice(1).toLowerCase(): cur.toLowerCase(),'')
  // 高阶
  // let camelCase = str => {
    // str.replace(/^[\_\-]+|[\_\-]+$/g,'')
    // let ary = str.match(/[^_ \-\  \　]+/g,'')
    // let res = ary[0].toLowerCase()

    // for(let i = 1; i < ary.length; i++) {
    //   res += ary[i][0].toUpperCase() + ary[i].slice(1).toLowerCase()
    // }
    
    // return res


  // }

  // capitalize
  let capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase()

  // endsWith
  let endsWith = (str, word, idx = str.length) => {
    return str[idx - 1] == word
  }
  // escape
  let escape = str => {
    let res = ''
    let obj = {"&": "&amp;","<": "&lt;",">": "&gt;","'": "&#39;",'"': "&quot;"}
    for(let i = 0; i < str.length; i++) {
      if(str[i] in obj) {
        res += obj[str[i]]
      } else {
        res += str[i]
      }
    }

    return res
  }

  // escapeRegExp
  let escapeRegExp = str => {
    let ary = ["^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", "|"]
    let res = ''

    for(let i = 0; i < str.length; i++) {
      if(ary.includes(str[i])) {
        res += '\\' + str[i]
      }else {
        res += str[i]
      }
    }

    return res
  }

  //kebabCase
  let kebabCase = str => {
    let res = ''

    if(str.match(/\W|\_/g) == null) {
      for(let i = 0; i < str.length; i++) {
        if(str[i].charCodeAt() < 97) {
          res += '-' + str[i].toLowerCase()
        } else {
          res += str[i]
        }
      }
    } else {
      res = str.replace(/^(\_+)|(\_+)$/g, '').replace(/\W+|(\_)+/g, '-').toLowerCase()
    }

    return res
  }

  // lowerCase
  let lowerCase = str => {
    let res = ''
    if(str.replace(/[\_\- 　]+/g, '') == str) {
      for(let i = 0; i < str.length; i++) {
        if(str[i].charCodeAt() < 97) {
          res += ' ' + str[i].toLowerCase()
        } else {
          res += str[i]
        }
      }
    } else {
      res = str.match(/[^\_\- 　]+/g).map(x => x.toLowerCase()).join(' ')
    }

    return res
  }
  // lowerFirst
  let lowerFirst = str  => str[0].toLowerCase() + str.slice(1)

  // pad
  let pad = (str = '', l = 0, chars = ' ') => {
    let len = str.length
    if(l <= len || chars == '') return str
    let head = Math.floor((l - len) / 2)
    let tail = Math.ceil((l - len) / 2)
    let s = chars.repeat(Math.ceil(tail / chars.length))

    return s.slice(0, head) + str + s.slice(0, tail)
  }

  // padEnd
  let padEnd = (str = '', l = 0, chars = ' ') => {
    let len = str.length
    if(l <= len || chars == '') return str
    let tail = l - len
    let s = chars.repeat(Math.ceil(tail / chars.length))

    return str + s.slice(0, tail)
  }

  // padStart
  let padStart = (str = '', l = 0, chars = ' ') => {
    let len = str.length
    if(l <= len || chars == '') return str
    let head = l - len
    let s = chars.repeat(Math.ceil(head / chars.length))

    return s.slice(0, head) + str
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

  // replace
  let replace = (str, pat, rep) => str.replace(new RegExp(pat), rep)

  // snakeCase
  let snakeCase = str => formatString(str).map(x => x.toLowerCase()).join('_')

  // split
  let split = (str,...args) => str.split(...args)

  // startCase
  let startCase = str => {
    let ary = formatString(str)
    if (ary[0].charCodeAt() < 97) return ary.join(' ')
    let res = ary.map(it => it[0].toUpperCase() + it.slice(1).toLowerCase())

    return res.join(' ')
  }

  // startsWith
  let startsWith = (str, start, pos = 0) => str[pos] === start

  // template
  // let template = (str, opt) => {}

  // toLower
  let toLower = str => str.toLowerCase()

  // toUpper
  let toUpper = str => str.toUpperCase()

  // trim
  let trim = (str, chars = ' ') => {
    chr = chars >= 0 ? '\\s' : chars.split('').map(x => x == ' ' ? '\\s' : ('\\' + x)).join('')
    re = new RegExp(`^[${chr}]+|[${chr}]+$`,'g')

    return str.replace(re, '')
  }

  // trimEnd
  let trimEnd = (str, chars = ' ') => {
    chr = chars >= 0 ? '\\s' : chars.split('').map(x => x == ' ' ? '\\s' : ('\\' + x)).join('')
    re = new RegExp(`[${chr}]+$`,'g')

    return str.replace(re, '')
  }

  // trimStart
  let trimStart = (str, chars = ' ') => {
    chr = chars >= 0 ? '\\s' : chars.split('').map(x => x == ' ' ? '\\s' : ('\\' + x)).join('')
    re = new RegExp(`^[${chr}]+`,'g')

    return str.replace(re, '')
  }


  // formatString 辅助函数
  function formatString(str) {
    let res = []
    let idx = 0
    if (str.match(/\W|\_/g) == null) {
      for(let i = 0; i < str.length; i++) {
        if (str[i].charCodeAt() < 97) {
          res.push(str.slice(idx, i))
          idx = i
        }
      }
      res.push(str.slice(idx))
    } else {
      res = str.split(/[\W\_]/g).filter(x => x)
    }

    return res
  }
  // 创建一个只能传一个参数的函数
  let unary = func => val => func(val)

  // 传入值结果取反
  let negate = f => (...args) => !f(...args)

  let uniq = ary => Array.from(new Set(ary))

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


/*------------------Math-----------------------------*/

  // add
  let add = (x, y) => x + y

  // ceil
  let ceil = (num, pre = 0) => {
    if (pre == 0) return Math.ceil(num)
    if (pre > 0) {
      let s = num.toFixed(pre)
      if (s < num) {
        return +s.slice(0,-1) + +((+s.slice(-1) + 1)* (0.1 ** pre)).toFixed(10)
      } else {
        return +s
      }
    } else {
      let pro = 10 ** (-pre)
      let res = (num / pro | 0) * pro
      if (res < num) {
        return res + pro
      } else {
        return res
      }
    }
  }

  // divide
  let divide = (divd, divr) => divd / divr

  // floor
  let floor = (num, pre = 0) => {
    if(pre == 0) return num | 0
    if (pre > 0) {
      let res = num.toFixed(pre)
      if(res > num) {
        return +res - +(0.1 ** pre).toFixed(10)
      }
      return +res
    } else {
      let pro = 10 ** (-pre)
      return (num / pro |0 ) * pro
    }
  }

  // max
  let max = ary => ary.length == 0 ? undefined : Math.max(...ary)

  // maxBy
  let maxBy = function(ary, iter) {

    return ary.reduce((pre, cur) => 
      (iteratee(iter)(pre) != undefined ? iteratee(iter)(pre) : -Infinity )
       > (iteratee(iter)(cur) != undefined ? iteratee(iter)(cur) : -Infinity ) ? pre : cur)

    // 高阶代替
    // let max = -Infinity
    // let res
    // iter = iteratee(iter)

    // for(let item of ary) {
    //   if (iter(item) > max) {
    //     max = iter(item)
    //     res = item
    //   }
    // }

    // return res
  }

  // mean
  let mean = ary => ary.length == 0 ? NaN : ary.reduce((pre, cur) => pre + cur) / ary.length

  // meanBy
  let meanBy = function(ary, iter) {
    let store = []
    iter = iteratee(iter)

    for(let item of ary) {
      store.push(iter(item) || 0)
    }

    return mean(store)
  } 

  // min
  let min = ary => ary.length == 0 ? undefined : Math.min(...ary)

  // minBy
  let minBy = function (ary, iter) {
    return ary.reduce((pre, cur) => 
    (iteratee(iter)(pre) != undefined ? iteratee(iter)(pre) : Infinity )
     < (iteratee(iter)(cur) != undefined ? iteratee(iter)(cur) : Infinity ) ? pre : cur)

    // 高阶代替
    // let res
    // let min = Infinity
    // for(let item of ary) {
    //   if (iter(item) < min) {
    //     min = iter(item)
    //     res = item
    //   }
    // }

    // return res
  } 

  // multiply
  let multiply = (mulr, muld) => mulr * muld

  // round
  let round = (num, pre) => {
    if (pre < 0) {
      let res = num / (10 ** (-pre))
      return +res.toFixed(0) * (10 ** (-pre))
    } else {
      return +num.toFixed(pre)
    }
  }

  // subtract
  let subtract = (minu, sub) => minu - sub

  // sum
  let sum = ary => ary.reduce((pre, cur) => pre + cur, 0)

  // sumBy
  let sumBy = (ary, iter) => ary.reduce((pre, cur) => pre + iteratee(iter)(cur), 0)

/* ----------------Number----------------- */
  // clamp
  let clamp = (...args) => {
    if (args.length == 2) {
      return Math.min(...args)
    } else {
      if (args[1] >= args[0]) {
        return args[1]
      } else if (args[2] >= args[0]){
        return args[0]
      } else {
        return args[2]
      }
    }
  }

  // inRange
  let inRange = (...args) => {
    let a = args.length == 2 ? 0 : args[1]
    let b = args[args.length - 1]

    return args[0] > Math.min(a, b) && args[0] < Math.max(a, b)
  }

  // random
  let random = (...args) => {
    let calcFloat = (s, e) => Math.random() * (e - s) + s
    let calcInt = (s, e) => +(Math.random() * (e - s) + s).toFixed(0)
    let whichOne = (status, min, max) => status ? calcFloat(min, max) : calcInt(min, max)

    if (typeof args[args.length - 1] == 'boolean') {
      max = args[args.length - 2]
      min = args[args.length - 3] || 0 
      
      return whichOne(args[args.length - 1], min, max)
    } else {
      let status = args.some(x => x != (x | 0))
      max = args[args.length - 1]
      min = args[args.length - 2] || 0 

      return whichOne(status, min, max)
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

    // >_<
    uniq: uniq,

    /* ------------Math-------- */
    
    add: add,
    ceil: ceil,
    divide: divide,
    floor: floor,
    max: max,
    maxBy: maxBy,
    mean: mean,
    meanBy: meanBy,
    min: min,
    minBy: minBy,
    multiply: multiply,
    round: round,
    subtract: subtract,
    sum: sum,
    sumBy: sumBy,
    
    /* ------------Number-------- */
    
    clamp: clamp,
    inRange: inRange,
    random: random,
    
    without: without,

    /* ------------String-------- */
    
    camelCase: camelCase,
    capitalize: capitalize,
    // deburr
    endsWith: endsWith,
    escape: escape,
    escapeRegExp: escapeRegExp,
    kebabCase: kebabCase,
    lowerCase: lowerCase,
    lowerFirst: lowerFirst,
    pad: pad,
    padEnd: padEnd,
    padStart: padStart,
    parseInt: parseInt,
    repeat: repeat,
    replace: replace,
    snakeCase: snakeCase,
    split: split,
    startCase: startCase,
    startsWith: startsWith,
    toLower: toLower,
    toUpper: toUpper,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,


    unary: unary,
    negate:negate,
    // isEqual: isEqual,
    //辅助函数
    iteratee: iteratee,
    formatString: formatString,
  }






}()