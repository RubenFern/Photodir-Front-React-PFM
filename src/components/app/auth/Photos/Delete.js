import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { deletePhoto } from '../../../redux/actions/photo';

export const Delete = ({ uid, image }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const openModal = () =>
    {
        Swal.fire(
        {
            title: '¿Estás seguro de borrar la fotografía?',
            text: 'Se eliminará por completo y no la podrás recuperar. ¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0C6492',
            cancelButtonColor: '#0C9291',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then( (res) =>
        {
            if (res.isConfirmed) 
            {
                // Elimino la imagen si el usuario lo confirmó
                dispatch(deletePhoto({uid, image}));

                // Redirecciono al album
                const { location: { pathname } } = history;
                const path = pathname.split('/');
                history.replace(`/home/${path[2]}`);

                Swal.fire('Eliminado', 'Tu fotografía se ha eliminado', 'success');
            }
        })
    }

    return (
        <button 
            className="btn btn-danger h-75"
            onClick={openModal}
        >
            <i className="bi bi-trash"></i>
        </button>
    )
}
