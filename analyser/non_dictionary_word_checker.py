import csv
import sys

args = sys.argv
repo_name = args[1]

abbreviations = []
acronyms = []

with open("./analyser/abbreviation.txt", "r") as file:
  for line in file:
    abbreviations.append(line.strip().lower()) 

with open("./analyser/acronym.txt", "r") as file:
  for line in file:
    acronyms.append(line.strip().lower()) 

acronym_count = 0
abbreviation_count = 0
total_count = 0

with open("./analyser/nonDictionary.txt", "r") as file:
  for word in file:
    word = word.lower()
    total_count = total_count + 1
    if word in abbreviations:
      abbreviation_count = abbreviation_count + 1
    if word in acronyms:
      acronym_count = acronym_count + 1

if total_count != 0:
  with open('./results/' + repo_name + '_results_method_names_conventions_counts.csv', 'a', newline='') as file:
    writer = csv.writer(file, delimiter=',')
    writer.writerow(['ABBREVIATIONS', abbreviation_count, round(abbreviation_count/total_count*100,1)])
    writer.writerow(['ACRONYMS', acronym_count, round(acronym_count/total_count*100,1)])
