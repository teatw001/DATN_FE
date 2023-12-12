import { useState } from "react";
import { Space, Table, Input, Button, Popconfirm, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { IFilms, IMovieRoom, IShowTime, ITime } from "../../../interface/model";
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchTimeQuery } from "../../../service/time.service";
import EditShow from "./EditShow";
import {
  useFetchShowTimeQuery,
  useRemoveShowTimeMutation,
} from "../../../service/show.service";
import AddShow from "./AddShow";
import { useFetchMovieRoomQuery } from "../../../service/movieroom.service";
import { FilterValue } from "antd/es/table/interface";

interface DataType {
  id: string;
  date: Date;
  time_id: string;
  film_id: string;
  room_id: string;
}

const { Search } = Input;

const ListShow: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const { data: roomBrand } = useFetchMovieRoomQuery();
  const { data: shows } = useFetchShowTimeQuery();
  const { data: films } = useFetchProductQuery();
  const { data: times } = useFetchTimeQuery();
  const { data: room } = useFetchMovieRoomQuery();
  const [removeShowTimes] = useRemoveShowTimeMutation();
  let user = JSON.parse(localStorage.getItem("user")!);

  const role = user.role;

  // console.log(shows);
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã Suất Chiếu",
      dataIndex: "id",
      key: "1",
    },
    {
      title: "Tên Phim",
      dataIndex: "film_id",
      key: "film_id",
      filters: films?.data?.map((item) => ({ text: item.name, value: item.name})),
      filteredValue: filteredInfo.film_id || null,
      onFilter: (value: string, record) => record.film_id.includes(value),
    },
    {
      title: "Thời gian",
      dataIndex: "time_id",
      key: "time_id",
      filters: times?.data?.map((item) => ({ text: item.time, value: item.time})),
      filteredValue: filteredInfo.time_id || null,
      onFilter: (value: string, record) => record.time_id.includes(value),
    },
    {
      title: "Phòng Chiếu",
      dataIndex: "room_id",
      key: "room_id",
      filters: room?.data?.map((item) => ({ text: item.name, value: item.name})),
      filteredValue: filteredInfo.room_id || null,
      onFilter: (value: string, record) => record.room_id.includes(value),
    },
    {
      title: role === 1 && "Action",
      key: "action",
      render: (_, record) => {
        if (role === 1 || role === 3) {
          return (
            <Space size="middle">
              <EditShow dataShow={record} />

              <Popconfirm
                placement="topLeft"
                title="Bạn muốn xóa sản phẩm?"
                description="Xóa sẽ mất sản phẩm này trong database!"
                onConfirm={() => {
                  removeShowTimes(record.id);
                  message.success("Xóa sản phẩm thành công!");
                }}
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
          );
        }
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataShow = (shows as any)?.data?.map(
    (show: IShowTime, index: number) => ({
      key: index.toString(),
      id: show.id,
      date: show.date,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      film_id: (films as any)?.data?.find(
        (films: IFilms) => films.id === show.film_id
      )?.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      time_id: (times as any)?.data?.find(
        (times: ITime) => times.id === show.time_id
      )?.time,
      room_id: (roomBrand as any)?.data?.find(
        (room: IMovieRoom) => room.id === show.room_id
      )?.name,
    })
  );
    
  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters) => {
    console.log(filters);
    
    setFilteredInfo(filters);
  };
  const [dataShows, setDateShows] = useState<any>(null);

  const onSearch = (value: any, _e: any) => {
    const results = dataShow.filter((item: any) =>
      item.film_id.toLowerCase().includes(value.toLowerCase())
    );
    setDateShows(results);
  };
  return (
    <>
      <div className="">
        <h2 className="font-bold text-2xl my-4">Quản lí Suất Chiếu</h2>
        <div className="space-x-4 justify-center my-4">
          <Search
            placeholder="Nhập tên phim hoặc mã phim"
            style={{ width: 600 }}
            onSearch={onSearch}
          />

          {role === 1  && <AddShow />}
          {role === 3 && <AddShow />}
        </div>
      </div>
      {dataShows ? (
        <Table columns={columns} dataSource={dataShows} onChange={handleChange} />
      ) : (
        <Table columns={columns} dataSource={dataShow} onChange={handleChange} />
      )}
    </>
  );
};

export default ListShow;
