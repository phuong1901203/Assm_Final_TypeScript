import React, {useEffect,useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { IProduct } from "../../types/product";
import { Button, Form, Input } from 'antd';

//   const UpdateProductPage = (props) => {
//     const navigate = useNavigate()
//     const {register, handleSubmit, reset} = useForm()
//     const {id} = useParams()  // lấy id từ url
//     useEffect(() => {
//         const currentProduct = props.products.find(item => item.id == id)  // tìm product có id trùng với id trên url
//         reset(currentProduct) // reset lại form với giá trị của product 
//     }, [props])
//     const onHandleSubmit = (data){
//         props.onUpdate(data);
//         navigate('/admin/products')
//     }
//     return (
//         <div>
//             <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
//                 <input type="text" {...register('name')} />
//                 <input type="number" {...register('price')} />
//                 <button type="submit">Update</button>
//             </form>
//         </div>
//     )
//   }
interface IProps{
    products: IProduct[],
    onUpdate:(product: IProduct) => void
}

const UpdateProductPage = ( props: IProps) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [product, setProoduct] = useState<IProduct>() // khởi tạo biến state product có kiểu dữ liệu là IProduct
    useEffect(() => { // khi props thay đổi thì sẽ chạy vào useffect này
        const currentProduct = props.products.find((product:IProduct) => product._id == id)
        // tìm trong mảng props.products có phần tử nào có id trùng với id trên url không
        setProoduct(currentProduct)

    }, [props])
    useEffect(() =>{  // khi biến product thay đổi thì sẽ chạy vào useEffect này
        setFields()  // gọi hàm setFields để set lại giá trị cho các input
    },[product])
    const [form] = Form.useForm();

    const setFields = () => { // hàm này để set lại giá trị cho các input
            form.setFieldsValue({
                id:product?._id,
                name:product?.name,
                price:product?.price,
                des:product?.des,
                categoryId:product?.categoryId
            })
    }

    const onFinish = ( values: any) => {
        props.onUpdate(values);
        navigate('/admin/products')
    };
    return(
        <div>
            <Form form={form} style={{ maxWidth: 600 }} onFinish={onFinish} >
                {/* đoạn này cần truyền cả id vào form khi submit để lấy được giá trị id truyền lên component App */}
                <Form.Item
                    label=""
                    name="id"
                    style={{ display: 'none' }} // ẩn input này đi
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá sản phẩm"
                    name="price"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label=" Image"
                    name="image"
                    rules={[{ required: true, message: 'Bạn chưa chon anh!' }]}
                  
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="des"
                    rules={[{ required: true, message: 'Bạn chưa điền thông tin mô tả !' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Danh mục"
                    name="categoryId"
                    rules={[{ required: true, message: 'Bạn chưa điền thông tin danh mục !' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}


  export default UpdateProductPage