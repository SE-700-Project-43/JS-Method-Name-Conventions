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

words_file = open('./results_words_dict_pos.csv', 'w', newline='')
words_writer = csv.writer(words_file)

names_file = open('./results_method_name_grammar.csv', 'w', newline='')
names_writer = csv.writer(names_file)

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

    for word in split_words:
        is_dictionary_term = str(d.check(word))
        part_of_speech_tag = str(nlp(word)[0].pos_)

        row = [name, word, is_dictionary_term, part_of_speech_tag, len(word)]
        words_writer.writerow(row)

        if part_of_speech_tag == "VERB":
            is_verb_phrase = True

    if (len(split_words) > 0):
        row = [name, len(split_words), is_grammatically_correct, is_verb_phrase]
        names_writer.writerow(row)

words_file.close()
names_file.close()
