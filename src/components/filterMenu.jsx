import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FilterMenu() {
	const [anchorEl1, setAnchorEl1] = useState(null);
	const [anchorEl2, setAnchorEl2] = useState(null);
	const [anchorEl3, setAnchorEl3] = useState(null);
	const open1 = Boolean(anchorEl1);
	const open2 = Boolean(anchorEl2);
	const open3 = Boolean(anchorEl3);

	const handleClick1 = (event) => {
		setAnchorEl1(event.currentTarget);
	};

	const handleClick2 = (event) => {
		setAnchorEl2(event.currentTarget);
	};

	const handleClick3 = (event) => {
		setAnchorEl3(event.currentTarget);
	};

	const handleClose1 = () => {
		setAnchorEl1(null);
	};

	const handleClose2 = () => {
		setAnchorEl2(null);
	};

	const handleClose3 = () => {
		setAnchorEl3(null);
	};

	return (
		<div className="mb-2 flex justify-center p-2 gap-2">
			<Button
				id="filter-menu-button-1"
				variant="outlined"
				onClick={handleClick1}
			>
				Status <FilterListIcon />
			</Button>
			<Menu
				id="filter-menu-1"
				open={open1}
				onClose={handleClose1}
				getContentAnchorEl={null}
				PaperProps={{
					elevation: 0,
					sx: {
						borderRadius: 2,
						minWidth: 200,
						color: "text.primary",
						backgroundColor: "background.paper",
					},
				}}
			>
				<MenuItem onClick={handleClose1}>Todos</MenuItem>
				<MenuItem onClick={handleClose1}>Aprovados</MenuItem>
				<MenuItem onClick={handleClose1}>Reprovados</MenuItem>
			</Menu>
            <Button
				id="filter-menu-button-2"
				variant="outlined"
				onClick={handleClick2}
			>
				Data <FilterListIcon />
			</Button>
			<Menu
				id="filter-menu-2"
				open={open2}
				onClose={handleClose2}
				getContentAnchorEl={null}
				PaperProps={{
					elevation: 0,
					sx: {
						borderRadius: 2,
						minWidth: 200,
						color: "text.primary",
						backgroundColor: "background.paper",
					},
				}}
			>
                <MenuItem onClick={handleClose2}>Data mais recente</MenuItem>
                <MenuItem onClick={handleClose2}>Data mais antiga</MenuItem>
			</Menu>
            <Button
				id="filter-menu-button-3"
				variant="outlined"
				onClick={handleClick3}
			>
				Valor <FilterListIcon />
			</Button>
			<Menu
				id="filter-menu-3"
				open={open3}
				onClose={handleClose3}
				getContentAnchorEl={null}
				PaperProps={{
					elevation: 0,
					sx: {
						borderRadius: 2,
						minWidth: 200,
						color: "text.primary",
						backgroundColor: "background.paper",
					},
				}}
			>
                <MenuItem onClick={handleClose3}>Valor maior</MenuItem>
                <MenuItem onClick={handleClose3}>Valor menor</MenuItem>
			</Menu>
        </div>
    );
}
