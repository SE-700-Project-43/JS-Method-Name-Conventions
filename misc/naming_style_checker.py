# import required module
import os
import csv
from spiral import ronin
from analyser.naming_style_check import check_grammatical_structure, check_camel_case, check_underscore_case, check_pascal_case
# assign directory
directory = 'results'

totalCount = 0
totalSum = 0


# output CSV file for entire method name data
file = open('corrected_naming_style_adherence.csv', 'w', newline='')
writer = csv.writer(file)
writer.writerow(["Repo Name", "Total Adhered", "Total Method Count", "Percent", "Experience", "Size"])

# iterate over files in
# that directory
for filename in os.listdir(directory):
    

    f = os.path.join(directory, filename)
    
    # checking if it is a file
    if os.path.isfile(f) and f.endswith("_results_method_names.csv"):
        repo = f[8:]
        repo = repo[0:-25]
        exp = 0
        size = 0

        with open('results/' + repo + '_results_experience_and_size.txt', 'r', encoding="utf8") as text_file:
              lines = text_file.readlines()
              first = True
              for line in lines:
                    if first:
                        first = False
                        exp = float(line)
                    else:
                          size = float(line)

        
        with open(f, encoding="utf8") as csv_file:
                    totalCount += 1
                    total = 0
                    count = 0
                    csv_reader = csv.reader(csv_file, delimiter=',')
            
                    for row in csv_reader:

                        total += 1
                        name = row[0]
                        split_words = ronin.split(name)
                        if check_camel_case(split_words) or check_underscore_case(name) or check_pascal_case(split_words):
                            count += 1
                    
                    totalSum += count / total

                    writer.writerow([repo, count, total, round(count * 100 / total, 1), exp, size])



print(totalSum / totalCount)

