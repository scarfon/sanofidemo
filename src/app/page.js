"use client";
import {
	Box,
	Button,
	CircularProgress,
	Divider,
	TextField,
	Typography,
} from "@mui/material";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuth } from "../../firebase/auth";
import Image from "next/image";

export default function Home() {
	const { authUser, isLoading } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const [error, setError] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (authUser && !isLoading) {
			router.push("/dashboard");
		}
	}, [authUser, isLoading]);

	const handleSignIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push("/dashboard");
		} catch (error) {
			console.error(error);
			setError(error.message);
		}
	};

	const handleSignUp = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			setError("Conta criada com sucesso!\nFaça login para continuar.");
			setIsLogin(!isLogin);
		} catch (error) {
			console.error(error);
			setError(error.message);
		}
	};

	const loginTeste = async () => {
		try {
			console.log(process.env.NEXT_PUBLIC_EMAIL_TESTE);
			await signInWithEmailAndPassword(
				auth,
				process.env.NEXT_PUBLIC_EMAIL_TESTE,
				process.env.NEXT_PUBLIC_SENHA_TESTE
			);
			router.push("/dashboard");
		} catch (error) {
			console.error(error.message);
			setError(error.message);
		}
	};

	const handleToggle = () => {
		setIsLogin(!isLogin);
	};

	const buttonText = isLogin ? "LOGIN" : "CRIAR CONTA";
	const toggleText = isLogin ? "Registrarse" : "Login";

	return isLoading || (!isLoading && !!authUser) ? (
		<CircularProgress sx={{ position: "absolute", left: "50%", top: "50%" }} />
	) : (
		<div className="flex flex-col justify-center items-center h-screen gap-3">
			<Image src={"/logo.svg"} width={300} height={300} />
			<Typography variant="h5" className="text-center">
				Faça seu Login ou Cadastro
			</Typography>
			<Box
				className="w-80 "
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
			>
				{/* <Typography value={error ? error : ""} /> */}
				<TextField
					label="Email"
					variant="outlined"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					label="Password"
					variant="outlined"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					variant="outlined"
					onClick={isLogin ? handleSignIn : handleSignUp}
				>
					{buttonText}
				</Button>
				<div className="item-center">
					<Typography
						variant="body2"
						className="text-center"
						onClick={handleToggle}
					>
						{toggleText}
					</Typography>
				</div>
				<Divider> OU </Divider>
				<Button variant="outlined" onClick={loginTeste}>
					LOGIN TESTE
				</Button>
			</Box>
		</div>
	);
}
