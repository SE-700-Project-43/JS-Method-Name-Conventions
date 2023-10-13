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
set label 'Average: 88.6%' at graph 1,1.025 right
set datafile separator ","         
set output "plot_scatter_naming_style_experience.jpeg"   
plot "./corrected_naming_style_adherence.csv" using 5:4 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Naming Style Against Size"
set xlabel "Size (Developers Contributing to Repo)"
set ylabel "Naming Style (%)"  
set output "plot_scatter_naming_style_size.jpeg"    
plot "./corrected_naming_style_adherence.csv" using 6:4 title "" pt 7 ps 1 linecolor rgb "#2998D4"