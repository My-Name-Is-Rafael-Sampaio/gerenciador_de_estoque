import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Main from '../../templates/Main';
import Api from '../../../config/configApi';

import './EditUser.css'

export default function EditUser(props) {

    const [status, setStatus] = useState({
        type: '',
        msg: ''
    });

    const [id] = useState(props.match.params.id);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const editUser = async e => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        await Api.put("/editUser", { id, name, imageUrl, email, password }, headers)
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

    useEffect(() => {
        const getUser = async () => {
            const headers = {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            await Api.get(`/viewUser/${id}`, headers)
                .then((response) => {
                    setName(response.data.user.name);
                    setImageUrl(response.data.user.imageUrl);
                    setEmail(response.data.user.email);
                    setPassword(response.data.user.password)
                })
                .catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: "error",
                            msg: err.response.data.msg
                        })
                    } else {
                        setStatus({
                            type: "error",
                            msg: "Erro tente mais tarde!"
                        })
                    }
                });
        }

        getUser();
    }, [id]);

    return (
        <Main icon="pencil" title="Editar usuário" subtitle="Página de edição de informações do usuário">
            <div className="container">
                <div className="top-editUser display-4">
                    <h1 className="title-editUser">Preencha o formulário com as novas informações</h1>
                </div>
                <div className="button-backUser">
                    <Link to="/listUsers">
                        <button type="button" class="btn btn-primary"><i class="fa fa-arrow-left" aria-hidden="true"></i> Voltar</button>
                    </Link>
                </div>
                <div className="status-msg-editUser">
                    {status.type === 'error' ? <span className="msg-error-editUser">{status.msg}</span> : ""}
                    {status.type === 'redirectSuccess' ? <Redirect to={{ pathname: "/listUsers", state: { type: "success", msg: status.msg } }} /> : ""}
                </div>
                <hr />
                <form onSubmit={editUser}>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputName" class="form-label">Nome do Usuário</label>
                                <input type="text" name="name" class="form-control" id="inputName" placeholder="Ex: Marcos Pereira Silva" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputImageUrl" class="form-label">Imagem Url do Usuário</label>
                                <input type="text" name="imageUrl" class="form-control" id="inputImageUrl" placeholder="Ex: https://img.marcospereira.com.br/marcospereira.jpg" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputEmail" class="form-label">E-mail</label>
                                <input type="text" name="email" class="form-control" id="inputEmail" placeholder="exemplo@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputPassword" class="form-label">Senha</label>
                                <input type="password" name="password" class="form-control" id="inputPassword" placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-warning"><i class="fa fa-floppy-o" aria-hidden="true"></i> Salvar</button>
                    </div>
                </form>
            </div>
        </Main>
    );
}