import styles from './App.module.scss'
import Header from './components/Header/Header'
import PhotoGrid from './components/PhotoGrid/PhotoGrid'
import PhotosList from './components/PhotosList/PhotosList'
import { DateTime } from 'luxon'

import photos from './photos'
import WaitingRoom from './components/WaitingRoom'
import { useState } from 'react'

function App() {
    const openingTime = DateTime.fromISO('2022-08-21T18:00:00.123+01:00', { setZone: true })
    let now = DateTime.now()

    let isWaitingRoom = now < openingTime

    function hash(photo) {
        let filename = +photo.filename
        let filenameSum = [...photo.filename].reduce((p, c) => p + +c, 0)

        return filename % filenameSum
    }

    photos.sort((a, b) => {
        return hash(a) - hash(b)
    })

    // return <div style={{ fontFamily: 'monospace '}}>
    //     { photos.map(photo => photo.attribution == 'jak' ? '#' : '.' )}

    //     <div>
    //         { photos.map(photo => <div>{ hash(photo) }</div>) }
    //     </div>
    // </div>
 
    if(isWaitingRoom) return <WaitingRoom openingTime={ openingTime } />

    return (
        <div className={ styles.app }>
            <Header />

            <PhotosList photos={ photos } />

            <PhotoGrid photos={ photos } />

            <div className={ styles.footer }>
                <div className={ styles.footerRow }>Photographs © Jak Barnes and Daniel James as per attribution</div>
                <div className={ styles.footerRow }>Website by <a href="https://twitter.com/cesque">@cesque</a></div>
            </div>
        </div>
    );
}

export default App
