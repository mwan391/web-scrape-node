

const scraperObject = {
	async scraper(browser) {
		let page = await browser.newPage();
		let scrapedData = [];
		async function scrapeAllPages() {
			for (let i = 1; i < 20; i++) {
				console.log(`Navigating to page ${i}`);
				// Navigate to the selected page
				await page.goto(`https://www.findagrave.com/cemetery/2288869/memorial-search?page=${i}#sr-196999652`);
				// Wait for the required DOM to be rendered
				await page.waitForSelector('.memorial-list-data');
				// Get the link to all the required graves
				let urls = await page.evaluate(async () => {
					let linksElement = document.querySelectorAll("div[aria-label=Memorial] > a")
					let links = Object.values(linksElement).map(link => {
						return {
							url: link.href,
							name: link.href.split("/").pop().replace(/-/g, ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase())
						}
					})
					return links
					// return Array.from(linksObject).map((link) => { return link.href });
				});
				for (let link in urls) {
					scrapedData.push(urls[link])
				}
			}
			return scrapedData;
		}
		let links = await scrapeAllPages();
		console.log(links)
		return links
	}
}

module.exports = scraperObject;