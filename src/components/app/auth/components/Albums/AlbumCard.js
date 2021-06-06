import React from 'react';
import { NavLink } from 'react-router-dom';

import { DeleteComponent } from './DeleteComponent';
import { EditComponent } from './EditComponent';

import './AlbumCard.css';

export const AlbumCard = ({ uid, image, fileImage, name, description, creation_date }) => 
{
    return (
        <li key={uid} className="card">
            <p className="date">{creation_date}</p>
            <NavLink className="card-image" to={`/home/${name}`}>
                <img className="pointer" src={fileImage} alt={fileImage} />
            </NavLink>
            <span className="card-description">
                <h2 className="title text-light">{name}</h2>
                <p className="text-justify">
                    {description}
                </p>
                
                <div className="d-flex justify-content-end w-100 bottom mb-2">
                    <div>
                        <EditComponent image={image} fileImage={fileImage} name={name} description={description} uid={uid} creation_date={creation_date} />
                    </div>
                    <div className="mx-3">
                        <DeleteComponent image={image} fileImage={fileImage} name={name} description={description} uid={uid} creation_date={creation_date} />
                    </div>
                </div>
            </span>
        </li>
    )
}