import React, { useState } from 'react';
import { Grid } from '@mui/material';
import '../styles/layout.css';
import QuestionBox from './QuestionBox';

const Layout = () => {
	const [questionList, setQuestionList] = useState([]);
	return (
		<Grid item xs={12} className='container'>
			<Grid item xs={11} sm={10} md={9} className='question-box'>
				<QuestionBox
					questionList={questionList}
					setQuestionList={setQuestionList}
				/>
			</Grid>
		</Grid>
	);
};

export default Layout;
