@echo off
set startDate=%1
set endDate=%2

node "./parser/deleteDir.js" ./repo_finder/repo_names.txt

ECHO Finding Repos Created Between %startDate% and %endDate%

node ./repo_finder/index.js %startDate% %endDate%

ECHO Repos Found

node script.js

ECHO Analysis Complete

node ./misc/expSizeWriter.js
gnuplot.exe ./results/generate_exp_size_plots.gnuplot

ECHO Exp Size Plots Complete