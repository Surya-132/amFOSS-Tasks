# A JOURNEY THROUGH THE CREATION OF MY FIRST TELEGRAM BOT 
## INTRODUCTION
 This is a project that I really like.As a Python enthusiast, I was excited to delve 
 deeper into the language using this project.
 This is was an interesting topic (for me) because I use bots all the time(In Discord) 
 and now i actually got to build one.
## PROJECT OVERVIEW
The task involved developing a Telegram bot focused on book browsing and 
recommendations for users. The bot had to do the following:

  1. Greeting: Provide a warm welcome when started.
  2. Genre: Prompt the user to input a genre.
  3. Book Preview: Offer a preview link for a book based on the user’s input.
  4. Specific Book Search: Ask the user for a specific book name and provide instructions to execute the /reading_list command.
  5. Reading List Management: Allow users to add or delete books from their reading list and view the list.
  6. Command Reference: Provide a list of available commands and their purposes upon request.

### Setting Up the Environment   
```
import requests
import csv
import io
from typing import Final
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes, ConversationHandler, CallbackQueryHandler
from docx import Document
from io import BytesIO
BOT_TOKEN = '6921875478:AAHjPqIVJrCqLt8j-206MTSF_ZIAMJ4PhjY'
API_KEY = 'AIzaSyDxhTNEXzvWblGDS0vuPLMayFG7bpyMTjk'
BOT_USERNAME : Final ='@Why_So_Long_Bot'
ASK_GENRE = 3
ASK_BOOK_NAME = 4
READING_LIST_FILE = "reading_list.docx"
```
### Initializing the reading_list command, the code for its sub-commands and their responses


def initialize_reading_list():
    doc = Document()
    doc.add_heading('Reading List', 0)
    doc.save(READING_LIST_FILE)

def add_book(title, link):
    doc = Document(READING_LIST_FILE)
    doc.add_paragraph(f"{title} - {link}")
    doc.save(READING_LIST_FILE)

def delete_book(title):
    doc = Document(READING_LIST_FILE)
    paragraphs = doc.paragraphs
    doc._body.clear_content()
    doc.add_heading('Reading List', 0)

    for paragraph in paragraphs:
        if title not in paragraph.text:
            doc.add_paragraph(paragraph.text)
    
    doc.save(READING_LIST_FILE)


async def button(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    if query.data == 'add_book':
        await query.edit_message_text(text="Please send the book title and preview link separated by a comma.")
        context.user_data['action'] = 'add_book'
    elif query.data == 'delete_book':
        await query.edit_message_text(text="Please send the book title to delete:")
        context.user_data['action'] = 'delete_book'
    elif query.data == 'view_list':
        await query.message.reply_document(document=open(READING_LIST_FILE, 'rb'))
      
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_action = context.user_data.get('action')

    if user_action == 'add_book':
        try:
            title, link = update.message.text.split(',')
            add_book(title.strip(), link.strip())
            await update.message.reply_text("Book added successfully!")
        except ValueError:
            await update.message.reply_text("Please send the book title and preview link in the correct format.")
    elif user_action == 'delete_book':
        title = update.message.text.strip()
        delete_book(title)
        await update.message.reply_text("Book deleted successfully!")

    
    context.user_data['action'] = None

### The code for commands 


async def preview(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Please provide the name of the book you need a preview link for.')
    return ASK_BOOK_NAME

async def handle_book_name(update: Update, context: ContextTypes.DEFAULT_TYPE):
    book_name = update.message.text
    preview_link = fetch_preview_link(book_name)
    
    if preview_link:
        message = f"Here's the preview link for <b>{book_name}</b>:\n<a href='{preview_link}'>{preview_link}</a>"
        await update.message.reply_text(message, parse_mode='HTML')
    else:
        await update.message.reply_text(f"No preview available for the book: {book_name}. Please try another book name.")
    
    return ConversationHandler.END

def fetch_preview_link(book_name):
    url = f"https://www.googleapis.com/books/v1/volumes?q=intitle:{book_name}&key={API_KEY}"
    response = requests.get(url)
    if response.status_code != 200:
        return None
    
    data = response.json()
    if 'items' in data and len(data['items']) > 0:
        volume_info = data['items'][0].get('volumeInfo', {})
        return volume_info.get('previewLink', "No preview link available.")
    
    return None

async def list_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text('Please type in the specific book name. You can use the /reading_list command to manage your list.')

async def reading_list(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("Add a book", callback_data='add_book')],
        [InlineKeyboardButton("Delete a book", callback_data='delete_book')],
        [InlineKeyboardButton("View Reading List", callback_data='view_list')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text('Choose an action:', reply_markup=reply_markup)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    help_text = (
        "/start -  Welcome to the Book Bot!\n"
        "/book -  Enter a genre to discover great books\n"
        "/preview -  Type a book name to get a preview link\n"
        "/list -  Manage your reading list with book names\n"
        "/reading_list -  View or modify your personalized reading list\n"
        "/help -  Get a list of all available commands"
    )
    await update.message.reply_text(help_text)


### The commandhandlers

    application.add_handler(CommandHandler("start", start))
    application.add_handler(book_handler)
    application.add_handler(preview_handler)
    application.add_handler(CommandHandler("reading_list", reading_list))
    application.add_handler(CallbackQueryHandler(button))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    application.add_handler(CommandHandler("list", list_command))
    application.add_handler(CommandHandler("help", help_command))


## My  experience
This project took longer than expected, and at times, I wondered if it was worth the effort.
I could have probably tackled two more tasks instead. However, the learning experience 
was invaluable. There’s definitely a learning curve, but I’m eager to continue working on similar projects.
Overall, I genuinely enjoyed the process.
