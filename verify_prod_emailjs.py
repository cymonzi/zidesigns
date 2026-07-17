import re
from urllib.request import urlopen
from urllib.error import URLError, HTTPError

base = "https://zidesigns.vercel.app"
print(f"Checking deployed site: {base}/start-project")

try:
    html = urlopen(base + "/start-project", timeout=30).read().decode("utf-8", errors="ignore")
except Exception as exc:
    print("Failed to fetch production page:", exc)
    raise

scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
print(f"Found {len(scripts)} script tags with src")

keywords = ["template_y5ipuvd", "api.emailjs.com", "service_1ral4jg"]
found_any = False
for script in scripts:
    url = script if script.startswith("http") else base + script
    try:
        text = urlopen(url, timeout=30).read().decode("utf-8", errors="ignore")
    except Exception as exc:
        print(f"ERROR fetching {url}: {exc}")
        continue
    hits = [k for k in keywords if k in text]
    if hits:
        found_any = True
        print(f"MATCH in {url}")
        for hit in hits:
            print(f"  {hit}")

if not found_any:
    print("No matching EmailJS strings found in deployed bundles.")
else:
    print("Verified EmailJS strings in deployed bundles.")
