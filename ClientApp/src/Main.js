import { useEffect, useState } from "react";
import axios from "axios";
import { AddProduct } from "./AddProduct";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import InfoProduct from "./InfoProduct";
import { render } from "react-dom";

const Main = () => {
    /**
     * Главный компонент с отображение всех продуктов
     * 
     */
    const [products, setProducts] = useState([]);
    const [isNotWorkingTime, setIsNotWorkingTime] = useState(false);
    const navigate = useNavigate();

    const handleClickAdd = (event) => {
        navigate('/add', { replace: true });
    }
    const deleteProduct = (id) => {
        axios.delete(`http://localhost:5178/api/products/${id}`).then((response) => { console.log("deleted") })
        window.location.reload()
    }
    //Получаем данные с сервера
    useEffect(() => {
        axios.get(`http://localhost:5178/api/products/`).then((response) => {
            setProducts(response.data);
        }).catch(error => {if (error.code == 'ERR_BAD_REQUEST'){setIsNotWorkingTime(true)}});
    }, [])


    if (isNotWorkingTime) {
        return (
            <div className="error">Нерабочее время. Магазин работает с 8 утра до 8 вечера (8:00 - 20:00)</div>
        )
    }
    else {
        return (
            <div className="container">
                <h1>Продукты</h1>
                <button onClick={handleClickAdd}>Добавить продукт</button>

                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-striped">
                            <thead>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Цена</th>
                                <th>Удалить</th>
                                <th>Просмотр</th>
                            </thead>
                            <tbody>
                                {
                                    products.map((item) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td><button onClick={() => deleteProduct(item.id)}>х</button></td>
                                            <td><NavLink to={`/products/${item.id}`}>Инфо</NavLink></td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );
    }

}
export default Main;