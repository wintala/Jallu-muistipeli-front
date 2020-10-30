import os

for i, file in enumerate(os.listdir()):
    if file.endswith(".jpg"):
        os.rename(file, f"jallu{i}.jpg")
