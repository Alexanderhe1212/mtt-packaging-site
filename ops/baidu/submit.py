"""Submit only published MTT product and guide URLs, retaining per-URL receipts."""
import http.client
import json
import os
import re
import socket
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import urlopen

SITE = "https://mttpackaging.com"
HOST = "data.zz.baidu.com"
LEDGER = Path("/tmp/baidu-ledger/urls.json")
FIRST = SITE + "/zh/products/cased-harmonica-hinged-presentation-box"


def save(rows):
    LEDGER.write_text(json.dumps(rows, sort_keys=True, indent=1) + "\n")
    def git(*args):
        return subprocess.run(["git", *args], cwd=LEDGER.parent, check=True)
    git("add", "urls.json")
    if subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=LEDGER.parent).returncode:
        git("commit", "-qm", "Record Baidu submission state")
        git("push", "origin", "HEAD:refs/heads/baidu-receipts")


def main():
    token = os.environ.get("BAIDU_PUSH_TOKEN")
    if not token:
        sys.exit("Missing repository secret BAIDU_PUSH_TOKEN")
    print("Baidu credential available", flush=True)
    with urlopen(SITE + "/indexnow-content-manifest.json", timeout=30) as response:
        manifest = json.load(response)
    assert manifest["origin"] == SITE and manifest["pages"]
    live = {url for url in manifest["pages"] if re.fullmatch(
        re.escape(SITE) + r"/(?:zh/)?(?:products|insights)/[a-z0-9-]+", url)}
    rows = json.loads(LEDGER.read_text())
    for url in live:
        rows.setdefault(url, "pending")
    save(rows)
    queue = sorted((u for u in live if rows[u] == "pending"), key=lambda u: (u != FIRST, u))
    for url in queue:
        # Baidu Search Resource URL push endpoint is documented over HTTP; its TLS cert covers *.baidu.com only.
        conn = http.client.HTTPConnection(HOST, timeout=30)
        try:
            conn.connect()
        except (OSError, socket.error) as error:
            sys.exit("Baidu HTTP connection failed before credential transmission: " + str(error))
        rows[url] = "outcome unknown"
        save(rows)
        try:
            conn.request("POST", "/urls?" + urlencode({"site": SITE, "token": token}),
                         body=url.encode(), headers={"Content-Type": "text/plain"})
            response = conn.getresponse()
            body = json.loads(response.read())
        finally:
            conn.close()
        if response.status == 200 and body.get("success") == 1:
            rows[url] = {"accepted": True, "remain": body.get("remain"),
                         "run": os.environ.get("GITHUB_RUN_ID")}
            save(rows)
            print("Accepted", url, flush=True)
            if body.get("remain") == 0:
                break
        elif body.get("error"):
            rows[url] = "pending"
            save(rows)
            sys.exit("Baidu rejected the request. HTTP %s, API code %s" %
                     (response.status, body["error"]))
        else:
            sys.exit("Unexpected receipt. URL held for review: " + url)


if __name__ == "__main__":
    main()
