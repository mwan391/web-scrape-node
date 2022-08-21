

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
						const url = link.href
						// format into capitalised spaced names
						const stringParts = url
							.split("/")
							.pop()
							.split(/[-_]+/)
							.map(word => word.replace(/(?:^|\s)\S/g, a => a.toUpperCase()))
						const nameParts = [
							first = stringParts[0],
							middle = stringParts.length >= 3 ? stringParts.slice(1, -1).join(' ') : undefined,
							last = stringParts[stringParts.length - 1]
						]

						return {
							url,
							first,
							middle,
							last,
						}
					})
					return links
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