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
import { Avatar, Button, IconButton, Modal, TextField } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import Image from "next/image";
import { updateReceipt } from "../../firebase/firestore";

export default function NotaCard({ nota }) {
	const [openView, setOpenView] = React.useState(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const [editedNota, setEditedNota] = React.useState(nota);

	const handleOpenView = () => {
		setOpenView(true);
	};

	const handleCloseView = () => {
		setOpenView(false);
	};

	const handleOpenEdit = () => {
		setOpenEdit(true);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const handleSave = () => {
		console.log(editedNota);
		updateReceipt(editedNota);
		handleCloseEdit();
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setEditedNota((prevNota) => ({
			...prevNota,
			[name]: value,
		}));
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
						<div className="flex flex-col items-center flex-grow w-32">
							<Typography variant="body1">
								{format(nota.transactionDate, "dd/MM/yy") || ""}
							</Typography>
							<Typography className="text-center" variant="body2">
								{nota.tipo || "COMIDA"}
							</Typography>
						</div>
						<Typography
							className="flex-grow "
							variant="body1"
							fontWeight="bold"
						>
							{(nota.moeda || "R$") +
								" " +
								(nota.total.toString().replace(".", ",") || "")}
						</Typography>
						<div className="flex">
							<IconButton
								sx={{ padding: 0.5 }}
								aria-label="info"
								size="large"
								onClick={handleOpenEdit}
							>
								<EditIcon />
							</IconButton>
							<IconButton
								sx={{ padding: 0.5 }}
								aria-label="info"
								size="large"
								onClick={handleOpenView}
							>
								<InfoIcon />
							</IconButton>
						</div>
					</div>
				</CardContent>
			</Card>
			<Modal
				className="flex justify-center items-end"
				open={openView}
				onClose={handleCloseView}
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
			<Modal open={openEdit} onClose={handleCloseEdit}>
				<div className="bg-indigo-700 p-4 rounded-lg flex flex-col items-center max-w-sm ">
					<Typography variant="h5" gutterBottom>
						Editar Nota
					</Typography>
					<div className="flex flex-col items-center">
						<TextField
							label="Fornecedor"
							name="merchantName"
							value={editedNota.merchantName}
							onChange={handleInputChange}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							label="CNPJ"
							name="cnpj"
							value={editedNota.cnpj}
							onChange={handleInputChange}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							label="Cidade"
							name="cidade"
							value={editedNota.cidade}
							onChange={handleInputChange}
							margin="normal"
							variant="outlined"
						/>

						{/* <TextField
							label="Data"
							name="transactionDate"
							type="date"
							value={
								editedNota.transactionDate
									? format(new Date(editedNota.transactionDate), "yyyy-MM-dd")
									: ""
							}
							onChange={handleInputChange}
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
						/> */}
						<TextField
							label="Tipo"
							name="tipo"
							value={editedNota.tipo}
							onChange={handleInputChange}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							label="Pagamento"
							name="tipo_pagamento"
							value={editedNota.tipo_pagamento}
							onChange={handleInputChange}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							label="Total"
							name="total"
							value={editedNota.total}
							onChange={handleInputChange}
							margin="normal"
							variant="outlined"
						/>
						<Button variant="contained" onClick={handleSave}>
							Salvar
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
