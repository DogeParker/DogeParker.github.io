import os
import json

folder = "My Computer"
files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f)) and f != "manifest.json"]

with open(os.path.join(folder, "manifest.json"), "w") as f:
    json.dump(files, f, indent=2)