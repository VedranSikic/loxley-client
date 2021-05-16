import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./NewStock.css";

import { AuthAPI } from "../api/auth-api"
import { DataAPI } from "../api/data-api";

export default function NewStock() {
    const [fields, handleFieldChange] = useFormFields({
        symbol: "",
        price: "",
        date: ""
    });
    const history = useHistory();

    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function onLoad() {
            if (!AuthAPI.isAuthenticated()) {
                history.push("/login")
            }
        }

        onLoad();
    }, [userHasAuthenticated, history]);

    function validateForm() {
        return (
            fields.symbol.length > 0 &&
            fields.price.length > 0 &&
            fields.date.length > 0
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await DataAPI.create({
                symbol: fields.symbol,
                price: fields.price,
                date: fields.date,
            });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="NewStock centered">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="symbol" size="lg">
                    <Form.Label>Symbol</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder="Stock's symbol"
                        value={fields.symbol}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="price" size="lg">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={fields.price}
                        placeholder="Stock's price"
                        step="0.01"
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="date" size="lg">
                    <Form.Label>Date purchased</Form.Label>
                    <Form.Control
                        type="date"
                        value={fields.date}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    size="lg"
                    type="submit"
                    variant="success"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Create
                </LoaderButton>
            </Form>
        </div>
    );
}