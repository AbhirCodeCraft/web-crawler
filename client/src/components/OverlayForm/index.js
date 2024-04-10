import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import './styles.css'
import Alert from '@mui/material/Alert';

const DEFAULT_FORM_VALUES = {company_name:'', company_activity:'', cin:'', registration_date:'', category:'', sub_category:'', company_class:'', roc:'', company_status:'', authorised_capital:'', paidup_capital:'', state:'', pin_code:'', country:'', address:'', email:''}

const OverlayForm = ({ closeModal, data }) => {
    const [formValues, setFormValues] = useState(data || DEFAULT_FORM_VALUES);
    const [outcome, setOutcome] = useState(null);
    
    const handleClose = () => closeModal();
    const handleChange = (e) => {
    const {name, value} = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }))
    }
    const handleSave = async() => {
        try {
            if (data) {
                // Update
                await axios.post(`http://localhost:3005/clients/${data.id}`, formValues);
            } else {
                // Add
                await axios.post('http://localhost:3005/clients', formValues);
            }
            setOutcome('success');
            setTimeout(()=>{
                closeModal(true);
            }, 2000)
        } catch (error) {
            setOutcome(error.response?.data?.error || 'Something went wrong');
        }
    }

    const getContent = () => {
        switch (true) {
            case outcome === 'success': return <Alert severity="success">Operation successfully completed</Alert>
            default: return (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Client details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {outcome && <Alert severity={"error"}>{outcome}</Alert>}
                        <Form>
                            <div className="fieldsWrapper">
                                <div className="formPart">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Client Name*</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'company_name'}
                                            defaultValue={formValues.company_name}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Company Activity</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'company_activity'}
                                            defaultValue={formValues.company_activity}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>CIN</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'cin'}
                                            defaultValue={formValues.cin}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Registration Date</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'registration_date'}
                                            defaultValue={formValues.registration_date}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'category'}
                                            defaultValue={formValues.category}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Sub Category</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'sub_category'}
                                            defaultValue={formValues.sub_category}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Company Class</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'company_class'}
                                            defaultValue={formValues.company_class}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>ROC</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'roc'}
                                            defaultValue={formValues.roc}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="formPart">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Company Status</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'company_status'}
                                            defaultValue={formValues.company_status}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Authorised Capital</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="number"
                                            name={'authorised_capital'}
                                            defaultValue={formValues.authorised_capital}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Paidup Capital</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="number"
                                            name={'paidup_capital'}
                                            defaultValue={formValues.paidup_capital}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'state'}
                                            defaultValue={formValues.state}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Pin Code</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="number"
                                            name={'pin_code'}
                                            defaultValue={formValues.pin_code}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'country'}
                                            defaultValue={formValues.country}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'address'}
                                            defaultValue={formValues.address}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name={'email'}
                                            defaultValue={formValues.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </>
            )
        }
    }
    
    return (
        <>
            <Modal 
            show={true}
            onHide={handleClose}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                {getContent()}
            </Modal>
        </>
    );
}

export default OverlayForm;