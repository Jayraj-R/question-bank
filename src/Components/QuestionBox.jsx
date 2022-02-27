import '../styles/questionBox.css';
import {
	FormControl,
	InputLabel,
	TextField,
	Typography,
	MenuItem,
	Select,
	Button,
	Snackbar,
	Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Options from './Options';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const QuestionBox = ({ questionList, setQuestionList }) => {
	const [questionTitle, setQuestionTitle] = useState('');
	const [answerType, setAnswerType] = useState('');
	const [alert, setAlert] = useState(false);
	const [error, setError] = useState('');

	const blankOption = {
		placeholder: '',
		min: null,
		max: null,
		row: '',
	};
	const [options, setOptions] = useState([blankOption]);

	const handleAddOpt = () => {
		setOptions([...options, blankOption]);
	};

	const handleSubmt = () => {
		if (options[0].placeholder !== '' && options[0].answerType !== '') {
			// console.log('Submiting');
			const newQuestion = {
				title: questionTitle,
				type: answerType,
				options: options,
			};
			setQuestionList([...questionList, newQuestion]);
			setQuestionTitle('');
			setAnswerType('');
			setOptions([blankOption]);
			setAlert(true);
			console.log('All questions', questionList);
		} else {
			setError('Please fill the required fields.');
		}
	};

	useEffect(() => {
		if (questionTitle !== '' || answerType !== '') setError('');
	}, [questionTitle, answerType]);
	return (
		<div className='box'>
			<Grid item xs={12} className='header-sec'>
				<ArrowBackIcon />
				<Typography variant='h4'>Add question</Typography>
			</Grid>

			<Grid item xs={12} sm={12} className='form-sec'>
				<div className='form-item'>
					<TextField
						variant='standard'
						label='Question Title'
						style={{ width: '100%' }}
						value={questionTitle}
						onChange={(e) => {
							setQuestionTitle(e.target.value);
						}}
					/>
				</div>

				<div className='form-item'>
					<FormControl variant='standard' style={{ width: '100%' }}>
						<InputLabel id='demo-simple-select-filled-label'>
							Answer Type
						</InputLabel>
						<Select
							labelId='demo-simple-select-filled-label'
							id='demo-simple-select-filled'
							value={answerType}
							onChange={(e) => {
								setAnswerType(e.target.value);
							}}
						>
							<MenuItem value={''}>
								<em>None</em>
							</MenuItem>
							<MenuItem value={'text'}>Text</MenuItem>
							<MenuItem value={'number'}>Number</MenuItem>
							<MenuItem value={'select'}>Select</MenuItem>
							<MenuItem value={'textArea'}>Text Area</MenuItem>
							<MenuItem value={'radio'}>Radio</MenuItem>
							<MenuItem value={'checkbox'}>CheckBox</MenuItem>
							<MenuItem value={'slider'}>Slider</MenuItem>
						</Select>
					</FormControl>
				</div>

				{answerType != '' && (
					<div
						className='form-item'
						style={{ height: '48vh', overflow: 'auto' }}
					>
						{options &&
							options.map((option, index) => {
								return (
									<>
										<Options
											index={index}
											option={option}
											options={options}
											setOptions={setOptions}
											answerType={answerType}
										/>
									</>
								);
							})}

						<Button onClick={handleAddOpt}>
							<AddCircleOutlineRoundedIcon color='success' />
						</Button>
					</div>
				)}
			</Grid>

			<section className='error'>{error !== '' && error}</section>

			<section className='btn-sec'>
				<div className='submit-btn'>
					<Button variant='contained' onClick={handleSubmt}>
						SUBMIT
					</Button>
				</div>
			</section>

			<section className='alert-sec'>
				<Snackbar
					open={alert}
					autoHideDuration={4000}
					onClose={() => setAlert(false)}
					message='Question saved.'
					// action={action}
				/>
			</section>
		</div>
	);
};

export default QuestionBox;
