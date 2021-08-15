const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

fs.readdir('../imgs', (err) => {
  if(err){
    console.error("imgs 폴더가 없어 imgs 폴더를 생성합니다.")
    fs.mkdirSync('../imgs');
  }
});

const crawler = async()=>{
  try{
    const browser = await puppeteer.launch({
      headless : false,
    });
    const page = await browser.newPage();
    await page.goto('https://unsplash.com/s/photos/summer?orientation=landscape');

    let result = [];
    while(result.length<=30){
      let srcs = await page.evaluate(()=>{
        window.scrollTo(0, 0);
        let imgs = [];
        const imgEls = document.querySelectorAll('._2UpQX');
        if(imgEls.length){
          imgEls.forEach((v)=>{
            const img = v;
            if(img&&img.currentSrc){
              imgs.push(img.currentSrc);
            }
            v.parentElement.removeChild(v);
          });
        }
        window.scrollBy(0, 100);
        setTimeout(()=>{
          window.scrollBy(0, 200);
        }, 500);
        return imgs;
      });

      result = result.concat(srcs);
      await page.waitForSelector('figure');
      //console.log('태그 로딩 완료');
    }
    var idx = 1;
    result.forEach(async(src) => {
      const imgResult = await axios.get(src.replace(/\?.*$/, ''), {
        responseType:'arraybuffer'
      });
      // 개발자도구 네트워크를 활용해 확장자 파악하기
      fs.writeFileSync(`../imgs/img${idx}.jpeg`, imgResult.data);
      idx++;
    })
    console.log(result);
    console.log(result.length);
    await page.close();
    await browser.close();
  }catch(err){
    console.log(err);
  }finally{

  }
};
crawler();