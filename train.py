
from PIL import Image, ImageOps
import numpy as np
import os

def load_images_from_folder(folder_path, target_size=(224, 224)):
    images = []
    for filename in os.listdir(folder_path):
        img_path = os.path.join(folder_path, filename)
        print(img_path)
        try:
            img = Image.open(img_path)
            img = img.resize(target_size)
            img = np.array(ImageOps.grayscale(img)).flatten()
            print(img.shape)
            images.append(img)
        except Exception as e:
            print(f"Error loading image {img_path}: {e}")
    return np.array(images)

# Example usage:
import os
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

def load_data_from_directory(root_dir, target_size=(330, 380)):
    images = []
    labels = []
    class_names = os.listdir(root_dir)
    for class_name in class_names:
        class_dir = os.path.join(root_dir, class_name)
        class_images = load_images_from_folder(class_dir, target_size)
        images.extend(class_images)
        labels.extend([class_name] * len(class_images))
    print(np.array(images).shape, np.array(labels).shape)
    return np.array(images), np.array(labels)


root_dir = './dataset1'
X, y = load_data_from_directory(root_dir)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


clf = RandomForestClassifier(n_estimators=1000, random_state=200)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# Save the model if desired
import joblib
joblib.dump(clf, 'random_forest_model.pkl')
