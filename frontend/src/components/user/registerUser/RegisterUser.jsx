import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Main from '../../templates/Main';
import Api from '../../../config/configApi';

import './RegisterUser.css'

export default function RegisterUser(props) {

    const [status, setStatus] = useState({
        type: '',
        msg: ''
    });

    const [user, setUser] = useState({
        name: '',
        email: '',
        imageUrl: '',
        password: ''
    });

    const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const registerUser = async e => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        await Api.post("/registerUser", user, headers)
            .then((response) => {
                setStatus({
                    type: 'redirectSuccess',
                    msg: response.data.msg
                });
            })
            .catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        msg: err.response.data.msg
                    });
                } else {
                    setStatus({
                        type: "error",
                        msg: "Erro tente mais tarde!"
                    })
                }
            });
    }


    return (
        <Main icon="user" title="Cadastrar usuário" subtitle="Página de cadastro de usuário no sistema">
            <div className="container">
                <div className="top-registerUser display-4">
                    <h1 className="title-registerUser">Preencha o formulário</h1>
                </div>
                <div className="button-backUser">
                    <Link to="/listUsers">
                        <button type="button" class="btn btn-primary"><i class="fa fa-arrow-left" aria-hidden="true"></i> Voltar</button>
                    </Link>
                </div>
                <div className="status-msg-registerUser">
                    {status.type === 'error' ? <span className="msg-error-registerUser">{status.msg}</span> : ""}
                    {status.type === 'success' ? <span className="msg-success-registerUser">{status.msg}</span> : ""}
                    {status.type === 'redirectSuccess' ? <Redirect to={{ pathname: "/listUsers", state: { type: "success", msg: status.msg } }} /> : ""}
                </div>
                <hr />
                <form onSubmit={registerUser}>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputName" class="form-label">Nome do Usuário</label>
                                <input type="text" name="name" class="form-control" id="inputName" placeholder="Ex: Marcos Pereira Silva" onChange={valueInput} required />
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputImageUrl" class="form-label">Imagem Url do Usuário</label>
                                <input type="text" name="imageUrl" class="form-control" id="inputImageUrl" placeholder="Ex: https://img.marcospereira.com.br/marcospereira.jpg" onChange={valueInput} required />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputEmail" class="form-label">E-mail</label>
                                <input type="text" name="email" class="form-control" id="inputEmail" placeholder="exemplo@gmail.com" onChange={valueInput} required />
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputPassword" class="form-label">Senha</label>
                                <input type="password" name="password" class="form-control" id="inputPassword" placeholder="Digite sua senha" onChange={valueInput} required />
                            </div>
                        </div>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="reset" class="btn btn-dark"><i class="fa fa-ban" aria-hidden="true"></i> Cancelar</button>
                        <button type="submit" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Cadastrar</button>
                    </div>
                </form>
            </div>
        </Main>
    );
}