import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Context } from '../../context/authContext';

import NavItensFreeAccess from './NavItensFreeAccess';

export default function NavItens(props) {
    const { handleLogout } = useContext(Context);

    const logged = localStorage.getItem('token');

    return (
        <React.Fragment>
            {!logged ?
                <Link to="/login">
                    <i className={`fa fa-${props.icon_sign_in}`}></i> {props.title_login}
                </Link>
                :
                ""
            }
            {logged ?
                <NavItensFreeAccess {...props} />
                :
                ""
            }
            {logged ?
                <Link to="#" onClick={handleLogout}>
                    <i className={`fa fa-${props.icon_sign_out}`}></i> {props.title_logout}
                </Link>
                :
                ""
            }
        </React.Fragment>
    );
}