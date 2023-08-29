import csv

abbrevations = []
acronyms = []
name_count = 0

with open('./results/results_method_names.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        name_count += 1

with open("./analyser/abbreviation.txt", "r") as file:
  for line in file:
    abbrevations.append(line.strip().lower()) 


with open("./analyser/acronym.txt", "r") as file:
  for line in file:
    acronyms.append(line.strip().lower()) 

acronym_count = 0
abbrevation_count = 0
total_count = 0

with open("./analyser/nonDictionary.txt", "r") as file:
  for word in file:
    word = word.lower()
    total_count += 1
    if word in abbrevations:
      abbrevation_count += 1
    if word in acronyms:
      acronym_count += 1

with open('./results/results_method_names_conventions_counts.csv', 'a', newline='') as file:
  writer = csv.writer(file, delimiter=',')
  writer.writerow(['ABBREVIATION USED', abbrevation_count, round(abbrevation_count/name_count*100,1)])
  writer.writerow(['ACRONYM USED', acronym_count, round(acronym_count/name_count*100,1)])

  