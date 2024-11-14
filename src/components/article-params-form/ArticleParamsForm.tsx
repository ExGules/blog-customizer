import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import clsx from 'clsx';
import { useState, useLayoutEffect, useRef } from 'react';
import * as constants from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from '../../ui/select/Select';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Separator } from '../../ui/separator/Separator';

type ArticleParamsFormProps = {
	articleState: constants.ArticleStateType;
	setArticleState: (param: constants.ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [formArticleState, setFormArticleState] =
		useState<constants.ArticleStateType>(articleState);
	const [isOpen, setAsideState] = useState<boolean>(false);
	const asideRef = useRef<HTMLElement | null>(null);

	const inputChange = (
		key: keyof constants.ArticleStateType,
		value: constants.OptionType
	) => {
		setFormArticleState((prevState) => ({ ...prevState, [key]: value }));
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
			setAsideState(false);
		}
	};

	useLayoutEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleReset = () => {
		setArticleState(constants.defaultArticleState);
		setFormArticleState(constants.defaultArticleState);
	};

	const handleApply = () => {
		setArticleState(formArticleState);
		setAsideState(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setAsideState((prevState) => !prevState)}
			/>

			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formArticleState.fontFamilyOption}
						onChange={(selected) => inputChange('fontFamilyOption', selected)}
						options={constants.fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={formArticleState.fontSizeOption}
						name='radio'
						onChange={(selected) => inputChange('fontSizeOption', selected)}
						options={constants.fontSizeOptions}
						title='Размер Шрифта'
					/>
					<Select
						selected={formArticleState.fontColor}
						onChange={(selected) => inputChange('fontColor', selected)}
						options={constants.fontColors}
						title='Цвет Шрифта'
					/>
					<Separator />
					<Select
						selected={formArticleState.backgroundColor}
						onChange={(selected) => inputChange('backgroundColor', selected)}
						options={constants.backgroundColors}
						title='Цвет Фона'
					/>
					<Select
						selected={formArticleState.contentWidth}
						onChange={(selected) => inputChange('contentWidth', selected)}
						options={constants.contentWidthArr}
						title='Ширина'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
