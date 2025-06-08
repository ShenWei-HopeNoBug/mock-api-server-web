import sImage1 from 'apps/document/assets/image/server/s-1.webp';
import sImage2 from 'apps/document/assets/image/server/s-2.webp';
import sImage3 from 'apps/document/assets/image/server/s-3.webp';
import sImage4 from 'apps/document/assets/image/server/s-4.webp';
import sImage5 from 'apps/document/assets/image/server/s-5.webp';
import sImage6 from 'apps/document/assets/image/server/s-6.webp';
import sImage7 from 'apps/document/assets/image/server/s-7.webp';
import sImage8 from 'apps/document/assets/image/server/s-8.webp';
import sImage9 from 'apps/document/assets/image/server/s-9.webp';

// 选择工作目录渲染配置
const renderList = [
  [
    {
      compName: 'Title',
      compData: {
        content: 'Mock服务',
      },
    },
  ],
  [
    {
      compName: 'Title',
      compData: {
        type: 'h3',
        content: '启动服务',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '启动服务前，如果需要转换接口数据里面的原始静态资源链接为本地Mock服务的静态资源链接，需要进行配置。点击' +
          '【编辑】菜单下拉框【编辑服务配置】，设置下【静态资源包含文件类型】，再启动服务即可。',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '使用Mock服务时，将常规请求代理到 /api 这个路由下即可（比如原本是 http://example.com/test 就' +
          '代理到 http://localhost:5000/api/test）。静态资源默认的路由为 /static，要访问下载的静态资源，用' +
          'http://localhost:5000/static/xxx.png 即可，/static 和文件名之间一般没有中多级路由。注意Mock服务' +
          '的端口号（默认是 5000），也可以修改，修改完重新启动服务就会生效。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: sImage1,
        style: { width: '600px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: sImage2,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: sImage3,
        style: { width: '600px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: sImage4,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: sImage5,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: sImage6,
        style: { width: '1000px' },
      },
    },
  ],
  [
    {
      compName: 'Title',
      compData: {
        type: 'h3',
        content: '模拟响应延时',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '主界面【响应延时】调节项可以调节全局的接口响应延时时间，设置范围为 0 ~ 120000ms。',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '主界面【静态资源加载速率】调节项可以调节静态资源的加载速度，设置范围为 0 ~ 120000kb/s。设置 0 时为' +
          '无延时，虽然可以把加载速度调的很小很小，但是Mock服务内置了最长加载时间不超过 120s，这个用来模拟前端大图片' +
          '加载的情况比较有用，不会拖慢常规接口速度。注意静态资源在延时加载模式下Mock服务是做了缓存处理的，同一个静态资源第一次' +
          '请求会有明显延时，后面就直接返回了，想再次模拟目前要重启下 Mock 服务。',
      },
    },
  ],
  [
    {
      compName: 'Title',
      compData: {
        type: 'h3',
        content: '静态资源动态匹配',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '在某些情况下前端的图片静态资源链接是写死在样式里面的，而通过配置【服务配置】的【静态资源包含文件类型】只能' +
          '匹配接口里面存在的静态资源，直接由 img 标签发起的图片请求是管不到的，导致开发环境这类图片还是看不到。目前可以' +
          '这么处理，查看写死记的静态资源链接的路由，将路由配置在【服务配置】的【动态匹配静态资源路由】中（比如 ' +
          'http://example/test/123/xxx.png 就配置 /test 路由），再用浏览器插件将这类请求代理到 Mock 服务上，即可显示图片。' +
          '（Mock服务收到有【动态匹配静态资源路由】特征的请求后，会直接取最后的文件名和本地的静态资源进行匹配，匹配到就直接返回文件数据）',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: sImage7,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: sImage8,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: sImage9,
        style: { width: '1000px' },
      },
    },
  ],
];

export { renderList };
