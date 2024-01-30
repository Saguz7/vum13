"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@public/components/Header';
import Button from '@public/components/Button';
import Input from '@public/components/Input';
import Sidebar from '@public/components/Sidebar';
import Footer from "@public/components/Footer";

import styles from './style.css';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/UserContext';
import { useDarkMode } from '@/app/DarkModeContext';
import getConfig from '@raiz/config';

import ModalRFCLlave from "@public/components/ModalRFCLlave"; // Asegúrate de ajustar la ruta de importación


import axios from "axios";

 


 export default function Page() {
  const { END_POINT_BACK } = getConfig();
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    rfc: "" 
  });


  
  const handleComprobar = (formData) => {
  
    closeModal(); 
    console.log(formData.rfc);

    console.log(END_POINT_BACK + "contribuyente");
    console.log(formData.rfc);

 

    axios.post(
     // 'https://8k76x7y1fh.execute-api.us-east-1.amazonaws.com/default/contribuyente'
     END_POINT_BACK + "/contribuyente", {
      //body: {
        rfc: formData.rfc
      //}
    })
      .then(response => {  

        if (Array.isArray(response.data)) {
   
         } else if (typeof response.data === 'object' && response.data !== null) {

          console.log(response.data);
         
            updateUser({
            tipo_persona: 'Fisica',
            nombre_persona: response.data.nombre + ' ' + response.data.primer_apellido + ' ' + response.data.segundo_apellido,
            rol_persona: 'contribuyente',
            rfc: response.data.rfc
          });
      
            router.push('/buzon');
         } 
        /*
        console.log(response.data); 
        if(response.data.body=='[]'){
          console.log('vacio');

        }else{
          const objetoUsuario = JSON.parse(response.data.body);
          console.log(objetoUsuario);
          updateUser({
            tipo_persona: 'Fisica',
            nombre_persona: objetoUsuario.nombre + ' ' + objetoUsuario.primer_apellido + ' ' + objetoUsuario.segundo_apellido,
            rol_persona: 'contribuyente',
            rfc: objetoUsuario.rfc
          });
      
            router.push('/buzon');
        }

        */

       })
      .catch(error => {
        console.error('Error en la petición:', error);
      }); 
 

  };


  const closeModal = () => {
    console.log("Cerrando modal..."); // Agrega un console.log
    setShowModal(false);

    
  };

    const router = useRouter();
    const { updateUser } = useUser();


    const comprobacion = async () => {
/*
      //Cambiar estatus documento buzon 
      axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/buzon-tributario/actualizar-pdf', 
      {
     //rfc: "PAVG861126I32",
     identificador:"63ef63f1-7748-49b6-b5f6-c98e8dda177e-1706494101846",
     rfc:"SAGC940106BU3"    })
    .then(response => { 
      console.log(response);

    })
    .catch(error => {
      // Manejar errores de la petición
      console.error('Error en la petición:', error);
      // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
    });


    */
   
 
      //Eliminar representante
      let envioenlace = {
        //body: {
          rfc_representante: 'HEAK921213QU4',
          rfc_representado: 'CPM110719SG3'
        // }
        }
      axios.post(
       // 'https://8k76x7y1fh.execute-api.us-east-1.amazonaws.com/default/representante/eliminar', 
       END_POINT_BACK + "/representante/eliminar",
        envioenlace)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error('Error en la petición inicial:', error);
        });
 

      /*
         //Oficina 

         axios.post( 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/oficinas' , { 
          numero_localidad: 1621,
          catalogo:"OFICINA"
      })
        .then(response => {    
          console.log(response.data);
          })
        .catch(error => {
          console.error('Error en la petición:', error);
        });

       */
/*
 
         //Municipios 

         axios.post( 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/municipios' , { 
          tp_consulta:1
      })
        .then(response => {    
          console.log(response.data);
          })
        .catch(error => {
          console.error('Error en la petición:', error);
        });

        */
 

      /*
 
          //Registro en SAP
         axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/sap/registro', 
         {
           body: {
            persona_tipo:"F",
            oficina:"011",
            tp_persona:"",
            sexo:"1",
            cl_contrib:"0001",
            razon_social:"",
            representante:"",
            nombre:"KARLA",
            paterno:"FUENTE",
            materno:"NOLASCO",
            fec_nacimiento:"1967-12-28",
            rfc:"FUNK671228PH6",
            curp:"FUNK671228HOCNZS00",
            calle:"ALLENDE",
            num_ext:7700,
            num_int:32,
            entre_calle:"GARCIA",
            y_calle:"BERNARDO ARREOLA",
            referencia:"PUERTA AZUL",
            telefono:5558345654,
            celular:5533660182,
            pais:"MX",
            des_pais:"MÉXICO",
            estado:"MCH",
            des_estado:"MICHOACÁN",
            municipio:"000000001621",
            des_municipio:"MORELIA",
            cp:58000,
            localidad:"012154",
            des_localidad:"MORELIA",
            colonia:"00134078",
            des_colonia:"MORELIA CENTRO",
            correo:"karla@gmail.com"
          }
           }
          )
         .then(response => { 
         console.log(response);
   
         })
         .catch(error => {
         // Manejar errores de la petición
         console.error('Error en la petición:', error);
         // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
         });

         */
 
 
