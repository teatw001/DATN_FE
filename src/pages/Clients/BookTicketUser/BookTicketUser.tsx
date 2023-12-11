import { useGetBookTicketByUserQuery } from "../../../service/book_ticket.service";
import { Table, Image, Button, Modal, Input, message, Badge, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { FilterValue } from "antd/es/table/interface";
import moment from "moment";
import { useState } from "react";
import { useFetchProductQuery } from "../../../service/films.service";
import { useFetchMovieRoomQuery } from "../../../service/movieroom.service";
import { useSendRefundMutation } from "../../../service/refund.services";

export interface DataType {
  time: string;
  name: string;
  id_code: string;
  status: string;
  id_card: string;
  movie_room_name: string;
  name_cinema: string;
  date: string;
  food_items: string | undefined;
  chair: string;
}

const BookTicketUser = () => {
  const [sendRefund] = useSendRefundMutation();
  const idUser = localStorage.getItem("user_id");
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [password, setPassword] = useState<string>("");
  const [id, setID] = useState<string>("");
  const { data: fetchBookTicket } = useGetBookTicketByUserQuery(idUser);
  const { data: film } = useFetchProductQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id_book_ticket: number) => {
    setID(id_book_ticket);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const res = await sendRefund({ password: password, id: id });
      console.log(res);
      message.error(res.error.data.message);

      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // Thực hiện xử lý khi bấm Hủy
  };
  const formatter = (value: number) =>
    `${value} Vn₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const formatDate = (dateString: string) => {
    return moment(dateString).format("DD/MM/YYYY HH:mm:ss");
  };
  const getUniqueValues = (dataList: string, key) => {
    return Array.from(new Set(dataList?.data?.map((item) => item[key])));
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "MÃ HÓA ĐƠN",
      dataIndex: "id_code",
      key: "id_code",
      ellipsis: true,
    },
    {
      title: "PHIM",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "10%",
      filters: getUniqueValues(film, "name")?.map((item) => ({
        text: item,
        value: item,
      })),
      filteredValue: filteredInfo?.name || null,
      onFilter: (value: string, record) => {
        console.log(record);
        return record.name?.name.includes(value);
      },
      render: (text: any) => (
        <div>
          {text && (
            <div>
              <div className="whitespace-nowrap">
                <Image width={100} src={text.img} />
              </div>
              <p className="whitespace-nowrap">
                <b>{text.name}</b>
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "PHÒNG CHIẾU",
      dataIndex: "movie_room_name",
      key: "movie_room_name",
      width: "10%",
      align: "center",
      ellipsis: true,
    },
    {
      title: "RẠP CHIẾU",
      dataIndex: "name_cinema",
      key: "name_cinema",
      width: "10%",
      align: "center",
      ellipsis: true,
    },
    {
      title: "SUẤT CHIẾU",
      key: "date",
      dataIndex: "date",
      align: "center",
      render: (text: any) => (
        <span>
          {text && (
            <div>
              <p className="whitespace-nowrap">Ngày: {text.date}</p>
              <p className="whitespace-nowrap">Giờ: {text.time}</p>
            </div>
          )}
        </span>
      ),
    },
    {
      title: "GHẾ ĐÃ ĐẶT",
      dataIndex: "chair",
      key: "chair",
      render: (text: any) => (
        <span>
          {text && (
            <div>
              <p className="whitespace-nowrap">{text.name}</p>
              <p className="whitespace-nowrap">
                <b>Tổng Tiền</b>: {formatter(Number(text.price))}
              </p>
            </div>
          )}
        </span>
      ),
    },
    {
      title: "COMBO/PACKAGE",
      dataIndex: "food_items",
      key: "food_items",
    },
    {
      title: "NGÀY ĐẶT",
      dataIndex: "time",
      key: "time",
      render: (text) => <span>{formatDate(text)}</span>,
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đã Nhận Vé", value: "Đã Nhận Vé" },
        { text: "Đã Hủy", value: "Đã Hủy" },
        { text: "Quá Hạn", value: "Quá Hạn" },
        { text: "Hoàn Tiền", value: "Hoàn Tiền" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value: string, record) => record.status.status === value,
      render: (text) => {
        if (text.status === "Đã Nhận Vé") {
          return <Tag color="success">Đã Nhận Vé</Tag>;
        }
        if (text.status === "Đã Hủy") {
          return <Tag color="warning">Đã Hủy</Tag>;
        }
        if (text.status === "Quá Hạn") {
          return <Tag color="error">Quá Hạn</Tag>;
        }
        return (
          <div>
            <Button
              style={{ backgroundColor: "#f04848", color: "#ffff" }}
              onClick={() => showModal(+text.id_book_ticket)}
            >
              Hoàn Tiền
            </Button>
            <Modal
              title="Xác Minh Hoàn Tiền"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              mask={true}
            >
              <p>Nhập Mật Khẩu</p>
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Modal>
          </div>
        );
      },
    },
  ];
  const dataBookTicket = (fetchBookTicket as any)?.map(
    (bookticket: any, index: number) => {
      let statusText = "";
      switch (bookticket.status) {
        case 0:
          statusText = "Hoàn Tiền";
          break;
        case 1:
          statusText = "Đã Nhận Vé";
          break;
        case 2:
          statusText = "Đã Hủy";
          break;
        case 3:
          statusText = "Quá Hạn";
          break;
        default:
          statusText = "Không Xác Định";
          break;
      }
      return {
        key: index.toString(),
        id_code: bookticket.id_code,
        time: bookticket.time,
        name: {
          name: bookticket.name,
          img: bookticket.image,
        },
        movie_room_name: bookticket.movie_room_name,
        name_cinema: bookticket.name_cinema,
        date: {
          date: bookticket.date,
          time: bookticket.time_suatchieu,
        },
        food_items: bookticket.food_items,
        chair: {
          name: bookticket.chair_name,
          price: bookticket.total_price,
        },
        cinema_name: bookticket.cinema_name,

        status: {
          status: statusText,
          id_book_ticket: bookticket.id_book_ticket,
        },
      };
    }
  );

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters
  ) => {
    console.log(filters);

    setFilteredInfo(filters);
  };
  return (
    <div>
      <Table
        className="bg-white rounded-lg mx-auto px-10"
        onChange={handleChange}
        columns={columns}
        dataSource={dataBookTicket}
        scroll={{ x: 2200, y: 600 }}
      />
    </div>
  );
};

export default BookTicketUser;
