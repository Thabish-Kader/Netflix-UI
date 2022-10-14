import React, { useState, useEffect } from "react";
import { MdPlaylistAddCheck, MdPlaylistAdd } from "react-icons/md";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const MovieRow = ({ item, id }) => {
	const user = auth.currentUser;
	const [add, setAdd] = useState(true);
	const naviagte = useNavigate();
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			setMovies(doc.data()?.myShows);
		});
	}, [user?.email]);

	const addMovie = async () => {
		if (user) {
			setAdd(!add);

			await updateDoc(doc(db, "users", `${user?.email}`), {
				myShows: arrayUnion({
					id: item?.id,
					title: item?.title,
					poster: item?.backdrop_path,
				}),
			}).catch((err) => console.log(err.message));
		} else {
			alert("Please Sign In");
			naviagte("signin");
		}
	};

	const removeMovie = async (id) => {
		setAdd(!add);
		const filterMovie = movies.filter((movie) => movie.id !== id);

		await updateDoc(doc(db, "users", `${user?.email}`), {
			myShows: filterMovie,
		}).catch((err) => console.log(err.message));
	};

	return (
		<div
			key={id}
			className="relative inline-block w-[290px] cursor-pointer px-2 duration-75 hover:z-10 hover:scale-110 sm:w-[300px] md:w-[340px] lg:w-[380px]"
		>
			<img
				className="block h-auto w-full"
				src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
				alt={item?.title}
			/>

			<div className="absolute top-0 left-0 h-full w-full text-white opacity-0 hover:bg-black/80 hover:opacity-100 ">
				<p className="white-space-normal flex h-full items-center justify-center text-center text-xs font-bold md:text-sm">
					{item?.title}
				</p>
				<p>
					{add ? (
						<MdPlaylistAdd
							className="absolute top-5 left-5 z-30 cursor-pointer hover:text-white"
							size={30}
							onClick={addMovie}
						/>
					) : (
						<MdPlaylistAddCheck
							className="absolute top-5 left-5 z-30 cursor-pointer hover:text-white"
							size={30}
							onClick={() => removeMovie(item?.id)}
						/>
					)}
				</p>
			</div>
		</div>
	);
};
