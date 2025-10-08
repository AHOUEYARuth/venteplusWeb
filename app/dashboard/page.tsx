"use client";
import React from 'react';
import { dashboardStore } from './dashboardStore/dashboardStore';

const dashboard = () => {
    const { name, showProduct } = dashboardStore();
    return (
        <div>
            <h1>Dashboard: {showProduct(name)}</h1>
        </div>
    );
};

export default dashboard;