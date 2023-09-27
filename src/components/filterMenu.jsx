import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FilterMenu({ onFilterChange }) {
	const [anchorEl, setAnchorEl] = useState([null, null, null]);
	const [selectedItemId, setSelectedItemId] = useState([null, null, null]);
	const open = anchorEl.map((el) => Boolean(el));

	const handleClick = (index, event) => {
		const newAnchorEl = [...anchorEl];
		newAnchorEl[index] = event.currentTarget;
		setAnchorEl(newAnchorEl);
	};

	const handleClose = (index, event) => {
		const newSelectedItemId = [...selectedItemId];
		newSelectedItemId[index] = event.target.id;
		setSelectedItemId(newSelectedItemId);
		const newAnchorEl = [...anchorEl];
		newAnchorEl[index] = null;
		setAnchorEl(newAnchorEl);
		onFilterChange(newSelectedItemId[index]);
	};

	return (
		<div className="mb-2 flex justify-center p-2 gap-2">
			{/* <Button
				id="filter-menu-button-1"
				variant="outlined"
				onClick={(event) => handleClick(0, event)}
			>
				Status <FilterListIcon />
			</Button>
			<Menu
				id="filter-menu-1"
				open={open[0]}
				onClose={(event) => handleClose(0, event)}
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
				<MenuItem id="todos" onClick={(event) => handleClose(0, event)}>
					Todos
				</MenuItem>
				<MenuItem id="aprovados" onClick={(event) => handleClose(0, event)}>
					Aprovados
				</MenuItem>
				<MenuItem id="reprovados" onClick={(event) => handleClose(0, event)}>
					Reprovados
				</MenuItem>
			</Menu> */}
			<Button
				id="filter-menu-button-2"
				variant="outlined"
				onClick={(event) => handleClick(1, event)}
			>
				Data <FilterListIcon />
			</Button>
			<Menu
				id="filter-menu-2"
				open={open[1]}
				onClose={(event) => handleClose(1, event)}
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
				<MenuItem id="DATA_DESC" onClick={(event) => handleClose(1, event)}>
					Data mais recente
				</MenuItem>
				<MenuItem id="DATA_ASC" onClick={(event) => handleClose(1, event)}>
					Data mais antiga
				</MenuItem>
			</Menu>
			<Button
				id="filter-menu-button-3"
				variant="outlined"
				onClick={(event) => handleClick(2, event)}
			>
				Valor <FilterListIcon />
			</Button>
			<Menu
				id="filter-menu-3"
				open={open[2]}
				onClose={(event) => handleClose(2, event)}
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
				<MenuItem id="VALOR_DESC" onClick={(event) => handleClose(2, event)}>
					Valor maior
				</MenuItem>
				<MenuItem id="VALOR_ASC" onClick={(event) => handleClose(2, event)}>
					Valor menor
				</MenuItem>
			</Menu>
		</div>
	);
}
