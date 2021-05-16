import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { IndexAPI } from "../api/index-api";
import { AuthAPI} from "../api/auth-api";
import { DataAPI } from "../api/data-api";


import { onError } from "../libs/errorLib";

import "./Stocks.css"

export default function Notes() {
    const { id } = useParams();
    const history = useHistory();
    const [stock, setStock] = useState(null);
    const [comparisonQuotes, setComparisons] = useState([])
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        async function onLoad() {
            if (!AuthAPI.isAuthenticated()) {
                return history.push("/login")
            }

            try {
                // Paralelize this
                const { stock, quote } = await DataAPI.profile(id);
                const nasdaq = await IndexAPI.getNasdaq();
                const snp500 = await IndexAPI.getSnP500();
                const dow = await IndexAPI.getDOW();
                setComparisons([nasdaq, snp500, dow])

                setStock(stock);
                setQuote(quote);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id, history]);

    if (stock) {
        return (
            <div className="Stocks">
                <Card>
                    <Card.Header as="h5">{stock.symbol}</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Bought for {stock.price}Ɖ at {new Date(stock.date).toLocaleDateString()}
                        </Card.Title>
                        {quote &&
                            <div>
                                <span className="font-weight-bold">{quote.price}</span>
                                <span className="text-muted">Ɖ</span>
                                <br />
                                <span className={quote.change > 0 ? "text-success" : "text-danger"}>
                                    {quote.change} ({quote.changePercent}%) {quote.change > 0 ? "↑" : "↓"}
                                </span>
                                <br />
                                <span className="text-muted"> {new Date(quote.latestTradingDay).toLocaleDateString()}
                                </span>
                            </div>
                        }
                        {!quote &&
                            <div>
                                <br />
                                <span className="text-muted">Missing quote data</span>
                            </div>
                        }
                    </Card.Body>
                </Card>
                {comparisonQuotes.map((quote) => (
                    <Card key={quote.symbol} className="mt-3">
                        <Card.Header as="h5">{quote.symbol}</Card.Header>
                        <Card.Body>
                            <span className="font-weight-bold">{quote.price}</span>
                            <span className="text-muted">Ɖ</span>
                            <br />
                            <span className={quote.change > 0 ? "text-success" : "text-danger"}>
                                {quote.change} ({quote.changePercent}%) {quote.change > 0 ? "↑" : "↓"}
                            </span>
                            <br />
                            <span className="text-muted"> {new Date(quote.latestTradingDay).toLocaleDateString()}
                            </span>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        )
    } else {
        return (<div className="Stocks"></div>)
    }
}