const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/extract', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Please provide a URL parameter');
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    await browser.close();
    res.send(content);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to extract content from the page');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
