import requests
from bs4 import BeautifulSoup
import json
pageindex = 0
games = []

my_data_file = open('data.json', 'w')
def navigate(page):
    url = 'https://freegogpcgames.com/' + str(page) + '/'
    print('navigating to:' + url)
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    return soup


def crawl(bla):
    soup = navigate(bla)
    content = soup.find('h1', {"class": "entry-title"})
    links = soup.find('div', {'class': 'entry-content'})
    
    if content:
        links = links.find_all(href=True);
        if len(links) > 2:
            link = links[-2]
            obj = {'name':content.text, 'url':link.attrs['href']}
            games.insert(0, obj)
            with open('personal.json', 'w') as json_file:
                json.dump(games, json_file)
            
    crawl(bla + 1)

crawl(pageindex);