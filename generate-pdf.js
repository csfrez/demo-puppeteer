const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    // 启动浏览器（无头模式）
    browser = await puppeteer.launch();
    
    // 创建新页面
    const page = await browser.newPage();
	
	await page.setViewport({ width: 1920, height: 1080 });
    
    // 导航到目标 URL，并等待网络空闲（确保页面加载完成）
    await page.goto('https://www.baidu.com ', { waitUntil: 'networkidle2' });
	
	
    
    // 生成 PDF
    await page.pdf({
      path: 'example.pdf', // 保存路径
      format: 'A4',        // 页面尺寸（A4、Letter 等）
      landscape: false,    // 是否横向
      margin: {            // 页边距
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      printBackground: true // 是否打印背景颜色/图片
    });

    console.log('PDF 生成成功！');
  } catch (error) {
    console.error('发生错误:', error);
  } finally {
    if (browser) {
      await browser.close(); // 关闭浏览器
    }
  }
})();