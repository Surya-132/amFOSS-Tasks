Step 1: Set Up Your Environment
1.1 Create a Python Virtual Environment
A virtual environment helps to keep your project’s dependencies separate from other projects. Here’s how to create and use one:

Open the Terminal: Press Ctrl + Alt + T to open a terminal window.

Install venv (if not already installed):

Type the following command and press Enter:

sudo apt-get install python3-venv

Navigate to your project folder:

Use the cd command to move to the folder where you want to create your project. For example:

cd ~/my_projects

Create a virtual environment:

Run the following command:

python3 -m venv myenv
This creates a new folder named myenv in your project directory.
Activate the virtual environment:

Run:

source myenv/bin/activate
You should see (myenv) at the beginning of your terminal prompt, indicating that the virtual environment is active.
Install Required Modules:

Now, install the necessary Python libraries:

pip install click subliminal babelfish requests moviepy beautifulsoup4

Step 2: Create the CLI Interface with Click
A CLI (Command-Line Interface) allows users to interact with your application via commands typed into the terminal.

Install Click (already installed if you followed Step 1):

Click is used for creating command-line interfaces.
Create a Python script for the CLI:

Use a text editor to create a new Python file. For example, open nano:
bash
Copy code
nano subtitle_finder.py
Write the CLI code

Save and exit:

In nano, press Ctrl + X, then Y to confirm saving, and Enter to exit.
Step 3: Find IMDb ID and Hash/File Size
You’ll need to find the IMDb ID of the movie, and optionally the hash and file size, to search for subtitles effectively.

Finding IMDb ID:

You may need an external tool or service to get the IMDb ID from the movie’s filename. This typically involves querying an online database.
Getting File Size and Hash:

File Size


