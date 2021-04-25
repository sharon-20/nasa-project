import React, { useState } from 'react'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal'
import NavBarComponent from './NavBarComponent';
import addImg from '../img/photo (1).png'
import Cards from './Cards'
import './PrivateArea.css'
import Spinner from 'react-bootstrap/Spinner'

const PrivateArea = (props) => {
    const [urlInput, setUrleInput] = useState("")
    const [titleInput, setTitleInput] = useState("")
    const [show, setShow] = useState(false);
    const [cards, setCards] = useState(0)
    const token = props.auth.stsTokenManager.accessToken;
    const [load, setLoad] = useState(false);
    const [save, setSave] = useState(false);
    const handleClose = () => {
        setSave(true);
        const token = props.auth.stsTokenManager.accessToken
        var imgData = JSON.stringify({ "title": `${titleInput}`, "url": `${urlInput}` });
        var requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: imgData
        };

        fetch(`http://localhost:8080/upload/uploadImg`, requestOptions)
            .then(
                response => {
                    setShow(false)
                    setSave(false);
                    response.text()
                })
            .catch(error => console.log('error', error));


    };
    function getHistoryApiForUser() {
        setCards(0)
        setLoad(true)
        fetch('http://localhost:8080/picture/getHistoryApiForUser', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(
            (data) => data.json().then((data) => {
                setCards(data.apiHistory)
                setLoad(false)
            }).catch(err => { return err })
        )
    }
    function getMyUploads() {
        setCards(0)
        setLoad(true)
        fetch('http://localhost:8080/upload/getMyUploads', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(
            (data) => data.json().then((data) => {
                setCards(data.uploads)
                setLoad(false)
            }).catch(err => { return err })
        )
    }
    function upLoadImg(event) {
        var fileReader = new FileReader()
        fileReader.onload = ((e) => {
            setUrleInput(e.target.result);
        })
        setUrleInput(fileReader.readAsDataURL(event.target.files[0]))

    }
    return (
        <div >
            <NavBarComponent></NavBarComponent>
            <div className="d-flex justify-content-center">
                {/* <button onClick={getHistoryApiForUser} className="btn btn-primary btnColor">Get My History Api</button> */}
                <Button onClick={getHistoryApiForUser} >Get My History Api</Button>

                <Button onClick={getMyUploads} >Get My Uploads</Button>
            </div>
            <Modal show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br></br>
                    <input type="file" accept="url" onChange={upLoadImg} />
                    <br></br>
                    <div className="input-group mb-3">
                        Enter title:
                        <input type="text" className="form-control mb-3" onChange={(e) => setTitleInput(e.target.value)}></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button secondary="secondary" className="but" onClick={handleClose}>
                        {save === false ?
                            <p>Save Changes</p> :
                            <Spinner animation="border" role="status">
                                <span className="sr-only ">Loading...</span>
                            </Spinner>}
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                {
                    cards ?
                        <Cards cards={cards}></Cards>
                        : ""
                }
            </div>
            {
                load === true ?
                    <>
                        <p className="text-center b">loading...</p>
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only ">Loading...</span>
                            </Spinner>
                        </div>
                    </> : ""
            }

            <img className="addImg" src={addImg} alt="profil user" onClick={() => setShow(true)} />
        </div>
    )
}

const enhance = connect(
    // Map redux state to component props
    ({ firebase: { auth, profile } }) => ({
        auth,
        profile
    })
)(PrivateArea)


export default enhance