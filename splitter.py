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

wordsFile = open('./results_words_dict_pos.csv', 'w', newline='')
wordsWriter = csv.writer(wordsFile)

namesFile = open('./results_method_name_grammar.csv', 'w', newline='')
namesWriter = csv.writer(namesFile)

variableNames = []

# read in names 
with open('results_method_names.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        variableNames.append(row[0])

# print(variableNames)

columnNames = ["Variable Name", "word", "isDictionary", "POS Tag", "Length", "Grammar"]
wordsWriter.writerow(columnNames)

columnNames = ["Variable Name", "Length", "Grammar"]
namesWriter.writerow(columnNames)

# analysis
for s in variableNames:
    splitWords = ronin.split(s)
    isGrammarCorrect = checkGrammar(splitWords)

    if (len(splitWords) > 0):
        row = [s, len(s), str(isGrammarCorrect)]
        namesWriter.writerow(row)

    for word in splitWords:
        dictWord = d.check(word)
        # print(f)
        doc = nlp(word)
        row = [s, word, str(dictWord), str(doc[0].pos_), len(word), str(isGrammarCorrect)]
        wordsWriter.writerow(row)

wordsFile.close()
namesFile.close()
