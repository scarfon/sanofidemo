"use client";

import NavBar from "../../components/nav";
import { useEffect } from "react";
import { useAuth } from "../../../firebase/auth";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import NotaCard from "@/components/notas";

export default function Dashboard() {
	const { authUser, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !authUser) router.push("/");
	}, [authUser, isLoading]);

	return (
		<div>
			<NavBar />
			<div className="p-6">
				<Typography variant="h6">Bem vindo ao Dashboard!</Typography>
				<Typography variant="body1">
					Aqui você pode subir uma nota para a analise.
				</Typography>
			</div>
			<div className="flex">
				<Button variant="outlined">
					<Typography variant="body1">Subir Nota</Typography>
				</Button>
			</div>
			<div className="">
				<NotaCard />
			</div>
		</div>
	);
}
