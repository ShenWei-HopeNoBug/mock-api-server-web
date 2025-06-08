import rcImage1 from 'apps/document/assets/image/requestCatch/rc-1.webp';
import rcImage2 from 'apps/document/assets/image/requestCatch/rc-2.webp';
import rcImage3 from 'apps/document/assets/image/requestCatch/rc-3.webp';
import rcImage4 from 'apps/document/assets/image/requestCatch/rc-4.webp';
import rcImage5 from 'apps/document/assets/image/requestCatch/rc-5.webp';
import rcImage6 from 'apps/document/assets/image/requestCatch/rc-6.webp';
import rcImage7 from 'apps/document/assets/image/requestCatch/rc-7.webp';
import rcImage8 from 'apps/document/assets/image/requestCatch/rc-8.webp';
import rcImage9 from 'apps/document/assets/image/requestCatch/rc-9.webp';

// 抓取数据渲染配置
const renderList = [
  [
    {
      compName: 'Title',
      compData: {
        content: '抓取数据',
      },
    },
  ],
  [
    {
      compName: 'Title',
      compData: {
        type: 'h3',
        content: '安装证书',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '应用使用了 mitmproxy 第三方抓包库来抓取数据，抓包前必须先安装 mitmproxy-ca 证书。' +
          '（在应用根目录的 /resources 文件夹中，有下载好的证书压缩包 .mitmproxy-ca.7z）',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content:
          '<a href="https://docs.mitmproxy.org/stable/concepts/certificates/" target="_blank">mitmproxy官方文档</a>' +
          '<a style="margin-left: 24px" href="https://blog.csdn.net/qq_36841447/article/details/134012335" ' +
          'target="_blank">mitmproxy证书安装教程</a>',
      },
    },
  ],
  [
    {
      compName: 'Title',
      compData: {
        type: 'h3',
        content: '抓包配置',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content:
          '主界面的【抓包配置】可以设置抓包服务的端口号以及是否以追加模式抓取数据，<span style="color:red">不勾选【以追加模式抓取】选项时</span>，' +
          '关闭抓包服务结束抓包后，<span style="color:red">历史的抓包数据会清空</span>，被新的抓包数据完全替换。',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '进行详细的抓包配置，可在菜单【编辑】下拉框点击【编辑抓包配置】进行配置。' +
          '在抓取常规 http 请求时（非文件请求且请求的 Content-Type 是 application/json），' +
          'http 请求链接文本包含了【常规http请求过滤条件】内配置的多个文本之一，该请求就会抓取并保存。' +
          '在抓取静态资源 http 请求时，请求链接文本包含了【静态资源请求过滤条件】内配置的多个文本之一，该请求就会抓取并保存。' +
          '在抓取过程中，会根据请求的链接文本、请求类型(GET 或 POST)和请求参数数据生成该请求的标识，相同标识的请求，' +
          '后抓取的数据会覆盖已抓取的数据。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: rcImage1,
        style: { width: '600px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: rcImage2,
        style: { width: '1000px' },
      },
    },
  ],
  [
    {
      compName: 'Title',
      compData: {
        type: 'h3',
        content: '开始抓包',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '<span style="color:red">需要进行抓包操作时，建议使用带黑窗的 .exe 应用</span>' +
          '（应用根目录文件名中包含.win 的 .exe应用，<span style="color:red">一定注意这个应用在同目录下不能多开</span>，' +
          '不然数据通信可能会有问题），便于查看抓包过程中的日志信息。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: rcImage3,
        style: { width: '600px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: rcImage4,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '在抓取数据时需要配置代理，需要将 http 请求代理到本地起的抓包服务上，用配置全局代理或用浏览器proxy插件之类的都可以。' +
          '（比如这个谷歌浏览器插件：' +
          '<a href="https://chromewebstore.google.com/detail/proxy-switchyomega-3-zero/pfnededegaaopdmhkdmcofjmoldfiped?utm_source=ext_app_menu">' +
          'Proxy SwitchyOmega 3 (ZeroOmega)</a>，如果网络环境问题进不去商店，可以用应用根目录的 /resources 文件夹中的' +
          'Proxy-SwitchyOmega-3-ZeroOmega-Chromium_v3.3.23.7z 压缩包离线安装）',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: rcImage5,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '停止抓包服务后，会将抓取到的常规 http 请求数据保存到工作目录的 /data/output.json 文件中，' +
          '静态资源 http 请求数据保存到工作目录的 /data/static.json 文件中。注意抓包数据在抓取过程中不会保存到本地，' +
          '只有停止抓包服务后，才会进行保存。',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content:
          '如果需要完全清空抓包数据，可以不勾选【以追加模式抓取】选项启动抓包服务，再马上关闭抓包服务来清空抓包数据，' +
          '或者直接删除工作目录里面的 /data/output.json 和 /data/static.json 数据文件也可以达到同样的目的。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: rcImage6,
        style: { width: '1000px' },
      },
    },
  ],
  [
    {
      compName: 'Title',
      compData: {
        type: 'h3',
        content: '查看抓包数据',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '想看抓包抓到的数据，可以在在菜单【文件】下拉框点击【查看抓包数据】打开详情 html 页面。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: rcImage7,
        style: { width: '600px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: rcImage8,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: rcImage9,
        style: { width: '1000px' },
      },
    },
  ],
];

export { renderList };
