import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../Styles/Row.css";
import YouTube from "react-youtube";
import movieTralier from "movie-trailer";
import videoError from "../video-error.png";

const baseUrl = "https://image.tmdb.org/t/p/original/";

const opts = {
	height: "390",
	width: "100%",
	playerVars: {
		autoplay: 1
	}
}

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	const [videoErr, setVideoErr] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData()
	}, [fetchUrl]);

	console.log(movies)

	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl("");
			setVideoErr(false);
		} else {
			console.log(movie)
			movieTralier(movie?.name || movie?.title || movie?.name || movie?.original_name)
				.then((url) => {
					setVideoErr(false);
					const urlParams = new URLSearchParams(new URL(url).search);
					console.log(urlParams, "the url param")
					setTrailerUrl(urlParams.get('v'));
				})
				.catch(err => {
					setVideoErr(true);
				})
		}
	}

	return (	
		<div className="row">
			<h2> {title} </h2>
			<div className="row__posters">
				{
					movies.map((movie) => (
						<img
							key={movie.id}
							onClick={() => handleClick(movie)}
							className={`row__poster ${isLargeRow && "row__posterLarge"}`}
							src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
							alt={movie.name}
						/>
					))
				}
			</div>
			{ trailerUrl ? <YouTube videoId={trailerUrl} opts={opts} /> : console.log("bla") }
			{
				videoErr && (
					<img 
						src={videoError}
						alt=""
						className="row__videoError"
					/>
				)
			}
		</div>
	)
}

export default Row;