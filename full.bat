@echo off
set date=%1

node "./parser/deleteDir.js" ./repo_finder/repo_names.txt

ECHO Finding Repos Created Before %date%

node ./repo_finder/index.js %date%

ECHO Repos Found

node script.js

