const fetch = require('node-fetch')
exports.main = (event, context, callback) => {
    const { a, b } = event
    return {
        sum: a + b
    }
}
