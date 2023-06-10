import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorAlert = ({ err }) => {
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
     
        <Alert  className="alert-default" onClose={() => setShow(false)} dismissible>
          {err}
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;