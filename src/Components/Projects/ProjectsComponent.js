import React, { Suspense,useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import styles from "./Projects.module.scss"
import { ImBin,ImRadioUnchecked } from "react-icons/im";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector,useDispatch } from "react-redux";
import { arrayRemove, doc,updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { fetchUserSettings } from "../Settings/SettingsSlice";
const Projects = ({resource}) => {
    const data = resource.data.read()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.signUpSlice.userId)
    const navigate = useNavigate()
    
	const [settings,setSettings] = useState(data.data())
    console.log(settings);
    const projects = settings.projects
    const loadingSpinner = <div className={styles.loadingSpinner}>
			<span className={styles.loader}></span>
		</div>
        //////Project deletion function //////////////
        const deleteProject = async (projectId) =>  {
             const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
             await updateDoc(settingsRef,{
                projects: arrayRemove(projects[projectId])
             })
             dispatch(fetchUserSettings())
             navigate(0)
        }
    return ( 
        <div className={styles.projectsContainer}>
            <header className={styles.projectsHeader}>
                <Link to = {-1}  className={styles.backLink}>
                    <FaChevronLeft/>
                </Link>
                <h3 className={styles.projectsHeading}>Projects</h3>
            </header>
            <div className={styles.projectsWrapper}>
                {projects.map((project,id) => {
                    console.log(project.projectTitle.length > 8)
                    return (
                    <div className={styles.project} key ={id}>
                    <div className={styles.projectAndColorWrapper}>
                        <span style={{backgroundColor: project.projectColor}} className={styles.projectColor}></span>
                        <div className={styles.projecsTitle}>{project.projectTitle.length > 28 ?  project.projectTitle.slice(0,25).padEnd(28,".") : project.projectTitle }</div>
                    </div>
                    <div className={styles.deleteWrapper}>
                        {/* <span className={styles.completedProject}><ImRadioUnchecked/></span> */}
                        <div className={styles.deleteProject} onClick ={ () => deleteProject(id)}><ImBin/></div>
                    </div>
                </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Projects