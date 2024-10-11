import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type ArticleParamsForm = {
	formState: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	};
	setFormState: React.Dispatch<
		React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	>;
	resetForm: () => void;
	submitForm: (e: FormEvent<HTMLFormElement>) => void;
};

export function ArticleParamsForm(props: ArticleParamsForm) {
	const [state, setState] = useState(false);

	const toggleState = () => {
		return setState(!state);
	};

	const rootRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		if (!state) return;

		function handleOutsideClick(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);

			if (isOutsideClick) {
				toggleState();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				toggleState();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [state]);

	return (
		<>
			<ArrowButton state={state} toggleState={toggleState} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: state })}>
				<form className={styles.form} onSubmit={props.submitForm} ref={rootRef}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={props.formState.fontFamilyOption}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								fontFamilyOption: option,
							})
						}
						options={fontFamilyOptions}
						placeholder='Open Sans'
						title='шрифт'
					/>
					<RadioGroup
						selected={props.formState.fontSizeOption}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								fontSizeOption: option,
							})
						}
						options={fontSizeOptions}
						name='font-size'
						title='размер шрифта'
					/>
					<Select
						selected={props.formState.fontColor}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								fontColor: option,
							})
						}
						options={fontColors}
						placeholder='Чёрный'
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={props.formState.backgroundColor}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								backgroundColor: option,
							})
						}
						options={backgroundColors}
						placeholder='Белый'
						title='цвет фона'
					/>
					<Select
						selected={props.formState.contentWidth}
						onChange={(option) =>
							props.setFormState({
								...props.formState,
								contentWidth: option,
							})
						}
						options={contentWidthArr}
						placeholder='Широкий'
						title='ширина контейнера'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={props.resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
}
