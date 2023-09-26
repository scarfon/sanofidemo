"use client";

import NavBar from "../../components/nav";
import { useEffect, useState } from "react";
import { useAuth } from "../../../firebase/auth";
import { useRouter } from "next/navigation";
import { Button, CircularProgress, Fab, Typography } from "@mui/material";
import NotaCard from "@/components/notas";
import AddIcon from "@mui/icons-material/Add";
import FilterMenu from "../../components/filterMenu";
import { getReceipts } from "../../../firebase/firestore";
import SubirNotaModal from "@/components/subirNota";

export default function Dashboard() {
	const { authUser, isLoading } = useAuth();
	const [notas, setNotas] = useState([]);
	const [isLoadingNotas, setIsLoadingNotas] = useState(true);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !authUser) router.push("/");
		async function fetchNotas() {
			if (authUser) {
				setNotas(await getReceipts(authUser.uid));
				setIsLoadingNotas(false);
			}
		}
		fetchNotas();
	}, [authUser, isLoading]);

	return !authUser || isLoadingNotas ? (
		<CircularProgress sx={{ position: "absolute", left: "50%", top: "50%" }} />
	) : (
		<div>
			<NavBar />
			<div className="p-6">
				<Typography variant="h6">Bem vindo ao Dashboard!</Typography>
				<Typography variant="body1">
					Aqui você pode subir uma nota para a analise.
				</Typography>
			</div>
			<FilterMenu />
			<div
				className="flex flex-col gap-2 md:grid md:grid-cols-3"
				style={{ marginBottom: "50px" }}
			>
				{notas.map((nota) => {
					return <NotaCard nota={nota} />;
				})}
				{/* <NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard /> */}
				<div className="h-3"></div>
			</div>
			<Fab
				variant="extended"
				className="bg-purple-950 hover:bg-purple-950 shadow-lg"
				aria-label="add"
				sx={{ position: "fixed", bottom: "10px", right: "10px" }}
				onClick={handleOpen}
			>
				<AddIcon className="text-zinc-200" />
				<Typography className="text-zinc-200" variant="body1">
					Subir Nota
				</Typography>
			</Fab>
			<SubirNotaModal open={open} handleClose={handleClose} />
		</div>
	);
}
