import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import { useGetCryptosQuery } from '../services/cyptoApi'


const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100
  const {data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm ] = useState('')
  

  useEffect(() => {
    const filteredCoin = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    setCryptos(filteredCoin)

  }, [cryptosList, searchTerm]);

  
  if(isFetching) return 'Loading ...'

  return (
    <>
    {!simplified && (
      <div className='search-crypto'>
      <Input placeholder='search a crypto coin ...' onChange={e => setSearchTerm(e.target.value)} />
      </div>
    )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map(({price, uuid, id, name, marketCap, change, iconUrl, rank}) => (
          <Col key={uuid} className='crypto-card' sx={24} sm={12} lg={6}>
            <Link to={`/crypto/${id}`} >
              <Card title={`${rank}. ${name}`} 
              extra={<img src={iconUrl} className='crypto-image' alt={name} />}
              >
                <p>Price: {millify(price)} </p>               
                <p>Market Cap: {millify(marketCap)}</p>               
                <p>Daily Change: {millify(change)}%</p>               
              </Card>
            </Link>
          </Col>  
        ))}        
      </Row>


    </>
  )
}

export default Cryptocurrencies
