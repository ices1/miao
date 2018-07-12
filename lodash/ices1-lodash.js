let ices1 = {

  chunk: function(array, size = 1) {
    let len = array.length
    let arr = []

    if(size === 0) return arr

      for (let i = 0; i < len; i += size) {
        arr.push(array.slice(i, i + size))
      }

      return arr
    }

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
  }

  concat: function (array) {
    let len = arguments.length
    let arr = []

    arr.push(...array)

    for (let i = 1; i < len; i++) {
      arr.push(arguments[i])
    }

    return arr
  }

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

    return arr
  }








}