/*
         //Validar correo
         axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/validar-correo-vum/', 
         {
           body: {
            correo_electronico: "cesar.santiago@sweettech.io"
          }
           }
          )
         .then(response => { 
         console.log(response);
   
         })
         .catch(error => {
         // Manejar errores de la petición
         console.error('Error en la petición:', error);
         // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
         });

         */

         

         
 
/*
      //Consulta contribuyente
      axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/contribuyente', 
      {
       
          rfc: "AAMN720112FY3",
     
        }
       )
      .then(response => { 
      console.log(response);

      })
      .catch(error => {
      // Manejar errores de la petición
      console.error('Error en la petición:', error);
      // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
      });

      */

 /*
      //Asignar Representante

      
     let envioenlace = {
     // body: {
        representante: "HEAK921213QU4",
      representado: "STE220829BI1"
      //}
       
    }

      axios.post( 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/representante/asignar' , 
      envioenlace)
      .then(response => { 
        console.log(response);
  
          })
          .catch(error => {
              // Manejar errores de la segunda petición Axios
              console.error('Error en la segunda petición:', error);
          });

          */
 
/*
 
    
 
      //Listado Representante
      axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/representante/listar', 
      {
           rfc: "AAMN720112FY3",
         }
       )
      .then(response => { 
      console.log(response);

      })
      .catch(error => {
      // Manejar errores de la petición
      console.error('Error en la petición:', error);
      // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
      });

      */
 

   
 /*
      //Consulta buzon
          axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/buzon-tributario/consultar', 
          {
         //rfc: "PAVG861126I32",
         rfc: "RUGE9807196Q1"
        })
        .then(response => { 
          console.log(response);
  
        })
        .catch(error => {
          // Manejar errores de la petición
          console.error('Error en la petición:', error);
          // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
        });

        */
 
 
 
/*
 
     // Registro fisica

    
  
      let formDatainicial = {
         
          persona_tipo: "F",
          rfc: "SAGC940106BU3" ,
          curp: "SAGC940106HOCNZS00",
          interlocutor_comercial:"1001865830",
          numero_tramite:"0000554441",
          nombre: "CESAR",
          primer_apellido: "SANTIAGO",
          segundo_apellido: "GUZMAN", 
          correo_electronico: "csantiago@ehre-evolution.com",
          telefono_celular: "9515932305",
          telefono_residencial: "9515932305",
          razon_social:"",
          fecha_ultima_conexion:"",
          fecha_creacion:"",
          fecha_modificacion:"",
          contrasenia:"",
          estatus:"ACEPTADO",
          activo:true,
          usuario_modifica:"",
          validado_correo:true,
          validado_telefono:true,
          validado_llave:true,
          validado_vum:true, 
          validado_sap:true,
          observaciones:""
          
      };
  
   
  
      axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/contribuyente/registro', formDatainicial)
        .then(response => { 
          console.log(response);
  
        })
        .catch(error => {
          // Manejar errores de la petición
          console.error('Error en la petición:', error);
          // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
        });


        */
 
