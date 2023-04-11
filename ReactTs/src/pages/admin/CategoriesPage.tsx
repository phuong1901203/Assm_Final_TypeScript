import React from 'react'
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom'
type Props = {}

const CategoriesPage = (props: Props) => {
    const data = props.categories.map(items => {
    return{
      key: items?._id,
      name: items?.name
      
    }
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên danh muc',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size='middle'>
          <Button type="primary" >Remove</Button>
          <Button type="primary">Update</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
        <Button type='primary'><Link to={'/admin/products/add'}>Add New Categories</Link></Button>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  )
}

export default CategoriesPage