import React from "react"
import { Form } from "react-bootstrap"
import {
    
    Input,
    InputGroup,
  } from "reactstrap";
const InputItem = React.forwardRef(({label, type, value, setValue, name}, ref) => {
    if (type === "file")
        return (
            <Form.Group className="mb-3" controlId={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type="file" ref={ref}  />
            </Form.Group>
        )

    return (
        <InputGroup className="mb-3">
                        
        <Input type={type} value={value} name={name}
        onChange={setValue} placeholder={label}/>
      </InputGroup>
    )
}) 

export default InputItem
