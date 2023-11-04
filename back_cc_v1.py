# Set-Up
"""

!pip install llama_index
!pip install pypdf
!pip install langchain
!pip install openai
!pip install pdfx
!pip install PyPDF2
!pip install fpdf2
!pip install google-serp-api
!pip install serpapi
!pip install IPython


"""# **Import Dependencies**"""

import os
import shutil
import json
import datetime
from dotenv import load_dotenv
from fpdf import FPDF
# from google.colab import files
import json
import openai
import logging
import sys
import nest_asyncio
from IPython.display import Markdown, display
# from llama_index import SimpleDirectoryReader, LLMPredictor, PromptHelper
# from llama_index import set_global_service_context
# from llama_index import VectorStoreIndex
# from llama_index.llms import AzureOpenAI
# from llama_index.embeddings import OpenAIEmbedding
# from llama_index import VectorStoreIndex, SimpleDirectoryReader, ServiceContext
# from llama_index.data_structs import Node
# from llama_index.query_engine import ToolRetrieverRouterQueryEngine
# from llama_index.objects import ObjectIndex, SimpleToolNodeMapping
from llama_index.tools.tool_spec.base import BaseToolSpec
# from llama_index.tools.query_engine import QueryEngineTool
from langchain.llms import OpenAI
from langchain.chains import LLMMathChain
from langchain.tools import YouTubeSearchTool
from langchain.chat_models import AzureChatOpenAI
import requests
from typing import Optional, List
import pdfx
import pandas as pd
import re
from PyPDF2 import PdfMerger, PdfReader
import xml.etree.ElementTree as ET

nest_asyncio.apply()

from langchain.schema import (
    SystemMessage,
    HumanMessage,
    AIMessage
)


"""## Define all of our possible keys and URLs, then choose the one we want to use for this execution"""

load_dotenv()
# Microsoft Azure API Keys to choose from
azureAPIKey_35 = os.getenv("AZURE_API_KEY_35")
azureAPIKey_4 = os.getenv("AZURE_API_KEY_4")
azureAPIKey_ADA = os.getenv("AZURE_API_KEY_ADA")

# Microsoft API Details
apiType = 'azure'
apiVersion = '2023-07-01-preview'


# Microsoft Azure API URLs to choose from
baseURL_35 = 'https://brainbridge1.openai.azure.com/'
baseURL_4 = 'https://brainbridge-2.openai.azure.com/'
baseURL_ADA = 'https://brainbridge1.openai.azure.com/'

# Configuration for this execution only.  Just change which configuration variable it points to.
os.environ['OPENAI_API_BASE'] = baseURL_4
os.environ['OPENAI_API_BASE_ADA'] = baseURL_ADA
os.environ['OPENAI_API_KEY_ADA'] = azureAPIKey_ADA
os.environ['OPENAI_API_KEY'] = azureAPIKey_4
os.environ['OPENAI_API_TYPE'] = apiType
os.environ['OPENAI_API_VERSION'] = apiVersion
os.environ['OPENAI_MODEL'] = "gpt-4"  # The LLM model we want to use.  Can be gpt-35-turbo or gpt-4
os.environ['OPENAI_MODEL_EMBED'] = "text-embedding-ada-002"


# OpenAI Setup
openai.api_version = os.environ["OPENAI_API_VERSION"]
openai.api_base = os.environ["OPENAI_API_BASE"]
openai.api_type = 'azure'
openai.api_key = os.environ["OPENAI_API_KEY"]

#LangChain Setup
llm = AzureChatOpenAI(
    deployment_name=os.environ['OPENAI_MODEL'],
    model_kwargs={
        "api_key": os.environ['OPENAI_API_KEY'],
        "api_base": os.environ['OPENAI_API_BASE'],
        "api_type": os.environ['OPENAI_API_TYPE'],
        "api_version": os.environ['OPENAI_API_VERSION'],
    },
    temperature = 0.1,
    max_tokens = 4000,
)
llm_math = LLMMathChain.from_llm(llm=llm) #this is used for computing Overall Score(2nd Columns in file)

SerpAPI_Key  = os.getenv("SERP_API_KEY")


