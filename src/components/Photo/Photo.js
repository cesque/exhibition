import { createRef, useEffect, useState } from 'react'
import styles from './Photo.module.scss'

export default function Photo({ photo, index, total }) {
    let ref = createRef()

    let [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        let options = {
            rootMargin: '500%',
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

    function scrollToNext() {
        let next = ref.current.nextSibling

        ref.current.scrollIntoView({
            behavior: 'auto',
            block: 'end',
        })

        if(next) {
            next.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    let src = isLoaded ? `/images/${ photo.filename }.jpg` : `/images/thumbs/${ photo.filename }.jpg`

    return <li className={ styles.photoPage } ref={ ref }>
        <div className={ styles.photoFrame }>
            <img className={ styles.photo } src={ src } />
            <div className={ styles.attributionContainer }>
                <div className={ styles.count }>{ index + 1 } <span className={ styles.fade }>/ { total }</span></div>
                { index < (total - 1) && <button type="button" className={ styles.nextButton } onClick={ scrollToNext }><svg viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path></svg></button> }
                <div className={ styles.attribution }>{ photo.attribution == 'jak' ? '★' : '◇' }</div>
            </div>
        </div>
    </li>
}