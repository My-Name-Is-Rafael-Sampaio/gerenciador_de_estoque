import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../context/authContext';

import Login from '../components/login/Login';
import Home from '../components/home/Home';
import RegisterUser from '../components/user/registerUser/RegisterUser';
import ListUsers from '../components/user/listUsers/ListUsers';
import ViewUser from '../components/user/viewUser/ViewUser';
import EditUser from '../components/user/editUser/EditUser';
import RegisterProduct from '../components/product/registerProduct/RegisterProduct';
import ListProducts from '../components/product/listProducts/ListProducts';
import ViewProduct from '../components/product/viewProduct/ViewProduct';
import EditProduct from '../components/product/editProduct/EditProduct';

function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated, validadeUser } = useContext(Context);
    
    validadeUser();

    if (isPrivate && !authenticated) {
        return <Redirect to="/login" />
    }

    return <Route {...rest} />
}

export default function Rotas(props) {
    return (
        <Switch>
            <CustomRoute exact path='/login' component={Login} />
            <CustomRoute exact isPrivate path='/home' component={Home} />
            <CustomRoute exact isPrivate path='/registerUser' component={RegisterUser} />
            <CustomRoute exact isPrivate path='/listUsers' component={ListUsers} />
            <CustomRoute exact isPrivate path='/viewUser/:id' component={ViewUser} />
            <CustomRoute exact isPrivate path='/editUser/:id' component={EditUser} />
            <CustomRoute exact isPrivate path='/registerProduct' component={RegisterProduct} />
            <CustomRoute exact isPrivate path='/listProducts' component={ListProducts} />
            <CustomRoute exact isPrivate path='/viewProduct/:id' component={ViewProduct} />
            <CustomRoute exact isPrivate path='/editProduct/:id' component={EditProduct} />
        </Switch>
    );
}