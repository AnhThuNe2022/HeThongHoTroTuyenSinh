import { Card, Col, Container } from "reactstrap";
import { Row } from "react-bootstrap";

const AlertSection = ({ alert }) => {
    return (

<>
<br></br>

<section className="section section-lg pt-0">
 <Container>
   <Card className="bg-gradient-warning shadow-lg border-0">
     <div className="p-4">
       <Row className="align-items-center">
         <Col lg="8">
           <h3 className="text-white">
           {alert}
           {}
           </h3>
          
         </Col>
       
       </Row>
     </div>
   </Card>
 </Container>
</section>
</>


    )
}

export default AlertSection