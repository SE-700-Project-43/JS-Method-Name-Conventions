abbrevations = []
acronyms = []

with open("./analyser/abbreviation.txt", "r") as file:
  for line in file:
    abbrevations.append(line.strip()) 


with open("./analyser/acronym.txt", "r") as file:
  for line in file:
    acronyms.append(line.strip()) 

acronym_count = 0
abbrevation_count = 0
total_count = 0

with open("./analyser/nonDictionary.txt", "r") as file:
  for word in file:
    total_count += 1
    if word in abbrevations:
      abbrevation_count += 1
    if word in acronyms:
      acronym_count += 1

print("Abbreviation Percentage ", abbrevation_count/total_count * 100, "%")
print("Acronyn Percentage :", acronym_count/total_count * 100, "%")

  