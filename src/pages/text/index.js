import React, {useState} from "react";
import {Button, Input, Typography, Row, Col, Space} from 'antd';
import {CopyOutlined, CheckOutlined} from '@ant-design/icons'

const {Paragraph} = Typography;
const {TextArea} = Input;

function TextConvert() {
  const [valueA, setValueA] = useState("")
  const [dataTbs, setDataTbs] = useState([])

  function removeAccents(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'a')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'i')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'o')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y')
    str = str.replace(/Đ/g, 'd')
    str = str.replace(/\s+/g, ' ')
    str = str.replace(/[^0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]/gi, '')
    str = str.trim()
    str = str.toLowerCase()
    return str.replace(/ /g, "-");
  }

  const changeText = (e) => {
    setValueA(e.target.value)
  }

  const renameArray = () => {
    const array = valueA.split('\n')
    const newArray = array.map(e => {
      return removeAccents(e)
    })
    setDataTbs(newArray)
  }

  const reload = () => {
    setValueA("")
    setDataTbs([])
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col md={24} lg={12}>
          <TextArea
            value={valueA}
            onChange={(e) => changeText(e)}
            rows="10"
          />
          <Space>
            <Button
              style={{margin: '10px 0px'}}
              danger
              onClick={() => reload()}
            >
              Làm mới
            </Button>
            <Button
              style={{margin: '10px 0px', float: 'left'}}
              type="primary"
              onClick={() => renameArray()}
            >
              Chuyển đổi
            </Button>
          </Space>

        </Col>
        <Col sm={24} md={12}>
          {dataTbs.length > 0 && dataTbs.map((e, i) => {
            return <div key={i}><span style={{float: "left", margin: '0px 10px', fontWeight: 500}}>[{i + 1}] </span>
              <Paragraph
                copyable={{
                  icon: [<CopyOutlined key="copy-icon"/>, <CheckOutlined key="copied-icon"/>],
                  tooltips: ['Sao chép', 'Đã sao chép'],
                }}
              >
                {e}
              </Paragraph>
            </div>

          })}
        </Col>
      </Row>
    </div>
  );
}

export default TextConvert;