var ices1 = {

  //_.chunk(['a', 'b', 'c', 'd'], 2);
  // => [['a', 'b'], ['c', 'd']]
  chunk: function(array, size = 1) {
    let len = array.length
    let arr = []

    if(size === 0) return arr

      for (let i = 0; i < len; i += size) {
        arr.push(array.slice(i, i + size))
      }

      return arr
    },

  
  //_.compact([0, 1, false, 2, '', 3]);
  // => [1, 2, 3]
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

  
  // var array = [1];
  // var other = _.concat(array, 2, [3], [[4]]);
  // => [1, 2, 3, [4]]
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
  /*
  _.difference([3, 2, 1], [4, 2]);
  // => [3, 1]
  */
  difference: function (array, arrFit = []) {
    let len = array.length
    let lenFit = arrFit.length
    var arr = []

    if (lenFit == 0) return array

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
  // _.map(['6', '8', '10'], _.unary(parseInt));
  // => [6, 8, 10]  
  unary: function (func) {
    return function(val) {
      return func(val)
    }
  }

  // 传入值结果取反
  // _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
  // => [1, 3, 5]
  negate: function(f) {
    return function (...args) {
      return !f(...args)
    }
  }

}