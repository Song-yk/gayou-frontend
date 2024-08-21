import React from "react";
import { Button } from "react-bootstrap";

// Navbar 컴포넌트 정의
const Navbar = () => {

  return (
            <div className="navbar">
                <div className="container d-flex align-items-center justify-content-end">
                    <Button className="fw-bold btn-lg m-4 rounded-pill btn-light"  
                    style={{ border: '1px solid black'}}
                    href="/login">
                        로그인 및 회원가입
                    </Button>
               </div>
            </div>
  );
};

export default Navbar;