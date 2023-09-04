@echo off
set file_name=%1

node "./parser/deleteDir.js" ./analyser/nonDictionary.txt

ECHO Parsing Starting

node "./parser/index.js" %file_name%

ECHO Parsing Done

ECHO Analysis Starting

python -u "./analyser/splitter.py" %file_name%
python -u "./analyser/non_dictionary_word_checker.py" %file_name%

ECHO Analysis Done
ECHO Plotting Starting

gnuplot.exe -c ./results/generate_plots.gnuplot %file_name% 

ECHO Plotting Done

SET dir=./parser/test_scripts/%file_name%

ECHO Deleting Repo
node "./parser/deleteDir.js" %dir%
ECHO Repo Deleted