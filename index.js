const puppeteer = require('puppeteer');
const readLineSync = require('readline-sync');

console.log('Bem vundo ao conversor!');

async function robo() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const moedaBase = readLineSync.question('informe uma moeda base: ') || 'dolar';
    const moedaFinal = readLineSync.question('Informe uma moeda desejada: ') || 'real';
    
    const urlConversao = `https://www.google.com/search?q=conversor+${moedaBase}+para+${moedaFinal}&rlz=1C1SQJL_pt-BRBR870BR871&oq=conversor+${moedaBase}+para+${moedaFinal}&aqs=chrome..69i57.5477j0j1&sourceid=chrome&ie=UTF-8`;

    await page.goto(urlConversao);
    await page.screenshot({ path: 'conversao.png' });

    const resultado = await page.evaluate(() => {
        return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
    });

    console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`);

    await browser.close();

};

robo();