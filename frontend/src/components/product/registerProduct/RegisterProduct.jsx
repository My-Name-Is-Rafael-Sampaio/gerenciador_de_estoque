import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Main from '../../templates/Main';
import Api from '../../../config/configApi';

import './RegisterProduct.css';

export default function RegisterProduct(props) {

    const [status, setStatus] = useState({
        type: '',
        msg: ''
    });

    const [product, setProduct] = useState({
        name: '',
        imageUrl: '',
        purchasePrice: '',
        salePrice: '',
        inventory: ''
    });

    const valueInput = e => setProduct({ ...product, [e.target.name]: e.target.value });

    const [valuePurchasePriceTarget, setValuePurchasePriceTarget] = useState();

    const [valueSalePriceTarget, setValueSalePriceTarget] = useState();

    const purchasePrice = async e => {
        let valuePurchasePriceInput = e.target.value;

        valuePurchasePriceInput = valuePurchasePriceInput.replace(/\D/g, "");
        valuePurchasePriceInput = valuePurchasePriceInput.replace(/(\d)(\d{2})$/, "$1,$2");
        valuePurchasePriceInput = valuePurchasePriceInput.replace(/(?=(\d{3})+(\D))\B/g, ".");

        setValuePurchasePriceTarget(valuePurchasePriceInput);

        let purchasePriceRaw = await valuePurchasePriceInput.replace(".", "");
        purchasePriceRaw = await purchasePriceRaw.replace(",", ".");

        setProduct({ ...product, purchasePrice: purchasePriceRaw });
    }

    const salePrice = async e => {
        let valueSalePriceInput = e.target.value;

        valueSalePriceInput = valueSalePriceInput.replace(/\D/g, "");
        valueSalePriceInput = valueSalePriceInput.replace(/(\d)(\d{2})$/, "$1,$2");
        valueSalePriceInput = valueSalePriceInput.replace(/(?=(\d{3})+(\D))\B/g, ".");

        setValueSalePriceTarget(valueSalePriceInput);

        let salePriceRaw = await valueSalePriceInput.replace(".", "");
        salePriceRaw = await salePriceRaw.replace(",", ".");

        setProduct({ ...product, salePrice: salePriceRaw });
    }

    const registerProduct = async e => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        await Api.post("/registerProduct", product, headers)
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
        <Main icon="shopping-bag" title="Cadastrar produto" subtitle="Página de cadastro de produto">
            <div className="container">
                <div className="top-registerProduct display-4">
                    <h1 className="title-registerProduct">Preencha o formulário</h1>
                </div>
                <div className="button-backProduct">
                    <Link to="/listProducts">
                        <button type="button" class="btn btn-primary"><i class="fa fa-arrow-left" aria-hidden="true"></i> Voltar</button>
                    </Link>
                </div>
                <div className="status-msg-registerProduct">
                    {status.type === 'error' ? <span className="msg-error-registerProduct">{status.msg}</span> : ""}
                    {status.type === 'success' ? <span className="msg-success-registerProduct">{status.msg}</span> : ""}
                    {status.type === 'redirectSuccess' ? <Redirect to={{ pathname: "/listProducts", state: { type: "success", msg: status.msg } }} /> : ""}
                </div>
                <hr />
                <form onSubmit={registerProduct}>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputName" class="form-label">Nome do Produto</label>
                                <input type="text" name="name" class="form-control" id="inputName" placeholder="Ex: Caneta" onChange={valueInput} required />
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputImageUrl" class="form-label">Imagem Url do Produto</label>
                                <input type="text" name="imageUrl" class="form-control" id="inputImageUrl" placeholder="Ex: https://img.caneta.com.br/caneta.jpg" onChange={valueInput} required />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputPurchasePrice" class="form-label">Preço de Compra (R$)</label>
                                <input type="text" name="valuePurchasePriceTarget" class="form-control" id="inputPurchasePrice" placeholder="Ex: 5.00" value={valuePurchasePriceTarget} onChange={purchasePrice} required />
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputSalePrice" class="form-label">Preço de Venda (R$)</label>
                                <input type="text" name="valueSalePriceTarget" class="form-control" id="inputSalePrice" placeholder="Ex: 10.00" value={valueSalePriceTarget} onChange={salePrice} required />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12">
                            <div class="mb-3">
                                <label for="inputInventory" class="form-label">Quantidade</label>
                                <input type="number" name="inventory" class="form-control" id="inputInventory" placeholder="Ex: 10" onChange={valueInput} required />
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