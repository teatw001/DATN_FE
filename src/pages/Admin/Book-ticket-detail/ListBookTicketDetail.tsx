import React from "react";
import { Space, Table, Input, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useFetchBookTicketDetailQuery, useRemoveBookTicketDetailMutation } from "../../../service/book_ticket_detail.service";
import { IBookTicketDetail } from "../../../interface/model";

interface DataType {
    id: string,
    book_ticket_id: string,
    time_id: string,
    food_id: string,
    chair: string,
    quantity: number,
    price: number,
}

const { Search } = Input;

const ListBookTicketDetail: React.FC = () => {
    const { data: bookticketDetail } = useFetchBookTicketDetailQuery();
    const [removeBookTicketDetail] = useRemoveBookTicketDetailMutation();
    const columns: ColumnsType<DataType> = [
        {
            title: "Mã Chi Tiết Vé",
            dataIndex: "id",
            key: "key",
            render: (text) => <a className="text-blue-700">{text}</a>,
        },
        {
            title: "Mã Vé",
            dataIndex: "book_ticket_id",
            key: "book_ticket_id",
        },
        {
            title: "Thời Gian",
            dataIndex: "time_id",
            key: "time_id",
        },
        {
            title: "Đồ Ăn",
            dataIndex: "food_id",
            key: "food_id",
        },
        {
            title: "Số Ghế",
            dataIndex: "chair",
            key: "chair",
        },
        {
            title: "Số Lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Giá Tiền",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {/* <EditBookTicket dataCinema={record} /> */}

                    <Popconfirm
                        placement="topLeft"
                        title="Bạn muốn xóa sản phẩm?"
                        description="Xóa sẽ mất sản phẩm này trong database!"
                        onConfirm={() => removeBookTicketDetail(record.id)}
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

    const dataBookTicketDetail = (bookticketDetail as any)?.data?.map((bookticket: IBookTicketDetail, index: number) => ({
        key: index.toString(),
        id: bookticket.id,
        book_ticket_id: bookticket.book_ticket_id,
        time_id: bookticket.time_id,
        food_id: bookticket.food_id,
        chair: bookticket.chair,
        quantity: bookticket.quantity,
        price: bookticket.price,
    }));

    return (
        <>
            <div className="">
                <h2 className="font-bold text-2xl my-4">Quản lí Vé Đã Đặt</h2>
                <div className="space-x-4 justify-center my-4">
                    <Search
                        placeholder="Nhập thông tin tìm kiếm"
                        style={{ width: 600 }}
                    />

                    {/* <AddBookTicket /> */}
                </div>
            </div>
            <Table columns={columns} dataSource={dataBookTicketDetail} />
        </>
    );
};

export default ListBookTicketDetail;
