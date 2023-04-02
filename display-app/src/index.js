import React from 'react';
import ReactDOM from 'react-dom/client';

var data = {
  "dog1": "https://picsum.photos/id/237/200/300",
  "dog2": "https://picsum.photos/200/300?grayscale",
  "dog3": "https://picsum.photos/seed/picsum/200/300"
}

var keys = Object.keys(data)

class ShopList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    }
  }

  componentDidMount() {
    fetch("https://api.publicapis.org/entries")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ entries: data.entries });
      },
        (error) => {
          alert(error);
        }
      )
  }

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
      <table className="shop_list">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Image</th>
          </tr>
          {grid}
        </tbody>
        <tbody>
          <tr>
            <th>API</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
          {
            this.state.entries.map((entry, index) =>
              <Entry
                key={index}
                api_name={entry.API}
                description={entry.Description}
                url_link={entry.Link}
              />
            )
          }
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

class Entry extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.api_name}</td>
        <td>{this.props.description}</td>
        <td>{this.props.url_link}</td>
      </tr>
    )
  }
}

// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ShopList
  name={"test_list"}
/>);
