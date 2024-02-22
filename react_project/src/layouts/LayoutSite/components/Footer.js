
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../layoutSite.css';
import ConfigService from '../../../services/ConfigService';

const Footer = () => {
    const [conf, setConf] = useState([]); 
    const [load, setLoad] = useState(true); 

    useEffect(() => {
        if (load) {
            const fetchData = async () => {
                setLoad(false); 
                try {
                    const response = await ConfigService.show(1);
                    if (response.status) {
                        setConf(response.config); 

                    } else {
                        console.log(response.message);
                    }
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            };
            fetchData();
        }
        
    }); 

    return (
        <footer className="footer-area text-white pt-4 pb-4">
            <Container>
                <Row>
                    <Col md={3} sm={6}>
                        <h5>About Us</h5>
                        <p>Laptop Store là địa chỉ đáng tin cậy cho những người đang tìm kiếm chiếc laptop chất lượng
                            với giá cả phải chăng. Chúng tôi tự hào cung cấp dịch vụ xuất sắc và đa dạng, từ các dòng
                            laptop phổ thông đến các sản phẩm chuyên đồ hoạ và gaming.
                        </p>
                    </Col>
                    <Col md={3} sm={6}>
                        <h5>Information</h5>
                        <ul className="list-unstyled">
                            <li><a href="#home" className="text-white">Name: {conf.author}</a></li>
                            <li><a href="#shop" className="text-white">Email: {conf.email}</a></li>
                            <li><a href="#faqs" className="text-white">Address: {conf.address}</a></li>
                            <li><a href="#contact" className="text-white">Contact: {conf.phone}</a></li>
                        </ul>
                    </Col>
                    <Col md={3} sm={6}>
                        <h5>Contact Info</h5>
                        <p>
                            123 E-commerce St.<br />
                            Shopping City, SC 12345<br />
                            Email: contact@example.com<br />
                            Phone: (123) 456-7890
                        </p>
                    </Col>
                    <Col md={3} sm={6}>
                        <h5>Newsletter</h5>
                        <p>Sign up for the latest updates and offers.</p>
                        {/* Example newsletter signup form */}
                        <form>
                            <input type="email" placeholder="Your email" className="form-control mb-2" />
                            <button type="submit" className="btn btn-secondary">Subscribe</button>
                        </form>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        &copy; {new Date().getFullYear()} NguyenQuocTrong. 2121110138.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
