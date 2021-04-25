import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
export default function Cards(props) {
    const { cards } = props
    debugger
    return (
        <div className="row">
            {
                <>
                    {cards.map((item, index) =>
                        <CardDeck key={index}>
                            <Card className="p-3" variant="top" style={{ width: '18rem' }}>
                                {
                                    item.media_type === "image" || item.media_type == undefined ?
                                        <Card.Img variant="top" src={item.url} />
                                        :
                                        <iframe src={item.url}
                                            frameBorder='0'
                                            allow='autoplay; encrypted-media'
                                            allowFullScreen
                                            width="100%"
                                            height="180vh" />
                                }

                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{item.date.split('T')[0] + ', ' + item.hour}</Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>

                    )
                    }
                </>
                // : ""
            }

        </div >
    )
}

// const enhance = connect(
//     // Map redux state to component props
//     ({ firebase: { auth, profile } }) => ({
//         auth,
//         profile
//     })
// )(PrivateArea)


// Cards