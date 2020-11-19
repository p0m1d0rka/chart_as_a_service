const puppeteer = require('puppeteer');
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 
(async () => {
  chartOption = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset123123',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}    
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.goto('file:///home/pomidor/projects/chart_as_a_service/index.html')
  body = await page.evaluate((chartOption) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, chartOption)
    return Promise.resolve()
  }, chartOption)
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();