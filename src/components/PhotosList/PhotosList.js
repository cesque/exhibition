import Photo from '../Photo/Photo'
import styles from './PhotosList.module.scss'

export default function PhotosList({ photos }) {
    return <ul className={ styles.list }>
        { photos.map((photo, index) => <Photo photo={ photo } index={ index } total={ photos.length } />) }
    </ul>
}