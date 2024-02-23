from io import BytesIO
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from joblib import load
from PIL import Image
import numpy as np
from pydantic import BaseModel
import pandas as pd
import cv2


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

model = load("models/random_forest_model.pkl")
csv_classifier = load("models/csv_classifier.pkl")
essential_parameters = load('models/essential_parameters.pkl')

class CSVData(BaseModel):
    data: list[int]

class Essential(BaseModel):
    data: list[float]

@app.post("/predict")
async def predict(file: UploadFile):
    if (file.filename.endswith(".jpg") or file.filename.endswith(".png")):    
        content = BytesIO(file.file.read())
        array = np.asarray(bytearray(content.read()), dtype=np.uint8)
        image = cv2.imdecode(array, 0)
        image = image[250:image.shape[1], 50:image.shape[0]]
        pil_image = Image.fromarray(image)
        pil_image = pil_image.resize((330, 380))
        image = np.array(pil_image).flatten()
        prediction = model.predict([image])
        return {"message": "image", "prediction": prediction[0]}
    return {"message": "invalid file type"}

@app.post("/csv_predict")
async def csv_predict(data: CSVData):
    data = np.array(data.data[0:140], dtype=np.float64)
    prediction = csv_classifier.predict([data])
    return {"message": "csv", "prediction": bool(prediction[0])}

@app.post("/essential_parameters")
async def essential_parameters_predict(data: Essential):
    np_data = np.array(data.data, dtype=np.float64)
    np_data = 1 / (1 + np.exp(-np_data))
    np_data = np_data.reshape(1, -1)
    prediction = essential_parameters.predict(np_data)
    return {"prediction": bool(prediction[0])}

    