### Job Descriptions: Upload ###
### Returns a single file name path --- this is incorrect, should reuturn an array ###
### Currently not working ###
def job_descriptions_upload(dest_folder_name, job_description_files):
    # TODO: Update this to copy files like we do for resumes.  No longer using uploads.
    log(logging.INFO, "Importing Job Descriptions")

    # Create the folder if it doesn't exist
    os.makedirs(folder_name, exist_ok=True)

    # Upload multiple files
    #uploaded = files.upload()

    latest_file_name = None  # Initialize the variable to store the latest file name
    latest_file_timestamp = 0  # Initialize the variable to store the latest file's modification timestamp

    # Move each uploaded file to the folder and track the latest file
    for file_name, file_data in uploaded.items():
        file_path = os.path.join(folder_name, file_name)
        with open(file_path, 'wb') as f:
            f.write(file_data)

        log(logging.INFO,f"File '{file_name}' has been uploaded and saved to '{folder_name}' folder.")

        # Check if the current file has a newer modification timestamp
        file_timestamp = os.path.getmtime(file_path)
        if file_timestamp > latest_file_timestamp:
            latest_file_timestamp = file_timestamp
            latest_file_name_job = file_name
    
    log(logging.DEBUG, latest_file_name_job)

    return latest_file_name_job
    
### Upload multiple files and merge into a single resume file in output folder ###
### Returns Resume File Name ###
def resume_upload_multi(dest_folder_name, resume_files):
    log(logging.DEBUG, "Importing multiple resume files")

    # Create the folder if it doesn't exist
    os.makedirs(dest_folder_name, exist_ok=True)

    # Upload multiple files
    # uploaded = files.upload()

    # Copy each uploaded file to the folder
    for source_file in resume_files:
    #for file_name, file_data in uploaded.items():
        source_file_path = os.path.join(source_file['path'], source_file['name'])
        dest_file_path = os.path.join(dest_folder_name, source_file['name'])

        with open(source_file_path, 'rb') as sf:
            source_data = sf.read()

        with open(dest_file_path, 'wb') as tf:
            tf.write(source_data)

        log(logging.INFO,f"File '{source_file_path}' has been copied to '{dest_folder_name}' folder.")

    # List all PDF files in the folder
    pdf_files = [os.path.join(dest_folder_name, a) for a in os.listdir(dest_folder_name) if a.endswith(".pdf")]

    # Sort the PDF files alphabetically (you can modify the sorting as needed)
    pdf_files.sort()

    # Initialize the PDF merge
    merger = PdfMerger()

    # Iterate through the PDF files
    for idx, pdf_path in enumerate(pdf_files, start=1):
        # Add a page with the job description number
        logging.debug(f"PDF Path {pdf_path}")

        #single_pdf_path =os.path.basename("./" + pdf_path)
        single_pdf_path = os.path.join("./", pdf_path)
        logging.debug(f"Fill PDF Path {single_pdf_path}")
        merger.append(single_pdf_path)

    # Save the merged PDF to a file
    merged_pdf_path = os.path.join(dest_folder_name, "result.pdf")

    logging.debug(f"Merged PDF Path: {merged_pdf_path}")
    merger.write(merged_pdf_path)

    log(logging.INFO,f"Merged PDF saved to '{merged_pdf_path}'.")

    return merged_pdf_path

### Copies a resume PDF into target folder for processing ###
### Returns Resume File name ###
def resume_upload_single(dest_folder_name, resume_file):
    log(logging.INFO,f"Importing single resume file {dest_folder_name} {resume_file}")

    # Create the folder if it doesn't exist
    os.makedirs(dest_folder_name, exist_ok=True)

    source_file_path = os.path.join(resume_file[0]['path'], resume_file[0]['name'])
    dest_file_path = os.path.join(resume_file[0]['path'], resume_file[0]['name'])

    with open(source_file_path, "rb") as sf:
        source_data = sf.read()

    with open(dest_file_path, 'wb') as f:
        f.write(source_data)

    log(logging.INFO,f"File '{resume_file[0]['name']}' has been saved to '{dest_folder_name}' folder.")

    return dest_file_path

## Convert PDF to Text ###################
## Returns PDF file content #######
def convert_pdf_to_text(input_pdf):
    # Specify the path to the PDF file you want to convert
    # TODO: Ensure that output text file is created fresh each time, not appended
    
    pdf_file_path = input_pdf

    # Check if the PDF file exists
    if os.path.exists(pdf_file_path) and pdf_file_path.endswith(".pdf"):
        pdf1 = pdfx.PDFx(pdf_file_path)
        text2 = pdf1.get_text()

        # Modify the text as needed
        text2 = text2.replace('\n\n', ',').strip()  # Remove newlines and strip spaces
        text2 = text2.replace('\n\n\n', '').strip()
        text2 = text2.replace('\n\n\n\n ', '').strip()

        # Save the modified text to a text file
        output_filename = f"{input_pdf}.txt"
        with open(output_filename, "w", encoding="utf-8") as file:
            file.write(text2)

        log(logging.INFO,f"Converted the PDF to '{output_filename}'.")
    else:
        log(logging.CRITICAL,f"The specified PDF file '{pdf_file_path}' does not exist or is not a PDF.")

    return text2

