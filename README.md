# JS-Method-Name-Conventions
This repository contains a tool used to extract and analyse method names in a JavaScript environemnt. Method names are compared against eight naming guidelines as proposed by Alsuhaibani et al. The tool automates the extraction of JavaScript source code, parsing in method names and analysing them against the guidelines. 

## Setup instructions

The tool needs the following prerequisites.

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [Python 3.9 or later](https://www.python.org/)
- [Personal GitHub Token](https://docs.github.com/en/enterprise-server@3.6/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

Clone the repo to get started!

```bash
git clone https://github.com/SE-700-Project-43/JS-Method-Name-Conventions.git
```

### Installing dependencies

1. Node Dependencies

```
npm install
```

2. Python Dependencies

```
pip install -r requirements.txt
```

3. Adding Personal GitHub Token

Create a .env file in the root directory and add your Personal Github Token.

```
GITHUB_TOKEN=YOURGITHUBTOKEN
```

### Running the tool

Run the bash script `full.bat` to start the tool. The script takes in two parameters, a start date and an end date in the format of YYYY-MM-DD. The start date must be before the end date, otherwise an error will be thrown. Each instance of running the tool will produce results for **ten** repositories created within the date range. 
An example is shown below of calling the script:

```
cmd /c full.bat 2023-01-01 2023-02-01
```

All results can be found in the `/results` subfolder.

## Guidelines Paper Citation

Alsuhaibani, R., Newman, C., Decker, M., Collard, M.L., Maletic, J.I., "On the Naming of Methods: A Survey of Professional Developers", in the Proceedings of the 43rd International Conference on Software Engineering (ICSE), Madrid Spain, May 25 - 28, 2021, 13 pages
