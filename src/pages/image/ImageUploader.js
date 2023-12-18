import React, { useState } from 'react';
import { Upload, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ImageUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [imageFormat, setImageFormat] = useState('webp');

  const handleFormatChange = (value) => {
    setImageFormat(value);
  };

  const handleUpload = () => {
    // Xử lý việc gửi dữ liệu lên server
    // Lưu ý: fileList chứa các đối tượng file, bạn cần xử lý chúng ở đây
    console.log('File list:', fileList);
    console.log('Image format:', imageFormat);
    // Gọi API hoặc xử lý dữ liệu ở đây
  };

  return (
    <div>
      <Upload
        multiple
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
      >
        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
      </Upload>
      <Select defaultValue="webp" style={{ width: 120 }} onChange={handleFormatChange}>
        <Option value="webp">WebP</Option>
        <Option value="jpg">JPG</Option>
        <Option value="png">PNG</Option>
      </Select>
      <Button onClick={handleUpload}>Tải lên và chuyển đổi</Button>
    </div>
  );
};

export default ImageUploader;
