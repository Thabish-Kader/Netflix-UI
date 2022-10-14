import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";
import { MdPlaylistAddCheck } from "react-icons/md";

export const MyShows = () => {
	const { user } = useContext(AuthContext);
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			setMovies(doc.data()?.myShows);
		});
	}, [user?.email]);

	const removeMovie = async (id) => {
		const filterMovie = movies.filter((movie) => movie.id !== id);

		await updateDoc(doc(db, "users", `${user?.email}`), {
			myShows: filterMovie,
		}).catch((err) => console.log(err.message));
	};
	return (
		<section className="relative h-screen w-full">
			<img
				className="hidden w-full object-cover sm:block md:h-[550px]"
				src="https://assets.nflxext.com/ffe/siteui/vlv3/afc06103-4d6a-4236-b496-34b671a7e9ba/731245a2-6310-482d-8f21-690865bc9112/OM-en-20221003-popsignuptwoweeks-perspective_alpha_website_small.jpg"
				alt="bg img"
			/>
			<h1 className="pt-20 text-xl font-bold sm:pt-4 sm:text-4xl ">
				My Shows
			</h1>
			<div className="sm:grid-cols-2 md:grid-cols-3 lg:flex">
				{movies?.map((item, id) => (
					<div
						key={id}
						className="relative inline-block w-[290px] cursor-pointer px-2 duration-75 hover:z-10 hover:scale-110 sm:w-[300px] md:w-[340px] lg:w-[380px]"
					>
						<img
							className="block h-auto w-full"
							src={`https://image.tmdb.org/t/p/w500/${item?.poster}`}
							alt={item?.title}
						/>

						<div className="absolute top-0 left-0 h-full w-full text-white opacity-0 hover:bg-black/80 hover:opacity-100 ">
							<p className="white-space-normal flex h-full items-center justify-center text-center text-xs font-bold md:text-sm">
								{item?.title}
							</p>
							<p onClick={() => removeMovie(item.id)}>
								<MdPlaylistAddCheck
									className="absolute top-5 left-5 z-30 cursor-pointer hover:text-white"
									size={30}
								/>
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
