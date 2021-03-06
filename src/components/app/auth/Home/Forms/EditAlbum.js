import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { previewImage } from '../../../../../helpers/previewImage';
import { useCharacter } from '../../../../../hooks/useCharacter';
import { useForm } from '../../../../../hooks/useForm';
import { editAlbum } from '../../../../redux/actions/album';
import { Picture } from '../../components/Picture';
import { DeleteImage } from '../DeleteImage';

export const EditAlbum = ({ closeModal }) => 
{
    const { user: { user_name } } = useSelector(state => state.auth);

    // Recibo los datos del álbum desde el state
    const { modalOpen, data: { name: oldName, image: oldImage, fileImage, description: oldDescription } } = useSelector(state => state.modal);

    // Creo el state para validar los campos del formulario
    const [valid, setvalid] = useState(true);
    const maxCharacters = 180;

    const [state, handleInputChange] = useForm({
        name: oldName,
        description: oldDescription,
    });

    const [image, setimage] = useState(oldImage);
    const { name, description } = state;

    // Hook para contar los caracteres
    const [characters, countCharacters] = useCharacter(description);

    const dispatch = useDispatch();

    const onSubmit = (e) =>
    {
        e.preventDefault();

        // Obligo a escribir el nombre del álbum
        if (name === '')
        {
            setvalid(false);
            return;
        }

        // Compruebo que no use más de 180 caracteres
        if (description.length > 180)
        {
            setvalid(false);
            return;
        }

        // Realizo las peticiones a la API para editar el álbum
        dispatch(editAlbum({user_name, name, description, image, oldName, oldImage}));

        closeModal();
    }


    // Path de la imagen del formulario
    const [path, setpath] = useState(fileImage);

    return (
        (modalOpen) &&
        <form className="form" onSubmit={onSubmit} encType="multipart/formdata">
            <div className="form-group d-flex justify-content-md-around mb-3">
                <div className="upload-image">
                    <button className="button">Editar Imagen</button>
                    <input 
                        type="file"
                        id="image"
                        name="image" 
                        onChange={(e) => previewImage(e, setimage, setpath)}
                    />
                </div>
                <DeleteImage user_name={ user_name } image={ oldImage } album={ oldName } />
            </div>
            
            <div className="form-group centrado">
                <Picture path={path} image={image} />
            </div>

            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name"
                    className={`form-control ${ (!valid && oldName === '') && "is-invalid" } `}
                    placeholder="¿Cómo quieres llamar al álbum?"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />
                <div className="invalid-feedback">
                    El álbum debe tener un nombre
                </div>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="name">Descripción: <small className="small">(Opcional)</small></label>
                <textarea 
                    id="description" 
                    name="description"
                    rows="4"
                    className={`form-control ${ (!valid && description.length > 180) && "is-invalid" } `} 
                    placeholder="Añade una descripción"
                    autoComplete="off"
                    onChange={handleInputChange}
                    onKeyUp={() => countCharacters(description)}
                    value={description}
                >
                </textarea>
                <small className={`${(characters > maxCharacters) && 'text-danger'}`}>{characters} / {maxCharacters} caracteres</small>
                <div className="invalid-feedback">
                    Has superado el límite de {maxCharacters} caracteres
                </div>
            </div>
            <br />
            <button
                type="submit"
                className="btn btn-warning w-100 bg-secondary-color"
            >
                
                <span>Editar</span>
            </button>
        </form>
    )
}
