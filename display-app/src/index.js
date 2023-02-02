import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';

class ShopList extends React.Component {
    render() {
        return (
        <div className="shoplist">
            Hello
        </div>
        );
    }
}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ShopList />);
