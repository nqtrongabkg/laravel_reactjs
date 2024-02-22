import React, {useState} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useUserContext } from '../../layouts/LayoutSite';
import ContactService from '../../services/ContactService';
import { toast } from 'react-toastify';
const AboutUs = () => {
    const { user } = useUserContext();

    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        title: '',
        content: ''
    });

    // Function to handle form data changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make API request to store contact
            const result = await ContactService.store({
                ...formData,
                id: user ? user.id : null, // Assuming 'user' contains user information
                status: 1, // You may customize the status value as needed
            });

            // Handle the result accordingly (show success message, reset form, etc.)
            if(result.status){
                toast.success(result.message);
            }

            // Reset the form after successful submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                title: '',
                content: ''
            });
        } catch (error) {
            // Handle errors (show error message, log, etc.)
            console.error("Error submitting form:", error);
        }
    };
    return (
        <div className="aboutus-main-content">
            <Container>
                <Row>
                    <Col md={6}>
                        <h1 className="aboutus-title">Chào mừng đến với Laptop Store</h1>
                        <p className="aboutus-description">
                            Laptop Store là địa chỉ đáng tin cậy cho những người đang tìm kiếm chiếc laptop chất lượng
                            với giá cả phải chăng. Chúng tôi tự hào cung cấp dịch vụ xuất sắc và đa dạng, từ các dòng
                            laptop phổ thông đến các sản phẩm chuyên đồ hoạ và gaming.
                        </p>
                        <p className="aboutus-description">
                            Đội ngũ chuyên gia tư vấn của chúng tôi luôn sẵn lòng hỗ trợ bạn chọn lựa sản phẩm phù hợp
                            với nhu cầu và ngân sách của bạn. Hãy đến và trải nghiệm mua sắm tại Laptop Store ngay hôm nay!
                        </p>

                        {/* Hướng dẫn mua hàng */}
                        <h2 className="aboutus-subtitle">Hướng dẫn mua hàng</h2>
                        <p className="aboutus-description">
                            Để mua hàng tại Laptop Store, bạn có thể thực hiện các bước sau:
                        </p>
                        <ol className="aboutus-description">
                            <li>Chọn sản phẩm mong muốn từ danh sách sản phẩm trên trang web.</li>
                            <li>Nhấn vào nút "Thêm vào giỏ hàng" để đưa sản phẩm vào giỏ hàng của bạn.</li>
                            <li>Kiểm tra giỏ hàng và nhấn "Thanh toán" để tiến hành thanh toán.</li>
                            <li>Điền thông tin cá nhân và chọn phương thức thanh toán.</li>
                            <li>Xác nhận đơn hàng và hoàn tất thanh toán.</li>
                        </ol>

                        {/* Hướng dẫn thanh toán */}
                        <h2 className="aboutus-subtitle">Hướng dẫn thanh toán</h2>
                        <p className="aboutus-description">
                            Chúng tôi hỗ trợ nhiều phương thức thanh toán để đảm bảo sự thuận lợi cho khách hàng:
                        </p>
                        <ul className="aboutus-description">
                            <li>Thanh toán khi nhận hàng (COD): Thanh toán tiền mặt khi nhận được sản phẩm tại địa chỉ của bạn.</li>
                            <li>Chuyển khoản ngân hàng: Chuyển tiền trực tiếp vào tài khoản ngân hàng của chúng tôi.</li>
                            <li>Thanh toán qua cổng thanh toán trực tuyến: Sử dụng các phương thức thanh toán trực tuyến an toàn và thuận tiện.</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        {/* FORM Liên hệ */}
                        <Form className="aboutus-contact-form" onSubmit={handleSubmit}>
                            <h2 className="aboutus-subtitle">Liên hệ với chúng tôi</h2>
                            <Form.Group controlId="formName">
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Nhập địa chỉ email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Tiêu đề</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tiêu đề"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formMessage">
                                <Form.Label>Nội dung</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Nhập nội dung tin nhắn của bạn"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Gửi tin nhắn
                            </Button>
                        </Form>

                        {/* Thông tin liên hệ */}
                        <h2 className="aboutus-subtitle">Thông tin liên hệ</h2>
                        <p className="aboutus-description">
                            Địa chỉ: 20 Tăng Nhơn Phú, Phước Long B, Thủ Đức, Thành phố Hồ Chí Minh 715939, Việt Nam
                        </p>
                        <p className="aboutus-description">
                            Số điện thoại: 0123456789
                        </p>
                        <p className="aboutus-description">
                            Email: abc@gmail.com
                        </p>

                        {/* Chính sách bảo hành */}
                        <h2 className="aboutus-subtitle">Chính sách bảo hành</h2>
                        <p className="aboutus-description">
                            Tại Laptop Store, chúng tôi cam kết cung cấp sản phẩm chất lượng và dịch vụ hậu mãi tốt nhất. Dưới đây là
                            chính sách bảo hành của chúng tôi:
                        </p>
                        <ul className="aboutus-description">
                            <li>Chúng tôi cung cấp bảo hành 12 tháng cho tất cả các sản phẩm mới.</li>
                            <li>Đối với sản phẩm bảo hành, quý khách vui lòng liên hệ hotline hỗ trợ của chúng tôi để được hướng dẫn chi tiết.</li>
                            <li>Bảo hành không áp dụng trong các trường hợp tự ý thay đổi, sửa chữa sản phẩm mà không có sự cho phép của chúng tôi.</li>
                            <li>Quý khách vui lòng giữ lại hóa đơn mua hàng để được hỗ trợ bảo hành nhanh chóng và chính xác.</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            {/* Google Map */}
            <div className="aboutus-google-map">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.888827625334!2d106.76412725791791!3d10.852648699695227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752d71f4ecb7f7%3A0x6bbf8d6352bcf173!2s20%20T%C4%83ng%20Nh%C6%A1n%20Ph%C3%BA%2C%20Ph%C6%B0%E1%BB%9Dc%20Long%20B%2C%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2sus!4v1642802283520!5m2!1sen!2sus"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default AboutUs;
