import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Main from '../../templates/Main';
import Api from '../../../config/configApi';
import ImageUserDefault from '../../../assets/images/userDefault.png';

import './ViewUser.css'

export default function ViewUser(props) {

    const [id] = useState(props.match.params.id);
    const [data, setData] = useState("");

    const [status, setStatus] = useState({
        type: '',
        msg: ''
    });

    useEffect(() => {
        const getUser = async () => {
            const headers = {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            await Api.get(`/viewUser/${id}`, headers)
                .then((response) => {
                    setData(response.data.user);
                })
                .catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: "redirectError",
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
        <Main icon="eye" title="Visualizar" subtitle="Página de visualização de informações do usuário">
            <div className="container">
                <div className="top-viewUser display-4">
                    <h1 className="title-viewUser">Informações do usuário</h1>
                </div>
                <div className="button-backAndEditUser">
                    <Link to="/listUsers">
                        <button type="button" class="btn btn-primary"><i class="fa fa-arrow-left" aria-hidden="true"></i> Voltar</button>
                    </Link>
                    <Link to={`/editUser/${data.id}`}>
                        <button type="button" class="btn btn-warning"><i class="fa fa-pencil" aria-hidden="true"></i> Editar</button>
                    </Link>
                </div>
                <div className="status-msg-viewUser">
                    {status.type === 'redirectError' ? <Redirect to={{ pathname: "/listUsers", state: { type: "error", msg: status.msg } }} /> : ""}
                    {status.type === "error" ? <span className="msg-error-viewUser">{status.msg}</span> : ""}
                </div>
                <hr />
                <div class="user-item">
                    <div class="user-item-image d-none d-sm-block">
                        <img src={data.imageUrl ? data.imageUrl : ImageUserDefault} height="150" width="150" alt={data.name} />
                    </div>
                    <div class="user-item-info">
                        <span>{data.name ? `Nome: ${data.name}` : "Nome: ......"}</span>
                        <span>{data.email ? `E-mail: ${data.email}` : "E-mail: ......"}</span>
                    </div>
                </div>
            </div>
        </Main>
    );
}