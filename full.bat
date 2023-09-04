@echo off
set date=%1

ECHO Finding Repos Created Before %date%

node ./repo_finder/index.js %date%

ECHO Repos Found

node script.js