def suggested_career_paths(resume):
    career_paths_prompt =  f"""You are a top-tier student career counselor at a prestegious university. 
    You are Extremely skilled at helping early career employees and recent graduates to find their first career job. 
    
    Based only on the provided resume:
        1. List the top 3 most likely career paths
        2. Provide a brief description of why you have recommended each likely career path

        # ** Candidate Resume **
        {resume}
    """

    career_paths = execute_single_prompt(career_paths_prompt)
    return career_paths

### Execute the LLM calls for this resume text and job description text.
### Reuturns a Pandas DataFrame of the LLM results
def process_resume_against_job_description(resume, job_description, candidate_name, job_title, career_paths, output_csv):
    # TODO: Investigate processing each asynchronously.
    # TODO: Positive and negative scores are still acting very weird.   New approach?
    # TODO: Add a quality check after the first requirements scoring (move total score here)
    # TODO: Add a quality check after the final top 5 reasons list (move total score here)
    # TODO: Add final score prompt

    log(logging.INFO,f"Processing {candidate_name}'s resume against {job_title}..")

    #Tasks that will evaluate the candidate vs the Job description
    ideal_candidate_prompt = f"""
        As a highly experienced HR Recruiter specializing in students and early career candidates, please provide the ideal candidate profile for the given job description.  
        Please do this briefly and concisely.
        For every job requirement, note whether the requirement is a nice-to-have or must-have requirement. 
        
        Take a deep breath and think about this step by step.
        
        # ** Job Description **
        {job_description}"""
    
    ideal_candidate = execute_single_prompt(ideal_candidate_prompt)
    
    resume_requirements_prompt = [f"""
        You are a detail-oriented analyst with many years of experience. Responsible for comparing candidate resumes to ideal candidate profiles.
        For every job requirement:
          1. Give a Yes/No for each job requirement.  Yes if the candidate fully meets the requirement or No if they do not fully meet the job requirement.  
          2. Provide a score between 1 and 100 based on how strongly the candidate meeets the requirement.  If the requirement cannot be verified the score should be 0.  If the requirement is fully verified they should receive 100.
        
        Here is an example of what the output might look like:
          1. Full-Stack Web Developer" - Meets Requirement: Yes - Score: 100 of 100
          2. Knowledge of agricultural or turf equipment and farming or operational practices - Meets Requirement: No - Score: 0 of 100
                                  
        Take a deep breath and think about this step by step.

        # ***** Candidate Resume *****
          {resume}

        # ****** Ideal Candidate Profile ******
          {ideal_candidate}
        """,
        """
            Provide a Task 1 score totaling all of the requirements.  
            If a requirement was unmet or N/A it should be calculated as 0 of 100.
            Use this format for your response without additional explanation:  "Task 1 Score: X of Y"
        """]
    resume_requirements_score = execute_multi_prompt(resume_requirements_prompt)

    reasons_scoring_prompt=[f"""You are a highly experienced HR recruiter searching for the perfect candidate for the job description provided.
        Assume this is a post-graduation job if the student is graduating soon. 
        Consider top potential career paths and how this job aligns with each. 
        
        Then, proceed to Describe top 5 reasons the candidate will succeed, focusing solely on resume details and alignment with the ideal candidate profile.  
        Assign a corresponding positive score between 1 and 100 to each of these reasons based on how well the candidate fulfills them based on their resume. 
        The score should be formatted as "X of 100"

        Take a deep breath and think about this step by step.

        # ** Candidate Resume **
        {resume}
         
        # ** Ideal Candidate Profile Scoring **
        {resume_requirements_score}
         
        # ** Career Paths **
        {career_paths}
        """,
        """
            Describe the top 5 reasons the candidate may face challenges, considering only resume details and alignment with the ideal candidate profile.  
            Assign a corresponding score between 0 and 100 to each of these reasons based on how well the candidate fulfills them based on their resume. 
            If the candidate is extremely unlikely to be able to overcome the challenge, give a score of "0 of 100".  
            Use the format "x of 100" for your scores.
        """,
        """
         Provide a Task 2 score which subtracts the negative scores from the positive scores.
         Use this format for your response without additional explanation:  "Task 2 Score: X of Y"    
        """]
    reasons_scoring = execute_multi_prompt(reasons_scoring_prompt)

    resume_recommendations_prompt=f"""
        Assuming the role of an extremely knowledgeable career counselor at a university's career services center, please provide 10 prioritized recommendations for adjustments, 
        experiences, and learning activities based on the job requirements and the candidate's resume. 
        These recommendations should help the candidate progress toward the three career paths provided.
        Please list them as a single, ungrouped list.
        Take a deep breath and think about this step by step.

        # ** Candidate Resume **
        {resume}
         
        # ** Ideal Candidate Profile Scoring **
        {resume_requirements_score}
         
        # ** Career Paths **
        {career_paths}
    """
    resume_recommendations = execute_single_prompt(resume_recommendations_prompt)

    # Extract the scoring portions of the AI's output
    AI_output = "\n-------- Job Requirements Scoring ------------ \n\n" + resume_requirements_score + "\n\n-------- Success and Challenge Reasons Score ------------ \n" + reasons_scoring 
    AI_output_full = "\n\n ----- Ideal Candidate-------------- \n" + ideal_candidate + "\n\n ------------------- \n" + AI_output + "\n\n----------- Recommended Career Paths -------------------------\n" + career_paths

    #listing all of the scores in AI's output and to get overall score out of them
    score_list_prompt = f"""
        1. Find and concisely list all of Task scores from the [final output] below.
        2. Create a "Final Score" which is the sum of all of the Task scores.  It should be in the format "Total Score: x of y."

        --- [final output] ---
        {AI_output}
    """
    log(logging.DEBUG,f"Score List Prompt:{score_list_prompt}")

    score_list = execute_single_prompt(score_list_prompt)
    log(logging.DEBUG,f"Score List:{score_list}")

    Overall_score = llm_math.run(f'Find the final Overall Score and show it as a percentage:{score_list}')

    #extracting number from string for overall score
    match = re.search(r'\d+\.\d+', Overall_score)

    if match:
        # Create a score rounded to 2 decimal points
        numeric_value = float(match.group())
        rounded_score = round(numeric_value, 2)
        log(logging.DEBUG,rounded_score)  # Output: 66.43
    else:
        log(logging.CRITICAL,"No numeric value found in the Overall Score.")

    # Create initial DataFrame
    df = pd.DataFrame({'Name': candidate_name, 
                       'Job Title': job_title, 
                       'Job Description': job_description, 
                       'Score': rounded_score, 
                       'Response': AI_output_full, 
                       'Recommendations': resume_recommendations}, index=[0])

    #These last lines are for not having column names replicated again and again!
    file_exists = os.path.isfile(output_csv) #checks if the csv file is already there then it will recreate again

    # If the file exists, load its contents into a DataFrame
    if file_exists:
        existing_df = pd.read_csv(output_csv)
    else:
        existing_df = pd.DataFrame()  # Create an empty DataFrame if the file doesn't exist

    # Concatenate the existing DataFrame with the new data
    merged_df = pd.concat([existing_df, df], ignore_index=True)
    
    log(logging.INFO,f"Data Frame: {merged_df}")

    if len(output_csv)>0:
        # Save the merged DataFrame back to the CSV file
        merged_df.to_csv(output_csv, index=False)
    
    return merged_df

