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

def check_grammatical_structure(name):
    lowercase = all_lower(name)
    sentence = " ".join(lowercase).capitalize()
    matches = tool.check(sentence)

    if not matches:
        return True
    else:
        return False

def checkCamelCase(words):
  for (index, x) in enumerate(words):
    #   print(x, index)

      if index == 0:
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

words_file = open('./results_words_conventions.csv', 'w', newline='')
words_writer = csv.writer(words_file)

names_file = open('./results_method_names_conventions.csv', 'w', newline='')
names_writer = csv.writer(names_file)

names_lengths_file = open('./results_method_name_length_counts_by_words.csv', 'w', newline='')
names_lengths_writer = csv.writer(names_lengths_file)
names_lengths = {}

names_conventions_file = open('./results_method_names_conventions_counts.csv', 'w', newline='')
names_conventions_writer = csv.writer(names_conventions_file)
names_grmr_struct = {}
names_verbs = {}
names_full = {}
names_camel = {}
names_underscore = {}

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

columnNames = ["Method Name", "Length (Words)", "Grammatical Structure", "Verb Phrase", "Full Words", "Camel Case", "Underscore Case"]
names_writer.writerow(columnNames)

# analysis
for name in method_names:
    split_words = ronin.split(name)
    is_grammatically_correct = check_grammatical_structure(split_words)
    is_verb_phrase = False
    is_full_words = True
    is_camelcase = checkCamelCase(split_words)
    is_underscore_case = checkUnderScoreCase(name)

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
        row = [name, len(split_words), is_grammatically_correct, is_verb_phrase, is_full_words, is_camelcase, is_underscore_case]
        names_writer.writerow(row)

        names_lengths[len(split_words)] = names_lengths.get(len(split_words), 0) + 1 
        names_grmr_struct[str(is_grammatically_correct)] = names_grmr_struct.get(str(is_grammatically_correct), 0) + 1
        names_verbs[str(is_verb_phrase)] = names_verbs.get(str(is_verb_phrase), 0) + 1
        names_full[str(is_full_words)] = names_full.get(str(is_full_words), 0) + 1
        names_camel[str(is_camelcase)] = names_camel.get(str(is_camelcase), 0) + 1
        names_underscore[str(is_underscore_case)] = names_underscore.get(str(is_underscore_case), 0) + 1

for k,v in names_lengths.items():
    row = [k , v]
    names_lengths_writer.writerow(row)

names_conventions_writer.writerow(["GRMR STRUCT TRUE", names_grmr_struct['True']])
names_conventions_writer.writerow(["GRMR STRUCT FALSE", names_grmr_struct['False']])
names_conventions_writer.writerow(["VERB PHRASE TRUE", names_verbs['True']])
names_conventions_writer.writerow(["VERB PHRASE FALSE", names_verbs['False']])
names_conventions_writer.writerow(["FULL WORDS TRUE", names_full['True']])
names_conventions_writer.writerow(["FULL WORDS FALSE", names_full['False']])
names_conventions_writer.writerow(["CAMEL CASE TRUE", names_camel.get('True', 0)])
names_conventions_writer.writerow(["UNDERSCORE CASE TRUE", names_underscore.get('True', 0)])

words_file.close()
names_file.close()
names_lengths_file.close()