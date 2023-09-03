@echo off
set file_name=%1

ECHO Parsing Starting

node "./parser/index.js" %file_name%

ECHO Parsing Done

ECHO Deleting Repo
node "./parser/deleteDir.js" %file_name%
ECHO Repo deleted

ECHO Analysis Starting

python -u "./analyser/splitter.py" %file_name%
python -u "./analyser/non_dictionary_word_checker.py"

ECHO Analysis Done
ECHO Plotting Starting

gnuplot.exe ./results/generate_plots.gnuplot

ECHO Plotting Done