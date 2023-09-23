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

export default function NotaCard({ nota }) {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardContent>
				<Typography gutterBottom variant="h6" component="div">
					22/09/2023
				</Typography>
				<div className="grid grid-cols-2">
					<Typography variant="body2" color="text.secondary">
						11.25
					</Typography>
					<Typography variant="body2" color="text.secondary">
						11.25
					</Typography>
					<Typography variant="body2" color="text.secondary">
						11.25
					</Typography>
					<Typography variant="body2" color="text.secondary">
						11.25
					</Typography>
				</div>
			</CardContent>
			<CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}
