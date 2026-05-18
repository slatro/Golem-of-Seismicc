import urllib.request
import re

urls = [
    "https://www.specie.finance/",
    "https://blend.money/",
    "https://www.shift-apply.com/",
    "https://avvio.xyz/",
    "https://vend.money/",
    "https://www.promis.fi/",
    "https://www.via.xyz/",
    "https://www.portmarkets.com/",
    "https://dashx.xyz/"
]

for url in urls:
    print(f"--- {url} ---")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            html = response.read().decode('utf-8')
            # Find the first svg
            match = re.search(r'<svg[^>]*>.*?</svg>', html, re.IGNORECASE | re.DOTALL)
            if match:
                svg = match.group(0)
                # print just the paths
                paths = re.findall(r'<path[^>]*d="([^"]+)"', svg)
                print(paths)
            else:
                print("No SVG found")
    except Exception as e:
        print(f"Error: {e}")
