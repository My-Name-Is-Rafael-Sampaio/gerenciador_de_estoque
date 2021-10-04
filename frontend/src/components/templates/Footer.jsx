import React from 'react';

import './Footer.css';

export default function Footer(props) {
    return (
        <footer className="footer">
            <span>
                Desenvolvido por <strong><span className="text-danger">Rafalindo</span></strong> com <i className="fa fa-heart text-danger"></i>
            </span>
        </footer>
    );
}