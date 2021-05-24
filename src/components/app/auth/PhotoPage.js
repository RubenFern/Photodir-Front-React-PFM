import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { back } from '../../../helpers/back';

import { NavBar } from '../../layout/NavBar';
import { getPhoto } from '../../redux/actions/photo';
import { types } from '../../redux/types/types';
import { Like } from './components/Like';
import { DeleteComponent } from './components/Photos/DeleteComponent';
import { EditComponent } from './components/Photos/EditComponent';
import { FormModal } from './FormModal';

export const PhotoPage = ({ history }) => 
{
    const { photo } = useParams();
    
    const { user: { user_name } } = useSelector(state => state.auth);
    const { uid, title, description, image, creation_date, likes } = useSelector(state => state.photos);
    const reload = useSelector(state => state.reload);

    const dispatch = useDispatch();

    useLayoutEffect(() => 
    {
        // Obtengo los datos de la imagen para no depender de la página anterior y poder recargar los datos al editar  
        dispatch(getPhoto(photo, history));
        console.log('recargaphoto')

        // Finalizo el renderizado desactivando el reload
        return () =>
        {
            dispatch({
                type: types.reloadFalse
            });
        }   
    }, [photo, dispatch, history, reload]);

    return (
        <>
            <NavBar />

            <div className="container">
                <div className="gallery mt-3">
                    <h1 className="title-img container">{title}</h1>
                    <div className="only-item animate__animated animate__fadeIn">
                        <img 
                            className="only-img" 
                            src={`http://localhost:3010/api/upload/photo/${user_name}/${image}`} 
                            alt={image}
                            onClick={() => back(history)}
                        />
                        <Like likes={likes} image={image} />
                    </div>
                    <p className="text-light mt-3 text-justify w-75">
                        {description}
                    </p>
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <div className="h-25">
                        <EditComponent action="Editar" uid={uid} title={title} description={description} image={image} />
                    </div>
                    <div className="h-25 ms-3 mx-5">
                        <DeleteComponent action="Eliminar" uid={uid} image={image} />
                    </div>
                </div>
            </div>
            

            <FormModal tipo="photo" />
        </>
    )
}
