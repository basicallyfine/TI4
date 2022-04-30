import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class PseudoRand {
    constructor(input) {
        this.values = [
            201,147,76,35,171,144,97,108,44,123,168,163,165,255,84,13,
            117,131,126,112,3,18,58,241,190,56,232,16,86,115,249,79,
            181,143,146,28,204,106,24,80,150,70,176,141,59,213,139,62,
            219,82,228,118,148,55,72,184,170,162,138,214,220,26,127,124,
            230,166,142,69,119,245,203,30,188,233,252,128,155,65,2,221,
            158,64,173,152,103,40,243,202,160,102,41,254,178,37,208,132,
            4,164,159,185,179,183,67,174,145,17,223,250,161,78,187,140,
            74,63,240,210,101,194,89,121,196,66,237,113,5,222,47,42,
            151,32,186,189,51,238,133,87,111,36,93,109,98,236,156,81,
            14,31,91,218,11,1,99,83,212,73,235,135,107,217,9,239,
            110,211,154,92,21,129,120,197,116,207,34,15,48,225,229,10,
            136,242,22,248,68,25,169,114,209,96,6,53,193,253,39,227,
            246,88,130,182,94,224,45,8,153,85,205,60,23,137,77,57,
            215,71,192,226,125,0,105,90,50,33,43,198,180,54,231,104,
            12,157,206,247,100,134,95,20,216,46,199,19,38,61,175,195,
            29,167,244,49,149,172,177,191,122,234,200,7,251,75,27,52
        ];
    }
    next() {
        const v = this.values.shift();
        this.values.push(v);
        return v;
    }
};

const combineBidLists = (input) => {
    const bids = [];
    const matches = input.matchAll(/\w+\)[^@<]*(<{0,1}@.+?>{0,1})\s*\((\d+)\)/gmi);
    
    let matchIdx = 0;
    for (const match of matches) {
        const bid = { user: match[1], points: parseInt(match[2], 10), idx: matchIdx };
        bids.push(bid);
        matchIdx += 1;
    }

    if (bids.length === 0) return '';
    
    const rand = new PseudoRand();
    
    return [
        'Combined bids for draft order:',
        ..._.chain(bids)
        .map(bid => ({ ...bid, rand: rand.next() }))
        .orderBy(['points', 'rand', 'idx'], ['desc', 'asc', 'asc'])
        .map((bid, idx) => `${idx + 1}) ${bid.user} (${bid.points})`)
        .value()
    ].join('\n');
};

const BidDraftCombinator = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const throttled = useRef(_.throttle((newValue) => setOutput(combineBidLists(newValue)), 50))
  
    useEffect(() => throttled.current(input), [input])

    return (
        <div className="container my-2">
            <h2>Combine bid lists</h2>
            <div>
                <textarea
                    className="form-control"
                    placeholder='Copy/paste here from the $bid bot result on discord'
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <div className="mt-1 d-flex flex-row">
                    <button className="btn btn-sm btn-outline-dark ml-auto mr-0" onClick={() => { setInput('') }}>Clear</button>
                </div>
            </div>
            {output.replace(/\s/g) > '' && (
                <div className="card mt-2">
                    <div className="card-body">
                        <pre>{output}</pre>
                        <div className="mt-1 d-flex flex-row">
                            <CopyToClipboard text={output}>
                                <button className="btn btn-sm btn-primary ml-auto mr-0" onClick={() => {}}>Copy</button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BidDraftCombinator;