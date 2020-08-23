import { Button, Form } from 'antd';
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './style.scss';

const AddCard = ({ handleCancelClick, id, addCardToList }) => {
  const [form] = Form.useForm();


  const validateMessages = {
    required: '${name} is required!',
  };
  const onFinish = values => {
    console.log({ values });
    addCardToList(id, values);
    onReset();


  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}
          size={'small'}>
      <Form.Item
        name={['content']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <textarea className='list-card-text-area' placeholder='Add content for this card ...'/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add card
        </Button>
        <span className='cancel-add-card' onClick={(e) => handleCancelClick(e)}>
          <CloseOutlined style={{ marginLeft: '5px', color: '#636e72' }}/>
        </span>
      </Form.Item>
    </Form>
  );
};

export default AddCard;