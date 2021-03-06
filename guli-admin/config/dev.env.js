'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	// BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
	BASE_API: '"http://localhost:9001"',
	OSS_PATH: '"https://guli-college-1.oss-cn-shanghai.aliyuncs.com"',
	VOD_API: '"http://localhost:8003"',
})
