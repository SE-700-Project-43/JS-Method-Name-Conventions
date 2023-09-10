@echo off
set date=%1

node "./parser/deleteDir.js" ./repo_finder/repo_names.txt

ECHO Finding Repos Created Before %date%

node ./repo_finder/index.js %date%

ECHO Repos Found

node script.js

ECHO Analysis Complete

node expSizeWriter.js
gnuplot.exe ./results/generate_exp_size_plots.gnuplot

ECHO Exp Size Plots Complete