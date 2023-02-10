import { Modal } from 'react-bootstrap'
import { createToy } from '../../api/toys'
import ToyForm from '../shared/ToyForm'
import { useState } from 'react'
import { createToySuccess, createToyFailure } from '../shared/AutoDismissAlert/messages'

const NewToyModal = (props) => {
    const { user, pet, show, handleClose, msgAlert, triggerRefresh } = props

    const [toy, setToy] = useState({})

    const onChange = (e) => {
        e.persist()
        
        setToy(prevToy => {
            const updatedName = e.target.name
            let updatedValue = e.target.value 

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
                updatedValue = false
            }

            const updatedToy = {
                [updatedName] : updatedValue
            }

            return {
                ...prevToy, ...updatedToy
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createToy(pet.id, toy)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: createToySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createToyFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ToyForm
                    toy={toy}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Give the pet a toy!'
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewToyModal