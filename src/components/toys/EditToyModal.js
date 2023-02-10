// this toy modal shows up on a ShowToy component
// has the ability to edit individual toys, one at a time
// will need to call the api,
// send a messsage,
// refresh the parent

import { Modal } from 'react-bootstrap'
import { updateToy } from '../../api/toys'
import ToyForm from '../shared/ToyForm'
import { useState } from 'react'
import { updateToySuccess, updateToyFailure } from '../shared/AutoDismissAlert/messages'

const EditToyModal = (props) => {
    const { user, pet, show, handleClose, msgAlert, triggerRefresh } = props

    const [toy, setToy] = useState(props.toy)

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

        updateToy(user, pet.id, toy)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: updateToySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: updateToyFailure,
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
                    heading='Update the toy!'
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditToyModal