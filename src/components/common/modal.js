import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import './styles/modal.scss';

class Modal extends Component {
    constructor() {
        super();
        this.state = { show: false };

        this.transitionDelay = 200;

        this.setShow = this.setShow.bind(this);
        this.keyboardClose = this.keyboardClose.bind(this);
        this.close = this.close.bind(this);
        this.renderContents = this.renderContents.bind(this);
    }

    componentDidMount() {
        if (this.props.show) {
            this.setState({ show: true });
        }
        document.addEventListener('keydown', this.keyboardClose);
    }

    componentDidUpdate(oldProps) {
        if (oldProps.show !== this.props.show) {
            this.setShow(this.props.show);
        }
    }

    componentWillUnmount() {
        if (this.transitionTimeout) {
            clearTimeout(this.transitionTimeout);
        }
        document.removeEventListener('keydown', this.keyboardClose);
    }

    setShow(show) {
        this.setState({ show, transitioning: true });
        this.transitionTimeout = setTimeout(() => { this.setState({ transitioning: false }) }, this.transitionDelay);
    }

    keyboardClose(event) {
        // console.log('keyboardClose', this);
        if (!(this.state.show || this.props.show)) return;
        const { key } = event;
        if (key === 'Escape') this.close();
    }

    close() {
        if (this.props.dismissible === false) return; 
        if (this.props.onClose) this.props.onClose();
    }

    renderContents() {
        const { custom, children, size } = this.props;
        if (custom) {
            return <div className="modal-custom">{children}</div>;
        }

        let modalSize = size ? `modal-${size}` : '';

        return (
            <div className={`modal-dialog ${modalSize}`}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        );
    }

    render() {
        const { portal = true, fade = true, custom, className = '' } = this.props;

        if (!this.renderContents()) return null;

        const wrapperClasses = className.split(' ');
        wrapperClasses.push('modal-wrapper');
        if (portal) {
            wrapperClasses.push('modal-portal');
        } else {
            wrapperClasses.push('modal-inline');
        }
        if (this.state.transitioning) wrapperClasses.push('modal-transitioning');
        if (this.state.show) wrapperClasses.push('modal-open');

        const classes = [];
        classes.push('modal');

        if (fade) classes.push('fade');

        if (this.state.show) classes.push('show');

        const modalWrapper = (
            <div className={wrapperClasses.join(' ')}>
                <div
                    className={classes.join(' ')}
                >
                    {this.renderContents()}
                    <div className="modal-backdrop fade" onClick={this.close} />
                </div>
            </div>
        );

        if (portal) {
            const portalNode = document.getElementById('portal-modal');
            if (!portalNode) return null;
            return createPortal(modalWrapper, portalNode);
        }

        return modalWrapper;
    }
}

Modal.CloseButton = ({ onClose, floating }) => {
    const button = (
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
        </button>
    );
    if (floating) {
        return <div className="floating-close-button">{button}</div>;
    }
    return button;
};

Modal.Header = ({ children, onClose, title }) => (
    <div className="modal-header">
        {title && <h5 className="modal-title">{title}</h5>}
        {onClose && <Modal.CloseButton onClose={onClose} />}
        {children}
    </div>
)

Modal.Body = ({ children, className = "" }) => <div className={`modal-body ${className}`}>{children}</div>;
Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>;

export default Modal;
