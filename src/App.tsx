import { useState, useEffect, useRef } from 'react';
import './styles/index.scss';
import styles from './styles/index.module.scss';

interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	link: string;
	github: string;
}

interface Skill {
	name: string;
	level: number;
	color: string;
	category: string;
}

const projects: Project[] = [
	{
		id: 1,
		title: "Закрывающий тег",
		description: "Проект по созданию интерактивного веб-приложения с современным дизайном",
		technologies: ["HTML5", "CSS3", "JavaScript", "Адаптивная верстка"],
		link: "https://exgules.github.io/zakrivayuschiy-teg-f/",
		github: "https://github.com/ExGules/zakrivayuschiy-teg-f"
	},
	{
		id: 2,
		title: "Mesto Project",
		description: "Социальная сеть для обмена фотографиями с возможностью редактирования профиля",
		technologies: ["React", "JavaScript", "CSS3", "REST API"],
		link: "https://exgules.github.io/mesto-project-ff/",
		github: "https://github.com/ExGules/mesto-project-ff"
	},
	{
		id: 3,
		title: "Blog Customizer (Портфолио)",
		description: "Современное одностраничное портфолио с интерактивными диаграммами навыков, анимациями, темной/светлой темой и адаптивным дизайном. Реализованы: круговые и радарные диаграммы, секции обо мне, навыки, достижения, проекты, контакты. Автоматический деплой на GitHub Pages.",
		technologies: ["React", "TypeScript", "SCSS", "Webpack", "GitHub Actions"],
		link: "https://exgules.github.io/blog-customizer/",
		github: "https://github.com/ExGules/blog-customizer"
	}
];

const skills: Skill[] = [
	{ name: "HTML5", level: 95, color: "#2563eb", category: "Frontend" },
	{ name: "CSS3", level: 90, color: "#7c3aed", category: "Frontend" },
	{ name: "JavaScript", level: 85, color: "#059669", category: "Programming" },
	{ name: "React.js", level: 80, color: "#dc2626", category: "Framework" },
	{ name: "SCSS/LESS", level: 85, color: "#ea580c", category: "Styling" },
	{ name: "Git", level: 80, color: "#16a34a", category: "Tools" },
	{ name: "Webpack", level: 70, color: "#0891b2", category: "Tools" },
	{ name: "TypeScript", level: 65, color: "#7c2d12", category: "Programming" }
];

const skillCategories = [
	{ name: "Frontend", color: "#2563eb", skills: skills.filter(s => s.category === "Frontend") },
	{ name: "Programming", color: "#059669", skills: skills.filter(s => s.category === "Programming") },
	{ name: "Framework", color: "#dc2626", skills: skills.filter(s => s.category === "Framework") },
	{ name: "Styling", color: "#ea580c", skills: skills.filter(s => s.category === "Styling") },
	{ name: "Tools", color: "#0891b2", skills: skills.filter(s => s.category === "Tools") }
];

