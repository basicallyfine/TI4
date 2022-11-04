import { useState } from 'react';

type Props = {
    onSave: ({ slices, factions }:{ slices: string, factions: string }) => void;
}

const StringInput = ({ onSave }:Props) => {
    const [slices, setSlices] = useState('');
    const [factions, setFactions] = useState('');
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSave({ slices, factions });
            }}
        >
            <textarea className="form-control mb-1" onChange={(e) => { setSlices(e.target.value.trim()) }}/>
            <button type="submit" className="btn btn-primary">Import</button>
        </form>
    )
};

export default StringInput;