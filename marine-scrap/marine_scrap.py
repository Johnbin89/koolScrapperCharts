from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service as ChromiumService
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium_stealth import stealth
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.core.os_manager import ChromeType
from bs4 import BeautifulSoup
import os
import time


basedir = os.path.abspath(os.path.dirname(__file__))
from dotenv import load_dotenv
dotenv_file = os.path.join(basedir, '.env')
if os.path.isfile(dotenv_file):
    load_dotenv(dotenv_file)



options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("--headless")
options.add_experimental_option("useAutomationExtension", False)
options.add_experimental_option("excludeSwitches", ["enable-automation"])
driver = webdriver.Chrome(options=options)
#driver.implicitly_wait(10)
stealth(
    driver,
    languages=["en-US", "en"],
    vendor="Google Inc.",
    platform="Win32",
    webgl_vendor="Intel Inc.",
    renderer="Intel Iris OpenGL Engine",
    fix_hairline=True,
)

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
search_bar.send_keys('KRITI VIGOR') #hard code one for test/ todo: loop on vessels[]+steps below
search_bar.send_keys(Keys.RETURN)

wait.until(EC.visibility_of_element_located((By.XPATH, '//*[@id="vesselDetails_generalSection"]')))
wait.until(EC.visibility_of_element_located((By.XPATH, '//*[@id="vesselDetails_aisInfoSection"]')))
vessel_source = driver.page_source
soup = BeautifulSoup(vessel_source)
print(soup.prettify())
print('*'*20)
print(soup.title) #test vessel page on view
