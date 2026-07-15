import re

with open('index.html', 'r') as f:
    content = f.read()

content = re.sub(r'swiming_pool_instructions\.png\?v=\d+', 'swiming_pool_instructions.png?v=7', content)

with open('index.html', 'w') as f:
    f.write(content)
