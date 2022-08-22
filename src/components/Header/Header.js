import styles from './Header.module.scss'

export default function Header({ }) {
    return <header className={ styles.header }>
        <div className={ styles.imageContainer }>
            <img className={ styles.image } src={ `/header.jpg` } />
        </div>
        <div className={ styles.inner }>
            <div className={ styles.content }>
                <h1 className={ styles.title }><span className={ styles.pride }>Pride</span> / Monochrome</h1>
                <h2 className={ styles.attribution }>★ Jak Barnes / ◇ Daniel James</h2>
            </div>
        </div>
    </header>
}