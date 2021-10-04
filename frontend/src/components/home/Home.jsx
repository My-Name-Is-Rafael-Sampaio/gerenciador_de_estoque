import React from 'react';

import Main from '../templates/Main';
import CarouselImgI from '../../assets/images/cart.png';
import CarouselImgII from '../../assets/images/products.png';
import CarouselImgIII from '../../assets/images/woman_organizing.png';

import './Home.css';

export default function Home(props) {
    return (
        <Main icon="home" title="Dashboard" subtitle="Página inicial do sistema gerenciador de estoque">
            <div className="container">
                <div className="top-home display-4">
                    <h1 className="title-home">Bem-vindo(a) ao nosso mais novo sistema!</h1>
                </div>
                <div id="carouselHome" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselHome" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={CarouselImgI} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={CarouselImgII} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={CarouselImgIII} class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselHome" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Anterior</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselHome" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Próximo</span>
                    </button>
                </div>
            </div>
        </Main>
    );
}