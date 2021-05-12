
const path = require('path');
// vite.config.js # or vite.config.ts
 
console.log(path.resolve(__dirname, './src'));
 
module.exports = {
    /**
     * 在生产中服务时的基本公共路径。
     * @default '/'
     */
    base: './',
    /**
     * 与“根”相关的目录
     * @default 'dist'
     */
    outDir: 'dist',
    port: 3000,
    // 是否自动在浏览器打开
    open: false,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    // 引入第三方的配置
    optimizeDeps: {
        include: ["axios","js-md5","better-scroll"]
    }
    
}