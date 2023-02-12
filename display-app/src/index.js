import React from 'react';
import ReactDOM from 'react-dom/client';

var data = {
    "dog1":"https://picsum.photos/id/237/200/300", 
    "dog2":"https://picsum.photos/200/300?grayscale",
    "dog3":"https://picsum.photos/seed/picsum/200/300"
}

var keys = Object.keys(data)

class ShopList extends React.Component {
    render() {
        var grid = [];
        for (let i = 0; i < keys.length; i++) {
            grid.push(
                <Item
                    key={i}
                    name={keys[i]}
                    url={data[keys[i]]}
                />
            );
        }

        return (
        <table className="shoplist">
            <tbody>
                <tr> 
                    <th>Name</th>
                    <th>Image</th>
                </tr>
                {grid}
            </tbody>
        </table>
        );
    }
}

class Item extends React.Component {
    render() {
        return (
            <tr> 
                <td>{this.props.name}</td>
                <td><img src={this.props.url} alt=""></img></td>
            </tr>
        )
    }
}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ShopList 
                name={"test"}
            />);
