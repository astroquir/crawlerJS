var Crawler = require("crawler");
 
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            const tableRows = $(".table-cal tbody tr");
            tableRows.each((i, tr) => {
                const tds = $(tr).find('td');
                tds.each((i, td)=>{
                    console.log(i +':'+ $(td).find('span').text());
                })
            })
        }
        done();
    }
});
 
// Queue just one URL, with default callback
c.queue('https://www.weather.go.kr/w/obs-climate/land/past-obs/obs-by-day.do?stn=159&yy=2021&mm=11&obs=1');
