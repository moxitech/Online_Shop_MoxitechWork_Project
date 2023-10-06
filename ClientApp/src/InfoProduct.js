import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InfoProduct = ({match}) => {
    const [isNotWorkingTime, setIsNotWorkingTime] = useState(false);
    const [product, setProduct] = useState([]);    
    const prodId = useParams().id;
    const navigate = useNavigate(); 


    useEffect(() => {
        axios.get(`http://localhost:5178/api/products/${prodId}`).then((response) => {
            setProduct(response.data);
        }).catch(error => {if (error.code == 'ERR_BAD_REQUEST'){setIsNotWorkingTime(true)}});
    }, [])
   
    const handleClickBack = (event) => {
        navigate('/', { replace: true });
    }
    const handleClickChange = (event) => {
        navigate(`/products/change/${prodId}`, { replace: false });
    }
    if (isNotWorkingTime) {
        return(<div>Вернись позже! Нерабочее время</div>)
    }
    return(
        <div className="center__form stylist__form">
            <button onClick={handleClickBack} className='button'>Домой</button>
            <button onClick={handleClickChange} className='button'>Редактировать</button>
            <h1 className="center__text">Продукт { product.name }</h1>
            <p >Имя: { product.name }</p>
            <p >Описание: { product.description }</p>
            <p >Цена: { product.price } рублей</p>
        </div>
    )
}

export default InfoProduct;