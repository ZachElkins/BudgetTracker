import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import "@cloudscape-design/global-styles/index.css"

const root = ReactDOM.createRoot(document.getElementById('root')!);

document.body.classList.toggle('awsui-dark-mode')
root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);