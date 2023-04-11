import React, { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product'
import './App.css'
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import { IProduct } from './types/product'
import AddproductPage from "../src/pages/admin/AddProduct"
import UpdateProductPage from "../src/pages/admin/UpdateProduct"
import ProductDetailPage from "../src/pages/ProductDetail"
import AdminLayout from './pages/layouts/AdminLayout'
import ProductManagement from "../src/pages/admin/ProductManagement"
import WebsiteLayout from './pages/layouts/WebsiteLayout'
import Signin from './pages/admin/Signin'
import CategoriesPage from './pages/admin/CategoriesPage'
import { getAllCate } from './api/category'
import SignUp from './pages/admin/Signup'
   function App(){
      const onHandleAddsigup = async (Sigup : any) => {
         try {
          const {data} = await signup(Sigup)
        console.log(data)
         } catch (error) {
          console.log("Loi đky")
         }
        }
     
        const onHandleAddsigin = async (Signin : any) => {
         try {
          const {data} = await login(Signin)
          
        console.log(data)
         } catch (error) {
          console.log("Loi đnhap")
         }
        }
    const [products, setProducts] = useState<IProduct[]>([])
    const [categories,setCategories]  = useState([])
    useEffect(() => {
        getAllProduct().then(({data}) => setProducts(data.data.docs))
   },[])
   useEffect(() => {
      getAllCate().then(({data}) => setCategories(data.data))
 },[])

   const onHandleRemove = (id: number) => {
      
      deleteProduct(id).then(() => setProducts(products.filter((item: IProduct) => item._id != id)))
   }

   const onHandleAdd = (product: IProduct) => {
      addProduct (product).then(() => getAllProduct().then(({data}) => setProducts(data.data.docs)))
   }

   const onHandleUpdate = (product:IProduct) => {
      updateProduct(product).then(() => getAllProduct().then(({data}) => setProducts(data.data.docs)))
   }
   
    return(
      <div className='App'>
         <BrowserRouter>
         <Routes>
         <Route path='/' element={<WebsiteLayout/>}>
          <Route index element={<HomePage />} />
          <Route path='products' element={<Product products={products} onRemove={onHandleRemove} />} />
          <Route path='products/:id' element={<ProductDetailPage/>}/>
          <Route path="/login" index element={<Signin/>}/>
          <Route path="/logup" index element={<SignUp/>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
        
            <Route index path='products' element={<ProductManagement products={products} onRemove={onHandleRemove} />} />
            <Route path='products/add' element={<AddproductPage onAdd={onHandleAdd}/>}/>
            <Route path='products/:id/update' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} />
            <Route path='categories' element={<CategoriesPage categories={categories}/>} />

         </Route>
           
        
         </Routes>
         </BrowserRouter>
      </div>
    )
   }


export default App
