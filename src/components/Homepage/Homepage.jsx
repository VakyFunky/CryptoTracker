import React from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';

import './Homepage.scss';
import { Cryptocurrencies, News, Loader } from '../index'
import { DoubleRightOutlined } from '@ant-design/icons'
import { useGetCryptosQuery } from '../../services/cryptoApi';

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return Loader;

  return (
    <>
      <h1>Global Crypto Stats</h1>

      <div className="statistic">
        <div className="statistic-item">
          <h6>Total Cryptocurrencies: <b>{globalStats.total}</b></h6>
        </div>
        <div className="statistic-item">
          <h6>Total Exchanges: <b>{millify(globalStats.totalExchanges)}</b></h6>
        </div>
        <div className="statistic-item">
          <h6>Total Market Cap: <b>{millify(globalStats.totalMarketCap)}</b></h6>
        </div>
        <div className="statistic-item">
          <h6>Total 24h Volume: <b>{millify(globalStats.total24hVolume)}</b></h6>
        </div>
        <div className="statistic-item">
          <h6>Total Markets: <b>{millify(globalStats.totalMarkets)}</b></h6>
        </div>
      </div>
      <div className="section">
        <div className="row">
        <h2>Top 10 Cryptocurrencies</h2>
        <Link to='/cryptocurrencies' className='btn btn-icon'>Show More<DoubleRightOutlined /></Link>
      </div>
        <Cryptocurrencies simplified />
      </div>

      <div className="section">
        <div className="row">
          <h2>Latest Crypto News</h2>
          <Link to='/news' className='btn btn-icon'>Show More<DoubleRightOutlined /></Link>
        </div>
        <News simplified />
      </div>

    </>
  )
}

export default Homepage