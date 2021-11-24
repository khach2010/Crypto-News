import React from 'react'
import { Table, Tag, Space } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cyptoApi'

const Exchanges = () => {
  const {data: cryptosList, isFetching } = useGetCryptosQuery(10)

  // create dataArray = []  1
  // loop through coins => 
  // create list of coin => 
  // coin {}: => index, logo, name, trade Volume, market, change || description
  // push coin to dataArray
  // create [showDescription - setShowDescription]
  // if (showDescription && <div> {description} </>)
  const dataArray = []
  const coins = cryptosList?.data?.coins
  console.log(coins)
 
  for (let i = 0; i < coins?.length; i++) {
    dataArray.push({
      key: i, 
      logo: HTMLReactParser(`<img src="${coins[i].iconUrl}" className='crypto-logo' alt="${coins[i]?.name}" />`),
      exchanges: coins[i]?.name,
      tradeVolume: millify(coins[i]?.volume),
      market: millify(coins[i]?.marketCap),
      price: `$${millify(coins[i].price)}`,
      change: `${coins[i]?.change}%`,
      allTimeHigh: `$${millify(coins[i].allTimeHigh?.price)} - ${moment(coins[i].allTimeHigh?.timestamp).startOf('ss').fromNow()}`,
      circulatingSupply: millify(coins[i].circulatingSupply),
      description: HTMLReactParser(coins[i].description),
    })
  }

  const columns = [
    {
      title: '',
      width: 40,
      dataIndex: 'logo',
      key: 'logo',
    },
    {
      title: 'Crypto Coin',
      width: 110,
      dataIndex: 'exchanges',
      key: 'exchanges',
    },
    {
      title: '24h Volume',
      width: 85,
      dataIndex: 'tradeVolume',
      key: 'tradeVolume',
     
    },
    {
      title: 'Market Cap',
      width: 80,
      dataIndex: 'market',
      key: 'market',
    },
    {
      title: 'Price',
      width: 80,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Change',
      width: 85,
      dataIndex: 'change',
      key: 'change',
    },
    {
      title: 'AllTime High',
      with: 150,
      dataIndex: 'allTimeHigh',
      key: 'allTimeHigh',
    },
    {
      title: 'Circulating Supply',
      dataIndex: 'circulatingSupply',
      key: 'circulatingSupply',
    },
   
  ];

  console.log(dataArray)
  const dataSource = dataArray
  // data array structure
  // const dataSource = [
  //   {
  //     key: '1',
  //     exchanges: 'Mike',
  //     tradeVolume: 32,
  //     market: '32 Downing Street',
  //     change: 8
  //   },
  //   {
  //     key: '2',
  //     exchanges: 'John',
  //     tradeVolume: 42,
  //     market: '42 Downing Street',
  //     change: 17
  //   },
  //   {
  //     key: '3',
  //     exchanges: 'Anna',
  //     tradeVolume: 82,
  //     market: '82 Downing Street',
  //     change: 9
  //   },
  // ];
  
  return (
    <div className='exchanges-table'>
     <Table
     scroll={{ x: 770, y: 300 }}
     dataSource={dataSource} columns={columns}  expandable={{
      expandedRowRender: record => <span style={{ margin: 0 }}>{record.description}</span>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }} />
    </div>
  )
}

export default Exchanges
