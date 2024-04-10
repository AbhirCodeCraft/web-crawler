import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const OPTIONS = {
    id: 'Search with ID',
    name: 'Search with Name',
    cin: 'Search with CIN',
    email: 'Search with Email'
}

function SearchBar({ setSearchParam }) {
    const [selectedOption, setSelectedOption] = useState('id');
    const [searchText, setSearchText] = useState('');

    const handleParamSelect = (option) => {
        setSelectedOption(option);
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
    }
    
    const handleSearch = () => {
        setSearchParam({selectedOption, searchText});
    }
    
    const handleReset = () => {
        setSearchParam({});
        setSearchText('');
    }

    return (
        <>
            <InputGroup>
                <DropdownButton
                    variant="dark"
                    title={OPTIONS[selectedOption]}
                    id="input-group-dropdown-3"
                >
                {
                    Object.keys(OPTIONS).map((option, i) => <Dropdown.Item key={i} href="#" onClick={() => handleParamSelect(option)}>{OPTIONS[option]}</Dropdown.Item>)
                }
                </DropdownButton>
                <Form.Control aria-label="Text input with 2 dropdown buttons" value={searchText} onChange={handleChange} placeholder='Search for exact value' />
                <Button variant="dark" onClick={()=> handleSearch()}>Search</Button>
                <Button variant="outline-secondary" onClick={()=> handleReset()}>Reset</Button>
            </InputGroup>
        </>
    );
}

export default SearchBar;