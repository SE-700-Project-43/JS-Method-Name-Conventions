abbrevations = []
with open("abbreviation.txt", "r") as file:
  for line in file:
    abbrevations.append(line.strip()) 

print(abbrevations)

with open("nonDictionary.txt", "r") as file:
  for word in file:
    print(word, word in abbrevations)
  