from io import BytesIO
from fastapi import FastAPI, UploadFile
from joblib import load
import numpy as np
from PIL import Image, ImageOps


app = FastAPI()
model = load("random_forest_model.pkl")

@app.post("/predict")
async def predict(file: UploadFile):
    if (file.filename.endswith(".jpg") or file.filename.endswith(".png")):    
        content = BytesIO(file.file.read())
        array = np.array(ImageOps.grayscale(Image.open(content)))
        print(array)
        return {"message": "image"}
    return {"message": "not image"}
    