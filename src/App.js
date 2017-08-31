import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor () {
    super(...arguments);    

    this.startSearch = this.startSearch.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);

    this.state = {
      searchText: '搞甚麼鬼',
      curImgList: []
    };
    this.page = 1;
  }
  startSearch () {
    const {searchText} = this.state;
    if (searchText === '') return;
    //const url = '/images?q=' + searchText;
    const url = `http://127.0.0.1:4000/img_search?name=柯文哲&page=${this.page++}`;
    $.ajax({
      url: url,
      type: 'GET',
      //dataType: "jsonp",
      //jsonpCallback: "jsonpCallback",
      success: (json) => {
        console.log('success');
        //console.log(json);
        //console.log(this.state);    
        const newImgList = this.state.curImgList.slice();
        newImgList.push(...json);
        this.setState({curImgList: newImgList});
        console.log(newImgList);
      },
      error: function () {
        console.error('Failed');
      }
    });
  }
  onSearchTextChange (event) {
    this.setState({searchText: event.target.value});
  }
  render() {
    const {curImgList} = this.state;
    return (
      <div className="App">
        <div>
          <input type="text" value={this.state.searchText} onChange={this.onSearchTextChange} />
          <button onClick={this.startSearch}>Search</button>
        </div>
        {
          curImgList.map((obj, idx)=>{            
            return (<img src={obj.url} alt={obj.description} title={obj.description} key={idx} style={{width: 400}} />)
          })
        }
      </div>
    );
  }
}

export default App;
