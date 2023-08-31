set terminal jpeg enhanced font 12

set title font "sans,20"
set xlabel font "sans,16"
set ylabel font "sans,16"
set tic scale 0
set xtic font "sans,10"
set ytic font "sans,10"
set title "Methods : LoC"          
set xlabel "Lines of Code per File"
set ylabel "Methods per File"      
set autoscale                      
set datafile separator ","         
set output "./results/plot_scatter_methods_to_loc.jpeg"   
plot "./results/results_methods_per_loc.csv" title "" pt 7 ps 1 linecolor rgb "#2998D4"

set boxwidth 0.8
set xtics format ""
set grid ytics
set style fill solid
set title "Method Name Lengths by Words"          
set xlabel "Length"
set ylabel "Number of Names"    
set autoscale                      
set datafile separator ","         
set output "./results/plot_bar_chart_method_name_lengths_by_words.jpeg"   
plot "./results/results_method_name_length_counts_by_words.csv" using 1:2:xtic(1) with boxes title "" linecolor rgb "#2998D4"

set boxwidth 0.8
set xtics rotate by -45
set xtic font "sans,8"
set style fill solid
set title "Method Naming Conventions Adherence (%)"          
set xlabel "Convention" offset 0,2,0
set ylabel "Percentage of Method Names" font "sans,11" offset 1,0,0        
set yrange [0:100]             
set datafile separator ","         
set output "./results/plot_bar_chart_method_name_convention_percent.jpeg"   
plot "./results/results_method_names_conventions_counts.csv" using 3:xtic(1) with boxes title "" linecolor rgb "#2998D4", '' u 0:3:3 with labels textcolor "#2998D4" offset 0.0,0.5 title " "

set boxwidth 0.8
set xtics format ""
set xtics rotate by -45
set xtic font "sans,8"
set grid ytics
set style fill solid
set title "Method Name Conventions Adherence"          
set xlabel "Convention" offset 0,2,0
set ylabel "Number of Names" font "sans,15" offset 1,0,0      
set autoscale                      
set datafile separator ","         
set output "./results/plot_bar_chart_method_name_convention_counts.jpeg"   
plot "./results/results_method_names_conventions_counts.csv" using 2:xtic(1) with boxes title "" linecolor rgb "#2998D4", '' u 0:2:2 with labels textcolor "#2998D4" offset 0.0,0.5 title " "

set xtic font "sans,6"
set boxwidth 0.7
set xtics format ""
set xtics rotate by 0 font "sans,5"
set grid ytics
set style fill solid
set title "Method Name Length by Characters"          
set xlabel "Length" offset 0,0,0 
set ylabel "Number of Names"
set autoscale                      
set datafile separator ","         
set output "./results/plot_bar_chart_method_name_lengths.jpeg"   
plot "./results/results_method_name_length_counts.csv" using 1:2:xtic(1) with boxes title "" linecolor rgb "#2998D4"