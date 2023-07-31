import language_tool_python
from spiral import ronin

tool = language_tool_python.LanguageTool('en-US')

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
    
def check_if_camel_case(words):
  for (index, x) in enumerate(words):
    #   print(x, index)

      if index == 0:
          if not x[0].islower():
              return False
      else:
          if not x[0].isupper(): 
              return False 
  return True

def check_if_underscore_case(word):
    if "_" not in word: 
      return False
    
    ronin_split = ronin.split(word)
    python_split = word.split("_")

    return ronin_split == python_split