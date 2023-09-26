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
import { Avatar, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";

export default function NotaCard({ nota }) {
	return (
		<div className="flex justify-center">
			<Card className="rounded-3xl bg-indigo-700" sx={{ maxWidth: 390 }}>
				<CardContent>
					<div className="flex justify-between items-center gap-5">
						<Avatar
							src={nota.imgUrl || nota.img_proc || nota.imageBucket || ""}
						/>
						<div className="flex flex-col items-center">
							<Typography variant="body1">
								{format(nota.transactionDate, "dd/MM/yy") || ""}
							</Typography>
							<Typography variant="body1">{nota.tipo || "COMIDA"}</Typography>
						</div>
						<Typography variant="body1" fontWeight="bold">
							{(nota.moeda || "R$") +
								" " +
								(nota.total.toString().replace(".", ",") || "")}
						</Typography>
						<IconButton aria-label="info" size="large">
							<InfoIcon />
						</IconButton>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
