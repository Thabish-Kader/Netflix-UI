import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

export const SignUp = () => {
	const [collapse, setCollapse] = useState(false);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate("/");
	const { signUp } = useContext(AuthContext);

	const handleSignUp = async () => {
		try {
			await signUp(email, password);
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="h-[100vh] w-full justify-center justify-items-center">
			<img
				className=" relative hidden w-full sm:block md:h-[100vh]"
				src="https://assets.nflxext.com/ffe/siteui/vlv3/afc06103-4d6a-4236-b496-34b671a7e9ba/731245a2-6310-482d-8f21-690865bc9112/OM-en-20221003-popsignuptwoweeks-perspective_alpha_website_small.jpg"
				alt="bg img"
			/>
			<div className="absolute top-0 h-full w-full sm:bg-black/50"></div>
			<div className="absolute top-0 flex h-[100vh] w-full flex-col items-center justify-center">
				<div className="absolute flex h-[660px] flex-col bg-black/70 p-10 sm:w-[480px] lg:w-[580px]">
					<h1 className="mb-4 text-3xl font-bold">Sign Up</h1>
					<input
						className="my-5 h-11 rounded-md bg-[#333] px-2"
						type="email"
						placeholder="Enter Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="my-5 h-11 rounded-md bg-[#333] px-2"
						type="Password"
						placeholder="Enter Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="h-11 rounded-md bg-red-700"
						onClick={handleSignUp}
					>
						Sign Up
					</button>
					<div className="mt-4 flex justify-between text-[#b3b3b3]">
						<div className="flex items-center">
							<input
								className="mr-3 h-4 w-4 rounded"
								id="remember-me"
								type="checkbox"
							/>
							<label htmlFor="remember-me">Remember Me</label>
						</div>
						<a href="https://www.netflix.com/om-en/LoginHelp">
							Need Help ?
						</a>
					</div>
					<div className="mt-16 text-[#b3b3b3]">
						<p>
							Already Have an account ?
							<Link to="/signin" className="ml-1 text-white">
								Sign in
							</Link>
						</p>
						<h3 className="mt-5">
							This page is protected by Google reCAPTCHA to ensure
							you're not a{" "}
							<button
								className="cursor-pointer text-blue-600"
								onClick={() => setCollapse(!collapse)}
							>
								{collapse ? "Hide" : "Learn More"}
							</button>
						</h3>
						<div className={collapse ? "block" : "hidden"}>
							<p className="text-sm">
								The information collected by Google reCAPTCHA is
								subject to the Google Privacy Policy and Terms
								of Service, and is used for providing,
								maintaining, and improving the reCAPTCHA service
								and for general security purposes (it is not
								used for personalized advertising by Google).
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
