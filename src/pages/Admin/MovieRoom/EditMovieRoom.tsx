import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";

import { useUpdateMovieRoomMutation } from "../../../service/movieroom.service";
import { useFetchCinemaQuery } from "../../../service/brand.service";
import { ICinemas } from "../../../interface/model";

interface DataType {
  id: string;
  name: string;
  id_cinema: string;
}
interface EditMovieRoomProps {
  dataMovieRoom: DataType;
}

const UpdateMovieRoom: React.FC<EditMovieRoomProps> = ({ dataMovieRoom }) => {
  const [updateMovieRoom] = useUpdateMovieRoomMutation();
  const { data: cinemas } = useFetchCinemaQuery();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;

  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user.role;
  const id_cinema = user.id_cinema;

  const optionRole3 = (cinemas as any)?.data?.filter(
    (item: any) => item.id === id_cinema
  );
  const optionRole1 = (cinemas as any)?.data?.map((item: any) => item);

  useEffect(() => {
    if (dataMovieRoom) {
      form.setFieldsValue({
        name: dataMovieRoom.name,
        id_cinema: dataMovieRoom.id_cinema,
      });
    }
  }, [dataMovieRoom]);
  const onFinish = async (values: any) => {
    console.log("🚀 ~ file: EditMovieRoom.tsx:57 ~ onFinish ~ values:", values)
    try {
      await updateMovieRoom({ ...values, id: dataMovieRoom.id });

      message.success("Cập nhật sản phẩm thành công");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      navigate("/admin/movieroom");
    } catch (error) {
      message.error("Cập nhật sản phẩm thất bại");
    }
  };
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showDrawer}>
        <div className="flex ">
          <EditOutlined />
        </div>
      </Button>

      <Drawer
        title="Update MovieRoom"
        width={720}
        onClose={() => {
          onClose();
          form.resetFields(); // Reset trường dữ liệu khi đóng Drawer
        }}
        open={open}
        style={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>

            <Button
              danger
              type="primary"
              htmlType="submit"
              onClick={() => {
                form.validateFields().then((values) => {
                  onFinish(values);
                });
              }}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="id_cinema"
                label="id_cinema"
                rules={[{ required: true, message: "Please enter id_cinema" }]}
              >
                <Select placeholder="Please select a film_id">
                  {(cinemas as any)?.data?.map(
                    (cinema: ICinemas, index: number) => {
                      return (
                        <Option key={index} value={cinema.id}>
                          {cinema.name}
                        </Option>
                      );
                    }
                  )} 
                  {role === 3 &&
                    optionRole3?.map((cinema: ICinemas, index: number) => {
                      return (
                        <Option key={index} value={cinema.id}>
                          {cinema.name}
                        </Option>
                      );
                    })}
                  {role === 1 &&
                    optionRole1?.map((cinema: ICinemas, index: number) => {
                      return (
                        <Option key={index} value={cinema.id}>
                          {cinema.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default UpdateMovieRoom;
