import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	BsFillArrowRightCircleFill,
	BsFillArrowLeftCircleFill,
} from "react-icons/bs";

import { MovieRow } from "./MovieRow";

export const Row = ({ title, url, id }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		try {
			axios.get(url).then((response) => {
				setMovies(response.data.results);
			});
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	const rightScroll = () => {
		document.getElementById("scroll" + id).scrollLeft -= 550;
	};
	const leftScroll = () => {
		document.getElementById("scroll" + id).scrollLeft += 550;
	};

	return (
		<section className={title} key={id}>
			<h2 className="px-4 font-bold text-white md:text-xl">{title}</h2>
			<div className="relative flex items-center">
				<BsFillArrowLeftCircleFill
					onClick={rightScroll}
					size={50}
					className="absolute left-5 z-50 cursor-pointer text-black/70 hover:text-black"
				/>

				<div
					id={"scroll" + id}
					className="relative h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
				>
					{movies.map((item, id) => (
						<MovieRow key={id} item={item} />
					))}
				</div>
				<BsFillArrowRightCircleFill
					onClick={leftScroll}
					size={50}
					className="absolute right-5 z-50 cursor-pointer text-black/70 hover:text-black"
				/>
			</div>
		</section>
	);
};
