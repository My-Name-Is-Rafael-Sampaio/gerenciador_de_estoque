import React from 'react';
import { Router } from 'react-router-dom';

import history from '../services/history';
import { AuthProvider } from '../context/authContext';

import Logo from '../components/templates/Logo';
import Nav from '../components/templates/Nav';
import Routes from './Routes';
import Footer from '../components/templates/Footer';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default function App(props) {
    return (
        <div className="app">
            <AuthProvider>
                <Router history={history}>
                    <Logo />
                    <Nav icon_sign_in="sign-in" title_login="Login" icon_sign_out="sign-out" title_logout="Sair" icon_home="home" title_inicio="Home" icon_users="users" title_listUsers="Usuários" icon_list_alt="list-alt" title_listProducts="Produtos" />
                    <Routes />
                    <Footer />
                </Router>
            </AuthProvider>
        </div>
    );
}