const scraperObject = {
	async scraper(browser) {
		let page = await browser.newPage();
		for (let i = 1; i < 19; i++) {
			console.log(`Navigating to page ${i}`);
			// Navigate to the selected page
			await page.goto(`https://www.findagrave.com/cemetery/2288869/memorial-search?page=${i}#sr-196999652`);
			// Wait for the required DOM to be rendered
			await page.waitForSelector('.memorial-list-data');
			// Get the link to all the required books
			let urls = await page.evaluate(async () => {
				let links = document.querySelectorAll("div[aria-label=Memorial] > a")
				return Array.from(links).map((link) => { return link.href });
			});
			console.log(urls);
		}
	}
}

module.exports = scraperObject;