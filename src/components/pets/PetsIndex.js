import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

// api function from our api file
import { getAllPets } from '../../api/pets'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object, they're a quick easy way to add focused css properties to our react componenets
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// PetsIndex will make a request to the API for all pets
// once it receives a response, display a card for each pet

const PetsIndex = (props) => {
    const [pets, setPets] = useState(null)
    const [error, setError] = useState(false)

    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our pets from the api when the component mounts
    // empty dependency array means this only runs one time
    useEffect(() => {
        getAllPets()
            .then(res => setPets(res.data.pets))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting pets',
                    message: messages.getPetsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }
    // if no pets loaded yet, display 'loading'
    if (!pets) {
        return <p>Loading...</p>
        // otherwise if there are no pets, display that message
    } else if (pets.length === 0) {
        return <p>No pets yet, go add some!</p>
    }
    
    // once we have an array of pets, loop over them
    // produce one card for every pet
    const petCards = pets.map(pet => (
        <Card key={pet.id} style={{ width: '30%', margin: 5 }}>
            <Card.Header>{pet.fullTitle}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/pets/${pet.id}`} className='btn btn-primary'>View { pet.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the pet cards
    return (
        <div className="container-md" style={cardContainerStyle}>
            { petCards }
        </div>
    )
}

// export our component
export default PetsIndex