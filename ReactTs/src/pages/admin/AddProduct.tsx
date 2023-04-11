import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from 'antd';

interface IProduct {
    id: number,
    name: string,
    price: number,
    des:string,
    categoryId:string
}
interface IProduct {
    onAdd: (product: IProduct) => void
}

const AddproductPage = (props: IProduct) => { /// nhận porps từ App.tsx
    const navigate = useNavigate() // khởi tạo navigate để điều hướng
    const { id } = useParams();
    // const {register, handleSubmit} = useForm()
    // const onHandleSubmit = (data) => {
    //     props.onAdd(data);
    //     navigate('/admin/products')
    // }
    const onFinish = (data) => {
        props.onAdd(data);
        navigate('/admin/products');
       
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            {/* <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
                <input type="text" placeholder='Product Name' {...register('name')} />
                <input type="number" {...register('price')} />
                <button type="submit">Add New Product</button>
            </form> */}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: 1000, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label=" Name"
                    name="name"
                    rules={[{ required: true, message: 'Bạn chưa điền tên!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label=" Price"
                    name="price"
                    rules={[{ required: true, message: 'Bạn chưa điền giá!' }]}
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
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default AddproductPage;