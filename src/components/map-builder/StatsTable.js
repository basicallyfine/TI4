import React, { useState } from 'react';

const StatsTable = ({  }) => {
    const [showSlice, setShowSlice] = useState(true);
    const [showEquidistant, setShowEquidistant] = useState(true);

    return (
        <table className="table">
            <thead><tr><th>TABLE STUFF</th></tr></thead>
        </table>
    );
}

export default StatsTable;