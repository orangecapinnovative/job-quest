'use strict'

const config = {
	server: {
		port: Number(process.env.PORT) || 3000
	},
	db: {
		mongodb: 'mongodb://localhost:27017/jobQuestAutumn2016'
	}
}

module.exports = config
