import React, { useState, useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { StockAPI } from "../api/api"

import "./Home.css";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const stocks = await StockAPI.read();
        setStocks(stocks);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);


  function renderStocksList(stocks) {
    return (
      <>
        <LinkContainer to="/stocks/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new stock</span>
          </ListGroup.Item>
        </LinkContainer>
        {stocks.map(({ _id, symbol, price, date }) => (
          <LinkContainer key={_id} to={`/stocks/${_id}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {symbol}
              </span>
              <br />
              <span className="text-muted">
                Bought for {price}Ɖ at {new Date(date).toLocaleDateString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }



  function renderLander() {
    return (
      <div className="Home centered">
        <div className="lander">
          <h1>Loxley</h1>
          <p className="text-muted">Like Robinhood, but worse.</p>
        </div>
      </div>
    );
  }

  function renderStocks() {
    return (
      <div className="StockList">
          <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Stocks</h2>
          <ListGroup>{!isLoading && renderStocksList(stocks)}</ListGroup>
        </div>
    );
  }

  return (
    isAuthenticated ? renderStocks() : renderLander()
  );
}