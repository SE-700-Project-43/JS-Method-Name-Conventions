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

<<<<<<< HEAD
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

=======
>>>>>>> 54fa1305e389116edc1f15f0e83c1069b67f531b
def all_lower(my_list):
    return [x.lower() for x in my_list]

def check_grammatical_structure(name):
    lowercase = all_lower(name)
    sentence = " ".join(lowercase).capitalize()
    matches = tool.check(sentence)

    if not matches:
        return True
    else:
        return False
<<<<<<< HEAD
    
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
=======

words_file = open('./results_words_conventions.csv', 'w', newline='')
words_writer = csv.writer(words_file)

names_file = open('./results_method_names_conventions.csv', 'w', newline='')
names_writer = csv.writer(names_file)

names_lengths_file = open('./results_method_name_length_counts_by_words.csv', 'w', newline='')
names_lengths_writer = csv.writer(names_lengths_file)
names_lengths = {}

method_names = []

# read in names 
with open('results_method_names.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        method_names.append(row[0])

# print(variableNames)

columnNames = ["Method Name", "Individual Word", "Dictionary Word", "POS Tag", "Length (Characters)"]
words_writer.writerow(columnNames)

columnNames = ["Method Name", "Length (Words)", "Grammatical Structure", "Verb Phrase", "Full Words"]
names_writer.writerow(columnNames)

# analysis
for name in method_names:
    split_words = ronin.split(name)
    is_grammatically_correct = check_grammatical_structure(split_words)
    is_verb_phrase = False
    is_full_words = True

    for word in split_words:
        is_dictionary_term = str(d.check(word))
        part_of_speech_tag = str(nlp(word)[0].pos_)

        row = [name, word, is_dictionary_term, part_of_speech_tag, len(word)]
        words_writer.writerow(row)

        if part_of_speech_tag == "VERB":
            is_verb_phrase = True

        if len(word) == 1:
            is_full_words = False

    if (len(split_words) > 0):
        row = [name, len(split_words), is_grammatically_correct, is_verb_phrase, is_full_words]
        names_writer.writerow(row)

        names_lengths[len(split_words)] = names_lengths.get(len(split_words), 0) + 1 

for k,v in names_lengths.items():
    row = [k , v]
    names_lengths_writer.writerow(row)
>>>>>>> 54fa1305e389116edc1f15f0e83c1069b67f531b

words_file.close()
names_file.close()
names_lengths_file.close()
