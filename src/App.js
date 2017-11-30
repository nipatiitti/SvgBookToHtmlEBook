import React, { Component } from 'react';
import './App.css';
import Slider from 'react-slick';
import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';
import FaAngleDoubleUp from 'react-icons/lib/fa/angle-double-up';


class App extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	imageLeft: null,
				imageRight: null,
	    	indexLeft: 1,
				indexRight: 1,
				valueLeft: "",
				valueRight: "",
	    	list: null,

				left: true,
				height: 500,

				hidden: false,

	    };
	  }

	componentDidMount() {
		this.getFolder();
		this.setState({
			height: this.refs.container.offsetHeight
		});
	}

	getFolder() {
		const images = this.importAll(require.context('./pages', false, /\.(svg)$/));

		let list = [];
  	for (let i = 1; i <= Object.keys(images).length; i++) {
  			let element = {key: i.toString() + ".svg", photo: images[(i).toString() + ".svg"]};
  			list.push(element);
  	}

  		this.setState({
  			list: list,
  		})
	}

	importAll(r) {
	 	let images = [];
	 	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	 	this.setState({
	 		imageLeft: images["1.svg"],
			imageRight: images["2.svg"],
	 	});
	 	return images;
	}

	change(left) {
		this.setState({
			left
		});

		this.refs.slider.slickGoTo(left ? this.state.indexLeft : this.state.indexRight)

	}

	gotoPage(number) {
		if (number <= this.state.list.length && number >= 0) {
			if(this.state.left) {
				this.setState({
					imageLeft: this.state.list[number].photo,
					indexLeft: number
				});
			} else {
				this.setState({
					imageRight: this.state.list[number].photo,
					indexRight: number
				})
			}
			this.refs.slider.slickGoTo(number);
		} else {
			alert("Can't get page. Max is " + this.state.list.length);
		}
	}

	inputChange(e) {
		if(this.state.left) {
			this.setState({
				valueLeft: e.target.value,
		  });
		} else {
			this.setState({
				valueRight: e.target.value,
		  })
	  }
	}

	handleKeyPress(e) {
    if (e.key === 'Enter') {
			if(this.state.left) {
				this.gotoPage(this.state.valueLeft-1);
			} else {
				this.gotoPage(this.state.valueRight-1);
		  }
    }
  }

	hide() {
		this.setState({
			hidden: !this.state.hidden
		})
	}

	render() {

  	var listItems = this.state.list ? this.state.list.map((image, index) =>
				<div key={index.toString()}>
					<div className="sliderItem">
						<div className="itemHeader">
							<p>{"s. " + (index+1).toString()}</p>
						</div>
					</div>
				</div>

			) : [];

		let settings = {
			centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 15,
      speed: 500,
			swipeToSlide: true,
			focusOnSelect: true,
			accessibility: true,
		};

    return (
    	<div className="App">
				<div className="container">
					<div className="container row" ref="container">
						<div onClick={() => this.change(true)} className={this.state.left ? "half selected" : "half"}>
							<input
								onClick={() => this.change(true)}
								value={this.state.valueLeft}
								className="input" type="number"
								onKeyPress={(e) => this.handleKeyPress(e)}
								onChange={(e) => this.inputChange(e)}
								placeholder="Go to page..."/>
							<img
								onClick={() => this.change(true)}
								src={this.state.imageLeft}
								alt={"left"}
							/>
						</div>
						<div onClick={() => this.change(false)} className={!this.state.left ? "half selected" : "half"}>
							<input
								onClick={() => this.change(false)}
								value={this.state.valueRight}
								className="input" type="number"
								onKeyPress={(e) => this.handleKeyPress(e)}
								onChange={(e) => this.inputChange(e)}
								placeholder="Go to page..."/>
							<img
								onClick={() => this.change(false)}
								src={this.state.imageRight}
								alt={"right"}
							/>
						</div>
					</div>
					<div id="sliderContainer" >
						<Slider ref="slider" {...settings} afterChange={(index) => this.gotoPage(index)}>
							{listItems}
					  </Slider>
	      	</div>
				</div>
			</div>
    );
  }
}

export default App;
