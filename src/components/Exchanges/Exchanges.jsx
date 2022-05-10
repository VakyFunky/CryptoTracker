import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';

import './Exchanges.scss'
import { Loader } from '../index'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useGetCryptoExchangesQuery } from '../../services/cryptoExchangesApi';


const Exchanges = () => {

  const { data, isFetching } = useGetCryptoExchangesQuery();
  const exchanges = [];
  const [rank, setRank] = useState(0)
  // data.filter((exchange) =>
  //   exchange.adjusted_rank < 20 && exchange.adjusted_rank != null);

  if (isFetching) return Loader;

  for (let i = 0; i < data.length; i++){
    if (data[i].adjusted_rank <20 && data[i].adjusted_rank != null)
    exchanges.push(data[i])
  }

  exchanges.sort((a, b) => {
  return a.adjusted_rank - b.adjusted_rank;
  });

  console.log(exchanges)

  return (
    <>
    <div className="page-header">
    <div className='back'><Link to='/'>home</Link> / exchanges</div>
        <h2>Coin Exchanges</h2>
        <h6>Top 20 Exchanges</h6>
        <div className='search-crypto'>
          {/* <input className='input' type="text" placeholder='search cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} /> */}
        </div>
      </div>

      <div className='cryptocurrencies'>
        <div className="table">
          <div className='tr row'>
            <div className='rank th'>#</div>
            <div className='name th'>Name</div>
            <div className='change th'>24h Trade Volume</div>
            <div className='marketCap th'>Currencies</div>
          </div>
          {exchanges?.map((exchnge) => (
            <div className='tr row' key={`exchnge${exchnge.id}`}>
              <div className='rank td'>{exchnge.adjusted_rank}</div>
              <div className='nameExchange td'>
                <p>{exchnge.name}</p>
              </div>
              <div className='change td'>$ {millify(exchnge.quotes.USD.adjusted_volume_24h)}</div>
              <div className='marketCap td'>{exchnge.currencies}</div>
            </div>
          ))}
        </div>
      </div>
      



    </>
  )
}

export default Exchanges