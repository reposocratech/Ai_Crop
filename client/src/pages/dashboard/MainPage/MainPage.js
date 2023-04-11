import React, { useRef, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLateral } from '../../../components/NavBars/SideNavBar/NavLateral'
import { Outlet } from 'react-router-dom'
import "./mainPage.scss"
import { NavLateralAdmin } from '../../../components/NavBars/SideNavBar/NavLateralAdmin'
import { AICropContext } from '../../../context/AICropContext'



// Cuando un usuario se loggea la vista principal es esta, con las páginas "hijas" de User en el Outlet

// VISTA PRINCIPAL DE USUARIO / MAINPAGE == VISTA DE TODOS SUS INVERNADEROS
export const MainPage = () => {
  const {user} = useContext(AICropContext);
  const outletCont_ref = useRef()
  const whiteCont_ref = useRef()
  // const [showModalCrop, setShowModalCrop] = useState("false");
  

  /*
  useEffect(() => {
    if (window.location.pathname === '/user/createGreenhouse'){
      outletCont_ref.current.style.outline = "35px solid #131A1B"
      whiteCont_ref.current.style.backgroundColor = "#131A1B"
    } 
  }, [window.location.pathname])

  const oscurecer = () => {
    outletCont_ref.current.style.outline = "35px solid #131A1B"
    whiteCont_ref.current.style.backgroundColor = "#131A1B"
  }
  */

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
            <Col className='col-12 col-xl-9 p-0 outlet_cont' ref={outletCont_ref} >
              <div className="white_cont" ref={whiteCont_ref} >
                <div className='padree'>
                  <Outlet/>
                </div>
              </div>
            </Col>
        </Row>
    </Container>
  )
}