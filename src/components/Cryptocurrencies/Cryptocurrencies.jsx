import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';

import './Cryptocurrencies.scss'
import { Loader } from '../index'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useGetCryptosQuery } from '../../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(data?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  if (isFetching) return Loader;

  return (
    <>
      {!simplified && (
        <div className="page-header">
          <div className='back'><Link to='/'>home</Link> / cryptocurrencies</div>
          <h2>Cryptocurrencies</h2>
          <div className='search-crypto'>
            {/* <input className='input' type="text" placeholder='search cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} /> */}
          </div>
        </div>
      )}

      <div className='section-container'>
        <div className="table">
          <div className='thead'>
            <div className='rank th'>#</div>
            <div className='name th'>Name</div>
            <div className='price th'>Price</div>
            <div className='change th'>24h %</div>
            <div className='marketCap th'>Market Cap</div>
          </div>
          {cryptos?.map((currency) => (
            <Link to={`/crypto/${currency.uuid}`} key={`id-${currency.uuid}`}>
              <div className='tr ' key={`currency_${currency.id}`}>
                <div className='rank td' id='rank'>{currency.rank}</div>
                <div className='name td'>
                  <img src={currency.iconUrl} alt={currency.name} className='coinImg' />
                  <p>{currency.name}</p>
                </div>
                <div className='price td'>$ {millify(currency.price)}</div>
                {currency.change > 0 ? (
                  <div className='change green td'>{millify(currency.change)} <CaretUpOutlined /></div>
                ) : (
                  <div className='change red td'>{millify(currency.change)} <CaretDownOutlined /></div>
                )}
                <div className='marketCap td'>{millify(currency.marketCap)}</div>
              </div>
            </Link>

          ))}
        </div>
      </div>
    </>
  )
}

export default Cryptocurrencies