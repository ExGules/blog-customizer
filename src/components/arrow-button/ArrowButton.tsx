import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

import clsx from 'clsx';

export type OnClick = () => void;

type ArrowButtonProps = {
	state: boolean;
	toggleState: OnClick;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	return (
		<div
			onClick={props.toggleState}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: props.state,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: props.state })}
			/>
		</div>
	);
};
