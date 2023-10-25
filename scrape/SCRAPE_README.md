## Scraper Readme

Data for this example is provided in the file astra-chatbot-react-python/scrape/scraped_results.json. This file contains data scraped from three types of web pages: Astra documentation faq pages, DataStax’s website FAQ pages, and Astra blog pages. For each type of page the script loads the site in a headless browser, captures the html, and extracts a section corresponding to the content of the page, without headers, footer, or sidebars.

# Setup

This scraper uses Selenium and a headless chrome browser to load interactive elements of web pages.

To install Google Chrome run:

```
sudo apt-get install google-chrome
```

Also install the chrome driver:

```
sudo apt install chromium-chromedriver
```

Then clone this repo and install the Python requirements (This demo assumes you already have python3 installed):
```
git clone https://github.com/Anant/astra-chatbot-react-python.git
cd astra-chatbot-react-python/scrape
pip3 install -r requirements.txt
```

You can add and remove urls to scrape by modifying the list urls on line 19 inside the astra_scraper.py file. You can also change the name of the output file on line 76 of the same file. The file scraped_results.json contains the results from running the astra_scraper.py script with the default values for urls and output filename.

Your mileage may vary if you try to use this scraper on types of web pages not listed above. Because this scraper tries to extract article content only, it can fail to deliver proper results on pages that are structured differently than the types it is meant to process. 


# Start Process

To run the scraper enter the command:
```
python3 astra_scraper.py
```
