import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	image: null,
	    	index: 0,
	    	list: null,
	    };
	  }

	componentDidMount() {
		const images = this.importAll(require.context('./pages', false, /\.(svg)$/)); 

		var list = []
  		for (var i = 1; i <= Object.keys(images).length; i++) {
  			var element = {key: i.toString() + ".svg", photo: images[i.toString() + ".svg"]};
  			list.push(element);
  		}

  		this.setState({
  			list: list,
  		})

	}

	scrollToTop(scrollDuration) {
	    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
	        if ( window.scrollY != 0 ) {
	            window.scrollBy( 0, scrollStep );
	        }
	        else clearInterval(scrollInterval); 
    	},15);
	}

	importAll(r) {
	 	let images = [];
	 	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	 	this.setState({
	 		image: images["1.svg"],
	 		index: 1,
	 	});
	 	return images;
	}

	gotoPage(number) {
		if (number <= this.state.list.length && number > 0) {
			this.changeState(number-1);
			document.getElementById("number-input").value = "";
		} else {
			alert('Not finded');
			document.getElementById("number-input").value = "";
		}
	}

	changeState(index) {
		this.setState({
			image: this.state.list[index].photo,
			index: index,
		});
		this.scrollToTop(100);
	}

  	render() {

  		var listItems = this.state.list ? this.state.list.map((image, index) =>
		    <li onClick={() => this.changeState(index)} className="list-item link" key={index.toString()}>
		    	<a > s. {image.key.split(".")[0]} </a>
		    </li>
		) : [];

    	return (
      	<div className="App">
      		<div className="half">
      			<div className="top">
      				<input id="number-input" type="number" placeholder="Go to page..."></input>
      				<a className="link" onClick={() => this.gotoPage(document.getElementById("number-input").value)}>GO</a>
      			</div>

      			<u className="base-list" >{listItems}</u>

      		</div>
      		<div className="half" id="left">
	      		<div id="arrows">
	      			<div className="arrow" onClick={() => this.changeState(this.state.index-1)} >{"<"}</div>
	      			<div className="arrow" onClick={() => this.changeState(this.state.index+1)} >{">"}</div>
	      		</div>
      			<img src={this.state.image}  alt="main"/>
      		</div>
      	</div>
    	);
  	}
}

export default App;
