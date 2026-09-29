"""Optional sample crawl: pip install advertools==0.16.6 in a separate venv.
Run with that venv activated so Scrapy is on PATH. Does not submit indexing requests.
"""
import argparse
from pathlib import Path
import advertools as adv

parser = argparse.ArgumentParser()
parser.add_argument("output", help="New JSONL output path (do not reuse an existing crawl)")
args = parser.parse_args()
output = Path(args.output)
if output.exists():
    parser.error("Choose a new output filename; existing evidence is preserved")
output.parent.mkdir(parents=True, exist_ok=True)
paths = [
    "/packaging/custom-rigid-boxes",
    "/industries/cosmetics-skincare-packaging",
    "/products/custom-Christmas-ornaments-divided-mailer",
    "/products/statement-cuff-gift-shoulder",
    "/products/holiday-hamper-layers-tiered",
    "/products/signature-perfume-lift-off",
    "/products/skincare-ritual-collapsible-magnetic-rigid-box",
    "/products/custom-wrapped-mooncakes-window-tuck",
    "/request-a-quote?product=MTT-R0501&product_family=rigid",
]
adv.crawl(["https://mttpackaging.com" + path for path in paths], str(output),
    follow_links=False,
    custom_settings={"CONCURRENT_REQUESTS": 2, "DOWNLOAD_DELAY": 0.5, "LOG_LEVEL": "ERROR"},
    xpath_selectors={"main_copy": "//main//text()[not(ancestor::script) and not(ancestor::style)]",
                     "robots": "//meta[@name='robots']/@content"})
