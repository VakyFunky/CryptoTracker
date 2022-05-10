import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined } from '@ant-design/icons';

import './CryptoDetails.scss';
import { Loader } from '../index'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import LineChart from './LineChart';


const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('24h');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery(coinId, timeperiod);
  const cryptoDetails = data?.data?.coin;

  
if (isFetching) return Loader;

  const stats = [
    { title: 'Price to USD:', value: ` $ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank:', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume:', value: ` $ ` + millify(cryptoDetails["24hVolume"]), icon: <ThunderboltOutlined /> },
    { title: 'Market Cap:', value: ` $ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.):', value: ` $ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];


  return (
    <div className='coin-details-container'>
      <div className="page-header">
        <div className='back'><Link to='/'>home</Link> / <Link to='/cryptocurrencies'>cryptocurrencies /</Link> crypto / {cryptoDetails.name}</div>
      </div>
      <div className="coin-heading row">
        <div className='coin-heading-1 row'>
          <img src={cryptoDetails.iconUrl} alt="" />
          <h2>{cryptoDetails.name}</h2>
          <h6>{cryptoDetails.symbol}</h6>
        </div>
        <div className='coin-heading-2 column'>
          <span className='label'>{cryptoDetails.symbol}{cryptoDetails.name} Price</span>
          <div className="row">
            <h2>USD$ {millify(cryptoDetails?.price)}</h2>
          </div>
        </div>
      </div>


      <div className="stats-container">
        <h4>An overwiev showing the stats of {cryptoDetails.name}</h4>
        <div className="stats row">
          <div className="main-stats column">
            {stats.map(({ icon, title, value }) => (
              <p className="coin-stats">
                <span>
                  <span className='coin-icon'>{icon}</span>
                  <span className='coin-title'>{title}</span>
                  </span>
                  <span className='coin-value'><b>{value}</b></span>
                
              </p>
            ))}
          </div>

          <LineChart className='lineChart' coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />

        </div>
      </div>



      <h4>Other Statistics</h4>
      <div className="stats-other">
        <h6 className="under-heading">An overview showing the stats of all cryptocurrencies</h6>
        <div className="other-stats">
          {genericStats.map(({ icon, title, value }) => (
            <div className="coin-stats">
              <span>
              <span className='coin-icon'>{icon}</span>
              <span className='coin-title'>{title}</span>
              </span>
              <span className='coin-value'><b>{value}</b></span>
            </div>
          ))}
        </div>
      </div>

      
      <div id='coin-info' className="row">
        <div className="coin-desc">
        <h3>What is {cryptoDetails.name}</h3>
        {HTMLReactParser(cryptoDetails.description)}
        </div>
        <div className="coin-links">
        <h5>Usefull {cryptoDetails.name} links</h5>
        {cryptoDetails.links.map((link) => (
          <Link className='link' key={`${link.type}_${link.name}`} to={link.url} target='_blank'>
            <span className='link-type'><b>{link.type}</b> - {link.name}</span>
          </Link>
        ))}
      </div>
      </div>

    </div>
  )
}

export default CryptoDetails