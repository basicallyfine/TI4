import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Modal } from '../common';

const MapStringModal = ({ show, onChange, onClose, ...props }) => {
    const [value, setValue] = useState(props.value);
    
    useEffect(() => {
        setValue(props.value);
    }, [props.value])

    return (
        <Modal
            show={show}
            // onClose={onClose}
            size="lg"
        >
            <Modal.Header
                onClose={onClose}
                title="TTS Map string"
            />
            <Modal.Body>
                <textarea
                    className="form-control"
                    onChange={(e) => {
                        setValue((e.target.value || '').replace(/[^\d\s]|^\s+/g, '').replace(/\s+/g, ' '))
                    }}
                    value={value || ''}
                    // style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-dark ml-1" onClick={() => {
                    if (onChange) onChange(value);
                    if (onClose) onClose();
                }}>Save</button>
                <CopyToClipboard text={value}>
                    <button className="btn btn-outline-primary ml-1">Copy</button>
                </CopyToClipboard>
            </Modal.Footer>
        </Modal>
    )
}

export default MapStringModal;