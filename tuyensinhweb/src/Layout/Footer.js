import { useEffect, useState } from "react";
import API, { endpoint } from "../configs/API";
import Loading from "../Layout/Loading";
import Map from "../components/map";
import React from 'react';



const Footer = () => {
    const [info, setInfo] = useState(null);

  useEffect(() => {
    const loadInfoContact = async () => {

      let res = await API.get(endpoint["home"]);
      setInfo(res.data);
    };
    loadInfoContact();
  }, []);

  if(info === null){
    return <Loading/>
  }

  return (
    <>

    <div className="p-5 mt-2" style={{ backgroundColor: '#E8E8E8', color: 'black' }}>
        <div style={{paddingLeft: "100px" }}>
            <h3>{info[0].name}</h3>
            <p>&#127974;  {info[0].address}</p>
            <p>&#128234;  {info[0].mail}</p>
            <p>&#128222;  {info[0].hotline}</p>

        </div>
      
    </div>

    <div className="p-5 mt-2 bg-primary text-white">
    <h3>Võ Thị Anh Thư &copy; 2023</h3>

    </div>
    </>
  );

}

export default Footer