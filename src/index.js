import React from "react";
import { render } from "react-dom";
import HomePage from './pages/HomePage';

const wrapper = document.getElementById('app');
wrapper && render(<HomePage />, wrapper);
