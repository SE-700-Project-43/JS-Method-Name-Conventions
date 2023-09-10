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

set title "Verb Phrase Against Experience"
set xlabel "Experience (Avg Developer Exp. In Years)"
set ylabel "Verb Phrase (%)"  
set output "./results/plot_scatter_verb_phrase_experience.jpeg"   
plot "./results/experience_size_verb_phrase.csv" using 4:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Length Against Experience"
set xlabel "Experience (Avg Developer Exp. In Years)"
set ylabel "Length (%)"  
set output "./results/plot_scatter_length_experience.jpeg"   
plot "./results/experience_size_length.csv" using 4:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Full Words Against Experience"
set xlabel "Experience (Avg Developer Exp. In Years)"
set ylabel "Full Words (%)"  
set output "./results/plot_scatter_full_words_experience.jpeg"   
plot "./results/experience_size_full_words.csv" using 4:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Dictionary Terms Against Experience"
set xlabel "Experience (Avg Developer Exp. In Years)"
set ylabel "Dictionary Terms (%)"  
set output "./results/plot_scatter_dictionary_terms_experience.jpeg"   
plot "./results/experience_size_dictionary_terms.csv" using 4:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Abbreviations Against Experience"
set xlabel "Experience (Avg Developer Exp. In Years)"
set ylabel "Abbreviations (%)"  
set output "./results/plot_scatter_abbreviations_experience.jpeg"   
plot "./results/experience_size_abbreviations.csv" using 4:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Acronyms Against Experience"
set xlabel "Experience (Avg Developer Exp. In Years)"
set ylabel "Acronyms (%)"  
set output "./results/plot_scatter_acronyms_experience.jpeg"   
plot "./results/experience_size_acronyms.csv" using 4:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Naming Style Against Size"
set xlabel "Size (Developers Contributing to Repo)"
set ylabel "Naming Style (%)"  
set output "./results/plot_scatter_naming_style_size.jpeg"   
plot "./results/experience_size_naming_style.csv" using 5:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Grammatical Structure Against Size"
set xlabel "Size (Developers Contributing to Repo)"
set ylabel "Grammatical Structure (%)"  
set output "./results/plot_scatter_grammatical_structure_size.jpeg"   
plot "./results/experience_size_grammatical_structure.csv" using 5:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Verb Phrase Against Size"
set xlabel "Size (Developers Contributing to Repo)"
set ylabel "Verb Phrase (%)"  
set output "./results/plot_scatter_verb_phrase_size.jpeg"   
plot "./results/experience_size_verb_phrase.csv" using 5:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Length Against Size"
set xlabel "Size (Developers Contributing to Repo)"
set ylabel "Length (%)"  
set output "./results/plot_scatter_length_size.jpeg"   
plot "./results/experience_size_length.csv" using 5:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Full Words Against Size"
set xlabel "Size (Developers Contributing to Repo)"
set ylabel "Full Words (%)"  
set output "./results/plot_scatter_full_words_size.jpeg"   
plot "./results/experience_size_full_words.csv" using 5:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Dictionary Terms Against Size"
set xlabel "Size (Developers Contributing to Repo)"
set ylabel "Dictionary Terms (%)"  
set output "./results/plot_scatter_dictionary_terms_size.jpeg"   
plot "./results/experience_size_dictionary_terms.csv" using 5:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Abbreviations Against Size"
set xlabel "Size (Developers Contributing to Repo)"
set ylabel "Abbreviations (%)"  
set output "./results/plot_scatter_abbreviations_size.jpeg"   
plot "./results/experience_size_abbreviations.csv" using 5:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

set title "Acronyms Against Size"
set xlabel "Size (Developers Contributing to Repo)"
set ylabel "Acronyms (%)"  
set output "./results/plot_scatter_acronyms_size.jpeg"   
plot "./results/experience_size_acronyms.csv" using 5:3 title "" pt 7 ps 1 linecolor rgb "#2998D4"

