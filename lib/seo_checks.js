module.exports = {
    average: function(array) {
        let sum = 0
        for (let i = 0; i < array.length; i++) {
          sum += array[i]
        }
        return sum / array.length
    },
    max: function(array) {
        let max = array[0]
        for (let i = 0; i < array.length; i++) {
          max = array[i] > max ? array[i] : max
        }
        return max
    },
    checkImg: function(doc) {
        return nil
    }
}