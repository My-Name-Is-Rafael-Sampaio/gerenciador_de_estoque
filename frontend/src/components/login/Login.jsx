import React, { useState, useContext} from 'react';
import { Redirect } from 'react-router-dom';

import Main from '../templates/Main';
import Api from '../../config/configApi';
import padlock from '../../assets/images/padlock.png';
import { Context } from '../../context/authContext';

import './Login.css'

export default function Login(props) {

    const { signIn }= useContext(Context);

    const [status, setStatus] = useState({
        type: '',
        msg: '',
        loading: false,
    });

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const loginUser = async e => {
        e.preventDefault();

        setStatus({ loading: true });

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        await Api.post("/login", user, headers)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                signIn(true);
                setStatus({ type: 'redirectSuccess', loading: false });
            })
            .catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        msg: err.response.data.msg,
                        loading: false
                    });
                } else {
                    setStatus({
                        type: "error",
                        msg: "Erro tente mais tarde!",
                        loading: false
                    })
                }
            });
    }

    return (
        <Main icon="sign-in" title="Login" subtitle="Página de login do sistema">
            <div class="container">
                <div class="auth-content">
                    <div class="auth-modal">
                        <img src={padlock} width="200" alt="Cadeado" />
                        <div className="auth-title">Login</div>
                        <hr />
                        <div className="status-msg-login">
                            {status.type === 'error' ? <span className="msg-error-login">{status.msg}</span> : ""}
                            {status.type === 'redirectSuccess' ? <Redirect to={{ pathname: "/home" }} /> : ""}
                        </div>
                        <form onSubmit={loginUser}>
                            <div class="row">
                                <label className="label-input" for="inputEmail" class="form-label">Email:</label>
                                <input type="text" name="email" class="form-control" id="inputEmail" placeholder="Digite seu e-mail" onChange={valueInput} required />
                            </div>
                            <div class="row">
                                <label className="label-input" for="inputPassword" class="form-label">Senha:</label>
                                <input type="password" name="password" class="form-control" id="inputPassword" placeholder="Digite sua senha" onChange={valueInput} autoComplete="on" required />
                            </div>
                            <div className="row">
                                {status.loading ? <button className="login-approved" type="button" disabled>Acessando...</button> : <button className="login" type="submit">Entrar</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Main>
    );
}