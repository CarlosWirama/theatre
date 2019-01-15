import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';
import MovieDetailPage from './pages/MovieDetailPage';
import PersonDetailPage from './pages/PersonDetailPage';

function Index() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/search" component={SearchResultPage} />
				<Route path="/movie" component={MovieDetailPage} />
				<Route path="/person" component={PersonDetailPage} />
			</Switch>
		</BrowserRouter>
	);
}

const wrapper = document.getElementById('app');
wrapper && render(<Index />, wrapper);
