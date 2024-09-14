import os
import cv2
import numpy as np

assets_folder = './assets/'

def overlay_non_white_pixels(base_img, overlay_img):
    non_white_mask = np.any(overlay_img[:, :, :3] != [255, 255, 255], axis=-1)
    for c in range(3):
        base_img[non_white_mask, c] = overlay_img[non_white_mask, c]
    return base_img

def overlay_images(assets_folder):
    images = []
    image_files = sorted([f for f in os.listdir(assets_folder) if f.endswith('.png')])
    
    if not image_files:
        print("No PNG images found in the assets folder.")
        return

    for image_file in image_files:
        img_path = os.path.join(assets_folder, image_file)
        img = cv2.imread(img_path)
        if img is not None:
            images.append(img)
    
    if not images:
        print("No images were processed.")
        return

    base_img = np.ones_like(images[0], dtype=np.uint8) * 255

    for img in images:
        base_img = overlay_non_white_pixels(base_img, img)

    output_image = 'overlay_image.png'
    cv2.imwrite(output_image, base_img)
    print(f"Overlay image saved as {output_image}")
    return base_img

result = overlay_images(assets_folder)
