//Node.js内置模块
const path = require("path");
module.exports = {
	//配置入口文件
	entry: './src/main.js',
	output: {
		//输出路径，__dirname：当前文件所在路径
		path: path.resolve(__dirname, './dist'),
		//输出文件
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.css$/, //打包规则应用到以css结尾的文件上
			use: ['style-loader', 'css-loader']
		}]
	}
}
