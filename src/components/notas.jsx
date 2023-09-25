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
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function NotaCard({ nota }) {
	return (
		<div className="flex justify-center">
			<Card className="rounded-3xl bg-indigo-700" sx={{ maxWidth: 390 }}>
				<CardContent>
					<div className="flex justify-between items-center gap-5">
						<Avatar />
						<div className="flex flex-col items-center">
							<Typography variant="body1">22/09/2023</Typography>
							<Typography variant="body1">Comida</Typography>
						</div>
						<Typography variant="body1" fontWeight="bold">
							R$ 45.000,00
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