def log(log_level, message):
    # Generate timestamp 
    now = datetime.datetime.now()
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S")

    if log_level==logging.DEBUG:
        logging.debug(f"{timestamp} - {message}")
    elif log_level==logging.INFO:
        logging.info(f"{timestamp} - {message}")
    elif log_level==logging.WARNING:
        logging.warning(f"{timestamp} - {message}")
    elif log_level==logging.ERROR:
        logging.error(f"{timestamp} - {message}")
    elif log_level==logging.CRITICAL:
        logging.critical(f"{timestamp} - {message}")
    elif log_level==logging.NOTSET:
        logging.debug(f"{timestamp} - {message}")
    else:
        logging.debug(f"{timestamp} - {message}")

# Executes a single prompt against the chosen LLM Model
def execute_single_prompt(prompt, role="system", content_only=True):
    
    log(logging.DEBUG, f"execute_single_prompt - {prompt}")
    
    completion = openai.ChatCompletion.create(
        engine = os.environ['OPENAI_MODEL'],
        deployment_id = os.environ['OPENAI_MODEL'],
        messages = [
            {'role': role, 
             'content': prompt}
        ],
    )

    log(logging.DEBUG, f"execute_single_prompt result - {completion.choices[0].message['content']}")

    if content_only:
        return completion.choices[0].message['content']
    else:
        return completion

