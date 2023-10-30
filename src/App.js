import { useState } from "react";
import "./App.css";
import {
  Button,
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Row,
  Col,
} from "react-bootstrap";
import data from "./data.js";
import DetailPage from "./routes/Detail.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  function sortItem() {
    let copyShoes = [...shoes];
    copyShoes.sort((a, b) => {
      return a.price - b.price;
    });
    setShoes(copyShoes);
  }

  return (
    <div className="App">
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            Baejun-Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/detail");
                }}
              >
                Detail
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <button onClick={() => sortItem()}>상품정렬기능</button>
              <div>
                <Row>
                  {shoes.map((e, index) => {
                    return <Product shoes={e} index={index} />;
                  })}
                </Row>
              </div>
            </>
          }
        />
        <Route path="/detail/:id" element={<DetailPage shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>}></Route>
          <Route path="location" element={<About />}></Route>
        </Route>
        <Route path="/event" element={<Event />}>
          <Route
            path="one"
            element={<div>첫 주문시 양배추즙 서비스</div>}
          ></Route>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>
        <Route path="*" element={<div>404pages</div>}></Route>
      </Routes>
    </div>
  );
}

function Product(props) {
  let navigate = useNavigate();
  return (
    <Col xs={{ order: "last" }}>
      <img
        src={`https://codingapple1.github.io/shop/shoes${
          props.shoes.id + 1
        }.jpg`}
        width="80%"
        onClick={() => {
          navigate(`/detail/${props.shoes.id}`);
        }}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  );
}

function About() {
  return (
    <div>
      <h3>회사정보</h3>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
