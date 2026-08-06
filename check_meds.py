import re

with open(r'C:\Users\melki\.gemini\antigravity\scratch\script.js', 'r', encoding='utf-8') as f:
    content = f.read()

med_matches = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"]', content)
print("Found IDs in script.js:")
for m in med_matches:
    print(" -", m)
