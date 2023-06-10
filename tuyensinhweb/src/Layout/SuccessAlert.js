import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const SuccessAlert = ({ content }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);

    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (

        <Alert className="alert-default" onClose={() => setShow(false)} dismissible>
          {content}
        </Alert>
      )}
    </>
  );
};

export default SuccessAlert;