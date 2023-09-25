"use client";

import NavBar from "../../components/nav";
import { useEffect } from "react";
import { useAuth } from "../../../firebase/auth";
import { useRouter } from "next/navigation";
import { Button, Fab, Typography } from "@mui/material";
import NotaCard from "@/components/notas";
import AddIcon from "@mui/icons-material/Add";
import FilterMenu from '../../components/filterMenu';
import { getReceipts } from "../../../firebase/firestore";

export default function Dashboard() {
	const { authUser, isLoading } = useAuth();
	const [notas, setNotas] = useState([]);
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !authUser) router.push("/");
	}, [authUser, isLoading]);

	useEffect(async () => {
		if (authUser) {
			setNotas(await getReceipts(authUser.uid));
		}
	}, [authUser]);

	return (
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
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<NotaCard />
				<div className="h-3"></div>
			</div>
			<Fab
				variant="extended"
				className="bg-purple-950 hover:bg-purple-950 shadow-lg"
				aria-label="add"
				sx={{ position: "fixed", bottom: "10px", right: "10px" }}
			>
				<AddIcon className="text-zinc-200" />
				<Typography className="text-zinc-200" variant="body1">
					Subir Nota
				</Typography>
			</Fab>
		</div>
	);
}