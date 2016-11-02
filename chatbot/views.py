from django.shortcuts import render

# Create your views here.

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse

import requests

# Should hold the data - [Category, Subcategory, Location as (lat, long), ]
mock_user_params = {"subcategories": "3006,3008",
                  "location": {"latitude": 37.773972, "longitude": -122.431297},
                  "timing": "this_month"}
global_data = {}

def index(request):
    return render_to_response('chatbot/index.html')

def fetchEventWithParams(user_params):
    response = requests.get(
    "https://www.eventbriteapi.com/v3/events/search/",
    headers = {
        "Authorization": "Bearer PE7CUFOGYYF62DDQFLWB",
    },
    params = {
        "page": 1,
        "location.latitude": user_params["location"]["latitude"],
        "location.longitude": user_params["location"]["longitude"],
        "subcategories": user_params["subcategories"],
        "start_date.keyword": user_params["timing"],
        "sort_by": "best"
    },
    verify = True,  # Verify SSL certificate
    )
    json_response = response.json()
    print json_response
    return json_response["events"]

    
def jsonRequestWithNameAndPageNumber(name, pageNum):
    response = requests.get(
    "https://www.eventbriteapi.com/v3/"+name+"/",
    headers = {
        "Authorization": "Bearer PE7CUFOGYYF62DDQFLWB"
    },
    params = {
         "page": pageNum
    },
    verify = True,  # Verify SSL certificate
    )
    return response.json()
    
def loadCategories():
    pages = []
    pageNum = 1
    response = jsonRequestWithNameAndPageNumber("subcategories", pageNum)
    while 'error' not in response.keys():
         pages.append(response)
         pageNum += 1
         response = jsonRequestWithNameAndPageNumber("subcategories", pageNum)
    categories = {}
    for json_response in pages:
        for subcategory in json_response['subcategories']:
            category_name = subcategory['parent_category']['name']
            print(category_name)
            if category_name not in categories.keys():
                categories[category_name] = {}
                categories[category_name][subcategory['name']] = subcategory['id']
            else:
                categories[category_name][subcategory['name']] = subcategory['id']
    return categories
    
def loadFormats():
    pages = []
    pageNum = 1
    response = jsonRequestWithNameAndPageNumber("formats", pageNum)
    while 'error' not in response.keys():
         pages.append(response)
         pageNum += 1
         response = jsonRequestWithNameAndPageNumber("formats", pageNum)
    formats = {}
    for json_response in pages:
        for format in json_response['formats']:
            format["name"] = format["id"]
    return formats

def chapman(request):
    global_data["categories"] = loadCategories()
    global_data["formats"] = loadFormats()
    events = fetchEventWithParams(mock_user_params)
    return HttpResponse(events)