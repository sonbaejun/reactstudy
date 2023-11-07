import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeAge } from "./../store/userSlice.js";
import { changeCount, deleteBasket } from "../store/userBasket.js";

function Cart() {
  let userBasket = useSelector((state) => state.userBasket);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  return (
    <div>
      {user.name} {user.age}의 장바구니
      <button
        onClick={() => {
          dispatch(changeAge(3));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제버튼</th>
          </tr>
        </thead>
        <tbody>
          {userBasket.map((e, index) => (
            <tr>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeCount(e.id));
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch(deleteBasket(e.id));
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
