import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Main from '../../templates/Main';
import Api from '../../../config/configApi';
import ImageProductDefault from '../../../assets/images/productDefault.png';

import './ViewProduct.css';

export default function ViewProduct(props) {

    const [id] = useState(props.match.params.id);
    const [data, setData] = useState("");

    const [status, setStatus] = useState({
        type: '',
        msg: ''
    });



    useEffect(() => {
        const getProduct = async () => {
            const headers = {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            await Api.get(`/viewProduct/${id}`, headers)
                .then((response) => {
                    setData(response.data.product);
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
        getProduct();
    }, [id]);

    return (
        <Main icon="eye" title="Visualizar" subtitle="Página de visualização de iformações do produto">
            <div className="container">
                <div className="top-viewProduct display-4">
                    <h1 className="title-viewProduct">Informações do produto</h1>
                </div>
                <div className="button-backAndEditProduct">
                    <Link to="/listProducts">
                        <button type="button" class="btn btn-primary"><i class="fa fa-arrow-left" aria-hidden="true"></i> Voltar</button>
                    </Link>
                    <Link to={`/editProduct/${data.id}`}>
                        <button type="button" class="btn btn-warning"><i class="fa fa-pencil" aria-hidden="true"></i> Editar</button>
                    </Link>
                </div>
                <div className="status-msg-viewProduct">
                    {status.type === 'redirectError' ? <Redirect to={{ pathname: "/listProducts", state: { type: "error", msg: status.msg } }} /> : ""}
                    {status.type === "error" ? <span className="msg-error-viewProduct">{status.msg}</span> : ""}
                </div>
                <hr />
                <div class="product-item">
                    <div class="product-item-image d-none d-sm-block">
                        <img src={data.imageUrl ? data.imageUrl : ImageProductDefault} height="150" width="150" alt={data.name} />
                    </div>
                    <div class="product-item-info">
                        <span>{data.name ? `Nome: ${data.name}` : "Nome: ......"}</span>
                        <span>{data.purchasePrice ? `Preço de Compra: ${new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(data.purchasePrice)} Reais` : "Preço de Compra: ......"}</span>
                        <span>{data.salePrice ? `Preço de Venda: ${new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(data.salePrice)}` : "Preço de Venda: ......"}</span>
                        <span>{data.inventory ? `Quantidade: ${data.inventory} Unidade(s)` : "Quantidade: ......"}</span>
                    </div>
                </div>
            </div>
        </Main >
    );
}