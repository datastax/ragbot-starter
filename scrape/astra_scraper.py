from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import json

#Set up the headless browser
#Sets the browser to Chrome
#Makes the browser headless
#Tells the browser to wait after loading a page so that all the elements load in
options = webdriver.ChromeOptions()
options.add_argument("--headless=new")
options.headless = True
options.page_load_strategy = 'none'
chrome_path = ChromeDriverManager().install()
chrome_service = Service(chrome_path)
driver = Chrome(options=options, service=chrome_service)
driver.implicitly_wait(5)

#List of URLs to scrape
urls = [ "https://www.datastax.com/services/support/premium-support/faq", "https://www.datastax.com/blog/introducing-vector-search-empowering-cassandra-astra-db-developers-to-build-generative-ai-applications", "https://www.datastax.com/legal/datastax-faq-direct-licensing", "https://docs.datastax.com/en/mission-control/docs/overview/faq.html", "https://docs.datastax.com/en/astra-classic/docs/migrate/faqs.html", "https://docs.datastax.com/en/astra-serverless/docs/astra-faq.html", "https://docs.datastax.com/en/dse68-security/docs/secFAQ.html" ]

#defines the starting scrape method as Datastax Blog
scraper_tracker = 2
results = []

for url in urls:
    scraper_tracker = 0
    print(url)
    driver.get(url)
    time.sleep(5)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    #Tries to scrape the page and extract content if the page is in the format of a Datastax blog
    try:
        scraper_tracker = 2
        content = soup.body.main.section.div.div.div.div.get_text(separator="\n").replace("\n\n","")
        #Raises an error if the result of scraping the specified section of the website is blank. Specifically the same type of error as if it returned unparsable data.
        if (content == "")  or (content.count("\n") == 1):
            raise AttributeError("Website content empty. Datastax blog style parsing failed")
        else:
            result = {"url": url, "title": soup.title.get_text(), "content": content }
            print("Using scraper 2: Datastax blog")
            results.append(result)
    #If there is an error try the next parser style. Treats the page as a Datastax website page.
    except AttributeError:
        try:
            if scraper_tracker == 2:
                scraper_tracker = 1
                content = soup.body.main.section.nextSibling.get_text(separator="\n")
                if content == "":
                    raise AttributeError("Website content empty. Datastax page style parsing failed")
                else:
                    result = {"url": url, "title": soup.title.get_text(), "content": content }
                    print("Using scraper 1: Datastax page")
                    results.append(result)
            elif scraper_tracker == 1:
                scraper_tracker = 0
                content = soup.body.article.get_text(separator="\n").replace("\n\n","")
                if content == "":
                    raise AttributeError("Website content empty. Astra docs style parsing failed")
                else:
                    result = {"url": url, "title": soup.title.get_text(), "content": content }
                    print("Using scraper 0: Astra docs")
                    results.append(result)
            else:
                raise
        #IF there is an error now try the last parser stlye. Treats the page as a Astra docs page.
        except:
            if scraper_tracker == 1:
                scraper_tracker = 0
                content = soup.body.article.get_text(separator="\n").replace("\n\n","")
                if content == "":
                    raise AttributeError("Website content empty. Astra docs style parsing failed")
                else:
                    result = {"url": url, "title": soup.title.get_text(), "content": content }
                    print("Using scraper 0: Astra docs")
                    results.append(result)
            else:
                raise

#print(len(results))

with open("scraped_results.json", "w") as f:
    f.write(json.dumps(results))
