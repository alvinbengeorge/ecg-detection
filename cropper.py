import os 
import cv2

for i in os.listdir("./dataset"):
  if not os.path.exists(f"./dataset1/{i}"): os.mkdir(f"./dataset1/{i}")
  for _, j in enumerate(os.listdir(f"./dataset/{i}/")):
    file = f"./dataset/{i}/{j}"
    print(file)
    image = cv2.imread(file)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray_image = gray_image[250:image.shape[1], 50:image.shape[0]]
    cv2.imwrite(f"./dataset1/{i}/{j}", gray_image)
