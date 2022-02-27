import { Button, TextField, Typography } from '@mui/material';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import '../styles/options.css';
import { useEffect, useState } from 'react';

const Options = ({ index, option, options, setOptions, answerType }) => {
	const [currOption, setCurrOption] = useState(option);

	const handleRemoveOpt = (id) => {
		if (options.length !== 1) {
			const newOpts = options.filter((option, ind) => ind !== index);
			setOptions(newOpts);
		}
	};
	useEffect(() => {
		setCurrOption(options[index]);
	}, [options, index]);

	const handleChange = (e, field) => {
		var newOpt = {
			...currOption,
		};
		if (field === 'placeholder') newOpt.placeholder = e.target.value;
		if (field === 'max') newOpt.max = e.target.value;
		if (field === 'min') newOpt.min = e.target.value;
		if (field === 'row') newOpt.row = e.target.value;

		var newOpts = [...options];
		newOpts[index] = newOpt;
		setOptions(newOpts);
		setCurrOption(newOpt);
	};

	return (
		<section className='option-sec'>
			<Typography variant='p' className='option-header'>
				Option {index + 1}
			</Typography>
			<div className='option-inputs'>
				<TextField
					variant='outlined'
					label='Placeholder'
					value={currOption.placeholder}
					size='small'
					onChange={(e) => handleChange(e, 'placeholder')}
				/>
				{answerType === 'number' ||
				answerType === 'slider' ||
				answerType === 'textArea' ? (
					<TextField
						variant='outlined'
						size='small'
						label='Max'
						value={currOption.max}
						onChange={(e) => handleChange(e, 'max')}
					/>
				) : null}
				{answerType === 'number' ||
				answerType === 'slider' ||
				answerType === 'textArea' ? (
					<TextField
						size='small'
						variant='outlined'
						label='Min'
						value={currOption.min}
						onChange={(e) => handleChange(e, 'min')}
					/>
				) : null}
				{answerType === 'textArea' && (
					<TextField
						size='small'
						variant='outlined'
						label='Row'
						value={currOption.row}
						onChange={(e) => handleChange(e, 'row')}
					/>
				)}
				<Button
					className='remove-btn'
					onClick={() => handleRemoveOpt(currOption.id)}
				>
					<RemoveCircleOutlineRoundedIcon color='error' />
				</Button>
			</div>
		</section>
	);
};

export default Options;
