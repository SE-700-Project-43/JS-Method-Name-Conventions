
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

for s in [ 'mStartCData', 'nonnegativedecimaltype', 'getUtf8Octets', 'GPSmodule', 'savefileas', 'nbrOfbugs']:
    splitWords = ronin.split(s)
    print(splitWords)

    for word in splitWords:
        dictWord = d.check(word)
        # print(f)
        doc = nlp(word)
        print(word + " " + str(dictWord) + " " + str(doc[0].pos_))
        row = [s, word, str(dictWord), str(doc[0].pos_)]
        writer.writerow(row)

f.close()