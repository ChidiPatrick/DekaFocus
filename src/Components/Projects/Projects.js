import React from "react"
import { Link } from "react-router-dom"
import styles from "./Projects.module.scss"
import { ImBin,ImRadioUnchecked } from "react-icons/im";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
const Projects = () => {
    const data = [...Array(6)]
    return (
        <div className={styles.projectsContainer}>
            <header className={styles.projectsHeader}>
                <Link to = {-1}  className={styles.backLink}>
                    <FaChevronRight/>
                </Link>
                <h3 className={styles.projectsHeading}>Projects</h3>
            </header>
            <div className={styles.projectsWrapper}>
                {data.map(doc => {
                    return (
                        <div className={styles.project}>
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