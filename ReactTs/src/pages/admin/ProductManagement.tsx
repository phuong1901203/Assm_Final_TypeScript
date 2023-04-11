import React from 'react'
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom'
import { IProduct } from '../../types/product';
const ProductManagement = (porps) => {
  const data = porps.products.map(items => {
    return{
      key: items?._id,
      name: items?.name,
      price: items?.price,
      des: items?.des,
      categoryId:items?.categoryId
    }
  })

  interface IProps {
    products: IProduct[],
    onRemove: (id: number) => void
}
  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image' ,
      render: (image) => <img src={image} alt="" width={200} height={150}/>
  },
    {
      title: 'Mô Tả',
      dataIndex: 'des',
      key: 'des'
    },
    {
      title: 'Danh Mục',
      dataIndex: 'categoryId',
      key: 'categoryId'
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size='middle'>
          <Button type="primary" onClick={()=>porps.onRemove(record.key)}>Remove</Button>
          <Button type="primary"><Link to={`/admin/products/${record.key}/update`}>Update</Link></Button>
        </Space>
      ),
    },
  ];


  return (
    <div>
        <Button type='primary'><Link to={'/admin/products/add'}>Add New Product</Link></Button>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
)
}

export default ProductManagement