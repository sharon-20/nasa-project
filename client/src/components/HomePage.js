import React, { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux'
import NavBarComponent from './NavBarComponent';
import Spinner from 'react-bootstrap/Spinner'
// import getApod from '../services/getApod'

function HomePage(props) {
  const [picture, setPicture] = useState('picture is loading...');
  const token = props.auth.stsTokenManager.accessToken;
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:8080/picture/getApod', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(
        (picture) => picture.json()).then((picture) => {
          // debugger
          setPicture(picture)
        }).catch(err => { return err })
    }
    fetchData();
  }, []);


  // const logout = async () => {
  //   const response = await firebase.logout()
  //   console.log(response)
  // }
  const firebase = useFirebase()
  return (
    <>
      <div>
        <NavBarComponent></NavBarComponent>
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="pFont pl-4 pt-1">picture of the day</h2>
              {
                picture.pictureApi ?
                  picture.pictureApi.media_type === "image" ?
                    <div className="pt-3">
                      <img alt="imageApod" src={picture.pictureApi.url} width="100%" />
                    </div>
                    :
                    <div>
                      <iframe src={picture.pictureApi.url}
                        frameBorder='0'
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        width="100%"
                        height="180vh" />
                    </div>
                  :
                  <>
                    <p className="text-center b">loading...</p>
                    <div className="d-flex justify-content-center">
                      <Spinner animation="border" role="status">
                        <span className="sr-only ">Loading...</span>
                      </Spinner>
                    </div>
                  </>
              }

            </div>
            {picture.pictureApi ?
              <div className="col mt-5">
                <h2 className="pFont">{picture.pictureApi.title}</h2>
                <p className="pFont">{picture.pictureApi.explanation}</p>
              </div> : ""
            }

          </div>
        </div>
      </div>
    </>
  );
};



// {/* <div>
// <div className="container">
//   <div className="row">
//     <div className="col">
//       <h2>picture of the day</h2>

//       {/* <Image src={`${url}`} rounded className=" w-100" /> */}
//     </div>

//     <div className="col mt-5">
//       <h2>{picture.pictureApi.title}</h2>
//       <p>{picture.pictureApi.explanation}</p>
//     </div>

//   </div>
// </div>
// </div> */}


const enhance = connect(
  // Map redux state to component props
  ({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })
)(HomePage)


export default enhance