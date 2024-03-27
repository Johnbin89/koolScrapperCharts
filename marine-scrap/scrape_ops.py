from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from bs4 import BeautifulSoup
import random, os
from seleniumwire import webdriver

basedir = os.path.abspath(os.path.dirname(__file__))
from dotenv import load_dotenv
dotenv_file = os.path.join(basedir, '.env')
if os.path.isfile(dotenv_file):
    load_dotenv(dotenv_file)

#create an instance of ChromeOptions
options = webdriver.ChromeOptions()
#api key
SCRAPEOPS_API_KEY = '9a91b6b1-31f2-49bb-b8ff-e4beb160584a'
#user-agent rotation
user_agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
]
#random user agent
user_agent = random.choice(user_agents)
#add the user agent
options.add_argument(f"user-agent={user_agent}")
#set up proxy
proxy_options = {
    "proxy": {
        "http": f"http://scrapeops.headless_browser_mode=true:{SCRAPEOPS_API_KEY}@proxy.scrapeops.io:5353",
        "https": f"http://scrapeops.headless_browser_mode=true:{SCRAPEOPS_API_KEY}@proxy.scrapeops.io:5353",
        "no_proxy": "localhost:127.0.0.1",
    }
}
#disable loading images for faster crawling
options.add_argument("--blink-settings=imagesEnabled=false")
options.add_argument('--ignore-certificate-errors')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_experimental_option("useAutomationExtension", False)
options.add_experimental_option("excludeSwitches", ["enable-automation"])
#initialize the WebDriver with options
driver = webdriver.Chrome(options=options, seleniumwire_options=proxy_options)
#navigate to the site
driver.get("https://www.marinetraffic.com/en/ais/home/centerx:-12.0/centery:25.0/zoom:4")
wait = WebDriverWait(driver, 300)
wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]'))).click() #accept cookies

'''
# -  Login  -
username = os.environ.get('USER_EMAIL') or input("Enter Email address:")
password= os.environ.get('PASSWORD') or input("Enter password:")
wait.until(EC.element_to_be_clickable((By.ID, 'login'))).click()
wait.until(EC.element_to_be_clickable((By.ID, 'email')))
wait.until(EC.element_to_be_clickable((By.ID, 'password')))
#login_button = driver.find_element(By.ID, 'login')
#login_button.click()
login_source = driver.page_source
soup = BeautifulSoup(login_source)
print(soup.prettify())
# -  Login  -
'''

# - Vessel Search - 
vessels = ['KRITI VIGOR', 'DERYOUNG_SPRING']
wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="searchMarineTraffic"]')))
search_bar = driver.find_element(By.XPATH, '//*[@id="searchMarineTraffic"]')
search_bar.send_keys('KRITI VIGOR')
search_bar.send_keys(Keys.RETURN)

wait.until(EC.visibility_of_element_located((By.XPATH, '//*[@id="vesselDetails_generalSection"]')))
wait.until(EC.visibility_of_element_located((By.XPATH, '//*[@id="vesselDetails_aisInfoSection"]')))
vessel_source = driver.page_source
soup = BeautifulSoup(vessel_source)
print(soup.prettify())
print('*'*20)
print(soup.title)



#close browser
#driver.quit()