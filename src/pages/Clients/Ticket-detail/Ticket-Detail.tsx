import React from 'react'
import Header from '../../../Layout/LayoutUser/Header'
import { Card, Row, Col, Typography, Button } from 'antd';

const { Title, Text } = Typography;
const Ticket_Detail = () => {
    return (
        <div>
            <Header />
            <div style={{ maxWidth: '950px', margin: '50px auto' }}>
                <Card title={<Title className='text-center' level={2}>Thông Tin Vé Xem Phim</Title>} bordered={false}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8}>
                            <img src="movie-poster.jpg" alt="Movie Poster" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                        </Col>
                        <Col xs={24} sm={12} md={16}>
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ flex: 1, paddingRight: '20px' }}>
                                    <Title level={3}>Tên Phim</Title>
                                    <Text>Đạo diễn: John Doe</Text>
                                    <Text>Thể loại: Hành động</Text>
                                    <Text>Ngày chiếu: 01/01/2023</Text>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div style={{ marginTop: '20px' }}>
                        <Title level={3}>Thông Tin Vé</Title>
                        <Text>Phòng chiếu: A1</Text>
                        <Text>Ghế: A1, A2, A3</Text>
                        <Text>Giờ chiếu: 19:30</Text>
                        <Text>Giá vé: $10/người</Text>
                        <Text>Tổng cộng: $30</Text>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button type="dashed" size="large">Thanh Toán</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Ticket_Detail