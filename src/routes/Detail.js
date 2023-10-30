import { useParams } from "react-router-dom";

function DetailPage(props) {
  let { id } = useParams();
  let index = props.shoes.findIndex((e) => e.id == id);
  let imgId = Number(id) + 1;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${imgId}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[index].title}</h4>
          <p>{props.shoes[index].content}</p>
          <p>{props.shoes[index].price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
        ``
      </div>
    </div>
  );
}

export default DetailPage;
