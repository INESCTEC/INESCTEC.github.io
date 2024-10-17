import json
import requests
import os

GITHUB_API_SEARCH_URL = "https://api.github.com/search/repositories"
GITHUB_API_REPO_TOPICS_URL = "https://api.github.com/repos/{owner}/{repo}/topics"
GITHUB_TOKEN = os.getenv('GH_TOKEN')

def get_repo_topics(owner, repo_name):
    url = GITHUB_API_REPO_TOPICS_URL.format(owner=owner, repo=repo_name)
    headers = {
        'Accept': 'application/vnd.github.mercy-preview+json',  
        'Authorization': f'token {GITHUB_TOKEN}'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data.get('names', [])  
    else:
        print(f"Error fetching topics for {repo_name}: {response.status_code}")
        return []

def get_top_repositories(org, topic):
    all_repos = []
    page = 1
    while True:
        params = {
            'q': f'org:{org} topic:{topic} fork:true',  
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
    
    top_repos = sorted(all_repos, key=lambda x: x['stargazers_count'], reverse=True)[:3]
    
    total_stars = sum(repo['stargazers_count'] for repo in top_repos)
    total_repositories = len(top_repos)
    
    all_topics = set()  
    formatted_repos = []
    for repo in top_repos:
        repo_name = repo['name']
        topics = get_repo_topics(org, repo_name)  
        all_topics.update(topics)  
        formatted_repos.append({
            "name": repo_name,
            "url": repo['html_url'],
            "stars": repo['stargazers_count'],
            "is_fork": repo['fork'],
            "topics": topics  
        })
    
    return {
        "top_repositories": formatted_repos,
        "total_stars": total_stars,
        "total_repositories": total_repositories,
        "project_tags": list(all_topics) 
    }

script_dir = os.path.dirname(os.path.abspath(__file__))
input_json_path = os.path.join(script_dir, '../public/projects_input.json') 
output_json_path = os.path.join(script_dir, '../public/projects.json')  

with open(input_json_path, 'r') as f:
    projects_data = json.load(f)

org_name = 'INESCTEC'

for project in projects_data:
    project_topic = project['project_topic']
    repo_data = get_top_repositories(org_name, project_topic)
    
    project['top_repositories'] = repo_data['top_repositories']
    project['total_stars'] = repo_data['total_stars']
    project['total_repositories'] = repo_data['total_repositories']
    project['project_tags'] = repo_data['project_tags']  

with open(output_json_path, 'w') as f:
    json.dump(projects_data, f, indent=4)

print("Updated projects.json with GitHub data including project tags.")
