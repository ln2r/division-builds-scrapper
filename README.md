# Division-Builds Scrapper
This repository built for learning purpose.

## Features
Available
* Gears data (body armour, mask, gloves, etc.)
* Weapons data (main, secondary, sidearms)

Planned
* Mods
* Attachments
* Skills
* Talents

## Getting Started
### References and Library Used
This app mainly use [puppeteer](https://github.com/puppeteer/puppeteer/) for scrapping. Please refer to these articles if you wanted to learn more.
* [DigitalOcean - How To Scrape a Website Using Node.js and Puppeteer](https://www.digitalocean.com/community/tutorials/how-to-scrape-a-website-using-node-js-and-puppeteer) 
* [Fireship - Modern Web Scrapping Guide](https://fireship.io/lessons/web-scraping-guide/)
* [Puppeteer - Headless Chrome Node.js API](https://github.com/puppeteer/puppeteer/)
### Configuration
You'll need [`division-builds.com`](division-builds.com/) account to run the scrapper. Replace `config.json` data with your account details.
```JSON
{
  "email": "DIVISION BUILDS ACCOUNT EMAIL HERE",
  "password": "DIVISION BUILDS ACCOUNT PASSWORD HERE"
}
```
If you want to specify the output folder change this line (make sure the folder exist or created first).
```JSON
{
  "output": "FOLDER NAME"
}
```

## Credits, Contact and License
Huge thank you to [`division-builds.com`](division-builds.com/) for providing easy to use The Division gear builds creator and equipment data!

You can contact me via Discord (`ln2r#1691`).
* [GitHub](https://github.com/ln2r/)

*Code of this project is licensed under MIT license*