# Executes a single prompt against the chosen LLM Model
def execute_multi_prompt(prompt_list, role="system", content_only=True):
    log(logging.DEBUG, f"execute_multi_prompt")

    if type(prompt_list) is list:
        # Empty the list of messages
        messages = []
        AI_messages = []

        for prompt in prompt_list:
            # Add our prompt to messages
            messages.append({'role':role, 'content': prompt})

            # execute the prompt
            completion = openai.ChatCompletion.create(
                engine = os.environ['OPENAI_MODEL'],
                deployment_id = os.environ['OPENAI_MODEL'],
                messages = messages,
            )
            # append the AI response to our list of messages
            messages.append(completion.choices[0].message)
            AI_messages.append(completion.choices[0].message)
    else:
        log(logging.ERROR, "execute_multi_prompt expects to receive a list.  Executing single prompt.")
        return execute_single_prompt(prompt_list)
    
    if content_only:
        return_text = ""
        for message in AI_messages:
            return_text = return_text + "\n\n" + message['content']

        log(logging.DEBUG, "*execute_multi_prompt:return_text:" + return_text)
        return return_text
    else:
        return completion
    
### Asks the LLM to recommend a job title to search for based on the resume ###
### Returns a job title to search for ###
def get_job_title(resume_text):
    # TODO: Ask the user which job title(s) they would like to use for this search.

    category_prompt = f"""You are the worlds best college career counselor.  
        Suggest one job title that would be a great next step for the candidate below.  
        Be sure to consider their wishes and desires if noted.
        Suggest only one job title and format the output as an html querystring variable "+" like this "word1+word2"

    # *** Resume *** #
    {resume_text}"""

    category_ = execute_single_prompt(category_prompt)

    return category_
    

class PubMedToolSpec(BaseToolSpec):
    spec_functions = ["search"]

    def __init__(self, search_template):
        self.search_template = search_template

    def search(self, term: str, max_results: Optional[int] = 3):
        """Search SERP API for Google Jobs and retrieve job listings.
             args:
             term (str): The job search term
             max_results Optional (int): The number of job listings to return
        """
        # Construct the search URL and retrieve results as JSON
        response = requests.get(
            self.search_template.format(term=term)
        ).json()

        # Extract and return the list of job listings if available
        if 'jobs' in response:
            listings = response['jobs'][:max_results]
            return listings
        else:
            return []

def get_google_job_descriptions(job_category, max_jobs=10):
    log(logging.INFO,f"Getting {max_jobs} google job descriptions for {job_category}")

    # Update the URL to the SERP API for Google Jobs
    SEARCH_URL_TMPL = f"https://serpapi.com/search.json?engine=google_jobs&q={job_category}&location=United+States&google_domain=google.com&gl=us&hl=en&api_key={SerpAPI_Key}"

    # Create an instance of PubMedToolSpec
    tool = PubMedToolSpec(search_template=SEARCH_URL_TMPL)

    # Perform a search for 'Java Developer'
    result = tool.search(job_category, max_results=5)  # You can adjust max_results as needed

    response = requests.get(SEARCH_URL_TMPL.format(term=job_category)).json()
    log(logging.DEBUG,f"Response: {response}")
    return_list = list()

    # Assuming your data is stored in a variable called 'data'
    data = response

    # Iterate through job listings and access the desired information
    for index, job in enumerate(data['jobs_results']):
        if index >= max_jobs:
            break

        job_values = {
            'company': job['company_name'],
            'source': 'Google',
            'title': job['title'],
            'location': job['location'],
            'description': job['description'],
            'url': data['search_metadata']['google_jobs_url']
        }
        log(logging.DEBUG,f"Job: {job_values}")

        return_list.append(job_values)
    
    return return_list

def add_resume_file_to_process(resume_list, name, path):
    resume_file = {
            'name': name,
            'path': path}
    resume_list.append(resume_file)
    return resume_list



if __name__ == "__main__":
    ####################################################
    #####  --------------------------  ---  CONFIGURATION FOR THIS RUN ----------------------------------------------------  #######
    ####################################################################
    multi_file_resume = True                            # Does the resume contain multiple files to merge?
    get_google_jobs = True                              # Do we want to get job descriptions from Google?  We'll use local files otherwise
    num_google_jobs = 10                                # Number of jobs to get from Google        
    candidate_name="03-Sales"
    resume_output_file_name = "AI_assessment_03.csv"       # Setup variable for final assessment
    resume_input_path = "/Volumes/Trebleet/Downloads/"    
    job_description_input_path = ""
    logging_level 