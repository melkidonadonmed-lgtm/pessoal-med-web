def check_media_queries(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    media_stack = []
    issues = []
    
    for i, line in enumerate(lines, 1):
        text = line.strip()
        
        # Track @media openings
        if text.startswith('@media'):
            media_stack.append({'line': i, 'type': text, 'depth': 0})
            # Count braces on same line
            if '{' in text:
                media_stack[-1]['depth'] += text.count('{')
            continue
        
        # If inside a media query
        if media_stack:
            # Count braces
            opens = text.count('{')
            closes = text.count('}')
            media_stack[-1]['depth'] += opens - closes
            
            if media_stack[-1]['depth'] <= 0:
                issues.append(f"Media query at line {media_stack[-1]['line']} closes at line {i}: {media_stack[-1]['type']}")
                media_stack.pop()
    
    # Check for unclosed media queries
    for media in media_stack:
        issues.append(f"UNCLOSED media query at line {media['line']}: {media['type']}")
    
    return issues

issues = check_media_queries('styles.css')
for issue in issues:
    print(issue)
