set terminal jpeg enhanced font 12
set title font "sans,20"
set xlabel font "sans,16"
set ylabel font "sans,16"
set xtic font "sans,10"
set ytic font "sans,10"
set title "Methods : LoC"          
set xlabel "Lines of Code per File"
set ylabel "Methods per File"      
set autoscale                      
set datafile separator ","         
set output "plot_scatter_methods_to_loc.jpeg"   
plot "results_methods_per_loc.csv" title "" pt 7 ps 1

set xtic font "sans,6"
set boxwidth 0.8
set xtics format ""
set grid ytics
set style fill solid
set title "Method Name Lengths"          
set xlabel "Length"
set ylabel "Count"      
set autoscale                      
set datafile separator ","         
set output "plot_bar_chart_method_name_lengths.jpeg"   
plot "results_method_name_length_counts.csv" using 1:2:xtic(1) with boxes title ""