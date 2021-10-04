import React from 'react';
import { Link } from 'react-router-dom';

export default function NavItensFreeAccess(props) {
    return (
        <React.Fragment>
            <Link to="/home">
                <i className={`fa fa-${props.icon_home}`}></i> {props.title_inicio}
            </Link>
            <Link to="/listUsers">
                <i className={`fa fa-${props.icon_users}`}></i> {props.title_listUsers}
            </Link>
            <Link to="/listProducts">
                <i className={`fa fa-${props.icon_list_alt}`}></i> {props.title_listProducts}
            </Link>
        </React.Fragment>
    );
}