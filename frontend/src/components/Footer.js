import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Row>
                <Container>
                    <Col className='text-center py-3 mg-12 br-black'>
                        Copyright &copy; ShopNow
                    </Col>
                </Container>
            </Row>
        </footer>
    )
}

export default Footer
