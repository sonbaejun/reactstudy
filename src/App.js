import { createContext, useState } from "react";
import "./App.css";
import {
  Button,
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import data from "./data.js";
import Cart from "./routes/Cart.js";
import DetailPage from "./routes/Detail.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [ea] = useState([10, 11, 12]);
  let navigate = useNavigate();

  function sortItem() {
    let copyShoes = [...shoes];
    copyShoes.sort((a, b) => {
      return a.price - b.price;
    });
    setShoes(copyShoes);
  }

  function moreBtn() {
    console.log(shoes.length);
    let num1 = shoes.length;
    let urlNum = num1 / 3 + 1;
    axios
      .get(`https://codingapple1.github.io/shop/data${urlNum}.json`)
      .then((data) => {
        let copyShoes = [...shoes];
        data.data.map((e) => {
          copyShoes.push(e);
        });
        setShoes(copyShoes);
      })
      .catch(() => {
        alert("더 이상 상품이 없어요");
      });
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
              <button
                onClick={() => {
                  navigate("/cart");
                }}
              >
                장바구니
              </button>
              <div>
                <Row md={3}>
                  {shoes.map((e, index) => {
                    return <Product shoes={e} index={index} />;
                  })}
                </Row>
              </div>
              <button
                onClick={() => {
                  moreBtn();
                }}
              >
                더보기 버튼
              </button>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ ea }}>
              <DetailPage shoes={shoes} />
            </Context1.Provider>
          }
        />
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
        <Route path="/cart" element={<Cart></Cart>}></Route>
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
