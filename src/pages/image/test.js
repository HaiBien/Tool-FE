import React, { useState } from 'react';

const ImageConverter = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [webPImage, setWebPImage] = useState(null);

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = async (e) => {
      const image = new Image();
      image.onload = async () => {
        const webP = await convertToWebP(image);
        setOriginalImage(e.target.result);
        setWebPImage(webP);
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(uploadedImage);
  };

  const convertToWebP = (image) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/webp');
    });
  };

  const downloadWebPImage = () => {
    if (webPImage) {
      const downloadLink = document.createElement('a');
      downloadLink.href = webPImage;
      downloadLink.download = 'converted_image.webp';
      downloadLink.click();
    }
  };

  return (
    <div>
      <input type="file" title="Tải ảnh lên" onChange={handleImageUpload} />
      {originalImage && <img src={originalImage} width={100} alt="Original Image" />}
      {webPImage && <img src={webPImage} width={100} alt="WebP Image" />}
      {webPImage && (
        <button onClick={downloadWebPImage}>Tải ảnh về</button>
      )}
    </div>
  );
};

export default ImageConverter;
