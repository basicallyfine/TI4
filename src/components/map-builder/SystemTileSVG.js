import React from 'react';

export default ({ children, fill }) => (
    <div className="svg-wrapper">
        <svg xmlns="http://www.w3.org/1999/xlink" viewBox="0 0 515 446" className="system-image svg-border">
            <path d="m 0 223 l 128.75 -223 l 257.5 0 l 128.75 223 l -128.75 223 l -257.5 0 z " fill={fill} />
        </svg>
        {children}
    </div>
);