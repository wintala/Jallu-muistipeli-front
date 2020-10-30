import os

files = [file for file in os.listdir() if file.endswith(".jpg")]

# imports
for file in files:
    print(f"import {file[0:-4]} from './Jallut/{file}'")

#variables to list
print("[" + ", ".join(map(lambda x: x[0:-4], files)) + "]")
