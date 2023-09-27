/*
  - nota: array de objetos
    - id: string
    - img: string
    - img_processada: string
    - tipo: string
    - data: string
    - finalidade: string?
    - cidade: string
    - moeda: string
    - tipo_pagamento: string
    - valor: number
    - pessoal: boolean
    - fornecedor: string
*/

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, Modal } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";
import Image from "next/image";

export default function NotaCard({ nota }) {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className="flex justify-center">
			<Card
				className="rounded-3xl bg-indigo-700 w-11/12 "
				sx={{ maxWidth: 390, backgroundColor: "#4338ca !important" }}
			>
				<CardContent>
					<div className="flex justify-between items-center gap-2">
						<Avatar src={nota.img_proc_url || ""} />
						<div className="flex flex-col items-center">
							<Typography variant="body1">
								{format(nota.transactionDate, "dd/MM/yy") || ""}
							</Typography>
							<Typography className="text-center" variant="body1">
								{nota.tipo || "COMIDA"}
							</Typography>
						</div>
						<Typography className="flex-grow" variant="body1" fontWeight="bold">
							{(nota.moeda || "R$") +
								" " +
								(nota.total.toString().replace(".", ",") || "")}
						</Typography>
						<IconButton aria-label="info" size="large" onClick={handleOpen}>
							<InfoIcon />
						</IconButton>
					</div>
				</CardContent>
			</Card>
			<Modal
				className="flex justify-center items-end"
				open={open}
				onClose={handleClose}
			>
				<div className="bg-indigo-700 p-4 rounded-lg flex flex-col items-center max-w-sm ">
					<Typography variant="h5" gutterBottom>
						Informações da Nota
					</Typography>
					<div className="flex flex-col items-center">
						<div className="flex flex-grid grid-cols-2">
							<Image src={nota.imageUrl || ""} width={100} height={100} />
							<Image src={nota.img_proc_url || ""} width={100} height={100} />
						</div>
						<Typography variant="body1" gutterBottom>
							Fornecedor: {nota.merchantName || ""}
						</Typography>
						<Typography variant="body1" gutterBottom>
							CNPJ: {nota.cnpj || ""}
						</Typography>
						<Typography variant="body1" gutterBottom>
							Cidade: {nota.cidade || ""}
						</Typography>
						<Typography variant="body1" gutterBottom>
							Data: {format(nota.transactionDate, "dd/MM/yy") || ""}
						</Typography>
						<Typography variant="body1" gutterBottom>
							Tipo: {nota.tipo || "COMIDA"}
						</Typography>
						<Typography variant="body1" gutterBottom>
							Pagamento: {nota.tipo_pagamento || ""}
						</Typography>
						<Typography variant="body1" gutterBottom>
							Total:{" "}
							{(nota.moeda || "R$") +
								" " +
								(nota.total.toString().replace(".", ",") || "")}
						</Typography>
					</div>
				</div>
			</Modal>
		</div>
	);
}