/*

// Registro Moral

    
  
let formDatainicial = {
         
  persona_tipo: "F",
  rfc: "STE220829BI0" ,
  interlocutor_comercial:"1001865777",
  numero_tramite:"0000554777",
  razon_social: "SWEET TECH",
  correo_electronico: "saguz@gmail.com",
  telefono_celular: "9515932777",
  telefono_residencial: "9515932777",
  fecha_ultima_conexion:"",
  fecha_creacion:"",
  fecha_modificacion:"",
  contrasenia:"",
  estatus:"ACEPTADO",
  activo:true,
  usuario_modifica:"",
  validado_correo:true,
  validado_telefono:true,
  validado_llave:true,
  validado_vum:true, 
  validado_sap:true,
  observaciones:""
  
};



axios.post('https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/contribuyente/registro', formDatainicial)
.then(response => { 
  console.log(response);

})
.catch(error => {
  // Manejar errores de la petición
  console.error('Error en la petición:', error);
  // Aquí puedes mostrar un mensaje de error o realizar otras acciones según el error
});

 */

      /*
      //Direccion 

      axios.post( 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/direccion' , { 
              tp_consulta: 3,
              municipio: 1479,
              cp: 61600,
              localidad: 14048,
              colonia: ""
            })
              .then(response => {    
                console.log(response.data); 
              })
              .catch(error => {
                console.error('Error en la petición:', error);
              });

              */

              /*
 

      //Colonias 

      axios.post( 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/colonias' , { 
          tp_consulta:4,
          municipio:1479,
          cp:61600,
          localidad:14048,
          colonia :""
      })
        .then(response => {    
          console.log(response.data);
          })
        .catch(error => {
          console.error('Error en la petición:', error);
        });

      

      //Codigo Postal 

      axios.post( 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/Stage/sap/cp' , { 
        tp_consulta: 3,
        municipio: 1479,
        cp: 61600,
        localidad: 14048,
        colonia: ""
      })
        .then(response => {    
          console.log(response);
         })
        .catch(error => {
          console.error('Error en la petición:', error);
        });

        */
 
    }

    const enlaceusuarionuevo = async () => {

         router.push('/llaveregistro');

    
    }


    const abrirModalRFC = async () => {

      setShowModal(true);  

    
    }

    const enlaceusuariosregistrado = async () => {

       axios.post(
        //'https://8k76x7y1fh.execute-api.us-east-1.amazonaws.com/default/contribuyente'
        END_POINT_BACK + "/contribuyente", {
       // body: {
          rfc: 'SAGC940106BU3'
       // }
      })
        .then(response => {   
          if(response.data.body=='[]'){
            console.log('vacio');

          }else{
            const objetoUsuario = JSON.parse(response.data.body);
            console.log(objetoUsuario);
            updateUser({
              tipo_persona: 'Fisica',
              nombre_persona: objetoUsuario.nombre + ' ' + objetoUsuario.primer_apellido + ' ' + objetoUsuario.segundo_apellido,
              rol_persona: 'contribuyente',
              rfc: objetoUsuario.rfc
            });
        
              router.push('/buzon');
          }

         })
        .catch(error => {
          console.error('Error en la petición:', error);
        });
 
      /*
      updateUser({
        tipo_persona: 'Fisica',
        nombre_persona: 'Cesar Santiago Guzman',
        rol_persona: 'contribuyente',
      });
  
        router.push('/buzon');

        */

    
    }
    const dotStyle = { backgroundColor: 'rgb(25, 70, 187)' };

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };

    
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',

    minHeight: '100vh',
    overflow: 'hidden', // Deshabilita el scroll
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black' 

  };

  const contentContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }; 


  return (
    <div style={containerStyle}>
      <Header />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}  />
      <div style={contentContainerStyle}>

      <div className="min-h-screen">
        <div className="container">
          <div className={`card margin-top-3 ${isDarkMode ? 'dark-mode-card' : ''}`}>
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <div className="d-flex justify-content-center w-100 width-form">
                <div className="row width-form-content">
                   
                <h2 style={{ textAlign: 'center', marginTop: '10%' }}>Obteniendo información de llave</h2>
                <div className="dottedloader dottedloader--re">
                  <div className="dottedloader_dot" style={dotStyle}></div>
                  <div className="dottedloader_dot" style={dotStyle}></div>
                  <div className="dottedloader_dot" style={dotStyle}></div>
                </div>
                <div className="row col-12">
                  <div className="col-sm-12 col-md-6 my-2 text-center mx-auto">
                    <div className="center-container">
                      <Button
                        onClick={enlaceusuarionuevo}
                        text="Caso nuevo registro"
                        customStyle={{ width: '240px'}}
                        className="cta cta--guinda guinda margin-top-10"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 my-2 text-center mx-auto  ">
                    <div className="center-container ">
                      <Button
                        onClick={abrirModalRFC}
                        text="Usuario registrado"
                        customStyle={{ width: '240px'}}
                        className="cta cta--guinda guinda margin-top-10"
                      />
                    </div>
                  </div>

                  
                </div>
                 

                   
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <ModalRFCLlave
            show={showModal}
            onHide={closeModal}
            formData={formData}
            handleComprobar={handleComprobar}
          />
      </div>

      <Footer />
 
    </div>
  );
}