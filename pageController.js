const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance) {
	let browser;
	try {
		let linksObject = {};
		browser = await browserInstance;
		linksObject['links'] = await pageScraper.scraper(browser)
		// console.log(linksObject)
		fs.writeFile("links.json", JSON.stringify(linksObject), 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
			console.log(`The data has been scraped and saved successfully! View ${linksObject['links'].length} data at './links.json'`);
		});

	}
	catch (err) {
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)