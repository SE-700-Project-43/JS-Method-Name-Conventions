set terminal jpeg enhanced font 12

set title font "sans,20"
set xlabel font "sans,16"
set ylabel font "sans,16"
set tic scale 0
set xtic font "sans,10"
set ytic font "sans,10"
set title "Naming Style Against Experience"          
set xlabel "Experience (Avg Developer Exp. In Years)"
set xrange [0:*]
set ylabel "Naming Style (%)"     
set yrange [0:100] 
set datafile separator ","         
set output "./results/plot_scatter_naming_style_experience.jpeg"   
plot "./results/experience_size_naming_style.csv" using 4:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Grammatical Structure Against Experience"          
set xlabel "Experience (Avg Developer Exp. In Years)"
set ylabel "Grammatical Structure (%)"  
set output "./results/plot_scatter_grammatical_structure_experience.jpeg"   
plot "./results/experience_size_grammatical_structure.csv" using 4:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"