import React, {useState, useEffect} from 'react';

import {Navbar, Container, Col} from 'react-bootstrap';

export default function Footer() {
    const [fullYear, setFullYear] = useState();

    useEffect(() => {
        setFullYear(new Date().getFullYear());
    }, [fullYear]);

    return (
        <div></div>
        // <Navbar fixed="bottom" bg="dark" variant="dark">
        //     <Container>
        //         <Col lg={12} className="text-center text-muted">
        //             <div>{fullYear} - Developed by Swagat Gyawali</div>
        //         </Col>
        //     </Container>
        // </Navbar>
    );
}