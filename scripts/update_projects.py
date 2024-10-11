import json
import requests
import os

GITHUB_API_SEARCH_URL = "https://api.github.com/search/repositories"
GITHUB_TOKEN = os.getenv('GH_TOKEN')

def get_top_repositories(org, topic):
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
    
    # Sorting by stargazers count and selecting top 3 repositories
    top_repos = sorted(all_repos, key=lambda x: x['stargazers_count'], reverse=True)[:3]
    
    # Compute total stars and total repositories
    total_stars = sum(repo['stargazers_count'] for repo in top_repos)
    total_repositories = len(top_repos)
    
    formatted_repos = [
        {
            "name": repo['name'],
            "url": repo['html_url'],
            "stars": repo['stargazers_count']
        }
        for repo in top_repos
    ]
    
    return {
        "top_repositories": formatted_repos,
        "total_stars": total_stars,
        "total_repositories": total_repositories
    }

# File paths and reading the projects.json file
script_dir = os.path.dirname(os.path.abspath(__file__))
projects_json_path = os.path.join(script_dir, '../public/projects.json')

with open(projects_json_path, 'r') as f:
    projects_data = json.load(f)

org_name = 'INESCTEC'

# Updating each project with top repositories, total stars, and total repositories
for project in projects_data:
    project_topic = project['project_topic']
    repo_data = get_top_repositories(org_name, project_topic)
    
    project['top_repositories'] = repo_data['top_repositories']
    project['total_stars'] = repo_data['total_stars']
    project['total_repositories'] = repo_data['total_repositories']

# Write the updated projects data back to the JSON file
with open(projects_json_path, 'w') as f:
    json.dump(projects_data, f, indent=4)

print("Updated projects.json with GitHub data.")
