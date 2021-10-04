import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Main from '../../templates/Main';
import Api from '../../../config/configApi';

import './ListProducts.css';

export default function ListProducts(props) {

    const { state } = useLocation();

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        msg: state ? state.msg : ""
    });

    const listProducts = async () => {
        const headers = {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        await Api.get("/listProducts", headers)
            .then((response) => {
                setData(response.data.products);
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

    const deleteProduct = async (idProduct) => {
        const headers = {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        await Api.delete(`/deleteProduct/${idProduct}`, headers)
            .then((response) => {
                setStatus({
                    type: "success",
                    msg: response.data.msg
                });
                listProducts();
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
        listProducts();
    }, []);

    return (
        <Main icon="list-alt" title="Produtos" subtitle="Página da listagem dos produtos cadastrados no sistema">
            <div className="container">
                <div className="top-listProducts display-4">
                    <h1 className="title-listProducts">Estoque de Produtos</h1>
                </div>
                <div className="button-registerProducts">
                    <Link to="/registerProduct">
                        <button type="button" class="btn btn-success"><i class="fa fa-plus" aria-hidden="true"></i> Cadastrar Produto</button>
                    </Link>
                </div>
                <div className="status-msg-listProducts">
                    {status.type === "error" ? <span className="msg-error-listProducts">{status.msg}</span> : ""}
                    {status.type === "success" ? <span className="msg-success-listProducts">{status.msg}</span> : ""}
                </div>
                <hr />
                <table class="table table-light table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Peço</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(product => (
                            <tr key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td>{product.name}</td>
                                <td>{new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(product.salePrice)}</td>
                                <td>{`${product.inventory} Unidade(s)`}</td>
                                <td>
                                    <Link to={`/viewProduct/${product.id}`}>
                                        <button type="button" class="btn btn-primary btn-sm me-md-2"><i class="fa fa-eye" aria-hidden="true"></i> Visualizar</button>
                                    </Link>
                                    <Link to={`/editProduct/${product.id}`}>
                                        <button type="button" class="btn btn-warning btn-sm me-md-2"><i class="fa fa-pencil" aria-hidden="true"></i> Editar</button>
                                    </Link>
                                    <Link to={"#"}>
                                        <button type="button" class="btn btn-danger btn-sm" onClick={() => deleteProduct(product.id)}><i class="fa fa-trash" aria-hidden="true"></i> Apagar</button>
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