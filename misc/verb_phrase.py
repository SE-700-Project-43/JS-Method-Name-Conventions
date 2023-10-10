import spacy
from spiral import ronin

natural_language_processor = spacy.load("en_core_web_sm")

# Using readlines()
file1 = open('./misc/all_method_names.txt', 'r')
Lines = file1.readlines()
 
count = 0
verb_adherence_count = 0
# Strips the newline character
for line in Lines:
    count += 1
    # print("Line{}: {}".format(count, line.strip()))

    method_name = line.strip()

    # print(method_name)

    split_words = ronin.split(method_name)

    for word in split_words:
      part_of_speech_tag = str(natural_language_processor(word)[0].pos_)

      if part_of_speech_tag == "VERB":
            verb_adherence_count += 1
            continue
      

print(verb_adherence_count)
print(count)
print((verb_adherence_count/(verb_adherence_count + count)) * 100)