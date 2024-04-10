import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'

const DeleteModal = ({ closeModal, data }) => {
    const handleClose = () => closeModal();
    const handleDelete = async() => { 
        try {
            await axios.delete(`http://localhost:3005/clients/${data.id}`);
            closeModal(true);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal 
            show={true}
            onHide={handleClose}
            size="l"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal.Dialog style={{ margin: 0 }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete permanently?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete this record?</p>
                        <p>This action is irreversible</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>No</Button>
                        <Button variant="danger" onClick={() => { handleDelete() }}>Yes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </Modal>
    );
}

export default DeleteModal;