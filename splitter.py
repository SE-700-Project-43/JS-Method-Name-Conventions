import csv
from spiral import ronin
import enchant
import spacy
import language_tool_python

tool = language_tool_python.LanguageTool('en-US')

# text = "the quick brown fox jumped the over chair"
# matches = tool.check(text)
# print("working " + text)
# print(matches)


d = enchant.Dict("en_US")
nlp = spacy.load("en_core_web_sm")

#file for splitter results
f = open('./results.csv', 'w')
writer = csv.writer(f)

#file for non dictionary words
nonDictionaryFile = open('./nonDictionary.txt', 'w')

variableNames = []

# read in names 
with open('names.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        variableNames.append(row[0])

print(variableNames)

columnNames = ["Variable Name", "word", "isDictionary", "POS Tag", "Length", "Grammar", "IsCamelCase", "isUnderscoreCase"]
writer.writerow(columnNames)

def all_lower(my_list):
    return [x.lower() for x in my_list]

def checkGrammar(name):
    lowercase = all_lower(name)
    sentence = " ".join(lowercase).capitalize()
    matches = tool.check(sentence)

    if not matches:
        return True
    else:
        return False
    
def checkCamelCase(words):
  for (index, x) in enumerate(words):
      print(x, index)

      if index is 0:
          if not x[0].islower():
              return False
      else:
          if not x[0].isupper(): 
              return False 
  return True

def checkUnderScoreCase(word):
    if "_" not in word: 
      return False
    
    roninSplitter = ronin.split(word)
    pythonSplitter = word.split("_")

    return roninSplitter == pythonSplitter

# analysis
for s in variableNames:
    splitWords = ronin.split(s)
    isGrammarCorrect = checkGrammar(splitWords)
    for word in splitWords:
        dictWord = d.check(word)
        # print(f)
        doc = nlp(word)
        isCamel = checkCamelCase(splitWords)
        isUnderscore = checkUnderScoreCase(s)
        row = [s, word, str(dictWord), str(doc[0].pos_), len(word), str(isGrammarCorrect), isCamel, isUnderscore]
        writer.writerow(row)

        #not a dictionary word, check for idiom/slang/abbreviatoin/acronym
        if not dictWord:
            nonDictionaryFile.write(word)
            nonDictionaryFile.write('\n')
            

f.close()
nonDictionaryFile.close()

