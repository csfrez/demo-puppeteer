const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 设置视口（在 goto 之前）
  await page.setViewport({ width: 1920, height: 1080 });

  // 导航到目标页面
  await page.goto('https://www.qq.com ', { waitUntil: 'networkidle0' });

  // 生成唯一文件名
  const pdfPath = `${uuidv4()}.pdf`;

  // 生成 PDF，并指定 mediaType 为 'screen'
  await page.pdf({
    path: pdfPath,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    },
	displayHeaderFooter: true,
    headerTemplate: '<div>Header</div>',
    footerTemplate: '<div><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  });

  console.log(`PDF 已生成，文件名: ${pdfPath}`);

  await browser.close();
})();