from django.shortcuts import render

# Create your views here.

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse

import requests

# Should hold the data - [Category, Subcategory, Location as (lat, long), ]
mock_user_flow = ["Music", "EDM / Electronic", (37.773972, -122.431297), "this_month"]
categories = {}

def index(request):
    return render_to_response('chatbot/index.html')


def fetch_event(api_params):
    response = requests.get(
    "https://www.eventbriteapi.com/v3/events/search/",
    headers = {
        "Authorization": "Bearer PE7CUFOGYYF62DDQFLWB",
    },
    params = {
         "page": pageNu
    },
    verify = True,  # Verify SSL certificate
    )
    
    
    json_response = response.json()
    return HttpResponse(json_response)

    
def jsonRequestCategories(pageNum):
    response = requests.get(
    "https://www.eventbriteapi.com/v3/subcategories/",
    headers = {
        "Authorization": "Bearer PE7CUFOGYYF62DDQFLWB"
    },
    params = {
         "page": pageNum
    },
    verify = True,  # Verify SSL certificate
    )
    return response.json()
    
def loadCategoryToSubCategoryDictionary():
    pages = []
    js
    response = jsonRequestCategories(pageNum)
    while 'error' not in response.keys():
         pages.append(response)
         pageNum += 1
         response = jsonRequestCategories(pageNum)
    for json_response in pages:
        for subcategory in json_response['subcategories']:
            category_name = subcategory['parent_category']['name']
            print(category_name)
            if category_name not in categories.keys():
                categories[category_name] = {}
                categories[category_name][subcategory['name']] = subcategory['id']
            else:
                categories[category_name][subcategory['name']] = subcategory['id']
    
def chapman(request):
    loadCategoryToSubCategoryDictionary()
    
    return HttpResponse(categories)