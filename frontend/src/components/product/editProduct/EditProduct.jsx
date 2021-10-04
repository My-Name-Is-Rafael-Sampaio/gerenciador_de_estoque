import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Main from '../../templates/Main';
import Api from '../../../config/configApi';

import './EditProduct.css';

export default function EditProduct(props) {

    const [status, setStatus] = useState({
        type: '',
        msg: ''
    });

    const [id] = useState(props.match.params.id);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [inventory, setInventory] = useState("");

    const [valuePurchasePriceTarget, setValuePurchasePriceTarget] = useState();

    const [valueSalePriceTarget, setValueSalePriceTarget] = useState();

    const valuePurchasePrice = async (valuePurchasePriceInput) => {
        let valuePurchasePriceConvert = valuePurchasePriceInput.toString().replace(/\D/g, "");
        valuePurchasePriceConvert = valuePurchasePriceConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valuePurchasePriceConvert = valuePurchasePriceConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");

        setValuePurchasePriceTarget(valuePurchasePriceConvert);

        let purchasePriceRaw = await valuePurchasePriceConvert.replace(".", "");
        purchasePriceRaw = await purchasePriceRaw.replace(",", ".");

        setPurchasePrice(purchasePriceRaw);
    }

    const valueSalePrice = async (valueSalePriceInput) => {
        let valueSalePriceConvert = valueSalePriceInput.toString().replace(/\D/g, "");
        valueSalePriceConvert = valueSalePriceConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valueSalePriceConvert = valueSalePriceConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");

        setValueSalePriceTarget(valueSalePriceConvert);

        let salePriceRaw = await valueSalePriceConvert.replace(".", "");
        salePriceRaw = await salePriceRaw.replace(",", ".");

        setSalePrice(salePriceRaw);
        
    }

    const editProduct = async e => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        await Api.put("/editProduct", { id, name, imageUrl, purchasePrice, salePrice, inventory }, headers)
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
        const getProduct = async () => {
            const headers = {
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            await Api.get(`/viewProduct/${id}`, headers)
                .then((response) => {
                    setName(response.data.product.name);
                    setImageUrl(response.data.product.imageUrl);
                    setPurchasePrice(response.data.product.purchasePrice);
                    setValuePurchasePriceTarget(new Intl.NumberFormat('pt-br', { minimumFractionDigits: 2, currency: 'BRL' }).format(response.data.product.purchasePrice));
                    setSalePrice(response.data.product.salePrice);
                    setValueSalePriceTarget(new Intl.NumberFormat('pt-br', { minimumFractionDigits: 2, currency: 'BRL' }).format(response.data.product.salePrice));
                    setInventory(response.data.product.inventory);
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

        getProduct();
    }, [id]);

    return (
        <Main icon="pencil" title="Editar produto" subtitle="Página de edição de informações do produto">
            <div className="container">
                <div className="top-editProduct display-4">
                    <h1 className="title-editProduct">Preencha o formulário com as novas informações</h1>
                </div>
                <div className="button-backProduct">
                    <Link to="/listProducts">
                        <button type="button" class="btn btn-primary"><i class="fa fa-arrow-left" aria-hidden="true"></i> Voltar</button>
                    </Link>
                </div>
                <div className="status-msg-editProduct">
                    {status.type === 'error' ? <span className="msg-error-registerProduct">{status.msg}</span> : ""}
                    {status.type === 'redirectSuccess' ? <Redirect to={{ pathname: "/listProducts", state: { type: "success", msg: status.msg } }} /> : ""}
                </div>
                <hr />
                <form onSubmit={editProduct}>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputName" class="form-label">Nome do Produto</label>
                                <input type="text" name="name" class="form-control" id="inputName" placeholder="Ex: Caneta" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputImageUrl" class="form-label">Imagem Url do produto</label>
                                <input type="text" name="imageUrl" class="form-control" id="inputImageUrl" placeholder="Ex: https://img.caneta.com.br/caneta.jpg" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputPurchasePrice" class="form-label">Preço de Compra (R$)</label>
                                <input type="text" name="valuePurchasePriceTarget" class="form-control" id="inputPurchasePrice" placeholder="Ex: 5.00" value={valuePurchasePriceTarget} onChange={e => valuePurchasePrice(e.target.value)} required />
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="mb-3">
                                <label for="inputSalePrice" class="form-label">Preço de Venda (R$)</label>
                                <input type="text" name="valueSalePriceTarget" class="form-control" id="inputSalePrice" placeholder="Ex: 7.00" value={valueSalePriceTarget} onChange={e => valueSalePrice(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12">
                            <div class="mb-3">
                                <label for="inputInventory" class="form-label">Quantidade</label>
                                <input type="number" name="inventory" class="form-control" id="inputInventory" placeholder="Ex: 10" value={inventory} onChange={e => setInventory(e.target.value)} required />
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