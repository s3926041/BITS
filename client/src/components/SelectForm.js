import Form from 'react-bootstrap/Form';

function SelectForm({sort,setRequest}) {
  // const [value,setValue] = useState(0)
  const handleChange = (e) => {
      setRequest(e.target.value,1)
      console.log(e.target.value)
  }
  return (
    <Form.Select aria-label="Default select example" className='sort' value={sort} onChange={handleChange}>
      <option value="0">A to Z</option>
      <option value="1">Z to A</option>
      <option value="2">Price Low to High</option>
      <option value="3">Price High to Low</option>
    </Form.Select>
  );
}

export default SelectForm;