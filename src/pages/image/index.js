import React, {useState, useEffect} from 'react';
import {Button, Form, Input, Select, Upload, Row, Col, Space} from "antd";
import {Buffer} from 'buffer';

const {Option} = Select;

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [dataTbl, setDataTbl] = useState({})
  const [isResize, setIsResize] = useState(false)
  const [igForm] = Form.useForm()

  useEffect(() => {
    igForm.setFieldsValue({
      fit: undefined,
      format: 'jpg'
    })
  }, [])


  const onChange = ({fileList: newFileList}) => {
    setFileList([...fileList, ...newFileList]);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleSubmit = async (value) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('format', value.format);
    formData.append('height', value.height);
    formData.append('width', value.width);
    formData.append('fit', value.fit);

    try {
      const response = await fetch('http://localhost:3333', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        const jsonData = await response.json();
        setDataTbl(jsonData)
      }
    } catch (error) {

    }
  };

  const downloadFile = (data) => {
    const bufferData = data.value.data;
    const type = dataTbl.type
    const fileName = data.fileName

    // Tạo một Blob từ bufferData
    const blob = new Blob([new Uint8Array(bufferData)], {type: `image/${type}`});

    // Tạo URL cho Blob
    const url = URL.createObjectURL(blob);

    // Tạo một thẻ a để tải xuống
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${type}`; // Đặt tên file khi tải xuống
    document.body.appendChild(link);
    link.click();

    // Xóa link sau khi đã tải xuống
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const onValuesChange = (value) => {
    if (value) setIsResize(true);
    else setIsResize(false);
  };

  const reload = () => {
    setImages([])
    setFileList([])
    setDataTbl({})
    setIsResize(false)
    igForm.setFieldsValue({
      fit: undefined,
      format: 'jpg',
      width: '',
      height: ''
    })
  }

  return (
    <Row gutter={[16, 16]}>
      <Col md={24} lg={12}>
        <Upload
          listType="picture-card"
          accept="image/*"
          fileList={fileList}
          beforeUpload={(file, files) => {
            setImages(files)
            return false;
          }}
          onChange={onChange}
          onPreview={onPreview}
          multiple
        >
          + Chọn ảnh
        </Upload>
        <Form
          form={igForm}
          name="igForm"
          colon={false}
          layout="vertical"
          scrollToFirstError
          onFinish={handleSubmit}
        >
          <Form.Item
            name="format"
            label="Định dạng ảnh"
            rules={[{required: true, message: 'Chọn định dạng ảnh.'}]}
          >
            <Select placeholder="Chọn định dạng ảnh">
              <Option value="webp">WebP</Option>
              <Option value="jpg">JPG</Option>
              <Option value="png">PNG</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="fit"
            label="Loại resize"
          >
            <Select onChange={(e) => onValuesChange(e)} allowClear placeholder="Chọn định dạng ảnh">
              <Option value="cover">(cover) Cắt ảnh theo kích thước nhập, giữ nguyên tỉ lệ ảnh.</Option>
              <Option value="fill">(fill) Bỏ qua tỷ lệ khung hình của đầu vào và kéo dài đến cả hai kích thước được cung
                cấp</Option>
              <Option value="contain">(contain) Co ảnh 1 chiều vừa với kích thước ảnh đã nhập</Option>
            </Select>
          </Form.Item>
          {isResize && <>
            <Form.Item name="width" label="Chiều ngang" rules={[{required: true, message: 'Nhập chiều ngang.'}]}>
              <Input placeholder="Nhập chiều ngang VD: 300"/>
            </Form.Item>

            <Form.Item name="height" label="Chiều dọc" rules={[{required: true, message: 'Nhập chiều dọc.'}]}>
              <Input placeholder="Nhập chiều dọc VD: 300"/>
            </Form.Item>
          </>}

        </Form>
        <Space>
          <Button
            style={{margin: '10px 0px'}}
            danger
            onClick={() => reload()}
          >
            Làm mới
          </Button>
          <Button
            style={{margin: '10px 0px'}}
            type="primary"
            form="igForm"
            htmlType="submit"
          >
            Chuyển đổi
          </Button>
        </Space>
      </Col>
      <Col md={24} lg={12}>
        {dataTbl?.images && dataTbl.images.map((e, i) => {
          const src = new Buffer.from(e.value.data).toString("base64")
          return (<div key={i}>
            <img src={`data:image/png;base64,${src}`} width={100} height={100}/>
            <Button type="link" onClick={() => downloadFile(e)}> Tải về </Button>
          </div>)
        })}
      </Col>
    </Row>
  )
};

export default ImageUploader;
