import React, { useRef, useContext, useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLateral } from '../../../components/NavBars/SideNavBar/NavLateral'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { NavLateralAdmin } from '../../../components/NavBars/SideNavBar/NavLateralAdmin'
import { AICropContext } from '../../../context/AICropContext'
import axios from 'axios'
import "./mainPage.scss"



// VISTA PRINCIPAL DE USUARIO / MAINPAGE == VISTA DE TODOS SUS INVERNADEROS
export const MainPage = () => {
  const {user, actionReload, setActionReload} = useContext(AICropContext);
  const [userGreenhouses, setUserGreenhouses] = useState([]);
  const navigate = useNavigate();
  const greenhouse_id = parseInt(useParams().greenhouse_id); 
  console.log(greenhouse_id, "grinhaus aidiiiii");


  useEffect(() => {
    if (user){
    axios
      .get(`http://localhost:4000/greenhouse/getAllGreenhouses/${user?.user_id}`)
      .then((res)=>{
        let arraty = [];
        console.log(res.data, "averrrr");
        const {resultOwner, resultCollaborator} = res.data;
        
        for (let i = 0; i < resultOwner.length; i++){
          arraty.push(resultOwner[i].greenhouse_id)
        }
        for (let i = 0; i < resultCollaborator.length; i++){
          arraty.push(resultCollaborator[i].greenhouse_id)
        }

        console.log(arraty, "aaaarratyyyyy");
        setUserGreenhouses(arraty)
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    if(greenhouse_id){
      // const greenhouse_id = useParams().greenhouse_id; 
  
      if(userGreenhouses.includes(greenhouse_id)){
        console.log("pringao")
      } else {
        navigate('/error')
        console.log('aacualquier cosa es para ver si entra jaja');
      }
    }
 
  }, [user])
  // console.log(userGreenhouses, "aaaAAAAAAAAAAA");


  return (
    <Container fluid className='p-0 containerMain'>
        <Row className='contNav_pPal'>
            <Col className='col-12 col-xl-3 p-0'>
              {user?.user_type == 1 ? <NavLateralAdmin/> :
                <NavLateral
                // setShowModalCrop= {setShowModalCrop}
                // showModalCrop={showModalCrop}
                /> }
            </Col>
            <Col className='col-12 col-xl-9 p-0 outlet_cont'>
              <div className={`white_cont`} >
                <div className='padree'>
                  <Outlet/>
                </div>
              </div>
            </Col>
        </Row>
    </Container>
  );
};
