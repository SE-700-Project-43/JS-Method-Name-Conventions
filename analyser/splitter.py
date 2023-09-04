import csv
import sys
from spiral import ronin
import enchant
import spacy
from naming_style_check import check_grammatical_structure, check_camel_case, check_underscore_case

args = sys.argv
repo_name = args[1]

# checker for dictionary words
dictionary = enchant.Dict("en_US")

# determines the part-of-speech tag for words
natural_language_processor = spacy.load("en_core_web_sm")

# output CSV file for individual word data
words_file = open(sys.path[0] + '/../results/' + repo_name + '_results_words_conventions.csv', 'w', newline='')
words_writer = csv.writer(words_file)
words_writer.writerow(["Method Name", "Individual Word", "Dictionary Word", "POS Tag", "Length (Characters)"])

# output CSV file for entire method name data
names_file = open(sys.path[0] + '/../results/' + repo_name + '_results_method_names_conventions.csv', 'w', newline='')
names_writer = csv.writer(names_file)
names_writer.writerow(["Method Name", "Length (Words)", "Grammatical Structure", "Verb Phrase", "Full Words", "Camel Case", "Underscore Case"])

# output CSV file containing method name length distribution of input repo(s)
names_lengths_file = open(sys.path[0] + '/../results/' + repo_name + '_results_method_name_length_counts_by_words.csv', 'w', newline='')
names_lengths_writer = csv.writer(names_lengths_file)
names_lengths = {}

# output text file containing non-dictionary words
names_non_dict_file = open(sys.path[0] + '/../analyser/nonDictionary.txt', 'w')

# output CSV file containing the number of method names that follow each convention
names_conventions_file = open(sys.path[0] + '/../results/' + repo_name + '_results_method_names_conventions_counts.csv', 'w', newline='')
names_conventions_writer = csv.writer(names_conventions_file)
names_grmr_struct = {}
names_verbs = {}
names_full = {}
names_camel = {}
names_underscore = {}
names_dict = {}
names_length = {}

method_names = []

# read in method names from JS program output
with open(sys.path[0] + '/../results/' + repo_name + '_results_method_names.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        method_names.append(row[0])

# loop through every method name and check them against the conventions
for name in method_names:
    split_words = ronin.split(name) # using the Ronin splitter from the Spiral package to split the method name
    is_grammatically_correct = check_grammatical_structure(split_words) # check if the method name is grammatically correct
    is_camelcase = check_camel_case(split_words) # check if the method name follows correct camel casing convention
    is_underscore_case = check_underscore_case(name) # check if the method name follows correct underscore casing convention

    is_verb_phrase = False
    is_full_words = True
    is_dictionary_terms = True

    # loop through each individual word within the method name and check them against the conventions
    for word in split_words:
        is_dictionary_term = str(dictionary.check(word)) # check if the word is a dictionary term
        part_of_speech_tag = str(natural_language_processor(word)[0].pos_) # determine the part-of-speech tag of the word

        words_writer.writerow([name, word, is_dictionary_term, part_of_speech_tag, len(word)])

        # if any word within a method name is a verb then record that method name as being or containing a verb phrase
        if part_of_speech_tag == "VERB":
            is_verb_phrase = True

        # if any word within a method name is one character in length then record that method name as not using only full words
        if len(word) == 1:
            is_full_words = False

        if is_dictionary_term == "False":
            names_non_dict_file.write(word)
            names_non_dict_file.write("\n")
            is_dictionary_terms = False

    # if the method name was successfully split into one or more words then record the conventions associated with it
    if len(split_words) > 0:
        names_writer.writerow([name, len(split_words), is_grammatically_correct, is_verb_phrase, is_full_words, is_camelcase, is_underscore_case])

        names_lengths[len(split_words)] = names_lengths.get(len(split_words), 0) + 1 
        names_grmr_struct[str(is_grammatically_correct)] = names_grmr_struct.get(str(is_grammatically_correct), 0) + 1
        names_verbs[str(is_verb_phrase)] = names_verbs.get(str(is_verb_phrase), 0) + 1
        names_full[str(is_full_words)] = names_full.get(str(is_full_words), 0) + 1
        names_camel[str(is_camelcase)] = names_camel.get(str(is_camelcase), 0) + 1
        names_underscore[str(is_underscore_case)] = names_underscore.get(str(is_underscore_case), 0) + 1
        names_dict[str(is_dictionary_terms)] = names_dict.get(str(is_dictionary_terms), 0) + 1

        if 3 <= len(split_words) <= 7:
            names_length['True'] = names_length.get('True', 0) + 1

for k,v in names_lengths.items():
    row = [k , v]
    names_lengths_writer.writerow(row)

num_methods = len(method_names)

names_conventions_writer.writerow(["NAMING STYLE", names_camel.get('True', 0) + names_underscore.get('True', 0), round((names_camel.get('True', 0) + names_underscore.get('True', 0))/num_methods*100, 1)])
names_conventions_writer.writerow(["GRAMMATICAL STRUCTURE", names_grmr_struct.get('True', 0), round(names_grmr_struct.get('True', 0)/num_methods*100, 1)])
names_conventions_writer.writerow(["VERB PHRASE", names_verbs.get('True', 0), round(names_verbs.get('True', 100)/num_methods*100, 1)])
names_conventions_writer.writerow(["DICTIONARY TERMS", names_dict.get('True', 0), round(names_dict.get('True', 0)/num_methods*100, 1)])
names_conventions_writer.writerow(["FULL WORDS", names_full.get('True', 0), round(names_full.get('True', 0)/num_methods*100, 1)])
names_conventions_writer.writerow(["LENGTH", names_length.get('True', 0), round(names_length.get('True', 0)/num_methods*100, 1)])

words_file.close()
names_file.close()
names_lengths_file.close()