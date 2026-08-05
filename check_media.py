opened = False
brace_depth = 0
start_line = 0
with open('styles.css') as f:
    lines = f.readlines()
for i, line in enumerate(lines, 1):
    text = line.strip()
    if '@media print' in text and not opened:
        opened = True
        start_line = i
        if '{' in text:
            brace_depth = 1
        else:
            brace_depth = 0
        print(f'First @media print starts at line {start_line}')
        continue
    if opened:
        brace_depth += text.count('{')
        brace_depth -= text.count('}')
        if brace_depth == 0 and i > start_line:
            print(f'First @media print ends at line {i}')
            break
