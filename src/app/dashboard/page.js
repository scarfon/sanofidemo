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
import { rtdb } from "../../../firebase/firebase";
import SubirNotaModal from "@/components/subirNota";
import { ref, onValue } from "firebase/database";
import { set } from "date-fns";

export default function Dashboard() {
	const { authUser, isLoading } = useAuth();
	const [notas, setNotas] = useState([]);
	const [isLoadingNotas, setIsLoadingNotas] = useState(true);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const router = useRouter();

	// useEffect(() => {
	// 	const startRef = ref(rtdb, "nota/start");
	// 	const finishRef = ref(rtdb, "nota/finish");

	// 	// Check for authUser and isLoading
	// 	if (!isLoading && !authUser) {
	// 		router.push("/");
	// 	} else {
	// 		async function fetchNotas() {
	// 			if (authUser) {
	// 				setNotas(await getReceipts(authUser.uid, null));
	// 				setIsLoadingNotas(false);
	// 			}
	// 		}

	// 		fetchNotas();

	// 		onValue(startRef, (snapshot) => {
	// 			setIsLoadingNotas(snapshot.val());
	// 		});

	// 		onValue(finishRef, async (snapshot) => {
	// 			if (snapshot.val() && authUser) {
	// 				setNotas(await getReceipts(authUser.uid, null));
	// 			}
	// 		});
	// 	}
	// }, [authUser, isLoading]);

	// monitora o status de start e finish
	// useEffect(() => {
	// 	const dbRef = ref(rtdb, "nota/start");
	// 	onValue(dbRef, (snapshot) => {
	// 		setIsLoadingNotas(snapshot.val());
	// 	});
	// }, []);

	useEffect(() => {
		if (!isLoading && !authUser) router.push("/");
		async function fetchNotas() {
			if (authUser) {
				setNotas(await getReceipts(authUser.uid, null));
				setIsLoadingNotas(false);
			}
		}
		fetchNotas();
	}, [authUser, isLoading]);

	useEffect(() => {
		const dbRef = ref(rtdb, "nota/finish");
		onValue(dbRef, async (snapshot) => {
			if (snapshot.val()) {
				window.location.reload();
			}
		});
	}, []);

	const filterNotas = async (filter) => {
		console.log(filter);
		setIsLoadingNotas(true);
		setNotas(await getReceipts(authUser.uid, filter));
		setIsLoadingNotas(false);
	};
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
			<FilterMenu onFilterChange={filterNotas} />
			<div
				className="flex flex-col gap-2 md:grid md:grid-cols-3"
				style={{ marginBottom: "50px" }}
			>
				{notas.map((nota) => {
					return <NotaCard key={nota.id_ocr} nota={nota} />;
				})}
				<div className="h-3"></div>
			</div>
			<Fab
				variant="extended"
				className="shadow-lg"
				aria-label="add"
				sx={{
					position: "fixed",
					bottom: "10px",
					right: "10px",
					backgroundColor: "#581c87 !important",
					"&:hover": { backgroundColor: "#581c87" },
				}}
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
