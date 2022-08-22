import { createRef, useEffect, useState } from 'react'
import styles from './Photo.module.scss'

export default function Photo({ photo, index, total }) {
    let ref = createRef()

    let [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        let options = {
            rootMargin: '0px',
            threshold: 0,
        }

        let observer = new IntersectionObserver(eventList => {
            let event = eventList[0]
            
            if(event.isIntersecting) {
                setIsLoaded(true)
            }
        }, options)

        observer.observe(ref.current)
    }, [])

    return <li className={ styles.photoPage } ref={ ref }>
        { isLoaded && <div className={ styles.photoFrame }>
            <img className={ styles.photo } src={ `/images/${ photo.filename }.jpg` } />
            <div className={ styles.attributionContainer }>
                <div className={ styles.count }>{ index + 1 } <span className={ styles.fade }>/ { total }</span></div>
                <div className={ styles.attribution }>{ photo.attribution == 'jak' ? '★' : '◇' }</div>
            </div>
        </div> }
    </li>
}