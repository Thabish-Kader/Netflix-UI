import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { signOut } from "firebase/auth";

export const Navbar = () => {
	const navigate = useNavigate();
	const user = auth.currentUser;

	const handleLogOut = async () => {
		try {
			await signOut(auth);
			navigate("/signin");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="absolute z-50 h-10 w-full">
			<div className="flex flex-row justify-between py-5 px-5">
				<h1 className="text-3xl font-bold text-red-500 sm:text-3xl md:text-4xl lg:text-5xl">
					<Link to="/">Netflix</Link>
				</h1>
				<div className="flex flex-row justify-between">
					{user?.email ? (
						<>
							<Link
								to="myshows"
								className="mr-3  h-10 w-24  cursor-pointer rounded-md border p-2 text-gray-300"
							>
								My Shows
							</Link>

							<button
								className=" h-10 w-20 rounded-md bg-red-600 p-1"
								onClick={handleLogOut}
							>
								Log Out
							</button>
						</>
					) : (
						<>
							<Link
								to="signup"
								className=" mr-3 h-8 w-16 cursor-pointer rounded-md py-1 text-white"
							>
								Sign Up
							</Link>

							<Link
								to="signin"
								className="h-8 w-16 cursor-pointer rounded-md bg-[#e50914] p-1 text-white"
							>
								Sign In
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
