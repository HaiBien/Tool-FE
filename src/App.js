import './App.css';
import React from "react";
import {FileProtectOutlined, PictureOutlined} from '@ant-design/icons';
import {Tabs, Card} from 'antd';
import TextConvert from './pages/text/index'
import ImageConvert from './pages/image/index'
import ImageUploader from './pages/image/ImageUploader'

function App() {

  const Items = [
    {
      key: '0',
      label: 'Chuyển đổi định dạng văn bản',
      children: <TextConvert/>,
      icon: <FileProtectOutlined/>,
    },
    {
      key: '1',
      label: 'Chuyển đổi định dạng ảnh',
      children: <ImageConvert/>,
      icon: <PictureOutlined/>,
    },
  ]

  return (
    <Card>
      <div className="App">
        <Tabs
          defaultActiveKey="0"
          items={Items}
        />
      </div>
    </Card>
  );
}

export default App;
