import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ChangeProduct = ({match}) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [isNotWorkingTime, setIsNotWorkingTime] = useState(false);
    
    const prodId  = useParams().id;
    const navigate = useNavigate(); 



    useEffect(() => {
        axios.get(`http://localhost:5178/api/products/${prodId}`).then((response) => {
            setId(Number(response.data.id));
            setName(response.data.name);
            setDescription(response.data.description);
            setPrice(Number(response.data.price));
        }).
        catch(error => {if (error.code == 'ERR_BAD_REQUEST'){setIsNotWorkingTime(true)}});
    }, [])

    const handleChangeButtonClick = (event) => {
        //TODO
        axios.put(`http://localhost:5178/api/products?id=${prodId}&name=${name}&description=${description}&price=${price}`)
        .then((response) => {
            console.log(response)
        });
        navigate('/', { replace: true });
    }

    const handleClickBack = (event) => {
        navigate('/', { replace: true });
    }
    return(
        <div className="center__form">
             <button onClick={handleClickBack} className='button'>Домой</button>
            <h3>Редактировать продукт  {name}</h3>
            
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">Название</span>
                <input type="text" className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">Описание</span>
                <input type="text" className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">Цена</span>
                <input type="number" className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    
                />
            </div>

            <div className="col-12">
                    <button className="btn btn-primary" onClick={handleChangeButtonClick} >Редактировать</button>
            </div>
        </div>
    )
}

export default ChangeProduct;