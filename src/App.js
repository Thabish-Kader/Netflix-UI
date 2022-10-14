import { Navbar } from "./components/Navbar";
import { Main } from "./Pages/Main";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { MyShows } from "./Pages/MyShows";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { auth } from "./config/firebase";
function App() {
	return (
		<>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route
						path="/myshows"
						element={
							<ProtectedRoute>
								<MyShows />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</>
	);
}

export default App;
