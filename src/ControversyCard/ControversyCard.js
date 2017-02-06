import React from 'react';
import Bubble from '../Bubble/Bubble';
import Icon from '../Icon/Icon';
import './ControversyCard.scss';
import DeepZoom from '../DeepZoom/DeepZoom';
import Title from '../Title/Title';
import Summary from '../Summary/Summary';

var ControversyCard = React.createClass({
	getInitialState: function() {
		return {
			bubbles: [
				{source: 'bubble0.png', left: '7vw', top: '23vw', width: '24vw', numleft: '20vw', numtop: '4.5vw'},
				{source: 'bubble1.png', left: '6vw', top: '55vw', width: '14vw', numleft: '5.5vw', numtop: '-1vw'},
				{source: 'bubble2.png', left: '21vw', top: '50vw', width: '10vw', numleft: '1vw', numtop: '-0.5vw'},
				{source: 'bubble3.png', left: '37vw', top: '33vw', width: '12vw', numleft: '-1vw', numtop: '3vw'},
				{source: 'bubble4.png', left: '52vw', top: '27vw', width: '16vw', numleft: '14vw', numtop: '6.5vw'},
				{source: 'bubble5.png', left: '70vw', top: '36vw', width: '9vw', numleft: '0vw', numtop: '0vw'},
				{source: 'bubble6.png', left: '69vw', top: '46vw', width: '9vw', numleft: '0.5vw', numtop: '6.5vw'},
				{source: 'bubble7.png', left: '78vw', top: '49vw', width: '16vw', numleft: '11vw', numtop: '0.5vw'}
			],
			spin: [false, false, false, false, false, false, false, false],
			timeouts: [0,0,0,0,0,0,0,0],
			activeBubble: null
		}
	},

	disableSpinBubbleNumbers: function() {
		this.state.timeouts.forEach( (timeout) => {
			clearTimeout(timeout);
		});

		this.setState({
			spin: [false, false, false, false, false, false, false, false],
			timeouts: [0,0,0,0,0,0,0,0]
		});
	},

	spinBubbleNumbers: function() {
		this.disableSpinBubbleNumbers();

		setTimeout(() => {
			this.state.spin.forEach( (el, i) => {
				let newTimeout = setTimeout(() => {
					let newSpinState = [false, false, false, false, false, false, false, false];
					newSpinState[i] = true;

					this.setState({
						spin: newSpinState
					});
				}, (i+1)*1000);

				let timeouts = this.state.timeouts;
				timeouts[i] = newTimeout;

				this.setState({
					timeouts: timeouts
				});
			});

			// Reset the spin state to no spin
			setTimeout(() => {
				this.disableSpinBubbleNumbers();
			}, 9000);
		}, 5000);
	},

	handleBubbleClick: function(index) {
		console.log('clicked bubble ' + index);
		let prevState = this.state.activeBubble;
		console.log('prevState: ' + prevState);

		if (prevState === null) {
			this.setState({activeBubble: index});
		} else if (prevState === index) {
			this.setState({activeBubble: null});
		} else {
			this.setState({activeBubble: index});
		}

		console.log('this.state.activeBubble is now ' + this.state.activeBubble);
	},

	componentDidMount: function() {
		this.spinBubbleNumbers();
	},

	render: function() {
		return (
			<div className="Deep-Zoom-Graphic">
				<DeepZoom
					url={process.env.PUBLIC_URL + "/pyramid_files/"}
					onZoom={this.props.zoomHandler} />

				<Title
					key="left"
					position="Left"
					showOverlay={this.props.showOverlay}>
					Halton<br/>Arp
				</Title>

				<Title
					key="right"
					position="Right"
					showOverlay={this.props.showOverlay}>
					The<br/>Modern<br/>Galileo
				</Title>

				<Summary
					showOverlay={this.props.showOverlay}>
					He Was a Professional Astronomer Who<br/>Began his Career as Edwin Hubble's Assistant / While Compiling a List of Peculiar Galaxies, Arp Discovered that High-Redshift Quasars are Commonly Associated with or Even Connected by Filaments to Lower-Redshift Galaxies / Since the Big Bang Requires that Differences in Redshift Place the Objects at Different Locations, Astronomers Commonly Reject Arp's Claims / But if he is Right, then there Was No Big Bang
				</Summary>

				{ this.state.bubbles.map( (el, i) => 
					<Bubble
						active={this.state.activeBubble === i}
						enterHandler={this.spinBubbleNumbers}
						clickHandler={this.handleBubbleClick}
						key={i}
						left={el.left}
						num={i}
						numleft={el.numleft}
						numtop={el.numtop}
						showOverlay={this.props.showOverlay}
						source={el.source}
						spin={this.state.spin}
						top={el.top}
						width={el.width} />
				)}

				<Icon
					key='9'
					left='78vw'
					showOverlay={this.props.showOverlay}
					top='67vw'
					width='13vw' />
			</div>
		);
	}
});

export default ControversyCard;
