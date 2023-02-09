// this modal is rendered by ShowPet
// the state that controls whether this is open or not lives in ShowPet
// the state and the updater function associated with that state is passed here as a prop
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PetForm from '../shared/PetForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditPetModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updatePet, msgAlert, triggerRefresh } = props

    const [pet, setPet] = useState(props.pet)

    const onChange = (e) => {
        e.persist()
        
        setPet(prevPet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value 

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }

            const updatedPet = {
                [updatedName] : updatedValue
            }

            return {
                ...prevPet, ...updatedPet
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updatePet(user, pet)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: messages.updatePetSuccess,
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh of the show page
            // we'll build a function in the ShowPet component that does this for us, and we'll import that here as a prop
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updatePetFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PetForm
                    pet={pet}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Update Pet'
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPetModal