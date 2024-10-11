import { CSSProperties, useState, FormEvent } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [pageState, setPageState] = useState(defaultArticleState);
	const [formState, setFormState] = useState(defaultArticleState);

	const resetForm = () => {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	};

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setPageState({
			...pageState,
			fontFamilyOption: formState.fontFamilyOption,
			fontSizeOption: formState.fontSizeOption,
			fontColor: formState.fontColor,
			contentWidth: formState.contentWidth,
			backgroundColor: formState.backgroundColor,
		});
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				setFormState={setFormState}
				resetForm={resetForm}
				submitForm={submitForm}
			/>
			<Article />
		</main>
	);
};
