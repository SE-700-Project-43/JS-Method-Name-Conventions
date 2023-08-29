@echo off
ECHO Parsing Starting

node "./parser/index.js"

ECHO Parsing Done
ECHO Analysis Starting

python -u "./analyser/splitter.py"
python -u "./analyser/non_dictionary_word_checker.py"

ECHO Analysis Done
ECHO Plotting Starting

gnuplot.exe ./results/generate_plots.gnuplot

ECHO Plotting Done