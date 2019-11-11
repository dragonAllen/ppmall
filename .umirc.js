
// ref: https://umijs.org/config/
export default {
  urlLoaderExcludes: [
    /\.md$/,
  ],
  chainWebpack(config) {
    config.module.rule('md')
      .test(/\.md$/)
      .use('raw')
      .loader('raw-loader')
  },
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      locale: {
        default: 'zh-CN', //默认语言 zh-CN
        baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
        antd: true // 是否启用antd的<LocaleProvider />
      },
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'ppmall',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/test': {
      target: 'https://www.baidu.com',
      pathRewrite: { '^/test': '' },
      changeOrigin: true
    }
  }
}
