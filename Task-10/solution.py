import cv2
import os
from PIL import Image, ImageDraw

def find_dot_center(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        return None, None

    largest_contour = max(contours, key=cv2.contourArea)
    moments = cv2.moments(largest_contour)
    
    if moments["m00"] == 0:
        return None, None
    
    x = int(moments["m10"] / moments["m00"])
    y = int(moments["m01"] / moments["m00"])
    color = image[y, x]
    
    return (x, y), color

def sort_images(image_files):
    import re

    def extract_number(filename):
        match = re.search(r'(\d+)', filename)
        return int(match.group(0)) if match else float('inf')

    return sorted(image_files, key=extract_number)

def stitch_images(folder_path):
    image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
    sorted_files = sort_images(image_files)

    result_image = Image.new('RGB', (512, 512), (255, 255, 255))
    draw = ImageDraw.Draw(result_image)
    
    last_position = None
    last_color = None
    
    for image_name in sorted_files:
        image_path = os.path.join(folder_path, image_name)
        position, color = find_dot_center(image_path)
        if position is None:
            last_position = None
            last_color = None
            continue
        
        if last_position is not None:
            draw.line([last_position, position], fill=tuple(color), width=5)
        
        last_position = position
        last_color = color
    
    result_image.save('stitched_image.png')
    print("Stitched image saved as stitched_image.png")

folder_path = './assets'
stitch_images(folder_path)

