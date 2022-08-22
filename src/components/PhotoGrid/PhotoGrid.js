import { createRef, useEffect, useState } from 'react'
import styles from './PhotoGrid.module.scss'

function Thumbnail({ photo }) {
    let modalRef = createRef()
    let [isLoaded, setIsLoaded] = useState(false)

    let attributions = {
        jak: 'Jak Barnes — Pentax Spotmatic II, Super Takumar 55mm ƒ/2.0, Ilford XP2 Super',
        daniel: 'Daniel James — Praktica MTL3, Pentacon 50mm ƒ/1.8, Ilford XP2 Super',
    }

    function checkCloseModal(event) {
        let dialog = event.target
        var rect = dialog.getBoundingClientRect()
        var isInDialog= rect.top <= event.clientY
            && event.clientY <= rect.top + rect.height
            && rect.left <= event.clientX
            && event.clientX <= rect.left + rect.width

        if (!isInDialog) dialog.close()
    }

    function open() {
        setIsLoaded(true)
        modalRef.current.showModal()
    }

    return <li className={ styles.thumbnail }>
        <img className={ styles.thumbnailImage } src={ `/images/thumbs/${ photo.filename }.jpg` } onClick={ open } />

        <dialog className={ styles.modal } ref={ modalRef } onClick={ checkCloseModal }>
            { isLoaded && <img className={ styles.image } src={ `/images/${ photo.filename }.jpg` } /> }
            <div className={ styles.attribution }>{ attributions[photo.attribution] }</div>
        </dialog> 
    </li>
}

export default function PhotoGrid({ photos }) {
    return <ul className={ styles.list }>
        { photos.map(photo => <Thumbnail photo={ photo } />) }
    </ul>
}