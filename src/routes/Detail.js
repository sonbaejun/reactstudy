import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeBasket } from "../store/userBasket.js";
import { Context1 } from "./../App.js";

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

let BlackBox = styled.div`
  background: grey;
  padding: 20px;
`;

function DetailPage(props) {
  let [count, setCount] = useState(1);
  let [inputNum, setInputNum] = useState("");
  let [tab, setTab] = useState(0);
  let userBasket = useSelector((state) => state.userBasket);
  let dispatch = useDispatch();

  let { ea } = useContext(Context1);
  console.log(ea);
  useEffect(() => {
    //mount, update 시 실행 코드
  });
  useEffect(() => {
    //mount 시 실행 코드
  }, []); // [] ==> 디펜던시
  useEffect(() => {
    return () => {
      //useEffect 코드 실행 전에 실행될 코드
    };
  });
  useEffect(() => {
    return () => {
      //useEffect 코드 실행 전에 실행될 코드 + 디펜던시 추가 => unmount 시 1회만 동작
    };
  }, []);
  useEffect(() => {
    // state1이 변경될때만 실행
  }, [count]);

  let { id } = useParams();
  let index = props.shoes.findIndex((e) => e.id == id);
  let imgId = Number(id) + 1;
  return (
    <div className="container">
      {userBasket.map((e) => {
        return <div>{e.id}</div>;
      })}
      <div className="row">
        <BlackBox>
          {count}
          <YellowBtn
            onClick={() => {
              setCount(count + 1);
            }}
          ></YellowBtn>
        </BlackBox>
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${imgId}.jpg`}
            width="100%"
          />
        </div>
        {/* {count == true ? <p>2초내에 누르면 공짜임 !!</p> : <p>뻥이야~</p>} */}
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[index].title}</h4>
          <p>{props.shoes[index].content}</p>
          <p>{props.shoes[index].price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(changeBasket(props.shoes[index]));
            }}
          >
            주문하기
          </button>
        </div>
        {/* <input
          value={inputNum}
          onChange={(e) => {
            const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
            setInputNum(onlyNumber);
          }}
        ></input> */}
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} shoes={props.shoes[tab]} />
    </div>
  );
}

function TabContent(props) {
  console.log(props);
  if (props.tab == 0) {
    return <div>{props.shoes.title}</div>;
  } else if (props.tab == 1) {
    return <div>내용1</div>;
  } else if (props.tab == 2) {
    return <div>내용2</div>;
  }
}

export default DetailPage;
