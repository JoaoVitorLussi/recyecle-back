const db = require('../../../../config/databases');

module.exports = {
    development: {
        ...db.receyecle
    },
    homolog: {
        ...db.receyecle
    },
    production: {
        ...db.receyecle
    }
}
