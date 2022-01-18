const CracoLessPlugin = require('craco-less')

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						// 覆盖的变量，查找参考：https://ant.design/docs/react/customize-theme-cn
						modifyVars: {
							'@primary-color': '#703edb',
							'@font-size-based': '16px'
						},
						javascriptEnabled: true
					}
				}
			}
		}
	]
}
