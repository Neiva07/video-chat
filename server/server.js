const config = require('../config.json')
const socketManager = require('./socketManager')

const PORT = process.env.PORT || 3000

socketManager.run(config)
