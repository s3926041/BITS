
import Table from "./Table";
let url = "http://localhost:5000/api/product";

let arr = [
    '_id','title','author','price','createdAt']
function Product() {
  return <Table
  title={'Book'}
  arr={arr}
  url={url}
  ></Table>;
}

export default Product;
