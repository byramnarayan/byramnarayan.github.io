import re

with open('index_template.html', 'r') as f:
    content = f.read()

# We need to extract the sections:
# work_experience, projects, volunteer_experience, references, education, skills, languages, interests

def get_section(name, start_tag, end_tag):
    pattern = rf'({start_tag}.*?{end_tag})'
    match = re.search(pattern, content, re.DOTALL)
    return match.group(1) if match else ''

work = get_section('work_experience', r'\{\% if work_experience \%\}', r'\{\% endif \%\}')
projects = get_section('projects', r'\{\% if projects \%\}', r'\{\% endif \%\}')
volunteer = get_section('volunteer', r'\{\% if volunteer_experience \%\}', r'\{\% endif \%\}')
references = get_section('references', r'\{\% if references \%\}', r'\{\% endif \%\}')
education = get_section('education', r'\{\% if education \%\}', r'\{\% endif \%\}')
skills = get_section('skills', r'\{\% if skills \%\}', r'\{\% endif \%\}')
languages = get_section('languages', r'\{\% if languages \%\}', r'\{\% endif \%\}')
interests = get_section('interests', r'\{\% if interests \%\}', r'\{\% endif \%\}')

def wrap_in_block(sec_content):
    if not sec_content: return ''
    # remove the {% if ... %} and {% endif %} to avoid double wrapping, or just wrap the whole thing.
    # wrapping the whole thing is safer.
    return f"""
        <div class="hero-content-block">
          <div class="hero-content-copy">
{sec_content}
          </div>
        </div>"""

blocks = ''.join(wrap_in_block(sec) for sec in [work, projects, volunteer, references, education, skills, languages, interests])

new_page_content = f"""
    <div class="hero-pinned-section">
      <div class="hero-img"></div>
      <div class="hero-mask"></div>
      <div class="hero-grid-overlay">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkwMiIgaGVpZ2h0PSIxMTExIiB2aWV3Qm94PSIwIDAgMTkwMiAxMTExIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSI3OTIuNjY2IiB5PSIxNTkuMzM0IiB3aWR0aD0iMTU4LjMzMyIgaGVpZ2h0PSI3OTEuNjY3IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iNjM0LjMzNCIgeT0iMTU5LjMzNCIgd2lkdGg9IjE1OC4zMzMiIGhlaWdodD0iOTUwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iNDc2IiB5PSIxIiB3aWR0aD0iMTU4LjMzMyIgaGVpZ2h0PSI5NTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSIzMTcuNjY2IiB5PSIxNTkuMzM0IiB3aWR0aD0iMTU4LjMzMyIgaGVpZ2h0PSI5NTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSIxNTkuMzM0IiB5PSIxIiB3aWR0aD0iMTU4LjMzMyIgaGVpZ2h0PSIxMTA4LjMzIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iOTUxIiB5PSIxIiB3aWR0aD0iMTU4LjMzMyIgaGVpZ2h0PSI5NTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSIxMTA5LjMzIiB5PSIxIiB3aWR0aD0iMTU4LjMzMyIgaGVpZ2h0PSIxMTA4LjMzIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iMTI2Ny42NyIgeT0iMTU5LjMzNCIgd2lkdGg9IjE1OC4zMzMiIGhlaWdodD0iOTUwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iMTQyNiIgeT0iMSIgd2lkdGg9IjE1OC4zMzMiIGhlaWdodD0iOTUwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iMTU4NC4zMyIgeT0iMSIgd2lkdGg9IjE1OC4zMzMiIGhlaWdodD0iMTEwOC4zMyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHg9IjEiIHk9IjMxNy42NjYiIHdpZHRoPSIxNTguMzMzIiBoZWlnaHQ9IjE5MDAiIHRyYW5zZm9ybT0icm90YXRlKC05MCAxIDMxNy42NjYpIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iMTU5LjMzNCIgeT0iNDc2IiB3aWR0aD0iMTU4LjMzMyIgaGVpZ2h0PSIxNzQxLjY3IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAgMTU5LjMzNCA0NzYpIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iMSIgeT0iNzkyLjY2NiIgd2lkdGg9IjE1OC4zMzMiIGhlaWdodD0iMTc0MS42NyIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDEgNzkyLjY2NikiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSIxIiB5PSI5NTEiIHdpZHRoPSIxNTguMzMzIiBoZWlnaHQ9IjE5MDAiIHRyYW5zZm9ybT0icm90YXRlKC05MCAxIDk1MSkiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K" alt="" />
      </div>

      <div class="marker marker-1">
        <span class="marker-icon"></span>
        <p class="marker-label">Experience</p>
      </div>

      <div class="marker marker-2">
        <span class="marker-icon"></span>
        <p class="marker-label">Skills</p>
      </div>

      <div class="hero-content">
{blocks}
      </div>

      <div class="hero-scroll-progress-bar"></div>
    </div>
"""

# Replace the page-content block
pattern = r'<div class="page-content">.*?</aside>\s*</div>\s*</div>'
new_content = re.sub(pattern, new_page_content, content, flags=re.DOTALL)

# Add CSS link
if '<link rel="stylesheet" href="css/scroll.css">' not in new_content:
    new_content = new_content.replace('<link rel="stylesheet" href="css/main.css">', '<link rel="stylesheet" href="css/main.css">\n    <link rel="stylesheet" href="css/scroll.css">')

# Add GSAP and Lenis scripts
scripts = """
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js"></script>
    <script src="js/scroll_effect.js"></script>
"""
if 'gsap.min.js' not in new_content:
    new_content = new_content.replace('<script src="js/app.js"></script>', scripts + '    <script src="js/app.js"></script>')

with open('index_template.html', 'w') as f:
    f.write(new_content)

print("Template updated")
