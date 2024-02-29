import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Repuestos() {
    const [products, setProducts] = useState([])
    const [sells, setSells] = useState([])

    async function getProducts() {
        try {
            let url = 'http://localhost:8080/products/'
            const res = await axios.get(url)
            setProducts(res.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    async function createProduct() {
        try {
            let url = 'http://localhost:8080/products/create'
            let data = {
                "name": "bujiaa",
                "code": "222adddd",
                "price": 11,
                "stock": 51,
                "category": "autos"
            }
            const res = await axios.post(url, data)
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
        finally {
            getProducts()
        }
    }

    async function editProduct(e) {
        let id = e.target.id
        try {
            let url = `http://localhost:8080/products/update/${id}`
            let data = {
                "name": "motor",
                "code": "3321asd",
                "price": 250,
                "stock": "5",
                "category": "motos"
            }
            const res = await axios.put(url, data)
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
        finally {
            getProducts()
        }
    }

    async function deleteProduct(e) {
        let id = e.target.id
        try {
            let url = `http://localhost:8080/products/delete/${id}`
            const res = await axios.delete(url)
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
        finally {
            getProducts()
        }
    }

    async function getSells() {
        try {
            let url = 'http://localhost:8080/sells/'
            const res = await axios.get(url)
            setSells(res.data.sells)
        } catch (error) {
            console.log(error)
        }
    }

    async function createSell() {
        try {
            let url = 'http://localhost:8080/sells/create'
            let data = {
                "products": [
                    {
                        "name": "motor",
                        "code": "3321asd",
                        "price": 250,
                        "stock": 5,
                        "category": "motos"
                    },
                    {
                        "name": "bujia",
                        "code": "222addd",
                        "price": 11,
                        "stock": 51,
                        "category": "autos"
                    }
                ]
            }
            const res = await axios.post(url, data)
            alert(res.data.message)
        } catch (error) {
            console.log(error)
            // response.data.message da el error desde el back
        }
        finally {
            getProducts()
            getSells()
        }
    }

    useEffect(() => {
        getProducts()
        getSells()
    }, [])

    return (
        <main>
            <h3>Productos</h3>
            <button onClick={createProduct}>Crear</button>

            <div>
                {/* HACER TABLA */}
                {
                    products.map((product, i) => {
                        return <div key={i} style={{ display: "flex", gap: "5px" }}>
                            <p>{product.name}</p>
                            <p>{product.code}</p>
                            <p>{product.price}</p>
                            <p>{product.stock}</p>
                            <p>{product.category}</p>
                            <button id={product._id} onClick={editProduct}>Editar</button>
                            <button id={product._id} onClick={deleteProduct}>Borrar</button>
                        </div>
                    })
                }
            </div>

            <h3>Nueva venta</h3>
            <button onClick={createSell}>Crear</button>

            <div>
                {/* HACER TABLA */}
                {
                    sells.map((sell, i) => {
                        return <div key={i} style={{ display: "flex", gap: "5px" }}>
                            {
                                sell.products.map((product, i) => {
                                    return <div key={i} style={{ display: "flex", gap: "5px" }}>
                                        <p>{product.name}</p>
                                        <p>{product.code}</p>
                                        <p>{product.price}</p>
                                        <p>{product.stock}</p>
                                        <p>{product.category}</p>
                                        <p>|</p>
                                    </div>
                                })
                            }
                            <p>{sell.totalValue}</p>
                        </div>
                    })
                }
            </div>
        </main>
    )
}