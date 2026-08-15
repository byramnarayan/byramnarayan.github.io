import json
from datetime import UTC, datetime
from pathlib import Path

from jinja2 import Environment, FileSystemLoader

# Load JSON data
with Path("portfolio.json").open(encoding="utf-8") as f:
    data = json.load(f)

# Add any extra context if needed
data["current_year"] = datetime.now(tz=UTC).year

if "social_links" in data:
    for link in data["social_links"]:
        if link.get("svg_path"):
            with Path(link["svg_path"]).open(encoding="utf-8") as svg_file:
                link["svg_data"] = svg_file.read()

# Set up Jinja environment
env = Environment(loader=FileSystemLoader("."), autoescape=True)
index_template = env.get_template("index_template.html")
resume_template = env.get_template("resume_template.html")

# Render the template with the data
html_output = index_template.render(**data)
resume_output = resume_template.render(**data)

# This is equivalent to...
# html_output = index_template.render(name=data["name"], label=data["label"]...)
# resume_output = resume_template.render(name=data["name"], label=data["label"]...)

# Generate blog placeholder
blog_dir = Path("blog")
blog_dir.mkdir(exist_ok=True)
blog_index_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Blog - {{data['name']}}</title>
  <link rel="stylesheet" href="../css/main.css">
  <style>
    body {{ display: flex; justify-content: center; align-items: center; height: 100vh; }}
    h1 {{ color: var(--accent-blue); }}
  </style>
</head>
<body>
  <div style="text-align: center;">
    <h1>Blog Coming Soon</h1>
    <a href="../index.html">← Back to Portfolio</a>
  </div>
</body>
</html>"""
with (blog_dir / "index.html").open("w", encoding="utf-8") as f:
    f.write(blog_index_html)

# Write the output to an HTML file
with Path("index.html").open("w", encoding="utf-8") as f:
    f.write(html_output)

with Path("resume.html").open("w", encoding="utf-8") as f:
    f.write(resume_output)

print("HTML file generated successfully!")
