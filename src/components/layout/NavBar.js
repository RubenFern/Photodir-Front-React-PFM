import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { startLogout } from '../redux/actions/auth';
import { Search } from './Search';

import './NavBar.css';

export const NavBar = () => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const { logged, user: { user_name, is_admin } } = useSelector(state => state.auth);

    const logout = () =>
    {
        dispatch(startLogout(history));
    }

    return (
        <>
        <header className="sticky-top bg-header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-header">
                <div className="container">
                    <NavLink className="navbar-brand" exact to="/"><img className="logo" src="/logo.svg" alt="logo.png" /> PhotoDir</NavLink>
                    
                    <div className="d-flex">
                        {(logged && !is_admin) &&  
                        <NavLink to="/home/perfil" className="nav-item nav-link settings-rs">
                            <i className="bi bi-gear-fill text-light"></i>
                        </NavLink>}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>  
                    </div>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Search />
                    {
                        (logged) ? // Condición de si está logueado el usuario
                        <ul className="navbar-nav ms-auto ">
                            {(is_admin) 
                            ?
                            <NavLink to="/panel/usuarios" className="nav-item nav-link" activeClassName="active">
                                <i className="bi bi-people-fill"></i> Usuarios
                            </NavLink>
                            :
                            <NavLink to="/home/favoritas" className="nav-item nav-link" activeClassName="active">
                                <i className="bi bi-images"> </i>
                                Favoritas
                            </NavLink>}
                            <li className="nav-item dropdown mt-2 mt-lg-0">
                                <span className="nav-link dropdown-toggle user" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-circle"></i>
                                    <span> {user_name}</span>
                                </span>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className="text-white">
                                        <span className="dropdown-item text-white">
                                            <button
                                                className="nav-link btn"
                                                onClick={logout}
                                            >
                                                <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                                            </button>
                                        </span>
                                    </li>
                                </ul>
                            </li>
                            
                                {(!is_admin) &&
                                <NavLink to="/home/perfil" className="nav-item nav-link settings">
                                    <i className="bi bi-gear-fill text-light"></i>
                                </NavLink>}
                        </ul>
                        :
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <NavLink to="/login" className="nav-item nav-link">
                                <i className="bi bi-box-arrow-in-right"> </i>
                                Iniciar Sesión
                            </NavLink>
                            <NavLink to="/registro" className="nav-item nav-link">
                                <i className="bi bi-person-plus-fill"> </i>
                                Regístrate
                            </NavLink>
                        </ul>
                    }
                    </div>
                </div>
            </nav>
        </header>
        </>
    )
}
