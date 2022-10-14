import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	requestMovies,
	requestLatest,
	requestUpcoming,
	requestNowPlaying,
} from "./Request";
import { Row } from "./Row";

export const Movie = () => {
	const [movieList, setMovieList] = useState([]);

	const randomMovie = movieList[Math.floor(Math.random() * movieList.length)];

	useEffect(() => {
		try {
			axios.get(requestMovies).then((response) => {
				setMovieList(response.data.results);
			});
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	return (
		<>
			<div className="h-[550px] w-full">
				<div className="relative top-0 left-0">
					<img
						className="h-[550px] w-full object-cover"
						alt="banner img"
						src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`}
					/>
					<div className="absolute top-0 left-0 h-[550px] w-full bg-gradient-to-r from-black"></div>
					<div className="absolute top-[40%] left-3 flex flex-col justify-center justify-items-center">
						<p className="sm:text-2xl md:text-4xl lg:text-5xl">
							{randomMovie?.title}
						</p>
						<p className="text-gray-400 sm:text-xl md:text-xl">
							{randomMovie?.overview}
						</p>
					</div>
				</div>
			</div>
			<Row id="1" title={"Upcoming"} url={requestUpcoming} />
			<Row id="2" title={"Discover"} url={requestMovies} />
			<Row id="3" title={"Now Playing"} url={requestNowPlaying} />
		</>
	);
};
