import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Main from '../../templates/Main';
import Api from '../../../config/configApi';

import './ListUsers.css'

export default function ListUsers(props) {

    const { state } = useLocation();

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        msg: state ? state.msg : ""
    });

    const listUsers = async () => {
        const headers = {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        await Api.get("/listUsers", headers)
            .then((response) => {
                setData(response.data.users);
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

    const deleteUser = async (idUser) => {
        const headers = {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        await Api.delete(`/deleteUser/${idUser}`, headers)
            .then((response) => {
                setStatus({
                    type: "success",
                    msg: response.data.msg
                });
                listUsers();
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
                    });
                }
            });
    }

    useEffect(() => {
        listUsers();
    }, []);

    return (
        <Main icon="users" title="Usuários" subtitle="Página de listagem de usuários cadastrados no sistema">
            <div className="container">
                <div className="top-listUsers display-4">
                    <h1 className="title-listUsers">Lista de Usuários</h1>
                </div>
                <div className="button-registerUsers">
                    <Link to="/registerUser">
                        <button type="button" class="btn btn-success"><i class="fa fa-user-plus" aria-hidden="true"></i> Cadastrar Usuário</button>
                    </Link>
                </div>
                <div className="status-msg-listUsers">
                    {status.type === "error" ? <span className="msg-error-listUsers">{status.msg}</span> : ""}
                    {status.type === "success" ? <span className="msg-success-listUsers">{status.msg}</span> : ""}
                </div>
                <hr />
                <table class="table table-light table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(user => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/viewuser/${user.id}`}>
                                        <button type="button" class="btn btn-primary btn-sm me-md-2"><i class="fa fa-eye" aria-hidden="true"></i> Visualizar</button>
                                    </Link>
                                    <Link to={`/edituser/${user.id}`}>
                                        <button type="button" class="btn btn-warning btn-sm me-md-2"><i class="fa fa-pencil" aria-hidden="true"></i> Editar</button>
                                    </Link>
                                    <Link to={"#"}>
                                        <button type="button" class="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}><i class="fa fa-trash" aria-hidden="true"></i> Apagar</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Main>
    );
}