export const App = () => {
	const [activeSection, setActiveSection] = useState('home');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
	const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

	// Refs for animation
	const heroRef = useRef<HTMLElement>(null);
	const aboutRef = useRef<HTMLElement>(null);
	const skillsRef = useRef<HTMLElement>(null);
	const projectsRef = useRef<HTMLElement>(null);
	const contactRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			const sections = ['home', 'about', 'skills', 'projects', 'contact'];
			const scrollPosition = window.scrollY + 100;

			// Show/hide scroll to top button
			setShowScrollTop(window.scrollY > 500);

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const offsetTop = element.offsetTop;
					const offsetHeight = element.offsetHeight;
					
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		// Intersection Observer for animations
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					setAnimatedElements(prev => new Set(prev).add(id));
				}
			});
		}, observerOptions);

		// Observe all sections
		const sections = [heroRef, aboutRef, skillsRef, projectsRef, contactRef];
		sections.forEach(ref => {
			if (ref.current) {
				observer.observe(ref.current);
			}
		});

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	}, []);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		setIsMenuOpen(false);
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.body.classList.toggle('dark-mode');
	};

	const handleSkillClick = (skill: Skill) => {
		setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
	};

	const handleSkillHover = (skillName: string | null) => {
		setHoveredSkill(skillName);
	};

	const renderCircularProgress = (skill: Skill, size: number = 120) => {
		const radius = (size - 20) / 2;
		const circumference = 2 * Math.PI * radius;
		const progress = (skill.level / 100) * circumference;
		const strokeDasharray = `${progress} ${circumference}`;

		return (
			<div 
				className={styles.circularProgress}
				onClick={() => handleSkillClick(skill)}
				onMouseEnter={() => handleSkillHover(skill.name)}
				onMouseLeave={() => handleSkillHover(null)}
			>
				<svg width={size} height={size} className={styles.progressSvg}>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke="#e5e7eb"
						strokeWidth="8"
						fill="none"
						className={styles.progressBg}
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={skill.color}
						strokeWidth="8"
						fill="none"
						strokeDasharray={strokeDasharray}
						strokeDashoffset={circumference}
						className={styles.progressBar}
						style={{
							strokeDasharray: strokeDasharray,
							strokeDashoffset: circumference - progress
						}}
					/>
				</svg>
				<div className={styles.progressContent}>
					<span className={styles.progressValue}>{skill.level}%</span>
					<span className={styles.progressLabel}>{skill.name}</span>
				</div>
				{hoveredSkill === skill.name && (
					<div className={styles.skillTooltip}>
						<strong>{skill.name}</strong>
						<span>Уровень: {skill.level}%</span>
						<span>Категория: {skill.category}</span>
					</div>
				)}
			</div>
		);
	};

	const renderRadarChart = () => {
		const centerX = 200;
		const centerY = 200;
		const radius = 150;
		const points = skills.map((skill, index) => {
			const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
			const skillRadius = (skill.level / 100) * radius;
			return {
				x: centerX + skillRadius * Math.cos(angle),
				y: centerY + skillRadius * Math.sin(angle),
				skill
			};
		});

		const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

		return (
			<div className={styles.radarChart}>
				<svg width="400" height="400" className={styles.radarSvg}>
					{/* Background circles */}
					{[0.2, 0.4, 0.6, 0.8, 1].map((level, index) => (
						<circle
							key={index}
							cx={centerX}
							cy={centerY}
							r={radius * level}
							fill="none"
							stroke="#e5e7eb"
							strokeWidth="1"
							opacity="0.3"
						/>
					))}
					
					{/* Skill lines */}
					{skills.map((skill, index) => {
						const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
						const endX = centerX + radius * Math.cos(angle);
						const endY = centerY + radius * Math.sin(angle);
						
						return (
							<line
								key={index}
								x1={centerX}
								y1={centerY}
								x2={endX}
								y2={endY}
								stroke="#e5e7eb"
								strokeWidth="1"
								opacity="0.5"
							/>
						);
					})}

					{/* Skill polygon */}
					<polygon
						points={polygonPoints}
						fill="rgba(37, 99, 235, 0.2)"
						stroke="#2563eb"
						strokeWidth="2"
						className={styles.skillPolygon}
					/>

					{/* Skill points */}
					{points.map((point, index) => (
						<circle
							key={index}
							cx={point.x}
							cy={point.y}
							r="6"
							fill={point.skill.color}
							stroke="white"
							strokeWidth="2"
							className={styles.skillPoint}
							onMouseEnter={() => handleSkillHover(point.skill.name)}
							onMouseLeave={() => handleSkillHover(null)}
						/>
					))}

					{/* Skill labels */}
					{skills.map((skill, index) => {
						const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
						const labelRadius = radius + 30;
						const x = centerX + labelRadius * Math.cos(angle);
						const y = centerY + labelRadius * Math.sin(angle);
						
						return (
							<text
								key={index}
								x={x}
								y={y}
								textAnchor="middle"
								dominantBaseline="middle"
								className={styles.skillLabel}
								fontSize="12"
								fill="var(--text-secondary)"
							>
								{skill.name}
							</text>
						);
					})}
				</svg>
			</div>
		);
	};

	return (
		<div className={`${styles.portfolio} ${isDarkMode ? styles.darkMode : ''}`}>
			{/* Navigation */}
			<nav className={styles.navigation}>
				<div className={styles.navContainer}>
					<div className={styles.logo}>
						<span>Никита</span>Краснов
					</div>
					
					<div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
						<button 
							className={`${styles.navLink} ${activeSection === 'home' ? styles.active : ''}`}
							onClick={() => scrollToSection('home')}
						>
							Главная
						</button>
						<button 
							className={`${styles.navLink} ${activeSection === 'about' ? styles.active : ''}`}
							onClick={() => scrollToSection('about')}
						>
							Обо мне
						</button>
						<button 
							className={`${styles.navLink} ${activeSection === 'skills' ? styles.active : ''}`}
							onClick={() => scrollToSection('skills')}
						>
							Навыки
						</button>
						<button 
							className={`${styles.navLink} ${activeSection === 'projects' ? styles.active : ''}`}
							onClick={() => scrollToSection('projects')}
						>
							Проекты
						</button>
						<button 
							className={`${styles.navLink} ${activeSection === 'contact' ? styles.active : ''}`}
							onClick={() => scrollToSection('contact')}
						>
							Контакты
						</button>
					</div>

					<div className={styles.navControls}>
						<button 
							className={styles.themeToggle}
							onClick={toggleDarkMode}
							title={isDarkMode ? 'Светлая тема' : 'Темная тема'}
						>
							{isDarkMode ? '☀️' : '🌙'}
						</button>
						<button 
							className={styles.menuToggle}
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section 
				id="home" 
				ref={heroRef}
				className={`${styles.hero} ${animatedElements.has('home') ? styles.animateIn : ''}`}
			>
				<div className={styles.heroContent}>
					<div className={styles.heroText}>
						<h1 className={styles.heroTitle}>
							Привет, я <span className={styles.highlight}>Никита Краснов</span>
						</h1>
						<p className={styles.heroSubtitle}>
							Frontend-разработчик с более чем 3 годами опыта создания современных веб-приложений. 
							Специализируюсь на React, JavaScript и адаптивной верстке. Создал множество проектов, включая коммерческие решения.
						</p>
						<div className={styles.heroButtons}>
							<button 
								className={styles.primaryButton}
								onClick={() => scrollToSection('projects')}
							>
								Посмотреть проекты
							</button>
							<button 
								className={styles.secondaryButton}
								onClick={() => scrollToSection('contact')}
							>
								Связаться со мной
							</button>
						</div>
					</div>
					<div className={styles.heroImage}>
						<div className={styles.codeAnimation}>
							<div className={styles.codeLine}>
								<span className={styles.keyword}>const</span> developer = {'{'}
							</div>
							<div className={styles.codeLine}>
								<span className={styles.property}>name:</span> <span className={styles.string}>'Никита Краснов'</span>,
							</div>
							<div className={styles.codeLine}>
								<span className={styles.property}>role:</span> <span className={styles.string}>'Frontend Developer'</span>,
							</div>
							<div className={styles.codeLine}>
								<span className={styles.property}>skills:</span> [<span className={styles.string}>'React'</span>, <span className={styles.string}>'JavaScript'</span>],
							</div>
							<div className={styles.codeLine}>
								<span className={styles.property}>location:</span> <span className={styles.string}>'Тольятти'</span>
							</div>
							<div className={styles.codeLine}>{'}'};</div>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section 
				id="about" 
				ref={aboutRef}
				className={`${styles.about} ${animatedElements.has('about') ? styles.animateIn : ''}`}
			>
				<div className={styles.container}>
					<h2 className={styles.sectionTitle}>Обо мне</h2>
					<div className={styles.aboutContent}>
						<div className={styles.aboutText}>
							<p>
								Меня зовут Никита, я Frontend-разработчик с более чем 3 годами опыта создания современных веб-приложений. 
								За это время освоил HTML/CSS, JavaScript и React, создал множество проектов, включая коммерческие решения. 
								Специализируюсь на адаптивной верстке, знаком с REST API и управлением состоянием в Redux.
							</p>
							<p>
								Постоянно развиваюсь в области веб-разработки: изучаю TypeScript и улучшаю алгоритмические навыки на Codewars. 
								Быстро обучаюсь новым технологиям, внимателен к деталям и качеству кода, умею эффективно работать в команде. 
								Готов к сложным техническим задачам и конструктивной критике. Прошел профессиональные курсы в Яндекс-Практикум и Академия АйТи.
							</p>
							<p>
								Ищу работу в компании, где смогу внести значимый вклад в развитие продуктов и развиваться под руководством опытных менторов. 
								Умею находить оптимальные решения в документации, владею soft skills и принципами agile-разработки. 
								Интересуюсь оптимизацией Core Web Vitals и современными подходами к созданию пользовательских интерфейсов.
							</p>
							<div className={styles.stats}>
								<div className={styles.stat}>
									<span className={styles.statNumber}>3+</span>
									<span className={styles.statLabel}>Года опыта</span>
								</div>
								<div className={styles.stat}>
									<span className={styles.statNumber}>10+</span>
									<span className={styles.statLabel}>Проектов</span>
								</div>
								<div className={styles.stat}>
									<span className={styles.statNumber}>2</span>
									<span className={styles.statLabel}>Курса пройдено</span>
								</div>
							</div>
						</div>
						<div className={styles.aboutImage}>
							<div className={styles.profileCard}>
								<div className={styles.profileImage}>
									<div className={styles.avatar}>👨‍💻</div>
								</div>
								<h3>Никита Краснов</h3>
								<p>Frontend Developer</p>
								<p>React • JavaScript • HTML/CSS</p>
								<div className={styles.education}>
									<h4>Образование:</h4>
									<p>Тольяттинский государственный университет</p>
									<p>Техносферная безопасность (2022)</p>
									<h4>Курсы:</h4>
									<p>• Яндекс-Практикум (2024)</p>
									<p>• Академия АйТи (2024)</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section 
				id="skills" 
				ref={skillsRef}
				className={`${styles.skills} ${animatedElements.has('skills') ? styles.animateIn : ''}`}
			>
				<div className={styles.container}>
					<h2 className={styles.sectionTitle}>Навыки и технологии</h2>
					
					{/* Interactive Charts */}
					<div className={styles.chartsContainer}>
						{/* Circular Progress Charts */}
						<div className={styles.circularCharts}>
							<h3>Круговые диаграммы</h3>
							<div className={styles.circularGrid}>
								{skills.map((skill, index) => (
									<div 
										key={skill.name} 
										className={`${styles.circularWrapper} ${selectedSkill?.name === skill.name ? styles.selected : ''}`}
										style={{ animationDelay: `${index * 0.1}s` }}
									>
										{renderCircularProgress(skill)}
									</div>
								))}
							</div>
						</div>

						{/* Radar Chart */}
						<div className={styles.radarChartContainer}>
							<h3>Радарная диаграмма</h3>
							{renderRadarChart()}
						</div>
					</div>

					{/* Skill Categories */}
					<div className={styles.skillCategories}>
						<h3>Категории навыков</h3>
						<div className={styles.categoriesGrid}>
							{skillCategories.map((category) => (
								<div key={category.name} className={styles.categoryCard}>
									<div className={styles.categoryHeader}>
										<div 
											className={styles.categoryColor} 
											style={{ backgroundColor: category.color }}
										></div>
										<h4>{category.name}</h4>
										<span className={styles.categoryCount}>{category.skills.length}</span>
									</div>
									<div className={styles.categorySkills}>
										{category.skills.map((skill) => (
											<div key={skill.name} className={styles.categorySkill}>
												<span className={styles.skillName}>{skill.name}</span>
												<div className={styles.skillBar}>
													<div 
														className={styles.skillFill}
														style={{ 
															width: `${skill.level}%`,
															backgroundColor: skill.color
														}}
													></div>
												</div>
												<span className={styles.skillLevel}>{skill.level}%</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Selected Skill Details */}
					{selectedSkill && (
						<div className={styles.skillDetails}>
							<div className={styles.skillDetailsCard}>
								<div className={styles.skillDetailsHeader}>
									<h3>{selectedSkill.name}</h3>
									<button 
										className={styles.closeButton}
										onClick={() => setSelectedSkill(null)}
									>
										×
									</button>
								</div>
								<div className={styles.skillDetailsContent}>
									<div className={styles.skillProgress}>
										<div className={styles.progressRing}>
											{renderCircularProgress(selectedSkill, 150)}
										</div>
										<div className={styles.skillInfo}>
											<p><strong>Категория:</strong> {selectedSkill.category}</p>
											<p><strong>Уровень:</strong> {selectedSkill.level}%</p>
											<p><strong>Цвет:</strong> 
												<span 
													className={styles.colorPreview}
													style={{ backgroundColor: selectedSkill.color }}
												></span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					<div className={styles.skillsDescription}>
						<h3>Владею основным стеком:</h3>
						<ul>
							<li><strong>HTML5, CSS3</strong> - продвинутая адаптивная верстка, Flex/Grid, препроцессоры SCSS/LESS, анимации</li>
							<li><strong>JavaScript</strong> - ES6+, асинхронность, ООП, паттерны проектирования</li>
							<li><strong>React.js</strong> - Hooks, Router, Context API, работа с REST API, оптимизация производительности</li>
							<li><strong>Инструменты:</strong> Git, Webpack, Figma, Chrome DevTools, Postman</li>
						</ul>
						<h3>Изучаю и применяю:</h3>
						<ul>
							<li>TypeScript - типизация, интерфейсы, дженерики</li>
							<li>Next.js - SSR, SSG, роутинг, оптимизация</li>
							<li>Тестирование - Jest, React Testing Library</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Achievements Section */}
			<section id="achievements" className={styles.achievements}>
				<div className={styles.container}>
					<h2 className={styles.sectionTitle}>Достижения и сертификаты</h2>
					<div className={styles.achievementsGrid}>
						<div className={styles.achievementCard}>
							<div className={styles.achievementIcon}>🏆</div>
							<h3>Яндекс-Практикум</h3>
							<p>Фронтенд-Разработчик (2024)</p>
							<span className={styles.achievementType}>Профессиональный курс</span>
						</div>
						<div className={styles.achievementCard}>
							<div className={styles.achievementIcon}>🎓</div>
							<h3>Академия АйТи</h3>
							<p>Frontend-разработчик на React.js (2024)</p>
							<span className={styles.achievementType}>Сертификация</span>
						</div>
						<div className={styles.achievementCard}>
							<div className={styles.achievementIcon}>⚡</div>
							<h3>Codewars</h3>
							<p>Алгоритмические задачи</p>
							<span className={styles.achievementType}>Постоянное развитие</span>
						</div>
						<div className={styles.achievementCard}>
							<div className={styles.achievementIcon}>🚀</div>
							<h3>Core Web Vitals</h3>
							<p>Оптимизация производительности</p>
							<span className={styles.achievementType}>Специализация</span>
						</div>
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section 
				id="projects" 
				ref={projectsRef}
				className={`${styles.projects} ${animatedElements.has('projects') ? styles.animateIn : ''}`}
			>
				<div className={styles.container}>
					<h2 className={styles.sectionTitle}>Мои проекты</h2>
					<div className={styles.projectsGrid}>
						{projects.map((project, index) => (
							<div 
								key={project.id} 
								className={`${styles.projectCard} ${animatedElements.has('projects') ? styles.animateIn : ''}`}
								style={{ animationDelay: `${index * 0.2}s` }}
							>
								<div className={styles.projectImage}>
									<div className={`${styles.projectPreview} ${styles[`project${project.id}`]}`}>
										<div className={styles.projectIcon}>
											{project.id === 1 && '🌐'}
											{project.id === 2 && '📸'}
											{project.id === 3 && '🍔'}
										</div>
										<div className={styles.projectTitle}>{project.title}</div>
									</div>
									<div className={styles.projectOverlay}>
										<div className={styles.projectLinks}>
											<a href={project.link} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
												Демо
											</a>
											<a href={project.github} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
												GitHub
											</a>
										</div>
									</div>
								</div>
								<div className={styles.projectContent}>
									<h3 className={styles.projectTitle}>{project.title}</h3>
									<p className={styles.projectDescription}>{project.description}</p>
									<div className={styles.projectTechnologies}>
										{project.technologies.map((tech) => (
											<span key={tech} className={styles.technology}>{tech}</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section 
				id="contact" 
				ref={contactRef}
				className={`${styles.contact} ${animatedElements.has('contact') ? styles.animateIn : ''}`}
			>
				<div className={styles.container}>
					<h2 className={styles.sectionTitle}>Свяжитесь со мной</h2>
					<div className={styles.contactContent}>
						<div className={styles.contactInfo}>
							<h3>Давайте работать вместе!</h3>
							<p>
								Готов к новым вызовам и интересным проектам. С более чем 3-летним опытом в веб-разработке 
								ищу работу в компании, где смогу внести значимый вклад в развитие продуктов и развиваться под руководством опытных менторов.
							</p>
							<div className={styles.contactMethods}>
								<div className={styles.contactMethod}>
									<span className={styles.contactIcon}>📧</span>
									<span>respekt32113@mail.ru</span>
								</div>
								<div className={styles.contactMethod}>
									<span className={styles.contactIcon}>📱</span>
									<span>+7 (962) 613-68-86</span>
								</div>
								<div className={styles.contactMethod}>
									<span className={styles.contactIcon}>📍</span>
									<span>Тольятти, Россия</span>
								</div>
								<div className={styles.contactMethod}>
									<span className={styles.contactIcon}>🔗</span>
									<a href="https://github.com/ExGules" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
										GitHub: ExGules
									</a>
								</div>
							</div>
						</div>
						<div className={styles.contactForm}>
							<form>
								<div className={styles.formGroup}>
									<input type="text" placeholder="Ваше имя" required />
								</div>
								<div className={styles.formGroup}>
									<input type="email" placeholder="Email" required />
								</div>
								<div className={styles.formGroup}>
									<textarea placeholder="Сообщение" rows={5} required></textarea>
								</div>
								<button type="submit" className={styles.submitButton}>
									Отправить сообщение
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>

			{/* Scroll to Top Button */}
			{showScrollTop && (
				<button 
					className={styles.scrollToTop}
					onClick={scrollToTop}
					title="Наверх"
				>
					↑
				</button>
			)}

			{/* Footer */}
			<footer className={styles.footer}>
				<div className={styles.container}>
					<div className={styles.footerContent}>
						<div className={styles.footerText}>
							© 2024 Никита Краснов - Frontend Developer Portfolio. Все права защищены.
						</div>
						<div className={styles.socialLinks}>
							<a href="https://github.com/ExGules" className={styles.socialLink} target="_blank" rel="noopener noreferrer">GitHub</a>
							<a href="mailto:respekt32113@mail.ru" className={styles.socialLink}>Email</a>
							<a href="tel:+79626136886" className={styles.socialLink}>Phone</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};
