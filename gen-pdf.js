const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 设置视口（在 goto 之前）
  await page.setViewport({ width: 1920, height: 1080 });

  // 导航到目标页面
  await page.goto('https://www.baidu.com ', { waitUntil: 'networkidle2' });

  // 生成唯一文件名
  const pdfPath = `${uuidv4()}.pdf`;

  // 生成 PDF，并指定 mediaType 为 'screen'
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: false,
    mediaType: 'screen', // 使用屏幕样式
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });

  console.log(`PDF 已生成，文件名: ${pdfPath}`);

  await browser.close();
})();