import language_tool_python
from spiral import ronin

language_tool = language_tool_python.LanguageTool('en-US')

#convert string to lowercase 
def all_lower(my_list):
    return [x.lower() for x in my_list]

#check if a method name has correct gramatical structure 
def check_grammatical_structure(name):
    lowercase = all_lower(name)
    sentence = " ".join(lowercase).capitalize()
    matches = language_tool.check(sentence)

    if not matches:
        return True
    else:
        return False

#check if method name is valid camel case styling
def check_camel_case(words):
  for (index, x) in enumerate(words):
    #   print(x, index)

      if index == 0:
          if not x[0].islower():
              return False
      else:
          if not x[0].isupper(): 
              return False 
  return True

#check if method name is valid underscore case styling
def check_underscore_case(word):
    if "_" not in word: 
      return False
    
    ronin_split = ronin.split(word)
    python_split = word.split("_")

    return ronin_split == python_split