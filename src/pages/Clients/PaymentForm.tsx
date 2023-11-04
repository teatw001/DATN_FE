import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
const PaymentForm = () => {
  const onFinish = (values: any) => {
    // Xử lý dữ liệu khi biểu mẫu được gửi đi
    console.log('Received values:', values);
  };
  return (
    <>
      <div className='w-[950px] mx-auto text-white '>
        <h1>Thông Tin Thanh Toán</h1>
        <Form
          name="paymentForm"
          onFinish={onFinish}
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số thẻ tín dụng"
            name="creditCard"
            rules={[{ required: true, message: 'Vui lòng nhập số thẻ tín dụng!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày hết hạn"
            name="expiryDate"
            rules={[{ required: true, message: 'Vui lòng nhập ngày hết hạn!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mã bảo mật"
            name="securityCode"
            rules={[{ required: true, message: 'Vui lòng nhập mã bảo mật!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thanh toán
            </Button>
          </Form.Item>
        </Form>
      </div>

    </>
  )
}

export default PaymentForm