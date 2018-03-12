import _ from 'lodash';
import React from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAz1l8b2aG0Cq6QJ7EUsnvXLs4HvPRbGGo';

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('nannaku prematho')
	}

	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {

		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
				videos={this.state.videos} />
			</div>
		);
	}
}

ReactDom.render(<App />, document.querySelector('.container'));