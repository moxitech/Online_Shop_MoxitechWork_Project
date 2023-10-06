import axios from 'axios';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: 0,
//   });


const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();

    const handleClickBack = (event) => {

        navigate('/', { replace: true });
    }

    

    const addButton = () =>
    {
        axios.post(`http://localhost:5178/api/products/addProduct?name=${name}&description=${description}&price=${price}`)
        .then((response) => {
            console.log(response)
        });
        navigate('/', { replace: true });
    }

    return (
        <div className='add_form'>
            <button onClick={handleClickBack} className='button'>Домой</button>
            <div className='center__form'>
                <h4>Добавить продукт</h4>
                <div className="mb-3">
                    <label className="form-label">Название</label>
                    <input type="text" className="form-control" placeholder="Колбаса" id='otl' onChange={(e) => { setName(e.target.value); }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Описание</label>
                    <input type="text" className="form-control" placeholder="Вкусная колбаса" onChange={(e) => { setDescription(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Цена</label>
                    <input type="number" className="form-control" placeholder="100" onChange={(e) => { setPrice(e.target.value) }} />
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" onClick={addButton}>Добавить</button>
                </div>
            </div>
        </div>
    )

}

export default AddProduct;