
# # from spiral.simple_splitters import pure_camelcase_split
# import sys
# from spiral import ronin
# from spiral import ronin

import csv
from spiral import ronin
import enchant
import spacy

d = enchant.Dict("en_US")
nlp = spacy.load("en_core_web_sm")

f = open('./results.csv', 'w')
writer = csv.writer(f)

variableNames = []

# read in names 
with open('names.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        variableNames.append(row[0])

print(variableNames)

columnNames = ["Variable Name", "word", "isDictionary", "POS Tag"]
writer.writerow(columnNames)

# analysis
for s in variableNames:
    splitWords = ronin.split(s)

    for word in splitWords:
        dictWord = d.check(word)
        # print(f)
        doc = nlp(word)
        row = [s, word, str(dictWord), str(doc[0].pos_)]
        writer.writerow(row)

f.close()