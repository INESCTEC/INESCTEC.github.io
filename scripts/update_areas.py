import json
import requests
import os

GITHUB_API_SEARCH_URL = "https://api.github.com/search/repositories"
GITHUB_TOKEN = os.getenv('GH_TOKEN')

def get_project_data(org, topic):
    all_repos = []
    page = 1
    while True:
        params = {
            'q': f'org:{org} topic:{topic}',
            'per_page': 100,
            'page': page
        }
        headers = {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': f'token {GITHUB_TOKEN}'
        }
        response = requests.get(GITHUB_API_SEARCH_URL, params=params, headers=headers)
        if response.status_code == 200:
            data = response.json()
            public_repos = [repo for repo in data['items'] if not repo['private']]
            all_repos.extend(public_repos)
            if len(data['items']) < 100:  
                break
            page += 1
        else:
            print(f"Error fetching data for topic {topic}: {response.status_code}")
            break
    return all_repos

script_dir = os.path.dirname(os.path.abspath(__file__))
areas_json_path = os.path.join(script_dir, '../public/areas.json')

with open(areas_json_path, 'r') as f:
    areas_data = json.load(f)

org_name = 'INESCTEC'

for area in areas_data:
    for project in area['featured_projects']:
        project_topic = project['project_topic']
        project_repos = get_project_data(org_name, project_topic)
        
        if project_repos:
            total_stars = sum(repo['stargazers_count'] for repo in project_repos)
            total_repos = len(project_repos)
            
            project['total_stars'] = total_stars
            project['total_repos'] = total_repos

with open(areas_json_path, 'w') as f:
    json.dump(areas_data, f, indent=4)

print("Updated areas.json with GitHub data.")
