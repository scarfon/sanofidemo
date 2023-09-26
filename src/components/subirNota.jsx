import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useAuth } from "../../firebase/auth";
import { useState } from "react";
import { uploadImage } from "../../firebase/storage";
import { CircularProgress } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
};

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export default function SubirNotaModal({ open, handleClose }) {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const { authUser } = useAuth();

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async () => {
		setLoading(true);
		await uploadImage(file, authUser.uid);
		setLoading(false);
		setSuccess(true);
		// setTimeout(() => {
		// 	setLoading(false);
		// 	setSuccess(true);
		// }, 5000);
	};

	return (
		<div>
			<Modal open={open} onClose={handleClose}>
				<Box
					className="bg-purple-950 rounded-2xl shadow-lg p-4 w-80 md:w-3/5  "
					sx={style}
				>
					{!success && (
						<>
							<Typography
								className="text-center mt-3 font-extrabold"
								variant="h5"
							>
								Upload Nota
							</Typography>
							<Typography className="mt-6 font-bold" variant="body1">
								Dicas para fazer um ótimo upload de uma nota:
							</Typography>
							<ul className="list-disc ml-6 mt-3">
								<li>Verifique se a nota está legível</li>
								<li>Verifique se a nota está completa</li>
								<li>Para melhores resultados usar um fundo contrastante</li>
							</ul>

							<div className="flex justify-center mt-6 gap-4">
								<Button
									component="label"
									variant="contained"
									startIcon={<FileUploadIcon />}
								>
									<VisuallyHiddenInput
										type="file"
										onChange={handleFileChange}
									/>
								</Button>

								<Button
									variant="contained"
									component="label"
									onClick={handleSubmit}
									disabled={!file || loading}
								>
									{loading ? <CircularProgress /> : "Upload"}
								</Button>
							</div>
						</>
					)}
					{success && (
						<>
							<Typography className="mt-6 font-bold" variant="body1">
								Nota subida com sucesso, por favor aguarde uns minutos para ela
								ser processada.
							</Typography>
							<div className="flex justify-center mt-6 gap-4">
								<Button
									variant="contained"
									component="label"
									onClick={() => {
										setSuccess(false);
										setFile(null);
										handleClose();
									}}
								>
									Close
								</Button>
							</div>
						</>
					)}
				</Box>
			</Modal>
		</div>
	);
}
