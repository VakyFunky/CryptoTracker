import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './News.scss';
import { Loader } from '../index'
import { useGetCryptosNewsQuery } from '../../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../../services/cryptoApi';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('crypto')
  const { data: cryptoNews } = useGetCryptosNewsQuery({ newsCategory, count: simplified ? 6 : 12 })
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews) return Loader;


  const handleChange = (e) => {
    setNewsCategory(e.target.value)

  }
  console.log(newsCategory)

  return (
    <>
      {!simplified && (
        <div className="page-header">
          <div className='back'><Link to='/'>home</Link> / news</div>
          <h2>Latest Crypto News</h2>
          <div className='search-crypto'>
            <select
              placeholder='Select a Crypto'
              value={newsCategory}
              onChange={handleChange}
            >
              <option >Select a Crypto</option>
              {data?.data?.coins.map((coin) =>
                <option
                  key={coin.name}
                  value={coin.name}
                >
                  {coin.name}
                </option>)}
            </select>
          </div>
        </div>
      )}

      <div className='section-container'>
        <div className='table'>
          <div className="cards">
            {cryptoNews.articles.map((news) => (
              <Link to={news.link} key={news.published_date}>
                <div className='card' key={news.id}>

                  <img src={news.media} alt="news.name" />
                  <div className="card-content">
                    <div className="card-content-container">
                      <h6>{news.title}</h6>
                      <p>{news.summary.length > 200 ? `${news.summary.substring(0, 200)}...` : news.summary}</p>
                    </div>
                    <div className="provider-container">
                      <p className="provider" >{news.rights}, </p>
                      <span className="provider" > {moment(news.published_date).startOf('ss').fromNow()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default News