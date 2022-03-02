import React from 'react'
import { Table, Row, Col, Collapse, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import Loader from './Loader';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cyptoApi'

const { Panel } = Collapse;
const { Title } = Typography;

const Exchanges = ({simplified}) => {
  const count = simplified ? 10 : 40
  const {data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const coins = cryptosList?.data?.coins
  if (isFetching) return <Loader />
  console.log(coins)

  return (
    <div className='exchanges-table'>
      <Row gutter={[2,2]}>
        <Col span={6} ><Title level={5}>Ranking Coins</Title></Col>
        <Col span={6} ><Title level={5}> Price Volume</Title></Col>
        <Col span={6} ><Title level={5}>Change</Title></Col>
        <Col span={6} ><Title level={5}>Market Cap</Title></Col>
      </Row>
      <Row>
        {coins?.map(({id, rank, iconUrl, symbol, price, marketCap, change, description, allTimeHigh}) => (
          <Col span={24}>
            <Collapse>
            <Panel key={id}  showArrow={false} header={(
              <Row key={id}>
                <Col span={6}>
                  <Row gutter={[6,6]}>
                    <Col> {rank}.</Col>
                    <Col><Avatar className='iconUrl' src={iconUrl}/></Col>
                  </Row>
                  <Row>{symbol}</Row>
                </Col>
                <Col span={6}>
                  <Row>$ {millify(price) }</Row>
                </Col>
                <Col span={6}>
                  <Row>{change}%</Row>
                </Col>
                <Col span={6}>
                 <Row>{millify(marketCap)}</Row>
                </Col>
              </Row>
            )}>
             {!description ? '' : HTMLReactParser(description)}
            </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Exchanges
