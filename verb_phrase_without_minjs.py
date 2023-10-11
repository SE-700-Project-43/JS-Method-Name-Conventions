# import required module
import os
import csv
from spiral import ronin
from analyser.naming_style_check import check_grammatical_structure, check_camel_case, check_underscore_case, check_pascal_case
# assign directory
directory = 'results'

total_percent = 0
total_count = 0

# iterate over files in
# that directory
for filename in os.listdir(directory):
    minjs = False

    f = os.path.join(directory, filename)
    
    # checking if it is a file
    if os.path.isfile(f) and f.endswith("_results_method_names.csv"):
        repo = f[8:]
        repo = repo[0:-25]
        
        with open(f, 'r', encoding="utf8") as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
        
            for row in csv_reader:
                if row[2].endswith(".min.js"):
                        minjs = True
                        print(repo, row[2])
                        break
                        
        if minjs:
             continue
        
        with open('results/' + repo + '_results_method_names_conventions_counts.csv', 'r', encoding="utf8") as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            
            for row in csv_reader:
                if row[0] == "VERB PHRASE":
                        total_percent += float(row[2])
                        total_count += 1

print(total_count, total_percent / total_count)



