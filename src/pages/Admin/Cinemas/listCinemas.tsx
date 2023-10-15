import React from "react";
import {
  Space,
  Table,
  Tag,
  Input,
  DatePicker,
  Button,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import AddFilm from "../Films/AddFilm";

import EditFilm from "../Films/EditFilm";

import { ICinemas } from "../../../interface/model";
import { useGetCinemasQuery, useRemoveCinemasMutation } from "../../../service/cinemas.service";
import AddCinemas from "./addCinemas";
interface DataType {
  key: string;
  _id: string;
  name: string;
  address: string;
  status: number;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã rạp",
    dataIndex: "key",
    key: "key",
    render: (text) => <a className="text-blue-700">{text}</a>,
  },
  {
    title: "Tên Chi Nhánh",
    dataIndex: "nameCinemas",
    key: "nameCinemas",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Trạng thái",

    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "green" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <EditFilm />

        <Popconfirm
          placement="topLeft"
          title="Bạn muốn xóa sản phẩm?"
          description="Xóa sẽ mất sản phẩm này trong database!"
           onConfirm={() => removeCinemas(record.key)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{
            style: { backgroundColor: "#007bff", color: "white" },
          }}
          cancelButtonProps={{
            style: { backgroundColor: "#dc3545", color: "white" },
          }}
        >
          <Button>
            <div className="flex ">
              <DeleteOutlined />
            </div>
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

const { Search } = Input;
const { RangePicker } = DatePicker;

const ListCinemas: React.FC = () => {
  const { data: Cinemas } = useGetCinemasQuery();
  const [removeCinemas] = useRemoveCinemasMutation();
  console.log(Cinemas);

  const dataCinemas = Cinemas?.data?.map((Cinemas: ICinemas, index: number) => ({
    key: index.toString(),
    name: Cinemas?._id,
    nameCinemas: Cinemas?.name,
    address: Cinemas?.address,
    tags: [Cinemas.status === 1 ? "Hoạt động" : "Ngừng hoạt động"],
  }));

  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí Rạp Phim</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên rạp hoặc mã rạp"
            style={{ width: 600 }}
          />
          <RangePicker />
          <AddCinemas />
        </div>
      </div>
      <Table columns={columns} dataSource={dataCinemas} />
    </>
  );
};

export default ListCinemas;
