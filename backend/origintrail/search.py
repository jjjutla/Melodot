import os
import json
from dotenv import load_dotenv

import openai
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Milvus

load_dotenv()

vector_db = Milvus(
    collection_name="OfficeHoursDemoCollection",
    embedding_function=HuggingFaceEmbeddings(model_name="multi-qa-MiniLM-L6-cos-v1"),
    connection_args={
            "uri": os.getenv("MILVUS_URI"),
            "user": os.getenv("MILVUS_USER"),
            "password": os.getenv("MILVUS_PASSWORD"),
            "secure": True,
        },
)
docs = vector_db.similarity_search(node, iterator)

all_documents = []

for doc in docs:
    document_dict = {
        'page_content': doc.page_content,
        'metadata:': {
            **doc.metadata
        }
    }
    all_documents.append(document_dict)

print("EXTRACTED RESPONSES: \n")
print(json.dumps(all_documents, indent=4))


openai.api_key = os.getenv("OPENAI_API_KEY")


print("\n\nEXTRACTED & SUMMARIZED RESPONSES: \n")
print(response['choices'][0]['message']['content'])