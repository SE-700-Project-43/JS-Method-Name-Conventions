ECHO Hello World

node "./parser/index.js"

python -u "./analyser/splitter.py"

gnuplot.exe ./results/generate_plots.gnuplot

ECHO done

