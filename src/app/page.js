"use client";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../firebase/auth";

export default function Home() {
	const { authUser, isLoading } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (authUser && !isLoading) {
			router.push("/dashboard");
		}
	} , [authUser, isLoading]);

	const handleSignIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push("");
		} catch (error) {
			console.error(error);
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
			console.error(error);
		}
	};

	return (

		<div className="flex flex-col justify-center items-center h-screen gap-3">
			<div className="flex flex-col justify-center items-center">
				<Typography variant="h2">sanofi</Typography>
				<Typography variant="h6">singularity</Typography>
			</div>

			<Typography variant="h5">Nota v1.0</Typography>

			<Box className="w-80 " sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
				<Button variant="outlined" onClick={handleSignIn}>
					LOGIN
				</Button>
				<Divider />
				<Button variant="outlined" onClick={loginTeste}>
					LOGIN TESTE
				</Button>
			</Box>
		</div>
	);
}
