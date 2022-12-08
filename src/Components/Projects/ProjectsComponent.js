import React, { Suspense,useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Projects.module.scss"
import { ImBin,ImRadioUnchecked } from "react-icons/im";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from "react-redux";
const Projects = ({resource}) => {
    const data = resource.data.read()
	const [settings,setSettings] = useState(data.data())
    console.log(settings);
    const projects = settings.projects
    const loadingSpinner = <div className={styles.loadingSpinner}>
			<span className={styles.loader}></span>
		</div>
    return ( 
        <div className={styles.projectsContainer}>
            <header className={styles.projectsHeader}>
                <Link to = {-1}  className={styles.backLink}>
                    <FaChevronLeft/>
                </Link>
                <h3 className={styles.projectsHeading}>Projects</h3>
            </header>
            <div className={styles.projectsWrapper}>
                {projects.map((doc,id) => {
                    return (
                    <div className={styles.project} key ={id}>
                    <div className={styles.projectAndColorWrapper}>
                        <span className={styles.projectColor}></span>
                        <div className={styles.projecsTitle}>Project</div>
                    </div>
                    <div className={styles.deleteWrapper}>
                        <span className={styles.completedProject}><ImRadioUnchecked/></span>
                        <div className={styles.deleteProject}><ImBin/></div>
                    </div>
                </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Projects